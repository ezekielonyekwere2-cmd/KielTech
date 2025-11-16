import React, { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'kieltech_cookie_consent';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentStatus) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="max-w-4xl mx-auto bg-card/95 dark:bg-k-secondary/95 backdrop-blur-sm shadow-2xl rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border dark:border-k-border/50">
        <div className="text-sm text-muted-foreground dark:text-k-muted">
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-4">
          <button
            onClick={() => handleConsent('declined')}
            className="font-medium text-foreground dark:text-k-foreground hover:text-primary dark:hover:text-k-accent transition-colors text-sm"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-2 px-5 rounded-md hover:opacity-90 transition-all text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;