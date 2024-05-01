import { Component } from '@angular/core';
import { ChatBubbleService } from 'src/app/services/chat-bubble.service'; // Correct import for the service
import { ChatMessage } from 'src/app/Models/chat-bubble/ChatMessage'; // Correct import for the data model

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent {
  isChatOpen = false;
  chatHistory: ChatMessage[] = [];
  newMessage = '';

  constructor(private chatService: ChatBubbleService) {
    // Initialize with a welcome message
    this.addMessage({ text: 'Welcome! How can I help you today?', sender: 'bot' });
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const clientMessage: ChatMessage = { text: this.newMessage, sender: 'client' };
      
      this.addMessage(clientMessage);

      this.chatService.chatfct(clientMessage).subscribe({
        next: (response: ChatMessage) => {
          this.addMessage({ text: response.text, sender: 'bot' });
        },
        error: (error) => {
          console.error('Error while sending message:', error);
        },
        complete: () => {
          console.log('Chat message sent and response received');
        }
      });

      this.newMessage = '';
    }
  }

  addMessage(message: ChatMessage): void {
    this.chatHistory.push(message);
  }
}
