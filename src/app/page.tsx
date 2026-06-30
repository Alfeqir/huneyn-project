'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] flex flex-col justify-center px-6 py-16">
      
      <div className="max-w-5xl mx-auto w-full space-y-16 mt-8">
        
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

        {/* ECOSYSTEM GATEWAYS: The Beautiful 4-Quadrant Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
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

          {/* Gateway 4: The Library (NEW!) */}
          <Link href="/library" className="group bg-white border border-[#e6dfd3] p-6 rounded-2xl shadow-xs hover:border-[#1c1a19] hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-lg font-serif font-medium text-[#1c1a19]">The Library</h3>
              <p className="text-xs text-[#7c756e] font-sans">የመጽሐፍ ማህደር</p>
              <p className="text-xs text-[#4c4a49] leading-relaxed">
                Explore original physical distributions, research papers, study literature, and free PDF downloads.
              </p>
            </div>
            <div className="text-xs font-bold text-[#1c1a19] flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Library →</div>
          </Link>

        </div>

        {/* CORE STRATEGY / OBJECTIVES */}
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

      {/* ABOUT US SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900 mt-20 rounded-3xl">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Visual/Aesthetic Box */}
          <div className="relative p-8 bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-2xl shadow-xl overflow-hidden min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
            <div>
              <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">Our Vision</span>
              <h3 className="text-3xl font-bold mt-4 leading-tight font-serif">Preserving Knowledge, Cultivating Community.</h3>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed mt-4">
              Building a solid digital bridge connecting traditional heritage with modern accessibility.
            </p>
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              About <span className="text-emerald-600 dark:text-emerald-400">Huneyn Project</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Huneyn Project is a digital flagship platform dedicated to creating accessible, structured educational foundations. We believe that true growth begins with deep, uncompromised clarity and high-quality presentation.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              While our advanced academy frameworks are safely preserved for future expansion stages, our mission right now is building the digital baseline infrastructure that makes sophisticated resource sharing flawless.
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="py-20 bg-white dark:bg-black rounded-3xl mt-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-12">
            Have questions, ideas, or want to collaborate on the future of this project? Send us a direct inquiry.
          </p>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-center space-y-3 max-w-md mx-auto animate-fade-in">
              <div className="text-3xl">✨</div>
              <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">Message Received!</h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                Thank you for reaching out to Huneyn Project. We will get back to you shortly, Insha'Allah.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-left space-y-6 bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={5} 
                  required
                  placeholder="What would you like to share with us?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-md transition-all duration-200 transform active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}