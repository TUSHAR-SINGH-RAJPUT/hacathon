import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';


const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 flex items-center gap-2">
      {icon}
      {children}
    </Button>
  </Link>
);

export default function Header() {
  const navItems = [
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: '/post-job', label: 'Post a Job', icon: <PlusSquare size={18} /> },
    { href: '/browse-providers', label: 'Browse Services', icon: <Search size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" passHref>
          <Logo size="medium" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map(item => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <UserCircle size={18} className="mr-2" />
            Login
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Logo size="medium" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-3">
                {navItems.map(item => (
                  <Link key={item.href} href={item.href} passHref>
                    <Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3">
                       {item.icon} {item.label}
                    </Button>
                  </Link>
                ))}
                 <Separator className="my-4" />
                 <Button variant="outline" className="w-full justify-center text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    <UserCircle size={20} /> Login
                 </Button>
                 <Button className="w-full justify-center text-lg py-3 gap-3 bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Dummy Separator component if not using shadcn/ui one or for specific styling
const Separator = ({ className }: { className?: string }) => (
  <hr className={`border-border ${className}`} />
);
