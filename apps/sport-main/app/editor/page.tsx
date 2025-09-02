import { BlogNavbar } from "@/components/tiptap-editor"
import TiptapEditor from "@/components/tiptap-editor"
import AuthWrapper from "@/components/auth_wrapper"
export default function EditorPage() {
  return (
    <AuthWrapper>
    <div className=" bg-[#006d77] min-h-screen font-main">
      <BlogNavbar textClass="text-[#006d77]"/>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center">
          <TiptapEditor />
        </div>
      </div>
    </div>
    </AuthWrapper>
  )
}
