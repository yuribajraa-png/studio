"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

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

const questionFormSchema = z.object({
  type: z.enum(["quiz", "exam"], { required_error: "Please select a question type." }),
  subject: z.string({ required_error: "Please select a subject." }),
  question: z.string().min(10, { message: "Question must be at least 10 characters." }),
  option1: z.string().optional(),
  option2: z.string().optional(),
  option3: z.string().optional(),
  option4: z.string().optional(),
  correctAnswer: z.string().optional(),
}).refine(data => {
    if (data.type === 'quiz') {
        return !!data.option1 && !!data.option2 && !!data.option3 && !!data.option4 && !!data.correctAnswer;
    }
    return true;
}, {
    message: "All options and a correct answer are required for a quiz.",
    path: ["correctAnswer"],
});


type Question = z.infer<typeof questionFormSchema>;

export default function QuestionsPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([]);
  const form = useForm<Question>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      type: "quiz",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
  })

  const questionType = form.watch("type");

  function onSubmit(data: Question) {
    setQuestions(prev => [...prev, data]);
    toast({
      title: "Question Added",
      description: "The new question has been successfully added to the question bank.",
    })
    form.reset({
        ...form.getValues(),
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: undefined,
    })
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Question Bank</h1>
        <p className="text-muted-foreground">Add new questions for quizzes and exams.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                <CardTitle>New Question Form</CardTitle>
                <CardDescription>Fill in the details for the new question.</CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Question Type</FormLabel>
                            <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="quiz" /></FormControl><FormLabel className="font-normal">Quiz</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="exam" /></FormControl><FormLabel className="font-normal">Exam</FormLabel></FormItem>
                            </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="data-mining">Data Mining</SelectItem>
                                <SelectItem value="network-systems">Network Systems</SelectItem>
                                <SelectItem value="distributed-computing">Distributed Computing</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="question"
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

                    {questionType === 'quiz' && (
                        <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="option1" render={({ field }) => ( <FormItem><FormLabel>Option 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="option2" render={({ field }) => ( <FormItem><FormLabel>Option 2</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="option3" render={({ field }) => ( <FormItem><FormLabel>Option 3</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="option4" render={({ field }) => ( <FormItem><FormLabel>Option 4</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        </div>
                        <FormField
                            control={form.control}
                            name="correctAnswer"
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
                    
                    <Button type="submit">Add Question</Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Added Questions</CardTitle>
                    <CardDescription>List of questions in the question bank.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {questions.length > 0 ? questions.map((q, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full items-center pr-4">
                                        <span className="truncate flex-1 text-left">{q.question}</span>
                                        <Badge variant={q.type === 'quiz' ? 'secondary' : 'outline'}>{q.type}</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="p-4 bg-muted/50 rounded-md">
                                        <p><strong>Subject:</strong> {q.subject}</p>
                                        <p><strong>Question:</strong> {q.question}</p>
                                        {q.type === 'quiz' && (
                                            <>
                                                <p><strong>Options:</strong></p>
                                                <ul className="list-disc pl-5">
                                                    <li>{q.option1}</li>
                                                    <li>{q.option2}</li>
                                                    <li>{q.option3}</li>
                                                    <li>{q.option4}</li>
                                                </ul>
                                                <p><strong>Correct Answer:</strong> Option {q.correctAnswer}</p>
                                            </>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )) : (
                            <p className="text-muted-foreground text-center">No questions added yet.</p>
                        )}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
