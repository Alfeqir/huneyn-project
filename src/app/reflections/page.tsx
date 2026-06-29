'use client';

import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  part: string;
  duration: string;
  youtubeId: string;
  isAvailable: boolean;
}

interface VideoSeries {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  videos: Video[];
}

// Restructured Categorized Note Blueprint
interface CategorizedNote {
  order: number;
  title: string;
  amharicTitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

interface NoteDatabase {
  [key: string]: {
    label: string;
    description: string;
    notes: CategorizedNote[];
  };
}

// 📺 YouTube Video Hub Databases (100% Intact & Untouched)
const VIDEO_SERIES_ARCHIVE: VideoSeries[] = [
  {
    id: 'series-1',
    title: 'መልካም ንግግር ጥፋት ተፈልጎባት',
    englishTitle: 'Good Words Under Scrutiny',
    description: 'An analytical review of expressions that seem righteous on the surface but carry hidden pitfalls or misunderstandings when taken out of context.',
    videos: [
      { id: 'v1-0', title: 'ክፍል 0 (intro)', part: 'Intro', duration: '3:37', youtubeId: 'WLvHsOOWLPg', isAvailable: true },
      { id: 'v1-1', title: 'ክፍል 1', part: 'Part 1', duration: '--:--', youtubeId: '', isAvailable: false },
      { id: 'v1-2', title: 'ክፍል 2', part: 'Part 2', duration: '--:--', youtubeId: '', isAvailable: false }
    ]
  },
  {
    id: 'series-2',
    title: 'አቡበክር እውነተኛ ወዳጅ',
    englishTitle: 'Abu Bakr: The Real Friend',
    description: 'A deep biographical exploration into companion loyalty, character metrics, and structural leadership models from the life of Abu Bakr.',
    videos: [
      { id: 'v2-0', title: 'ክፍል 0 (intro)', part: 'Intro', duration: '4:30', youtubeId: 'dIEaYMctApU', isAvailable: true },
      { id: 'v2-1', title: 'ክፍል 1', part: 'Part 1', duration: '--:--', youtubeId: '', isAvailable: false }
    ]
  },
  {
    id: 'series-3',
    title: 'እኔን ቢያረገኝ',
    englishTitle: 'If It Were Me',
    description: 'Personal reflective studies translating classical textual principles into real-world modern decision-making matrixes.',
    videos: [
      { id: 'v3-0', title: 'ክፍል 0 (intro)', part: 'Intro', duration: '3:39', youtubeId: 'ULoBXnKPhpE', isAvailable: true },
      { id: 'v3-1', title: 'ክፍል 1', part: 'Part 1', duration: '--:--', youtubeId: '', isAvailable: false }
    ]
  }
];

// 📝 The New Restructured 6-Category Audience Database
const CATEGORIZED_NOTES_DATABASE: NoteDatabase = {
  campus: {
    label: "🎓 Campus Students",
    description: "Anchoring classical principles and maintaining spiritual baseline clarity within higher education.",
    notes: [
      { order: 1, title: "The Modern Campus Dilemma", amharicTitle: "የካምፓስ ሕይወትና የዒማን መዋዠቅ", date: "June 2026", readTime: "5 min read", excerpt: "Balancing academic requirements cleanly while keeping daily spiritual benchmarks active.", content: "The modern campus ecosystem is built to question presuppositions. For a genuine seeker, establishing non-negotiable spiritual metrics early in the morning and protecting basic communal bonds represents the supreme defensive architecture." },
      { order: 2, title: "Time Optimization Loops", amharicTitle: "የጊዜ አጠቃቀም ስልቶች ለተማሪዎች", date: "June 2026", readTime: "4 min read", excerpt: "Strategic parameters for handling double workflows—academic syllabi and sacred literacy.", content: "Barakah is built by honoring priorities. Protect your post-dawn hour for foundational text review before secular project timelines scatter your focus points." },
      { order: 3, title: "Intellectual Sovereignty", amharicTitle: "የአስተሳሰብ ነጻነት በክፍል ውስጥ", date: "June 2026", readTime: "6 min read", excerpt: "Processing modern philosophical parameters without diluting core Aqeedah foundational metrics.", content: "Doubts inside secular discourse are often historical or psychological rather than purely logical. Build solid systematic textual baselines first before exploring modern analytical theories." }
    ]
  },
  media: {
    label: "📱 Media Users",
    description: "Cultivating rigorous analytical filters for processing high-speed algorithmic inputs safely.",
    notes: [
      { order: 1, title: "The Algorithmic Heart", amharicTitle: "የሶሻል ሚዲያና የልብ መርጋት", date: "June 2026", readTime: "5 min read", excerpt: "Analyzing how hyper-speed feeds shape intention fields and psychological stability.", content: "Every visual imprint shifts interior spiritual orientation. Guarding your interface entry points is the supreme dynamic fast of the present tech generation." },
      { order: 2, title: "Digital Transmission Integrity", amharicTitle: "የዕውቀት ስርጭት ስርዓት", date: "June 2026", readTime: "6 min read", excerpt: "Core criteria for publishing or sharing knowledge indicators across media networks cleanly.", content: "Platform reach does not substitute for transmission safety. Ensure information lines are fully cross-referenced before sending to community streams." }
    ]
  },
  parents: {
    label: "🏡 Parents",
    description: "Constructing protective household frameworks to foster organic family development.",
    notes: [
      { order: 1, title: "Nurturing Natural Fitrah", amharicTitle: "የልጆች አስተዳደግና የዘመኑ ተግዳሮት", date: "June 2026", readTime: "7 min read", excerpt: "Protecting a child's foundational intuition from early excessive interface exposure.", content: "Children emulate active micro-habits rather than structural verbal commands. The home structure must emphasize high tactile baseline connections, reading structures, and clear-sighted presence." }
    ]
  },
  ilm: {
    label: "📚 Students of Ilm",
    description: "Formal parameters regarding classical text mastery, methodology, and character layout metrics.",
    notes: [
      { order: 1, title: "The Etiquette of the Seeker", amharicTitle: "የእውቀት ፈላጊ ስነ-ምግባር", date: "June 2026", readTime: "8 min read", excerpt: "Why purification of intent strictly overrides basic technical knowledge accumulation.", content: "Knowledge serves as a clean ambient illumination that requires a quiet, highly disciplined receptacle. Integrity before text frameworks remains the absolute condition for lasting retention." },
      { order: 2, title: "The Textual Progression Staircase", amharicTitle: "ደረጃ በደረጃ የሚቀሰም እውቀት", date: "May 2026", readTime: "7 min read", excerpt: "A sequential guide on moving through classical primers safely without skipping essential foundations.", content: "Diving directly into expansive analytical debates before solidifying basic legal or grammatical codices produces fragile comprehension frameworks. Follow traditional paths meticulously." }
    ]
  },
  women: {
    label: "✨ Women",
    description: "Honoring the historic and contemporary roles of female legacy creators and legal minds.",
    notes: [
      { order: 1, title: "Architects of Foundational Legacy", amharicTitle: "የሙስሊም ሴቶች ታሪካዊ ሚና", date: "June 2026", readTime: "6 min read", excerpt: "Examining historic precedents of institutional design and scholarly output led by women.", content: "True community building centers around structural domestic strength combined with advanced legal and intellectual literacy. Our history shows women consistently leading academic spaces with flawless preservation of identity." }
    ]
  },
  tech: {
    label: "💻 Tech",
    description: "Deploying programmatic tools, design models, and system engineering architectures to serve the community.",
    notes: [
      { order: 1, title: "Code as a Continuous Legacy", amharicTitle: "ቴክኖሎጂና የእውቀት ስርጭት", date: "June 2026", readTime: "5 min read", excerpt: "Leveraging clean structural programming layout models to open up classical resources safely.", content: "Writing optimal software interfaces, highly legible indexes, and functional reading frameworks reduces architectural friction for thousands of students globally. Intentional coding is a high-grade legacy asset." }
    ]
  }
};

export default function ReflectionsPage() {
  // Navigation State: 'landing' | 'video' | 'notes'
  const [activeView, setActiveView] = useState<'landing' | 'video' | 'notes'>('landing');
  
  // Note Target Audience Filtering State (Defaulting to 'campus')
  const [activeNoteCategory, setActiveNoteCategory] = useState<string>('campus');
  
  // Active inner data pointers for Video Hub (Preserved Completely)
  const [selectedSeries, setSelectedSeries] = useState<VideoSeries>(VIDEO_SERIES_ARCHIVE[0]);
  const [activeVideo, setActiveVideo] = useState<Video>(VIDEO_SERIES_ARCHIVE[0].videos[0]);

  const handleSeriesChange = (series: VideoSeries) => {
    setSelectedSeries(series);
    const firstValid = series.videos.find(v => v.isAvailable) || series.videos[0];
    setActiveVideo(firstValid);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10 mt-12">
        
        {/* --- GLOBAL SECTION BACK NAVIGATION --- */}
        {activeView !== 'landing' && (
          <button
            onClick={() => setActiveView('landing')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#7c756e] hover:text-[#1c1a19] bg-transparent border-0 cursor-pointer transition-colors"
          >
            ← Back to Directory Overview
          </button>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: CLEAN LANDING GATEWAY */}
        {/* ========================================================================= */}
        {activeView === 'landing' && (
          <div className="space-y-12 py-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-[#7c756e] font-bold">እይታዎች እና ማስታወሻዎች • Reflections</p>
              <h1 className="text-4xl font-serif font-medium text-[#1c1a19]">Archive Portals</h1>
              <p className="text-sm text-[#7c756e]">
                Welcome to the knowledge laboratory. Choose your preferred study pathway below to browse multi-part video classes or read separate analytical notebooks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Option A Card: Video Hub Portal */}
              <div 
                onClick={() => setActiveView('video')}
                className="bg-white border border-[#e6dfd3] rounded-3xl p-8 shadow-xs hover:border-[#1c1a19] transition-all cursor-pointer group flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#1c1a19] rounded-2xl flex items-center justify-center text-xl text-white select-none">
                    🎬
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-medium text-[#1c1a19] group-hover:text-red-800 transition-colors">Video Broadcasts Hub</h3>
                    <p className="text-xs text-[#7c756e] font-mono uppercase">የቪዲዮ ትምህርቶች ማዕከል</p>
                  </div>
                  <p className="text-xs text-[#4c4a49] leading-relaxed font-sans">
                    Access our high-fidelity dynamic video series logs, multi-part introductory outlines, and digital lectures indexed step-by-step.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-[#1c1a19] pt-4 border-t border-[#f4f0ea] flex items-center justify-between">
                  <span>Enter Video Theatre</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Option B Card: Independent Notes Portal */}
              <div 
                onClick={() => setActiveView('notes')}
                className="bg-white border border-[#e6dfd3] rounded-3xl p-8 shadow-xs hover:border-[#1c1a19] transition-all cursor-pointer group flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-xl select-none">
                    📝
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-medium text-[#1c1a19] group-hover:text-amber-800 transition-colors">Written Study Notes</h3>
                    <p className="text-xs text-[#7c756e] font-mono uppercase">ጽሑፎች እና የግል ማስታወሻዎች</p>
                  </div>
                  <p className="text-xs text-[#4c4a49] leading-relaxed font-sans">
                    Browse stand-alone scholarly diaries, blog-style reflections, and personal articles addressing contemporary community issues.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-[#1c1a19] pt-4 border-t border-[#f4f0ea] flex items-center justify-between">
                  <span>Open Scholarly Blog Notes</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: INSIDE THE VIDEO BROADCASTS HUB (100% Preserved & Intact) */}
        {/* ========================================================================= */}
        {activeView === 'video' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-[#e6dfd3] pb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-medium text-[#1c1a19]">{selectedSeries.title}</h2>
                <p className="text-xs font-mono text-[#7c756e] uppercase tracking-wider">{selectedSeries.englishTitle} — Video Archive</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {VIDEO_SERIES_ARCHIVE.map((series) => (
                  <button
                    key={series.id}
                    onClick={() => handleSeriesChange(series)}
                    className={`px-3 py-1.5 text-xs font-serif border rounded-xl transition-all cursor-pointer
                      ${selectedSeries.id === series.id ? 'bg-[#1c1a19] text-white border-[#1c1a19]' : 'bg-white text-[#2c2a29] border-[#e6dfd3]'}`}
                  >
                    {series.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-xs border border-[#e6dfd3] relative">
                  {activeVideo.isAvailable ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                      title={activeVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 text-stone-400 p-6 text-center space-y-1">
                      <span className="text-xl">⏳</span>
                      <p className="font-serif text-xs font-medium text-stone-300">Segment in production line.</p>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-white border border-[#e6dfd3] rounded-xl text-xs text-[#5c554e] leading-relaxed font-sans">
                  {selectedSeries.description}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2">
                <p className="text-[11px] font-mono font-bold text-[#9c938a] uppercase tracking-wider border-b border-[#f4f0ea] pb-2">Available Parts:</p>
                {selectedSeries.videos.map((vid) => (
                  <button
                    key={vid.id}
                    onClick={() => vid.isAvailable && setActiveVideo(vid)}
                    disabled={!vid.isAvailable}
                    className={`w-full text-left p-3 border rounded-xl flex items-center justify-between transition-all select-none
                      ${!vid.isAvailable ? 'bg-stone-50 border-[#f4f0ea] opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                      ${activeVideo.id === vid.id && vid.isAvailable ? 'bg-white border-[#1c1a19] ring-1 ring-[#1c1a19]/5' : 'bg-white border-[#e6dfd3]'}`}
                  >
                    <div>
                      <h4 className="text-xs font-serif font-medium text-[#1c1a19]">{vid.title}</h4>
                      <p className="text-[9px] font-mono text-[#7c756e] uppercase">{vid.part}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#7c756e]">{vid.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: NEW INTERACTIVE TARGET AUDIENCE METHOD FOR THE NOTES SECTION      */}
        {/* ========================================================================= */}
        {activeView === 'notes' && (
          <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
            
            {/* Header Identity block */}
            <div className="border-b border-[#e6dfd3] pb-4">
              <h2 className="text-2xl font-serif font-medium text-[#1c1a19]">Classified Study Reminders</h2>
              <p className="text-xs font-mono text-[#7c756e] uppercase tracking-wider">ጽሑፎች እና የግል ማስታወሻዎች — Structured Registers</p>
            </div>

            {/* 🛠️ The Audience Selection Tab Bar Grid (Highly Responsive) */}
            <div className="flex flex-wrap gap-2 border-b border-[#f4f0ea] pb-4">
              {Object.keys(CATEGORIZED_NOTES_DATABASE).map((key) => {
                const category = CATEGORIZED_NOTES_DATABASE[key];
                const isCurrent = activeNoteCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveNoteCategory(key)}
                    className={`px-4 py-2.5 text-xs font-sans font-bold tracking-wide border rounded-xl transition-all cursor-pointer outline-none select-none
                      ${isCurrent 
                        ? 'bg-[#1c1a19] text-white border-[#1c1a19] shadow-xs' 
                        : 'bg-white text-[#7c756e] border-[#e6dfd3] hover:text-[#1c1a19] hover:border-[#1c1a19]'}`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Target Audience Mission Statement block */}
            <div className="bg-[#e6dfd3]/20 p-5 rounded-2xl border border-[#e6dfd3]/60">
              <p className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#7c756e] mb-1">Target Context Profile</p>
              <p className="text-xs font-serif italic text-[#4c4a49] leading-relaxed">
                "{CATEGORIZED_NOTES_DATABASE[activeNoteCategory].description}"
              </p>
            </div>

            {/* Ordered List Stream Layout (Ordered 1, 2, 3 as requested) */}
            <div className="space-y-6">
              {CATEGORIZED_NOTES_DATABASE[activeNoteCategory].notes.map((note) => (
                <div 
                  key={note.order} 
                  className="bg-white border border-[#e6dfd3] p-6 rounded-2xl shadow-xs transition-all space-y-4"
                >
                  {/* Meta Strip */}
                  <div className="flex items-center justify-between border-b border-[#f4f0ea] pb-3">
                    <div className="flex items-center gap-3">
                      {/* Explicit Order Tracker Badge */}
                      <span className="w-7 h-7 rounded-lg bg-[#1c1a19] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                        {note.order}
                      </span>
                      <div>
                        <h4 className="text-md font-serif font-medium text-[#1c1a19] leading-snug">
                          {note.amharicTitle}
                        </h4>
                        <p className="text-[11px] text-[#7c756e] font-sans font-medium">
                          {note.title}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-stone-400 bg-stone-50 border border-stone-200/60 px-2 py-0.5 rounded-sm">
                      {note.date} • {note.readTime}
                    </span>
                  </div>

                  {/* Summary/Excerpt block */}
                  <p className="text-[11px] font-mono font-bold text-[#7c756e] uppercase tracking-wider">
                    Core Focus: <span className="font-normal normal-case text-[#4c4a49] font-sans text-xs ml-1">{note.excerpt}</span>
                  </p>

                  {/* Complete Readout Container */}
                  <div className="bg-[#faf8f5] p-5 rounded-xl border border-stone-100 text-sm leading-relaxed text-[#2c2a29] font-sans whitespace-pre-line">
                    {note.content}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}