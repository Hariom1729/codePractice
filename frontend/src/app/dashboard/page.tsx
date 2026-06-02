import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import Link from 'next/link';
import { Flame, Star, Zap } from 'lucide-react';
import Button from '@/components/Button';
import Problem from '@/lib/models/Problem';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  await dbConnect();

  const user = await User.findById((session.user as any).id).populate('bookmarkedProblems');
  const bookmarkedProblems = user?.bookmarkedProblems || [];

  // Mock a streak for UI showcase
  const mockActivity = Array.from({ length: 30 }).map((_, i) => ({
    day: i + 1,
    active: Math.random() > 0.5,
  }));

  // Mock daily problem for UI showcase
  const dailyProblem = {
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    id: 'mock-id-123',
  };

  return (
    <div className="flex-grow p-8 max-w-6xl mx-auto w-full">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2 glow-text-purple">
          WELCOME BACK, {(session.user as any)?.name || 'HACKER'}
        </h1>
        <p className="text-gray-400">System status: Online. Ready for uplink.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Daily Problem & Streak */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Daily Problem Card */}
          <section className="glass rounded-xl p-6 border border-[var(--color-neon-cyan)] glow-cyan relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-cyan)] rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="text-[var(--color-neon-cyan)]" />
                  PROBLEM OF THE DAY
                </h2>
                <p className="text-gray-400 mt-1">Complete this to maintain your streak.</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-900/50 text-yellow-500 border border-yellow-700">
                {dailyProblem.difficulty}
              </span>
            </div>
            
            <div className="relative z-10 bg-[#0f172a] rounded-lg p-4 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold text-white">{dailyProblem.title}</h3>
            </div>
            
            <Link href={`/problems/${dailyProblem.id}`} className="relative z-10">
              <Button variant="primary">SOLVE NOW</Button>
            </Link>
          </section>

          {/* Activity Tracker */}
          <section className="glass rounded-xl p-6 border border-[var(--color-border-glass)]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Flame className="text-[var(--color-neon-green)] glow-text-green" />
              ACTIVITY TRACKER (30 DAYS)
            </h2>
            <div className="flex flex-wrap gap-2">
              {mockActivity.map((day, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-6 rounded-sm ${
                    day.active 
                      ? 'bg-[var(--color-neon-green)] shadow-[0_0_8px_rgba(57,255,20,0.6)]' 
                      : 'bg-gray-800'
                  } transition-all hover:scale-110 cursor-default`}
                  title={`Day ${day.day}: ${day.active ? 'Active' : 'Inactive'}`}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Bookmarks */}
        <div className="space-y-8">
          <section className="glass rounded-xl p-6 border border-[var(--color-border-glass)] h-full">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Star className="text-[var(--color-neon-purple)]" />
              BOOKMARKS
            </h2>
            
            {bookmarkedProblems.length > 0 ? (
              <ul className="space-y-4">
                {bookmarkedProblems.map((problem: any) => (
                  <li key={problem._id.toString()} className="bg-[#0f172a] rounded-lg p-4 border border-gray-700 hover:border-[var(--color-neon-purple)] hover:glow-purple transition-all">
                    <Link href={`/problems/${problem._id}`} className="block">
                      <h4 className="font-semibold text-white truncate">{problem.title}</h4>
                      <span className="text-xs text-gray-400 mt-2 block">
                        Difficulty: {problem.difficulty}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <Star className="mx-auto mb-3 opacity-20" size={48} />
                <p>No bookmarked problems yet.</p>
                <Link href="/problems" className="text-[var(--color-neon-cyan)] text-sm hover:underline mt-2 inline-block">
                  Browse directory
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
