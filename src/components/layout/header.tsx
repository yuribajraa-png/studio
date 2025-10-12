"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, HelpCircle, FileText, User, LogOut, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/dashboard", label: "Analytics", icon: BarChart2 },
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
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.6 13.44L15.5 14l1.1-1.44-1.44-1.1L14 12.5l-1.44-1.1-1.1 1.44L12.5 14l-1.1 1.44 1.44 1.1L14 15.5l1.44 1.1 1.16-1.44zM8 8.5l1.5-1.5L11 8.5 9.5 10 8 8.5zm8 0l1.5-1.5L19 8.5 17.5 10 16 8.5z" />
            </svg>
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
