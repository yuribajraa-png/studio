
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart2, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const analysisOptions = [
  {
    title: "Performance Analysis",
    description: "Overall class performance, pass rates, and question difficulty.",
    href: "/dashboard/analysis?view=performance",
    icon: BarChart2,
  },
  {
    title: "Student Analysis",
    description: "In-depth look at individual student progress and trends.",
    href: "/dashboard/analysis?view=students",
    icon: Users,
  },
  {
    title: "Exam Analysis",
    description: "Review results and student scores for a specific exam.",
    href: "/dashboard/questions/view",
    icon: FileText,
  },
];

export default function DetailedAnalysisPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Detailed Analysis</h1>
        <p className="text-muted-foreground">
          Choose a report to view detailed insights into performance, students, or exams.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {analysisOptions.map((option) => (
          <Card key={option.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <option.icon className="h-6 w-6" />
                </div>
                <CardTitle>{option.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{option.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild className="w-full">
                <Link href={option.href}>
                  View Report <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
