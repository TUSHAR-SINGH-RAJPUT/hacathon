
"use client";

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings, Menu, Globe } from 'lucide-react';
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
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { i18n as i18nConfig } from '../../../next.config'; // Correctly import the named export

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  currentPath: string;
  locale: string;
}

const NavLink = React.memo(({ href, children, icon, onClick, className, currentPath, locale }: NavLinkProps) => {
  const isActive = href ? currentPath === `/${locale}${href}` || (href === '/platform-home' && currentPath === `/${locale}`) : false;

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
  return href ? <Link href={`/${locale}${href === '/' ? '' : href}`} passHref>{content}</Link> : content;
});
NavLink.displayName = 'NavLink';


interface HeaderProps {
  locale: string;
  fullDict: any;
}

export default function Header({ locale, fullDict }: HeaderProps) {
  const { cart, removeFromCart, customerAddress, setCustomerAddress } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = useMemo(() => (fullDict?.Header) || {}, [fullDict]);

  const navItems = useMemo(() => [
    { href: `/platform-home`, label: t.navHome || "Home", icon: <Home size={18} /> },
    { href: `/post-job`, label: t.navPostJob || "Post a Job", icon: <PlusSquare size={18} /> },
    { href: `/browse-providers`, label: t.navBrowseServices || "Browse Services", icon: <Search size={18} /> },
    { href: `/join-as-pro`, label: t.navJoinAsPro || "Join as Pro", icon: <Briefcase size={18} /> },
    { href: `/about`, label: t.navAboutUs || "About Us", icon: <InfoIcon size={18} /> },
  ], [t]);

  const handleProceedToBooking = () => {
    if (cart.length > 0) {
      router.push(`/${locale}/booking-confirmation`);
    }
  };

  const profileNavItems = useMemo(() => [
    { href: `/profile/edit`, label: t.editProfile || "Edit Profile", icon: <Edit3 size={16}/> },
    { href: `/profile/bookings`, label: t.myBookings || "My Bookings", icon: <ListOrdered size={16}/> },
    { href: `/support`, label: t.customerSupport || "Customer Support", icon: <HelpCircle size={16}/> },
    { href: `/profile/feedback`, label: t.feedbacks || "Feedbacks", icon: <StarIcon size={16}/> },
    { href: `/profile/security`, label: t.security || "Security", icon: <Shield size={16}/> },
  ], [t]);

  const pathWithoutLocale = useMemo(() => {
    if (pathname) {
      const segments = pathname.split('/');
      if (segments.length > 1 && i18nConfig.locales.includes(segments[1])) {
        return pathname.substring(pathname.indexOf('/', 1));
      }
    }
    return pathname || '/';
  }, [pathname]);

  const handleLanguageChange = useCallback((newLocale: string) => {
    router.push(pathWithoutLocale, { locale: newLocale });
    setIsSheetOpen(false);
  }, [router, pathWithoutLocale]);

  const languageOptions = [
    { locale: 'en', label: t.english || "English" },
    { locale: 'hi', label: t.hindi || "Hindi" },
    { locale: 'kn', label: t.kannada || "Kannada" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={isLoggedIn ? `/${locale}/platform-home` : `/${locale}/`} passHref>
          <Logo size="medium" />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => (
            <NavLink key={item.label} href={item.href} icon={item.icon} currentPath={pathname} locale={locale}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Globe size={20} />
                  <span className="sr-only">{t.language || "Language"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card text-card-foreground">
                <DropdownMenuLabel>{t.language || "Language"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languageOptions.map(lang => (
                  <DropdownMenuItem key={lang.locale} onClick={() => handleLanguageChange(lang.locale)}>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
                  <span className="sr-only">{t.jobList || "Your Job List"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-50 mr-4 mt-1 bg-card text-card-foreground shadow-xl rounded-lg">
                <div className="p-4">
                  <h4 className="font-medium text-lg mb-3 pb-2 border-b border-border">{t.jobList || "Your Job List"}</h4>
                  {cart.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.jobListEmpty || "Your job list is empty."}</p>
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
                        <Label htmlFor="customer-address" className="text-xs font-medium text-muted-foreground">{t.serviceAddressOptional || "Service Address (Optional)"}</Label>
                        <Input
                          id="customer-address"
                          placeholder={t.enterAddressPlaceholder || "Enter your address"}
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
                        {t.proceedToBooking || "Proceed to Booking"}
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
                     <span className="sr-only">{t.myAccount || "My Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                  <DropdownMenuLabel>{t.myAccount || "My Account"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {profileNavItems.map(item => (
                     <DropdownMenuItem key={item.label} asChild>
                       <Link href={`/${locale}${item.href}`} className="flex items-center gap-2 w-full">{item.icon} {item.label}</Link>
                     </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 w-full text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer">
                    <LogOut size={16} /> {t.navLogout || "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isClient ? (
              <>
                <Link href={`/${locale}/login`} passHref>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    {t.navLogin || "Login"}
                  </Button>
                </Link>
                <Link href={`/${locale}/signup`} passHref>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t.navSignUp || "Sign Up"}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="outline" disabled>{t.navLogin || "Login"}</Button>
                <Button disabled>{t.navSignUp || "Sign Up"}</Button>
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
                <span className="sr-only">{t.toggleMenu || "Toggle Menu"}</span>
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
                  <Link key={item.label} href={`/${locale}${item.href === '/' ? '' : item.href}`} passHref>
                    <SheetClose asChild>
                        <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={pathname} locale={locale}>
                        {item.label}
                        </NavLink>
                    </SheetClose>
                  </Link>
                ))}
                <Separator className="my-3 bg-border" />

                {/* Language Switcher - Mobile */}
                <p className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{t.language || "Language"}</p>
                {languageOptions.map(lang => (
                  <Link key={lang.locale} href={pathWithoutLocale} locale={lang.locale} passHref>
                    <SheetClose asChild>
                      <Button variant="ghost" onClick={() => handleLanguageChange(lang.locale)} className="w-full justify-start text-lg py-3 gap-3">
                        {lang.label}
                      </Button>
                    </SheetClose>
                  </Link>
                ))}
                <Separator className="my-3 bg-border" />

                {isClient && isLoggedIn ? (
                  <>
                    {profileNavItems.map(item => (
                        <Link key={item.label} href={`/${locale}${item.href}`} passHref>
                           <SheetClose asChild>
                                <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={pathname} locale={locale}>
                                {item.label}
                                </NavLink>
                            </SheetClose>
                        </Link>
                    ))}
                    <Separator className="my-3 bg-border" />
                    <SheetClose asChild>
                        <Button onClick={logout} variant="ghost" className="w-full justify-start text-lg py-3 gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <LogOut size={20} /> {t.navLogout || "Logout"}
                        </Button>
                    </SheetClose>
                  </>
                ) : isClient ? (
                  <>
                    <SheetClose asChild>
                        <Link href={`/${locale}/login`} passHref>
                        <Button variant="outline" className="w-full justify-center text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                            <UserCircle size={20} /> {t.navLogin || "Login"}
                        </Button>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href={`/${locale}/signup`} passHref>
                        <Button className="w-full justify-center text-lg py-3 gap-3 bg-primary text-primary-foreground hover:bg-primary/90">
                            {t.navSignUp || "Sign Up"}
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
