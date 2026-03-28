import React, { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import NewPostModal from '../components/NewPostModal';

interface Post {
  id: number;
  title: string;
  image: string;
  topic: string;
  readTime: number;
}

const TOPICS = ['All', 'Diversity & Inclusion', 'Tech companies', 'Tech innovation', 'Security', 'Crypto', 'Global', 'Leaks'];

const Home: React.FC<{ initialPosts: Post[] }> = ({ initialPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts] = useState<Post[]>(initialPosts);
  const [activeTopic, setActiveTopic] = useState('All');
  const [visibleCount] = useState(8);

  const filtered = activeTopic === 'All' ? posts : posts.filter((p) => p.topic === activeTopic);
  const hero = filtered[0];
  const mostViewed = filtered.slice(1, 5);
  const gridPosts = filtered.slice(1, 1 + visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar onNewPost={() => setIsModalOpen(true)} />

      {/* Hero — full width, outside max-w container */}
      {hero && (
        <Link href={`/article/${hero.id}`} className="block group relative w-full h-[420px] sm:h-[500px] overflow-hidden">
          <img src={hero.image} alt={hero.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full max-w-4xl px-6 sm:px-10 pb-8">
            <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-widest">Today story</p>
            <span className="inline-block bg-[#D4E157] text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {hero.topic}
            </span>
            <h1 className="text-white font-bold text-3xl sm:text-4xl leading-tight max-w-2xl mb-4">
              {hero.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-medium group-hover:underline">Read →</span>
              <span className="text-white/50 text-xs">{hero.readTime} mins</span>
            </div>
          </div>
        </Link>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">

        {/* Topics filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <span className="text-sm font-medium text-white/50 whitespace-nowrap">Topics:</span>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm border transition-colors ${
                activeTopic === topic
                  ? 'bg-[#D4E157] border-[#D4E157] text-black font-semibold'
                  : 'border-white/30 text-white hover:border-white'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Main content: large card | 2 stacked cards | most viewed */}
        {filtered.length > 1 && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">

            {/* Col 1: Large card */}
            {filtered[1] && (
              <div className="lg:w-[38%]">
                <Card
                  id={filtered[1].id}
                  title={filtered[1].title}
                  image={filtered[1].image}
                  topic={filtered[1].topic}
                  readTime={filtered[1].readTime}
                  imageHeight="h-64 lg:h-80"
                />
              </div>
            )}

            {/* Col 2: Two stacked cards */}
            <div className="lg:w-[38%] flex flex-col gap-4">
              {filtered[2] && (
                <Card
                  id={filtered[2].id}
                  title={filtered[2].title}
                  image={filtered[2].image}
                  topic={filtered[2].topic}
                  readTime={filtered[2].readTime}
                  imageHeight="h-44"
                />
              )}
              {filtered[3] && (
                <Card
                  id={filtered[3].id}
                  title={filtered[3].title}
                  image={filtered[3].image}
                  topic={filtered[3].topic}
                  readTime={filtered[3].readTime}
                  imageHeight="h-44"
                />
              )}
            </div>

            {/* Col 3: Most viewed sidebar */}
            <div className="lg:w-[24%] flex-shrink-0 hidden lg:block">
              <h2 className="text-sm font-bold text-white mb-3">Most viewed</h2>
              <div className="flex flex-col gap-4">
                {mostViewed.map((post) => (
                  <Link key={post.id} href={`/article/${post.id}`} className="flex items-start justify-between gap-2 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white leading-snug line-clamp-3 group-hover:underline mb-1">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/70">Read →</span>
                        <span className="text-xs text-white/40">{post.readTime} mins</span>
                      </div>
                    </div>
                    <div className="w-16 h-14 flex-shrink-0 overflow-hidden rounded">
                      <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Card grid — remaining posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {gridPosts.slice(3).map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              topic={post.topic}
              readTime={post.readTime}
            />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-white/5 border border-white/10 rounded px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <p className="text-sm text-white">
            Sign up for our newsletter <span className="font-semibold text-[#D4E157]">and get daily updates</span>
          </p>
          <button className="px-5 py-2 bg-[#D4E157] text-black text-sm font-semibold rounded hover:bg-[#c8d94f] transition-colors">
            Subscribe
          </button>
        </div>

      </main>

      <Footer />

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch('https://lite-tech-api.litebox.ai/api/posts');
    const json = await response.json();

    const initialPosts = json.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      topic: item.attributes.topic ?? 'General',
      readTime: item.attributes.readTime ?? 5,
      image: item.attributes.coverImg?.data?.attributes?.url
        ? `https://lite-tech-api.litebox.ai${item.attributes.coverImg.data.attributes.url}`
        : 'https://via.placeholder.com/600x400',
    }));

    return { props: { initialPosts } };
  } catch {
    return { props: { initialPosts: [] } };
  }
};

export default Home;
