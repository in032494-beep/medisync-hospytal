export enum Sender {
  USER = 'user',
  AGENT = 'agent'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  intent?: string; // To store the detected route/intent
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
