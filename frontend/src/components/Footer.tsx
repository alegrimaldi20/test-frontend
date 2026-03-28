import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5B21B6] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm tracking-wide">❖ lite-tech</span>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-[#D4E157] transition-colors">Home</Link>
          <Link href="/" className="hover:text-[#D4E157] transition-colors">Topics</Link>
          <Link href="/" className="hover:text-[#D4E157] transition-colors">About</Link>
        </div>
        <p className="text-xs text-white/60">© Copyright lite-tech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
