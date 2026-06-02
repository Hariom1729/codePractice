'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { Terminal } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      const from = searchParams.get('from');
      router.push(from || '/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="glass w-full max-w-md p-8 rounded-xl border border-[var(--color-border-glass)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-neon-cyan)] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--color-neon-purple)] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="flex justify-center mb-6">
          <Terminal className="text-[var(--color-neon-cyan)] glow-cyan" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2 glow-text-cyan">
          LOGIN
        </h2>
        <p className="text-center text-gray-400 mb-8">Access the Grid</p>

        {error && (
          <div className="bg-red-950/50 border border-[var(--color-neon-red)] text-red-200 px-4 py-3 rounded-md mb-6 text-sm glow-red">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-neon-cyan)] focus:ring-1 focus:ring-[var(--color-neon-cyan)] transition-all"
              placeholder="hacker@neoncode.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3 mt-4" 
            disabled={loading}
          >
            {loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an access code?{' '}
          <Link href="/register" className="text-[var(--color-neon-cyan)] hover:glow-text-cyan transition-all">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
