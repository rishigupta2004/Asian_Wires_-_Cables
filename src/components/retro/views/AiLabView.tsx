import React, { useState, useRef, useEffect } from 'react';
import { GUIWindow } from '../GUIWindow';

interface AiLabViewProps {
    handleNav: (id: string) => void;
}

export const AiLabView: React.FC<AiLabViewProps> = ({ handleNav }) => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiEndpoint, setApiEndpoint] = useState('http://localhost:11434/v1/chat/completions');
    const [selectedModel, setSelectedModel] = useState('llama3.2');
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
    const [connectionMessage, setConnectionMessage] = useState('LLM_OFFLINE');
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(1024);
    const [systemPrompt, setSystemPrompt] = useState(`You are WIRES_AI, an expert technical assistant for Asian Wires & Cables,
a wire and cable manufacturer. You have deep knowledge of:

- All cable types: LT/HT/EHT, XLPE, FRLS, Solar DC, Submersible
- Indian Standards: IS:694, IS:1554, IS:7098, IS:8130, IS:9968
- IEC standards: IEC 60502, IEC 60227, IEC 62930
- Material specs: EC grade copper, XLPE insulation, FRLS PVC
- LME copper/aluminium pricing and market data
- Installation guidelines, bending radius, burial depths
- Cable sizing for load requirements

Always respond in a technical, precise manner. Include standard references
when relevant. Format responses as structured technical data when possible.
Use ASCII formatting for tables and comparisons.`);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const testConnection = async () => {
        try {
            setConnectionStatus('testing');
            const res = await fetch(apiEndpoint.replace('/v1/chat/completions', '/api/tags'));
            if (res.ok) {
                const data = await res.json();
                const modelCount = data.models?.length || 0;
                setConnectionStatus('connected');
                setIsConnected(true);
                setConnectionMessage(`ONLINE — ${modelCount} MODELS AVAILABLE`);
            } else {
                throw new Error('Endpoint returned ' + res.status);
            }
        } catch (e) {
            setConnectionStatus('error');
            setIsConnected(false);
            setConnectionMessage('CONNECTION_REFUSED — CHECK ENDPOINT');
        }
    };

    const startTypewriter = (message: any) => {
        let displayed = '';
        const tempMsg = { ...message, content: '', _isTyping: true };
        setChatHistory(prev => [...prev, tempMsg]);

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < message.content.length) {
                displayed += message.content[i];
                setChatHistory(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { ...tempMsg, content: displayed, _isTyping: true };
                    return updated;
                });
                i++;
            } else {
                setChatHistory(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { ...message, _isTyping: false };
                    return updated;
                });
                clearInterval(typeInterval);
            }
        }, 12);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input.trim(), timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) };
        setChatHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...chatHistory.map(m => ({ role: m.role, content: m.content })),
                        { role: 'user', content: userMessage.content }
                    ],
                    temperature: temperature,
                    max_tokens: maxTokens,
                    stream: false,
                }),
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

            const data = await response.json();
            const assistantContent = data.choices?.[0]?.message?.content
                || data.message?.content
                || '[ ERR ] UNRECOGNIZED RESPONSE FORMAT';

            const assistantMessage = {
                role: 'assistant',
                content: assistantContent,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
            };

            startTypewriter(assistantMessage);

        } catch (error: any) {
            const errMessage = {
                role: 'system',
                content: `[ FATAL_ERR ] ${error.message}\n\nCheck: Is your local LLM server running?\nEndpoint: ${apiEndpoint}\nModel: ${selectedModel}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
            };
            setChatHistory(prev => [...prev, errMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => setChatHistory([]);

    const quickPrompts = [
        { label: "CABLE SIZING CALCULATOR", prompt: "I need to size a cable for a 3-phase 415V load of [X] kVA at [Y] meters distance. What cross-section and voltage grade do you recommend, and what IS standard applies?" },
        { label: "LME PRICE IMPACT", prompt: "LME copper is at $8,452/MT today. How does this affect pricing for 3C×240mm² XLPE 11kV cable per meter? Include material breakdown." },
        { label: "BOM ANALYSIS", prompt: "Analyze this Bill of Materials and match each item to our catalog: [paste BOM here]" },
        { label: "STANDARD LOOKUP", prompt: "What is the full specification requirement under IS:7098 Part 1 for 11kV XLPE cables? Include conductor sizes, insulation thickness, and test voltages." },
        { label: "INSTALLATION QUERY", prompt: "What are the installation requirements for direct buried 33kV 3C×400mm² XLPE cable? Trench depth, bedding, separation, and joint spacing." },
        { label: "FAULT ANALYSIS", prompt: "Explain the likely causes of insulation failure in a 5-year-old 11kV XLPE cable that failed the high voltage test at 38kV AC." }
    ];

    return (
        <div className="flex flex-col h-screen max-h-screen bg-[#E4E3DB]">
            {/* STICKY TOP BAR */}
            <div className="sticky top-0 z-20 bg-[#0F0F0F] text-[#E4E3DB] border-b-4 border-[#FF3300] px-6 py-3 flex flex-wrap justify-between items-center font-mono text-xs font-bold tracking-widest shadow-[0_6px_0px_#0F0F0F]">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#FF3300] border border-[#E4E3DB] animate-pulse" />
                    <span>AI_NEURAL.BAT</span>
                    <span className="text-[#FF3300]">//</span>
                    <span className="text-[#E4E3DB]/50">WIRES_AI v1.0</span>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div className={`flex items-center gap-2 border-2 px-3 py-1 text-[9px] ${isConnected ? 'border-[#10B981] text-[#10B981]' : 'border-[#EF4444] text-[#EF4444]'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#10B981] animate-pulse' : 'bg-[#EF4444]'}`} />
                        {isConnected ? 'LLM_CONNECTED' : 'LLM_OFFLINE'}
                    </div>
                    <span className="text-[#E4E3DB]/30 hidden sm:inline">MODEL: {selectedModel}</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* LEFT PANEL: Config & Context */}
                <div className="w-full lg:w-[35%] overflow-y-auto border-b-4 lg:border-b-0 lg:border-r-4 border-[#0F0F0F] p-4 lg:p-6 space-y-6 bg-[#E4E3DB]">

                    <GUIWindow title="LLM_CONFIG.INI">
                        <div className="bg-[#E4E3DB] p-4 border-t-4 border-[#0F0F0F] space-y-4">
                            <div>
                                <label className="block font-mono text-[9px] tracking-widest text-[#0F0F0F]/50 mb-1">API_ENDPOINT</label>
                                <input
                                    type="text"
                                    value={apiEndpoint}
                                    onChange={(e) => setApiEndpoint(e.target.value)}
                                    className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs w-full shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] outline-none focus:border-[#FF3300]"
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[9px] tracking-widest text-[#0F0F0F]/50 mb-1">MODEL_ID</label>
                                <input
                                    type="text"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs w-full shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] outline-none focus:border-[#FF3300]"
                                />
                            </div>
                            <button
                                onClick={testConnection}
                                className="w-full bg-[#0F0F0F] text-[#E4E3DB] border-4 border-[#0F0F0F] py-3 font-mono text-xs font-bold tracking-widest hover:bg-[#FF3300] transition-colors"
                            >
                                PING_SERVER →
                            </button>
                            <div className="pt-2 text-[9px] font-mono text-center">
                                {connectionStatus === 'testing' && <span className="text-[#0F0F0F]">TESTING CONNECTION...</span>}
                                {connectionStatus === 'connected' && <span className="text-[#10B981]">{connectionMessage}</span>}
                                {connectionStatus === 'error' && <span className="text-[#EF4444]">{connectionMessage}</span>}
                            </div>

                            <div className="pt-2">
                                <label className="flex justify-between font-mono text-[9px] tracking-widest text-[#0F0F0F]/50 mb-1">
                                    <span>TEMPERATURE</span>
                                    <span>{temperature.toFixed(1)}</span>
                                </label>
                                <input
                                    type="range" min="0" max="1" step="0.1"
                                    value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-[#0F0F0F]/20 appearance-none outline-none accent-[#FF3300]"
                                />
                            </div>
                            <div className="pt-2">
                                <label className="block font-mono text-[9px] tracking-widest text-[#0F0F0F]/50 mb-1">MAX_TOKENS</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[512, 1024, 2048, 4096].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setMaxTokens(t)}
                                            className={`py-1 border-2 border-[#0F0F0F] font-mono text-[10px] ${maxTokens === t ? 'bg-[#0F0F0F] text-[#E4E3DB]' : 'bg-transparent text-[#0F0F0F]'} hover:bg-[#FF3300] hover:text-[#E4E3DB] hover:border-[#FF3300]`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GUIWindow>

                    <GUIWindow title="SYSTEM_CONTEXT.SYS">
                        <div className="bg-[#E4E3DB] border-t-4 border-[#0F0F0F]">
                            <textarea
                                value={systemPrompt}
                                onChange={(e) => setSystemPrompt(e.target.value)}
                                className="bg-[#D7D6CD] p-4 font-mono text-[10px] text-[#0F0F0F] leading-relaxed w-full min-h-[160px] resize-y outline-none focus:border-[#FF3300] border-0 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.08)]"
                            />
                        </div>
                    </GUIWindow>

                    <GUIWindow title="QUICK_PROMPTS.DAT">
                        <div className="bg-[#E4E3DB] p-4 border-t-4 border-[#0F0F0F] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                            {quickPrompts.map((qp, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(qp.prompt)}
                                    className="border-4 border-[#0F0F0F] p-3 font-mono text-[9px] font-bold tracking-widest hover:bg-[#FF3300] hover:text-[#E4E3DB] shadow-[3px_3px_0px_#0F0F0F] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all text-left bg-transparent text-[#0F0F0F]"
                                >
                                    [ {qp.label} ]
                                </button>
                            ))}
                        </div>
                    </GUIWindow>

                </div>

                {/* RIGHT PANEL: Terminal Chat Interface */}
                <div className="w-full lg:w-[65%] flex flex-col bg-[#0000AA] relative">
                    <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-32">
                        {chatHistory.length === 0 && (
                            <div className="mb-6 animate-fade-in-up origin-top">
                                <pre className="font-mono text-[10px] sm:text-xs font-bold leading-relaxed text-[#E4E3DB] whitespace-pre-wrap">
                                    {`╔══════════════════════════════════════════════════════════╗
║  WIRES_AI — ENGINEERING INTELLIGENCE SYSTEM v1.0         ║
║  ASIAN WIRES & CABLES — INTERNAL TECHNICAL ASSISTANT     ║
╠══════════════════════════════════════════════════════════╣
║  > KNOWLEDGE BASE: LOADED                               ║
║  > CABLE CATALOG: 400+ SKUs INDEXED                     ║
║  > STANDARDS DB: IS/IEC/BS LOADED                       ║
║  > LLM BACKEND: ${apiEndpoint.replace('http://', '').split('/')[0].padEnd(25)} ║
╠══════════════════════════════════════════════════════════╣
║  TYPE YOUR QUERY OR SELECT A QUICK PROMPT.              ║
║  ASK ABOUT: CABLE SIZING / STANDARDS / PRICING / BOM    ║
╚══════════════════════════════════════════════════════════╝`}
                                </pre>
                            </div>
                        )}

                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className="mb-4 border-b border-[#E4E3DB]/10 pb-4">
                                {msg.role === 'user' && (
                                    <>
                                        <div className="font-mono text-[10px] sm:text-xs font-bold text-[#FF3300] mb-1">
                                            C:\ASIAN\PROCUREMENT&gt;
                                        </div>
                                        <div className="font-mono text-xs sm:text-sm font-bold leading-relaxed text-[#E4E3DB]">
                                            {msg.content}
                                        </div>
                                    </>
                                )}
                                {msg.role === 'assistant' && (
                                    <>
                                        <div className="font-mono text-[10px] sm:text-xs font-bold text-[#F5C518] mb-1">
                                            WIRES_AI [{msg.timestamp}]:
                                        </div>
                                        <div className="font-mono text-xs sm:text-sm font-bold leading-relaxed text-[#10B981] whitespace-pre-wrap">
                                            {msg.content}
                                            {msg._isTyping && <span className="inline-block w-2 h-4 bg-[#FF3300] ml-1 animate-pulse align-middle" />}
                                        </div>
                                    </>
                                )}
                                {msg.role === 'system' && (
                                    <div className="font-mono text-xs sm:text-sm font-bold leading-relaxed text-[#EF4444] whitespace-pre-wrap border-l-4 border-[#EF4444] pl-3 py-1">
                                        {msg.content}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="font-mono text-xs font-bold text-[#10B981] flex items-center gap-2 mt-4">
                                <span className="animate-spin text-[#FF3300] inline-block">|</span>
                                PROCESSING_QUERY...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* BOTTOM INPUT BAR */}
                    <div className="absolute bottom-0 left-0 w-full z-10 border-t-4 border-[#0F0F0F] bg-[#0F0F0F] p-4">
                        <div className="flex flex-col sm:flex-row gap-3 items-end">
                            <div className="flex-1 w-full relative">
                                <div className="font-mono text-[10px] text-[#FF3300] mb-1 font-bold tracking-widest">
                                    C:\ASIAN\PROCUREMENT&gt;
                                </div>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    rows={2}
                                    placeholder="Type your technical query... (Enter to send, Shift+Enter for new line)"
                                    className="w-full bg-[#E4E3DB] border-4 border-[#0F0F0F] p-3 sm:p-4 font-mono text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FF3300] shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] placeholder:text-[#0F0F0F]/30 text-[#0F0F0F] selection:bg-[#FF3300] selection:text-[#E4E3DB] resize-none"
                                />
                            </div>
                            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="flex-1 sm:flex-none px-6 py-3 sm:py-4 bg-[#FF3300] border-4 border-[#0F0F0F] text-[#0F0F0F] font-mono text-xs font-black tracking-widest shadow-[6px_6px_0px_#E4E3DB] hover:bg-[#E4E3DB] hover:shadow-[4px_4px_0px_#0F0F0F] active:shadow-none active:translate-x-1.5 active:translate-y-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    SEND →
                                </button>
                                <button
                                    onClick={clearChat}
                                    className="px-6 py-2 border-4 border-[#E4E3DB]/30 text-[#E4E3DB]/50 font-mono text-[9px] font-bold tracking-widest hover:border-[#FF3300] hover:text-[#FF3300] transition-colors"
                                >
                                    CLEAR
                                </button>
                            </div>
                        </div>
                        <div className="hidden sm:flex justify-between items-center mt-2 font-mono text-[9px] text-[#E4E3DB]/30">
                            <span>ENTER: SEND  |  SHIFT+ENTER: NEW LINE  |  ESC: CLEAR</span>
                            <span>{input.length} CHARS  |  {chatHistory.length} EXCHANGES</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
