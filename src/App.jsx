import { PomodoroProvider, usePomodoroContext } from './context/PomodoroContext';
import Header from './components/Header';
import PomodoroTimer from './components/PomodoroTimer';
import Controls from './components/Controls';
import SettingsPanel from './components/SettingsPanel';
import HistoryPanel from './components/HistoryPanel';
import NotificationSystem from './components/NotificationSystem';

function AppContent() {
  const { mode } = usePomodoroContext();

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        mode === 'focus' ? 'bg-focus' : 'bg-break'
      }`}
    >
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pb-12">
        <div className="w-full max-w-md mx-auto">
          <Header />
          <PomodoroTimer />
          <Controls />
          <SettingsPanel />
          <HistoryPanel />
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
}

export default function App() {
  return (
    <PomodoroProvider>
      <AppContent />
    </PomodoroProvider>
  );
}
