import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  links?: { label: string; href: string; external?: boolean }[];
}

const SYSTEM_PROMPT = `You are AkashBot, a friendly and concise personal assistant for Akash Karmakar's portfolio. Your job is to showcase Akash's expertise in Cloud Engineering and Agentic AI.

ABSOLUTE RULES:
1. MAXIMUM 3 SHORT SENTENCES.
2. ALWAYS output the [LINKS] JSON block at the end. NEVER put URLs in message text.
3. If asked about something unrelated, say: "I only have data on Akash's professional background! Ask about his Cloud projects, C++ physics engine, or DSA ranks." [LINKS]{"links":[{"label":"View Projects","href":"/#portfolio"}]}[/LINKS]
4. Speak in the third person ("Akash built...", "He specializes in...").

LINKS FORMAT:
[LINKS]{"links":[{"label":"View Projects","href":"/#portfolio"},{"label":"GitHub","href":"https://github.com/Akash-Karma","external":true}]}[/LINKS]

PORTFOLIO SECTION LINKS:
- Home: /#home
- About: /#about
- Skills: /#skills
- Projects: /#portfolio
- Certifications: /certifications
- Contact: /#contact

EXTERNAL LINKS:
- GitHub: https://github.com/Akash-Karma
- LinkedIn: https://www.linkedin.com/in/akash-karmakar-
- LeetCode: https://leetcode.com/u/Akash_Karma/
- Resume/CV: https://drive.google.com/drive/folders/1vx-_cNVLyWmHns3ed-2RtMUsJsoxaz2k

═══════════════════════════════════════
AKASH KARMAKAR'S CORE DATA
═══════════════════════════════════════

EDUCATION & STATS:
- B.Tech in CS (Cloud Engineering) at LPU | 8.64 CGPA.
- LeetCode: Knight rank, 1914 Max Rating, 600+ problems solved.
- Achievements: 1st Place Hack-IOT Hackathon Winner, Dean's List (Top 10%).

CORE PROJECTS:
1. Agentic-Draft: Autonomous document platform using LangGraph.js and Redis distributed state.
2. FusionBox: 2D Physics engine built with C++ and SFML, utilizing Box2D 3.0.
3. Process-Monitor: System resource tracker with ML-based anomaly detection.

TECHNICAL SKILLS:
- Cloud: AWS, Docker, Kubernetes, Redis, BullMQ.
- Languages: C++, Python, JavaScript (Next.js, Node.js).
- AI: Agentic workflows, State-machine architecture, NLP.`;

const parseLinks = (content: string): { text: string; links: { label: string; href: string; external?: boolean }[] } => {
  const linkMatch = content.match(/\[LINKS\](.*?)\[\/LINKS\]/s);
  if (!linkMatch) return { text: content, links: [] };
  try {
    const parsed = JSON.parse(linkMatch[1]);
    const text = content.replace(/\[LINKS\].*?\[\/LINKS\]/s, '').trim();
    return { text, links: parsed.links || [] };
  } catch {
    return { text: content.replace(/\[LINKS\].*?\[\/LINKS\]/s, '').trim(), links: [] };
  }
};

const SUGGESTIONS = [
  "Tell me about Agentic-Draft",
  "What are Akash's Cloud skills?",
  "Show me his LeetCode rank",
  "How did he win Hack-IOT?",
  "Show me his resume",
];

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    content: "Hi! I'm AkashBot 👋 I'm here to help you explore Akash Karmakar's work in Cloud Engineering and Agentic AI. What would you like to see first?",
    links: [
      { label: 'View Projects', href: '/#portfolio' },
      { label: 'View Resume', href: 'https://drive.google.com/drive/folders/1vx-_cNVLyWmHns3ed-2RtMUsJsoxaz2k', external: true },
      { label: 'Contact Akash', href: '/#contact' },
    ],
  },
];

const MAX_HISTORY = 6;

export default function AkashBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      inputRef.current?.focus();
    }
  }, [messages, loading, open]);

  const send = async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: userText };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const history = updated.slice(-MAX_HISTORY).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 250,
          temperature: 0.5,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
        }),
      });

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "I'm having a bit of trouble connecting. Try again in a second!";
      const { text: cleanText, links } = parseLinks(raw);

      setMessages(prev => [...prev, { role: 'assistant', content: cleanText, links }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an error. Please contact Akash directly!",
        links: [{ label: 'Email Akash', href: 'mailto:mohd.ksr2003@gmail.com', external: true }],
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLink = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
      return;
    }
    const id = href.replace('/#', '');
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {open ? <X className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-white" />}
          {!open && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[520px] bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">AkashBot</p>
              <p className="text-white/70 text-xs">Cloud & AI Assistant</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-purple-600'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                </div>
                <div className={`max-w-[80%] space-y-2 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 py-2 text-sm rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800'}`}>
                    {msg.content}
                  </div>
                  {msg.links && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.links.map((link, li) => (
                        <button key={li} onClick={() => handleLink(link.href, link.external)} className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/80 text-white hover:scale-105 transition-transform">
                          {link.label} {link.external ? '↗' : '→'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="px-3 py-3 bg-white/5 border-t border-white/10">
            <div className="flex gap-2">
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask AkashBot..." className="flex-1 bg-white/10 rounded-full px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 border border-white/20" />
              <button onClick={() => send()} disabled={!input.trim() || loading} className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}