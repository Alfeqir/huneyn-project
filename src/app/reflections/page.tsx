'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

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

interface CategorizedNote {
  order: number;
  title: string;
  amharicTitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  category?: string;
}

interface NoteDatabase {
  [key: string]: {
    label: string;
    description: string;
    notes: CategorizedNote[];
  };
}

// 🏛️ STATIC LABELS ARCHITECTURE (Keeps descriptions managed inside layout definitions perfectly)
const AUDIENCE_METADATA: Record<string, { label: string; description: string }> = {
  campus: {
    label: "🎓 Campus Students",
    description: "Anchoring classical principles and maintaining spiritual baseline clarity within higher education."
  },
  media: {
    label: "📱 Media Users",
    description: "Cultivating rigorous analytical filters for processing high-speed algorithmic inputs safely."
  },
  parents: {
    label: "🏡 Parents",
    description: "Constructing protective household frameworks to foster organic family development."
  },
  ilm: {
    label: "📚 Students of Ilm",
    description: "Formal parameters regarding classical text mastery, methodology, and character layout metrics."
  },
  women: {
    label: "✨ Women",
    description: "Honoring the historic and contemporary roles of female legacy creators and legal minds."
  },
  tech: {
    label: "💻 Tech",
    description: "Deploying programmatic tools, design models, and system engineering architectures to serve the community."
  }
};

// 📺 YouTube Fallback Database (Maintains visibility if Sanity database array is unpopulated)
const INITIAL_VIDEO_FALLBACK: VideoSeries[] = [
  {
    id: 'series-1',
    title: 'መልካም ንግግር ጥፋት ተፈልጎባት',
    englishTitle: 'Good Words Under Scrutiny',
    description: 'An analytical review of expressions that seem righteous on the surface but carry hidden pitfalls or misunderstandings when taken out of context.',
    videos: [
      { id: 'v1-0', title: 'ክፍል 0 (intro)', part: 'Intro', duration: '3:37', youtubeId: 'WLvHsOOWLPg', isAvailable: true }
    ]
  }
];

export default function ReflectionsPage() {
  const [activeView, setActiveView] = useState<'landing' | 'video' | 'notes'>('landing');
  const [activeNoteCategory, setActiveNoteCategory] = useState<string>('campus');
  
  // Dynamic State Registries connected to live workflows
  const [videoSeriesArchive, setVideoSeriesArchive] = useState<VideoSeries[]>(INITIAL_VIDEO_FALLBACK);
  const [noteDatabase, setNoteDatabase] = useState<NoteDatabase>({});
  
  const [selectedSeries, setSelectedSeries] = useState<VideoSeries | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function syncReflectionsData() {
      try {
        // Query both pools safely from Sanity
        const [rawVideos, rawNotes] = await Promise.all([
          client.fetch(`*[_type == "videoSeries"]{ 
            "id": _id, 
            title, 
            englishTitle, 
            description, 
            videos[] {
              title,
              youtubeId,
              duration,
              part,
              isAvailable
            }
          }`),
          client.fetch(`*[_type == "categorizedNote"] | order(order asc){ order, title, amharicTitle, date, readTime, excerpt, content, category }`)
        ]);

        // 1. Process Video Database Hydration
        if (rawVideos && rawVideos.length > 0) {
          setVideoSeriesArchive(rawVideos);
          setSelectedSeries(rawVideos[0]);
          const firstValid = rawVideos[0].videos?.find((v: Video) => v.isAvailable) || rawVideos[0].videos?.[0];
          setActiveVideo(firstValid || null);
        } else {
          setSelectedSeries(INITIAL_VIDEO_FALLBACK[0]);
          setActiveVideo(INITIAL_VIDEO_FALLBACK[0].videos[0]);
        }

        // 2. Map Flat Sanity Notes into the user's exact 6-Category Object Shape dynamically
        const freshNoteDb: NoteDatabase = {};
        Object.keys(AUDIENCE_METADATA).forEach((key) => {
          const filteredNotes = rawNotes ? rawNotes.filter((n: CategorizedNote) => n.category === key) : [];
          freshNoteDb[key] = {
            label: AUDIENCE_METADATA[key].label,
            description: AUDIENCE_METADATA[key].description,
            notes: filteredNotes
          };
        });
        setNoteDatabase(freshNoteDb);

      } catch (error) {
        console.error("Sanity data syncing pipeline error:", error);
      } finally {
        setLoading(false);
      }
    }

    syncReflectionsData();
  }, []);

  const handleSeriesChange = (series: VideoSeries) => {
    setSelectedSeries(series);
    const firstValid = series.videos?.find(v => v.isAvailable) || series.videos?.[0];
    setActiveVideo(firstValid || null);
  };

  // Safe checks to guarantee clean text render cycles
  const currentNotesGroup = noteDatabase[activeNoteCategory] || { label: '', description: '', notes: [] };

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
        {/* VIEW 2: INSIDE THE VIDEO BROADCASTS HUB (100% Preserved) */}
        {/* ========================================================================= */}
        {activeView === 'video' && selectedSeries && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-[#e6dfd3] pb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-medium text-[#1c1a19]">{selectedSeries.title}</h2>
                <p className="text-xs font-mono text-[#7c756e] uppercase tracking-wider">{selectedSeries.englishTitle} — Video Archive</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {videoSeriesArchive.map((series) => (
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
              <div className="aspect-video w-full max-w-xl mx-auto bg-black rounded-2xl overflow-hidden shadow-xs border border-[#e6dfd3] relative">
                  {activeVideo && activeVideo.isAvailable ? (
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
                {selectedSeries.videos?.map((vid) => (
                  <button
                    key={vid.id}
                    onClick={() => vid.isAvailable && setActiveVideo(vid)}
                    disabled={!vid.isAvailable}
                    className={`w-full text-left p-3 border rounded-xl flex items-center justify-between transition-all select-none
                      ${!vid.isAvailable ? 'bg-stone-50 border-[#f4f0ea] opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                      ${activeVideo && activeVideo.id === vid.id && vid.isAvailable ? 'bg-white border-[#1c1a19] ring-1 ring-[#1c1a19]/5' : 'bg-white border-[#e6dfd3]'}`}
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
        {/* VIEW 3: INTERACTIVE TARGET AUDIENCE WORKSPACE FOR NOTES */}
        {/* ========================================================================= */}
        {activeView === 'notes' && (
          <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
            
            <div className="border-b border-[#e6dfd3] pb-4">
              <h2 className="text-2xl font-serif font-medium text-[#1c1a19]">Classified Study Reminders</h2>
              <p className="text-xs font-mono text-[#7c756e] uppercase tracking-wider">ጽሑፎች እና የግል ማስታወሻዎች — Structured Registers</p>
            </div>

            {/* Tab Navigation Controls */}
            <div className="flex flex-wrap gap-2 border-b border-[#f4f0ea] pb-4">
              {Object.keys(AUDIENCE_METADATA).map((key) => {
                const label = AUDIENCE_METADATA[key].label;
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
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Focus Profile Block */}
            <div className="bg-[#e6dfd3]/20 p-5 rounded-2xl border border-[#e6dfd3]/60">
              <p className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#7c756e] mb-1">Target Context Profile</p>
              <p className="text-xs font-serif italic text-[#4c4a49] leading-relaxed">
                "{currentNotesGroup.description}"
              </p>
            </div>

            {/* Note Output Stream */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-xs font-mono text-center py-12 text-stone-400">Syncing database entries...</div>
              ) : currentNotesGroup.notes && currentNotesGroup.notes.length > 0 ? (
                currentNotesGroup.notes.map((note) => (
                  <div 
                    key={note.order} 
                    className="bg-white border border-[#e6dfd3] p-6 rounded-2xl shadow-xs transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-[#f4f0ea] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#1c1a19] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                          {note.order}
                        </span>
                        <div>
                          <h4 className="text-md font-serif font-medium text-[#1c1a19] leading-snug">
                            {note.amharicTitle}
                          </h4>
                          {note.title && (
                            <p className="text-[11px] text-[#7c756e] font-sans font-medium">
                              {note.title}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-stone-400 bg-stone-50 border border-stone-200/60 px-2 py-0.5 rounded-sm">
                        {note.date} • {note.readTime}
                      </span>
                    </div>

                    {note.excerpt && (
                      <p className="text-[11px] font-mono font-bold text-[#7c756e] uppercase tracking-wider">
                        Core Focus: <span className="font-normal normal-case text-[#4c4a49] font-sans text-xs ml-1">{note.excerpt}</span>
                      </p>
                    )}

                    <div className="bg-[#faf8f5] p-5 rounded-xl border border-stone-100 text-sm leading-relaxed text-[#2c2a29] font-sans whitespace-pre-line">
                      {note.content}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs font-mono text-[#9c938a] border border-dashed border-[#e6dfd3] p-6 rounded-xl italic">
                  No records published under this profile tab yet.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}