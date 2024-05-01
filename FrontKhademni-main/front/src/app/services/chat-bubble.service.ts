import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/app/Models/chat-bubble/ChatMessage'; // Correct import for the data model

@Injectable({
  providedIn: 'root',
})
export class ChatBubbleService {
  private baseUrl = 'http://localhost:8084/chatbot'; // Base URL for the backend service

  constructor(private http: HttpClient) {}

  // Accepts a ChatMessage object to send to the backend and returns an Observable of ChatMessage
  chatfct(chatMessage: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.baseUrl}/respond`, chatMessage);
  }
}
