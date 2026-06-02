import dbConnect from '@/lib/db/mongodb';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/lib/models/User';

export const revalidate = 0; // Dynamic rendering

export default async function ProblemsDirectory() {
  const res = await fetch('http://localhost:5001/api/problems', { cache: 'no-store' });
  const problems = await res.json();
  
  const session = await getServerSession(authOptions);
  let bookmarkedIds = new Set<string>();

  if (session?.user) {
    const user = await User.findById((session.user as any).id).lean();
    if (user && user.bookmarkedProblems) {
      bookmarkedIds = new Set(user.bookmarkedProblems.map((id: any) => id.toString()));
    }
  }

  return (
    <div className="flex-grow p-8 max-w-7xl mx-auto w-full">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 glow-text-cyan">
          PROBLEM DIRECTORY
        </h1>
        <p className="text-gray-400">Select a challenge to prove your worth on the grid.</p>
      </header>

      <div className="glass rounded-xl border border-[var(--color-border-glass)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f172a]/50">
                <th className="p-4 text-gray-400 font-semibold w-16">Status</th>
                <th className="p-4 text-gray-400 font-semibold">Title</th>
                <th className="p-4 text-gray-400 font-semibold">Difficulty</th>
                <th className="p-4 text-gray-400 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.length > 0 ? (
                problems.map((problem: any) => {
                  const isBookmarked = bookmarkedIds.has(problem._id.toString());
                  return (
                    <tr 
                      key={problem._id.toString()} 
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="w-6 h-6 rounded-full border border-gray-600 group-hover:border-[var(--color-neon-cyan)] transition-colors flex items-center justify-center">
                          {/* Checked state will go here later */}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link 
                          href={`/problems/${problem._id}`}
                          className="text-white hover:text-[var(--color-neon-cyan)] hover:glow-text-cyan transition-all font-medium text-lg"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          problem.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' :
                          'bg-red-900/50 text-red-400 border border-red-700'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {/* 
                          Ideally this is a client component to handle toggling bookmarks instantly via API, 
                          but for simplicity in this server component it acts as a visual indicator.
                        */}
                        <button className="text-gray-500 hover:text-[var(--color-neon-purple)] transition-colors p-2">
                          <Star 
                            className={isBookmarked ? "text-[var(--color-neon-purple)] fill-[var(--color-neon-purple)] glow-purple" : ""} 
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No problems available in the grid yet. Admins must initialize challenges.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
