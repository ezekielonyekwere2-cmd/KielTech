import React, { useEffect, useRef, useState } from 'react';

interface AnimatedItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to trigger this once
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      {
        rootMargin: '0px 0px -50px 0px', // Trigger when item is 50px into view
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Base classes for the animation
  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-5';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedItem;
