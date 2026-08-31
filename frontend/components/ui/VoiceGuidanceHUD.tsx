'use client';

import React, { useState, useEffect } from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { FiVolume2, FiVolumeX, FiNavigation } from 'react-icons/fi';

export function VoiceGuidanceHUD() {
    const isNavigating = useCampusStore((s) => s.isNavigating);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);

    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [currentPrompt, setCurrentPrompt] = useState('');

    const speak = (text: string) => {
        if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (isNavigating && selectedLocation) {
            const prompt = `Starting navigation to ${selectedLocation.name}. Proceed to ${selectedLocation.building}, Floor ${selectedLocation.floor}.`;
            setCurrentPrompt(prompt);
            speak(prompt);
        } else {
            setCurrentPrompt('');
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }
    }, [isNavigating, selectedLocation, voiceEnabled]);

    if (!isNavigating || !selectedLocation) return null;

    return (
        <div className="absolute top-6 left-6 z-30 flex items-center gap-3 bg-black/90 border border-emerald-500/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.35)]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FiNavigation className="text-base animate-pulse" />
            </div>

            <div className="flex flex-col pr-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Voice GPS Active
                </span>
                <p className="text-xs font-bold text-white max-w-[260px] truncate">
                    {currentPrompt}
                </p>
            </div>

            <button
                type="button"
                onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                    }
                }}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                title={voiceEnabled ? 'Mute Voice Guide' : 'Enable Voice Guide'}
            >
                {voiceEnabled ? (
                    <FiVolume2 className="text-emerald-400 text-base" />
                ) : (
                    <FiVolumeX className="text-zinc-500 text-base" />
                )}
            </button>
        </div>
    );
}

export default VoiceGuidanceHUD;