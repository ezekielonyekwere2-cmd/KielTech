import React from 'react';

const Footer: React.FC = () => {
    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Start Building', href: '#get-started' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Pricing', href: '#pricing' },
    ];

    const socialLinks = [
        { name: 'Twitter', href: '#' },
        { name: 'GitHub', href: '#' },
        { name: 'LinkedIn', href: '#' },
    ];

  return (
    <footer className="bg-card dark:bg-k-secondary border-t border-border dark:border-k-border/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand */}
            <div className="md:col-span-1">
                <a href="#" className="text-2xl font-bold text-primary dark:text-k-accent">
                KielTech
                </a>
                <p className="text-muted-foreground dark:text-k-muted mt-2 max-w-xs">
                Building the future with innovative technology solutions.
                </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="font-bold text-foreground dark:text-k-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2">
                {navLinks.map(link => (
                    <li key={link.name}>
                    <a href={link.href} className="text-muted-foreground dark:text-k-muted hover:text-primary dark:hover:text-k-accent transition-colors">
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
                <h4 className="font-bold text-foreground dark:text-k-foreground mb-4">Legal</h4>
                <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground dark:text-k-muted hover:text-primary dark:hover:text-k-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground dark:text-k-muted hover:text-primary dark:hover:text-k-accent transition-colors">Terms of Service</a></li>
                </ul>
            </div>

            {/* Column 4: Social */}
             <div>
                <h4 className="font-bold text-foreground dark:text-k-foreground mb-4">Connect</h4>
                <ul className="space-y-2">
                    {socialLinks.map(link => (
                        <li key={link.name}>
                        <a href={link.href} className="text-muted-foreground dark:text-k-muted hover:text-primary dark:hover:text-k-accent transition-colors">
                            {link.name}
                        </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="mt-12 border-t border-border dark:border-k-border/20 pt-8 text-center text-muted-foreground dark:text-k-muted">
            <p>&copy; {new Date().getFullYear()} KielTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;