import React from 'react';
import AnimatedItem from './AnimatedItem';

const testimonialsData = [
  {
    quote: "KielTech delivered a solution that exceeded our expectations. Their AI integration is flawless and has boosted our productivity by 40%.",
    name: "Jane Doe",
    title: "CEO, Innovate Inc.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    quote: "The team's expertise in cloud infrastructure is unmatched. They built a scalable and secure system that we can rely on completely.",
    name: "John Smith",
    title: "CTO, Future Systems",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    quote: "Working with KielTech was a fantastic experience. They are professional, responsive, and truly understand the complexities of modern web development.",
    name: "Emily White",
    title: "Product Manager, Creative Solutions",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-card dark:bg-k-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-k-foreground">Trusted by Innovators</h2>
          <p className="text-muted-foreground dark:text-k-muted mt-4 max-w-2xl mx-auto">
            See what our partners are saying about our work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <AnimatedItem key={index} delay={index * 150}>
              <div
                className="bg-background dark:bg-k-primary p-8 rounded-lg shadow-xl flex flex-col justify-between h-full"
              >
                <p className="text-muted-foreground dark:text-k-muted italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold text-foreground dark:text-k-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary dark:text-k-accent">{testimonial.title}</p>
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

export default Testimonials;
