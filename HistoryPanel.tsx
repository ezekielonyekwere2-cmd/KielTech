import React from 'react';
import PlusIcon from './icons/PlusIcon';

type ChatSession = {
    id: number;
    title: string;
    messages: any[]; // Define a proper message type if needed
};

interface HistoryPanelProps {
  sessions: ChatSession[];
  activeSessionId: number | null;
  onSelectSession: (id: number) => void;
  onNewSession: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ sessions, activeSessionId, onSelectSession, onNewSession }) => {
  return (
    <aside className="w-64 h-full flex-shrink-0 bg-card dark:bg-k-secondary border-r border-border dark:border-k-border flex flex-col p-2 gap-2">
      <button
        onClick={onNewSession}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-foreground dark:text-k-foreground bg-background dark:bg-k-primary border border-border dark:border-k-border rounded-md hover:bg-border/50 dark:hover:bg-k-border/20 transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        New Chat
      </button>
      <div className="border-t border-border dark:border-k-border -mx-2"></div>
      <nav className="flex-grow overflow-y-auto space-y-1">
        <span className="px-2 text-xs font-semibold text-muted-foreground dark:text-k-muted uppercase tracking-wider">Recent</span>
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`w-full text-left px-3 py-2 text-sm rounded-md truncate transition-colors ${
              session.id === activeSessionId
                ? 'bg-primary/10 dark:bg-k-accent/20 text-primary dark:text-k-accent font-semibold'
                : 'text-foreground dark:text-k-foreground hover:bg-background dark:hover:bg-k-primary'
            }`}
          >
            {session.title}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default HistoryPanel;
