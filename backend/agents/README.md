# Agents Architecture

This directory contains the AI agents for the 101x application. Each agent is designed to handle specific tasks and can be easily extended with tools and capabilities.

## Current Agents

### AppPlanner Agent
- **Purpose**: Transforms fuzzy product ideas into clear, version-controlled specifications
- **Location**: `appPlanner/`
- **Files**:
  - `appPlannerAgent.ts` - LangChain agent with tools and capabilities
  - `index.ts` - Clean exports

## Agent Structure

Each agent should follow this structure:

```
agents/
├── agentName/
│   ├── agentNameAgent.ts      # LangChain agent with tools
│   ├── index.ts               # Exports
│   └── tools/                 # Agent-specific tools (optional)
│       ├── tool1.ts
│       └── tool2.ts
```

## Adding a New Agent

1. **Create the agent directory**:
   ```bash
   mkdir -p agents/newAgentName
   ```

2. **Create the agent file** (`newAgentNameAgent.ts`) with tools:
   ```typescript
   import { ChatOpenAI } from "@langchain/openai";
   import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
   import { Tool } from "@langchain/core/tools";

   export class NewAgentNameAgent {
     // Implementation with tools
   }
   ```

3. **Create the index file** (`index.ts`):
   ```typescript
   export { NewAgentNameAgent, type ChatMessage, type ChatRequest, type ChatResponse } from './newAgentNameAgent';
   ```

4. **Update the server** to use the new agent:
   ```typescript
   import { NewAgentNameAgent } from './agents/newAgentName';
   
   const newAgentService = new NewAgentNameAgent();
   ```

## Tools

Agents can use tools to perform specific actions:

```typescript
class MyTool extends Tool {
  name = "my_tool";
  description = "Description of what this tool does";

  async _call(input: string): Promise<string> {
    // Tool implementation
    return "Tool result";
  }
}
```

## Best Practices

1. **Consistent Interfaces**: All agents should implement the same `ChatRequest` and `ChatResponse` interfaces
2. **Error Handling**: Always include proper error handling and fallbacks
3. **TypeScript**: Use strict typing for better development experience
4. **Documentation**: Document your agent's purpose and capabilities
5. **Testing**: Add tests for your agent's functionality

## Example Agent Types

- **Planning Agents**: Help with project planning and specification
- **Code Review Agents**: Review and suggest improvements to code
- **Testing Agents**: Generate test cases and scenarios
- **Documentation Agents**: Create and maintain documentation
- **Integration Agents**: Handle API integrations and data processing 