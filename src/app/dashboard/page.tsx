"use client";

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const studentData = [
  { name: 'Aarav', subject: 'Data Mining', score: 85, progress: 85, status: 'On Track', details: { phone: '98********', email: 'aarav@test.com' } },
  { name: 'Priya', subject: 'Data Mining', score: 92, progress: 92, status: 'Excelling', details: { phone: '98********', email: 'priya@test.com' } },
  { name: 'Rohan', subject: 'Network Systems', score: 78, progress: 78, status: 'On Track', details: { phone: '98********', email: 'rohan@test.com' } },
  { name: 'Sameer', subject: 'Data Mining', score: 64, progress: 64, status: 'Needs Help', details: { phone: '98********', email: 'sameer@test.com' } },
  { name: 'Anjali', subject: 'Network Systems', score: 88, progress: 88, status: 'Excelling', details: { phone: '98********', email: 'anjali@test.com' } },
  { name: 'Bikash', subject: 'Distributed Computing', score: 95, progress: 95, status: 'Excelling', details: { phone: '98********', email: 'bikash@test.com' } },
  { name: 'Sita', subject: 'Distributed Computing', score: 72, progress: 72, status: 'On Track', details: { phone: '98********', email: 'sita@test.com' } },
];

const chartData = [
  { name: "0-20", total: 3 },
  { name: "21-40", total: 8 },
  { name: "41-60", total: 12 },
  { name: "61-80", total: 25 },
  { name: "81-100", total: 18 },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
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
              <div className="w-full md:w-auto">
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
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${student.name}`} />
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
