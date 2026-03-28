import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

const STATIC_ARTICLE_CONTENT = `# Curabitur sit amet sapien at velit fringilla tincidunt porttitor eget lacus. Sed mauris libero, malesuada et venenatis vitae, porta ac enim. Curabitur sit amet sapien at velit fringilla tincidunt porttitor eget lacus. Sed mauris libero, malesuada et venenatis vitae, porta ac enim. Aliquam erat volutpat. Cras tristique eleifend dolor, et ultricies nisl feugiat sed. Pellentesque blandit orci eu velit vehicula commodo. Phasellus imperdiet finibus ex eget gravida. Maecenas vitae molestie dolor. Nulla hendrerit ipsum leo, in tempor urna interdum ut. Sed molestie sodales quam. Mauris sollicitudin metus at eros imperdiet, vitae pulvinar nunc condimentum. Pellentesque rhoncus, lacus sit amet mollis placerat, nulla lectus maximus justo, quis gravida elit augue id.

![imagen blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image.png)

# Pellentesque venenatis arcu lectu Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla. Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit, elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.

![imagen blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image2.png)

> Commodo eget mi. In orci nunc, laoreet eleifend sem vel, suscipitlon lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem in nunc porttitor dapibus a sollicitudin nunc. Sed lacinia nisl a magna congue, maximus tristique tellus finibus.

# Nullam tristique tellus purus Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla. Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit, elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.`;

interface Post {
  id: number;
  title: string;
  subtitle: string;
  topic: string;
  author: string;
  readTime: number;
  body: string;
  image: string;
}

interface RelatedPost {
  id: number;
  title: string;
  image: string;
}

interface ArticleProps {
  post: Post | null;
  relatedPosts: RelatedPost[];
  mostViewed: Post[];
}

const ArticleDetail: React.FC<ArticleProps> = ({ post, relatedPosts, mostViewed }) => {
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Article not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 p-6 max-w-2xl">
          <span className="inline-block bg-[#D4E157] text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {post.topic}
          </span>
          <p className="text-white/70 text-xs mb-2">By {post.author}</p>
          <h1 className="text-white font-bold text-2xl sm:text-3xl leading-tight">
            {post.title}
          </h1>
          <p className="text-white/60 text-sm mt-1">{post.readTime} mins read</p>
        </div>
      </div>

      {/* Body */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="flex gap-8">

          {/* Share icons */}
          <aside className="hidden lg:flex flex-col items-center gap-3 pt-1">
            <span className="text-xs text-gray-400 font-medium">Share on:</span>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="text-black hover:text-[#D4E157]">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="text-black hover:text-[#D4E157]">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" aria-label="Twitter" className="text-black hover:text-[#D4E157]">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </a>
          </aside>

          {/* Article content */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_blockquote]:border-l-4 [&_blockquote]:border-[#D4E157] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_img]:w-full [&_img]:rounded [&_img]:my-4">
              <ReactMarkdown>{STATIC_ARTICLE_CONTENT}</ReactMarkdown>
            </div>
          </article>

          {/* Most viewed sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <h2 className="text-sm font-bold text-gray-500 mb-4">Most viewed</h2>
            <div className="flex flex-col gap-4">
              {mostViewed.map((p) => (
                <Link key={p.id} href={`/article/${p.id}`} className="flex gap-3 group">
                  <div className="w-16 h-14 flex-shrink-0 rounded overflow-hidden">
                    <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-[#D4E157] text-black text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1">
                      {p.topic}
                    </span>
                    <p className="text-xs font-semibold text-black leading-snug line-clamp-2 group-hover:underline">
                      {p.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-black">Read →</span>
                      <span className="text-xs text-gray-400">{p.readTime} mins</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* Most viewed — mobile only */}
        {mostViewed.length > 0 && (
          <section className="lg:hidden mt-8 border-t border-gray-100 pt-6">
            <h2 className="text-sm font-bold text-gray-500 mb-4">Most viewed</h2>
            <div className="grid grid-cols-2 gap-3">
              {mostViewed.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/article/${p.id}`} className="flex gap-2 group">
                  <div className="w-14 h-12 flex-shrink-0 rounded overflow-hidden">
                    <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-[#D4E157] text-black text-[9px] font-semibold px-2 py-0.5 rounded-full mb-0.5">
                      {p.topic}
                    </span>
                    <p className="text-xs font-semibold text-black leading-snug line-clamp-2 group-hover:underline">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-black">Related posts</h2>
              <Link href="/" className="text-sm font-medium text-black hover:underline">
                New post →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((p) => (
                <Card
                  key={p.id}
                  title={p.title}
                  image={p.image}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

    const [postRes, allRes, relatedRes] = await Promise.all([
      fetch(`https://lite-tech-api.litebox.ai/api/posts/${id}?populate=coverImg`),
      fetch('https://lite-tech-api.litebox.ai/api/posts?populate=coverImg'),
      fetch(`${backendUrl}/api/posts/related`).catch(() => null),
    ]);

    const postJson = await postRes.json();
    const allJson = await allRes.json();
    const relatedJson = (relatedRes && relatedRes.ok) ? await relatedRes.json() : [];

    const mapPost = (item: any): Post => ({
      id: item.id,
      title: item.attributes.title,
      subtitle: item.attributes.subtitle ?? '',
      topic: item.attributes.topic ?? 'General',
      author: item.attributes.author ?? 'Unknown',
      readTime: item.attributes.readTime ?? 5,
      body: item.attributes.body ?? '',
      image: item.attributes.coverImg?.data?.attributes?.url
        ? `https://lite-tech-api.litebox.ai${item.attributes.coverImg.data.attributes.url}`
        : 'https://via.placeholder.com/800x400',
    });

    const post = postJson.data ? mapPost(postJson.data) : null;
    const allPosts: Post[] = allJson.data?.map(mapPost) ?? [];
    const others = allPosts.filter((p) => p.id !== Number(id));
    const mostViewed = others.slice(0, 4);

    const relatedPosts: RelatedPost[] = (Array.isArray(relatedJson) ? relatedJson : [])
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        image: `${backendUrl}${item.imageUrl}`,
      }));

    return { props: { post, relatedPosts, mostViewed } };
  } catch {
    return { props: { post: null, relatedPosts: [], mostViewed: [] } };
  }
};

export default ArticleDetail;
