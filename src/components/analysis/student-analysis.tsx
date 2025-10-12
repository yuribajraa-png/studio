"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const allStudents = [
  { 
    name: 'Aarav', 
    gender: 'male',
    details: { phone: '9812345670', email: 'aarav.sharma@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 85}, {term: 'Mid', score: 88}, {term: 'Final', score: 90}],
        'Network Systems': [{term: 'First', score: 70}, {term: 'Mid', score: 75}, {term: 'Final', score: 78}],
    }
  },
  { 
    name: 'Priya', 
    gender: 'female',
    details: { phone: '9809876543', email: 'priya.kaur@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 92}, {term: 'Mid', score: 95}, {term: 'Final', score: 98}],
        'Distributed Computing': [{term: 'First', score: 88}, {term: 'Mid', score: 90}, {term: 'Final', score: 91}],
    }
  },
  { 
    name: 'Rohan', 
    gender: 'male',
    details: { phone: '9845678901', email: 'rohan.thapa@test.com' },
    performance: {
        'Network Systems': [{term: 'First', score: 78}, {term: 'Mid', score: 82}, {term: 'Final', score: 80}],
    }
  },
  { 
    name: 'Sameer', 
    gender: 'male',
    details: { phone: '9865432109', email: 'sameer.acharya@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 64}, {term: 'Mid', score: 60}, {term: 'Final', score: 68}],
    }
  },
  { 
    name: 'Anjali', 
    gender: 'female',
    details: { phone: '9811223344', email: 'anjali.gurung@test.com' },
    performance: {
        'Network Systems': [{term: 'First', score: 88}, {term: 'Mid', score: 85}, {term: 'Final', score: 90}],
    }
  },
  { 
    name: 'Bikash', 
    gender: 'male',
    details: { phone: '9855667788', email: 'bikash.rai@test.com' },
    performance: {
        'Distributed Computing': [{term: 'First', score: 95}, {term: 'Mid', score: 92}, {term: 'Final', score: 96}],
    }
  },
  { 
    name: 'Sita', 
    gender: 'female',
    details: { phone: '9844332211', email: 'sita.lama@test.com' },
    performance: {
        'Distributed Computing': [{term: 'First', score: 72}, {term: 'Mid', score: 78}, {term: 'Final', score: 75}],
    }
  },
  { 
    name: 'Nitesh', 
    gender: 'male',
    details: { phone: '9819283746', email: 'nitesh.yadav@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 79}, {term: 'Mid', score: 81}, {term: 'Final', score: 85}],
    }
  },
  { 
    name: 'Sunita', 
    gender: 'female',
    details: { phone: '9801928374', email: 'sunita.shrestha@test.com' },
    performance: {
        'Network Systems': [{term: 'First', score: 81}, {term: 'Mid', score: 84}, {term: 'Final', score: 80}],
    }
  },
  { 
    name: 'Rajesh', 
    gender: 'male',
    details: { phone: '9860192837', email: 'rajesh.magar@test.com' },
    performance: {
        'Distributed Computing': [{term: 'First', score: 68}, {term: 'Mid', score: 65}, {term: 'Final', score: 71}],
    }
  },
    { 
    name: 'Student 11', 
    gender: 'male',
    details: { phone: '1111111111', email: 'student11@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 15}, {term: 'Mid', score: 25}, {term: 'Final', score: 20}],
    }
  },
  { 
    name: 'Student 12', 
    gender: 'female',
    details: { phone: '2222222222', email: 'student12@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 35}, {term: 'Mid', score: 40}, {term: 'Final', score: 45}],
    }
  },
  { 
    name: 'Student 13', 
    gender: 'male',
    details: { phone: '3333333333', email: 'student13@test.com' },
    performance: {
        'Network Systems': [{term: 'First', score: 55}, {term: 'Mid', score: 60}, {term: 'Final', score: 58}],
    }
  },
  { 
    name: 'Student 14', 
    gender: 'female',
    details: { phone: '4444444444', email: 'student14@test.com' },
    performance: {
        'Distributed Computing': [{term: 'First', score: 75}, {term: 'Mid', score: 78}, {term: 'Final', score: 80}],
    }
  },
  { 
    name: 'Student 15', 
    gender: 'male',
    details: { phone: '5555555555', email: 'student15@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 89}, {term: 'Mid', score: 91}, {term: 'Final', score: 93}],
    }
  },
  { 
    name: 'Kiran', 
    gender: 'male',
    details: { phone: '6666666666', email: 'kiran@test.com' },
    performance: {
        'Network Systems': [{term: 'First', score: 91}, {term: 'Mid', score: 93}, {term: 'Final', score: 95}],
    }
  },
  { 
    name: 'Manish', 
    gender: 'male',
    details: { phone: '7777777777', email: 'manish@test.com' },
    performance: {
        'Distributed Computing': [{term: 'First', score: 58}, {term: 'Mid', score: 62}, {term: 'Final', score: 60}],
    }
  },
  { 
    name: 'Gita', 
    gender: 'female',
    details: { phone: '8888888888', email: 'gita@test.com' },
    performance: {
        'Data Mining': [{term: 'First', score: 98}, {term: 'Mid', score: 99}, {term: 'Final', score: 100}],
    }
  },
  { 
    name: 'Hari', 
    gender: 'male',
    details: { phone: '9999999999', email: 'hari@test.com' },
    performance: {
        'Network Systems': [{term: 'First', score: 45}, {term: 'Mid', score: 50}, {term: 'Final', score: 48}],
    }
  },
  { 
    name: 'Srijana', 
    gender: 'female',
    details: { phone: '1010101010', email: 'srijana@test.com' },
    performance: {
        'Distributed Computing': [{term: 'First', score: 82}, {term: 'Mid', score: 85}, {term: 'Final', score: 88}],
    }
  },
];


export function StudentAnalysis({ selectedStudent }: { selectedStudent: string | null }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (selectedStudent) {
            const index = allStudents.findIndex(s => s.name === selectedStudent);
            if (index !== -1) {
                setCurrentIndex(index);
            }
        }
    }, [selectedStudent]);

    const student = allStudents[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 ? allStudents.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev === allStudents.length - 1 ? 0 : prev + 1));
    };

    const trendData = student.performance[Object.keys(student.performance)[0]].map((_, termIndex) => {
        const dataPoint: {term: string, [key: string]: number | string} = { term: ['First Term', 'Mid Term', 'Final Term'][termIndex]};
        Object.keys(student.performance).forEach(subject => {
            const performanceRecord = student.performance[subject as keyof typeof student.performance][termIndex];
            if (performanceRecord) {
                dataPoint[subject] = performanceRecord.score;
            }
        });
        return dataPoint;
    });


    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={`https://picsum.photos/seed/${student.name}${student.gender === 'male' ? 'boy' : 'girl'}/150/150`} />
                                <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-3xl">{student.name}</CardTitle>
                                <CardDescription>{student.details.email} | {student.details.phone}</CardDescription>
                            </div>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={goToPrevious}><ChevronLeft /></Button>
                            <span className="text-sm text-muted-foreground">{currentIndex + 1} of {allStudents.length}</span>
                            <Button variant="outline" size="icon" onClick={goToNext}><ChevronRight /></Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Term-wise Scores</CardTitle>
                        <CardDescription>Detailed scores in each subject per term.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>First Term</TableHead>
                                    <TableHead>Mid Term</TableHead>
                                    <TableHead>Final Term</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.keys(student.performance).map(subject => (
                                    <TableRow key={subject}>
                                        <TableCell className="font-medium">{subject}</TableCell>
                                        <TableCell>{student.performance[subject as keyof typeof student.performance].find(p => p.term === 'First')?.score || 'N/A'}</TableCell>
                                        <TableCell>{student.performance[subject as keyof typeof student.performance].find(p => p.term === 'Mid')?.score || 'N/A'}</TableCell>
                                        <TableCell>{student.performance[subject as keyof typeof student.performance].find(p => p.term === 'Final')?.score || 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Performance Trend</CardTitle>
                        <CardDescription>Score progression across different terms.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="term" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ 
                                        background: 'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                    }}
                                />
                                <Legend />
                                {Object.keys(student.performance).map((subject, i) => (
                                    <Line key={subject} type="monotone" dataKey={subject} stroke={`hsl(var(--chart-${(i % 5) + 1}))`} strokeWidth={2} />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

    