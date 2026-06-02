'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Terminal, LogOut, User as UserIcon } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <Terminal className="text-[var(--color-neon-cyan)] group-hover:glow-cyan transition-all" size={28} />
        <span className="text-xl font-bold tracking-wider text-white group-hover:glow-text-cyan transition-all">
          NEON<span className="text-[var(--color-neon-cyan)]">CODE</span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/problems" className="text-gray-300 hover:text-white hover:glow-text-cyan transition-all">
          Problems
        </Link>
        
        {session ? (
          <>
            <Link href="/dashboard" className="text-gray-300 hover:text-white hover:glow-text-purple transition-all">
              Dashboard
            </Link>
            {(session.user as any)?.role === 'admin' && (
              <Link href="/admin" className="text-gray-300 hover:text-[var(--color-neon-red)] hover:glow-text-red transition-all">
                Admin
              </Link>
            )}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[var(--color-border-glass)]">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <UserIcon size={16} />
                {session.user?.name || session.user?.email}
              </span>
              <button 
                onClick={() => signOut()}
                className="text-gray-400 hover:text-[var(--color-neon-red)] hover:glow-text-red transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[var(--color-border-glass)]">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
