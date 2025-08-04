import { Tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { cleanResponseFormatting } from "../utils/formatting";

// Tool for generating incremental app plan updates
export class UpdateAppPlanTool extends Tool {
  name = "update_app_plan";
  description = "Use this tool ONCE per user message to update the app plan with new information from the conversation. Call this tool after responding to the user to keep the plan current.";
  
  private llm: ChatOpenAI;
  private conversationHistory: BaseMessage[];
  private currentPlan: string = "";

  constructor(llm: ChatOpenAI, conversationHistory: BaseMessage[] = []) {
    super();
    this.llm = llm;
    this.conversationHistory = conversationHistory;
  }

  async _call(input: string): Promise<string> {
    console.log('UpdateAppPlanTool: Called with input:', input);
    console.log('UpdateAppPlanTool: Current plan length:', this.currentPlan.length);
    
    // Extract key information from conversation history
    const extractedInfo = this.extractKeyInformation();
    
    // Check if this is a fresh start (empty current plan)
    const isFreshStart = !this.currentPlan || this.currentPlan.trim() === "";
    
    const updatePlanPrompt = `You are an expert app planner. Your task is to ${isFreshStart ? 'CREATE A NEW COMPREHENSIVE APP PLAN' : 'UPDATE THE EXISTING APP PLAN'} with information from the conversation.

CRITICAL: You must output ONLY the app plan structure below. Do not ask questions, do not continue the conversation, do not respond conversationally.

TASK: ${isFreshStart ? 'Create a rich, comprehensive initial app plan based on the user\'s input and conversation context. Make it detailed and inspiring to show the user what\'s possible.' : 'Always update the existing app plan to reflect the current conversation state, even if the changes seem minor. Every conversation turn should result in an updated plan.'}

PLAN STRUCTURE - OUTPUT THIS EXACT FORMAT:

## 🎯 Key Features

- [List the main user-facing features and core functionality as bullet points.]

## 🎨 Design Approach

- [Describe the UI/UX strategy and theming approach]

## 📦 Main Entities

- [Define the core entities, their relationships, and how data flows between them. Include entity attributes and business logic interactions.]

## 🔄 Key Business Workflows

- [Detail the critical business workflows, such as status transitions, balance updates in ledgers, and other domain-specific processes. Include triggers, actions, and outcomes for each workflow.]

## 🛤️ User Journeys

- [Describe the primary user journeys, detailing the steps a user takes to achieve key tasks within the app. Include entry points, decision paths, and end goals for each journey.]

## 🏗️ App Structure

- [Outline the main pages and screens of the app, user flow, and navigation structure. Include main UI components and CTAs (Call-To-Actions) for each page.]

${isFreshStart ? '' : `EXISTING PLAN:\n${this.currentPlan}`}

INFORMATION FROM CONVERSATION:
${extractedInfo}

CURRENT CONTEXT: ${input}

INSTRUCTIONS:
${isFreshStart ? 
`- CREATE a rich, comprehensive initial plan based on the user's input
- Use '-' for bullet points and ensure blank lines between items and sections
- Include detailed, inspiring content for each section with proper markdown formatting
- Use **bold** for important terms, feature names, and section headers
- Use *italic* for descriptions, explanations, and emphasis
- Make the plan feel complete and professional with rich formatting
- Show the user what's possible with their app idea
- Use the conversation context to inform the plan
- Be specific and actionable in your recommendations` :
`- ALWAYS update the plan - even if the changes are subtle
- Preserve ALL existing information from the current plan
- Add new information from the conversation with proper markdown formatting
- Use '-' for bullet points and ensure blank lines between items and sections
- Use **bold** for important terms, feature names, and section headers
- Use *italic* for descriptions, explanations, and emphasis
- Update any sections that have new details
- Do NOT remove information unless it's clearly contradicted by new input
- Build upon the existing plan, don't replace it
- If no new information is provided, still refine and improve the existing plan
- Never say "no update needed" - always provide an updated plan`}

NOW GENERATE THE ${isFreshStart ? 'INITIAL' : 'UPDATED'} STRUCTURED PLAN (no conversation, just the plan):`;

    try {
      // Create messages array with only the system prompt and current input
      const messages: BaseMessage[] = [
        new SystemMessage(updatePlanPrompt),
        new HumanMessage("Update the app plan now.")
      ];

      // Call the LLM to generate the updated plan
      const response = await this.llm.invoke(messages);
      
      // Clean up the response formatting
      const cleanedResponse = cleanResponseFormatting(response.content as string);
      
      // Update the current plan for next iteration
      this.currentPlan = cleanedResponse;
      
      return cleanedResponse;
    } catch (error) {
      console.error('Error updating app plan with LLM:', error);
      const errorResponse = `## 🎯 Key Features
**Core Functionality:**
• **User Authentication**: *Secure login and profile management system*
• **Responsive Design**: *Mobile-first approach with desktop optimization*
• **Core Features**: *Essential functionality based on app type and requirements*

**User Experience:**
• **Intuitive Navigation**: *Clear and logical user flow throughout the app*
• **Personalization**: *User-specific content and preferences*
• **Performance**: *Fast loading times and smooth interactions*

## 🎨 Design Approach  
**Visual Design:**
• **Modern Interface**: *Clean, minimalist design with focus on usability*
• **Consistent Branding**: *Cohesive visual identity across all screens*
• **Accessibility**: *WCAG compliant design for inclusive user experience*

**Technical Stack:**
• **Frontend**: *React/Next.js with TypeScript for type safety*
• **Backend**: *RESTful API with Node.js/Express for scalability*
• **Database**: *PostgreSQL/MongoDB for reliable data storage*
• **Deployment**: *Cloud-based hosting with CI/CD pipeline*

**User Experience Principles:**
• **Mobile-First**: *Design for mobile devices first, then enhance for desktop*
• **Progressive Enhancement**: *Core functionality works everywhere, enhanced features where supported*
• **Performance**: *Optimize for speed and responsiveness*

## 🏗️ App Structure
**Page Architecture:**
• **Home/Dashboard**: *Main landing page with key functionality and navigation*
• **User Profile**: *Account management and personal settings*
• **Core Features**: *Primary app functionality pages*
• **Settings**: *Configuration and preferences management*

**Technical Architecture:**
• **Component-Based**: *Modular, reusable UI components*
• **State Management**: *Centralized data flow and state handling*
• **API Integration**: *Secure communication with backend services*
• **Scalable Infrastructure**: *Cloud deployment with auto-scaling capabilities*
`;
      
      return cleanResponseFormatting(errorResponse);
    }
  }

  private extractKeyInformation(): string {
    const userMessages = this.conversationHistory
      .filter(msg => msg instanceof HumanMessage)
      .map(msg => msg.content)
      .join('\n');
    
    const assistantMessages = this.conversationHistory
      .filter(msg => msg instanceof AIMessage)
      .map(msg => msg.content)
      .join('\n');
    
    return `User Inputs: ${userMessages}\n\nAssistant Responses: ${assistantMessages}`;
  }

  // Method to update conversation history
  updateConversationHistory(history: BaseMessage[]): void {
    this.conversationHistory = history;
  }

  // Method to set the current plan (for initialization)
  setCurrentPlan(plan: string): void {
    this.currentPlan = plan;
  }

  // Method to get the current plan
  getCurrentPlan(): string {
    return this.currentPlan;
  }
} 