'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { ShieldAlert, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    testCases: [{ input: '', expectedOutput: '', isHidden: false }],
    boilerplates: { javascript: '', python: '', cpp: '' }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    
    try {
      const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess('Problem initialized successfully in the grid.');
        setFormData({
          title: '', description: '', difficulty: 'Easy',
          testCases: [{ input: '', expectedOutput: '', isHidden: false }],
          boilerplates: { javascript: '', python: '', cpp: '' }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTestCase = (index: number, field: string, value: any) => {
    const newTestCases = [...formData.testCases];
    (newTestCases[index] as any)[field] = value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({ 
      ...formData, 
      testCases: [...formData.testCases, { input: '', expectedOutput: '', isHidden: false }] 
    });
  };

  const removeTestCase = (index: number) => {
    const newTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: newTestCases });
  };

  return (
    <div className="flex-grow p-8 max-w-5xl mx-auto w-full">
      <header className="mb-10 flex items-center gap-4 border-b border-[var(--color-neon-red)] pb-4">
        <ShieldAlert className="text-[var(--color-neon-red)] glow-red" size={40} />
        <div>
          <h1 className="text-3xl font-bold text-white glow-text-red">ADMIN CONTROL PANEL</h1>
          <p className="text-[var(--color-neon-red)]">Restricted Access. Root privileges active.</p>
        </div>
      </header>

      {success && (
        <div className="bg-green-950/50 border border-[var(--color-neon-green)] text-green-200 px-4 py-3 rounded-md mb-6 glow-green">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass rounded-xl p-8 border border-[var(--color-border-glass)] space-y-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Initialize New Challenge</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Challenge Title</label>
            <input
              required
              type="text"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[var(--color-neon-red)]"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <select
              className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[var(--color-neon-red)]"
              value={formData.difficulty}
              onChange={e => setFormData({...formData, difficulty: e.target.value})}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description (HTML/Markdown supported)</label>
          <textarea
            required
            rows={5}
            className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[var(--color-neon-red)] font-mono text-sm"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4 border-b border-gray-800 pb-2">Language Boilerplates</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">JavaScript</label>
              <textarea
                rows={2}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-4 py-2 text-white font-mono text-sm focus:border-[var(--color-neon-red)]"
                value={formData.boilerplates.javascript}
                onChange={e => setFormData({...formData, boilerplates: {...formData.boilerplates, javascript: e.target.value}})}
              />
            </div>
            {/* Can add python/cpp fields here similarly */}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
            <h3 className="text-lg font-medium text-white">Test Cases</h3>
            <Button type="button" variant="ghost" onClick={addTestCase} className="py-1 flex items-center gap-1 text-sm">
              <Plus size={16} /> Add Case
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.testCases.map((tc, index) => (
              <div key={index} className="flex gap-4 items-start bg-[#0b1120] p-4 rounded-md border border-gray-800">
                <div className="flex-grow space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Input</label>
                    <input type="text" className="w-full bg-[#1e293b] rounded px-2 py-1 text-white text-sm" value={tc.input} onChange={e => updateTestCase(index, 'input', e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Expected Output</label>
                    <input type="text" className="w-full bg-[#1e293b] rounded px-2 py-1 text-white text-sm" value={tc.expectedOutput} onChange={e => updateTestCase(index, 'expectedOutput', e.target.value)} required />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id={`hidden-${index}`} checked={tc.isHidden} onChange={e => updateTestCase(index, 'isHidden', e.target.checked)} />
                    <label htmlFor={`hidden-${index}`} className="text-xs text-gray-400">Hidden Test Case</label>
                  </div>
                </div>
                <button type="button" onClick={() => removeTestCase(index)} className="text-gray-500 hover:text-[var(--color-neon-red)] transition-colors p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-800">
          <Button type="submit" variant="danger" className="px-8 font-bold" disabled={loading}>
            {loading ? 'DEPLOYING...' : 'DEPLOY CHALLENGE'}
          </Button>
        </div>
      </form>
    </div>
  );
}
