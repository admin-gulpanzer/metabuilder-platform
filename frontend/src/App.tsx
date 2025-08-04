import './App.css'
import ChatInterface from './components/ChatInterface'
import AppPreview from './components/AppPreview'
import AppPlan from './components/AppPlan'
import { useState } from 'react'

function App() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MetaBuilder</h1>
        <p>Build your app with AI assistance</p>
      </header>
      
      <main className="app-main">
        <div className="chat-section">
          <ChatInterface 
            onPlanUpdate={(plan) => setCurrentPlan(plan)}
            onPlanLoading={(loading) => setIsPlanLoading(loading)}
            currentPlan={currentPlan}
          />
        </div>
        
        <div className="canvas-section">
          <AppPlan 
            plan={currentPlan}
            isLoading={isPlanLoading}
          />
        </div>
        
        <div className="preview-section">
          <AppPreview />
        </div>
      </main>
    </div>
  )
}

export default App
