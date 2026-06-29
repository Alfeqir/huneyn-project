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

interface BlogNote {
  id: string;
  title: string;
  amharicTitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

// 📺 YouTube Video Hub Databases
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

// 📝 Independent Standalone Notes (Scholarly Blog Environment)
const STANDALONE_BLOG_NOTES: BlogNote[] = [
  {
    id: 'note-1',
    title: 'The Anatomy of Sincerity in Digital Spaces',
    amharicTitle: 'በዲጂታል ዓለም ውስጥ ያለ ኢኽላስ (ቅንነት)',
    date: 'June 2026',
    readTime: '4 min read',
    excerpt: 'Examining the structural threats that instant validation metrics pose to individual heart intentionality.',
    content: 'In contemporary digital micro-climates, the metrics of visibility frequently conflict with classical paradigms of spiritual anonymity. Cultivating internal sincerity requires an intentional scaffolding of hidden devotions—actions deliberately kept away from social transmission strings.'
  },
  {
    id: 'note-2',
    title: 'Classical Research Methodologies vs Modern Speed',
    amharicTitle: 'የቀደሙ ሊቃውንት የምርምር ስልቶች እና የዘመናዊው ዓለም ፍጥነት',
    date: 'May 2026',
    readTime: '6 min read',
    excerpt: 'A review of traditional text extraction patience versus fast-paced content consumption loops.',
    content: 'Traditional scholarship prioritized slow vertical deep-dives into single-text syntax parameters before extraction arguments were formed. Modern information structures favor shallow horizontal distributions, creating an immediate need for students to rebuild focused attention boundaries.'
  }
];

export default function ReflectionsPage() {
  // Navigation State: 'landing' (clean gateway view) | 'video' | 'notes'
  const [activeView, setActiveView] = useState<'landing' | 'video' | 'notes'>('landing');
  
  // Active inner data pointers
  const [selectedSeries, setSelectedSeries] = useState<VideoSeries>(VIDEO_SERIES_ARCHIVE[0]);
  const [activeVideo, setActiveVideo] = useState<Video>(VIDEO_SERIES_ARCHIVE[0].videos[0]);
  const [selectedBlog, setSelectedBlog] = useState<BlogNote>(STANDALONE_BLOG_NOTES[0]);

  const handleSeriesChange = (series: VideoSeries) => {
    setSelectedSeries(series);
    const firstValid = series.videos.find(v => v.isAvailable) || series.videos[0];
    setActiveVideo(firstValid);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10 mt-12">
        
        {/* --- GLOBAL SECTION BACK NAVIGATION (Only visible inside a hub) --- */}
        {activeView !== 'landing' && (
          <button
            onClick={() => setActiveView('landing')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#7c756e] hover:text-[#1c1a19] bg-transparent border-0 cursor-pointer transition-colors"
          >
            ← Back to Directory Overview
          </button>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: CLEAN LANDING GATEWAY (No contents visible, just choice portals) */}
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

            {/* The Two Main Choice Blocks Side-By-Side */}
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
        {/* VIEW 2: INSIDE THE VIDEO BROADCASTS HUB */}
        {/* ========================================================================= */}
        {activeView === 'video' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-[#e6dfd3] pb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-medium text-[#1c1a19]">{selectedSeries.title}</h2>
                <p className="text-xs font-mono text-[#7c756e] uppercase tracking-wider">{selectedSeries.englishTitle} — Video Archive</p>
              </div>
              
              {/* Internal Series Jumper Buttons */}
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
              {/* Embedded Player Display */}
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

              {/* Side Playlists Part Column */}
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
        {/* VIEW 3: INSIDE THE INDEPENDENT WRITTEN STUDY NOTES (BLOG HUB) */}
        {/* ========================================================================= */}
        {activeView === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Left Side: Blog Notebook Feed List */}
            <div className="md:col-span-4 space-y-3">
              <p className="text-[11px] font-mono font-bold text-[#9c938a] uppercase tracking-wider border-b border-[#f4f0ea] pb-2">Written Diary Notebooks:</p>
              {STANDALONE_BLOG_NOTES.map((blog) => (
                <button
                  key={blog.id}
                  onClick={() => setSelectedBlog(blog)}
                  className={`w-full text-left p-4 border rounded-xl transition-all flex flex-col space-y-2 cursor-pointer select-none
                    ${selectedBlog.id === blog.id ? 'bg-white border-[#1c1a19] ring-1 ring-[#1c1a19]/5' : 'bg-white border-[#e6dfd3] hover:border-[#1c1a19]'}`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#7c756e] font-bold block">{blog.date} • {blog.readTime}</span>
                    <h4 className="text-sm font-serif font-medium text-[#1c1a19] leading-snug">{blog.amharicTitle}</h4>
                    <p className="text-[11px] text-[#7c756e] font-sans font-medium line-clamp-1">{blog.title}</p>
                  </div>
                  <p className="text-[11px] text-[#5c554e] line-clamp-2 leading-relaxed font-sans">{blog.excerpt}</p>
                </button>
              ))}
            </div>

            {/* Right Side: Clean Expanded Reading Sheet */}
            <div className="md:col-span-8 bg-white border border-[#e6dfd3] rounded-3xl p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#7c756e] font-bold">
                  <span>{selectedBlog.date}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#1c1a19] pt-1">{selectedBlog.amharicTitle}</h3>
                <p className="text-xs text-[#7c756e] font-mono uppercase tracking-wider">{selectedBlog.title}</p>
              </div>

              <div className="text-sm text-[#4c4a49] leading-relaxed font-sans space-y-4 border-t border-[#f4f0ea] pt-6 whitespace-pre-line">
                {selectedBlog.content}
              </div>

              <div className="bg-[#faf8f5] border border-dashed border-[#e6dfd3] p-4 rounded-xl text-xs text-[#7c756e] font-mono mt-8">
                ✒️ <strong>Future Writing Track:</strong> New separate analytical journals, community advice blueprints, and educational logs will save directly into this clean reading stream framework.
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}