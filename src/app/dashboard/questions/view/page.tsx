
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Exam } from "../new/page";
import { BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialExams: Exam[] = [
    {
        topic: "Mid-Term: Data Structures",
        subject: "Data Mining",
        date: "2024-04-15",
        type: "exam",
        gradingType: "auto",
        questions: [
            { question: "Explain the difference between an array and a linked list.", marks: 10 },
            { question: "Describe the process of a binary search.", marks: 10 }
        ]
    },
    {
        topic: "Chapter 3 Quiz",
        subject: "Network Systems",
        date: "2024-05-02",
        type: "quiz",
        gradingType: "auto",
        questions: [
            { question: "What is the function of the OSI presentation layer?", options: [{value: "A"}, {value: "B"}, {value: "C"}], correctAnswer: "1", marks: 5 },
            { question: "What is a subnet mask?", options: [{value: "A"}, {value: "B"}, {value: "C"}], correctAnswer: "2", marks: 5 }
        ]
    },
    {
        topic: "Final Exam Prep",
        subject: "Distributed Computing",
        date: "2024-05-20",
        type: "exam",
        gradingType: "self-check",
        questions: [
            { question: "What is the CAP theorem and what are its implications?", marks: 15 },
            { question: "Compare and contrast monoliths and microservices.", marks: 15 }
        ]
    }
];

export default function ViewExamsPage() {
  const [allExams, setAllExams] = useState<Exam[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this from a database.
    // For now, we use localStorage to persist across reloads.
    let storedExams = JSON.parse(localStorage.getItem('allExams') || '[]');
    if (storedExams.length === 0) {
        storedExams = initialExams;
        localStorage.setItem('allExams', JSON.stringify(initialExams));
    }
    setAllExams(storedExams);
  }, []);

  const getGradingLabel = (gradingType: string | undefined) => {
    if (gradingType === 'auto') return 'Auto Grade';
    if (gradingType === 'self-check') return 'Self Grade';
    return 'N/A';
  }

  const getSubjectValue = (subjectLabel: string | undefined) => {
    if (!subjectLabel) return "all-subjects";
    return subjectLabel.toLowerCase().replace(/\s+/g, '-');
  }

  return (
    <div className="container mx-auto py-12 px-6 md:px-12 lg:px-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Added Exams</h1>
        <p className="text-muted-foreground">
          Review previously created exams and quizzes. Click on an exam to see a detailed performance analysis.
        </p>
      </header>

      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {allExams.length > 0 ? (
              allExams.map((exam, examIndex) => (
                <AccordionItem value={`exam-${examIndex}`} key={examIndex}>
                    <AccordionTrigger>
                      <div className="flex flex-1 justify-between w-full items-center pr-4 text-left">
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-semibold">{exam.topic}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{exam.subject}</span>
                             <span className="text-xs text-muted-foreground hidden sm:inline-block">&bull;</span>
                            <span className="text-sm text-muted-foreground hidden sm:inline-block">Conducted on: {exam.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                           <Button asChild size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <Link href={{ pathname: '/dashboard/analysis/exam', query: { exam: JSON.stringify(exam) } }}>
                                <BarChart2 className="mr-2 h-4 w-4" />
                                View Analysis
                              </Link>
                           </Button>
                          <Badge
                            variant={exam.type === "quiz" ? "secondary" : "outline"}
                          >
                            {exam.type}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-4 mb-4 items-start justify-between">
                       <div className="flex-1 min-w-[200px]">
                         {exam.description && (
                            <div className="p-4 bg-muted/20 rounded-md border-l-4 border-primary mb-4">
                                <p className="font-medium">Exam Description:</p>
                                <p className="text-sm text-muted-foreground">{exam.description}</p>
                            </div>
                        )}
                         <div className="p-4 bg-muted/20 rounded-md border-l-4 border-primary sm:flex-none">
                              <p className="font-medium">Grading:</p>
                              <p className="text-sm text-muted-foreground">{getGradingLabel(exam.gradingType)}</p>
                          </div>
                       </div>
                    </div>

                    {exam.questions.map((q, qIndex) => (
                      <div
                        className="p-4 bg-muted/50 rounded-md mb-2"
                        key={qIndex}
                      >
                        <div className="flex justify-between items-start">
                          <p>
                            <strong>Question {qIndex + 1}:</strong> {q.question}
                          </p>
                          <Badge variant="outline">Marks: {q.marks}</Badge>
                        </div>
                        {exam.type === "quiz" &&
                          q.options &&
                          q.options.length > 0 && (
                            <div className="mt-2">
                              <p className="font-medium">Options:</p>
                              <ul className="list-disc pl-5 mt-1">
                                {q.options.map((opt, optIndex) => (
                                  <li
                                    key={optIndex}
                                    className={
                                      q.correctAnswer === `${optIndex + 1}`
                                        ? "font-bold"
                                        : ""
                                    }
                                  >
                                    {opt.value}
                                    {q.correctAnswer ===
                                      `${optIndex + 1}` && (
                                      <span className="text-primary ml-2">
                                        (Correct)
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        {q.suggestion && (
                          <div className="mt-2">
                            <p className="font-medium">Suggestion:</p>
                            <p className="text-sm text-muted-foreground">
                              {q.suggestion}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No exams created yet. Go to 'New Exam/Quiz' to add one.
              </p>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
