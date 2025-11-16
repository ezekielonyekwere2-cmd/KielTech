import React, { useState } from 'react';
import { login, signUp } from '../services/authService';
import { User } from '../types';
import CloseIcon from './icons/CloseIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const authFunction = mode === 'login' ? login : signUp;
      const user = await authFunction(email, password);
      onAuthSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'signup' : 'login'));
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div 
        className="bg-card dark:bg-k-secondary rounded-lg shadow-2xl w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground dark:text-k-muted hover:text-foreground dark:hover:text-k-foreground transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-foreground dark:text-k-foreground mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-center text-muted-foreground dark:text-k-muted mb-8">
            {mode === 'login' ? 'Sign in to continue.' : 'Get started with KielTech.'}
          </p>

          {error && <p className="text-red-400 text-sm text-center mb-4 bg-red-900/50 p-3 rounded-md">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground dark:text-k-muted mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background dark:bg-k-primary border border-border dark:border-k-border rounded-md py-2 px-3 text-foreground dark:text-k-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-k-accent/50"
              />
            </div>
            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-muted-foreground dark:text-k-muted mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-background dark:bg-k-primary border border-border dark:border-k-border rounded-md py-2 px-3 text-foreground dark:text-k-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-k-accent/50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-3 px-8 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground dark:text-k-muted mt-8">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={toggleMode} className="font-medium text-primary dark:text-k-accent hover:underline ml-1">
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;