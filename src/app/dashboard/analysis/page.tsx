"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PerformanceAnalysis } from '@/components/analysis/performance-analysis';
import { StudentAnalysis } from '@/components/analysis/student-analysis';
import { Skeleton } from '@/components/ui/skeleton';

function DetailedAnalysisContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  const studentName = searchParams.get('student');

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      {view === 'performance' && (
        <>
          <header className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Performance Analysis</h1>
            <p className="text-muted-foreground">
              A detailed look at overall class performance.
            </p>
          </header>
          <PerformanceAnalysis />
        </>
      )}
      {view === 'students' && (
        <>
           <header className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Student Analysis</h1>
            <p className="text-muted-foreground">
              In-depth look at individual student data.
            </p>
          </header>
          <StudentAnalysis selectedStudent={studentName} />
        </>
      )}
      {!view && (
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Select a view from the dashboard to see detailed analysis.</p>
        </div>
      )}
    </div>
  );
}


export default function DetailedAnalysisPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-4 md:p-8 max-w-6xl"><Skeleton className="w-full h-96" /></div>}>
      <DetailedAnalysisContent />
    </Suspense>
  );
}
