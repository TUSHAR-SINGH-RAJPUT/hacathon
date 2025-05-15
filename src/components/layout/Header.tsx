
"use client"; // Add this for client-side hooks like useCart

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase } from 'lucide-react'; // Added Briefcase
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext'; // Import useCart
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';


const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 flex items-center gap-2">
      {icon}
      {children}
    </Button>
  </Link>
);

export default function Header() {
  const { cart, removeFromCart } = useCart(); // Use the cart context

  const navItems = [
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: '/post-job', label: 'Post a Job', icon: <PlusSquare size={18} /> },
    { href: '/browse-providers', label: 'Browse Services', icon: <Search size={18} /> },
    { href: '/join-as-pro', label: 'Join as Pro', icon: <Briefcase size={18} /> }, // New Item
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

        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary hover:bg-primary/10">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground">
                    {cart.length}
                  </Badge>
                )}
                <span className="sr-only">Job List</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 z-50 mr-4 mt-1 bg-card text-card-foreground shadow-xl rounded-lg">
              <div className="p-4">
                <h4 className="font-medium text-lg mb-3 pb-2 border-b border-border">Your Job List</h4>
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your job list is empty. Add providers you're interested in!</p>
                ) : (
                  <ul className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                      <li key={item.id} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-2 overflow-hidden">
                           <Image 
                            src={item.profileImageUrl || `https://placehold.co/40x40.png`} 
                            alt={item.name} 
                            width={32} 
                            height={32} 
                            className="rounded-full" 
                          />
                          <span className="text-sm font-medium truncate text-foreground">{item.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                          <X size={16} />
                          <span className="sr-only">Remove {item.name}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                {cart.length > 0 && (
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Proceed to Booking</Button>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login" passHref>
              <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                <UserCircle size={18} className="mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden ml-2"> {/* Ensure some spacing for mobile cart icon */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-card text-card-foreground">
              <SheetHeader className="mb-6 pb-4 border-b border-border">
                <SheetTitle>
                  <Logo size="medium" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-3">
                {navItems.map(item => (
                  <Link key={item.href} href={item.href} passHref>
                    <Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3 text-foreground hover:text-primary hover:bg-primary/10">
                       {item.icon} {item.label}
                    </Button>
                  </Link>
                ))}
                 <Separator className="my-4 bg-border" />
                 <Link href="/login" passHref>
                   <Button variant="outline" className="w-full justify-center text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                      <UserCircle size={20} /> Login
                   </Button>
                 </Link>
                 <Link href="/signup" passHref>
                   <Button className="w-full justify-center text-lg py-3 gap-3 bg-primary text-primary-foreground hover:bg-primary/90">
                      Sign Up
                   </Button>
                 </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
