import React, { useState } from 'react';
import { GeneratedCode } from '../types';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import CodeBracketIcon from './icons/CodeBracketIcon';

interface WebsitePreviewProps {
  code: GeneratedCode;
  onOpenEditor?: () => void;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ code, onOpenEditor }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');
  const [copiedTab, setCopiedTab] = useState<'html' | 'css' | 'js' | null>(null);

  const getFullHtml = () => {
    if (!code) return '';
    const { html, css, js } = code;
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Generated Preview</title>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
  };

  const getPreviewSrcDoc = () => {
    if (!code) return '';
    const { html, css, js } = code;
    return `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
  }
  
  const openInNewTab = () => {
    const fullHtml = getFullHtml();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  const handleCopy = (content: string, tab: 'html' | 'css' | 'js') => {
    navigator.clipboard.writeText(content);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const CodeBlock: React.FC<{ code: string; language: 'html' | 'css' | 'js' }> = ({ code, language }) => (
    <div className="relative h-full bg-k-primary text-k-foreground p-4 rounded-b-lg overflow-auto">
      <button
        onClick={() => handleCopy(code, language)}
        className="absolute top-3 right-3 p-2 bg-k-secondary hover:bg-k-border rounded-md text-k-muted hover:text-k-foreground transition-colors"
        aria-label={`Copy ${language} code`}
      >
        {copiedTab === language ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
      </button>
      <pre className="h-full text-sm whitespace-pre-wrap">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
  
  const tabClasses = (tabName: typeof activeTab) =>
    `px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
      activeTab === tabName
        ? 'border-k-accent text-k-accent'
        : 'border-transparent text-k-muted hover:text-k-foreground'
    }`;

  return (
    <div className="bg-background dark:bg-k-primary rounded-lg border border-border dark:border-k-border shadow-md overflow-hidden h-[60vh] max-h-[700px] flex flex-col">
      <div className="flex justify-between items-center border-b border-border dark:border-k-border px-4 flex-shrink-0">
        <div className="flex">
          <button onClick={() => setActiveTab('preview')} className={tabClasses('preview')}>Preview</button>
          <button onClick={() => setActiveTab('html')} className={tabClasses('html')}>HTML</button>
          <button onClick={() => setActiveTab('css')} className={tabClasses('css')}>CSS</button>
          <button onClick={() => setActiveTab('js')} className={tabClasses('js')}>JavaScript</button>
        </div>
        {onOpenEditor && (
             <div className="flex items-center gap-2">
                <button onClick={openInNewTab} className="p-2 text-k-muted hover:text-k-foreground transition-colors" aria-label="Open preview in new tab">
                    <ExternalLinkIcon className="w-5 h-5" />
                </button>
                <button onClick={onOpenEditor} className="p-2 text-k-muted hover:text-k-foreground transition-colors" aria-label="Open code editor">
                    <CodeBracketIcon className="w-5 h-5" />
                </button>
            </div>
        )}
      </div>
      <div className="flex-grow relative min-h-0">
        {activeTab === 'preview' && (
          <iframe
            srcDoc={getPreviewSrcDoc()}
            title="AI Generated Website Preview"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-none bg-white"
          />
        )}
        {activeTab === 'html' && <CodeBlock code={code.html} language="html" />}
        {activeTab === 'css' && <CodeBlock code={code.css} language="css" />}
        {activeTab === 'js' && <CodeBlock code={code.js} language="js" />}
      </div>
    </div>
  );
};

export default WebsitePreview;
