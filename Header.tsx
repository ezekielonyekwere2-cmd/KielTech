import React, { useState, useEffect } from 'react';
import { Theme } from '../App';
import ThemeToggle from './ThemeToggle';
import { User } from '../types';
import UserIcon from './icons/UserIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
    currentUser: User | null;
    onLogout: () => void;
    onLoginClick: () => void;
    onSignUpClick: () => void;
    isBuilderVisible: boolean;
    onGoBackHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, currentUser, onLogout, onLoginClick, onSignUpClick, isBuilderVisible, onGoBackHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Start Building', href: '#get-started' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const headerClasses = `sticky top-0 z-50 transition-all duration-300 ${
    scrolled || isBuilderVisible
      ? 'bg-card/95 dark:bg-k-secondary/95 backdrop-blur-sm shadow-lg dark:shadow-k-primary/50 border-b border-border/50 dark:border-k-border/20'
      : 'bg-card/80 dark:bg-k-secondary/80'
  }`;
  
  const authDesktopContent = currentUser ? (
    <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-muted-foreground dark:text-k-muted" />
            <span className="text-sm font-medium text-foreground dark:text-k-foreground hidden sm:inline">{currentUser.email}</span>
        </div>
        <button onClick={onLogout} className="text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors duration-300 text-sm font-medium">Logout</button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
        <button onClick={onLoginClick} className="text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors duration-300 font-medium">Sign In</button>
        <button onClick={onSignUpClick} className="bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300 text-sm">Sign Up</button>
    </div>
  );

  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isBuilderVisible) {
      onGoBackHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
            {isBuilderVisible && (
                <button onClick={onGoBackHome} className="md:hidden text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            )}
            <button onClick={handleLogoClick} className="text-2xl font-bold text-primary dark:text-k-accent hover:text-foreground dark:hover:text-k-foreground transition-colors duration-300">
            KielTech
            </button>
        </div>

        {isBuilderVisible ? (
             <div className="hidden md:flex items-center gap-4">
                <button onClick={onGoBackHome} className="flex items-center gap-2 text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors duration-300">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back to Home
                </button>
             </div>
        ) : (
            <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
                <a
                key={link.name}
                href={link.href}
                className="text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors duration-300"
                >
                {link.name}
                </a>
            ))}
            </nav>
        )}
       
        <div className="hidden md:flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="w-px h-6 bg-border dark:bg-k-border"></div>
            {authDesktopContent}
        </div>
        <div className="md:hidden flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            {!isBuilderVisible && (
                 <button onClick={() => setIsOpen(!isOpen)} className="text-foreground dark:text-k-foreground focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            )}
        </div>
      </div>
      {isOpen && !isBuilderVisible && (
        <div className="md:hidden bg-card dark:bg-k-secondary">
          <nav className="flex flex-col items-center space-y-4 py-4 border-t border-border dark:border-k-border">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-border dark:border-k-border w-full flex flex-col items-center gap-4">
               {currentUser ? (
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-sm font-medium text-foreground dark:text-k-foreground">{currentUser.email}</span>
                        <button onClick={() => { onLogout(); setIsOpen(false); }} className="text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors duration-300 font-medium">Logout</button>
                    </div>
                ) : (
                    <>
                        <button onClick={() => { onLoginClick(); setIsOpen(false); }} className="w-full text-foreground dark:text-k-foreground font-medium py-2">Sign In</button>
                        <button onClick={() => { onSignUpClick(); setIsOpen(false); }} className="w-4/5 bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300">Sign Up</button>
                    </>
                )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;