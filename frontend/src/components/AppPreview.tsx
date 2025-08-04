import { Smartphone, Monitor, Tablet } from 'lucide-react';
import './AppPreview.css';

const AppPreview = () => {
  return (
    <div className="app-preview">
      <div className="preview-header">
        <div className="preview-header-content">
          <Monitor className="app-plan-icon" />
          <div>
            <h2>App Preview</h2>
            <p>See your app in action</p>
          </div>
        </div>
      </div>
      
      <div className="preview-content">
        <div className="coming-soon-container">
          <div className="coming-soon-icon">
            <Monitor size={40} />
          </div>
          <h3>Coming Soon</h3>
          <p>Your app preview will appear here once you start building with the AI assistant.</p>
          
          <div className="device-selector">
            <button className="device-button active">
              <Monitor size={20} />
              <span>Desktop</span>
            </button>
            <button className="device-button">
              <Tablet size={20} />
              <span>Tablet</span>
            </button>
            <button className="device-button">
              <Smartphone size={20} />
              <span>Mobile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreview; 