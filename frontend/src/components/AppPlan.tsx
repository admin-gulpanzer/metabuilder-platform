import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Copy, Check, Bot } from 'lucide-react';
import './AppPlan.css';

interface AppPlanProps {
  plan: string | null;
  isLoading?: boolean;
}

const AppPlan: React.FC<AppPlanProps> = ({ plan, isLoading = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPlan = async () => {
    if (!plan) return;
    
    try {
      await navigator.clipboard.writeText(plan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
    } catch (err) {
      console.error('Failed to copy plan:', err);
    }
  };

  if (!plan && !isLoading) {
    return (
      <div className="app-plan">
        <div className="app-plan-header">
          <div className="app-plan-header-content">
            <FileText className="app-plan-icon" />
            <div>
              <h2>App Plan Canvas</h2>
              <p>Your live app plan will appear here as we discuss your idea</p>
            </div>
          </div>
        </div>
        
        <div className="app-plan-content">
          <div className="app-plan-placeholder">
            <div className="placeholder-icon">📱</div>
            <h3>Start the conversation</h3>
            <p>Begin chatting with the AI assistant to see your app plan take shape in real-time on this canvas.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-plan">
      <div className="app-plan-header">
        <div className="app-plan-header-content">
          <FileText className="app-plan-icon" />
          <div>
            <h2>App Plan Canvas</h2>
            <p>Live canvas updating from our conversation</p>
          </div>
        </div>
        <div className="app-plan-header-actions">
          {isLoading && (
            <div className="app-plan-loading">
              <div className="loading-indicator">
                <Bot className="loading-icon" />
              </div>
            </div>
          )}
          {plan && (
            <button 
              className={`copy-plan-button ${copied ? 'copied' : ''}`}
              onClick={handleCopyPlan}
              title={copied ? "Copied!" : "Copy app plan to clipboard"}
            >
              {copied ? (
                <>
                  <Check className="copy-icon" />
                  <span className="copy-text">Copied!</span>
                </>
              ) : (
                <Copy className="copy-icon" />
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="app-plan-content">
        {isLoading && !plan && (
          <div className="app-plan-loading-content">
            <div className="loading-spinner">
              <Bot className="bot-icon" />
            </div>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        {plan && (
          <div className={`app-plan-markdown ${isLoading ? 'updating' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{plan}</ReactMarkdown>
            {isLoading && (
              <div className="plan-updating-overlay">
                <div className="updating-indicator">
                  <Bot className="bot-icon" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppPlan; 