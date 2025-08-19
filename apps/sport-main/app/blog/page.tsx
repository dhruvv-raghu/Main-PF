"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Trophy,
  BookOpen,
  Eye,
} from "lucide-react"
import type { JSONContent } from "@tiptap/react"

interface BlogPost {
  id: string
  title: string
  content: JSONContent
  createdAt: string
  updatedAt: string
}

const getTextFromJSON = (json?: JSONContent): string => {
  if (!json?.content) return ""
  let text = ""
  for (const node of json.content) {
    if ((node as any).type === "text") {
      text += (node as any).text ?? ""
    } else {
      text += getTextFromJSON(node as unknown as JSONContent)
    }
    text += " "
  }
  return text
}

function BlogNavbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#0d1b2a]/95 backdrop-blur-md w-full shadow-2xl border-b border-[#415a77]/20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <div className="transition-all duration-300 group-hover:scale-105">
              <span className="text-[#778da9] text-2xl font-bold tracking-wider drop-shadow-lg">[SportsTalk]</span>
              <span className="block text-[#e0e1dd]/80 text-sm font-semibold tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                Game Analysis & Insights
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/editor">
              <button className="text-[#778da9] hover:text-[#e0e1dd] flex items-center gap-2 transition-all duration-300 px-6 py-3 rounded-xl hover:bg-[#415a77]/10 border border-transparent hover:border-[#415a77]/20 backdrop-blur-sm">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Editor</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const getReadingTime = (content: JSONContent) => {
    const wordsPerMinute = 200
    const textContent = getTextFromJSON(content)
    const wordCount = textContent.split(/\s+/).filter(Boolean).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const getExcerpt = (content: JSONContent, maxLength = 300) => {
    const text = getTextFromJSON(content)
    return text.length <= maxLength ? text : text.substring(0, maxLength).trimEnd() + "..."
  }

  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      document.getElementById("posts-section")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-[#83c5be] min-h-screen font-main overflow-x-hidden">
      <BlogNavbar />

      <main className="w-full min-h-screen">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          {/* Hero */}
          <header className="text-center pt-24 pb-16 relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#0d1b2a]/5 rounded-full blur-3xl" />
            <div className="absolute top-16 right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl" />

            <h1 className="text-6xl md:text-8xl font-bold text-[#0d1b2a] mb-8 tracking-tight drop-shadow-lg leading-none">
              Sports Central
            </h1>
            <div className="w-24 h-1 bg-[#0d1b2a]/20 mx-auto mb-12 rounded-full" />

            <p className="text-xl md:text-2xl text-[#0d1b2a]/90 max-w-4xl leading-relaxed mb-16 font-light px-4 mx-auto">
              Dive deep into the world of sports with expert analysis, game breakdowns, and insights that go beyond the
              scoreboard. From tactical masterclasses to player spotlights, discover the stories that make sports truly
              captivating.
            </p>

            {posts.length > 0 && (
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-wrap items-center justify-center gap-8 text-[#0d1b2a]/70 text-lg font-medium bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold">{posts.length} Articles</span>
                  </div>
                  <span className="text-[#0d1b2a]/40">•</span>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{totalPages} Pages</span>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* States */}
          {loading ? (
            <section id="posts-section" className="flex justify-center items-center py-32">
              <div className="text-center bg-white/15 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/30 max-w-lg w-full">
                <div className="mb-8">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#0d1b2a]/20 border-t-[#0d1b2a] mx-auto" />
                </div>
                <h3 className="text-[#0d1b2a] text-xl font-bold mb-3">Loading Game Analysis</h3>
                <p className="text-[#0d1b2a]/60 text-base">Fetching the latest sports insights for you...</p>
              </div>
            </section>
          ) : posts.length === 0 ? (
            <section id="posts-section" className="flex justify-center items-center py-32">
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-20 max-w-2xl w-full text-center shadow-2xl border border-white/30">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-[#0d1b2a]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#0d1b2a]/10">
                    <Trophy className="w-10 h-10 text-[#0d1b2a]/50" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-[#0d1b2a] mb-6">No Game Reports Yet</h2>
                <p className="text-[#0d1b2a]/70 text-xl mb-4 font-light leading-relaxed">
                  The field is ready, the whistle awaits, and the first match report is yet to be written.
                </p>
                <p className="text-[#0d1b2a]/60 text-lg mb-10 leading-relaxed">
                  Every legendary sports story begins with kickoff. Start your analysis journey today.
                </p>
                <Link href="/editor">
                  <button className="bg-[#0d1b2a] text-[#e0e1dd] px-10 py-5 rounded-2xl font-semibold hover:bg-[#1b263b] transition-all duration-300 transform hover:scale-105 shadow-2xl border border-[#0d1b2a]/20 hover:shadow-[#415a77]/20">
                    Write First Analysis
                  </button>
                </Link>
              </div>
            </section>
          ) : (
            <section id="posts-section" className="py-16">
              <div className="max-w-5xl mx-auto flex flex-col items-center gap-16 w-full">
                {currentPosts.map((post, idx) => (
                  <article
                    key={post.id}
                    className={`group w-full bg-[#0d1b2a]/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-[#0d1b2a]/40 hover:bg-[#0d1b2a]/95 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-[#415a77]/30 ${
                      idx === 0 ? "" : "mt-4"
                    }`}
                  >
                    {/* Meta */}
                    <div className="flex items-center justify-center gap-8 text-[#778da9]/70 text-base mb-10 font-medium">
                      <div className="flex items-center gap-3 bg-[#415a77]/10 px-6 py-3 rounded-xl border border-[#415a77]/20">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-[#415a77]/10 px-6 py-3 rounded-xl border border-[#415a77]/20">
                        <Clock className="w-5 h-5" />
                        <span>{getReadingTime(post.content)} min read</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-10 leading-tight group-hover:text-[#e0e1dd]/90 transition-colors duration-300 text-center px-4">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <div className="prose prose-lg max-w-none mb-12">
                      <p className="text-[#778da9]/80 leading-relaxed text-xl font-light text-center px-4">
                        {getExcerpt(post.content, 320)}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center">
                      <Link href={`/blog/${post.id}`}>
                        <button className="inline-flex items-center gap-4 text-xl font-semibold text-[#e0e1dd] hover:text-[#778da9] transition-all duration-300 bg-[#415a77]/10 hover:bg-[#415a77]/20 px-10 py-5 rounded-2xl border border-[#415a77]/30 hover:border-[#415a77]/50 shadow-xl hover:shadow-2xl group/btn hover:scale-105">
                          <span>Read Full Analysis</span>
                          <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-20 mb-24">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md rounded-xl font-medium text-[#0d1b2a] hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-[#0d1b2a]/15 hover:border-[#0d1b2a]/25 hover:scale-105"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-3 mx-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-14 h-14 rounded-xl font-semibold transition-all duration-300 shadow-xl border ${
                          currentPage === page
                            ? "bg-[#0d1b2a] text-[#e0e1dd] scale-110 shadow-2xl border-[#0d1b2a] hover:shadow-[#415a77]/20"
                            : "bg-white/20 backdrop-blur-md text-[#0d1b2a] hover:bg-white/30 border-[#0d1b2a]/15 hover:border-[#0d1b2a]/25 hover:scale-105"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md rounded-xl font-medium text-[#0d1b2a] hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-[#0d1b2a]/15 hover:border-[#0d1b2a]/25 hover:scale-105"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
