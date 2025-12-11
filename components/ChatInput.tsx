import React, { useState } from 'react';
import { SendHorizontal, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="bg-white border-t border-gray-100 p-4 rounded-b-2xl">
      <form onSubmit={handleSubmit} className="flex gap-3 relative items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ketik pertanyaan Anda di sini..."
          disabled={isLoading}
          className="flex-grow p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all text-gray-700 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <SendHorizontal className="w-5 h-5" />
          )}
        </button>
      </form>
      <p className="text-center text-xs text-gray-400 mt-3">
        AI dapat membuat kesalahan. Harap verifikasi informasi penting.
      </p>
    </div>
  );
};
