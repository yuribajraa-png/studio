"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Exam } from "../new/page";

export default function ViewExamsPage() {
  const [allExams, setAllExams] = useState<Exam[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this from a database.
    // For now, we use localStorage to persist across reloads.
    const storedExams = JSON.parse(localStorage.getItem('allExams') || '[]');
    setAllExams(storedExams);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Added Exams</h1>
        <p className="text-muted-foreground">
          Review previously created exams and quizzes.
        </p>
      </header>

      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {allExams.length > 0 ? (
              allExams.map((exam, examIndex) => (
                <AccordionItem value={`exam-${examIndex}`} key={examIndex}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full items-center pr-4">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{exam.topic}</span>
                        <span className="text-sm text-muted-foreground">
                          {exam.subject}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{exam.questions.length} questions</span>
                        <Badge
                          variant={exam.type === "quiz" ? "secondary" : "outline"}
                        >
                          {exam.type}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {exam.description && (
                        <div className="p-4 bg-muted/20 rounded-md mb-4 border-l-4 border-primary">
                            <p className="font-medium">Exam Description:</p>
                            <p className="text-sm text-muted-foreground">{exam.description}</p>
                        </div>
                    )}
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
