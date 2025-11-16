import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import GetStartedSection from './components/GetStartedSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ExperienceModal from './components/ExperienceModal';
import AiBuilder from './components/AiBuilder';
import CookieBanner from './components/CookieBanner';
import PlanSelectionModal from './components/PlanSelectionModal';
import { User } from './types';
import { getCurrentUser, logout } from './services/authService';

export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
        return storedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isBuilderVisible, setIsBuilderVisible] = useState(false);
  const [authRedirectToBuilder, setAuthRedirectToBuilder] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);


  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' 'dark' : 'light'));
  };
  
  const handleOpenAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setIsBuilderVisible(false); // Go back to home on logout
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (authRedirectToBuilder) {
      setIsBuilderVisible(true);
      setAuthRedirectToBuilder(false);
    }
  }

  const handleProceedToNextStep = () => {
    if (currentUser) {
      setIsBuilderVisible(true);
    } else {
      setIsExperienceModalOpen(true);
    }
  };

  const handleGetStartedClick = () => {
    const hasChosenPlan = localStorage.getItem('kieltech_selected_plan');
    if (hasChosenPlan) {
      handleProceedToNextStep();
    } else {
      setIsPlanModalOpen(true);
    }
  };

  const handlePlanSelected = (plan: 'free' | 'pro') => {
    localStorage.setItem('kieltech_selected_plan', plan);
    setIsPlanModalOpen(false);
    handleProceedToNextStep();
  };

  const handleExperienceModalSignUp = () => {
    setIsExperienceModalOpen(false);
    setAuthRedirectToBuilder(true);
    handleOpenAuthModal('signup');
  };

  const handleExperienceModalLater = () => {
    setIsExperienceModalOpen(false);
    setIsBuilderVisible(true);
  };
  
  const handleGoBackHome = () => {
    setIsBuilderVisible(false);
  };

  return (
    <div className="bg-background dark:bg-k-primary min-h-screen">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => handleOpenAuthModal('login')}
        onSignUpClick={() => handleOpenAuthModal('signup')}
        isBuilderVisible={isBuilderVisible}
        onGoBackHome={handleGoBackHome}
      />
      {isBuilderVisible ? (
        <AiBuilder />
      ) : (
        <>
          <main>
            <Hero onGetStartedClick={handleGetStartedClick} />
            <Features />
            <GetStartedSection onGetStartedClick={handleGetStartedClick} />
            <Testimonials />
            <Pricing onGetStartedClick={handleGetStartedClick} />
            <FAQ />
            <CTA onGetStartedClick={handleGetStartedClick} />
          </main>
          <Footer />
        </>
      )}

      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => {
            setIsAuthModalOpen(false);
            setAuthRedirectToBuilder(false); // Reset if modal is closed manually
          }}
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      
      <PlanSelectionModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onPlanSelect={handlePlanSelected}
      />
      
      <ExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        onSignUp={handleExperienceModalSignUp}
        onLater={handleExperienceModalLater}
      />
      <CookieBanner />
    </div>
  );
};

export default App;
