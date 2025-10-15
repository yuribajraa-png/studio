
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
  { name: 'Aarav Sharma', gender: 'male', score: 88, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a static data structure with a fixed size, while a linked list is a dynamic data structure that can grow or shrink." }, { qIndex: 1, answer: "Binary search works on a sorted array by repeatedly dividing the search interval in half." }, { qIndex: 2, answer: "Chaining involves placing elements that hash to the same bucket into a linked list." }, { qIndex: 3, answer: "Stack is LIFO, like a stack of plates. Queue is FIFO, like a checkout line." }, { qIndex: 4, answer: "All left children are less than the root, all right children are greater." }] },
  { name: 'Priya Kaur', gender: 'female', score: 95, status: 'Excelling', answers: [{ qIndex: 0, answer: "Array stores elements in contiguous memory locations. A linked list stores elements randomly with each element pointing to the next." }, { qIndex: 1, answer: "It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated." }, { qIndex: 2, answer: "A hash table uses a hash function to map keys to indices. Collisions are handled by creating a list of elements for each index." }, { qIndex: 3, answer: "Stack: function call stack. Queue: print job queue." }, { qIndex: 4, answer: "The left subtree of a node contains only nodes with keys lesser than the node's key." }] },
  { name: 'Rohan Thapa', gender: 'male', score: 82, status: 'On Track', answers: [{ qIndex: 0, answer: "Arrays have better cache locality. Linked lists are more flexible for insertions and deletions." }, { qIndex: 1, answer: "The search continues on the remaining half until the value is found or the interval is empty." }, { qIndex: 2, answer: "When two keys hash to the same index, the key-value pairs are stored in a linked list at that index." }, { qIndex: 3, answer: "Stack is Last-In-First-Out. Queue is First-In-First-Out." }, { qIndex: 4, answer: "The right subtree of a node contains only nodes with keys greater than the node's key." }] },
  { name: 'Sameer Acharya', gender: 'male', score: 65, status: 'Needs Help', answers: [{ qIndex: 0, answer: "Array is a collection of items." }, { qIndex: 1, answer: "It is a searching algorithm." }, { qIndex: 2, answer: "It's a way to handle hash collisions." }, { qIndex: 3, answer: "One is LIFO one is FIFO" }, { qIndex: 4, answer: "It's a type of tree." }] },
  { name: 'Anjali Gurung', gender: 'female', score: 90, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array's size is determined at compile time, whereas a linked list's size can change at runtime." }, { qIndex: 1, answer: "It is an efficient algorithm with a time complexity of O(log n)." }, { qIndex: 2, answer: "Each slot of the hash table is a pointer to a linked list that contains the key-value pairs that hashed to the same location." }, { qIndex: 3, answer: "Stack follows LIFO. Queue follows FIFO." }, { qIndex: 4, answer: "Both the left and right subtrees must also be binary search trees." }] },
  { name: 'Bikash Rai', gender: 'male', score: 92, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a collection of homogeneous data types." }, { qIndex: 1, answer: "The prerequisite for binary search is that the array must be sorted." }, { qIndex: 2, answer: "In chaining, each hash table slot contains a linked list of colliding entries." }, { qIndex: 3, answer: "A stack is like a pez dispenser. A queue is like a line for a roller coaster." }, { qIndex: 4, answer: "For any given node, all values in the left subtree are smaller, and all values in the right are larger." }] },
  { name: 'Sita Lama', gender: 'female', score: 78, status: 'On Track', answers: [{ qIndex: 0, answer: "A linked list is made of nodes, where each node contains data and a pointer to the next node." }, { qIndex: 1, answer: "You compare the key with the middle element." }, { qIndex: 2, answer: "You use a linked list for entries that have the same hash." }, { qIndex: 3, answer: "Stack is for reversing things. Queue is for ordering things." }, { qIndex: 4, answer: "It allows for fast lookup, addition and removal of items." }] },
  { name: 'Nitesh Yadav', gender: 'male', score: 81, status: 'On Track', answers: [{ qIndex: 0, answer: "Accessing an element in an array is faster (O(1)), while it is slower in a linked list (O(n))." }, { qIndex: 1, answer: "If the key is smaller than the middle element, you search the left half." }, { qIndex: 2, answer: "If a hash function produces the same index for multiple keys, the records are stored in a list." }, { qIndex: 3, answer: "Stack: undo/redo feature. Queue: CPU scheduling." }, { qIndex: 4, answer: "A node's left child must have a key less than the parent; the right child must have a key greater than the parent." }] },
  { name: 'Sunita Shrestha', gender: 'female', score: 84, status: 'On Track', answers: [{ qIndex: 0, answer: "Linked lists require more memory due to the storage of pointers." }, { qIndex: 1, answer: "If the key is larger, you search the right half." }, { qIndex: 2, answer: "It resolves collisions by storing all colliding keys in a linked list." }, { qIndex: 3, answer: "Stack: LIFO. Example is a browser's back button. Queue: FIFO. Example is a message queue." }, { qIndex: 4, answer: "No duplicate keys are allowed." }] },
  { name: 'Rajesh Magar', gender: 'male', score: 71, status: 'On Track', answers: [{ qIndex: 0, answer: "An array holds data of the same type." }, { qIndex: 1, answer: "It's a divide and conquer algorithm." }, { qIndex: 2, answer: "Collisions are when you get the same hash." }, { qIndex: 3, answer: "Stack is like a pile of books. Queue is a line of people." }, { qIndex: 4, answer: "It is a node-based binary tree data structure." }] },
  { name: 'Ravi Singh', gender: 'male', score: 25, status: 'Needs Help', answers: [{ qIndex: 0, answer: "idk" }, { qIndex: 1, answer: "fast search" }, { qIndex: 2, answer: "hashing" }, { qIndex: 3, answer: "types of lists" }, { qIndex: 4, answer: "a tree" }] },
  { name: 'Mira Devi', gender: 'female', score: 40, status: 'Needs Help', answers: [{ qIndex: 0, answer: "one is a list" }, { qIndex: 1, answer: "It divides the array" }, { qIndex: 2, answer: "Not sure" }, { qIndex: 3, answer: "Stack and queue" }, { qIndex: 4, answer: "A BST" }] },
  { name: 'Arjun Patel', gender: 'male', score: 60, status: 'On Track', answers: [{ qIndex: 0, answer: "You can access array elements with an index." }, { qIndex: 1, answer: "It looks for an item in a sorted list." }, { qIndex: 2, answer: "What to do when hash is same" }, { qIndex: 3, answer: "LIFO vs FIFO" }, { qIndex: 4, answer: "Binary tree" }] },
  { name: 'Pooja Reddy', gender: 'female', score: 79, status: 'On Track', answers: [{ qIndex: 0, answer: "Linked lists are better for frequent insertions." }, { qIndex: 1, answer: "Binary search is faster than linear search." }, { qIndex: 2, answer: "Chaining avoids collisions." }, { qIndex: 3, answer: "Stack is for function calls, queue for tasks." }, { qIndex: 4, answer: "The tree is sorted." }] },
  { name: 'Vikram Kumar', gender: 'male', score: 91, status: 'Excelling', answers: [{ qIndex: 0, answer: "Arrays are indexed, linked lists are not." }, { qIndex: 1, answer: "The list is divided in two." }, { qIndex: 2, answer: "Use a linked list for hash collisions." }, { qIndex: 3, answer: "A stack pushes and pops, a queue enqueues and dequeues." }, { qIndex: 4, answer: "The values on the left are smaller." }] },
  { name: 'Kiran KC', gender: 'male', score: 93, status: 'Excelling', answers: [{ qIndex: 0, answer: "A list of elements is an array." }, { qIndex: 1, answer: "It repeatedly halves the search interval." }, { qIndex: 2, answer: "Chaining is a method for handling hash collisions." }, { qIndex: 3, answer: "Stack is like a deck of cards. Queue is like people waiting for a bus." }, { qIndex: 4, answer: "A special type of binary tree." }] },
  { name: 'Manish Gupta', gender: 'male', score: 62, status: 'On Track', answers: [{ qIndex: 0, answer: "Array is static." }, { qIndex: 1, answer: "A way to find things." }, { qIndex: 2, answer: "About hash tables" }, { qIndex: 3, answer: "Two data structures" }, { qIndex: 4, answer: "A tree with two children per node." }] },
  { name: 'Gita Joshi', gender: 'female', score: 99, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a container object that holds a fixed number of values of a single type. A linked list is a linear data structure where elements are not stored at contiguous memory locations." }, { qIndex: 1, answer: "Binary Search is a searching algorithm for finding an element's position in a sorted array." }, { qIndex: 2, answer: "In hash chaining, each cell of the hash table points to a linked list of records that have the same hash function value." }, { qIndex: 3, answer: "Stack is LIFO (e.g., call stack). Queue is FIFO (e.g., printer queue)." }, { qIndex: 4, answer: "The left child is less than the parent, and the right child is greater than the parent." }] },
  { name: 'Hari Prasad', gender: 'male', score: 50, status: 'Needs Help', answers: [{ qIndex: 0, answer: "array = easy, list = hard" }, { qIndex: 1, answer: "search for number" }, { qIndex: 2, answer: "hashing" }, { qIndex: 3, answer: "different lists" }, { qIndex: 4, answer: "It is a tree." }] },
  { name: 'Srijana Tamang', gender: 'female', score: 85, status: 'Excelling', answers: [{ qIndex: 0, answer: "An array is a data structure consisting of a collection of elements, each identified by at least one array index or key." }, { qIndex: 1, answer: "Binary search is a search algorithm that finds the position of a target value within a sorted array." }, { qIndex: 2, answer: "Chaining is a collision resolution technique where colliding items are stored in a list." }, { qIndex: 3, answer: "Stack uses one end for operations, queue uses both ends." }, { qIndex: 4, answer: "All nodes in left subtree are less than root, all in right are greater." }] },
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

    