import React from 'react';
import CheckIcon from './icons/CheckIcon';
import AnimatedItem from './AnimatedItem';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For individuals and hobby projects.',
    features: [
      '1 Project',
      'Basic AI Generation',
      'Community Support',
      '1 GB Storage',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/ month',
    description: 'For small teams and growing businesses.',
    features: [
      'Unlimited Projects',
      'Advanced AI Models',
      'Priority Email Support',
      '50 GB Storage',
      'Team Collaboration',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For large organizations with custom needs.',
    features: [
      'Everything in Pro',
      'Dedicated Account Manager',
      'Custom Integrations',
      'On-premise Deployment',
      '24/7 Premium Support',
    ],
    isPopular: false,
  },
];

interface PricingProps {
  onGetStartedClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onGetStartedClick }) => {
  return (
    <section id="pricing" className="py-20 bg-background dark:bg-k-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-k-foreground">Flexible Plans for Everyone</h2>
          <p className="text-muted-foreground dark:text-k-muted mt-4 max-w-2xl mx-auto">
            Choose the plan that's right for you and unlock the full power of our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {pricingPlans.map((plan, index) => (
            <AnimatedItem key={index} delay={index * 150} className={plan.isPopular ? 'lg:transform lg:scale-105' : ''}>
                 <div
                    className={`bg-card dark:bg-k-secondary p-8 rounded-lg shadow-xl flex flex-col h-full ${plan.isPopular ? 'border-2 border-primary dark:border-k-accent' : 'border border-border dark:border-k-border'}`}
                >
                {plan.isPopular && (
                    <div className="bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary text-xs font-bold tracking-widest uppercase py-1 px-3 rounded-full self-center -mt-12 mb-4">
                    Most Popular
                    </div>
                )}
                <h3 className="text-2xl font-bold text-foreground dark:text-k-foreground text-center mb-2">{plan.name}</h3>
                <p className="text-muted-foreground dark:text-k-muted text-center min-h-[3rem] mb-6">{plan.description}</p>
                <div className="text-4xl font-extrabold text-foreground dark:text-k-foreground text-center mb-6">
                    {plan.price}
                    {plan.period && <span className="text-base font-normal text-muted-foreground dark:text-k-muted">{plan.period}</span>}
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-muted-foreground dark:text-k-muted">
                        <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                {plan.name === 'Enterprise' ? (
                   <a
                    href="mailto:sales@kiel.tech"
                    className={`w-full text-center font-bold py-3 px-8 rounded-md transition-colors duration-300 mt-auto ${plan.isPopular ? 'bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary hover:opacity-90' : 'bg-background dark:bg-k-primary hover:bg-border dark:hover:bg-k-muted text-foreground dark:text-k-foreground'}`}
                  >
                    Contact Sales
                  </a>
                ) : (
                  <button
                      onClick={onGetStartedClick}
                      className={`w-full font-bold py-3 px-8 rounded-md transition-colors duration-300 mt-auto ${plan.isPopular ? 'bg-primary dark:bg-k-accent text-primary-foreground dark:text-k-primary hover:opacity-90' : 'bg-background dark:bg-k-primary hover:bg-border dark:hover:bg-k-muted text-foreground dark:text-k-foreground'}`}
                  >
                      Get Started
                  </button>
                )}
                </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;