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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"

const documentFormSchema = z.object({
  subject: z.string({ required_error: "Please select a subject." }),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  file: z.any().refine((files) => files?.length == 1, "File is required."),
})

const initialDocuments = [
    { title: "Data Mining Concepts", subject: "Data Mining", date: "2024-05-10" },
    { title: "OSI Model", subject: "Network Systems", date: "2024-05-08" },
    { title: "Intro to Distributed Systems", subject: "Distributed Computing", date: "2024-05-05" },
];

const subjectMap: { [key: string]: string } = {
  "data-mining": "Data Mining",
  "network-systems": "Network Systems",
  "distributed-computing": "Distributed Computing"
};

export default function DocumentsPage() {
  const { toast } = useToast()
  const [fileName, setFileName] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState(initialDocuments);

  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "",
    },
  })
  const fileRef = form.register("file");

  function onSubmit(data: z.infer<typeof documentFormSchema>) {
    const newDocument = {
      title: data.title,
      subject: subjectMap[data.subject],
      date: new Date().toISOString().split('T')[0],
    };

    setUploadedDocuments(prev => [newDocument, ...prev]);
    
    toast({
      title: "Document Uploaded",
      description: `${data.file[0].name} has been successfully uploaded.`,
    })
    form.reset()
    setFileName("");
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Documents</h1>
        <p className="text-muted-foreground">Upload and manage study materials.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Chapter 1 Notes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input type="file" {...fileRef} onChange={(e) => {
                            field.onChange(e.target.files);
                            if (e.target.files && e.target.files.length > 0) {
                              setFileName(e.target.files[0].name);
                            } else {
                              setFileName("");
                            }
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
                  <Button type="submit" className="w-full">Upload Document</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Uploaded Documents</CardTitle>
                    <CardDescription>List of available study materials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Uploaded On</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uploadedDocuments.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{doc.title}</TableCell>
                                    <TableCell>{doc.subject}</TableCell>
                                    <TableCell>{doc.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive"/>
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
