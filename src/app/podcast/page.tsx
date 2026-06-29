'use client';

export default function PodcastPage() {
  const PLANNED_THEMES = [
    { title: 'Modern Mindset Crises', desc: 'Analyzing consumer culture, attention deficits, and maintaining deep spiritual roots in a hyper-connected environment.' },
    { title: 'Biographical Blueprints', desc: 'Extended casual breakdowns of historical figures, companion dynamics, and lessons from standard-bearers.' },
    { title: 'The Silent Architecture', desc: 'Conversations focusing on family structures, educational cultivation, and building generational sincerity.' }
  ];

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-6 py-12 flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-10 mt-12">
        
        {/* --- MIC TEASER GRAPHIC --- */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-stone-100 border border-[#e6dfd3] flex items-center justify-center text-3xl shadow-xs relative">
            🎙️
            {/* Subtle pulse wave line effect */}
            <span className="absolute inset-0 rounded-full border border-red-200 animate-ping opacity-25" />
          </div>
        </div>

        {/* --- HEADER HEADER --- */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-800 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
            Studio Engine in Development
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1c1a19] pt-2">Huneyn Podcast</h1>
          <p className="text-sm text-[#7c756e] max-w-md mx-auto leading-relaxed font-sans">
            We are currently engineering a dedicated high-fidelity audio environment. Extended lectures, analytical roundtables, and structured episodic audio journals will land here soon.
          </p>
        </div>

        {/* --- EXPECTED PLATFORMS LINE --- */}
        <div className="border-y border-[#e6dfd3] py-4 flex items-center justify-center gap-6 text-[11px] font-mono font-bold text-[#7c756e] uppercase tracking-wider">
          <span>🎧 Spotify Audio</span>
          <span className="text-stone-300">•</span>
          <span>🍎 Apple Podcasts</span>
          <span className="text-stone-300">•</span>
          <span>📻 Google Archive</span>
        </div>

        {/* --- PLANNED DISCUSSIONS OUTLINE --- */}
        <div className="space-y-4 text-left">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#9c938a] border-b border-[#f4f0ea] pb-2">
            Planned Broadcast Core Themes:
          </h3>
          <div className="space-y-3">
            {PLANNED_THEMES.map((theme, i) => (
              <div key={i} className="bg-white border border-[#e6dfd3] p-4 rounded-xl space-y-1">
                <h4 className="font-serif font-medium text-sm text-[#1c1a19]">{theme.title}</h4>
                <p className="text-xs text-[#4c4a49] leading-relaxed font-sans">{theme.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- ALTERNATIVE CTA BUTTON --- */}
        <div className="pt-2">
          <p className="text-xs text-[#7c756e] font-sans mb-3">While the audio studio cooks, join our video playlists:</p>
          <a 
            href="/reflections"
            className="inline-flex items-center justify-center text-xs font-mono font-bold text-[#1c1a19] border border-[#1c1a19] hover:bg-[#1c1a19] hover:text-white px-5 py-2.5 rounded-xl transition-all"
          >
            Go to Video Reflections →
          </a>
        </div>

      </div>
    </main>
  );
}