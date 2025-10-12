"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { User, TrendingUp, TrendingDown, ChevronsRight, HelpCircle } from "lucide-react"

// Mock data, in a real app this would be fetched or calculated
const performanceData = {
    averageScore: 78.5,
    topPerformer: { name: "Bikash", score: 95 },
    lowestPerformer: { name: "Student 11", score: 15 },
    mostDifficultQuestion: { id: "Q5", topic: "Advanced Memory Management", attempts: 5, correct: 1 },
    questionStats: [
        { id: "Q1", topic: "Intro to Pointers", difficulty: "Easy", correctRate: 95 },
        { id: "Q2", topic: "Async/Await", difficulty: "Medium", correctRate: 82 },
        { id: "Q3", topic: "Data Structures", difficulty: "Medium", correctRate: 75 },
        { id: "Q4", topic: "Closures", difficulty: "Hard", correctRate: 60 },
        { id: "Q5", topic: "Advanced Memory Management", difficulty: "Hard", correctRate: 20 },
    ]
}


export function PerformanceAnalysis() {

    return (
        <div className="grid gap-8">
            <div className="grid md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="text-green-500" /> Top Performer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <User className="w-10 h-10 text-muted-foreground" />
                            <div>
                                <p className="font-bold text-lg">{performanceData.topPerformer.name}</p>
                                <p className="text-2xl font-bold text-green-500">{performanceData.topPerformer.score}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ChevronsRight /> Class Average</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{performanceData.averageScore}%</p>
                        <p className="text-muted-foreground">across all subjects and exams.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingDown className="text-red-500" /> Lowest Performer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <User className="w-10 h-10 text-muted-foreground" />
                            <div>
                                <p className="font-bold text-lg">{performanceData.lowestPerformer.name}</p>
                                <p className="text-2xl font-bold text-red-500">{performanceData.lowestPerformer.score}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HelpCircle /> Most Difficult Question</CardTitle>
                    <CardDescription>The question with the lowest correct answer rate.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Q: {performanceData.mostDifficultQuestion.topic}</p>
                        <p className="text-sm text-muted-foreground mt-2">Only <span className="font-bold text-destructive">{(performanceData.mostDifficultQuestion.correct / performanceData.mostDifficultQuestion.attempts) * 100}%</span> of students answered this correctly.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Question Performance Breakdown</CardTitle>
                    <CardDescription>Analysis of student performance on each question.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Question ID</TableHead>
                                <TableHead>Topic</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead className="text-right">Correct Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {performanceData.questionStats.map(q => (
                                <TableRow key={q.id}>
                                    <TableCell className="font-medium">{q.id}</TableCell>
                                    <TableCell>{q.topic}</TableCell>
                                    <TableCell>
                                        <Badge variant={q.difficulty === 'Hard' ? 'destructive' : q.difficulty === 'Easy' ? 'secondary' : 'outline'}>
                                            {q.difficulty}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{q.correctRate}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
