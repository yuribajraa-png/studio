"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";


const studentData = [
  { name: 'Aarav', subject: 'Data Mining', score: 85, status: 'On Track', details: { phone: '9812345670', email: 'aarav.sharma@test.com' }, gender: 'male' },
  { name: 'Priya', subject: 'Data Mining', score: 92, status: 'Excelling', details: { phone: '9809876543', email: 'priya.kaur@test.com' }, gender: 'female' },
  { name: 'Rohan', subject: 'Network Systems', score: 78, status: 'On Track', details: { phone: '9845678901', email: 'rohan.thapa@test.com' }, gender: 'male' },
  { name: 'Sameer', subject: 'Data Mining', score: 64, status: 'Needs Help', details: { phone: '9865432109', email: 'sameer.acharya@test.com' }, gender: 'male' },
  { name: 'Anjali', subject: 'Network Systems', score: 88, status: 'Excelling', details: { phone: '9811223344', email: 'anjali.gurung@test.com' }, gender: 'female' },
  { name: 'Bikash', subject: 'Distributed Computing', score: 95, status: 'Excelling', details: { phone: '9855667788', email: 'bikash.rai@test.com' }, gender: 'male' },
  { name: 'Sita', subject: 'Distributed Computing', score: 72, status: 'On Track', details: { phone: '9844332211', email: 'sita.lama@test.com' }, gender: 'female' },
  { name: 'Nitesh', subject: 'Data Mining', score: 79, status: 'On Track', details: { phone: '9819283746', email: 'nitesh.yadav@test.com' }, gender: 'male' },
  { name: 'Sunita', subject: 'Network Systems', score: 81, status: 'On Track', details: { phone: '9801928374', email: 'sunita.shrestha@test.com' }, gender: 'female' },
  { name: 'Rajesh', subject: 'Distributed Computing', score: 68, status: 'Needs Help', details: { phone: '9860192837', email: 'rajesh.magar@test.com' }, gender: 'male' },
];

const chartData = [
  { name: "0-20", total: 3 },
  { name: "21-40", total: 8 },
  { name: "41-60", total: 12 },
  { name: "61-80", total: 25 },
  { name: "81-100", total: 18 },
];

export default function DashboardPage() {
  const [showAllStudents, setShowAllStudents] = useState(false);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Student Analytics</h1>
        <p className="text-muted-foreground">
          Overview of student performance and engagement.
        </p>
      </header>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Number of students in each score range for Data Mining.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))' }}
                  contentStyle={{ 
                    background: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Detailed information for each student.</CardDescription>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                 <Select defaultValue="data-mining">
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-mining">Data Mining</SelectItem>
                    <SelectItem value="network-systems">Network Systems</SelectItem>
                    <SelectItem value="distributed-computing">Distributed Computing</SelectItem>
                  </SelectContent>
                </Select>
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button>View All</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>All Students</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Contact</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentData.map((student) => (
                            <TableRow key={student.name}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.subject}</TableCell>
                              <TableCell>{student.score}%</TableCell>
                              <TableCell>
                                <Badge variant={student.status === 'Needs Help' ? 'destructive' : student.status === 'Excelling' ? 'default' : 'secondary'}>{student.status}</Badge>
                              </TableCell>
                               <TableCell>
                                <p><strong>Phone:</strong> {student.details.phone}</p>
                                <p><strong>Email:</strong> {student.details.email}</p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {studentData.map((student, index) => (
                <AccordionItem value={`item-${index}`} key={student.name}>
                  <AccordionTrigger>
                    <Table className="w-full">
                      <TableBody>
                        <TableRow className="border-none">
                          <TableCell className="font-medium p-0 w-1/4">{student.name}</TableCell>
                          <TableCell className="hidden md:table-cell p-0 w-1/4">{student.subject}</TableCell>
                          <TableCell className="hidden md:table-cell text-center p-0 w-1/4">{student.score}%</TableCell>
                          <TableCell className="p-0 w-1/4 text-right">
                            <Badge variant={student.status === 'Needs Help' ? 'destructive' : student.status === 'Excelling' ? 'default' : 'secondary'}>{student.status}</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-md">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${student.name}${student.gender === 'male' ? 'boy' : 'girl'}/150/150`} />
                        <AvatarFallback>{student.name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p><strong>Phone:</strong> {student.details.phone}</p>
                        <p><strong>Email:</strong> {student.details.email}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
