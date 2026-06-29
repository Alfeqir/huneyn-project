'use client';

import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  amharicTitle: string;
  duration: string;
  instructor: string;
  status: 'ongoing' | 'upcoming';
  description: string;
  modules: string[];
}

const ACADEMY_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Foundational Islamic Jurisprudence',
    amharicTitle: 'ተግባራዊ የፊቅህ መሠረቶች',
    duration: '12 Weeks',
    instructor: 'Huneyn Academy Faculty',
    status: 'ongoing',
    description: 'A comprehensive structured module mapping real-world modern application guidelines covering purification, prayer rules, and daily routine transactional parameters.',
    modules: [
      'Module 1: Principles of Purification & Intentionality',
      'Module 2: The Core Mechanics of Prayer (Salah Syntax)',
      'Module 3: Exceptional Cases, Travel Allowances & Commuting Fiqh',
      'Module 4: Modern Financial Transactions & Ethical Guidelines'
    ]
  },
  {
    id: 'course-2',
    title: 'Purification of the Soul (Tazkiyah Collective)',
    amharicTitle: 'የነፍስ ማጥሪያ እና ስነ-ምግባር ማነፅ',
    duration: '8 Weeks',
    instructor: 'Huneyn Academy Faculty',
    status: 'upcoming',
    description: 'An upcoming structural training lab addressing internal character cultivation, fighting attention distraction, and building intentional focus metrics.',
    modules: [
      'Module 1: Identifying Modern Heart Distractions',
      'Module 2: The Architecture of Nightly Self-Audit (Muhasabah)',
      'Module 3: Tongue Rectification & Social Impact Mitigation'
    ]
  }
];

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'upcoming'>('all');

  const filteredCourses = ACADEMY_COURSES.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12 mt-12">
        
        {/* --- ACADEMY HEADER --- */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#7c756e] font-bold">የታሪክ እና የዕውቀት ማዕከል • Learning</p>
          <h1 className="text-4xl font-serif font-medium text-[#1c1a19]">Huneyn Academy</h1>
          <p className="text-sm text-[#7c756e]">
            Join our deep structured programs built to take you from a casual listener to a comprehensive student.
          </p>
        </div>

        {/* --- STATUS SEGMENT SELECTOR --- */}
        <div className="flex justify-center border-b border-[#e6dfd3] max-w-xs mx-auto pb-px">
          {(['all', 'ongoing', 'upcoming'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-2 text-xs uppercase tracking-wider font-bold transition-all border-b-2 bg-transparent cursor-pointer
                ${activeTab === tab 
                  ? 'text-[#1c1a19] border-[#1c1a19]' 
                  : 'text-[#9c938a] border-transparent hover:text-[#1c1a19]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- COURSE REGISTER LIST --- */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white border border-[#e6dfd3] rounded-3xl p-6 md:p-8 shadow-xs space-y-6 hover:border-[#7c756e] transition-colors"
            >
              {/* Top Banner Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#f4f0ea] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${course.status === 'ongoing' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                    <span className={`text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded
                      ${course.status === 'ongoing' ? 'text-emerald-800 bg-emerald-50' : 'text-amber-800 bg-amber-50'}`}>
                      {course.status} Term
                    </span>
                    <span className="text-xs text-[#9c938a] font-mono">Duration: {course.duration}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-[#1c1a19] pt-1">{course.title}</h3>
                  <p className="text-xs text-[#7c756e] font-sans font-medium">{course.amharicTitle}</p>
                </div>
              </div>

              {/* Course Core Narrative */}
              <p className="text-sm text-[#4c4a49] leading-relaxed font-sans">
                {course.description}
              </p>

              {/* Interactive Curriculum Dropdown Rows */}
              <div className="space-y-2 bg-[#faf8f5] p-5 rounded-xl border border-[#e6dfd3]/60">
                <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#7c756e] mb-3">
                  Curriculum Syllabus Blueprint
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.modules.map((mod, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#4c4a49] font-sans">
                      <span className="text-[#9c938a] font-mono select-none">[{i + 1}]</span>
                      <span className="leading-tight">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Register Call To Action */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs font-mono text-[#7c756e]">Instructor: <strong className="text-[#2c2a29]">{course.instructor}</strong></span>
                {course.status === 'ongoing' ? (
                  <button className="text-xs font-semibold bg-[#1c1a19] text-white px-5 py-2.5 rounded-xl transition-all opacity-50 cursor-not-allowed">
                    Term Closed / ተመዝግቦ አልቋል
                  </button>
                ) : (
                  <button className="text-xs font-semibold bg-white border border-[#1c1a19] text-[#1c1a19] px-5 py-2.5 rounded-xl transition-all hover:bg-[#1c1a19] hover:text-white">
                    Notify Me Upon Launch →
                  </button>
                )}
              </div>

            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 text-sm text-[#7c756e] font-mono border border-dashed border-[#e6dfd3] rounded-2xl">
              No specific academy terms match this filter profile right now.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}