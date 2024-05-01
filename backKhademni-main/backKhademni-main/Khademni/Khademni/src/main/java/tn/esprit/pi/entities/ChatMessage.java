package tn.esprit.pi.entities;

public class ChatMessage {


        private String text;
        private String sender; // 'bot' or 'client'

        public ChatMessage(String text, String sender) {
            this.text = text;
            this.sender = sender;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public String getSender() {
            return sender;
        }

        public void setSender(String sender) {
            this.sender = sender;
        }

}
