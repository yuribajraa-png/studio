"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

const questionFormSchema = z.object({
  subject: z.string({ required_error: "Please select a subject." }),
  question: z.string().min(10, { message: "Question must be at least 10 characters." }),
  option1: z.string().min(1, { message: "Option cannot be empty." }),
  option2: z.string().min(1, { message: "Option cannot be empty." }),
  option3: z.string().min(1, { message: "Option cannot be empty." }),
  option4: z.string().min(1, { message: "Option cannot be empty." }),
  correctAnswer: z.enum(["1", "2", "3", "4"], { required_error: "You need to select a correct answer." }),
})

export default function QuestionsPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
  })

  function onSubmit(data: z.infer<typeof questionFormSchema>) {
    console.log(data);
    toast({
      title: "Question Added",
      description: "The new question has been successfully added to the quiz bank.",
    })
    form.reset()
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Question Bank</h1>
        <p className="text-muted-foreground">Add a new question for quizzes and exams.</p>
      </header>

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
              <Button type="submit">Add Question</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
