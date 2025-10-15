
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Exam } from '../../questions/new/page';
import { Skeleton } from '@/components/ui/skeleton';

// Mock student performance data for a given exam
const studentExamPerformance = [
  { name: 'Aarav Sharma', gender: 'male', score: 88, status: 'Excelling' },
  { name: 'Priya Kaur', gender: 'female', score: 95, status: 'Excelling' },
  { name: 'Rohan Thapa', gender: 'male', score: 82, status: 'On Track' },
  { name: 'Sameer Acharya', gender: 'male', score: 65, status: 'Needs Help' },
  { name: 'Anjali Gurung', gender: 'female', score: 90, status: 'Excelling' },
  { name: 'Bikash Rai', gender: 'male', score: 92, status: 'Excelling' },
  { name: 'Sita Lama', gender: 'female', score: 78, status: 'On Track' },
  { name: 'Nitesh Yadav', gender: 'male', score: 81, status: 'On Track' },
  { name: 'Sunita Shrestha', gender: 'female', score: 84, status: 'On Track' },
  { name: 'Rajesh Magar', gender: 'male', score: 71, status: 'On Track' },
  { name: 'Ravi Singh', gender: 'male', score: 25, status: 'Needs Help' },
  { name: 'Mira Devi', gender: 'female', score: 40, status: 'Needs Help' },
  { name: 'Arjun Patel', gender: 'male', score: 60, status: 'On Track' },
  { name: 'Pooja Reddy', gender: 'female', score: 79, status: 'On Track' },
  { name: 'Vikram Kumar', gender: 'male', score: 91, status: 'Excelling' },
  { name: 'Kiran KC', gender: 'male', score: 93, status: 'Excelling' },
  { name: 'Manish Gupta', gender: 'male', score: 62, status: 'On Track' },
  { name: 'Gita Joshi', gender: 'female', score: 99, status: 'Excelling' },
  { name: 'Hari Prasad', gender: 'male', score: 50, status: 'Needs Help' },
  { name: 'Srijana Tamang', gender: 'female', score: 85, status: 'Excelling' },
];

function ExamAnalysisContent() {
  const searchParams = useSearchParams();
  const examString = searchParams.get('exam');
  
  if (!examString) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>No exam data provided.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please return to the previous page and select an exam to view its analysis.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exam: Exam = JSON.parse(examString);
  const totalMarks = exam.questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Exam Analysis: {exam.topic}</h1>
        <p className="text-muted-foreground">
          A detailed look at student performance for this specific exam.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{exam.subject}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{exam.questions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{totalMarks}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Results</CardTitle>
          <CardDescription>Individual scores and status for each student who took the exam.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentExamPerformance.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${student.name}${student.gender === 'male' ? 'boy' : 'girl'}/100/100`} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{student.score}%</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={student.status === 'Needs Help' ? 'destructive' : student.status === 'Excelling' ? 'default' : 'secondary'}>{student.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


export default function ExamAnalysisPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-4 md:p-8 max-w-4xl"><Skeleton className="w-full h-96" /></div>}>
      <ExamAnalysisContent />
    </Suspense>
  );
}
