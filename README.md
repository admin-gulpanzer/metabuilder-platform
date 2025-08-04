# MetaBuilder - AI-Powered App Planning Platform

A modern web application that helps users plan and design their apps through AI-assisted conversations and real-time plan generation.

## Features

### 🤖 Simplified AI Agent Architecture
- **Single Agent**: Handles all conversation and planning logic with one comprehensive system prompt
- **UpdateAppPlanTool**: Generates real-time plan updates and comprehensive final plans

### 💬 Interactive Chat Interface
- Real-time conversation with AI assistant
- Intelligent question-asking to understand app requirements
- Context-aware responses based on conversation history

### 📋 Live App Plan Generation
- Real-time plan updates as you discuss your app idea
- Three-section plan structure:
  - 🎯 **Key Features**: Core functionality and user-facing capabilities
  - 🎨 **Design Approach**: UI/UX strategy and technology recommendations
  - 🏗️ **App Structure**: Architecture, data models, and technical implementation

### 🎨 Modern Three-Column Layout
- **Chat Section**: Interactive conversation with AI
- **Plan Section**: Live app plan display with markdown formatting
- **Preview Section**: App preview and visualization (coming soon)

## Technology Stack

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **LangChain** for AI agent orchestration
- **OpenAI GPT-4** for natural language processing

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Lucide React** for modern icons
- **React Markdown** for rich text rendering

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 101x
   ```

2. **Set up environment variables**
   ```bash
   # In backend directory
   cp .env.example .env
   # Add your OpenAI API key to .env
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Start the development servers**
   ```bash
   # Backend (from backend directory)
   npm start
   
   # Frontend (from frontend directory)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## How It Works

### AI Agent Architecture
The app uses a single agent with one specialized tool:

1. **Conversation Management**: The agent handles all conversation logic with a comprehensive system prompt
2. **Information Gathering**: Asks targeted questions to understand user requirements
3. **Plan Generation**: Uses the UpdateAppPlanTool to generate and update plans in real-time
4. **Tool Coordination**: The agent intelligently decides when to use the plan generation tool

### Real-Time Plan Updates
- Every user message triggers both conversation and plan update
- Plans show progress with placeholders for incomplete sections
- Markdown formatting for clear, readable plan presentation

### Responsive Design
- Three-column layout on desktop
- Stacked layout on mobile devices
- Consistent design system across all components

## API Endpoints

### POST /api/chat
Processes user messages and returns both conversation response and updated app plan.

**Request:**
```json
{
  "message": "I want to build a task management app",
  "conversationHistory": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help you?"}
  ]
}
```

**Response:**
```json
{
  "response": "That sounds great! Let me ask you some questions...",
  "appPlan": "🎯 **Key Features**\n\n1. **Task Creation & Management**..."
}
```

### GET /api/health
Health check endpoint for the server.

## Development

### Project Structure
```
101x/
├── backend/
│   ├── agents/
│   │   └── appPlanner/
│   │       ├── tools/
│   │       │   └── UpdateAppPlanTool.ts
│   │       └── appPlannerAgent.ts
│   └── server.ts
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatInterface.tsx
    │   │   ├── AppPlan.tsx
    │   │   └── AppPreview.tsx
    │   └── App.tsx
    └── package.json
```

### Architecture Benefits
- **Simplified Logic**: Single agent handles all conversation and coordination
- **Clear Responsibilities**: Agent manages conversation, tool handles plan generation
- **Easier Maintenance**: Fewer components to maintain and debug
- **Consistent Behavior**: Single system prompt ensures consistent responses
- **Better Performance**: Reduced complexity and fewer tool instances

### Adding New Tools
1. Create a new tool class extending `Tool`
2. Implement the `_call` method
3. Add the tool to the agent's tools array
4. Update the system prompt to include tool usage instructions

### Styling
- CSS modules for component-specific styles
- Consistent design tokens and spacing
- Responsive breakpoints for mobile and tablet

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 