import React from 'react';
import CheckIcon from './icons/CheckIcon';
import StarIcon from './icons/StarIcon';

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (plan: 'free' | 'pro') => void;
}

const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({ isOpen, onClose, onPlanSelect }) => {
  if (!isOpen) return null;

  const freeFeatures = ['1 Project/Day', 'Basic AI Models', 'Community Support'];
  const proFeatures = ['Unlimited Projects', 'Advanced AI Models', 'Priority Support'];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-k-secondary rounded-2xl shadow-2xl w-full max-w-xs text-center p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-xl font-bold text-foreground dark:text-k-foreground">
            Choose Your Plan
          </h2>
          <p className="text-sm text-muted-foreground dark:text-k-muted mt-1">
            Start creating with the plan that's right for you.
          </p>
        </div>

        {/* Free Plan */}
        <button
          onClick={() => onPlanSelect('free')}
          className="p-4 border border-border dark:border-k-border rounded-lg text-left hover:bg-background dark:hover:bg-k-primary transition-colors"
        >
          <h3 className="font-bold text-foreground dark:text-k-foreground">Free</h3>
          <p className="text-xs text-muted-foreground dark:text-k-muted mb-3">For personal projects</p>
          <ul className="space-y-2">
            {freeFeatures.map(feat => (
              <li key={feat} className="flex items-center text-xs text-muted-foreground dark:text-k-muted">
                <CheckIcon className="w-4 h-4 mr-2" /> {feat}
              </li>
            ))}
          </ul>
        </button>

        {/* Pro Plan */}
        <button
          onClick={() => onPlanSelect('pro')}
          className="p-4 border-2 border-primary dark:border-k-accent rounded-lg text-left relative overflow-hidden bg-primary/5 dark:bg-k-accent/10 hover:bg-primary/10 dark:hover:bg-k-accent/20 transition-colors"
        >
          <div className="absolute top-0 right-0 p-1 bg-primary dark:bg-k-accent rounded-bl-lg">
            <StarIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-primary dark:text-k-accent">Pro</h3>
          <p className="text-xs text-muted-foreground dark:text-k-muted mb-3">For professional builders</p>
          <ul className="space-y-2">
            {proFeatures.map(feat => (
              <li key={feat} className="flex items-center text-xs text-muted-foreground dark:text-k-muted">
                <CheckIcon className="w-4 h-4 mr-2" /> {feat}
              </li>
            ))}
          </ul>
        </button>
      </div>
    </div>
  );
};

export default PlanSelectionModal;
