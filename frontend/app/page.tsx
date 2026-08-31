// File: app/page.tsx
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";

export default function Home() {
    return (
        <div className="space-y-12 pb-20">
            <Hero />
            <Features />
            <HowItWorks />
        </div>
    );
}