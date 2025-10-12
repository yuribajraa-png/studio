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

const studentData = [
  { name: 'Alice', subject: 'Mathematics', score: 85, progress: 85, status: 'On Track' },
  { name: 'Bob', subject: 'Mathematics', score: 92, progress: 92, status: 'Excelling' },
  { name: 'Charlie', subject: 'Physics', score: 78, progress: 78, status: 'On Track' },
  { name: 'David', subject: 'Mathematics', score: 64, progress: 64, status: 'Needs Help' },
  { name: 'Eve', subject: 'Physics', score: 88, progress: 88, status: 'Excelling' },
  { name: 'Frank', subject: 'Chemistry', score: 95, progress: 95, status: 'Excelling' },
  { name: 'Grace', subject: 'Chemistry', score: 72, progress: 72, status: 'On Track' },
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
            <CardDescription>Number of students in each score range for Mathematics.</CardDescription>
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
                 <Select defaultValue="mathematics">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="hidden md:table-cell">Subject</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Score</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.subject}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">{student.score}%</TableCell>
                    <TableCell>
                      <Progress value={student.progress} className="w-full" />
                    </TableCell>
                    <TableCell className="text-right">
                       <Badge variant={student.status === 'Needs Help' ? 'destructive' : student.status === 'Excelling' ? 'default' : 'secondary'}>{student.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
