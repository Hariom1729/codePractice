import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTopicContent } from '@/resources/content/index';
import { LessonReader } from '@/resources/components/LessonReader';
import { NeonNav } from '@/components/ui/NeonNav';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default async function LessonPage({ params }: { params: Promise<{ topicId: string, lessonId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const { topicId, lessonId } = await params;
  const topicContent = getTopicContent(topicId);
  const title = topicContent?.title ?? topicId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // If no content exists yet, show a coming soon state
  if (!topicContent) {
    return (
      <div className="flex flex-col h-screen bg-[var(--color-bg-obsidian)] text-white font-sans items-center justify-center gap-6">
        <div className="text-6xl">🚧</div>
        <h1 className="text-3xl font-bold">{title} — Coming Soon</h1>
        <p className="text-gray-400 max-w-md text-center">
          This course is being built right now. The Arrays module is live — check it out first!
        </p>
        <Link href="/learning/arrays/lesson/1" className="px-6 py-3 bg-[var(--color-accent-violet)] rounded-xl font-semibold hover:opacity-90 transition-opacity">
          Go to Arrays Course →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-obsidian)] text-white font-sans overflow-hidden">

      {/* Compact top bar */}
      <header className="h-14 flex-shrink-0 border-b border-[var(--color-border-glass)] flex items-center justify-between px-6 bg-[var(--color-surface-obsidian)]/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <Link href={`/learning/${topicId}`} className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BookOpen size={14} className="text-[var(--color-accent-violet)]" />
            <Link href="/learning" className="text-gray-500 hover:text-gray-300 transition-colors">Library</Link>
            <ChevronRight size={12} className="text-gray-700" />
            <Link href={`/learning/${topicId}`} className="text-gray-400 hover:text-gray-200 transition-colors">{title}</Link>
            <ChevronRight size={12} className="text-gray-700" />
            <span className="text-white">Full Course</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--color-accent-violet)]/15 text-[var(--color-accent-violet)] border border-[var(--color-accent-violet)]/20">
            <span>⚡</span>
            <span>{topicContent.totalTime} Course</span>
          </div>
          <div className="hidden md:block">
            <NeonNav />
          </div>
        </div>
      </header>

      {/* Main Reader — fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <LessonReader topicId={topicId} topicContent={topicContent} />
      </div>

    </div>
  );
}
