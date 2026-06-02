import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NeonNav } from '@/components/ui/NeonNav';
import { LessonWorkspace } from '@/components/learning/LessonWorkspace';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default async function LessonPage({ params }: { params: Promise<{ topicId: string, lessonId: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const { topicId, lessonId } = await params;
  const title = topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-obsidian)] text-white font-sans selection:bg-[var(--color-accent-indigo)]/30 overflow-hidden">
      
      {/* Top Navigation - Compact Version */}
      <div className="h-16 border-b border-[var(--color-border-glass)] flex items-center justify-between px-6 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <Link href={`/learning/${topicId}`} className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-gray-400">{title}</span>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-white">Lesson {lessonId}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold px-2 py-1 rounded bg-[var(--color-accent-violet)]/20 text-[var(--color-accent-violet)]">
            +50 XP Potential
          </div>
          <NeonNav />
        </div>
      </div>

      {/* Main Workspace Workspace */}
      <main className="flex-grow flex flex-col relative">
        <LessonWorkspace topicId={topicId} lessonId={lessonId} />
      </main>
    </div>
  );
}
