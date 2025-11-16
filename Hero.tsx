import React from 'react';

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-card dark:bg-transparent">
      <div className="absolute inset-0 bg-animated-gradient opacity-0 dark:opacity-80 dark:animate-gradient"></div>
      <div className="relative z-10 px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground dark:text-k-foreground mb-4">
          Building the Future with <span className="text-primary dark:text-k-accent">Innovative Technology</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground dark:text-k-muted max-w-3xl mx-auto mb-8">
          We transform complex challenges into elegant, scalable solutions through cutting-edge software engineering and artificial intelligence.
        </p>
        <button
          onClick={onGetStartedClick}
          className="bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl animate-pulse"
        >
          Explore Our Services
        </button>
      </div>
    </section>
  );
};

export default Hero;