"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

const studentData = [
  { name: 'Aarav', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'first-term', score: 85, status: 'On Track', details: { phone: '9812345670', email: 'aarav.sharma@test.com' }, gender: 'male' },
  { name: 'Priya', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'first-term', score: 92, status: 'Excelling', details: { phone: '9809876543', email: 'priya.kaur@test.com' }, gender: 'female' },
  { name: 'Rohan', subject: 'Network Systems', subjectValue: 'network-systems', examType: 'mid-term', score: 78, status: 'On Track', details: { phone: '9845678901', email: 'rohan.thapa@test.com' }, gender: 'male' },
  { name: 'Sameer', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'mid-term', score: 64, status: 'Needs Help', details: { phone: '9865432109', email: 'sameer.acharya@test.com' }, gender: 'male' },
  { name: 'Anjali', subject: 'Network Systems', subjectValue: 'network-systems', examType: 'final-term', score: 88, status: 'Excelling', details: { phone: '9811223344', email: 'anjali.gurung@test.com' }, gender: 'female' },
  { name: 'Bikash', subject: 'Distributed Computing', subjectValue: 'distributed-computing', examType: 'first-term', score: 95, status: 'Excelling', details: { phone: '9855667788', email: 'bikash.rai@test.com' }, gender: 'male' },
  { name: 'Sita', subject: 'Distributed Computing', subjectValue: 'distributed-computing', examType: 'mid-term', score: 72, status: 'On Track', details: { phone: '9844332211', email: 'sita.lama@test.com' }, gender: 'female' },
  { name: 'Nitesh', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'final-term', score: 79, status: 'On Track', details: { phone: '9819283746', email: 'nitesh.yadav@test.com' }, gender: 'male' },
  { name: 'Sunita', subject: 'Network Systems', subjectValue: 'network-systems', examType: 'first-term', score: 81, status: 'On Track', details: { phone: '9801928374', email: 'sunita.shrestha@test.com' }, gender: 'female' },
  { name: 'Rajesh', subject: 'Distributed Computing', subjectValue: 'distributed-computing', examType: 'final-term', score: 68, status: 'Needs Help', details: { phone: '9860192837', email: 'rajesh.magar@test.com' }, gender: 'male' },
  { name: 'Student 11', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'first-term', score: 15, status: 'Needs Help', details: { phone: '1111111111', email: 'student11@test.com' }, gender: 'male' },
  { name: 'Student 12', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'mid-term', score: 35, status: 'Needs Help', details: { phone: '2222222222', email: 'student12@test.com' }, gender: 'female' },
  { name: 'Student 13', subject: 'Network Systems', subjectValue: 'network-systems', examType: 'first-term', score: 55, status: 'On Track', details: { phone: '3333333333', email: 'student13@test.com' }, gender: 'male' },
  { name: 'Student 14', subject: 'Distributed Computing', subjectValue: 'distributed-computing', examType: 'final-term', score: 75, status: 'On Track', details: { phone: '4444444444', email: 'student14@test.com' }, gender: 'female' },
  { name: 'Student 15', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'final-term', score: 89, status: 'Excelling', details: { phone: '5555555555', email: 'student15@test.com' }, gender: 'male' },
];

const calculateChartData = (students: typeof studentData) => {
    const bins = [
        { name: "0-20", total: 0 },
        { name: "21-40", total: 0 },
        { name: "41-60", total: 0 },
        { name: "61-80", total: 0 },
        { name: "81-100", total: 0 },
    ];
    students.forEach(student => {
        if(student.score >= 0 && student.score <= 20) bins[0].total++;
        else if(student.score >= 21 && student.score <= 40) bins[1].total++;
        else if(student.score >= 41 && student.score <= 60) bins[2].total++;
        else if(student.score >= 61 && student.score <= 80) bins[3].total++;
        else if(student.score >= 81 && student.score <= 100) bins[4].total++;
    });
    return bins;
}

export default function DashboardPage() {
  const [selectedSubject, setSelectedSubject] = useState("all-subjects");
  const [selectedExamType, setSelectedExamType] = useState("all-exams");
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  const [chartData, setChartData] = useState(calculateChartData(studentData));

  useEffect(() => {
    let students = studentData;

    if (selectedSubject !== 'all-subjects') {
      students = students.filter(s => s.subjectValue === selectedSubject);
    }
    
    if (selectedExamType !== 'all-exams') {
      students = students.filter(s => s.examType === selectedExamType);
    }

    setFilteredStudents(students);
    setChartData(calculateChartData(students));
  }, [selectedSubject, selectedExamType]);


  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Student Analytics</h1>
          <p className="text-muted-foreground">
            Overview of student performance and engagement.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-subjects">All Subjects</SelectItem>
              <SelectItem value="data-mining">Data Mining</SelectItem>
              <SelectItem value="network-systems">Network Systems</SelectItem>
              <SelectItem value="distributed-computing">Distributed Computing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedExamType} onValueChange={setSelectedExamType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Exam Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-exams">All Exams</SelectItem>
              <SelectItem value="first-term">First Term</SelectItem>
              <SelectItem value="mid-term">Mid Term</SelectItem>
              <SelectItem value="final-term">Final Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div className="grid gap-8">
        <Card>
          <CardHeader>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle>Performance Distribution</CardTitle>
                    <CardDescription>Student scores based on selected filters.</CardDescription>
                </div>
                <Button asChild>
                  <Link href={{ pathname: '/dashboard/analysis', query: { view: 'performance' } }}>View Detailed Report</Link>
                </Button>
            </div>
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
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>A glimpse of recent student performance.</CardDescription>
              </div>
              <Button asChild>
                <Link href={{ pathname: '/dashboard/analysis', query: { view: 'students' } }}>View All Students</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredStudents.length > 0 ? (
                filteredStudents.slice(0, 5).map((student, index) => (
                  <AccordionItem value={`item-${index}`} key={student.name}>
                    <AccordionTrigger>
                      <Link href={{ pathname: '/dashboard/analysis', query: { view: 'students', student: student.name } }} className="w-full">
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
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent>
                       <Link href={{ pathname: '/dashboard/analysis', query: { view: 'students', student: student.name } }}>
                        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-md hover:bg-muted">
                          <Avatar>
                            <AvatarImage src={`https://picsum.photos/seed/${student.name}${student.gender === 'male' ? 'boy' : 'girl'}/150/150`} />
                            <AvatarFallback>{student.name.substring(0,2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p><strong>Phone:</strong> {student.details.phone}</p>
                            <p><strong>Email:</strong> {student.details.email}</p>
                          </div>
                        </div>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No students found for the selected filters.</p>
              )}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
