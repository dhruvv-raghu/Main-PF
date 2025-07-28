import Tiptap, { BlogNavbar } from '@/components/Tiptap';

export default function Page() {
  return (
    // Use a main container for the whole page
    <div className="bg-yellow-300">
      <BlogNavbar />

      <main className="min-h-screen flex flex-col items-center pt-28 pb-12 px-4">
        <h1 className="font-bold text-5xl text-center mb-8">The Editor!</h1>

        <Tiptap />
      </main>
    </div>
  );
}
