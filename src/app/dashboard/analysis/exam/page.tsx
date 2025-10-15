
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Exam, Question } from '../../questions/new/page';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Mock student performance data for a given exam
const studentExamPerformance = [
  { name: 'Aarav Sharma', gender: 'male', score: 88, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a static data structure with a fixed size, while a linked list is a dynamic data structure that can grow or shrink." }, { qIndex: 1, answer: "Binary search works on a sorted array by repeatedly dividing the search interval in half."}] },
  { name: 'Priya Kaur', gender: 'female', score: 95, status: 'Excelling', answers: [{ qIndex: 0, answer: "Array stores elements in contiguous memory locations. A linked list stores elements randomly with each element pointing to the next." }, { qIndex: 1, answer: "It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated."}] },
  { name: 'Rohan Thapa', gender: 'male', score: 82, status: 'On Track', answers: [{ qIndex: 0, answer: "Arrays have better cache locality. Linked lists are more flexible for insertions and deletions." }, { qIndex: 1, answer: "The search continues on the remaining half until the value is found or the interval is empty."}] },
  { name: 'Sameer Acharya', gender: 'male', score: 65, status: 'Needs Help', answers: [{ qIndex: 0, answer: "Array is a collection of items." }, { qIndex: 1, answer: "It is a searching algorithm."}] },
  { name: 'Anjali Gurung', gender: 'female', score: 90, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array's size is determined at compile time, whereas a linked list's size can change at runtime." }, { qIndex: 1, answer: "It is an efficient algorithm with a time complexity of O(log n)."}] },
  { name: 'Bikash Rai', gender: 'male', score: 92, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a collection of homogeneous data types." }, { qIndex: 1, answer: "The prerequisite for binary search is that the array must be sorted."}] },
  { name: 'Sita Lama', gender: 'female', score: 78, status: 'On Track', answers: [{ qIndex: 0, answer: "A linked list is made of nodes, where each node contains data and a pointer to the next node." }, { qIndex: 1, answer: "You compare the key with the middle element."}] },
  { name: 'Nitesh Yadav', gender: 'male', score: 81, status: 'On Track', answers: [{ qIndex: 0, answer: "Accessing an element in an array is faster (O(1)), while it is slower in a linked list (O(n))." }, { qIndex: 1, answer: "If the key is smaller than the middle element, you search the left half."}] },
  { name: 'Sunita Shrestha', gender: 'female', score: 84, status: 'On Track', answers: [{ qIndex: 0, answer: "Linked lists require more memory due to the storage of pointers." }, { qIndex: 1, answer: "If the key is larger, you search the right half."}] },
  { name: 'Rajesh Magar', gender: 'male', score: 71, status: 'On Track', answers: [{ qIndex: 0, answer: "An array holds data of the same type." }, { qIndex: 1, answer: "It's a divide and conquer algorithm."}] },
  { name: 'Ravi Singh', gender: 'male', score: 25, status: 'Needs Help', answers: [{ qIndex: 0, answer: "idk" }, { qIndex: 1, answer: "fast search"}] },
  { name: 'Mira Devi', gender: 'female', score: 40, status: 'Needs Help', answers: [{ qIndex: 0, answer: "one is a list" }, { qIndex: 1, answer: "It divides the array"}] },
  { name: 'Arjun Patel', gender: 'male', score: 60, status: 'On Track', answers: [{ qIndex: 0, answer: "You can access array elements with an index." }, { qIndex: 1, answer: "It looks for an item in a sorted list."}] },
  { name: 'Pooja Reddy', gender: 'female', score: 79, status: 'On Track', answers: [{ qIndex: 0, answer: "Linked lists are better for frequent insertions." }, { qIndex: 1, answer: "Binary search is faster than linear search."}] },
  { name: 'Vikram Kumar', gender: 'male', score: 91, status: 'Excelling', answers: [{ qIndex: 0, answer: "Arrays are indexed, linked lists are not." }, { qIndex: 1, answer: "The list is divided in two."}] },
  { name: 'Kiran KC', gender: 'male', score: 93, status: 'Excelling', answers: [{ qIndex: 0, answer: "A list of elements is an array." }, { qIndex: 1, answer: "It repeatedly halves the search interval."}] },
  { name: 'Manish Gupta', gender: 'male', score: 62, status: 'On Track', answers: [{ qIndex: 0, answer: "Array is static." }, { qIndex: 1, answer: "A way to find things."}] },
  { name: 'Gita Joshi', gender: 'female', score: 99, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a container object that holds a fixed number of values of a single type. A linked list is a linear data structure where elements are not stored at contiguous memory locations." }, { qIndex: 1, answer: "Binary Search is a searching algorithm for finding an element's position in a sorted array."}] },
  { name: 'Hari Prasad', gender: 'male', score: 50, status: 'Needs Help', answers: [{ qIndex: 0, answer: "array = easy, list = hard" }, { qIndex: 1, answer: "search for number"}] },
  { name: 'Srijana Tamang', gender: 'female', score: 85, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a data structure consisting of a collection of elements, each identified by at least one array index or key." }, { qIndex: 1, answer: "Binary search is a search algorithm that finds the position of a target value within a sorted array."}] },
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

  const getStudentAnswer = (studentAnswers: {qIndex: number; answer: string}[], questionIndex: number) => {
    const studentAns = studentAnswers.find(a => a.qIndex === questionIndex);
    return studentAns ? studentAns.answer : 'Not Answered';
  }
  
  const getCorrectAnswerText = (question: Question) => {
    if (!question.options || !question.correctAnswer) return 'N/A';
    const correctOptionIndex = parseInt(question.correctAnswer, 10) - 1;
    return question.options[correctOptionIndex]?.value || 'N/A';
  };

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
            <Accordion type="single" collapsible className="w-full">
              {studentExamPerformance.map((student, index) => (
                <AccordionItem value={`student-${index}`} key={index}>
                  <AccordionTrigger className="hover:no-underline">
                     <div className="flex items-center gap-3 w-full">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${student.name}${student.gender === 'male' ? 'boy' : 'girl'}/100/100`} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{student.name}</p>
                      </div>
                      <div className="flex items-center gap-4 pr-4">
                        <span className="font-medium">{student.score}%</span>
                        <Badge variant={student.status === 'Needs Help' ? 'destructive' : student.status === 'Excelling' ? 'default' : 'secondary'}>{student.status}</Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="p-4 bg-muted/50 rounded-md space-y-4">
                        <h4 className="font-semibold">Submitted Answers:</h4>
                        {exam.questions.map((q, qIndex) => (
                          <div key={qIndex} className="border-b pb-4 last:border-b-0 last:pb-0">
                            <p className="font-medium">Q{qIndex + 1}: {q.question}</p>
                            <div className="mt-2 pl-4">
                              <p><span className="font-semibold">Student's Answer: </span>
                                {exam.type === 'quiz' ? getCorrectAnswerText({ ...q, correctAnswer: getStudentAnswer(student.answers, qIndex) }) : getStudentAnswer(student.answers, qIndex)}
                              </p>
                              {exam.type === 'quiz' && (
                                <p className="text-green-600"><span className="font-semibold">Correct Answer: </span>{getCorrectAnswerText(q)}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

    