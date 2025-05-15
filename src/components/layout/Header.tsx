
"use client"; 

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings } from 'lucide-react'; // Replaced MessageSquareQuestion with HelpCircle
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


const NavLink = ({ href, children, icon, onClick }: { href?: string; children: React.ReactNode; icon?: React.ReactNode; onClick?: () => void }) => {
  const content = (
    <Button 
      variant="ghost" 
      className="text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 flex items-center gap-2"
      onClick={onClick}
    >
      {icon}
      {children}
    </Button>
  );
  return href ? <Link href={href} passHref>{content}</Link> : content;
};

export default function Header() {
  const { cart, removeFromCart, customerAddress, setCustomerAddress } = useCart();
  const { isLoggedIn, logout } = useAuth(); // Use auth context
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const navItems = [
    { href: '/platform-home', label: 'Home', icon: <Home size={18} /> }, 
    { href: '/post-job', label: 'Post a Job', icon: <PlusSquare size={18} /> },
    { href: '/browse-providers', label: 'Browse Services', icon: <Search size={18} /> },
    { href: '/join-as-pro', label: 'Join as Pro', icon: <Briefcase size={18} /> },
    { href: '/about', label: 'About Us', icon: <InfoIcon size={18} /> },
  ];

  const handleProceedToBooking = () => {
    if (cart.length > 0) {
      router.push('/booking-confirmation');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={isLoggedIn ? "/platform-home" : "/"} passHref>
          <Logo size="medium" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {isClient && isLoggedIn && ( 
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
                    <p className="text-sm text-muted-foreground">Your job list is empty. Add providers!</p>
                  ) : (
                    <>
                      <ul className="space-y-3 max-h-48 overflow-y-auto">
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
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        <Label htmlFor="customer-address" className="text-xs font-medium text-muted-foreground">Service Address (Optional)</Label>
                        <Input 
                          id="customer-address"
                          placeholder="Enter your address or area" 
                          value={customerAddress || ''}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <Button 
                        onClick={handleProceedToBooking} 
                        className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={cart.length === 0}
                      >
                        Proceed to Booking
                      </Button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}

          <div className="hidden md:flex items-center space-x-2">
            {isClient && isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle size={24} className="text-primary" />
                     <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/profile/edit" className="flex items-center gap-2 w-full"><Edit3 size={16}/> Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/profile/bookings" className="flex items-center gap-2 w-full"><ListOrdered size={16}/> My Bookings</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/support" className="flex items-center gap-2 w-full"><HelpCircle size={16}/> Customer Support</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/profile/feedback" className="flex items-center gap-2 w-full"><StarIcon size={16}/> Feedbacks</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/profile/security" className="flex items-center gap-2 w-full"><Shield size={16}/> Security</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 w-full text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer">
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isClient ? (
              <>
                <Link href="/login" passHref>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              // Placeholder for SSR or when isClient is false
              <>
                <Button variant="outline" disabled>Login</Button>
                <Button disabled>Sign Up</Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-2">
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
                {isClient && isLoggedIn ? (
                  <>
                    <Link href="/profile/edit" passHref><Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3"><Edit3 size={20}/>Edit Profile</Button></Link>
                    <Link href="/profile/bookings" passHref><Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3"><ListOrdered size={20}/>My Bookings</Button></Link>
                    <Link href="/support" passHref><Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3"><HelpCircle size={20}/>Support</Button></Link>
                    <Link href="/profile/feedback" passHref><Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3"><StarIcon size={20}/>Feedback</Button></Link>
                    <Link href="/profile/security" passHref><Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3"><Shield size={20}/>Security</Button></Link>
                    <Separator className="my-4 bg-border" />
                    <Button onClick={logout} variant="ghost" className="w-full justify-start text-lg py-3 gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <LogOut size={20} /> Logout
                    </Button>
                  </>
                ) : isClient ? (
                  <>
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
                  </>
                ) : null }
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
