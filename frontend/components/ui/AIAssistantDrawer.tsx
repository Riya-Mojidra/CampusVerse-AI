'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { COLLEGE_LOCATIONS, MUMBAI_COLLEGES } from '@/data/mumbaiColleges';
import { CampusLocation } from '@/types/campus';
import {
    FiCpu,
    FiSend,
    FiX,
    FiMapPin,
    FiNavigation,
    FiZap
} from 'react-icons/fi';

interface Message {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    matchedLocations?: (CampusLocation & { collegeName?: string })[];
    timestamp: string;
}

// 1. Synonym & Acronym Dictionary for Indian Campuses
const EXPANSIONS: Record<string, string[]> = {
    cs: ['computer', 'cse', 'programming', 'software', 'coding', 'data science', 'ai', 'machine learning'],
    it: ['information technology', 'software', 'networking', 'cloud'],
    mech: ['mechanical', 'workshop', 'automobile', 'cad', 'thermodynamics'],
    extc: ['electronics', 'telecommunication', 'vlsi', 'embedded', 'circuits', 'ece'],
    ee: ['electrical', 'power', 'circuits'],
    civil: ['survey', 'concrete', 'structure', 'geotech'],
    library: ['reading', 'books', 'reference', 'journal', 'study room', 'central library'],
    canteen: ['cafeteria', 'food court', 'mess', 'lunch', 'snacks', 'nescafe', 'cafe'],
    audi: ['auditorium', 'seminar hall', 'conference room', 'amphitheatre', 'stage'],
    hod: ['head of department', 'staff room', 'faculty', 'professor', 'cabin'],
    admin: ['office', 'dean', 'registrar', 'accounts', 'admission', 'principal', 'reception'],
    sports: ['gym', 'gymnasium', 'ground', 'badminton', 'football', 'cricket', 'table tennis'],
    washroom: ['restroom', 'toilet', 'wc', 'bathroom'],
    hostel: ['mess', 'dorm', 'boys hostel', 'girls hostel', 'residential'],
    lab: ['laboratory', 'research', 'practical', 'project lab'],
};

// 2. Levenshtein Distance for Typo Tolerance
function levenshtein(a: string, b: string): number {
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0) return bn;
    if (bn === 0) return an;
    const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));
    for (let i = 0; i <= an; i++) matrix[0][i] = i;
    for (let j = 0; j <= bn; j++) matrix[j][0] = j;
    for (let j = 1; j <= bn; j++) {
        for (let i = 1; i <= an; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j - 1][i] + 1,
                matrix[j][i - 1] + 1,
                matrix[j - 1][i - 1] + cost
            );
        }
    }
    return matrix[bn][an];
}

function isFuzzyMatch(word1: string, word2: string): boolean {
    if (word1 === word2) return true;
    if (word1.length > 3 && word2.length > 3) {
        if (word1.startsWith(word2) || word2.startsWith(word1)) return true;
        const distance = levenshtein(word1, word2);
        if (distance <= (word1.length > 6 ? 2 : 1)) return true;
    }
    return false;
}

// 3. Multi-Tier Ranking Engine
function computeMatchScore(loc: CampusLocation, query: string): number {
    let score = 0;
    const rawTokens = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

    const locName = (loc.name || '').toLowerCase();
    const locCat = (loc.category || '').toLowerCase();
    const locBuilding = (loc.building || '').toLowerCase();
    const locRoom = (loc.roomNumber || (loc as any).room || '').toLowerCase();
    const locDesc = (loc.description || '').toLowerCase();

    const fullText = `${locName} ${locCat} ${locBuilding} ${locRoom} ${locDesc}`;
    const textWords = fullText.split(/\s+/).filter(Boolean);

    // Exact phrase check
    const cleanQuery = rawTokens.join(' ');
    if (fullText.includes(cleanQuery)) {
        score += 120;
    }

    // Token matching & Fuzzy lookup
    for (const token of rawTokens) {
        // Direct token hits
        if (locName.includes(token)) score += 40;
        if (locRoom === token || locRoom.includes(token)) score += 50;
        if (locBuilding.includes(token)) score += 25;
        if (locCat.includes(token)) score += 20;

        // Fuzzy matching against all words in the location metadata
        for (const tw of textWords) {
            if (isFuzzyMatch(token, tw)) {
                score += 30;
            }
        }

        // Synonym / Abbreviation Expansion
        for (const [key, aliases] of Object.entries(EXPANSIONS)) {
            if (token === key || aliases.includes(token) || isFuzzyMatch(token, key)) {
                if (textWords.some((tw) => tw === key || aliases.includes(tw) || isFuzzyMatch(tw, key))) {
                    score += 35;
                }
            }
        }
    }

    return score;
}

export function AIAssistantDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const selectedCollegeId = useCampusStore((s) => s.selectedCollegeId);
    const setSelectedCollegeId = useCampusStore((s) => s.setSelectedCollegeId);
    const setSelectedLocation = useCampusStore((s) => s.setSelectedLocation);
    const setIsNavigating = useCampusStore((s) => s.setIsNavigating);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'ai',
            text: `Hello! I'm CampusVerse Copilot. Ask me for any lab, classroom, library, canteen, department, or faculty room across the campus.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentCollege = MUMBAI_COLLEGES.find((c) => c.id === selectedCollegeId);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (queryText?: string) => {
        const query = (queryText || input).trim();
        if (!query) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: query,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!queryText) setInput('');
        setIsTyping(true);

        setTimeout(() => {
            // 1. Search within the current active college first
            const currentCollegeLocs = COLLEGE_LOCATIONS.filter(
                (loc) => loc.collegeId === selectedCollegeId
            );

            let scored: { loc: CampusLocation & { collegeName?: string }; score: number }[] = currentCollegeLocs
                .map((loc) => ({ loc, score: computeMatchScore(loc, query) }))
                .filter((item) => item.score > 0)
                .sort((a, b) => b.score - a.score);

            // 2. If nothing found in current college, fall back to searching ALL campuses
            let isCrossCampus = false;
            if (scored.length === 0) {
                scored = COLLEGE_LOCATIONS.map((loc) => ({
                    loc: {
                        ...loc,
                        collegeName: MUMBAI_COLLEGES.find((c) => c.id === loc.collegeId)?.name || 'Campus',
                    },
                    score: computeMatchScore(loc, query),
                }))
                    .filter((item) => item.score > 0)
                    .sort((a, b) => b.score - a.score);

                if (scored.length > 0) {
                    isCrossCampus = true;
                }
            }

            let replyText = '';
            let matches: (CampusLocation & { collegeName?: string })[] = [];

            if (scored.length === 1) {
                const top = scored[0].loc;
                replyText = isCrossCampus
                    ? `Found **${top.name}** in ${top.collegeName} (${top.building}, Floor ${top.floor}). Switch to this campus and navigate:`
                    : `Found **${top.name}** in ${top.building} (Floor ${top.floor}, Room ${top.roomNumber || (top as any).room || 'N/A'}).`;
                matches = [top];
            } else if (scored.length > 1) {
                replyText = `Found **${scored.length} matching locations**${isCrossCampus ? ' across campuses' : ` in ${currentCollege?.name || 'campus'}`}:`;
                matches = scored.slice(0, 4).map((s) => s.loc);
            } else {
                replyText = `No exact match for "${query}". Try searching keywords like "CS Lab", "Mechanical Workshop", "Library", "Canteen", or "Seminar Hall".`;
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: replyText,
                matchedLocations: matches,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 300);
    };

    const handleStartNavigation = (loc: CampusLocation) => {
        // If the location belongs to a different college, switch active college first
        if (loc.collegeId && loc.collegeId !== selectedCollegeId) {
            setSelectedCollegeId(loc.collegeId);
        }
        setSelectedLocation(loc);
        setIsNavigating(true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-[#070B0A]/95 backdrop-blur-2xl border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <FiCpu className="text-lg" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            CampusVerse Copilot
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                                Fuzzy Match V2
                            </span>
                        </h3>
                        <p className="text-[11px] text-zinc-400 font-mono">
                            {currentCollege?.name || 'Campus'}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                    <FiX className="text-lg" />
                </button>
            </div>

            {/* Suggested Quick Prompts */}
            <div className="px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0 flex items-center gap-1">
                    <FiZap className="text-emerald-400" /> Try:
                </span>
                {['CSE Labs', 'Central Library', 'Canteen / Cafe', 'Audi', 'Admin Block'].map((prompt) => (
                    <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="text-[11px] font-mono text-zinc-300 bg-zinc-800/70 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-700/50 border border-zinc-700/50 px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                        {prompt}
                    </button>
                ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div
                            className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-emerald-600 text-white rounded-br-none shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-bl-none'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.text}</p>

                            {/* Matched Locations List */}
                            {msg.matchedLocations && msg.matchedLocations.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {msg.matchedLocations.map((loc) => (
                                        <div
                                            key={loc.id}
                                            className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/40 flex items-center justify-between gap-2"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[11px] font-bold text-white truncate flex items-center gap-1.5">
                                                    <FiMapPin className="text-emerald-400 shrink-0" />
                                                    {loc.name}
                                                </p>
                                                <p className="text-[10px] text-zinc-400 font-mono truncate">
                                                    {loc.collegeName ? `${loc.collegeName} • ` : ''}
                                                    {loc.building} • Floor {loc.floor}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleStartNavigation(loc)}
                                                className="py-1 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] flex items-center gap-1 shrink-0 transition-all shadow-[0_0_10px_rgba(16,185,129,0.4)] cursor-pointer"
                                            >
                                                <FiNavigation className="text-xs" /> Navigate
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] text-zinc-600 font-mono mt-1 px-1">
                            {msg.timestamp}
                        </span>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
                className="p-3.5 border-t border-zinc-800/80 bg-zinc-950/80 flex items-center gap-2"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. Where is CSE Lab, audi, or canteen?"
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />

                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:hover:bg-emerald-500 text-black font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                    <FiSend className="text-sm" />
                </button>
            </form>
        </aside>
    );
}

export default AIAssistantDrawer;