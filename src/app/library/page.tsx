'use client';

import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  amharicTitle: string;
  status: 'published' | 'upcoming';
  description: string;
  amharicDescription: string;
  pages?: string;
  year?: string;
  telegram?: string;
  phone?: string;
  coverImage?: string;
}

const BOOK_COLLECTION: Book[] = [
  {
    id: 'current-book',
    title: 'Behind the Slogan', 
    amharicTitle: 'ከመፈክር ጀርባ', 
    status: 'published',
    description: "Every generation has slogans that sound righteous but are used to silence truth, justify sin, or divide people. Behind the Slogan exposes these phrases, reveals the intentions and misunderstandings behind them, and offers an evidence-based Islamic response rooted in the Qur'an and Sunnah. It is written for every Muslim who wants to think critically, seek knowledge sincerely, and avoid being deceived by words that sound good but lead away from the truth.",
    amharicDescription: "እያንዳንዱ ትውልድ ትክክለኛ የሚመስሉ ነገር ግን እውነትን ለማፈን፣ ኃጢአትን ለማመካኘት ወይም ሰዎችን ለመከፋፈል የሚያገለግሉ መፈክሮች አሉት። «ከመፈክር ጀርባ» እነዚህን የውሸት መፈክሮች በማጋለጥ፣ ከጀርባቸው ያሉትን ድብቅ ዓላማዎችና መግባባቶችን ይፋ ያደርጋል። በመቀጠልም በቁርዓን እና በሱና ላይ የተመሰረተ ሚዛናዊ ኢስላማዊ ምላሽን ያቀርባል። ይህ መጽሐፍ በነጻነት እና በጥልቀት ማሰብ ለሚፈልግ፣ እውነትን በቅንነት ለሚሻ እና መልካም በሚመስሉ ነገር ግን ከእውነት በሚያርቁ ማራኪ ቃላት መታለል ለማይፈልግ ለማንኛውም ሙስሊም የተዘጋጀ ታላቅ ስራ ነው።",
    pages: '204 Pages',
    year: '2025',
    telegram: 'hhuneyn',
    phone: '+251945957932',
    coverImage: '/book-cover.jpg' // Place your photo inside public/book-cover.jpg
  },
  {
    id: 'future-book-1',
    title: 'Advanced Tazkiyah Systems',
    amharicTitle: 'የነፍስ ማጥሪያ ጥልቅ ጥናቶች',
    status: 'upcoming',
    description: 'A future scholarly work currently in development, expanding on behavioral mindfulness and modern cognitive frameworks.',
    amharicDescription: 'በዝግጅት ላይ ያለ ጥልቅ ሳይንሳዊ እና ኢስላማዊ ስራ። ትኩረቱን የባህሪ ስነ-ልቦና እና ዘመናዊ አስተሳሰቦችን በኢስላማዊ እይታ መቃኘት ላይ ያደርጋል።'
  },
  {
    id: 'future-book-2',
    title: 'Prophetic Leadership Metrics',
    amharicTitle: 'የነቢዩ አመራር መለኪያዎች',
    status: 'upcoming',
    description: 'An upcoming structural breakdown analyzing historical societal blueprints for community leaders.',
    amharicDescription: 'ለማህበረሰብ መሪዎች ታሪካዊ እና መዋቅራዊ የአመራር ጥበባትን ከነቢዩ (ሰ.ዐ.ወ) ታሪክ በመነሳት የሚተነትን መጽሐፍ።'
  }
];

export default function LibraryPage() {
  const publishedBook = BOOK_COLLECTION.find(b => b.status === 'published')!;
  const upcomingBooks = BOOK_COLLECTION.filter(b => b.status === 'upcoming');

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-16 mt-12">
        
        {/* --- HEADER --- */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#7c756e] font-bold">የመጽሐፍ ማህደር • Literature</p>
          <h1 className="text-4xl font-serif font-medium text-[#1c1a19]">The Library</h1>
          <p className="text-sm text-[#7c756e]">
            Access published literature, research drafts, and previews of upcoming physical distributions.
          </p>
        </div>

        {/* --- HERO: MINIMALIST LIGHT EXHIBITION BOOKCASE --- */}
        <section className="bg-white border border-[#e6dfd3] rounded-3xl p-8 md:p-12 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
      {/* Book Cover Visual Box */}
      <div className="md:col-span-4 flex justify-center">
            <div className="w-56 h-80 bg-[#f4f0ea] rounded-xl shadow-md relative overflow-hidden border border-[#e6dfd3] group hover:scale-[1.02] transition-transform">
              
              {/* Image Layer - Completely clear and unobstructed */}
              <img 
                src={publishedBook.coverImage} 
                alt={publishedBook.title}
                className="w-full h-full object-cover select-none"
              />

              {/* Subtle visual lighting edge overlay to make it look like a real physical book spine */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-stone-900/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Book Metadata & Description */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Published & Available Now
              </span>
              <h2 className="text-3xl font-serif font-medium text-[#1c1a19] pt-2">{publishedBook.amharicTitle}</h2>
              <p className="text-xs font-mono font-bold text-[#7c756e]">{publishedBook.title}</p>
            </div>

            {/* English & Amharic Dual Descriptions */}
            <div className="space-y-4 text-sm leading-relaxed font-sans text-[#4c4a49]">
              <p className="font-medium text-[#1c1a19] border-l-2 border-[#1c1a19] pl-3 italic">
                {publishedBook.description}
              </p>
              <p className="pt-2">
                {publishedBook.amharicDescription}
              </p>
            </div>

            <div className="flex gap-6 border-y border-[#f4f0ea] py-3 text-xs font-mono text-[#7c756e]">
              <div>YEAR: <span className="text-[#1c1a19] font-bold">{publishedBook.year}</span></div>
              <div>LENGTH: <span className="text-[#1c1a19] font-bold">{publishedBook.pages}</span></div>
            </div>

            {/* ORDER & PURCHASE TERMINAL */}
            <div className="pt-2 space-y-4">
              <p className="text-xs font-mono font-bold text-[#7c756e] uppercase tracking-wider">How to purchase or order / መጽሐፉን ለመግዛት፡</p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href={`https://t.me/${publishedBook.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-xs font-mono font-bold text-white bg-[#1c1a19] hover:bg-stone-800 px-5 py-3 rounded-xl transition-all shadow-xs"
                >
                  📱 Telegram: @{publishedBook.telegram}
                </a>
                <a 
                  href={`tel:${publishedBook.phone}`}
                  className="inline-flex items-center justify-center text-xs font-mono font-bold text-[#1c1a19] bg-white border border-[#e6dfd3] hover:border-[#1c1a19] px-5 py-3 rounded-xl transition-all"
                >
                  📞 Call: {publishedBook.phone}
                </a>
                <div className="inline-flex items-center justify-center text-xs font-mono font-bold text-[#7c756e] bg-stone-100/60 border border-dashed border-[#e6dfd3] px-5 py-3 rounded-xl select-none">
                  📄 PDF Edition (Coming Soon)
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* --- FUTURE RELEASES SECTIONS --- */}
        <section className="space-y-6">
          <div className="border-b border-[#e6dfd3] pb-3">
            <h3 className="text-lg font-serif font-medium text-[#1c1a19]">Future Works & Upcoming Releases</h3>
            <p className="text-xs text-[#7c756e] mt-0.5">በዝግጅት ላይ ያሉ ጠቃሚ ፅሁፎች</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upcomingBooks.map(book => (
              <div 
                key={book.id} 
                className="bg-white border border-[#e6dfd3] p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#7c756e] transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-wider text-amber-800 font-bold uppercase bg-amber-50 px-2 py-0.5 rounded">In Development</span>
                  </div>
                  <h4 className="font-serif font-medium text-lg text-[#1c1a19]">{book.title}</h4>
                  <p className="text-xs text-[#7c756e]">{book.amharicTitle}</p>
                  <p className="text-xs text-[#4c4a49] leading-relaxed pt-1 font-sans">{book.amharicDescription}</p>
                </div>
                <div className="text-[11px] font-mono font-bold text-[#9c938a] pt-2 border-t border-[#faf8f5]">
                  Status: Draft Review Phase
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}