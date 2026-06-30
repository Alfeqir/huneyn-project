import Image from 'next/image';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';

interface Book {
  id: string;
  title: string;
  amharicTitle: string;
  author: string;
  description: string;
  amharicDescription: string;
  pages?: string;
  year?: string;
  telegram?: string;
  phone?: string;
  coverImage?: string;
  // --- New fields mapped here ---
  pdfUrl?: string;
  excerptEn?: string;
  excerptAm?: string;
}

const BOOKS_QUERY = `*[_type == "book"] {
  "id": _id,
  "title": titleEn,
  "amharicTitle": titleAm,
  "description": descriptionEn,
  "amharicDescription": descriptionAm,
  author,
  pages,
  year,
  telegram,
  phone,
  "coverImage": coverImage.asset->url,
  // --- Grab the live PDF URL directly from Sanity asset server ---
  "pdfUrl": pdfFile.asset->url,
  excerptEn,
  excerptAm
}`;

export default async function LibraryPage() {
  const books: Book[] = await client.fetch(BOOKS_QUERY);

  const featuredBook = books[0];
  const regularBooks = books.slice(1);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c2a29] px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-16 mt-12">
        
        {/* --- HEADER --- */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#7c756e] font-bold">የመጽሐፍ ማህደር • Literature</p>
          <h1 className="text-4xl font-serif font-medium text-[#1c1a19]">The Library</h1>
          <p className="text-sm text-[#7c756e]">
            Access published literature, research studies, and original physical distributions.
          </p>
        </div>

        {/* --- FEATURED BOOK HERO --- */}
        {featuredBook ? (
          <div className="space-y-8">
            <section className="bg-white border border-[#e6dfd3] rounded-3xl p-8 md:p-12 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Book Cover */}
              <div className="md:col-span-4 flex justify-center">
                <div className="w-56 h-80 bg-[#f4f0ea] rounded-xl shadow-md relative overflow-hidden border border-[#e6dfd3] group hover:scale-[1.02] transition-transform">
                  {featuredBook.coverImage ? (
                    <img 
                      src={featuredBook.coverImage} 
                      alt={featuredBook.title}
                      className="w-full h-full object-cover select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#9c938a] font-mono">
                      No Cover Image
                    </div>
                  )}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-stone-900/10 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Book Metadata & Description */}
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Featured Publication
                  </span>
                  <h2 className="text-3xl font-serif font-medium text-[#1c1a19] pt-2">{featuredBook.amharicTitle || featuredBook.title}</h2>
                  {featuredBook.title && <p className="text-xs font-mono font-bold text-[#7c756e]">{featuredBook.title}</p>}
                  <p className="text-xs text-stone-500 font-sans">By {featuredBook.author}</p>
                </div>

                {/* English & Amharic Dual Descriptions */}
                <div className="space-y-4 text-sm leading-relaxed font-sans text-[#4c4a49]">
                  {featuredBook.description && (
                    <p className="font-medium text-[#1c1a19] border-l-2 border-[#1c1a19] pl-3 italic">
                      {featuredBook.description}
                    </p>
                  )}
                  {featuredBook.amharicDescription && (
                    <p className="pt-2">
                      {featuredBook.amharicDescription}
                    </p>
                  )}
                </div>

                <div className="flex gap-6 border-y border-[#f4f0ea] py-3 text-xs font-mono text-[#7c756e]">
                  <div>YEAR: <span className="text-[#1c1a19] font-bold">{featuredBook.year || '2026'}</span></div>
                  <div>LENGTH: <span className="text-[#1c1a19] font-bold">{featuredBook.pages || 'N/A'}</span></div>
                </div>

                {/* ORDER & PURCHASE TERMINAL */}
                <div className="pt-2 space-y-4">
                  <p className="text-xs font-mono font-bold text-[#7c756e] uppercase tracking-wider">How to purchase or download / መጽሐፉን ለማግኘት፡</p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href={`https://t.me/${featuredBook.telegram || 'hhuneyn'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-xs font-mono font-bold text-white bg-[#1c1a19] hover:bg-stone-800 px-5 py-3 rounded-xl transition-all shadow-xs"
                    >
                      📱 Telegram: @{featuredBook.telegram || 'hhuneyn'}
                    </a>
                    <a 
                      href={`tel:${featuredBook.phone || '+251945957932'}`}
                      className="inline-flex items-center justify-center text-xs font-mono font-bold text-[#1c1a19] bg-white border border-[#e6dfd3] hover:border-[#1c1a19] px-5 py-3 rounded-xl transition-all"
                    >
                      📞 Call: {featuredBook.phone || '+251945957932'}
                    </a>
                    
                    {/* Dynamic PDF Trigger button */}
                    {featuredBook.pdfUrl ? (
                      <a 
                        href={featuredBook.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-5 py-3 rounded-xl transition-all"
                      >
                        📄 Download Full PDF Edition
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center text-xs font-mono text-[#9c938a] bg-stone-100 border border-dashed border-[#e6dfd3] px-5 py-3 rounded-xl select-none">
                        📄 PDF Edition (Coming Soon)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* --- NEW SECTION: SAMPLE CHAPTER PREVIEW EXCERPT --- */}
            {(featuredBook.excerptEn || featuredBook.excerptAm) && (
              <div className="bg-white border border-[#e6dfd3] rounded-3xl p-6 md:p-8 space-y-4">
                <h3 className="font-serif font-medium text-lg text-[#1c1a19] border-b border-[#f4f0ea] pb-2">
                  📖 Sample Read / የመጽሐፍ ቅምሻ 
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-[#4c4a49] font-sans">
                  {featuredBook.excerptAm && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">Amharic Sample</p>
                      <p className="whitespace-pre-line bg-[#faf8f5] p-4 rounded-xl border border-[#f4f0ea] italic">{featuredBook.excerptAm}</p>
                    </div>
                  )}
                  {featuredBook.excerptEn && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">English Sample</p>
                      <p className="whitespace-pre-line bg-[#faf8f5] p-4 rounded-xl border border-[#f4f0ea] italic">{featuredBook.excerptEn}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-[#e6dfd3] rounded-3xl text-sm text-[#7c756e] font-mono">
            No books available in the library database yet.
          </div>
        )}

        {/* --- BOOK COLLECTION GRID --- */}
        <section className="space-y-6">
          <div className="border-b border-[#e6dfd3] pb-3">
            <h3 className="text-lg font-serif font-medium text-[#1c1a19]">More Publications & Works</h3>
            <p className="text-xs text-[#7c756e] mt-0.5">ተጨማሪ ጠቃሚ የዕውቀት ማህደሮች</p>
          </div>

          {regularBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regularBooks.map(book => (
                <div 
                  key={book.id} 
                  className="bg-white border border-[#e6dfd3] p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#7c756e] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      {book.coverImage && (
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-14 h-20 object-cover rounded-md shadow-xs border border-[#e6dfd3]"
                        />
                      )}
                      <div>
                        <h4 className="font-serif font-medium text-base text-[#1c1a19]">{book.amharicTitle || book.title}</h4>
                        {book.title && <p className="text-[11px] font-mono text-[#7c756e]">{book.title}</p>}
                        <p className="text-[11px] text-stone-500 font-sans mt-0.5">By {book.author}</p>
                      </div>
                    </div>
                    
                    {book.amharicDescription && (
                      <p className="text-xs text-[#4c4a49] leading-relaxed pt-1 font-sans border-t border-[#faf8f5]">
                        {book.amharicDescription}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-[10px] font-mono text-[#9c938a] pt-2 border-t border-[#faf8f5] flex justify-between items-center">
                    <span>Year: {book.year || '2026'}</span>
                    {book.pdfUrl ? (
                      <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                        Get Free PDF →
                      </a>
                    ) : (
                      <span>Order: @{book.telegram || 'hhuneyn'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-left py-4 text-xs text-[#7c756e] font-mono italic">
              Check back soon for more literary uploads.
            </div>
          )}
        </section>

      </div>
    </main>
  );
}