// Browser-compatible version - using global React
const { useState, useEffect, useMemo } = React;

// Lucide icons as inline SVG components
const Heart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const Calendar = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const TrendingUp = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const Sparkles = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
const Download = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const Upload = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const Settings = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const X = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

const MOODS = [
  { key: 1, name: 'Difícil', color: '#94a3b8', emoji: '🌧️', flower: '#8b9bb5' },
  { key: 2, name: 'Bajo', color: '#a3a3a3', emoji: '⛅', flower: '#9ca3af' },
  { key: 3, name: 'Normal', color: '#60a5fa', emoji: '🌤️', flower: '#7cb8ff' },
  { key: 4, name: 'Bien', color: '#34d399', emoji: '🌞', flower: '#4ade80' },
  { key: 5, name: 'Increíble', color: '#f472b6', emoji: '🌈', flower: '#ec4899' },
];

const PROMPTS = [
  "¿Qué te hizo sonreír hoy?",
  "¿Por qué estás agradecida/o ahora?",
  "¿Qué cosa hermosa notaste?",
  "¿Quién mejoró tu día?",
  "¿Qué aprendiste sobre ti misma/o?",
  "¿De qué estás orgullosa/o?",
  "¿Qué te trajo paz hoy?",
  "¿Qué te hizo reír?",
  "¿Qué acto de bondad presenciaste?",
  "¿Qué esperas con ilusión?",
];

const THEMES = [
  { 
    name: 'Jardín Esmeralda', 
    light: { from: '#ecfdf5', via: '#d1fae5', to: '#a7f3d0' },
    dark: { from: '#064e3b', via: '#065f46', to: '#047857' }
  },
  { 
    name: 'Sueños del Atardecer', 
    light: { from: '#fef3c7', via: '#fcd34d', to: '#fbbf24' },
    dark: { from: '#78350f', via: '#92400e', to: '#b45309' }
  },
  { 
    name: 'Campos de Lavanda', 
    light: { from: '#f3e8ff', via: '#e9d5ff', to: '#d8b4fe' },
    dark: { from: '#581c87', via: '#6b21a8', to: '#7e22ce' }
  },
  { 
    name: 'Brisa del Océano', 
    light: { from: '#dbeafe', via: '#bfdbfe', to: '#93c5fd' },
    dark: { from: '#0c4a6e', via: '#075985', to: '#0369a1' }
  },
  { 
    name: 'Jardín de Rosas', 
    light: { from: '#ffe4e6', via: '#fecdd3', to: '#fda4af' },
    dark: { from: '#881337', via: '#9f1239', to: '#be123c' }
  },
];

function App() {
  const [entries, setEntries] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [view, setView] = useState('garden');
  const [theme, setTheme] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const entry = entries[date];
    setMood(entry?.mood ?? 3);
    setNote(entry?.note ?? '');
  }, [date, entries]);

  const upsert = () => {
    const next = { ...entries, [date]: { mood: Number(mood), note: note.trim() } };
    setEntries(next);
  };

  const clearAll = () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setEntries({});
    setDate(todayDate);
    setView('garden');
    setTheme(0);
    setShowSettings(false);
    setShowPrompt(false);
    setShowResetConfirm(false);
    setMood(3);
    setNote('');
    setCurrentPromptIndex(0);
  };

  const exportData = () => {
    const data = JSON.stringify(entries, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mood-garden-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setEntries(data);
        alert('✅ ¡Datos importados exitosamente!');
      } catch (err) {
        alert('❌ Formato de archivo inválido.');
      }
    };
    reader.readAsText(file);
  };

  const streak = useMemo(() => {
    if (Object.keys(entries).length === 0) return 0;
    
    let count = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);
    
    const today = checkDate.toISOString().slice(0, 10);
    const yesterday = new Date(checkDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    
    if (entries[today]) {
      count = 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (entries[yesterdayStr]) {
      count = 1;
      checkDate = yesterday;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      return 0;
    }
    
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().slice(0, 10);
      if (entries[dateStr]) {
        count++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return count;
  }, [entries]);

  const currentTheme = THEMES[theme];
  const themeColors = darkMode ? currentTheme.dark : currentTheme.light;
  const bgStyle = {
    background: `linear-gradient(to bottom, ${themeColors.from}, ${themeColors.via} 50%, ${themeColors.to})`,
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 pb-20 sm:pb-20 transition-all duration-700" style={bgStyle}>
      <div className="max-w-2xl mx-auto">
        <header className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">🌸</span>
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
                Jardín del Ánimo
              </h1>
              {streak > 0 && (
                <div className={`flex items-center gap-1 text-xs sm:text-sm ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
                  <Sparkles className="w-3 h-3" />
                  <span>¡Racha de {streak} días!</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 sm:p-2 rounded-full transition-all ${darkMode ? 'bg-slate-700' : 'bg-white/60'}`}
            >
              <span className="text-lg sm:text-xl">{darkMode ? '☀️' : '🌙'}</span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className={`p-1.5 sm:p-2 rounded-full transition-all ${darkMode ? 'bg-slate-700' : 'bg-white/60'}`}
            >
              <Settings className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`} />
            </button>
          </div>
        </header>

        <nav className="flex gap-1 sm:gap-2 mb-4 sm:mb-6">
          {[
            { id: 'garden', icon: Heart, label: 'Jardín' },
            { id: 'calendar', icon: Calendar, label: 'Calendario' },
            { id: 'insights', icon: TrendingUp, label: 'Estadísticas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-all font-semibold text-sm sm:text-base ${
                view === tab.id
                  ? darkMode ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'
                  : darkMode ? 'bg-slate-700 text-purple-300' : 'bg-white text-emerald-700'
              }`}
            >
              <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <section className={`rounded-2xl p-3 sm:p-6 shadow-xl mb-4 sm:mb-6 ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
          <div className="grid gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-purple-300' : 'text-emerald-800'}`}>
                  Fecha
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                  className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base ${
                    darkMode ? 'bg-slate-700 border-purple-500/40 text-purple-100' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>
              <div className="flex-1">
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-purple-300' : 'text-emerald-800'}`}>
                  <span className="flex items-center justify-between">
                    <span>Ánimo</span>
                    <span className="text-xl sm:text-2xl">{MOODS[mood - 1].emoji}</span>
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={mood}
                  onChange={(e) => setMood(Number(e.target.value))}
                  className="w-full h-3 rounded-full mt-2"
                  style={{ background: `linear-gradient(to right, ${MOODS[0].color}, ${MOODS[4].color})` }}
                />
                <div className="flex justify-between mt-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setMood(m.key)}
                      className={`text-lg sm:text-xl transition-all ${mood === m.key ? 'scale-125' : 'opacity-50'}`}
                    >
                      {m.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-emerald-800'}`}>
                  ¿Cómo te sientes?
                </label>
                <button
                  onClick={() => {
                    if (!showPrompt) {
                      setCurrentPromptIndex(Math.floor(Math.random() * PROMPTS.length));
                    }
                    setShowPrompt(!showPrompt);
                  }}
                  className={`text-xs underline ${darkMode ? 'text-purple-400' : 'text-emerald-600'}`}
                >
                  {showPrompt ? 'Ocultar' : '¿Necesitas inspiración?'}
                </button>
              </div>
              {showPrompt && (
                <div className={`mb-2 p-2 sm:p-3 rounded-lg text-xs sm:text-sm italic ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-emerald-50 text-emerald-800'}`}>
                  💭 {PROMPTS[currentPromptIndex]}
                </div>
              )}
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={200}
                rows={4}
                className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2 sm:py-3 resize-none text-sm sm:text-base ${
                  darkMode ? 'bg-slate-700 border-purple-500/40 text-purple-100' : 'bg-white border-emerald-200'
                }`}
                placeholder="Una nota breve sobre tu día..."
              />
              <div className={`text-xs text-right mt-1 ${darkMode ? 'text-purple-400' : 'text-emerald-600'}`}>
                {note.length}/200 caracteres
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={upsert}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base shadow-lg ${
                  darkMode ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                Guardar Entrada
              </button>
              <div className={`text-xs sm:text-sm ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
                <span className="font-medium" style={{ color: MOODS[mood - 1].color }}>
                  {MOODS[mood - 1].name}
                </span>
              </div>
            </div>
          </div>
        </section>

        {view === 'garden' && <Garden entries={entries} darkMode={darkMode} />}
        {view === 'calendar' && <CalendarView entries={entries} setDate={setDate} currentDate={date} darkMode={darkMode} />}
        {view === 'insights' && <Insights entries={entries} darkMode={darkMode} />}

        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-emerald-900">Configuración</h2>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-full hover:bg-emerald-50">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-emerald-800 mb-3">Tema</label>
                  <div className="grid grid-cols-2 gap-2">
                    {THEMES.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setTheme(i)}
                        className={`p-3 rounded-xl text-sm font-medium ${theme === i ? 'ring-2 ring-emerald-500' : 'ring-1 ring-gray-200'}`}
                        style={{ background: `linear-gradient(to right, ${t.light.from}, ${t.light.to})` }}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-emerald-800 mb-3">Gestión de Datos</label>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={exportData}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-100 text-emerald-800 rounded-xl"
                    >
                      <Download className="w-4 h-4" />
                      <span>Exportar</span>
                    </button>
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-100 text-emerald-800 rounded-xl cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Importar</span>
                      <input type="file" accept=".json" onChange={importData} className="hidden" />
                    </label>
                  </div>
                  
                  <button
                    onClick={() => { setShowSettings(false); setShowResetConfirm(true); }}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>REINICIAR TODO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">¿REINICIAR TODO?</h2>
              </div>

              <div className="bg-red-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>🌸</span>
                  <span>Todas las flores de tu jardín</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📝</span>
                  <span>Todas tus entradas de ánimo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔥</span>
                  <span>Tu racha actual de {streak} días</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 rounded-xl font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold"
                >
                  Sí, Reiniciar Todo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Garden({ entries, darkMode }) {
  const [hoveredSlot, setHoveredSlot] = useState(null);
  
  const items = Object.entries(entries)
    .map(([date, v]) => ({ date, ...v }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const COLUMNS = 5; // Reduced columns for mobile
  const VISIBLE_ROWS = 6;
  const totalSlots = Math.max(COLUMNS * VISIBLE_ROWS, items.length + COLUMNS);

  return (
    <div className={`rounded-2xl p-3 sm:p-6 shadow-xl ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className={`text-base sm:text-lg font-bold ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
          Tu Jardín
        </h2>
        <span className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-emerald-100 text-emerald-700'}`}>
          {items.length} flores plantadas
        </span>
      </div>

      <div 
        className="grid grid-cols-5 sm:grid-cols-7 gap-1 sm:gap-2 p-2 sm:p-4 rounded-xl"
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #3d2f1f 0%, #2d1f0f 50%, #1d0f00 100%)'
            : 'linear-gradient(135deg, #8b7355 0%, #6b5644 50%, #5a4a3a 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)'
        }}
      >
        {Array.from({ length: totalSlots }).map((_, idx) => {
          const item = items[idx];
          const hasFlower = !!item;
          const isHovered = hoveredSlot === idx;

          return (
            <div
              key={idx}
              className="relative aspect-square rounded-lg transition-all"
              style={{
                background: hasFlower
                  ? 'linear-gradient(135deg, #86efac 0%, #4ade80 50%, #34d399 100%)'
                  : darkMode
                    ? 'linear-gradient(135deg, #4a3a2a 0%, #3a2a1a 100%)'
                    : 'linear-gradient(135deg, #a8856f 0%, #8b6f47 100%)',
                boxShadow: hasFlower
                  ? 'inset 0 2px 4px rgba(0,0,0,0.15)'
                  : 'inset 0 3px 6px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={() => hasFlower && setHoveredSlot(idx)}
              onMouseLeave={() => setHoveredSlot(null)}
            >
              {hasFlower && (
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <TopDownFlower color={MOODS[item.mood - 1].flower} mood={item.mood} />
                  </svg>
                </div>
              )}

              {hasFlower && isHovered && item.note && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                  <div className="bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-2xl border-2 border-gray-800 min-w-[120px] sm:min-w-[160px] max-w-[160px] sm:max-w-[200px]">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 pb-1 sm:pb-1.5 border-b border-gray-300">
                      <span className="text-sm sm:text-base">{MOODS[item.mood - 1].emoji}</span>
                      <div className="text-[9px] sm:text-[10px] font-bold text-gray-900">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-800 leading-snug break-words font-medium">
                      {item.note}
                    </div>
                  </div>
                </div>
              )}

              {hasFlower && isHovered && !item.note && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                  <div className="bg-white rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-gray-900 shadow-2xl border-2 border-gray-800">
                    {MOODS[item.mood - 1].emoji} {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-4 sm:py-6">
          <div className="text-3xl sm:text-4xl mb-2">🌱</div>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
            Tu jardín está esperando florecer
          </p>
        </div>
      )}
    </div>
  );
}

function TopDownFlower({ color, mood }) {
  const petalCount = 6 + mood;
  
  return (
    <g transform="translate(50, 50) scale(0.85)">
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const x = Math.cos(angle) * 18;
        const y = Math.sin(angle) * 18;
        const size = 10 + mood;
        
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={size}
            ry={size * 0.8}
            fill={color}
            stroke="#065f46"
            strokeWidth="0.8"
            opacity="0.95"
            transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
          />
        );
      })}
      <circle cx="0" cy="0" r="12" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="8" fill="#fcd34d" opacity="0.7" />
    </g>
  );
}

function CalendarView({ entries, setDate, currentDate, darkMode }) {
  const d = new Date(currentDate + 'T00:00:00');
  const year = d.getFullYear();
  const month = d.getMonth();
  
  const weeks = [];
  let day = 1 - new Date(year, month, 1).getDay();
  
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      row.push(new Date(year, month, day));
      day++;
    }
    weeks.push(row);
  }

  return (
    <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setDate(new Date(year, month - 1, 15).toISOString().slice(0, 10))}
          className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-emerald-100 text-emerald-800'}`}
        >
          ←
        </button>
        <h2 className={`text-lg font-bold ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
          {d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => setDate(new Date(year, month + 1, 15).toISOString().slice(0, 10))}
          className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-emerald-100 text-emerald-800'}`}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className={`text-center text-xs font-medium py-2 ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weeks.map((week, wi) =>
          week.map((dt, di) => {
            const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
            const inMonth = dt.getMonth() === month;
            const entry = entries[key];
            
            // Check if date is in the past (before today)
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dateToCheck = new Date(dt);
            dateToCheck.setHours(0, 0, 0, 0);
            const isPast = dateToCheck < today;

            return (
              <button
                key={`${wi}-${di}`}
                onClick={() => !isPast && setDate(key)}
                disabled={isPast}
                className={`h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isPast
                    ? 'opacity-30 cursor-not-allowed'
                    : inMonth
                      ? darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-emerald-50'
                      : 'opacity-40'
                } ${key === currentDate ? (darkMode ? 'ring-2 ring-purple-500' : 'ring-2 ring-emerald-500') : ''}`}
              >
                <span className={`text-sm ${inMonth ? (darkMode ? 'text-purple-200' : 'text-emerald-900') : 'text-gray-400'}`}>
                  {dt.getDate()}
                </span>
                {entry && (
                  <div className="mt-1 w-3 h-3 rounded-full" style={{ backgroundColor: MOODS[entry.mood - 1].color }} />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function Insights({ entries, darkMode }) {
  const items = Object.entries(entries).map(([date, v]) => ({ date, ...v }));
  
  const moodCounts = MOODS.map((m) => ({
    ...m,
    count: items.filter((i) => i.mood === m.key).length,
  }));

  const avgMood = items.length > 0 ? (items.reduce((sum, i) => sum + i.mood, 0) / items.length).toFixed(1) : 0;

  const last7Days = items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7).reverse();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
          <div className={`text-3xl font-bold ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
            {items.length}
          </div>
          <div className={`text-sm mt-1 ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
            Entradas Totales
          </div>
        </div>
        <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
          <div className={`text-3xl font-bold ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
            {avgMood}
          </div>
          <div className={`text-sm mt-1 ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
            Ánimo Promedio
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
          Distribución de Ánimos
        </h3>
        <div className="space-y-3">
          {moodCounts.map((m) => (
            <div key={m.key}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <span>{m.emoji}</span>
                  <span className={`font-medium ${darkMode ? 'text-purple-200' : 'text-emerald-800'}`}>
                    {m.name}
                  </span>
                </span>
                <span className={darkMode ? 'text-purple-300' : 'text-emerald-700'}>
                  {m.count}
                </span>
              </div>
              <div className={`w-full rounded-full h-2 overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-emerald-100'}`}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${items.length > 0 ? (m.count / items.length) * 100 : 0}%`,
                    backgroundColor: m.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {last7Days.length > 0 && (
        <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-purple-200' : 'text-emerald-900'}`}>
            Últimos 7 Días
          </h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {last7Days.map((item) => (
              <div key={item.date} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${(item.mood / 5) * 100}%`,
                    backgroundColor: MOODS[item.mood - 1].color,
                  }}
                />
                <span className={`text-xs ${darkMode ? 'text-purple-300' : 'text-emerald-700'}`}>
                  {new Date(item.date).getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// No export needed for browser - App is global