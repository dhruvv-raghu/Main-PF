"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, FileText, ArrowLeft, Home } from "lucide-react"
import JsonContent from "@/components/json-content"

// --- TYPE DEFINITIONS ---
interface JSONContent {
  type: string
  content?: JSONContent[]
  text?: string
  marks?: TiptapMark[]
  attrs?: Record<string, any>
}

interface TiptapMark {
  type: string
  attrs?: Record<string, any>
}

interface BlogPost {
  id: string
  title: string
  content: JSONContent
  createdAt: string
  updatedAt: string
}

function BlogPostNavbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-black w-full shadow-2xl">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <span className="text-yellow-300 text-2xl font-bold tracking-wider">[Watchr]</span>
              <span className="block text-yellow-300 text-sm font-semibold tracking-wider opacity-80">
                A Dhruvv Raghu Project
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog">
              <button className="text-yellow-300 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </button>
            </Link>
            <Link href="/editor">
              <button className="text-yellow-300 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg">
                <FileText className="w-4 h-4" />
                Editor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (params && params.id) {
      const fetchPost = async (postId: string) => {
        try {
          const response = await fetch(`/api/posts/${postId}`)
          if (!response.ok) throw new Error("Post not found")
          const data = await response.json()
          const finalPostData = {
                      ...data,
                      content: typeof data.content === "string" ? JSON.parse(data.content) : data.content,
                    }
          setPost(finalPostData)
        } catch (err) {
          console.error("Failed to fetch post:", err)
          setError(true)
        } finally {
          setLoading(false)
        }
      }
      fetchPost(params.id as string)
    } else {
      setLoading(false)
      setError(true)
    }
  }, [params])

  // Utility functions for formatting post data
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const getTextFromJSON = (json?: JSONContent): string => {
    if (!json?.content) return ""
    let text = ""
    for (const node of json.content) {
      if (node.type === "text") {
        text += node.text + " "
      } else {
        text += getTextFromJSON(node)
      }
    }
    return text
  }

  const getReadingTime = (content?: JSONContent) => {
    console.log("Calculating reading time for content:")
    console.log(content)
    if (!content) return "0 min read"
    const text = getTextFromJSON(content)
    const wordCount = text.split(/\s+/).filter(Boolean).length
    return `${Math.ceil(wordCount / 200)} min read`
  }

  // Loading State
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-yellow-300 via-yellow-300 to-yellow-400 min-h-screen font-main">
        <BlogPostNavbar />
        <main className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-8"></div>
            <p className="text-black text-xl font-medium">Loading your story...</p>
            <p className="text-black/60 text-sm mt-2">Preparing the perfect reading experience</p>
          </div>
        </main>
      </div>
    )
  }

  // Error State
  if (error || !post) {
    return (
      <div className="bg-gradient-to-br from-yellow-300 via-yellow-300 to-yellow-400 min-h-screen font-main">
        <BlogPostNavbar />
        <main className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-16 max-w-2xl mx-6 shadow-2xl border border-white/20">
            <div className="w-20 h-20 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="w-10 h-10 text-black/60" />
            </div>
            <h1 className="text-4xl font-bold mb-6 text-black">Story Not Found</h1>
            <p className="text-black/70 text-lg mb-12 leading-relaxed">
              The story you're looking for seems to have wandered off into the cinematic void. Perhaps it's waiting to
              be written, or maybe it's found a new home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog">
                <button className="bg-black text-yellow-300 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-3 shadow-xl">
                  <ArrowLeft className="w-5 h-5" />
                  Return to Blog
                </button>
              </Link>
              <Link href="/">
                <button className="bg-white/20 backdrop-blur-sm text-black px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-3 border border-white/30 shadow-lg">
                  <Home className="w-5 h-5" />
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Main Content
  return (
    <div className="bg-gradient-to-br from-yellow-300 via-yellow-300 to-yellow-400 min-h-screen font-main">
      <BlogPostNavbar />
      <main className="pt-16 pb-32 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Header Section */}
          <header className="text-center mb-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-12 leading-tight tracking-tight">
                {post.title}
              </h1>
              {/* Metadata */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-black/70">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-black/60" />
                  </div>
                  <span className="text-lg font-medium">{formatDate(post.createdAt)}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-black/30 rounded-full"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-black/60" />
                  </div>
                  <span className="text-lg font-medium">{getReadingTime(post.content)}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex justify-center mb-20">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
          </div>

          {/* Content Rendering - NOW USING JsonContent COMPONENT */}
          <article className="max-w-5xl mx-auto">
            <JsonContent content={post.content} />
          </article>

          {/* Footer */}
          <footer className="mt-24 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
            </div>
            <Link href="/blog">
              <button className="bg-white/10 backdrop-blur-sm text-black px-10 py-4 rounded-2xl font-semibold transition-all flex items-center gap-3 mx-auto border border-white/20">
                <ArrowLeft className="w-5 h-5" />
                Return to All Stories
              </button>
            </Link>
          </footer>
        </div>
      </main>
    </div>
  )
}
