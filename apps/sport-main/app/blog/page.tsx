"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, FileText, ChevronLeft, ChevronRight, ArrowUpRight, Trophy, BookOpen, Eye } from "lucide-react"
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
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#001242] w-full shadow-md border-b border-[#0094c6]/30 font-main">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group flex-1 flex justify-start">
            <div className="transition-all duration-300 group-hover:scale-105 text-center">
              <span className="text-[#0094c6] text-3xl font-bold tracking-wide block">[SportsTalk]</span>
              <span className="block text-[#0094c6]/70 text-base font-medium tracking-wider">
                Game Analysis & Insights
              </span>
            </div>
          </Link>
          <div className="flex-1 flex justify-end">
            <Link
              href="/editor"
              className="text-[#0094c6] hover:text-[#005e7c] flex items-center gap-2 px-6 py-3 rounded-lg border border-[#0094c6]/30 transition-all duration-300 text-lg"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Editor</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="w-full flex flex-col items-center justify-center mt-16 font-main">
      <div className="flex items-center justify-center gap-6 w-full max-w-2xl">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#040f16] text-white text-lg hover:bg-[#005e7c] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        <div className="flex items-center justify-center gap-3 flex-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-12 h-12 rounded-lg font-bold text-lg transition-all duration-300 border flex items-center justify-center
                ${
                  currentPage === page
                    ? "bg-[#0094c6] text-white border-[#0094c6]"
                    : "bg-[#040f16] text-white border-[#005e7c]/40 hover:bg-[#005e7c]"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#040f16] text-white text-lg hover:bg-[#005e7c] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
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
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      document.getElementById("posts-section")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-[#001242] min-h-screen font-main text-white overflow-x-hidden">
      <BlogNavbar />

      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          {/* Hero Header */}
          <header className="pt-20 pb-14 w-full flex flex-col items-center text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#0094c6] mb-6 tracking-tight">Sports Central</h1>
            <div className="w-24 h-1 bg-[#0094c6]/60 mb-10 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-8xl leading-relaxed font-light text-center">
              Dive deep into the world of sports with expert analysis, game breakdowns, and insights that go beyond the
              scoreboard. From tactical masterclasses to player spotlights, discover the stories that make sports truly
              captivating.
            </p>

            {posts.length > 0 && (
              <div className="flex flex-col items-center gap-8 mt-8">
                <div className="flex flex-wrap items-center justify-center gap-8 text-[#0094c6]/70 text-lg font-medium bg-[#040f16]/50 rounded-2xl px-8 py-4 border border-[#005e7c]/30">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold">{posts.length} Articles</span>
                  </div>
                  <span className="text-[#0094c6]/40">•</span>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{totalPages} Pages</span>
                  </div>
                </div>
              </div>
            )}
          </header>

          <div className="my-12" />

          {/* Loading State */}
          {loading ? (
            <div id="posts-section" className="w-full flex justify-center items-center py-32">
              <div className="text-center bg-[#040f16] rounded-2xl p-14 shadow-md border border-[#005e7c]/40 w-full max-w-md">
                <div className="flex justify-center mb-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#005e7c]/40 border-t-[#0094c6]"></div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Loading Game Analysis</h3>
                <p className="text-gray-400 text-lg">Fetching the latest sports insights for you...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            /* Empty State */
            <div id="posts-section" className="w-full flex justify-center items-center py-32">
              <div className="bg-[#040f16] rounded-2xl p-16 w-full max-w-xl text-center shadow-md border border-[#005e7c]/40">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-[#005e7c]/30 rounded-full flex items-center justify-center border border-[#005e7c]/40">
                    <Trophy className="w-10 h-10 text-gray-300" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">No Game Reports Yet</h2>
                <p className="text-gray-400 text-lg mb-6 font-light">
                  The field is ready, the whistle awaits, and the first match report is yet to be written. Every
                  legendary sports story begins with kickoff.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/editor"
                    className="inline-block bg-[#0094c6] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#005e7c] transition text-lg"
                  >
                    Write First Analysis
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Posts List */
            <div id="posts-section" className="py-12 w-full">
              <div className="w-full flex flex-col items-center gap-12">
                {currentPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="relative group w-full max-w-5xl bg-[#040f16] rounded-2xl p-10 shadow-md border border-[#005e7c]/40 hover:border-[#0094c6] transition-all duration-300"
                  >
                    {/* Meta info */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-300 text-base mb-6 font-medium">
                      <div className="flex items-center gap-2 bg-[#005e7c]/20 px-4 py-2 rounded-md">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="hidden sm:block w-2 h-2 bg-[#0094c6]/30 rounded-full"></div>
                      <div className="flex items-center gap-2 bg-[#005e7c]/20 px-4 py-2 rounded-md">
                        <Clock className="w-5 h-5" />
                        <span>{getReadingTime(post.content)} min read</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                      <h2 className="text-4xl md:text-4xl font-bold text-[#0094c6] group-hover:text-[#005e7c] transition-colors">
                        {post.title}
                      </h2>
                    </div>

                    {/* Excerpt */}
                    <div className="text-center mb-8">
                      <p className="text-gray-200 leading-relaxed text-lg font-light max-w-2xl mx-auto">
                        {getExcerpt(post.content, 320)}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-3 text-lg font-semibold text-white bg-[#0094c6] hover:bg-[#005e7c] px-8 py-4 rounded-lg transition group/btn"
                      >
                        <span>Read Full Analysis</span>
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Decorative lines */}
                    {index % 3 === 1 && (
                      <div className="absolute -left-2 top-1/2 w-1 h-16 bg-gradient-to-b from-[#0094c6] to-[#005e7c] rounded-full transform -translate-y-1/2 opacity-30"></div>
                    )}
                    {index % 3 === 2 && (
                      <div className="absolute -right-2 top-1/2 w-1 h-16 bg-gradient-to-b from-[#005e7c] to-[#0094c6] rounded-full transform -translate-y-1/2 opacity-30"></div>
                    )}
                  </article>
                ))}

                <div className="mt-8" />
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </div>
          )}
        </div>

        <div className="mb-12" />
      </main>
    </div>
  )
}
