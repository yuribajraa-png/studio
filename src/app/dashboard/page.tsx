"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Target, BookOpen, ArrowRight, FileText } from "lucide-react";
import type { Exam } from "./questions/new/page";


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
  { name: 'Kiran', subject: 'Network Systems', subjectValue: 'network-systems', examType: 'final-term', score: 91, status: 'Excelling', details: { phone: '6666666666', email: 'kiran@test.com' }, gender: 'male' },
  { name: 'Manish', subject: 'Distributed Computing', subjectValue: 'distributed-computing', examType: 'mid-term', score: 58, status: 'Needs Help', details: { phone: '7777777777', email: 'manish@test.com' }, gender: 'male' },
  { name: 'Gita', subject: 'Data Mining', subjectValue: 'data-mining', examType: 'first-term', score: 98, status: 'Excelling', details: { phone: '8888888888', email: 'gita@test.com' }, gender: 'female' },
  { name: 'Hari', subject: 'Network Systems', subjectValue: 'network-systems', examType: 'mid-term', score: 45, status: 'Needs Help', details: { phone: '9999999999', email: 'hari@test.com' }, gender: 'male' },
  { name: 'Srijana', subject: 'Distributed Computing', subjectValue: 'distributed-computing', examType: 'final-term', score: 82, status: 'Excelling', details: { phone: '1010101010', email: 'srijana@test.com' }, gender: 'female' },
];

const calculateChartData = (students: typeof studentData) => {
    const bins = [
        { name: "0-20", count: 0 },
        { name: "21-40", count: 0 },
        { name: "41-60", count: 0 },
        { name: "61-80", count: 0 },
        { name: "81-100", count: 0 },
    ];
    students.forEach(student => {
        if(student.score <= 20) bins[0].count++;
        else if(student.score <= 40) bins[1].count++;
        else if(student.score <= 60) bins[2].count++;
        else if(student.score <= 80) bins[3].count++;
        else if(student.score <= 100) bins[4].count++;
    });
    return bins;
}

const subjects = [
    { value: "data-mining", label: "Data Mining" },
    { value: "network-systems", label: "Network Systems" },
    { value: "distributed-computing", label: "Distributed Computing" },
];

export default function DashboardPage() {
  const [selectedSubject, setSelectedSubject] = useState("all-subjects");
  const [selectedExamType, setSelectedExamType] = useState("all-exams");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  const [chartData, setChartData] = useState(calculateChartData(studentData));
  const [allExams, setAllExams] = useState<Exam[]>([]);

  const totalStudents = studentData.length;
  const averageScore = (studentData.reduce((acc, s) => acc + s.score, 0) / studentData.length).toFixed(1);

  useEffect(() => {
    let students = studentData;
    let chartStudents = studentData;

    if (selectedSubject !== 'all-subjects') {
      students = students.filter(s => s.subjectValue === selectedSubject);
      chartStudents = chartStudents.filter(s => s.subjectValue === selectedSubject);
    }
    
    if (selectedExamType !== 'all-exams') {
      students = students.filter(s => s.examType === selectedExamType);
      chartStudents = chartStudents.filter(s => s.examType === selectedExamType);
    }
    
    if (searchQuery) {
        students = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredStudents(students);
    setChartData(calculateChartData(chartStudents));
  }, [selectedSubject, selectedExamType, searchQuery]);

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('allExams') || '[]');
    setAllExams(storedExams);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            A high-level overview of student performance and portal activity.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-subjects">All Subjects</SelectItem>
              {subjects.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground">Across all subjects and exams</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subjects</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{subjects.length}</div>
                <p className="text-xs text-muted-foreground">Topics being taught</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3">
          <CardHeader>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle>Performance Distribution</CardTitle>
                    <CardDescription>Student scores based on selected filters.</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={{ pathname: '/dashboard/analysis', query: { view: 'performance' } }}>
                    View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                  allowDecimals={false}
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
                <Bar dataKey="count" name="Students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Exams</CardTitle>
                <CardDescription>Recently created quizzes and exams.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {allExams.slice(0, 4).map((exam, index) => (
                        <div key={index} className="flex items-center">
                            <FileText className="h-6 w-6 mr-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium leading-none">{exam.topic}</p>
                                <p className="text-xs text-muted-foreground">{exam.subject}</p>
                            </div>
                            <Badge variant={exam.type === "quiz" ? "secondary" : "outline"}>
                              {exam.type}
                            </Badge>
                        </div>
                    ))}
                </div>
                 <Button asChild className="w-full mt-6">
                  <Link href="/dashboard/questions/view">View All Exams</Link>
                </Button>
            </CardContent>
        </Card>
      </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>A glimpse of recent student performance.</CardDescription>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input 
                      type="search"
                      placeholder="Search students..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                <Button asChild>
                  <Link href={{ pathname: '/dashboard/analysis', query: { view: 'students' } }}>View All Students</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="hidden md:table-cell">Score</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right sr-only">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {filteredStudents.length > 0 ? (
                    filteredStudents.slice(0, 5).map((student, index) => (
                         <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src={`https://picsum.photos/seed/${student.name}${student.gender === 'male' ? 'boy' : 'girl'}/100/100`} />
                                      <AvatarFallback>{student.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-xs text-muted-foreground hidden md:block">{student.details.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{student.subject}</TableCell>
                            <TableCell className="hidden md:table-cell">{student.score}%</TableCell>
                            <TableCell className="text-right">
                                <Badge variant={student.status === 'Needs Help' ? 'destructive' : student.status === 'Excelling' ? 'default' : 'secondary'}>{student.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                 <Button asChild variant="ghost" size="sm">
                                    <Link href={{ pathname: '/dashboard/analysis', query: { view: 'students', student: student.name } }}>View</Link>
                                 </Button>
                            </TableCell>
                         </TableRow>
                    ))
                   ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No students found for the selected filters.
                        </TableCell>
                    </TableRow>
                   )}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}

    