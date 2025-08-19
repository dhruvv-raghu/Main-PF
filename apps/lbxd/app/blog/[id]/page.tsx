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

// --- NAVBAR ---
function BlogPostNavbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#022f40] w-full shadow-md border-b border-[#046e8f]/30 font-main">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group flex-1 flex justify-start">
            <div className="transition-all duration-300 group-hover:scale-105 text-center">
              <span className="text-[#38aecc] text-3xl font-bold tracking-wide block">
                [Watchr]
              </span>
              <span className="block text-[#38aecc]/70 text-base font-medium tracking-wider">
                A Dhruvv Raghu Project
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog">
              <button className="text-[#38aecc] hover:text-[#0090c1] flex items-center gap-2 px-4 py-3 rounded-lg border border-[#38aecc]/30 transition-all duration-300 text-lg">
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </button>
            </Link>
            <Link href="/editor">
              <button className="text-[#38aecc] hover:text-[#0090c1] flex items-center gap-2 px-4 py-3 rounded-lg border border-[#38aecc]/30 transition-all duration-300 text-lg">
                <FileText className="w-5 h-5" />
                Editor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// --- PAGE ---
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
      if (node.type === "text") text += node.text + " "
      else text += getTextFromJSON(node)
    }
    return text
  }

  const getReadingTime = (content?: JSONContent) => {
    if (!content) return "0 min read"
    const text = getTextFromJSON(content)
    const wordCount = text.split(/\s+/).filter(Boolean).length
    return `${Math.ceil(wordCount / 200)} min read`
  }

  // --- LOADING ---
  if (loading) {
    return (
      <div className="bg-[#022f40] min-h-screen font-main text-white flex flex-col">
        <BlogPostNavbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center bg-[#183446] rounded-2xl p-16 shadow-md border border-[#046e8f]/40 max-w-md mx-6">
            <div className="flex justify-center mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#046e8f]/40 border-t-[#38aecc]"></div>
            </div>
            <h3 className="text-white text-2xl font-bold mb-2">Loading Story</h3>
            <p className="text-gray-400 text-lg">Preparing the perfect reading experience...</p>
          </div>
        </main>
      </div>
    )
  }

  // --- ERROR ---
  if (error || !post) {
    return (
      <div className="bg-[#022f40] min-h-screen font-main text-white flex flex-col">
        <BlogPostNavbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center bg-[#183446] rounded-2xl p-16 max-w-2xl mx-6 shadow-md border border-[#046e8f]/40">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#046e8f]/30 rounded-full flex items-center justify-center border border-[#046e8f]/40">
                <FileText className="w-10 h-10 text-gray-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-[#38aecc]">Story Not Found</h1>
            <p className="text-gray-200 text-lg mb-12 leading-relaxed font-light">
              The story you're looking for seems to have wandered off into the cinematic void.  
              Perhaps it's waiting to be written, or maybe it's found a new home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog">
                <button className="bg-[#0090c1] hover:bg-[#046e8f] text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-3 shadow-md">
                  <ArrowLeft className="w-5 h-5" />
                  Return to Blog
                </button>
              </Link>
              <Link href="/">
                <button className="bg-[#183446] hover:bg-[#046e8f] text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-3 border border-[#046e8f]/40 shadow-md">
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

  // --- MAIN POST ---
  return (
    <div className="bg-[#022f40] min-h-screen font-main text-white flex flex-col">
      <BlogPostNavbar />

      <main className="flex-1 flex justify-center py-20 px-4">
        <div className="w-full max-w-4xl text-center">
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-[#38aecc] mb-10 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-2 bg-[#046e8f]/20 px-4 py-2 rounded-md">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-medium">{formatDate(post.createdAt)}</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-[#38aecc]/30 rounded-full"></div>
              <div className="flex items-center gap-2 bg-[#046e8f]/20 px-4 py-2 rounded-md">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-medium">{getReadingTime(post.content)}</span>
              </div>
            </div>
          </header>

          {/* Divider */}
          <div className="flex justify-center mb-16">
            <div className="w-24 h-1 bg-[#38aecc]/60 rounded-full"></div>
          </div>

          {/* Content */}
          <article className="text-left">
            <div className="bg-[#183446]/40 rounded-2xl p-8 md:p-12 border border-[#046e8f]/20 text-white leading-relaxed">
              <JsonContent content={post.content} />
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-20 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-1 bg-[#38aecc]/40 rounded-full"></div>
            </div>
            <Link href="/blog">
              <button className="bg-[#0090c1] hover:bg-[#046e8f] text-white px-10 py-4 rounded-lg font-semibold transition-all flex items-center gap-3 mx-auto shadow-md">
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
