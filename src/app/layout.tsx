'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Unified navigation structure - Add or remove here anytime, layout updates automatically!
  const NAV_ITEMS = [
    { label: 'Reflections', route: '/reflections' },
    { label: 'Library', route: '/library' },
    { label: 'Academy', route: '/courses' },
    { label: 'Podcast', route: '/podcast' }
  ];

  const handleNavClick = (route: string) => {
    if (pathname === route) {
      window.location.href = route;
    } else {
      router.push(route);
    }
  };

  return (
    <html lang="en">
      <body className="bg-[#faf8f5] text-[#2c2a29] min-h-screen flex flex-col">
        
        {/* --- GLOBAL UNIFIED RESPONSIVE NAVBAR --- */}
        <nav className="fixed top-0 left-0 right-0 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e6dfd3] z-50 px-4 md:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:h-16 gap-3 sm:gap-0">
            
            {/* Logo Center-Left Alignment */}
            <div className="flex items-center justify-between sm:block">
              <Link href="/" className="font-serif font-semibold tracking-widest text-lg text-[#1c1a19] hover:opacity-80 transition-opacity">
                HUNEYN
              </Link>
              {/* Optional tiny indicator tag for mobile users */}
              <span className="sm:hidden text-[9px] font-mono tracking-wider text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded-sm uppercase font-bold">Menu</span>
            </div>

            {/* Smart Links Container - Switches layout perfectly based on phone vs web */}
            <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`text-[11px] md:text-xs uppercase tracking-widest font-bold transition-all py-1.5 sm:py-1 bg-transparent border-0 outline-none cursor-pointer shrink-0 whitespace-nowrap
                      ${isActive 
                        ? 'text-[#1c1a19] border-b-2 border-[#1c1a19]' 
                        : 'text-[#7c756e] hover:text-[#1c1a19]'}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

          </div>
        </nav>

        {/* --- APPLICATION MAIN CONTENT FRAME --- */}
        {/* pt-28 ensures safe content spacing on mobile stacked menus, safely dropping to pt-16 on standard viewports */}
        <div className="pt-28 sm:pt-16 flex-grow">
          {children}
        </div>

      </body>
    </html>
  );
}