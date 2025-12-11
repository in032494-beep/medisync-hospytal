import React from 'react';
import { Message, Sender } from '../types';
import { User, Bot, ArrowRightCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;
  
  // Extract Intent tag if present in Agent message
  let content = message.text;
  let intentTag = '';
  
  if (!isUser && content.includes('[Rute:')) {
    const match = content.match(/\[Rute: (.*?)\]/);
    if (match) {
      intentTag = match[1];
      content = content.replace(match[0], '').trim();
    }
  }

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          isUser ? 'bg-medical-600' : 'bg-emerald-500'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Bubble Content */}
        <div className="flex flex-col gap-1">
          {intentTag && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mb-1 border border-emerald-100 flex items-center gap-1">
               <ArrowRightCircle className="w-3 h-3" />
               Rute: {intentTag}
            </span>
          )}
          
          <div className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
            isUser 
              ? 'bg-medical-600 text-white rounded-tr-none' 
              : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
          }`}>
            {content}
          </div>
          
          <span className={`text-[11px] text-gray-400 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
