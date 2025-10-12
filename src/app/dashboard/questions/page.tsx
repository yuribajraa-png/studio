"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { ArrowLeft, Check, ChevronsUpDown, PlusCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const questionSchema = z.object({
  question: z.string().min(10, { message: "Question must be at least 10 characters." }),
  options: z.array(z.object({ value: z.string().min(1, "Option cannot be empty.") })).optional(),
  correctAnswer: z.string().optional(),
  marks: z.coerce.number().min(1, "Marks must be at least 1."),
  suggestion: z.string().optional(),
});

const examFormSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  subject: z.string({ required_error: "Please select a subject." }),
  type: z.enum(["quiz", "exam"], { required_error: "Please select a type." }),
  numberOfQuestions: z.coerce.number().min(1, "Must have at least 1 question."),
  uniformMarks: z.boolean().default(false),
  marksPerQuestion: z.coerce.number().optional(),
  questions: z.array(questionSchema)
}).refine(data => {
    if (data.uniformMarks) {
        return data.marksPerQuestion !== undefined && data.marksPerQuestion > 0;
    }
    return true;
}, {
    message: "Marks per question is required when uniform marks are enabled.",
    path: ["marksPerQuestion"],
});

type Exam = z.infer<typeof examFormSchema>;

export default function QuestionsPage() {
  const { toast } = useToast()
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const form = useForm<Exam>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      topic: "",
      type: "quiz",
      numberOfQuestions: 1,
      uniformMarks: false,
      questions: [],
    },
  })

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  const { type: examType, numberOfQuestions: totalQuestions, uniformMarks, marksPerQuestion } = form.watch();

  const handleStartCreation = () => {
    form.trigger(["topic", "subject", "type", "numberOfQuestions", "marksPerQuestion"]).then(isValid => {
      if (isValid) {
        setIsCreating(true);
        append({ 
            question: "", 
            options: examType === 'quiz' ? [{value: ""}, {value: ""}, {value: ""}, {value: ""}] : [], 
            correctAnswer: "",
            marks: uniformMarks && marksPerQuestion ? marksPerQuestion : 1,
            suggestion: ""
        });
      }
    });
  }

  const handleNextQuestion = () => {
      const fieldsToTrigger: (keyof z.infer<typeof questionSchema>)[] = ['question', 'marks'];
      if(examType === 'quiz') {
        fieldsToTrigger.push('options');
        fieldsToTrigger.push('correctAnswer');
      }

      form.trigger(fieldsToTrigger.map(field => `questions.${currentQuestionIndex}.${field}`)).then(isValid => {
        if(isValid) {
            const currentQuestionData = form.getValues(`questions.${currentQuestionIndex}`);
            if (uniformMarks && marksPerQuestion) {
                update(currentQuestionIndex, { ...currentQuestionData, marks: marksPerQuestion });
            }

            if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                 if (fields.length < totalQuestions) {
                    append({ 
                        question: "", 
                        options: examType === 'quiz' ? [{value: ""}, {value: ""}, {value: ""}, {value: ""}] : [], 
                        correctAnswer: "",
                        marks: uniformMarks && marksPerQuestion ? marksPerQuestion : 1,
                        suggestion: ""
                    });
                }
            } else {
                handleFinishExam();
            }
        }
    });
  }
  
  const handleFinishExam = () => {
     const fieldsToTrigger: (keyof z.infer<typeof questionSchema>)[] = ['question', 'marks'];
      if(examType === 'quiz') {
        fieldsToTrigger.push('options');
        fieldsToTrigger.push('correctAnswer');
      }
      
      form.trigger(fieldsToTrigger.map(field => `questions.${currentQuestionIndex}.${field}`)).then(isValid => {
      if(isValid) {
        const newExam = form.getValues();
        setAllExams(prev => [...prev, newExam]);
        toast({
          title: "Exam Created",
          description: `The exam "${newExam.topic}" has been successfully created.`,
        });
        form.reset();
        setIsCreating(false);
        setCurrentQuestionIndex(0);
        remove();
      }
    });
  }

  const handleBack = () => {
    setIsCreating(false);
    setCurrentQuestionIndex(0);
    remove();
    form.reset(form.getValues());
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Question Bank</h1>
        <p className="text-muted-foreground">Create and manage exams and quizzes.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                         {isCreating && <Button variant="ghost" size="icon" onClick={handleBack}><ArrowLeft className="h-4 w-4"/></Button>}
                        <CardTitle>{isCreating ? `Create '${form.getValues("topic")}'` : 'New Exam/Quiz'}</CardTitle>
                    </div>
                    <CardDescription>
                        {isCreating ? `Question ${currentQuestionIndex + 1} of ${totalQuestions}` : 'Define the structure of your exam or quiz.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form className="space-y-6">
                    {!isCreating ? (
                        <>
                            <FormField control={form.control} name="topic" render={({ field }) => (<FormItem><FormLabel>Topic</FormLabel><FormControl><Input placeholder="e.g. Final Exam" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="subject" render={({ field }) => ( <FormItem><FormLabel>Subject</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger></FormControl><SelectContent><SelectItem value="data-mining">Data Mining</SelectItem><SelectItem value="network-systems">Network Systems</SelectItem><SelectItem value="distributed-computing">Distributed Computing</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="type" render={({ field }) => (<FormItem className="space-y-3"><FormLabel>Type</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="quiz" /></FormControl><FormLabel className="font-normal">Quiz</FormLabel></FormItem><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="exam" /></FormControl><FormLabel className="font-normal">Exam</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="numberOfQuestions" render={({ field }) => (<FormItem><FormLabel>Number of Questions</FormLabel><FormControl><Input type="number" min="1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            
                            <FormField
                                control={form.control}
                                name="uniformMarks"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                    <FormLabel>Uniform Marks for All Questions?</FormLabel>
                                    </div>
                                    <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            {uniformMarks && (
                                <FormField control={form.control} name="marksPerQuestion" render={({ field }) => (<FormItem><FormLabel>Marks Per Question</FormLabel><FormControl><Input type="number" min="1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            )}

                            <Button type="button" onClick={handleStartCreation} className="w-full">Start Creating Questions</Button>
                        </>
                    ) : fields.map((field, index) => (
                        <div key={field.id} className={currentQuestionIndex === index ? 'space-y-6' : 'hidden'}>
                            <FormField
                                control={form.control}
                                name={`questions.${index}.question`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Question</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="What is the formula for..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            {examType === 'quiz' && (
                                <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name={`questions.${index}.options.0.value`} render={({ field }) => ( <FormItem><FormLabel>Option 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                                    <FormField control={form.control} name={`questions.${index}.options.1.value`} render={({ field }) => ( <FormItem><FormLabel>Option 2</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                                    <FormField control={form.control} name={`questions.${index}.options.2.value`} render={({ field }) => ( <FormItem><FormLabel>Option 3</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                                    <FormField control={form.control} name={`questions.${index}.options.3.value`} render={({ field }) => ( <FormItem><FormLabel>Option 4</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                                </div>
                                <FormField
                                    control={form.control}
                                    name={`questions.${index}.correctAnswer`}
                                    render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Correct Answer</FormLabel>
                                        <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="1" /></FormControl><FormLabel className="font-normal">Option 1</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="2" /></FormControl><FormLabel className="font-normal">Option 2</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="3" /></FormControl><FormLabel className="font-normal">Option 3</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="4" /></FormControl><FormLabel className="font-normal">Option 4</FormLabel></FormItem>
                                        </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </>
                            )}
                            
                            <FormField
                                control={form.control}
                                name={`questions.${index}.marks`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marks</FormLabel>
                                    <FormControl>
                                    <Input type="number" min="1" {...field} disabled={uniformMarks} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name={`questions.${index}.suggestion`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Suggestion (Optional)</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="e.g., Mention all the steps to get full marks." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <Button type="button" onClick={handleNextQuestion} className="w-full mt-6">
                                {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Finish & Save Exam"}
                            </Button>
                        </div>
                    ))}
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Added Exams</CardTitle>
                    <CardDescription>List of created exams and quizzes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {allExams.length > 0 ? allExams.map((exam, examIndex) => (
                            <AccordionItem value={`exam-${examIndex}`} key={examIndex}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full items-center pr-4">
                                        <div className="flex flex-col items-start">
                                            <span className="font-semibold">{exam.topic}</span>
                                            <span className="text-sm text-muted-foreground">{exam.subject}</span>
                                        </div>
                                        <Badge variant={exam.type === 'quiz' ? 'secondary' : 'outline'}>{exam.type}</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {exam.questions.map((q, qIndex) => (
                                         <div className="p-4 bg-muted/50 rounded-md mb-2" key={qIndex}>
                                            <div className="flex justify-between items-start">
                                                <p><strong>Question {qIndex + 1}:</strong> {q.question}</p>
                                                <Badge variant="outline">Marks: {q.marks}</Badge>
                                            </div>
                                            {exam.type === 'quiz' && q.options && q.options.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="font-medium">Options:</p>
                                                    <ul className="list-disc pl-5 mt-1">
                                                        {q.options.map((opt, optIndex) => (
                                                            <li key={optIndex} className={q.correctAnswer === `${optIndex + 1}` ? 'font-bold' : ''}>
                                                                {opt.value}
                                                                {q.correctAnswer === `${optIndex + 1}` && <span className="text-primary ml-2">(Correct)</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {q.suggestion && (
                                                <div className="mt-2">
                                                    <p className="font-medium">Suggestion:</p>
                                                    <p className="text-sm text-muted-foreground">{q.suggestion}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        )) : (
                            <p className="text-muted-foreground text-center">No exams created yet.</p>
                        )}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

    