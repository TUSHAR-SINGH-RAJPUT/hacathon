
// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
"use client"; 

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings, Globe } from 'lucide-react';
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";

const i18nConfig = {
  locales: ['en', 'hi', 'kn'],
  defaultLocale: 'en',
};

const NavLink = ({ href, children, icon, onClick, className }: { href?: string; children: React.ReactNode; icon?: React.ReactNode; onClick?: () => void, className?: string }) => {
  const content = (
    <Button 
      variant="ghost" 
      className={cn("text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 flex items-center gap-2", className)}
      onClick={onClick}
    >
      {icon}
      {children}
    </Button>
  );
  return href ? <Link href={href} passHref>{content}</Link> : content;
};

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const { cart, removeFromCart, customerAddress, setCustomerAddress } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const currentPathname = usePathname(); 
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); 

  const translations = {
    en: {
      navHome: "Home", navPostJob: "Post a Job", navBrowseServices: "Browse Services",
      navJoinAsPro: "Join as Pro", navAboutUs: "About Us", navLogin: "Login",
      navSignUp: "Sign Up", navLogout: "Logout", myAccount: "My Account",
      editProfile: "Edit Profile", myBookings: "My Bookings", customerSupport: "Customer Support",
      feedbacks: "Feedbacks", security: "Security", language: "Language",
      english: "English", hindi: "Hindi", kannada: "Kannada", jobList: "Your Job List",
      jobListEmpty: "Your job list is empty. Add providers!", serviceAddressOptional: "Service Address (Optional)",
      enterAddressPlaceholder: "Enter your address or area", proceedToBooking: "Proceed to Booking"
    },
    hi: {
      navHome: "होम", navPostJob: "काम पोस्ट करें", navBrowseServices: "सेवाएँ ब्राउज़ करें",
      navJoinAsPro: "प्रो के रूप में जुड़ें", navAboutUs: "हमारे बारे में", navLogin: "लॉग इन करें",
      navSignUp: "साइन अप करें", navLogout: "लॉग आउट", myAccount: "मेरा खाता",
      editProfile: "प्रोफ़ाइल संपादित करें", myBookings: "मेरी बुकिंग", customerSupport: "ग्राहक सहायता",
      feedbacks: "प्रतिक्रियाएँ", security: "सुरक्षा", language: "भाषा",
      english: "English", hindi: "हिंदी", kannada: "ಕನ್ನಡ", jobList: "आपकी कार्य सूची",
      jobListEmpty: "आपकी कार्य सूची खाली है। प्रदाताओं को जोड़ें!", serviceAddressOptional: "सेवा पता (वैकल्पिक)",
      enterAddressPlaceholder: "अपना पता या क्षेत्र दर्ज करें", proceedToBooking: "बुकिंग के लिए आगे बढ़ें"
    },
    kn: {
      navHome: "ಮುಖಪುಟ", navPostJob: "ಕೆಲಸ ಪೋಸ್ಟ್ ಮಾಡಿ", navBrowseServices: "ಸೇವೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
      navJoinAsPro: "ವೃತ್ತಿಪರರಾಗಿ ಸೇರಿ", navAboutUs: "ನಮ್ಮ ಬಗ್ಗೆ", navLogin: "ಲಾಗಿನ್ ಮಾಡಿ",
      navSignUp: "ಸೈನ್ ಅಪ್ ಮಾಡಿ", navLogout: "ಲಾಗ್ ಔಟ್", myAccount: "ನನ್ನ ಖಾತೆ",
      editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ", myBookings: "ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು", customerSupport: "ಗ್ರಾಹಕ ಬೆಂಬಲ",
      feedbacks: "ಪ್ರತಿಕ್ರಿಯೆಗಳು", security: "ಭದ್ರತೆ", language: "ಭಾಷೆ",
      english: "English", hindi: "हिंदी", kannada: "ಕನ್ನಡ", jobList: "ನಿಮ್ಮ ಕೆಲಸದ ಪಟ್ಟಿ",
      jobListEmpty: "ನಿಮ್ಮ ಕೆಲಸದ ಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ. ಪೂರೈಕೆದಾರರನ್ನು ಸೇರಿಸಿ!", serviceAddressOptional: "ಸೇವಾ ವಿಳಾಸ (ಐಚ್ಛಿಕ)",
      enterAddressPlaceholder: "ನಿಮ್ಮ ವಿಳಾಸ ಅಥವಾ ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ", proceedToBooking: "ಬುಕಿಂಗ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ"
    }
  };
  const t = translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const navItems = [
    { href: `/${locale}/platform-home`, label: t.navHome, icon: <Home size={18} /> }, 
    { href: `/${locale}/post-job`, label: t.navPostJob, icon: <PlusSquare size={18} /> },
    { href: `/${locale}/browse-providers`, label: t.navBrowseServices, icon: <Search size={18} /> },
    { href: `/${locale}/join-as-pro`, label: t.navJoinAsPro, icon: <Briefcase size={18} /> },
    { href: `/${locale}/about`, label: t.navAboutUs, icon: <InfoIcon size={18} /> },
  ];

  const handleProceedToBooking = () => {
    if (cart.length > 0) {
      router.push(`/${locale}/booking-confirmation`);
    }
  };
  
  const getPathWithoutLocale = useCallback((pathname: string) => {
    const { locales } = i18nConfig;
    const segments = pathname.split('/');
    if (segments.length > 1 && locales.includes(segments[1])) {
      const path = '/' + segments.slice(2).join('/');
      return path === '//' ? '/' : (path || '/'); 
    }
    return pathname || '/';
  }, []);

  const pathWithoutLocale = getPathWithoutLocale(currentPathname);

  const profileNavItems = [
    { href: `/${locale}/profile/edit`, label: t.editProfile, icon: <Edit3 size={16}/> },
    { href: `/${locale}/profile/bookings`, label: t.myBookings, icon: <ListOrdered size={16}/> },
    { href: `/${locale}/support`, label: t.customerSupport, icon: <HelpCircle size={16}/> },
    { href: `/${locale}/profile/feedback`, label: t.feedbacks, icon: <StarIcon size={16}/> },
    { href: `/${locale}/profile/security`, label: t.security, icon: <Shield size={16}/> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={isLoggedIn ? `/${locale}/platform-home` : `/${locale}`} passHref>
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
                     <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                  <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {profileNavItems.map(item => (
                     <DropdownMenuItem key={item.href} asChild><Link href={item.href} className="flex items-center gap-2 w-full">{item.icon} {item.label}</Link></DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center gap-2 w-full"><Globe size={16} /> {t.language}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem asChild><Link href={pathWithoutLocale} locale="en" className="flex items-center gap-2 w-full">{t.english}</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href={pathWithoutLocale} locale="hi" className="flex items-center gap-2 w-full">{t.hindi}</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href={pathWithoutLocale} locale="kn" className="flex items-center gap-2 w-full">{t.kannada}</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 w-full text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer">
                    <LogOut size={16} /> {t.navLogout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isClient ? (
              <>
                <Link href={`/${locale}/login`} passHref>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    {t.navLogin}
                  </Button>
                </Link>
                <Link href={`/${locale}/signup`} passHref>
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
                <span className="sr-only">Toggle menu</span>
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
                    <SheetClose asChild key={item.href}>
                        <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3">
                        {item.label}
                        </NavLink>
                    </SheetClose>
                ))}
                <Separator className="my-3 bg-border" />
                {isClient && isLoggedIn ? (
                  <>
                    {profileNavItems.map(item => (
                        <SheetClose asChild key={item.href}>
                            <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3">
                            {item.label}
                            </NavLink>
                        </SheetClose>
                    ))}
                    <Separator className="my-3 bg-border" />
                    <p className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{t.language}</p>
                    
                    <Link href={pathWithoutLocale} locale="en" passHref>
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3">{t.english}</Button>
                      </SheetClose>
                    </Link>
                    <Link href={pathWithoutLocale} locale="hi" passHref>
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3">{t.hindi}</Button>
                      </SheetClose>
                    </Link>
                    <Link href={pathWithoutLocale} locale="kn" passHref>
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start text-lg py-3 gap-3">{t.kannada}</Button>
                      </SheetClose>
                    </Link>

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
                        <Link href={`/${locale}/login`} passHref>
                        <Button variant="outline" className="w-full justify-center text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                            <UserCircle size={20} /> {t.navLogin}
                        </Button>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href={`/${locale}/signup`} passHref>
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

