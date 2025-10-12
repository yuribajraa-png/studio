"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

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
}).refine(data => {
    if (data.type === 'quiz') {
        return data.questions.every(q => q.options && q.options.length > 0 && q.correctAnswer);
    }
    return true;
}, {
    message: "All quiz questions must have options and a correct answer.",
    path: ["questions"],
});

export type Exam = z.infer<typeof examFormSchema>;

export default function NewQuestionPage() {
  const { toast } = useToast()
  // In a real app, you'd persist this in a DB and retrieve it.
  const [allExams, setAllExams] = useState<Exam[]>([]);

  const form = useForm<Exam>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      topic: "",
      type: "quiz",
      uniformMarks: false,
      questions: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions"
  });
  
  const { type: examType, uniformMarks, marksPerQuestion } = form.watch();

  const addNewQuestion = () => {
    const marks = uniformMarks && marksPerQuestion ? marksPerQuestion : 1;
    append({
        question: "",
        options: examType === 'quiz' ? [{value: ""}, {value: ""}, {value: ""}, {value: ""}] : [],
        correctAnswer: "",
        marks: marks,
        suggestion: "",
    });
  }

  // Add one question by default if none exist
  if (fields.length === 0) {
      addNewQuestion();
  }

  function onSubmit(data: Exam) {
     if (data.questions.length === 0) {
        toast({
            variant: "destructive",
            title: "No Questions",
            description: "Please add at least one question to the exam.",
        });
        return;
    }

    // Persist to state (and in real app, to DB)
    const currentExams = JSON.parse(localStorage.getItem('allExams') || '[]');
    localStorage.setItem('allExams', JSON.stringify([...currentExams, data]));

    setAllExams(prev => [...prev, data]);
    toast({
      title: "Exam Created",
      description: `The exam "${data.topic}" has been successfully created.`,
    });
    form.reset();
    remove(); // Clear all questions
    addNewQuestion(); // Add a fresh one for the next exam
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Create New Exam/Quiz</h1>
        <p className="text-muted-foreground">Build a new set of questions for your students.</p>
      </header>

      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Exam Details</CardTitle>
                <CardDescription>Provide the basic information for this exam or quiz.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="topic" render={({ field }) => (<FormItem><FormLabel>Topic</FormLabel><FormControl><Input placeholder="e.g. Final Exam, Chapter 5 Quiz" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="subject" render={({ field }) => ( <FormItem><FormLabel>Subject</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger></FormControl><SelectContent><SelectItem value="data-mining">Data Mining</SelectItem><SelectItem value="network-systems">Network Systems</SelectItem><SelectItem value="distributed-computing">Distributed Computing</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                </div>

                <FormField control={form.control} name="type" render={({ field }) => (<FormItem className="space-y-3"><FormLabel>Type</FormLabel><FormControl><RadioGroup onValueChange={e => { field.onChange(e); remove(); addNewQuestion(); }} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="quiz" /></FormControl><FormLabel className="font-normal">Quiz</FormLabel></FormItem><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="exam" /></FormControl><FormLabel className="font-normal">Exam</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />

                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <FormField
                        control={form.control}
                        name="uniformMarks"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm flex-1">
                            <div className="space-y-0.5">
                            <FormLabel>Uniform Marks for All Questions?</FormLabel>
                            </div>
                            <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    if(checked && marksPerQuestion) {
                                        form.setValue('questions', form.getValues('questions').map(q => ({...q, marks: marksPerQuestion})))
                                    }
                                }}
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    {uniformMarks && (
                        <FormField control={form.control} name="marksPerQuestion" render={({ field }) => (<FormItem className="flex-1 w-full"><FormLabel>Marks Per Question</FormLabel><FormControl><Input type="number" min="1" {...field} onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(e);
                            if(uniformMarks && value) {
                                form.setValue('questions', form.getValues('questions').map(q => ({...q, marks: parseInt(value, 10) || 1 })))
                            }
                        }} /></FormControl><FormMessage /></FormItem>)} />
                    )}
                </div>
              </CardContent>
            </Card>

            <Separator />

            <div className="space-y-8">
              {fields.map((field, index) => (
                <Card key={field.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30">
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">Question {index + 1}</CardTitle>
                           {fields.length > 1 && (
                              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                  <span className="sr-only">Remove Question</span>
                              </Button>
                           )}
                      </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                      <FormField
                          control={form.control}
                          name={`questions.${index}.question`}
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Question Text</FormLabel>
                              <FormControl>
                              <Textarea placeholder="What is the main concept of...?" {...field} />
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                              control={form.control}
                              name={`questions.${index}.marks`}
                              render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Marks</FormLabel>
                                  <FormControl>
                                  <Input type="number" min="1" {...field} disabled={uniformMarks} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
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
                      </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <Button type="button" variant="outline" onClick={addNewQuestion}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Another Question
              </Button>
              <Button type="submit">Save Exam</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

    