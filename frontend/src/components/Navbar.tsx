import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  onNewPost?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewPost }) => {
  return (
    <nav className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-black">
      <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-wide text-white hover:opacity-80 transition-opacity">
        <span className="text-[#D4E157] text-xl">✳</span>
        lite-tech
      </Link>
      <button
        onClick={onNewPost}
        className="text-sm font-medium text-white hover:text-[#D4E157] transition-colors flex items-center gap-2 group"
      >
        New post
        <span className="text-[#D4E157] group-hover:translate-x-1 transition-transform inline-block">→</span>
      </button>
    </nav>
  );
};

export default Navbar;
