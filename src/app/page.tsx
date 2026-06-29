'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] flex flex-col justify-center px-6 py-16">
      <div className="max-w-4xl mx-auto w-full space-y-16 mt-8">
        
        {/* HERO SECTION: Slogan & Identity */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-block bg-[#e6dfd3]/60 border border-[#e6dfd3] text-[#7c756e] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
            ሑነይን መርከዝ • Huneyn Center
          </div>
          <h1 className="text-5xl font-serif font-medium text-[#1c1a19] tracking-tight leading-tight">
            Cultivating Authentic Knowledge & Growth
          </h1>
          <p className="text-base text-[#7c756e] font-sans leading-relaxed italic">
            "Bridging classical foundations with contemporary clarity for everyday seekers."
          </p>
        </div>

        {/* ECOSYSTEM GATEWAYS: The Beautiful Entrance Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Gateway 1: Reflections */}
          <Link href="/reflections" className="group bg-white border border-[#e6dfd3] p-6 rounded-2xl shadow-xs hover:border-[#1c1a19] hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">✨</div>
              <h3 className="text-lg font-serif font-medium text-[#1c1a19]">Reflections Hub</h3>
              <p className="text-xs text-[#7c756e] font-sans">የምልከታና ማስታወሻ ገጽ</p>
              <p className="text-xs text-[#4c4a49] leading-relaxed">
                Access structured video reminders, Seerah series, and simplified core notes across fields.
              </p>
            </div>
            <div className="text-xs font-bold text-[#1c1a19] flex items-center gap-1 group-hover:translate-x-1 transition-transform">Enter Hub →</div>
          </Link>

          {/* Gateway 2: Academy */}
          <Link href="/courses" className="group bg-white border border-[#e6dfd3] p-6 rounded-2xl shadow-xs hover:border-[#1c1a19] hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🎓</div>
              <h3 className="text-lg font-serif font-medium text-[#1c1a19]">Academy</h3>
              <p className="text-xs text-[#7c756e] font-sans">የትምህርት መድረክ</p>
              <p className="text-xs text-[#4c4a49] leading-relaxed">
                Enroll in structured, progressive Islamic sciences curricula built intentionally step-by-step.
              </p>
            </div>
            <div className="text-xs font-bold text-[#1c1a19] flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Courses →</div>
          </Link>

          {/* Gateway 3: Podcast */}
          <Link href="/podcast" className="group bg-white border border-[#e6dfd3] p-6 rounded-2xl shadow-xs hover:border-[#1c1a19] hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🎙️</div>
              <h3 className="text-lg font-serif font-medium text-[#1c1a19]">Podcast</h3>
              <p className="text-xs text-[#7c756e] font-sans">የሁነይን ፖድካስት</p>
              <p className="text-xs text-[#4c4a49] leading-relaxed">
                Listen to long-form conversations, critical audio essays, and communal problem-solving breakdowns.
              </p>
            </div>
            <div className="text-xs font-bold text-[#1c1a19] flex items-center gap-1 group-hover:translate-x-1 transition-transform">Listen Now →</div>
          </Link>

        </div>

        {/* CORE CORE STRATEGY / OBJECTIVES */}
        <div className="border-t border-[#e6dfd3] pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#4c4a49] leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-serif font-medium text-base text-[#1c1a19]">Our Primary Goal</h4>
            <p>
              To democratize structured learning, ensuring foundational knowledge of belief (Aqeedah), practice (Fiqh), and interior refinement (Tazkiyah) is straightforwardly comprehensible for the layperson (Aami) without thinning spiritual depth.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif font-medium text-base text-[#1c1a19]">Strategic Framework</h4>
            <p>
              By fusing production-grade video production with scannable textual literature, we give our community distinct pathways to interact with sacred sciences based entirely on their schedule and preferred style of content digestion.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}