'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';

// ⚙️ 1. SANITY CLIENT SETUP
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id', 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, 
});

// 👥 2. PERSONA REGISTRY MAPPING DEFINITIONS
interface Persona {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
}

const PERSONAS: Persona[] = [
  { id: 'beginner', icon: '🌱', title: 'Foundation Seeker', tagline: 'Beginner Track', description: 'A Muslim beginning a serious journey of learning or rebuilding foundational baseline literacy.' },
  { id: 'student', icon: '📚', title: 'Student of Knowledge', tagline: 'Systematic Study', description: 'A learner committed to rigorous, long-term systematic study of classical Islamic sciences.' },
  { id: 'dawah', icon: '📢', title: "Da'wah Worker", tagline: 'Public Engagement', description: 'Actively involved in teaching, advising, content creation, or processing public engagement wisely.' },
  { id: 'parent', icon: '🏡', title: 'Parent & Family Builder', tagline: 'Household Leadership', description: 'Constructing protective household frameworks and improving organic child development metrics.' },
  { id: 'teacher', icon: '🎓', title: 'Future Teacher', tagline: 'Advanced Specialization', description: 'A learner preparing to formally preserve, write, and instruct advanced methodologies to others.' },
  { id: 'sisters', icon: '✨', title: 'Sisters Pathway', tagline: 'Dedicated Focus', description: 'A learning pathway focused on legal legacy creators, female scholarship, and personal growth metrics.' }
];

interface SanityLesson {
  number: number;
  title: string;
  duration?: string;
  youtubeId?: string;
}

interface SanityCourse {
  _id: string;
  title: string;
  domain: string;
  excerpt?: string;
  personas?: string[];
  objectives?: string[];
  reflections?: string[];
  lessons?: SanityLesson[];
}

export default function CoursesPage() {
  const [activePersona, setActivePersona] = useState<string>('beginner');
  const [courses, setCourses] = useState<SanityCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<SanityCourse | null>(null);
  const [activeTab, setActiveTab] = useState<'lessons' | 'objectives' | 'ecosystem'>('lessons');
  const [activeLesson, setActiveLesson] = useState<SanityLesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 📡 3. FETCH DYNAMIC CURRICULUM ARCHITECTURE FROM SANITY
  useEffect(() => {
    async function fetchAcademyData() {
      try {
        setLoading(true);
        const query = `*[_type == "courseTrack"] {
          _id,
          title,
          domain,
          excerpt,
          personas,
          objectives,
          reflections,
          "lessons": *[_type == "lesson" && references(^._id)] | order(number asc) {
            number,
            title,
            duration,
            youtubeId
          }
        }`;
        
        const data = await client.fetch(query);
        setCourses(data);

        // Auto-select the first course assigned to our active persona list
        const defaultCourse = data.find((c: SanityCourse) => c.personas?.includes('beginner'));
        if (defaultCourse) {
          setSelectedCourse(defaultCourse);
          if (defaultCourse.lessons && defaultCourse.lessons.length > 0) {
            setActiveLesson(defaultCourse.lessons[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching data from Sanity:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAcademyData();
  }, []);

  const visibleCourses = courses.filter(c => c.personas?.includes(activePersona));

  const handleCourseChange = (course: SanityCourse) => {
    setSelectedCourse(course);
    setActiveTab('lessons');
    setActiveLesson(course.lessons && course.lessons.length > 0 ? course.lessons[0] : null);
  };

  const activePersonaDetails = PERSONAS.find(p => p.id === activePersona)!;

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-4 sm:px-6 py-12 selection:bg-[#1c1a19]/10">
      <div className="max-w-6xl mx-auto space-y-10 mt-12">
        
        {/* HERO TITLE BLOCK */}
        <div className="border-b border-[#e6dfd3] pb-6 space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#7c756e] font-bold font-mono">Huneyn Program Platforms • መድረክ</p>
          <h1 className="text-4xl font-serif font-medium text-[#1c1a19] tracking-tight">Structured Knowledge Academy</h1>
          <p className="text-sm text-[#7c756e] max-w-2xl leading-relaxed">
            Move from passive consumption to progressive mastery. Select your specific active profile framework below to map an intentional, certified timeline.
          </p>
        </div>

        {/* PROFILE/PERSONA SELECTOR DOCK */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono font-bold text-[#9c938a] uppercase tracking-wider">Select Learning Pathway Persona:</p>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-stone-200 snap-x">
            {PERSONAS.map((persona) => {
              const isActive = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => {
                    setActivePersona(persona.id);
                    const matching = courses.find(c => c.personas?.includes(persona.id));
                    if (matching) {
                      handleCourseChange(matching);
                    } else {
                      setSelectedCourse(null);
                      setActiveLesson(null);
                    }
                  }}
                  className={`snap-start shrink-0 w-64 p-5 rounded-2xl border text-left transition-all cursor-pointer outline-none select-none duration-200
                    ${isActive 
                      ? 'bg-[#1c1a19] text-white border-[#1c1a19] shadow-md scale-[1.01]' 
                      : 'bg-white text-[#2c2a29] border-[#e6dfd3] hover:border-[#1c1a19]'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{persona.icon}</span>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded
                      ${isActive ? 'bg-white/10 text-stone-200' : 'bg-stone-50 text-stone-500 border border-stone-200'}`}>
                      {persona.tagline}
                    </span>
                  </div>
                  <h3 className="font-serif text-md font-medium tracking-tight mb-1">{persona.title}</h3>
                  <p className={`text-[11px] line-clamp-2 leading-relaxed ${isActive ? 'text-stone-300' : 'text-[#7c756e]'}`}>
                    {persona.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RENDERING WORKSPACE LAYOUT */}
        {loading ? (
          <div className="text-center py-20 text-xs font-mono text-stone-400">Loading your Academy Framework infrastructure...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* TIMELINE PATHWAY CONTROLS (LEFT COLUMN) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 bg-[#e6dfd3]/20 border border-[#e6dfd3]/60 rounded-xl">
                <p className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#7c756e]">Active Route Context</p>
                <p className="text-xs font-serif italic text-[#4c4a49] leading-relaxed mt-1">
                  "{activePersonaDetails.description}"
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold text-[#9c938a] uppercase tracking-wider pb-1 border-b border-[#f4f0ea]">Journey Map Progression Layout:</p>
                
                {visibleCourses.length > 0 ? (
                  <div className="relative pl-4 space-y-3 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-[1px] before:bg-[#e6dfd3]">
                    {visibleCourses.map((course, idx) => {
                      const isSelected = selectedCourse?._id === course._id;
                      return (
                        <div 
                          key={course._id}
                          onClick={() => handleCourseChange(course)}
                          className={`relative pl-8 p-3 rounded-xl border transition-all cursor-pointer group select-none
                            ${isSelected 
                              ? 'bg-white border-[#1c1a19] shadow-xs' 
                              : 'bg-white/60 border-transparent hover:bg-white hover:border-[#e6dfd3]'}`}
                        >
                          <div className={`absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 transition-colors flex items-center justify-center font-mono text-[8px] font-bold z-10
                            ${isSelected ? 'bg-[#1c1a19] border-[#1c1a19] text-white' : 'bg-white border-[#e6dfd3] text-[#7c756e]'}`}
                          />
                          <p className="text-[9px] font-mono uppercase text-[#7c756e] tracking-wider mb-0.5">Domain: {course.domain}</p>
                          <h4 className="font-serif text-sm font-medium text-[#1c1a19] group-hover:text-stone-600 transition-colors">
                            {idx + 1}. {course.title}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-stone-400 italic p-4">No tracks uploaded to this pathway yet.</p>
                )}
              </div>
            </div>

            {/* LIVE SYLLABUS WORKSPACE PANELS (RIGHT COLUMN) */}
            <div className="lg:col-span-8">
              {selectedCourse ? (
                <div className="bg-white border border-[#e6dfd3] rounded-2xl overflow-hidden shadow-xs space-y-6 p-6">
                  
                  <div className="space-y-2 border-b border-[#f4f0ea] pb-4">
                    <div className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      📁 Subject Category: {selectedCourse.domain}
                    </div>
                    <h2 className="text-2xl font-serif font-medium text-[#1c1a19]">{selectedCourse.title}</h2>
                    <p className="text-xs text-[#5c554e] leading-relaxed font-sans">{selectedCourse.excerpt || 'No description supplied.'}</p>
                  </div>

                  {/* NAV TABS */}
                  <div className="flex gap-2 border-b border-[#f4f0ea] pb-2">
                    {(['lessons', 'objectives', 'ecosystem'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-bold border-0 bg-transparent cursor-pointer transition-colors relative pb-3
                          ${activeTab === tab ? 'text-[#1c1a19] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1c1a19]' : 'text-[#9c938a] hover:text-[#1c1a19]'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* LECTURE PLAYBACK & SYLLABUS LISTING */}
                  {activeTab === 'lessons' && (
                    <div className="space-y-6">
                      {activeLesson && activeLesson.youtubeId && (
                        <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black border border-stone-200">
                            <iframe
                              src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=0&rel=0`}
                              title={activeLesson.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <p className="font-serif font-medium text-stone-800">Now Playing: Lesson {activeLesson.number} — {activeLesson.title}</p>
                            {activeLesson.duration && (
                              <span className="font-mono text-[10px] text-stone-400 bg-white px-2 py-0.5 rounded border">⏱️ {activeLesson.duration}</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-[10px] font-mono font-bold text-[#9c938a] uppercase tracking-wider">Available Modules & Lectures:</p>
                        {selectedCourse.lessons && selectedCourse.lessons.length > 0 ? (
                          <div className="space-y-2">
                            {selectedCourse.lessons.map((lesson, idx) => {
                              const isCurrentPlaying = activeLesson?.number === lesson.number;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => lesson.youtubeId && setActiveLesson(lesson)}
                                  className={`w-full p-3.5 border rounded-xl flex items-center justify-between transition-all select-none
                                    ${!lesson.youtubeId ? 'bg-stone-50/60 opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                                    ${isCurrentPlaying ? 'bg-[#faf8f5] border-[#1c1a19] ring-1 ring-[#1c1a19]/5' : 'bg-white border-[#e6dfd3] hover:border-stone-400'}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center border
                                      ${isCurrentPlaying ? 'bg-[#1c1a19] text-white border-[#1c1a19]' : 'bg-stone-50 text-stone-500 border-stone-200'}`}>
                                      {lesson.number}
                                    </span>
                                    <div>
                                      <h4 className="text-xs font-serif font-medium text-[#1c1a19]">{lesson.title}</h4>
                                      <p className="text-[9px] font-mono text-[#7c756e] uppercase">
                                        {lesson.youtubeId ? '🎥 Video Lecture' : '⏳ Audio/Text Block'}
                                      </p>
                                    </div>
                                  </div>
                                  {lesson.duration && (
                                    <span className="text-[10px] font-mono text-[#7c756e] bg-stone-50 px-2 py-0.5 rounded border border-stone-100">
                                      {lesson.duration}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs font-mono text-stone-400 italic p-2">Lessons list under structural layout compilation.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* OBJECTIVES & COGNITIVE CHALLENGE CORNER */}
                  {activeTab === 'objectives' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-mono font-bold text-[#9c938a] uppercase tracking-wider">Target Course Objectives:</p>
                        {selectedCourse.objectives && selectedCourse.objectives.length > 0 ? (
                          <ul className="space-y-2 pl-0 list-none">
                            {selectedCourse.objectives.map((obj, i) => (
                              <li key={i} className="text-xs font-sans text-stone-700 flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">✓</span> {obj}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs font-mono text-stone-400 italic">No objectives assigned to this course module track yet.</p>
                        )}
                      </div>

                      {selectedCourse.reflections && selectedCourse.reflections.length > 0 && (
                        <div className="space-y-2 pt-4 border-t border-[#f4f0ea]">
                          <p className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">🧠 Structural Reflection Questions:</p>
                          <div className="space-y-3">
                            {selectedCourse.reflections.map((ref, i) => (
                              <blockquote key={i} className="m-0 pl-4 border-l-2 border-amber-200 italic font-serif text-xs text-stone-600 leading-relaxed">
                                "{ref}"
                              </blockquote>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ECOSYSTEM LINKAGES */}
                  {activeTab === 'ecosystem' && (
                    <div className="space-y-6">
                      <p className="text-xs text-stone-500 leading-relaxed">
                        This curriculum links directly with external Huneyn data nodes. Completing cross-reading tasks ensures deeper, comprehensive baseline assimilation.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/40 space-y-2">
                          <h4 className="font-serif text-xs font-bold text-amber-900 uppercase tracking-wider">📚 Linked Library Texts</h4>
                          <p className="text-[11px] font-sans text-stone-700 bg-white p-2.5 rounded border border-stone-200/60">
                            📖 <strong>Required Syllabus Reader:</strong> Access digital PDFs and structured chapters assigned to this study block.
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-200/40 space-y-2">
                          <h4 className="font-serif text-xs font-bold text-purple-900 uppercase tracking-wider">🎙️ Related Dialogues</h4>
                          <p className="text-[11px] font-sans text-stone-700 bg-white p-2.5 rounded border border-stone-200/60">
                            🎧 <strong>Deeper Exploration:</strong> Listen to associated audio files inside the Broadcast pool.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-xs font-mono text-stone-400 border border-dashed border-[#e6dfd3] p-12 text-center rounded-2xl italic">
                  Select an ordered milestone course on the timeline roadmap to deploy syllabus tracking panels.
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}