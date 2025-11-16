import React from 'react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
  onLater: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose, onSignUp, onLater }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-k-secondary rounded-lg shadow-2xl w-full max-w-sm text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-foreground dark:text-k-foreground mb-4">
          Ready to Create?
        </h2>
        <p className="text-muted-foreground dark:text-k-muted mb-8">
          Sign up for a better experience and save your creations.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={onSignUp}
            className="w-full bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all"
          >
            Sign Up
          </button>
          <button
            onClick={onLater}
            className="w-full bg-background dark:bg-k-primary hover:bg-border dark:hover:bg-k-muted text-foreground dark:text-k-foreground font-bold py-3 px-8 rounded-md transition-all"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;