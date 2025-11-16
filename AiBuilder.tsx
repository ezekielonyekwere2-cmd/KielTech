import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { generateWebsite } from '../services/geminiService';
import { GeneratedCode } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import CodeEditorPanel from './CodeEditorPanel';
import HistoryPanel from './HistoryPanel';
import PanelLeftIcon from './icons/PanelLeftIcon';
import PanelRightIcon from './icons/PanelRightIcon';
import CodeBracketIcon from './icons/CodeBracketIcon';

type Message = {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  code?: GeneratedCode;
};

type ChatSession = {
  id: number;
  title: string;
  messages: Message[];
};

const AiBuilder: React.FC = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);
  const [activeCode, setActiveCode] = useState<GeneratedCode | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeSession = chatSessions.find(s => s.id === activeSessionId);

  useEffect(() => {
    // Auto-scroll chat to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isLoading]);
  
  useEffect(() => {
    // Start with a new chat if none exists
    if (chatSessions.length === 0) {
      handleNewChat();
    }
  }, [chatSessions.length]);

  useEffect(() => {
    // Auto-resize textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 160; // 10rem
      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [input]);

  const updateSession = (sessionId: number, updates: Partial<ChatSession>) => {
    setChatSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, ...updates } : s))
    );
  };
  
  const handleNewChat = () => {
      const newSession: ChatSession = {
        id: Date.now(),
        title: 'New Chat',
        messages: [],
      };
      setChatSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      setInput('');
      setError(null);
      setIsRightPanelVisible(false);
      setActiveCode(null);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt || isLoading || !activeSessionId) return;

    setError(null);
    setInput('');

    const userMessage: Message = { id: Date.now(), sender: 'user', content: prompt };
    
    // Update session title if it's the first message
    const newTitle = activeSession?.messages.length === 0 ? prompt.substring(0, 30) + (prompt.length > 30 ? '...' : '') : activeSession.title;
    
    updateSession(activeSessionId, {
      title: newTitle,
      messages: [...(activeSession?.messages || []), userMessage],
    });

    setIsLoading(true);

    try {
      const result = await generateWebsite(prompt);
      const aiMessage: Message = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        content: "I've created a website based on your prompt. You can view the preview and the code in the panel on the right.",
        code: result
    };
      
      setChatSessions(prev =>
        prev.map(s =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, aiMessage] }
            : s
        )
      );

      setActiveCode(result);
      setIsRightPanelVisible(true);
    } catch (err) {
      setError(err instanceof Error ? `Error: ${err.message}` : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEditor = (code: GeneratedCode) => {
    setActiveCode(code);
    setIsRightPanelVisible(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] animate-fade-in-up">
        <div className="h-full flex flex-col bg-card dark:bg-k-secondary rounded-xl border border-border dark:border-k-border shadow-2xl shadow-k-primary/20 overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 flex justify-between items-center px-4 py-2 border-b border-border dark:border-k-border">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsLeftPanelVisible(!isLeftPanelVisible)}
                        className="p-2 rounded-full text-muted-foreground dark:text-k-muted hover:bg-border dark:hover:bg-k-border/50"
                        aria-label="Toggle History Panel"
                    >
                        <PanelLeftIcon className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold text-foreground dark:text-k-foreground">AI Website Builder</h1>
                </div>
                <div className="flex items-center gap-2">
                     <button 
                        onClick={() => setIsRightPanelVisible(!isRightPanelVisible)}
                        className="p-2 rounded-full text-muted-foreground dark:text-k-muted hover:bg-border dark:hover:bg-k-border/50"
                        aria-label="Toggle Code Panel"
                    >
                        <PanelRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </header>
            
            {/* Main Content */}
            <main className="flex-grow flex min-h-0">
                {isLeftPanelVisible && (
                    <HistoryPanel 
                        sessions={chatSessions}
                        activeSessionId={activeSessionId}
                        onSelectSession={setActiveSessionId}
                        onNewSession={handleNewChat}
                    />
                )}
                
                {/* Chat Interface */}
                <div className="flex-grow flex flex-col bg-background dark:bg-k-primary">
                    <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
                       {!activeSession || activeSession.messages.length === 0 && !isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground dark:text-k-muted">
                                <SparklesIcon className="w-12 h-12 mb-4 text-k-accent"/>
                                <h2 className="text-2xl font-bold text-foreground dark:text-k-foreground">Start Creating</h2>
                                <p>Describe the website you want to build in the prompt below.</p>
                            </div>
                        ) : (
                           <>
                            {activeSession?.messages.map(message => (
                                <div key={message.id} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {message.sender === 'user' ? (
                                        <div className="bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary rounded-xl p-3 max-w-lg shadow-md">
                                            {message.content}
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-k-secondary dark:bg-k-border flex items-center justify-center">
                                                <SparklesIcon className="w-5 h-5 text-k-accent" />
                                            </div>
                                            <div className="bg-card dark:bg-k-secondary rounded-xl p-3 max-w-lg shadow-md text-foreground dark:text-k-foreground space-y-3">
                                                <p>{message.content}</p>
                                                {message.code && (
                                                    <button 
                                                        onClick={() => handleOpenEditor(message.code as GeneratedCode)}
                                                        className="inline-flex items-center gap-2 bg-background dark:bg-k-primary hover:bg-border dark:hover:bg-k-border/50 text-sm font-semibold py-2 px-3 rounded-md transition-colors"
                                                    >
                                                        <CodeBracketIcon className="w-4 h-4" />
                                                        View Code & Preview
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                           </>
                        )}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-k-secondary dark:bg-k-border flex items-center justify-center">
                                        <SparklesIcon className="w-5 h-5 text-k-accent animate-pulse" />
                                    </div>
                                    <div className="bg-card dark:bg-k-secondary rounded-xl p-3 max-w-lg shadow-md text-muted-foreground dark:text-k-muted">
                                        KielTech AI is building...
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border dark:border-k-border bg-card dark:bg-k-secondary">
                        <div className="max-w-3xl mx-auto">
                            {error && <p className="text-red-400 text-sm mb-2 text-center bg-red-900/50 p-2 rounded-md">{error}</p>}
                            <form onSubmit={handleSubmit}>
                            <div className="relative flex items-end">
                                <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Describe the website you want to create... e.g., 'a portfolio for a photographer'"
                                className="w-full bg-background dark:bg-k-primary border border-border dark:border-k-border rounded-lg py-3 pl-4 pr-14 text-foreground dark:text-k-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-k-accent/50 resize-none"
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                    }
                                }}
                                />
                                <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2.5 bottom-2.5 flex items-center justify-center h-9 w-9 bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                aria-label="Generate website"
                                >
                                <SparklesIcon className="w-5 h-5" />
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

                {isRightPanelVisible && activeCode && (
                     <div className="hidden lg:block w-[50%] max-w-4xl flex-shrink-0 border-l border-border dark:border-k-border h-full">
                        <CodeEditorPanel code={activeCode} onClose={() => setIsRightPanelVisible(false)} />
                    </div>
                )}
            </main>
        </div>
    </div>
  );
};

export default AiBuilder;