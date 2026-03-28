import React from 'react';
import Link from 'next/link';

interface CardProps {
  id?: number;
  title: string;
  image: string;
  topic?: string;
  readTime?: number;
  imageHeight?: string;
}

const Card: React.FC<CardProps> = ({ id, title, image, topic, readTime, imageHeight = 'h-48' }) => {
  const Wrapper = id
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={`/article/${id}`} className="block group h-full">{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="block group h-full">{children}</div>
      );

  return (
    <Wrapper>
      <div className="flex flex-col h-full bg-white overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
        {/* Image with badge overlay */}
        <div className={`relative w-full ${imageHeight} overflow-hidden flex-shrink-0`}>
          <img src={image} alt={title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
          {topic && (
            <span className="absolute bottom-3 left-3 inline-block bg-[#D4E157] text-black text-xs font-semibold px-3 py-1 rounded-full">
              {topic}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-bold text-black leading-snug mb-auto">
            {title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-sm font-medium text-black group-hover:underline">
              Read <span>→</span>
            </span>
            {readTime && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {readTime} mins
              </span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
