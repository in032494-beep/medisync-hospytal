import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { Message, Sender } from './types';
import { sendMessageToGemini } from './services/geminiService';

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  text: 'Selamat datang! Saya adalah Koordinator Pusat Sistem Rumah Sakit [1]. Silakan ajukan pertanyaan Anda mengenai janji temu, penagihan, rekam medis, atau pendaftaran pasien. Saya akan mengarahkan Anda ke agen spesialis yang tepat.',
  sender: Sender.AGENT,
  timestamp: new Date(),
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: Sender.USER,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text);
      
      const newAgentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AGENT,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAgentMessage]);
    } catch (error) {
      console.error("Failed to get response", error);
      const errorMessage: Message = {
         id: (Date.now() + 1).toString(),
         text: "Maaf, terjadi kesalahan koneksi. Silakan coba lagi.",
         sender: Sender.AGENT,
         timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-[800px] border border-white/50">
        
        <Header />

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 scrollbar-default">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-6">
               <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150 mx-0.5"></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
                 </div>
                 <div className="bg-white text-gray-500 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border border-gray-100">
                    Sedang memproses rute...
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        
      </div>
    </div>
  );
};

export default App;
