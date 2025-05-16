
"use client";

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings, Menu, Mic, MessageCircle } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose, // Added DialogClose for explicit close button
} from "@/components/ui/dialog";
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
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { cn } from "@/lib/utils";
// Removed useToast as it's no longer used for voice assist

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  currentPath: string;
}

const NavLink = React.memo(({ href, children, icon, onClick, className, currentPath }: NavLinkProps) => {
  const isActive = href ? currentPath === href || (href === '/platform-home' && currentPath === `/`) : false;
  const linkHref = href || '#';

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
  return href ? <Link href={linkHref} passHref>{content}</Link> : content;
});
NavLink.displayName = 'NavLink';


export default function Header() {
  const { cart, removeFromCart, customerAddress, setCustomerAddress } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isVoiceDialogVisible, setIsVoiceDialogVisible] = useState(false);
  const [simulatedVoiceResponse, setSimulatedVoiceResponse] = useState<string | null>(null);
  const [showNavigationButton, setShowNavigationButton] = useState<{text: string, path: string} | null>(null);


  useEffect(() => {
    setIsClient(true);
  }, []);

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
    toggleMenu: "Toggle Menu",
    voiceAssistLabel: "Voice Assistant",

    // Voice Assistant Dialog translations
    voiceAssistDialogTitle: "Voice Assistant (Simulated)",
    voiceAssistDialogDescription: "How can I help you today? Click a command or imagine speaking it.",
    voiceAssistListening: "Listening...",
    voiceAssistCommandFindPlumber: "Find a plumber",
    voiceAssistCommandPostJobHelp: "How do I post a job?",
    voiceAssistCommandJoinAsProInfo: "Tell me about joining as a professional",
    
    voiceResponseFindPlumberNavigating: "Okay, I'll take you to the provider listings filtered for plumbers.",
    voiceResponsePostJobHelp: "To post a job, click on 'Post a Job' in the main menu. You'll describe your task, set your location, and professionals will find you. Would you like to go there now?",
    voiceResponseJoinAsProInfo: "To join as a professional, visit the 'Join as Pro' page. You can create a profile, list your services, and get verified to connect with clients. Want to see more?",
    
    voiceActionGoToPostJob: "Go to Post Job page",
    voiceActionGoToJoinAsPro: "Go to Join as Pro page",
    voiceActionGoToBrowsePlumbers: "Browse Plumbers", // Not directly used as a button label, but for context

    removeProvider: (name: string) => `Remove ${name}`,
    close: "Close",
  };

  const navItems = useMemo(() => [
    { href: `/platform-home`, label: t.navHome, icon: <Home size={18} /> },
    { href: `/post-job`, label: t.navPostJob, icon: <PlusSquare size={18} /> },
    { href: `/browse-providers`, label: t.navBrowseServices, icon: <Search size={18} /> },
    { href: `/join-as-pro`, label: t.navJoinAsPro, icon: <Briefcase size={18} /> },
    { href: `/about`, label: t.navAboutUs, icon: <InfoIcon size={18} /> },
  ], [t.navHome, t.navPostJob, t.navBrowseServices, t.navJoinAsPro, t.navAboutUs]);

  const handleProceedToBooking = () => {
    if (cart.length > 0) {
      router.push(`/booking-confirmation`);
    }
  };

  const profileNavItems = useMemo(() => [
    { href: `/profile/edit`, label: t.editProfile, icon: <Edit3 size={16}/> },
    { href: `/profile/bookings`, label: t.myBookings, icon: <ListOrdered size={16}/> },
    { href: `/support`, label: t.customerSupport, icon: <HelpCircle size={16}/> },
    { href: `/profile/feedback`, label: t.feedbacks, icon: <StarIcon size={16}/> },
    { href: `/profile/security`, label: t.security, icon: <Shield size={16}/> },
  ], [t.editProfile, t.myBookings, t.customerSupport, t.feedbacks, t.security]);

  const openVoiceDialog = useCallback(() => {
    setSimulatedVoiceResponse(null); // Reset response
    setShowNavigationButton(null); // Reset navigation button
    setIsVoiceDialogVisible(true);
  }, []);

  const handleVoiceCommand = (command: string) => {
    setSimulatedVoiceResponse(null); // Clear previous response
    setShowNavigationButton(null); // Clear previous nav button

    if (command === "findPlumber") {
      setSimulatedVoiceResponse(t.voiceResponseFindPlumberNavigating);
      // Simulate a slight delay before navigation to allow user to read response
      setTimeout(() => {
        router.push(`/browse-providers?service=Plumbing`);
        setIsVoiceDialogVisible(false);
      }, 1500);
    } else if (command === "postJobHelp") {
      setSimulatedVoiceResponse(t.voiceResponsePostJobHelp);
      setShowNavigationButton({text: t.voiceActionGoToPostJob, path: "/post-job"});
    } else if (command === "joinAsProInfo") {
      setSimulatedVoiceResponse(t.voiceResponseJoinAsProInfo);
      setShowNavigationButton({text: t.voiceActionGoToJoinAsPro, path: "/join-as-pro"});
    }
  };
  
  const handleDialogNavigation = (path: string) => {
    router.push(path);
    setIsVoiceDialogVisible(false);
  };


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={isLoggedIn ? `/platform-home` : `/`} passHref>
            <Logo size="medium" />
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href} icon={item.icon} currentPath={pathname || '/'}>
                {item.label}
              </NavLink>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={openVoiceDialog}
              className="text-foreground hover:text-primary hover:bg-primary/10 ml-1 lg:ml-2"
              aria-label={t.voiceAssistLabel}
            >
              <Mic size={20} />
            </Button>
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
                                <span className="sr-only">{t.removeProvider(item.name)}</span>
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
                    <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:text-primary hover:bg-primary/10">
                      <UserCircle size={24} />
                       <span className="sr-only">{t.myAccount}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                    <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profileNavItems.map(item => (
                       <DropdownMenuItem key={item.label} asChild>
                         <Link href={item.href} className="flex items-center gap-2 w-full">{item.icon} {item.label}</Link>
                       </DropdownMenuItem>
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
                     <SheetClose asChild key={item.label}>
                      <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={pathname || '/'}>
                        {item.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button onClick={openVoiceDialog} variant="ghost" className="w-full justify-start text-lg py-3 gap-3 text-foreground hover:text-primary hover:bg-primary/10">
                      <Mic size={20} /> {t.voiceAssistLabel}
                    </Button>
                  </SheetClose>
                  <Separator className="my-3 bg-border" />

                  {isClient && isLoggedIn ? (
                    <>
                      {profileNavItems.map(item => (
                         <SheetClose asChild key={item.label}>
                          <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={pathname || '/'}>
                            {item.label}
                          </NavLink>
                         </SheetClose>
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

      <Dialog open={isVoiceDialogVisible} onOpenChange={setIsVoiceDialogVisible}>
        <DialogContent className="sm:max-w-md bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mic className="text-primary" /> {t.voiceAssistDialogTitle}
            </DialogTitle>
            <DialogDescription>
              {t.voiceAssistDialogDescription}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 p-4 bg-background rounded-md min-h-[60px] flex items-center justify-center">
            {simulatedVoiceResponse ? (
              <p className="text-sm text-foreground">{simulatedVoiceResponse}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">{t.voiceAssistListening}</p>
            )}
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleVoiceCommand('findPlumber')}>
              <Search className="mr-2 h-4 w-4" /> {t.voiceAssistCommandFindPlumber}
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleVoiceCommand('postJobHelp')}>
              <MessageCircle className="mr-2 h-4 w-4" /> {t.voiceAssistCommandPostJobHelp}
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleVoiceCommand('joinAsProInfo')}>
              <Briefcase className="mr-2 h-4 w-4" /> {t.voiceAssistCommandJoinAsProInfo}
            </Button>
          </div>

          {showNavigationButton && (
            <Button 
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/80" 
              onClick={() => handleDialogNavigation(showNavigationButton.path)}
            >
              {showNavigationButton.text} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t.close}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

    