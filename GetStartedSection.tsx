import React from 'react';
import AnimatedItem from './AnimatedItem';

interface GetStartedSectionProps {
  onGetStartedClick: () => void;
}

const GetStartedSection: React.FC<GetStartedSectionProps> = ({ onGetStartedClick }) => {
  return (
    <section id="get-started" className="py-20 bg-background dark:bg-k-primary">
      <div className="container mx-auto px-6 text-center">
        <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-k-foreground mb-4">
            Bring Your Ideas to Life
            </h2>
            <p className="text-muted-foreground dark:text-k-muted max-w-2xl mx-auto mb-12">
            Ready to build? Use our powerful AI to generate and preview your next website in minutes. No code required.
            </p>
            <button
                onClick={onGetStartedClick}
                className="bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-4 px-10 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
                Get Started Now
            </button>
        </AnimatedItem>
      </div>
    </section>
  );
};

export default GetStartedSection;
