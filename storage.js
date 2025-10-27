// Robust storage system with IndexedDB fallback for Android APK compatibility
// This ensures data persists even when localStorage fails in WebView

const DB_NAME = 'MoodGardenDB';
const DB_VERSION = 1;
const STORE_NAME = 'mood-data';

class StorageManager {
  constructor() {
    this.db = null;
    this.useIndexedDB = false;
    this.initPromise = this.init();
  }

  async init() {
    // Request persistent storage to prevent Android from auto-clearing data
    await this.requestPersistentStorage();

    // Test if localStorage is available and working
    const localStorageWorks = this.testLocalStorage();

    if (!localStorageWorks) {
      console.log('localStorage not available, switching to IndexedDB');
      this.useIndexedDB = true;
      await this.initIndexedDB();
      // Migrate existing localStorage data to IndexedDB if any exists
      await this.migrateFromLocalStorage();
    } else {
      console.log('Using localStorage for data persistence');
    }
  }

  async requestPersistentStorage() {
    // Request persistent storage to prevent data eviction on Android
    if (navigator.storage && navigator.storage.persist) {
      try {
        const isPersisted = await navigator.storage.persisted();
        console.log('[Storage] Already persisted:', isPersisted);

        if (!isPersisted) {
          const granted = await navigator.storage.persist();
          console.log('[Storage] Persistent storage request:', granted ? 'GRANTED' : 'DENIED');

          if (granted) {
            console.log('[Storage] ✅ Data will NOT be auto-deleted by Android');
          } else {
            console.log('[Storage] ⚠️ Data MAY be cleared if device storage is low');
          }
        }

        // Check storage quota
        if (navigator.storage.estimate) {
          const estimate = await navigator.storage.estimate();
          const percentUsed = ((estimate.usage / estimate.quota) * 100).toFixed(2);
          console.log(`[Storage] Using ${this.formatBytes(estimate.usage)} of ${this.formatBytes(estimate.quota)} (${percentUsed}%)`);
        }
      } catch (error) {
        console.log('[Storage] Persistent storage API not supported:', error.message);
      }
    } else {
      console.log('[Storage] Storage API not available (older browser/WebView)');
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  async migrateFromLocalStorage() {
    try {
      // Check if there's any data in localStorage to migrate
      const keys = ['mood-garden-entries', 'mood-garden-theme', 'mood-garden-darkmode'];

      for (const key of keys) {
        try {
          const value = localStorage.getItem(key);
          if (value !== null) {
            console.log(`Migrating ${key} from localStorage to IndexedDB`);
            await this.setItemIndexedDB(key, value);
            localStorage.removeItem(key); // Clean up after migration
          }
        } catch (e) {
          // localStorage might not be accessible at all, skip migration
          console.log('localStorage not accessible for migration');
          break;
        }
      }
    } catch (error) {
      console.log('Migration skipped:', error);
    }
  }

  testLocalStorage() {
    try {
      const testKey = '__mood_garden_test__';
      localStorage.setItem(testKey, 'test');
      const result = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return result === 'test';
    } catch (e) {
      console.error('localStorage test failed:', e);
      return false;
    }
  }

  initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };
    });
  }

  async setItem(key, value) {
    await this.initPromise;

    console.log(`[Storage] Setting ${key}, using IndexedDB: ${this.useIndexedDB}`);

    if (this.useIndexedDB) {
      const result = await this.setItemIndexedDB(key, value);
      console.log(`[Storage] Saved ${key} to IndexedDB successfully`);
      return result;
    } else {
      try {
        localStorage.setItem(key, value);
        // Verify it was saved
        const saved = localStorage.getItem(key);
        if (saved !== value) {
          console.warn('localStorage save verification failed, switching to IndexedDB');
          this.useIndexedDB = true;
          await this.initIndexedDB();
          const result = await this.setItemIndexedDB(key, value);
          console.log(`[Storage] Saved ${key} to IndexedDB after localStorage failure`);
          return result;
        }
        console.log(`[Storage] Saved ${key} to localStorage successfully`);
      } catch (e) {
        console.error('localStorage setItem failed:', e);
        this.useIndexedDB = true;
        await this.initIndexedDB();
        const result = await this.setItemIndexedDB(key, value);
        console.log(`[Storage] Saved ${key} to IndexedDB after localStorage error`);
        return result;
      }
    }
  }

  setItemIndexedDB(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ key, value });

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error('IndexedDB setItem error:', request.error);
        reject(request.error);
      };
    });
  }

  async getItem(key) {
    await this.initPromise;

    console.log(`[Storage] Getting ${key}, using IndexedDB: ${this.useIndexedDB}`);

    if (this.useIndexedDB) {
      const value = await this.getItemIndexedDB(key);
      console.log(`[Storage] Retrieved ${key} from IndexedDB:`, value ? `${value.substring(0, 50)}...` : 'null');
      return value;
    } else {
      try {
        const value = localStorage.getItem(key);
        console.log(`[Storage] Retrieved ${key} from localStorage:`, value ? `${value.substring(0, 50)}...` : 'null');
        return value;
      } catch (e) {
        console.error('localStorage getItem failed:', e);
        this.useIndexedDB = true;
        await this.initIndexedDB();
        const value = await this.getItemIndexedDB(key);
        console.log(`[Storage] Retrieved ${key} from IndexedDB after localStorage error:`, value ? `${value.substring(0, 50)}...` : 'null');
        return value;
      }
    }
  }

  getItemIndexedDB(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result ? request.result.value : null);
      };
      request.onerror = () => {
        console.error('IndexedDB getItem error:', request.error);
        reject(request.error);
      };
    });
  }

  async removeItem(key) {
    await this.initPromise;

    if (this.useIndexedDB) {
      return this.removeItemIndexedDB(key);
    } else {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('localStorage removeItem failed:', e);
        this.useIndexedDB = true;
        await this.initIndexedDB();
        return this.removeItemIndexedDB(key);
      }
    }
  }

  removeItemIndexedDB(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error('IndexedDB removeItem error:', request.error);
        reject(request.error);
      };
    });
  }

  async getAllKeys() {
    await this.initPromise;

    if (this.useIndexedDB) {
      return this.getAllKeysIndexedDB();
    } else {
      try {
        return Object.keys(localStorage);
      } catch (e) {
        console.error('localStorage getAllKeys failed:', e);
        return [];
      }
    }
  }

  getAllKeysIndexedDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAllKeys();

      request.onsuccess = () => {
        resolve(request.result.map(item => item));
      };
      request.onerror = () => {
        console.error('IndexedDB getAllKeys error:', request.error);
        reject(request.error);
      };
    });
  }
}

// Create a singleton instance
const storage = new StorageManager();

// Export for use in the app
window.persistentStorage = storage;
