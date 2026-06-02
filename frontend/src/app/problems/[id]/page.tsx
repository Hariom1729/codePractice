
import { notFound } from 'next/navigation';
import WorkspaceClient from '@/components/WorkspaceClient';

export default async function ProblemWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let problem;
  try {
    const res = await fetch(`http://localhost:5001/api/problems/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      notFound();
    }
    problem = await res.json();
  } catch (e) {
    notFound();
  }

  if (!problem) {
    notFound();
  }

  // Convert ObjectIds and Maps to primitive JS objects for passing to client component
  const serializedProblem = {
    ...problem,
    _id: problem._id.toString(),
    sampleTestCases: problem.sampleTestCases?.map((tc: any) => ({ ...tc, _id: tc._id?.toString() })) || [],
    hiddenTestCases: problem.hiddenTestCases?.map((tc: any) => ({ ...tc, _id: tc._id?.toString() })) || [],
    boilerplates: problem.boilerplates || [],
  };

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-76px)]">
      <WorkspaceClient problem={serializedProblem} />
    </div>
  );
}
