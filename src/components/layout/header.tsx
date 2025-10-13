"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, HelpCircle, FileText, User, LogOut, Menu, ChevronDown, PieChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/dashboard", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/analysis", label: "Detailed Analysis", icon: PieChart },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
];

export function Header() {
  const pathname = usePathname();

  const isQuestionsActive = pathname.startsWith("/dashboard/questions");

  const renderNavLinks = (isMobile = false) => (
    <>
      {navLinks.map((link) => {
        const isActive =
          link.href === "/dashboard"
            ? pathname === link.href
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent hover:text-accent-foreground",
              isMobile && "text-base w-full justify-start"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
      
      {isMobile ? (
         <>
          <Link href="/dashboard/questions/new" className={cn("flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-base w-full justify-start", pathname === "/dashboard/questions/new" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground")}>
            <HelpCircle className="h-4 w-4" /> New Exam/Quiz
          </Link>
          <Link href="/dashboard/questions/view" className={cn("flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-base w-full justify-start", pathname === "/dashboard/questions/view" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground")}>
            <FileText className="h-4 w-4" /> View Exams
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isQuestionsActive
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Questions</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/questions/new">New Exam/Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/questions/view">View Exams</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6 max-w-7xl">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            </div>
            <span className="font-bold text-lg font-headline">Reviso</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-2 text-sm">
          {renderNavLinks()}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4 mt-6">
                  {renderNavLinks(true)}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
