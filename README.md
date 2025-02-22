

# OpenAI Assistant API Chat

## Introduction

Welcome to the OpenAI Assistant API Chat repository! This innovative chat application allows users to interact with an AI assistant powered by OpenAI's latest "gpt-4-1106-preview" model.

This code is based on opensource project by @admineral. 
Changes have been made to adjust to project requirements, and that is the reason this is not a fork, but it might be possible to adopt new features when available.


## Newest Features


- **Hard Coded Assistant ID**: You can now set a default assistant ID in the`.env` check out the  `.env.example` file. This allows you to specify a default assistant for the chat. If this value is set, the application will use this assistant for the chat. If this value is not set, the application will prompt the user to enter the assistant details. Here's how you can set it:

- **Needs Testing**: Can ANY user provided key work wit ANY assistant ? (or the key needs to belong to the same account the assistant was created in)

## Deployment

This Application is designed to be deployed to a serverless platform, nevertheless, successful deploymnet of multiple agents requires additional work for routing and selection of the agent.

## Features

- **Personalized AI Assistant**: Customize the assistant's name, model, and description for a unique chat experience.
- **Interactive Chat Experience**: Engage in dynamic conversations with the AI assistant.
- **Robust AI Responses**: Leveraging OpenAI's "gpt-4-1106-preview" model (128k context) for intelligent, context-aware chat responses.
- **File Upload**: Users can upload files for the assistant to analyze.
- **Code Interpretation**: (Coming Soon) The assistant can execute Pytho code.
- **Function Calls**: (Coming Soon) Experience interactive functionalities such as API calls based on chat context.
- **GPT-4 Vision Integration**:  
   - **Image Descriptions**: Send pictures to the AI, and it will describe what it sees, providing insights and understanding of the visual content.
   - **Optical Character Recognition (OCR)**:(Coming Soon) The AI can analyze text within images, making it possible to read and respond to textual content in photographs or scanned documents.

# Image Upload

<img src="Public/Image_upload.gif" alt="AgentX" width="600px">

#For Developer

[GPT4-Vision api router ](https://github.com/admineral/OpenAI-Assistant-API-Chat/tree/main/app/api/upload_gpt4v/route.ts)


## Getting Started

### Prerequisites
- Node.js installed on your machine.
- An active OpenAI API key.

### Local Installation
After Cloning the repo run

npm install

npm run dev -- --port XXXX where XXXX is the port number (default without -- --port is 3000)

## Application Architecture Overview

### ChatManager (`ChatManager.ts`)
- **Role**: Central component for managing chat state and operations.
- **Functions**:
  - `startAssistant`: Initializes the chat assistant, manages file uploads, and handles thread creation.
  - `sendMessage`: Sends user messages to the assistant and updates the chat.
  - `getChatState`: Retrieves the current state of the chat, including messages and assistant status.

### API Layer (`api.js`)
- **Purpose**: Acts as an intermediary between the front-end and various API routes.
- **Key Functions**:
  - `uploadImageAndGetDescription`: Uploads images and gets descriptions using the GPT-4 Vision API.
  - `createAssistant`, `createThread`, `runAssistant`: Handles assistant creation, thread management, and assistant operations.

### Assistant Modules (`assistantModules.ts`)
- **Role**: Manages tasks related to the chat assistant, such as file preparation and assistant initialization.
- **Key Functions**:
  - `prepareUploadFile`: Prepares and uploads files for the chat assistant.
  - `initializeAssistant`: Initializes a chat assistant with specific details.
  - `createChatThread`: Creates a chat thread with an initial message.

### Chat Modules (`chatModules.ts`)
- **Purpose**: Manages chat-related functionalities.
- **Key Functions**:
  - `submitUserMessage`: Submits user messages to the chat.
  - `fetchAssistantResponse`: Fetches the latest messages from the assistant.
  - `updateChatState`: Updates the chat state with new messages.


## Detailed Code Explanation

### ChatManager Implementation (`ChatManager.ts`)
- **Singleton Pattern**: Ensures a single instance of `ChatManager` manages the chat state and operations.
- **State Management**: Handles chat state, including messages, thread IDs, assistant status, and loading states.
- **Error Handling**: Robust error handling during chat operations.
- **API Integration**: Integrates with API layer for message sending/receiving and chat thread management.

### API Layer (`api.js`)
- **Central API Management**: Simplifies front-end interactions with a clean API interface.
- **Error Handling**: Ensures smooth application operation with error handling in API requests.

### Front-End Interaction
- **React Hooks**: Utilizes hooks in `useChatState.ts` for state management.
- **User Interface**: `InputForm` and `MessageList` interact with `ChatManager` for displaying messages and handling user inputs.



### Main Components and Flow
- **ChatManager (`ChatManager.ts`)**: Central component managing the chat state and operations.
- **API Layer (`api.js`)**: Intermediary for API interactions.
- **Assistant Modules (`assistantModules.ts`)**: Handles tasks related to the chat assistant.
- **Chat Modules (`chatModules.ts`)**: Manages chat functionalities.

## Detailed Breakdown

### `ChatManager.ts`
This is the core class managing the chat's state and operations.

```typescript
class ChatManager {
  private state: ChatState;
  private static instance: ChatManager | null = null;

  // Singleton pattern to ensure a single ChatManager instance
  private constructor(setChatMessages: (messages: any[]) => void, setStatusMessage: (message: string) => void) {
    this.state = {
      /* State initialization */
    };
    console.log('ChatManager initialized');
  }

  // Method to get the current instance of ChatManager
  public static getInstance(setChatMessages: (messages: any[]) => void, setStatusMessage: (message: string) => void): ChatManager {
    if (this.instance === null) {
      this.instance = new ChatManager(setChatMessages, setStatusMessage);
    }
    return this.instance;
  }

  // Method to start the assistant
  async startAssistant(assistantDetails: any, file: File | null, initialMessage: string): Promise<void> {
    // ... Function logic including API calls to initialize assistant and create chat thread
  }

  // Method to send a message
  async sendMessage(input: string): Promise<void> {
    // ... Function logic to handle message sending
  }

  // Method to get the current chat state
  getChatState(): ChatState {
    console.log('Getting chat state');
    return this.state;
  }
}
```
- **Key Features**:
  - Singleton pattern ensures only one instance of `ChatManager` is created.
  - Manages the chat's state, including messages, assistant's ID, thread ID, and loading states.
  - `startAssistant`: Initiates the assistant and sets up the chat thread.
  - `sendMessage`: Handles sending messages to the assistant.
  - `getChatState`: Retrieves the current state of the chat.

### `api.js`
This module contains functions for various API interactions required by the chat application.

```javascript
// Example of an API function
export const uploadImageAndGetDescription = async (base64Image) => {
  // Code to upload an image and get a description using the OpenAI API
};

export const createAssistant = async (assistantDetails) => {
  // Code to create an assistant
};

// Other API functions like 'createThread', 'runAssistant', etc.
```
- **Purpose**: Provides a centralized and clean interface for API interactions.
- **Key Functions**:
  - `uploadImageAndGetDescription`: Uploads a base64 encoded image and gets a description.
  - `createAssistant`: Creates a new assistant instance.
  - Other functions for managing threads, running assistants, etc.

### `assistantModules.ts`
Contains functions related to preparing and managing the chat assistant.

```typescript
export const prepareUploadFile = async (file: File, setStatusMessage: (message: string) => void): Promise<string> => {
  // Logic to prepare and upload a file for the chat assistant
};

export const initializeAssistant = async (assistantDetails, fileId): Promise<string> => {
  // Logic to initialize an assistant with given details
};

export const createChatThread = async (inputMessage: string): Promise<string> => {
  // Logic to create a chat thread
};
```
- **Purpose**: Handles assistant-related tasks such as file preparation and assistant initialization.

### `chatModules.ts`
Manages chat-related functionalities, primarily dealing with messages.

```typescript
export const submitUserMessage = async (input: string, threadId: string): Promise<void> => {
  // Logic to submit a user's message to the chat
};

export const fetchAssistantResponse = async (runId: string, threadId: string): Promise<string> => {
  // Logic to fetch the latest messages from the assistant
};

export const updateChatState = (prevMessages: Message[], newMessages: Message[], setChatMessages: (messages: any[]) => void): Promise<void> => {
  // Logic to update the chat state with new messages
};
```
- **Purpose**: Manages sending user messages, fetching assistant responses, and updating the chat state.

### React Components
- **`WelcomeForm`**, **`InputForm`**, and **`MessageList`** are React components that build the user interface of the chat application.

 They use hooks and states to manage user interactions and display chat messages.

### API Routes (`/api/*.ts`)
These files define various API routes for handling tasks like creating assistants, listing messages, checking run status, etc. They interact with the OpenAI API and provide endpoints for the frontend to call.

