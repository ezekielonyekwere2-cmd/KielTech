import React from 'react';

const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-k-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m-7 8a2 2 0 100-4 2 2 0 000 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5A2.5 2.5 0 017 10h1.5a2.5 2.5 0 012.5 2.5v0A2.5 2.5 0 018.5 15H7a2.5 2.5 0 01-2.5-2.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.5a2.5 2.5 0 00-2.5-2.5H15.5a2.5 2.5 0 00-2.5 2.5v0a2.5 2.5 0 002.5 2.5H17a2.5 2.5 0 002.5-2.5z" />
    </svg>
);

export default BrainCircuitIcon;
