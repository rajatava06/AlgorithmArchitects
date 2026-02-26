
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Play, 
  Mail, 
  Lock, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  BarChart3,
  Zap,
  Menu,
  X,
  User,
  LayoutGrid,
  Calendar as CalendarIcon,
  FileText,
  Shield,
  Upload,
  Clock,
  Sparkles,
  Sun,
  Moon,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Plus,
  MessageSquare,
  FileUp,
  RotateCcw,
  Lightbulb,
  Bell,
  Search,
  Filter,
  Check,
  Send,
  Bot,
  Loader2,
  Paperclip,
  Image as ImageIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Github,
  Linkedin,
  Twitter,
  Quote,
  Wand2,
  Timer,
  Brain,
  Database,
  Cpu,
  Facebook,
  Instagram,
  ArrowUpRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Gemini AI Setup ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Types ---
type TabType = 'Dashboard' | 'Syllabus Analysis' | 'My Timetable' | 'AI Notes' | 'Proctored Tests';
type ViewType = 'HOME' | 'LEARNING' | 'RESOURCE' | 'CHATBOT';

interface TestData {
  title: string;
  module: string;
  questions: number;
  time: string;
  status: 'Ready' | 'Scheduled' | 'Locked' | 'Auto-Generated';
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  filePreview?: string;
}

interface SelectedFile {
  data: string; // base64
  mimeType: string;
  name: string;
}

// --- Universal Footer Component ---
const UniversalFooter = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <footer className={`relative overflow-hidden pt-20 pb-10 border-t ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-gray-50 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff6b00] rounded-xl flex items-center justify-center shadow-2xl">
                <Brain size={20} fill="white" className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-[#ff6b00]">NOVAMIND</span>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Pioneering the next generation of cognitive learning systems through neural AI and adaptive proctoring. Master any subject with the speed of thought.
            </p>
            <div className="flex items-center gap-4">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-[#ff6b00] hover:text-[#ff6b00] ${isDarkMode ? 'border-white/5 bg-white/5 text-gray-500' : 'border-slate-200 bg-white text-slate-400 shadow-sm'}`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ecosystem</h4>
            <ul className="space-y-4">
              {['Learning Hub', 'AI Proctoring', 'Neural Timetable', 'Cloud Sync'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm font-medium transition-colors hover:text-[#ff6b00] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Support</h4>
            <ul className="space-y-4">
              {['Developer API', 'Neural Docs', 'Security Hub', 'Terms of Sync'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm font-medium transition-colors hover:text-[#ff6b00] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Newsletter</h4>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Stay updated with latest AI architectural breakthroughs.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="architect@novamind.ai" 
                className={`w-full pl-5 pr-12 py-4 rounded-2xl outline-none border-2 transition-all text-sm font-medium ${isDarkMode ? 'bg-white/5 border-white/5 focus:border-[#ff6b00] text-white' : 'bg-white border-slate-200 focus:border-[#ff6b00] text-slate-900 shadow-sm'}`}
              />
              <button className="absolute right-2 top-2 w-10 h-10 flex items-center justify-center bg-[#ff6b00] text-white rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={`pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
          <div className="flex items-center gap-6">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-slate-400'}`}>
              © 2025 NEURAL SYSTEMS INC.
            </span>
            <div className={`h-4 w-[1px] ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`}></div>
            <a href="#" className={`text-[10px] font-black uppercase tracking-widest transition-colors hover:text-[#ff6b00] ${isDarkMode ? 'text-gray-600' : 'text-slate-400'}`}>
              PRIVACY PROTOCOL
            </a>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            GLOBAL SERVERS OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Live Test Session Component ---
const TestSession = ({ isDarkMode, testTitle, onExit }: { isDarkMode: boolean; testTitle: string; onExit: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(13);
  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const [timeLeft, setTimeLeft] = useState(2538); // 42:18
  const [violations, setViolations] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setViolations(v => v + 1);
        setShowWarning(true);
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations(v => v + 1);
        setShowWarning(true);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (!document.fullscreenElement && window.innerWidth > 768) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [violations]);

  useEffect(() => {
    if (violations >= 3) {
      alert("Maximum violations reached. Test auto-submitted.");
      onExit();
    }
  }, [violations, onExit]);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access failed", err);
      }
    }
    startCamera();
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`fixed inset-0 z-[300] flex flex-col overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-slate-900'}`}>
      <header className={`px-4 md:px-10 py-4 md:py-6 flex items-center justify-between border-b ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="flex items-center gap-3">
             <span className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-red-500/20">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
               <span className="hidden sm:inline">Live Proctoring</span>
               <span className="sm:hidden">LIVE</span>
             </span>
             <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">AI Proctor</span>
          </div>
          <h2 className="text-sm md:text-2xl font-black tracking-tight truncate">{testTitle}</h2>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">Remaining</p>
          <p className="text-xl md:text-4xl font-black tracking-tighter text-[#FF6B00]">{formatTime(timeLeft)}</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-12">
          <div className={`max-w-4xl mx-auto p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
            <div className="flex items-center justify-between mb-6 md:mb-10 pb-4 md:pb-6 border-b border-inherit">
              <span className="text-sm md:text-lg font-black tracking-tight">Q. {currentQuestion + 1} / 20</span>
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest">
                <AlertCircle size={14} /> <span className="hidden sm:inline">Report</span>
              </button>
            </div>
            <div className="space-y-6 md:space-y-10">
              <p className={`text-base md:text-xl font-medium leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}>
                Given a square matrix A of size n × n. If λ is an eigenvalue of A, which of the following statements is true regarding the matrix A<sup>k</sup> where k is a positive integer?
              </p>
              <div className="space-y-3 md:space-y-4">
                {["The eigenvalues of A^k are kλ.", "The eigenvalues of A^k are λ^k.", "The eigenvalues of A^k are λ + k.", "There is no relationship between the eigenvalues."].map((option, idx) => (
                  <button key={idx} onClick={() => setSelectedOption(idx)} className={`w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all text-left ${selectedOption === idx ? 'border-[#FF6B00] bg-[#FF6B00]/5' : (isDarkMode ? 'border-white/5' : 'border-slate-50 bg-slate-50/50')}`}>
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedOption === idx ? 'border-[#FF6B00]' : 'border-gray-300'}`}>
                      {selectedOption === idx && <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF6B00]"></div>}
                    </div>
                    <span className={`text-sm md:text-base font-medium ${selectedOption === idx ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-gray-400'}`}>{option}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-6 md:pt-10 border-t border-inherit">
                <button className={`px-4 md:px-10 py-3 md:py-4 border-2 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}><ChevronLeft size={16} className="inline mr-1 md:mr-2" /> Prev</button>
                <button className="px-4 md:px-10 py-3 md:py-4 bg-[#FF6B00] text-white font-black rounded-xl md:rounded-2xl shadow-xl shadow-[#FF6B00]/20 text-[10px] md:text-sm uppercase tracking-widest">Next Question <ArrowRight size={16} className="inline ml-1 md:ml-2" /></button>
              </div>
            </div>
          </div>
        </div>
        
        <aside className={`lg:w-[400px] border-t lg:border-t-0 lg:border-l p-4 md:p-8 flex lg:flex-col gap-4 md:gap-6 overflow-x-auto lg:overflow-y-auto ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100 shadow-2xl'}`}>
          <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden aspect-video bg-black shadow-2xl w-32 md:w-full shrink-0">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-70" />
            <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 md:px-3 md:py-1.5 bg-black/60 backdrop-blur-md rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[8px] md:text-[10px] font-black uppercase text-white tracking-widest">REC</span>
            </div>
          </div>
          
          <div className={`hidden lg:block p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-gray-50 border-slate-100'}`}>
            <h4 className="text-sm font-black mb-1 uppercase tracking-tight">Accuracy</h4>
            <div className="flex justify-center my-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="55" className={`fill-none ${isDarkMode ? 'stroke-white/5' : 'stroke-slate-200'} stroke-[10]`} />
                  <circle cx="64" cy="64" r="55" className="fill-none stroke-[#FF6B00] stroke-[10]" style={{ strokeDasharray: 345, strokeDashoffset: 345 * (1 - 0.76) }} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black tracking-tighter">76%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`p-4 md:p-6 rounded-xl md:rounded-[2rem] border flex gap-3 md:gap-4 flex-1 lg:flex-none ${isDarkMode ? 'bg-[#FF6B00]/5 border-[#FF6B00]/20' : 'bg-orange-50 border-orange-100'}`}>
            <div className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl text-[#FF6B00] h-fit hidden sm:block"><Lightbulb size={20} /></div>
            <div>
              <h5 className="text-[8px] md:text-[11px] font-black text-[#FF6B00] uppercase tracking-widest mb-1">AI Insight</h5>
              <p className="text-[10px] md:text-[12px] font-semibold text-gray-500 line-clamp-2 md:line-clamp-none">Focus on matrix shifts.</p>
            </div>
          </div>
        </aside>
      </div>

      {showWarning && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl">
           <div className={`max-w-md w-full p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center space-y-6 md:space-y-8 ${isDarkMode ? 'bg-[#111] border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.2)]' : 'bg-white'}`}>
              <AlertCircle size={32} className="mx-auto text-red-500" />
              <h3 className="text-xl md:text-3xl font-black text-white">Security Breach</h3>
              <p className="text-xs md:text-sm text-gray-500">Violation #{violations} of 3. Fullscreen exit is prohibited.</p>
              <button onClick={() => { setShowWarning(false); }} className="w-full py-4 md:py-6 bg-red-500 text-white font-black rounded-xl md:rounded-2xl uppercase tracking-widest text-xs md:text-sm">Return to Session</button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Nova Chatbot Hub ---
const NovaChatbot = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Nova, your AI learning assistant. I can help you solve doubts, explain complex topics from your syllabus, or guide you through your study materials. What are you working on today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setSelectedFile({
          data: base64,
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isTyping) return;
    const userMessage = input.trim();
    const currentFile = selectedFile;
    setInput('');
    setSelectedFile(null);
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage, 
      filePreview: currentFile ? `data:${currentFile.mimeType};base64,${currentFile.data}` : undefined 
    }]);
    setIsTyping(true);
    try {
      const parts: any[] = [{ text: userMessage || "Analyze this file for me." }];
      if (currentFile) {
        parts.push({
          inlineData: {
            mimeType: currentFile.mimeType,
            data: currentFile.data
          }
        });
      }
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: 'You are Nova, an expert educational AI assistant. Use Markdown for formatting. Analyze files if provided.'
        }
      });
      const botResponse = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Oops! My neural links are fuzzy." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-2xl md:text-4xl font-black">Nova <span className="text-[#FF6B00]">Hub</span></h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Online
          </span>
        </div>
      </div>

      <div className={`flex-1 flex flex-col rounded-[1.5rem] md:rounded-[2.5rem] border overflow-hidden ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-[#FF6B00] text-white' : (isDarkMode ? 'bg-white/5 text-[#FF6B00]' : 'bg-orange-50 text-[#FF6B00]')}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`flex flex-col gap-2 max-w-full`}>
                  {msg.filePreview && (
                    <div className="relative group">
                      <img src={msg.filePreview} alt="Shared file" className="max-w-[200px] md:max-w-[300px] rounded-xl border-2 md:border-4 border-white shadow-lg" />
                    </div>
                  )}
                  <div className={`p-4 md:p-6 rounded-[1rem] md:rounded-[1.5rem] text-xs md:text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#FF6B00] text-white rounded-tr-none' : (isDarkMode ? 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none' : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none')}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[80%]">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5 text-[#FF6B00]' : 'bg-orange-50 text-[#FF6B00]'}`}>
                  <Bot size={16} />
                </div>
                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-slate-50 text-slate-500'}`}>
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Nova thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`p-4 md:p-8 border-t ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
          <div className="max-w-4xl mx-auto relative flex flex-col gap-3 md:gap-4">
            {selectedFile && (
               <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl md:rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 animate-in slide-in-from-bottom-2">
                 <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white flex items-center justify-center text-[#FF6B00]">
                    {selectedFile.mimeType.startsWith('image/') ? <ImageIcon size={18} /> : <FileText size={18} />}
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] md:text-xs font-black truncate">{selectedFile.name}</p>
                 </div>
                 <button onClick={() => setSelectedFile(null)} className="p-1 md:p-2 hover:bg-white rounded-lg transition-colors"><X size={16} /></button>
               </div>
            )}

            <div className="relative flex items-center gap-2 md:gap-3">
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt" />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl transition-all border-2 shrink-0 ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-[#FF6B00]/40' : 'bg-white border-slate-100 hover:border-[#FF6B00]/40 text-slate-500'}`}
              >
                <Plus size={20} />
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Nova..." 
                  className={`w-full pl-4 md:pl-6 pr-10 md:pr-14 py-3 md:py-5 rounded-xl md:rounded-2xl outline-none border-2 transition-all text-xs md:text-sm ${isDarkMode ? 'bg-white/5 border-white/5 focus:border-[#FF6B00] text-white' : 'bg-white border-slate-100 focus:border-[#FF6B00] text-slate-900'}`}
                />
                <button 
                  onClick={handleSend}
                  disabled={(!input.trim() && !selectedFile) || isTyping}
                  className={`absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-11 md:h-11 flex items-center justify-center rounded-lg md:rounded-xl bg-[#FF6B00] text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-[#FF6B00]/30`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Syllabus Dashboard (Learning Page) ---
const SyllabusDashboard = ({ isDarkMode, activeTab, setActiveTab, onStartTest }: { isDarkMode: boolean, activeTab: TabType, setActiveTab: (t: TabType) => void, onStartTest: (t: string) => void }) => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(window.innerWidth < 1024);
  const sidebarItems = [
    { name: 'Dashboard' as const, icon: LayoutGrid },
    { name: 'Syllabus Analysis' as const, icon: FileText },
    { name: 'My Timetable' as const, icon: CalendarIcon },
    { name: 'AI Notes' as const, icon: BookOpen },
    { name: 'Proctored Tests' as const, icon: Shield },
  ];

  return (
    <div className={`flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] mt-16 md:mt-20 transition-all duration-300 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-slate-900'}`}>
      <aside className={`relative h-full border-r transition-all duration-300 flex flex-col z-10 ${isSidebarMinimized ? 'w-16 md:w-20' : 'w-64 md:w-72'} ${isDarkMode ? 'bg-[#0A0A0A]/60 border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-end p-2 border-b border-white/5">
          <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className="p-2 text-gray-400 hover:text-[#ff6b00]">
            {isSidebarMinimized ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
        <div className="flex-1 py-4 px-2 md:px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)} 
              className={`w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg md:rounded-xl transition-all font-bold ${activeTab === item.name ? 'bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 shadow-lg shadow-[#ff6b00]/5' : (isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50')}`}
              title={item.name}
            >
              <item.icon size={18} className="shrink-0" />
              {!isSidebarMinimized && <span className="text-xs md:text-sm whitespace-nowrap">{item.name}</span>}
            </button>
          ))}
        </div>

        {/* Upgrade to Pro Card */}
        {!isSidebarMinimized && (
          <div className="p-4 mt-auto">
            <div className="rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#FF8A00] to-[#FF6B00] p-5 shadow-xl shadow-[#FF6B00]/20 relative group cursor-pointer">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:scale-125 transition-transform"><Brain size={48} fill="white" /></div>
              <h4 className="text-white font-black text-lg mb-1 relative z-10">Upgrade to Pro</h4>
              <p className="text-white/80 text-[10px] font-medium mb-4 relative z-10">Get unlimited AI analysis and personalized study plans.</p>
              <button className="w-full py-2.5 bg-white text-[#FF6B00] font-black rounded-xl text-[10px] uppercase tracking-widest shadow-md">View Plans</button>
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-12 relative z-0">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'Dashboard' && (
            <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <h3 className="text-2xl md:text-4xl font-black">Alex's <span className="text-[#FF6B00]">Neural Hub</span></h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                 {[{ l: 'Active Syllabus', v: '4' }, { l: 'Tests Taken', v: '12' }, { l: 'Time Spent', v: '84h' }, { l: 'Learning Rate', v: '92%' }].map((s, i) => (
                    <div key={i} className={`p-4 md:p-8 rounded-2xl md:rounded-3xl border ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100'}`}>
                       <p className="text-2xl md:text-4xl font-black mb-1">{s.v}</p>
                       <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 truncate">{s.l}</p>
                    </div>
                 ))}
              </div>
            </div>
          )}
          {activeTab === 'Syllabus Analysis' && <SyllabusAnalysisSection isDarkMode={isDarkMode} />}
          {activeTab === 'My Timetable' && <TimetableSection isDarkMode={isDarkMode} />}
          {activeTab === 'Proctored Tests' && <ProctoredTestsSection isDarkMode={isDarkMode} onStartTest={onStartTest} />}
          {activeTab === 'AI Notes' && (
            <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <h3 className="text-2xl md:text-3xl font-black">Notebook <span className="text-[#FF6B00]">LLM</span></h3>
              <div className={`p-10 md:p-20 border-2 border-dashed rounded-[1.5rem] md:rounded-[3rem] text-center ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-white'}`}>
                <CloudUpload size={48} className="mx-auto text-[#FF6B00] mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-black mb-2">Initialize AI Source Analysis</h4>
                <p className="text-xs md:text-sm text-gray-500 max-w-sm mx-auto mb-6 md:mb-8">Drop study materials to generate instant neural notes.</p>
                <button className="px-6 md:px-10 py-3 md:py-4 bg-white text-black font-black rounded-xl uppercase tracking-widest text-[10px] md:text-xs">Select Sources</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Syllabus Analysis Section ---
const SyllabusAnalysisSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [hours, setHours] = useState(4);
  const [goal, setGoal] = useState<'Prep' | 'Mastery'>('Prep');
  const [focusDays, setFocusDays] = useState(['M', 'T', 'W', 'T', 'F']);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const toggleDay = (day: string) => {
    if (focusDays.includes(day)) setFocusDays(focusDays.filter(d => d !== day));
    else setFocusDays([...focusDays, day]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black tracking-tight">Syllabus Analysis</h3>
          <p className="text-gray-500 text-sm font-medium mt-1">Powered by GOOGLE Gemini AI to optimize your learning path.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest h-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          AI Active
        </div>
      </div>

      {/* Main Upload Area */}
      <div className={`p-12 md:p-20 border-2 border-dashed rounded-[2rem] text-center flex flex-col items-center justify-center transition-all ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-white'}`}>
        <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-6"><CloudUpload size={32} /></div>
        <h4 className="text-xl font-black mb-3">Upload Syllabus or Curriculum</h4>
        <p className="text-gray-500 text-sm font-medium max-w-md mb-8 leading-relaxed">Drag and drop your PDF, DOCX, or Image files here. Our AI will break down topics and estimate study time.</p>
        <button className="px-10 py-4 bg-[#FF6B00] text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#FF6B00]/20 hover:scale-105 active:scale-95 transition-all">Browse Files</button>
        <p className="text-[10px] text-gray-400 font-bold mt-6 uppercase tracking-widest">Supported formats: PDF, JPEG, PNG, DOCX (Max 25MB)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Estimation Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#FF6B00]">
            <BarChart3 size={20} />
            <span className="text-sm font-black uppercase tracking-widest">AI Estimation</span>
          </div>
          <div className={`rounded-[2rem] border overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="p-8 space-y-8">
              <div className={`p-6 rounded-2xl flex flex-col gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  Estimated Completion Time <Timer size={12} />
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">--</span>
                  <span className="text-lg font-bold text-gray-400">hours</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mt-2">
                  <div className="h-full w-0 bg-[#FF6B00] rounded-full"></div>
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1">Upload a syllabus to see estimates</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Topics Found</p>
                  <p className="text-2xl font-black">0</p>
                </div>
                <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Difficulty</p>
                  <p className="text-2xl font-black">-</p>
                </div>
              </div>
            </div>
            <div className="p-6 text-center flex flex-col items-center border-t border-inherit">
              <div className="w-10 h-10 bg-[#FF6B00]/5 rounded-full flex items-center justify-center text-[#FF6B00]/40 mb-2">
                <Sparkles size={20} />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]">AI is waiting for data...</p>
            </div>
          </div>
        </div>

        {/* Generate Timetable Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#FF6B00]">
            <CalendarIcon size={20} />
            <span className="text-sm font-black uppercase tracking-widest">Generate Timetable</span>
          </div>
          <div className={`p-8 rounded-[2rem] border space-y-10 ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Available Hours Per Day</p>
                <span className={`px-2 py-1 rounded-lg font-black text-sm ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>{hours}h</span>
              </div>
              <input 
                type="range" min="1" max="12" value={hours} onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF6B00]"
              />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Primary Goal</p>
              <div className="flex gap-4">
                <button onClick={() => setGoal('Prep')} className={`flex-1 py-4 rounded-xl font-black text-xs transition-all border-2 ${goal === 'Prep' ? 'bg-[#FF6B00]/5 border-[#FF6B00] text-[#FF6B00]' : (isDarkMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-white border-slate-100 text-gray-500')}`}>Exam Prep</button>
                <button onClick={() => setGoal('Mastery')} className={`flex-1 py-4 rounded-xl font-black text-xs transition-all border-2 ${goal === 'Mastery' ? 'bg-[#FF6B00]/5 border-[#FF6B00] text-[#FF6B00]' : (isDarkMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-white border-slate-100 text-gray-500')}`}>Skill Mastery</button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Focus Days</p>
              <div className="flex justify-between">
                {days.map((day, i) => (
                  <button key={i} onClick={() => toggleDay(day)} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${focusDays.includes(day) ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20' : (isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-slate-50 text-gray-400')}`}>
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full py-5 bg-white border-2 border-[#FF6B00] text-[#FF6B00] font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-[#FF6B00] hover:text-white transition-all">
              <Wand2 size={16} /> Generate Study Plan
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#FF6B00] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#FF6B00]/30 hover:scale-110 active:scale-95 transition-all z-50">
         <Bot size={32} />
      </button>
    </div>
  );
};

// --- Timetable Component ---
const TimetableSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = [
    { name: 'Mon', date: '21' }, { name: 'Tue', date: '22' }, { name: 'Wed', date: '23' }, { name: 'Thu', date: '24' }, { name: 'Fri', date: '25' }
  ];

  return (
    <div className="space-y-6 md:space-y-10">
      <h3 className="text-2xl md:text-4xl font-black">Neural <span className="text-[#FF6B00]">Timetable</span></h3>
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {days.map((day, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedDay(i)}
            className={`flex flex-col items-center min-w-[70px] md:min-w-[100px] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all ${selectedDay === i ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-xl' : (isDarkMode ? 'bg-[#0A0A0A] border-white/5 text-gray-400' : 'bg-white border-slate-100')}`}
          >
            <span className="text-[8px] md:text-[10px] font-black uppercase mb-1">{day.name}</span>
            <span className="text-lg md:text-2xl font-black">{day.date}</span>
          </button>
        ))}
      </div>
      <div className="p-10 border-2 border-dashed rounded-[1.5rem] md:rounded-[3rem] text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-widest">Sessions Syncing...</p>
      </div>
    </div>
  );
};

// --- Landing Page ---
const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const reviews = [
    { name: 'Sarah Jenkins', role: 'Medical Student', text: 'Novamind literally cut my study time in half. The syllabus analysis is like having a private tutor guide me through the most important topics.', rating: 5 },
    { name: 'David Chen', role: 'Engineering Lead', text: 'The proctored test environment is second to none. It feels professional and the AI insights actually help me understand where I am going wrong.', rating: 5 },
    { name: 'Elena Rodriguez', role: 'High School Senior', text: 'I used to struggle with organizing my subjects. Now, I just upload my syllabus and Nova does the rest. Truly life-changing!', rating: 4 },
  ];

  const developers = [
    { name: 'Shopnojo Sanyal', role: 'System Architecture', desc: 'Leading the design of end-to-end neural processing systems.', icon: Bot },
    { name: 'Rajatava Das', role: 'Infrastructure', desc: 'Managing high-availability cloud systems for seamless global learning.', icon: CloudUpload },
    { name: 'Subhajit Das', role: 'Backend Architecture', desc: 'Engineering robust and scalable data pipelines for AI-driven insights.', icon: Database },
  ];

  return (
    <div className="relative pt-24 md:pt-40 bg-[#050505] min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-20 md:opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full orange-glow animate-pulse-glow"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-10 md:space-y-16">
        <div className="space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase text-gray-400">
            <Zap size={14} className="text-[#ff6b00]" fill="#ff6b00" />
            NOVAMIND AI ENGINE
          </div>
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-4xl md:text-9xl font-black tracking-tight leading-[1.1] md:leading-[1] max-w-5xl mx-auto">
              Master Learning <br className="hidden md:block" /><span className="orange-gradient-text">with Intelligence</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              Join the future of education with hyper-personalized study plans and real-time neural cognitive analysis.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
            <button onClick={onGetStarted} className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-6 bg-[#ff6b00] text-white font-black rounded-xl md:rounded-2xl hover:bg-[#e66000] hover:scale-105 transition-all shadow-xl text-lg md:text-xl shrink-0">
              Get Started Free <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="pt-32 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Student <span className="text-[#FF6B00]">Success Stories</span></h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Trusted by thousands of lifelong learners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] testimonial-card relative group transition-all hover:border-[#FF6B00]/30">
                <div className="absolute -top-6 -left-2 p-4 bg-[#FF6B00] rounded-2xl text-white shadow-xl shadow-[#FF6B00]/20">
                  <Quote size={24} />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(rev.rating)].map((_, j) => <Star key={j} size={16} fill="#FF6B00" className="text-[#FF6B00]" />)}
                </div>
                <p className="text-gray-400 font-medium leading-relaxed mb-8 italic">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFB800] to-[#FF6B00] flex items-center justify-center text-white font-black text-xs border-2 border-white/10">
                    {rev.name[0]}
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm">{rev.name}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-32 space-y-16 pb-32">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">The <span className="text-[#FF6B00]">Architects</span></h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Crafting the neural future of edtech</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developers.map((dev, i) => (
              <div key={i} className="p-8 md:p-12 rounded-[3rem] feature-card text-center group">
                <div className="w-20 h-20 bg-[#FF6B00]/10 rounded-3xl flex items-center justify-center text-[#FF6B00] mx-auto mb-8 shadow-2xl transition-all group-hover:scale-110">
                  <dev.icon size={36} />
                </div>
                <h4 className="text-xl font-black mb-2">{dev.name}</h4>
                <p className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.2em] mb-4">{dev.role}</p>
                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">{dev.desc}</p>
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
                  <Linkedin size={18} className="hover:text-white cursor-pointer transition-colors" />
                  <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UniversalFooter isDarkMode={true} />
    </div>
  );
};

// --- Proctored Tests Tab ---
const ProctoredTestsSection = ({ isDarkMode, onStartTest }: { isDarkMode: boolean; onStartTest: (t: string) => void }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const tests: TestData[] = [
    { title: 'Advanced Calculus', module: 'Module 4: Eigenvalues', questions: 20, time: '120 min', status: 'Ready' },
    { title: 'Neural Systems', module: 'Module 2: Perceptrons', questions: 40, time: '180 min', status: 'Scheduled' },
  ];
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className={`p-6 md:p-10 rounded-2xl md:rounded-[3rem] border-2 border-dashed ${isDarkMode ? 'bg-white/[0.02] border-[#FF6B00]/30' : 'bg-orange-50 border-orange-200'}`}>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-[#FFB800] to-[#FF6B00] flex items-center justify-center text-white shadow-2xl shrink-0">
             <Sparkles size={32} className={isGenerating ? 'animate-spin' : ''} />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg md:text-2xl font-black">AI Auto-Test</h3>
            <p className={`text-xs md:text-sm max-w-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Synthesize a personalized exam based on your weak nodes.</p>
          </div>
          <button onClick={() => { setIsGenerating(true); setTimeout(() => { setIsGenerating(false); onStartTest("Auto-Generated Exam"); }, 2000); }} className="w-full md:w-auto md:ml-auto px-6 md:px-10 py-4 md:py-5 bg-[#FF6B00] text-white font-black rounded-xl md:rounded-2xl uppercase tracking-widest text-[10px] md:text-sm shadow-xl">
            {isGenerating ? 'Synthesizing...' : 'Generate & Start'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {tests.map((test, i) => (
          <div key={i} className={`p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border transition-all ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
             <h4 className="text-lg md:text-xl font-black mb-6">{test.title}</h4>
             <button onClick={() => onStartTest(test.title)} className="w-full py-4 border-2 border-[#FF6B00] text-[#FF6B00] font-black rounded-xl md:rounded-2xl hover:bg-[#FF6B00] hover:text-white transition-all text-[10px] uppercase tracking-widest">Launch Assessment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- App Entry ---
const App = () => {
  const [currentView, setCurrentView] = useState<ViewType>('HOME');
  const [activeTab, setActiveTab] = useState<TabType>('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (currentView === 'HOME') { setIsDarkMode(true); document.body.style.backgroundColor = '#050505'; }
    else { document.body.style.backgroundColor = isDarkMode ? '#050505' : '#F9FAFB'; }
  }, [isDarkMode, currentView]);

  const navLinks = [
    { label: 'HOME', view: 'HOME' as const },
    { label: 'LEARNING', view: 'LEARNING' as const, tab: 'Dashboard' as TabType },
    { label: 'CHATBOT', view: 'CHATBOT' as const },
    { label: 'TEST', view: 'LEARNING' as const, tab: 'Proctored Tests' as TabType }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.view !== 'HOME' && !isLoggedIn) { setShowAuthModal(true); return; }
    setCurrentView(link.view);
    if (link.tab) setActiveTab(link.tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark text-white' : 'text-slate-900'}`}>
      <header className={`fixed top-0 left-0 right-0 z-[100] glass-nav px-6 md:px-12 py-3 md:py-5 flex items-center justify-between border-b ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setCurrentView('HOME')}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ff6b00] rounded-lg md:rounded-xl flex items-center justify-center shadow-2xl transition-all group-hover:scale-110"><Brain size={18} fill="white" className="text-white md:size-[22]" /></div>
          <span className="text-lg md:text-2xl font-black tracking-tighter uppercase text-[#ff6b00]">NOVAMIND</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => handleNavClick(link)} className={`transition-all hover:text-[#ff6b00] relative group ${currentView === link.view && (link.tab ? activeTab === link.tab : true) ? 'text-[#ff6b00]' : (isDarkMode ? 'text-gray-400' : 'text-slate-500')}`}>
              {link.label}
              <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[#ff6b00] transition-all duration-300 ${currentView === link.view && (link.tab ? activeTab === link.tab : true) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-3 md:gap-6">
          {currentView !== 'HOME' && <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-1.5 md:p-2 rounded-lg bg-white/5">{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>}
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-1.5 text-[#ff6b00]">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="hidden md:block">
            {!isLoggedIn ? (
              <button onClick={() => setShowAuthModal(true)} className="orange-dual-button px-6 md:px-8 py-2 md:py-3.5 text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-lg md:rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl">Join Hub</button>
            ) : (
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('LEARNING')}><Bell size={20} className="text-gray-500" /><div className="w-8 h-8 md:w-10 md:h-10 bg-[#ff6b00] rounded-full flex items-center justify-center text-white font-black text-xs border-2 border-white shadow-lg">JD</div></div>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`absolute top-full left-0 right-0 p-6 md:hidden border-b transition-all duration-300 flex flex-col gap-4 ${isDarkMode ? 'bg-black/95 border-white/5' : 'bg-white/95 border-slate-100 shadow-2xl'}`}>
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => handleNavClick(link)} className={`text-left text-sm font-black uppercase tracking-widest py-3 border-b border-white/5 ${currentView === link.view ? 'text-[#ff6b00]' : (isDarkMode ? 'text-gray-400' : 'text-slate-500')}`}>
                {link.label}
              </button>
            ))}
            {!isLoggedIn ? (
              <button onClick={() => { setShowAuthModal(true); setIsMobileMenuOpen(false); }} className="orange-dual-button w-full py-4 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-xl mt-4">Join Hub</button>
            ) : (
              <div className="flex iems-center gap-4 py-3" onClick={() => { setCurrentView('LEARNING'); setIsMobileMenuOpen(false); }}>
                <div className="w-10 h-10 bg-[#ff6b00] rounded-full flex items-center justify-center text-white font-black text-xs border-2 border-white shadow-lg">JD</div>
                <span className="font-bold text-gray-400">Profile Dashboard</span>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex flex-col min-h-screen">
        <div className="flex-1">
          {currentView === 'HOME' && <LandingPage onGetStarted={() => isLoggedIn ? setCurrentView('LEARNING') : setShowAuthModal(true)} />}
          {currentView === 'LEARNING' && <SyllabusDashboard isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} onStartTest={setActiveTest} />}
          {currentView === 'CHATBOT' && (
            <div className="pt-20 md:pt-24 px-4 md:px-12 max-w-7xl mx-auto w-full pb-20">
              <NovaChatbot isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
        {currentView !== 'HOME' && <UniversalFooter isDarkMode={isDarkMode} />}
      </main>

      {activeTest && <TestSession isDarkMode={isDarkMode} testTitle={activeTest} onExit={() => { setActiveTest(null); }} />}

      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-6 bg-black/95 backdrop-blur-xl animate-in zoom-in-95 duration-300">
          <div className="relative w-full max-w-md p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] space-y-8 md:space-y-10 bg-[#0A0A0A] border border-white/10 shadow-[0_0_100px_rgba(255,107,0,0.1)]">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#ff6b00]/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#ff6b00] mx-auto mb-2 shadow-2xl"><Brain size={28} fill="currentColor" /></div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">Neural Hub Login</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setShowAuthModal(false); setCurrentView('LEARNING'); }} className="space-y-6 md:space-y-8">
              <input required type="email" placeholder="student@novamind.ai" className="w-full px-4 md:px-6 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white font-semibold focus:border-[#ff6b00] outline-none text-sm" />
              <input required type="password" placeholder="••••••••" className="w-full px-4 md:px-6 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white font-mono focus:border-[#ff6b00] outline-none text-sm" />
              <button type="submit" className="w-full py-4 md:py-6 bg-[#ff6b00] text-white font-black rounded-xl md:rounded-2xl hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-2xl">Authorize Sync</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
