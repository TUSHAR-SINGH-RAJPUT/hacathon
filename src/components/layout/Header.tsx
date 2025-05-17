<<<<<<< HEAD

"use client";

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings, Menu, Mic, Languages, Globe } from 'lucide-react'; // Added Globe back, will use Languages for the button
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger, // Added SheetTrigger
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
  DialogClose as DialogPrimitiveClose, // Renamed to avoid conflict with SheetClose
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
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { cn } from "@/lib/utils";

// Hardcoded English translations for Header
const headerTranslations = {
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
    removeProvider: (name: string) => `Remove ${name}`,
    close: "Close",
    voiceAssistLabel: "Voice Assistant",
    voiceAssistDialogTitle: "Voice Assistant (Simulated)",
    voiceAssistListening: "Listening...",
    voiceAssistPrompt: "Click the microphone below to start speaking.",
    voiceAssistNotSupported: "Voice recognition not supported in your browser.",
    voiceAssistStopListening: "Stop Listening",
    voiceAssistStartListening: "Start Listening",
    voiceAssistErrorGeneric: "An error occurred during speech recognition.",
    voiceAssistErrorNoSpeech: "No speech was detected. Please try again.",
    voiceAssistErrorAudioCapture: "Microphone problem. Please ensure it's enabled and working.",
    voiceAssistErrorNotAllowed: "Permission to use microphone was denied. Please enable it in your browser settings.",
    voiceAssistErrorNetwork: "Network error during speech recognition. Check your connection or try again later.",
    voiceAssistErrorInit: "Speech recognition is not initialized.",
    voiceAssistErrorStart: "Could not start voice recognition. Ensure mic is connected and permissions allowed.",
    voiceAssistDisclaimer: "Voice feature depends on browser & network. May not work in all environments.",
    googleTranslateLabel: "Translate Page",
    language: "Language",
};


interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  currentPath: string;
}

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


export default function Header() {
  const { cart, removeFromCart, customerAddress, setCustomerAddress } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const currentPathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const [isVoiceDialogVisible, setIsVoiceDialogVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [isRecognitionApiSupported, setIsRecognitionApiSupported] = useState(true); // Assume supported initially
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const [isDesktopTranslateOpen, setIsDesktopTranslateOpen] = useState(false);
  const [isMobileTranslateOpen, setIsMobileTranslateOpen] = useState(false);
  
  // Use hardcoded English translations directly
  const t = headerTranslations;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initGoogleTranslate = useCallback((elementId: string) => {
    if (typeof window !== 'undefined' && (window as any).google?.translate?.TranslateElement && document.getElementById(elementId)) {
      const targetElement = document.getElementById(elementId);
      if (targetElement && !targetElement.querySelector('.goog-te-gadget')) {
        // console.log(`Initializing Google Translate for: ${elementId}`);
        try {
          new (window as any).google.translate.TranslateElement(
            { pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
            elementId
          );
        } catch (error) {
          console.error("Error initializing Google Translate for " + elementId + ":", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || !(window as any).googleTranslateElementInitGlobal) return;

    const attemptInit = (id: string) => {
      if (document.getElementById(id)) {
        initGoogleTranslate(id);
      }
    };
    
    attemptInit('google_translate_element_header');
    attemptInit('google_translate_element_header_mobile');

    const observer = new MutationObserver((mutationsList, observerInstance) => {
      if ((window as any).google?.translate?.TranslateElement) {
        attemptInit('google_translate_element_header');
        attemptInit('google_translate_element_header_mobile');
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isClient, initGoogleTranslate]);


  useEffect(() => {
    if (!isClient) return; // Only run on the client

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsRecognitionApiSupported(false);
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }
    setIsRecognitionApiSupported(true);

    if (!recognitionRef.current) {
      try {
        recognitionRef.current = new SpeechRecognitionAPI();
        const recognition = recognitionRef.current;
        if (!recognition) {
          setRecognitionError(t.voiceAssistErrorInit);
          return;
        }
        recognition.lang = 'en-US'; // Explicitly set language
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscriptLocal = '';
          let finalTranscriptLocal = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscriptLocal += event.results[i][0].transcript;
            } else {
              interimTranscriptLocal += event.results[i][0].transcript;
            }
          }
          setTranscript(finalTranscriptLocal || interimTranscriptLocal);
          if (finalTranscriptLocal) {
            setRecognitionError(null);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error object:", event); 
          let errorMessage = t.voiceAssistErrorGeneric;
          if (event.error === 'no-speech') {
            errorMessage = t.voiceAssistErrorNoSpeech;
          } else if (event.error === 'audio-capture') {
            errorMessage = t.voiceAssistErrorAudioCapture;
          } else if (event.error === 'not-allowed') {
            errorMessage = t.voiceAssistErrorNotAllowed;
          } else if (event.error === 'network') {
            errorMessage = t.voiceAssistErrorNetwork;
            console.error("Web Speech API reported a 'network' error. This might be an issue with the browser's connection to its speech recognition service or related permissions.");
          } else {
            errorMessage = `${t.voiceAssistErrorGeneric} (Code: ${event.error})`;
          }
          setRecognitionError(errorMessage);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } catch (e) {
        console.error("Error initializing SpeechRecognitionAPI:", e);
        setIsRecognitionApiSupported(false);
        setRecognitionError("Failed to initialize voice recognition.");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, t]); // Added t to dependency array because error messages use it.

  const navItems = useMemo(() => [
    { href: `/platform-home`, label: t.navHome || "Home", icon: <Home size={18} /> },
    { href: `/post-job`, label: t.navPostJob || "Post a Job", icon: <PlusSquare size={18} /> },
    { href: `/browse-providers`, label: t.navBrowseServices || "Browse Services", icon: <Search size={18} /> },
    { href: `/join-as-pro`, label: t.navJoinAsPro || "Join as Pro", icon: <Briefcase size={18} /> },
    { href: `/about`, label: t.navAboutUs || "About Us", icon: <InfoIcon size={18} /> },
  ], [t]);

  const profileNavItems = useMemo(() => [
    { href: `/profile/edit`, label: t.editProfile || "Edit Profile", icon: <Edit3 size={16}/> },
    { href: `/profile/bookings`, label: t.myBookings || "My Bookings", icon: <ListOrdered size={16}/> },
    { href: `/support`, label: t.customerSupport || "Customer Support", icon: <HelpCircle size={16}/> },
    { href: `/profile/feedback`, label: t.feedbacks || "Feedbacks", icon: <StarIcon size={16}/> },
    { href: `/profile/security`, label: t.security || "Security", icon: <Shield size={16}/> },
  ], [t]);

  const openVoiceDialog = useCallback(() => {
    if (!isClient) return;
    if (!isRecognitionApiSupported) {
        setRecognitionError(t.voiceAssistNotSupported);
    }
    setTranscript('');
    setRecognitionError(isRecognitionApiSupported ? null : t.voiceAssistNotSupported);
    setIsVoiceDialogVisible(true);
  }, [isClient, isRecognitionApiSupported, t.voiceAssistNotSupported]);

  const handleToggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      setRecognitionError(t.voiceAssistErrorInit);
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setRecognitionError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error: any) {
          console.error("Error starting recognition:", error);
          if (error.name === 'NotAllowedError') {
               setRecognitionError(t.voiceAssistErrorNotAllowed);
          } else if (error.name === 'InvalidStateError' && isListening) {
              console.warn("Recognition already started or in invalid state.");
          } else {
               setRecognitionError(t.voiceAssistErrorStart);
          }
          setIsListening(false); 
      }
    }
  }, [isListening, t]);

  const handleProceedToBooking = useCallback(() => {
    if (cart.length > 0) {
      router.push(`/booking-confirmation`);
    }
  }, [cart.length, router]);


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`${isLoggedIn ? '/platform-home' : '/'}`} passHref>
            <Logo size="medium" />
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href} icon={item.icon} currentPath={currentPathname}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
             {/* Desktop Voice Assistant Button */}
             <Button
                variant="ghost"
                size="icon"
                onClick={openVoiceDialog}
                className="hidden md:inline-flex text-foreground hover:text-primary hover:bg-primary/10"
                aria-label={t.voiceAssistLabel}
                disabled={!isClient || !isRecognitionApiSupported}
              >
                <Mic size={20} />
              </Button>

            {/* Desktop Translate Button */}
             <Popover open={isDesktopTranslateOpen} onOpenChange={setIsDesktopTranslateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:inline-flex text-foreground hover:text-primary hover:bg-primary/10"
                    aria-label={t.googleTranslateLabel}
                    disabled={!isClient}
                  >
                    <Languages size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-1 z-[10001] popover-content-language-translator"
                  align="end"
                  sideOffset={5}
                >
                  {isClient && <div id="google_translate_element_header"></div>}
                </PopoverContent>
              </Popover>


            {/* Desktop Cart and Profile/Login */}
            <div className="hidden md:flex items-center space-x-2">
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
                                    src={item.profileImageUrl || `https://placehold.co/32x32.png`}
                                    alt={item.name}
                                    data-ai-hint="person avatar"
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

              {isClient && isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:text-primary hover:bg-primary/10">
                      <UserCircle size={24} />
                      <span className="sr-only">{t.myAccount}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground z-[10001]">
                    <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profileNavItems.map(item => (
                      <DropdownMenuItem key={item.label} asChild>
                        <Link href={item.href} className="flex items-center gap-2 w-full cursor-pointer">{item.icon} {item.label}</Link>
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

            {/* Mobile Menu Trigger, Voice, and Translate */}
            <div className="md:hidden flex items-center space-x-1">
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={openVoiceDialog}
                  className="inline-flex text-foreground hover:text-primary hover:bg-primary/10"
                  aria-label={t.voiceAssistLabel}
                  disabled={!isClient || !isRecognitionApiSupported}
                >
                  <Mic size={20} />
                </Button>

              <Popover open={isMobileTranslateOpen} onOpenChange={setIsMobileTranslateOpen}>
                <PopoverTrigger asChild>
                   <Button
                    variant="ghost"
                    size="icon"
                    className="inline-flex text-foreground hover:text-primary hover:bg-primary/10"
                    aria-label={t.googleTranslateLabel}
                    disabled={!isClient}
                  >
                    <Languages size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-1 z-[10001] popover-content-language-translator"
                  align="end"
                  sideOffset={5}
                >
                 {isClient && <div id="google_translate_element_header_mobile"></div>}
                </PopoverContent>
              </Popover>

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
                      <SheetClose asChild key={item.label}>
                        <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={currentPathname}>
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                    <Separator className="my-3 bg-border" />
                    {isClient && isLoggedIn && (
                      <>
                        {profileNavItems.map(item => (
                          <SheetClose asChild key={item.label}>
                            <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={currentPathname}>
                              {item.label}
                            </NavLink>
                          </SheetClose>
                        ))}
                        <Separator className="my-3 bg-border" />
                      </>
                    )}
                    
                    {isClient && isLoggedIn ? (
                        <SheetClose asChild>
                            <Button onClick={logout} variant="ghost" className="w-full justify-start text-lg py-3 gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive">
                            <LogOut size={20} /> {t.navLogout}
                            </Button>
                        </SheetClose>
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
        </div>
      </header>

      {isClient && isVoiceDialogVisible && (
        <Dialog open={isVoiceDialogVisible} onOpenChange={setIsVoiceDialogVisible}>
          <DialogContent className="sm:max-w-md bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mic className="text-primary" /> {t.voiceAssistDialogTitle}
              </DialogTitle>
              <DialogDescription>
               {t.voiceAssistDisclaimer}
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-4 p-4 bg-background rounded-md min-h-[60px] flex items-center justify-center text-center">
              {isListening ? (
                <p className="text-sm text-primary italic animate-pulse">{t.voiceAssistListening}</p>
              ) : transcript ? (
                <p className="text-sm text-foreground">{transcript}</p>
              ) : recognitionError ? (
                <p className="text-sm text-destructive">{recognitionError}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {isRecognitionApiSupported ? t.voiceAssistPrompt : t.voiceAssistNotSupported}
                </p>
              )}
            </div>

            <Button
              variant={isListening ? "destructive" : "default"}
              className="w-full"
              onClick={handleToggleListening}
              disabled={!isRecognitionApiSupported}
            >
              <Mic className="mr-2 h-4 w-4" />
              {isListening ? t.voiceAssistStopListening : t.voiceAssistStartListening}
            </Button>
            
            <DialogFooter className="mt-6">
              <DialogPrimitiveClose asChild>
                <Button type="button" variant="secondary">
                  {t.close}
                </Button>
              </DialogPrimitiveClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

=======
// Update the profile menu items in Header.tsx to include the language option
{/* Add this item in the DropdownMenuContent component, before the logout option */}
<DropdownMenuItem asChild>
  <Link href="/profile/language" className="flex items-center gap-2 w-full">
    <Languages size={16}/> Language Settings
  </Link>
</DropdownMenuItem>
>>>>>>> 8bbdfb29f9c74c0a54cf1579dbd88833c45136f9
