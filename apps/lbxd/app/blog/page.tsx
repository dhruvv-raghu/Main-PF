'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Heart,
  Pen,
  Film,
  BookOpen,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { JSONContent } from '@tiptap/react';

interface BlogPost {
  id: string;
  title: string;
  content: JSONContent;
  createdAt: string;
  updatedAt: string;
}

const getTextFromJSON = (json?: JSONContent): string => {
  if (!json?.content) return '';
  let text = '';
  for (const node of json.content) {
    if (node.type === 'text') {
      text += node.text;
    } else {
      text += getTextFromJSON(node);
    }
    text += ' ';
  }
  return text;
};

function BlogNavbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md w-full shadow-2xl border-b border-yellow-300/20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <div className="transition-all duration-300 group-hover:scale-105">
              <span className="text-yellow-300 text-2xl font-bold tracking-wider drop-shadow-lg">
                [Watchr]
              </span>
              <span className="block text-yellow-300/80 text-sm font-semibold tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                A Dhruvv Raghu Project
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/editor">
              <button className="text-yellow-300 hover:text-yellow-400 flex items-center gap-2 transition-all duration-300 px-6 py-3 rounded-xl hover:bg-yellow-300/10 border border-transparent hover:border-yellow-300/20 backdrop-blur-sm">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Editor</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function BlogSidebar({ posts }: { posts: BlogPost[] }) {
  const totalWords = posts.reduce((total, post) => {
    const textContent = getTextFromJSON(post.content);
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;
    return total + wordCount;
  }, 0);

  const totalReadingMinutes = Math.round(totalWords / 200);

  return (
    <div className="sticky top-32 space-y-16">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-500">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-black/15 rounded-xl border border-black/10">
            <Heart className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-3xl font-bold text-black">Why I Blog</h3>
        </div>

        <div className="space-y-10">
          <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-black/5 transition-colors duration-300">
            <div className="p-3 bg-yellow-400/25 rounded-lg flex-shrink-0 mt-1 border border-yellow-400/20">
              <Film className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4 text-xl">Cinema Passion</h4>
              <p className="text-black/70 text-base leading-relaxed">
                Film is more than entertainment—it's a lens through which we understand humanity,
                culture, and ourselves.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-black/5 transition-colors duration-300">
            <div className="p-3 bg-yellow-400/25 rounded-lg flex-shrink-0 mt-1 border border-yellow-400/20">
              <Pen className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4 text-xl">Storytelling</h4>
              <p className="text-black/70 text-base leading-relaxed">
                Every great film tells a story, and every story deserves thoughtful analysis and
                discussion.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-black/5 transition-colors duration-300">
            <div className="p-3 bg-yellow-400/25 rounded-lg flex-shrink-0 mt-1 border border-yellow-400/20">
              <Heart className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4 text-xl">Community</h4>
              <p className="text-black/70 text-base leading-relaxed">
                Sharing perspectives creates connections and deepens our appreciation for the art of
                cinema.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-black/15">
          <p className="text-black/60 text-sm italic text-center font-medium">
            "Cinema is a matter of what's in the frame and what's out." — Martin Scorsese
          </p>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-500">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-black/15 rounded-xl border border-black/10">
            <TrendingUp className="w-8 h-8 text-black" />
          </div>
          <h4 className="font-bold text-black text-2xl">Blog Statistics</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="text-center p-6 rounded-xl bg-black/5 border border-black/10 hover:bg-black/10 transition-colors duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="w-6 h-6 text-black/60" />
              <div className="text-4xl font-bold text-black">{posts.length}</div>
            </div>
            <div className="text-black/60 text-base font-medium">Total Posts</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-black/5 border border-black/10 hover:bg-black/10 transition-colors duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-black/60" />
              <div className="text-4xl font-bold text-black">{totalWords.toLocaleString()}</div>
            </div>
            <div className="text-black/60 text-base font-medium">Total Words</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-black/5 border border-black/10 hover:bg-black/10 transition-colors duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-black/60" />
              <div className="text-4xl font-bold text-black">{totalReadingMinutes}</div>
            </div>
            <div className="text-black/60 text-base font-medium">Minutes of Reading</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-4 mt-20 mb-24">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md rounded-xl font-medium text-black hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-black/15 hover:border-black/25 hover:scale-105"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      
      <div className="flex items-center gap-3 mx-8">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-14 h-14 rounded-xl font-semibold transition-all duration-300 shadow-xl border ${
              currentPage === page
                ? 'bg-black text-yellow-300 scale-110 shadow-2xl border-black hover:shadow-yellow-300/20'
                : 'bg-white/20 backdrop-blur-md text-black hover:bg-white/30 border-black/15 hover:border-black/25 hover:scale-105'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md rounded-xl font-medium text-black hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-black/15 hover:border-black/25 hover:scale-105"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (content: JSONContent) => {
    const wordsPerMinute = 200;
    const textContent = getTextFromJSON(content);
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const getExcerpt = (content: JSONContent, maxLength = 300) => {
    const text = getTextFromJSON(content);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trimEnd() + '...';
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      const postsSection = document.getElementById('posts-section');
      if (postsSection) {
        postsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-300 via-yellow-300 to-yellow-400 min-h-screen font-main overflow-x-hidden">
      <BlogNavbar />
      
      <main className="w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-16 relative">
            
            <div className="xl:col-span-3">
              
              <header className="text-center pt-24 pb-16">
                <div className="flex flex-col items-center max-w-5xl mx-auto relative">
                  
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-black/5 rounded-full blur-3xl"></div>
                  <div className="absolute top-16 right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 tracking-tight drop-shadow-lg leading-none">
                      The Blog
                    </h1>
                    <div className="w-24 h-1 bg-black/20 mx-auto mb-12 rounded-full"></div>
                    
                    <p className="text-xl md:text-2xl text-black/90 max-w-4xl leading-relaxed mb-16 font-light px-4">
                      Explore what I write about film, storytelling, and the art of cinema. 
                      Dive into thoughtful analysis, personal reflections, and cinematic discoveries 
                      that illuminate the magic of moving pictures.
                    </p>
                    
                    {posts.length > 0 && (
                      <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-wrap items-center justify-center gap-8 text-black/70 text-lg font-medium bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            <span className="font-semibold">{posts.length} Posts</span>
                          </div>
                          <span className="text-black/40">•</span>
                          <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <span>{totalPages} Pages</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {loading ? (
                <div id="posts-section" className="flex justify-center items-center py-32">
                  <div className="text-center bg-white/15 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/30 max-w-lg mx-auto">
                    <div className="relative mb-8">
                      <div className="animate-spin rounded-full h-20 w-20 border-4 border-black/20 border-t-black mx-auto"></div>
                    </div>
                    <h3 className="text-black text-xl font-bold mb-3">Loading Stories</h3>
                    <p className="text-black/60 text-base">
                      Fetching the latest cinematic insights for you...
                    </p>
                  </div>
                </div>
              ) : posts.length === 0 ? (
                <div id="posts-section" className="flex justify-center items-center py-32">
                  <div className="bg-white/15 backdrop-blur-md rounded-3xl p-20 max-w-2xl mx-auto text-center shadow-2xl border border-white/30">
                    <div className="mb-8">
                      <div className="w-20 h-20 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-black/10">
                        <FileText className="w-10 h-10 text-black/50" />
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold text-black mb-6">No Stories Yet</h2>
                    <p className="text-black/70 text-xl mb-4 font-light leading-relaxed">
                      The canvas awaits the first brushstroke, the blank page yearns for the opening line.
                    </p>
                    <p className="text-black/60 text-lg mb-10 leading-relaxed">
                      Every great story begins with a single word. Start your cinematic journey today.
                    </p>
                    <Link href="/editor">
                      <button className="bg-black text-yellow-300 px-10 py-5 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl border border-black/20 hover:shadow-yellow-300/20">
                        Create First Post
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div id="posts-section" className="py-16">
                  <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto">
                    {currentPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group w-full bg-black/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-black/40 hover:bg-black/95 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-yellow-300/30"
                      >
                        <div className="flex items-center justify-center gap-8 text-yellow-300/70 text-base mb-10 font-medium">
                          <div className="flex items-center gap-3 bg-yellow-300/10 px-6 py-3 rounded-xl border border-yellow-300/20">
                            <Calendar className="w-5 h-5" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-3 bg-yellow-300/10 px-6 py-3 rounded-xl border border-yellow-300/20">
                            <Clock className="w-5 h-5" />
                            <span>{getReadingTime(post.content)} min read</span>
                          </div>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-10 leading-tight group-hover:text-yellow-300/90 transition-colors duration-300 text-center px-4">
                          {post.title}
                        </h2>
                        
                        <div className="prose prose-lg max-w-none mb-12">
                          <p className="text-yellow-300/80 leading-relaxed text-xl font-light text-center px-4">
                            {getExcerpt(post.content, 320)}
                          </p>
                        </div>
                        
                        <div className="flex justify-center">
                          <Link href={`/blog/${post.id}`}>
                            <button className="inline-flex items-center gap-4 text-xl font-semibold text-yellow-300 hover:text-yellow-400 transition-all duration-300 bg-yellow-300/10 hover:bg-yellow-300/20 px-10 py-5 rounded-2xl border border-yellow-300/30 hover:border-yellow-300/50 shadow-xl hover:shadow-2xl group/btn hover:scale-105">
                              <span>Read Full Story</span>
                              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </button>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="hidden xl:block xl:col-span-2">
              <div className="pt-24">
                <BlogSidebar posts={posts} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}