
"use client"; 

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
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
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  currentPath: string;
}

// Memoize NavLink
const NavLink = React.memo(({ href, children, icon, onClick, className, currentPath }: NavLinkProps) => {
  const isActive = href ? currentPath === href : false;
  
  const content = (
    <Button 
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "text-sm font-medium flex items-center gap-2 w-full justify-start py-3 text-lg md:text-sm md:justify-center md:py-2 md:text-base",
        isActive ? "text-primary font-semibold bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/10",
        className
      )}
      onClick={onClick}
    >
      {icon}
      {children}
    </Button>
  );
  return href ? <Link href={href} passHref>{content}</Link> : content;
});
NavLink.displayName = 'NavLink';


// Hardcoded English translations for header
const t = {
    navHome: "Home",
    navPostJob: "Post a Job",
    navBrowseServices: "Browse Services",
    navJoinAsPro: "Join as Pro",
    navAboutUs: "About Us",
    navLogin: "Login",
    navSignUp: "Sign Up",
    navLogout: "Logout",
    myAccount: "My Account",
    editProfile: "Edit Profile",
    myBookings: "My Bookings",
    customerSupport: "Customer Support",
    feedbacks: "Feedbacks",
    security: "Security",
    jobList: "Your Job List",
    jobListEmpty: "Your job list is empty. Add providers!",
    serviceAddressOptional: "Service Address (Optional)",
    enterAddressPlaceholder: "Enter your address or area",
    proceedToBooking: "Proceed to Booking",
    toggleMenu: "Toggle menu"
};


export default function Header() {
  const { cart, removeFromCart, customerAddress, setCustomerAddress } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); 
  
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); 

  useEffect(() => {
    setIsClient(true); 
  }, []);

  // Memoize navItems
  const navItems = useMemo(() => [
    { href: `/platform-home`, label: t.navHome, icon: <Home size={18} /> }, 
    { href: `/post-job`, label: t.navPostJob, icon: <PlusSquare size={18} /> },
    { href: `/browse-providers`, label: t.navBrowseServices, icon: <Search size={18} /> },
    { href: `/join-as-pro`, label: t.navJoinAsPro, icon: <Briefcase size={18} /> },
    { href: `/about`, label: t.navAboutUs, icon: <InfoIcon size={18} /> },
  ], []); // t is a constant, so it's not needed in dependency array

  const handleProceedToBooking = () => {
    if (cart.length > 0) {
      router.push(`/booking-confirmation`);
    }
  };
  
  // Memoize profileNavItems
  const profileNavItems = useMemo(() => [
    { href: `/profile/edit`, label: t.editProfile, icon: <Edit3 size={16}/> },
    { href: `/profile/bookings`, label: t.myBookings, icon: <ListOrdered size={16}/> },
    { href: `/support`, label: t.customerSupport, icon: <HelpCircle size={16}/> },
    { href: `/profile/feedback`, label: t.feedbacks, icon: <StarIcon size={16}/> },
    { href: `/profile/security`, label: t.security, icon: <Shield size={16}/> },
  ], []); // t is a constant

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={isLoggedIn ? `/platform-home` : `/`} passHref>
          <Logo size="medium" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => (
            <NavLink key={item.label} href={item.href} icon={item.icon} currentPath={pathname}>
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
                  <span className="sr-only">{t.jobList}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-50 mr-4 mt-1 bg-card text-card-foreground shadow-xl rounded-lg">
                <div className="p-4">
                  <h4 className="font-medium text-lg mb-3 pb-2 border-b border-border">{t.jobList}</h4>
                  {cart.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.jobListEmpty}</p>
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
                        <Label htmlFor="customer-address" className="text-xs font-medium text-muted-foreground">{t.serviceAddressOptional}</Label>
                        <Input 
                          id="customer-address"
                          placeholder={t.enterAddressPlaceholder}
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
                        {t.proceedToBooking}
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
                     <span className="sr-only">{t.myAccount}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                  <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {profileNavItems.map(item => (
                     <DropdownMenuItem key={item.label} asChild><Link href={item.href} className="flex items-center gap-2 w-full">{item.icon} {item.label}</Link></DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 w-full text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer">
                    <LogOut size={16} /> {t.navLogout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isClient ? (
              <>
                <Link href={`/login`} passHref>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    {t.navLogin}
                  </Button>
                </Link>
                <Link href={`/signup`} passHref>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t.navSignUp}
                  </Button>
                </Link>
              </>
            ) : ( 
              <>
                <Button variant="outline" disabled>{t.navLogin}</Button>
                <Button disabled>{t.navSignUp}</Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t.toggleMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-card text-card-foreground">
              <SheetHeader className="mb-6 pb-4 border-b border-border">
                <SheetTitle>
                  <Logo size="medium" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <Link key={item.label} href={item.href} passHref>
                      <SheetClose asChild>
                          <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={pathname}>
                          {item.label}
                          </NavLink>
                      </SheetClose>
                    </Link>
                ))}
                <Separator className="my-3 bg-border" />
                {isClient && isLoggedIn ? (
                  <>
                    {profileNavItems.map(item => (
                        <Link key={item.label} href={item.href} passHref>
                           <SheetClose asChild>
                                <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={pathname}>
                                {item.label}
                                </NavLink>
                            </SheetClose>
                        </Link>
                    ))}
                    <Separator className="my-3 bg-border" />
                    <SheetClose asChild>
                        <Button onClick={logout} variant="ghost" className="w-full justify-start text-lg py-3 gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <LogOut size={20} /> {t.navLogout}
                        </Button>
                    </SheetClose>
                  </>
                ) : isClient ? (
                  <>
                    <SheetClose asChild>
                        <Link href={`/login`} passHref>
                        <Button variant="outline" className="w-full justify-center text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                            <UserCircle size={20} /> {t.navLogin}
                        </Button>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href={`/signup`} passHref>
                        <Button className="w-full justify-center text-lg py-3 gap-3 bg-primary text-primary-foreground hover:bg-primary/90">
                            {t.navSignUp}
                        </Button>
                        </Link>
                    </SheetClose>
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

    