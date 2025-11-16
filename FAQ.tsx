import React, { useState } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import AnimatedItem from './AnimatedItem';

const faqData = [
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in a wide range of modern technologies, including React, Next.js, and Vue for frontend development, Node.js and Python for backend solutions, and machine learning frameworks like TensorFlow and PyTorch for our AI-powered services. We also have deep expertise in cloud platforms like AWS, Google Cloud, and Azure."
  },
  {
    question: "How does the AI Website Builder work?",
    answer: "Our AI Website Builder leverages the power of the Gemini API. You provide a natural language description of the website you envision, and our system prompts the AI to generate the complete HTML, CSS, and JavaScript code. It's a powerful tool for rapidly prototyping and building simple websites."
  },
  {
    question: "What kind of support is included in the Pro plan?",
    answer: "The Pro plan includes priority email support, ensuring your queries are addressed promptly by our technical team. You also get access to advanced AI models, team collaboration features, and significantly more storage compared to the Starter plan."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time. If you cancel, your plan will remain active until the end of the current billing cycle. We believe in flexibility and making our services as user-friendly as possible."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-card dark:bg-k-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-k-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground dark:text-k-muted mt-4 max-w-2xl mx-auto">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
             <AnimatedItem key={index} delay={index * 100}>
                <div className="bg-background dark:bg-k-primary rounded-lg shadow-lg overflow-hidden border border-border dark:border-k-border/50">
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left p-6 font-semibold text-lg text-foreground dark:text-k-foreground hover:bg-border/50 dark:hover:bg-k-border/20 transition-colors duration-200"
                >
                    <span>{faq.question}</span>
                    <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div
                    className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="overflow-hidden">
                        <p className="p-6 pt-0 text-muted-foreground dark:text-k-muted leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                </div>
                </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;