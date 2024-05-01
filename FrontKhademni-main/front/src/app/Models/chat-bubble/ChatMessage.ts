// src/app/chat-message.interface.ts
export interface ChatMessage {
    text: string; // The message text
    sender: 'bot' | 'client'; // Indicates if the message is from the bot or the client
    timestamp?: Date; // Optional timestamp for when the message was sent
  }
  