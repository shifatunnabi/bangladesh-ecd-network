"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const aboutLinks = [
  { title: "About Us", href: "/about" },
  { title: "Committee", href: "/about/committee" },
  { title: "Secretariat", href: "/about/secretariat" },
];

const memberLinks = [
  { title: "Our Members", href: "/members" },
  { title: "Join Us", href: "/members/join" },
];

const resourceLinks = [
  { title: "All Resources", href: "/resources" },
  { title: "Research & Reports", href: "/resources/research-reports" },
  { title: "Voices", href: "/resources/voices" },
  { title: "Newsletter", href: "/resources/newsletter" },
  { title: "Policies & Links", href: "/resources/policies" },
];

const mediaLinks = [
  { title: "Media Hub", href: "/media" },
  { title: "News", href: "/media/news" },
  { title: "Events", href: "/media/events" },
  { title: "Conference", href: "/media/conference" },
  { title: "Gallery", href: "/media/gallery" },
];

const learningLinks = [
  { title: "Learning Center", href: "/learning" },
  { title: "Featured Courses", href: "/learning/courses" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleMouseEnter = (item: string) => {
    // Clear any pending hide timeout when entering a dropdown
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    // Set a 2-second delay before hiding the dropdown
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      hideTimeoutRef.current = null;
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/logobencd-HusWl4EXf6z8GeA5kD9wuSDNRS7b4T.png"
              height={40}
              width={40}
              alt="Bangladesh ECD Network Logo"
            />
            <span className="font-bold text-lg text-primary">
              Bangladesh ECD Network
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {/* About Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                About
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              {hoveredItem === "about" && (
                <div className="absolute top-full left-0 mt-1 w-[500px] bg-popover border border-border rounded-md shadow-lg z-50 p-4 custom-dropdown dropdown-enter dropdown-enter-active">
                  <div className="grid grid-cols-2 gap-3">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="text-sm font-medium">{link.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Members Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("members")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                Members
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              {hoveredItem === "members" && (
                <div className="absolute top-full left-0 mt-1 w-[400px] bg-popover border border-border rounded-md shadow-lg z-50 p-4 custom-dropdown dropdown-enter dropdown-enter-active">
                  <div className="space-y-1">
                    {memberLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="text-sm font-medium">{link.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                Resources
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              {hoveredItem === "resources" && (
                <div className="absolute top-full left-0 mt-1 w-[600px] bg-popover border border-border rounded-md shadow-lg z-50 p-4 custom-dropdown dropdown-enter dropdown-enter-active">
                  <div className="grid grid-cols-2 gap-3">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="text-sm font-medium">{link.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Media Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("media")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                Media
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              {hoveredItem === "media" && (
                <div className="absolute top-full left-0 mt-1 w-[600px] bg-popover border border-border rounded-md shadow-lg z-50 p-4 custom-dropdown dropdown-enter dropdown-enter-active">
                  <div className="grid grid-cols-2 gap-3">
                    {mediaLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="text-sm font-medium">{link.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Learning Link */}
            <Link
              href="https://lms-edu-three.vercel.app/"
              className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Learning
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild>
              <Link href="/membership">Join Network</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu
                  className={`h-5 w-5 transition-all duration-200 ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`h-5 w-5 absolute transition-all duration-200 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">
                      BD
                    </span>
                  </div>
                  <span className="font-semibold text-primary">
                    ECD Network
                  </span>
                </div>
              </div>

              <nav className="flex flex-col p-6 space-y-2">
                {/* About Section */}
                <Collapsible
                  open={openSections.includes("about")}
                  onOpenChange={() => toggleSection("about")}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
                    About
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openSections.includes("about") ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-4">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Members Section */}
                <Collapsible
                  open={openSections.includes("members")}
                  onOpenChange={() => toggleSection("members")}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
                    Members
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openSections.includes("members") ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-4">
                    {memberLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Resources Section */}
                <Collapsible
                  open={openSections.includes("resources")}
                  onOpenChange={() => toggleSection("resources")}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
                    Resources
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openSections.includes("resources") ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-4">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Media Section */}
                <Collapsible
                  open={openSections.includes("media")}
                  onOpenChange={() => toggleSection("media")}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
                    Media
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openSections.includes("media") ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-4">
                    {mediaLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Learning Link */}
                <Link
                  href="https://lms-edu-three.vercel.app/"
                  className="block p-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Learning
                </Link>

                {/* Direct Navigation Links */}
                <div className="pt-4 border-t space-y-2">
                  <Link
                    href="/contact"
                    className="block p-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Improved CTA Button Styling */}
                <div className="pt-6">
                  <Button asChild className="w-full h-12 text-base font-medium">
                    <Link href="/membership" onClick={() => setIsOpen(false)}>
                      Join Network
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
