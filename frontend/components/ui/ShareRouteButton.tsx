'use client';

import React, { useState } from 'react';
import { FiShare2, FiCheck } from 'react-icons/fi';
import { useCampusStore } from '@/hooks/useCampusStore';

export function ShareRouteButton() {
    const [copied, setCopied] = useState(false);
    const isNavigating = useCampusStore((s) => s.isNavigating);

    const handleShare = async () => {
        try {
            const url = new URL(window.location.href);
            if (isNavigating) {
                url.searchParams.set('nav', '1');
            }
            await navigator.clipboard.writeText(url.toString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback if clipboard API is restricted
        }
    };

    return (
        <button
            type="button"
            onClick={handleShare}
            title="Share Deep Link"
            className="p-3 rounded-2xl bg-black/85 border border-zinc-800 hover:border-emerald-500/60 text-zinc-300 hover:text-emerald-400 backdrop-blur-xl transition-all shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer flex items-center gap-2"
        >
            {copied ? (
                <>
                    <FiCheck className="text-emerald-400 text-base" />
                    <span className="text-xs font-mono text-emerald-400">Link Copied!</span>
                </>
            ) : (
                <>
                    <FiShare2 className="text-base" />
                    <span className="text-xs font-mono">Share</span>
                </>
            )}
        </button>
    );
}