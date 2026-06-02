import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      
      <div className="text-center z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white glow-text-cyan">
          MASTER THE <span className="text-[var(--color-neon-cyan)]">GRID</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Level up your coding skills in a cyberpunk-inspired competitive programming environment. 
          Solve problems, track your streak, and dominate the leaderboards.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/problems">
            <Button variant="primary" className="text-lg px-8 py-4 w-full sm:w-auto">
              ENTER DIRECTORY
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
              INITIALIZE UPLINK
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
