
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Koda Assistant inicializado. ¿Cómo puedo ayudarte hoy, desarrollador?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            Eres el Asistente de Koda Engine. 
            El motor es un creador de juegos 2D profesional. 
            Responde siempre en español. 
            Usa un lenguaje técnico de desarrollador.
            Mantén las respuestas cortas y útiles.
          `
        }
      });

      const text = response.text || 'Error en la respuesta del motor AI.';
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Conexión con el núcleo AI fallida.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40">
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[9px] font-mono text-zinc-600 uppercase mb-1 tracking-widest">
              {m.role === 'user' ? 'Local_User' : 'Koda_AI'}
            </span>
            <div className={`max-w-[90%] rounded px-3 py-2 text-xs font-medium leading-relaxed ${
              m.role === 'user' 
                ? 'bg-[#00ff9d] text-black border border-[#00ff9d]/20' 
                : 'bg-zinc-900 text-zinc-300 border border-white/5'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col items-start">
            <div className="bg-zinc-900 text-zinc-500 rounded px-3 py-2 text-[10px] font-mono border border-white/5 animate-pulse">
              [ANALYZING_INPUT...]
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-zinc-950/50">
        <div className="flex gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Command..."
            className="flex-grow bg-black border border-white/10 rounded px-4 py-2 text-xs font-mono focus:outline-none focus:border-[#00ff9d]/50 text-[#00ff9d] transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-[#00ff9d] hover:bg-[#00cc7e] disabled:opacity-50 text-black px-4 py-2 rounded transition-all"
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
