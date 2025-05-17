
"use client";

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Search, UserCircle, ShoppingCart, X, Briefcase, InfoIcon, LogOut, Edit3, ListOrdered, Shield, HelpCircle, StarIcon, Settings, Menu, Mic, Languages, Globe } from 'lucide-react';
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
  DialogClose,
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

// Hardcoded English translations for Header (as i18n was reverted)
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
    googleTranslateLabel: "Translate Page"
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
  const [isRecognitionApiSupported, setIsRecognitionApiSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const [isDesktopTranslateOpen, setIsDesktopTranslateOpen] = useState(false);
  const [isMobileTranslateOpen, setIsMobileTranslateOpen] = useState(false);
  const googleTranslateElementHeaderRef = useRef<HTMLDivElement>(null);
  const googleTranslateElementHeaderMobileRef = useRef<HTMLDivElement>(null);

  const t = headerTranslations; // Using hardcoded translations

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initGoogleTranslate = useCallback((elementId: string) => {
    if (typeof window !== 'undefined' && (window as any).google?.translate?.TranslateElement && document.getElementById(elementId)) {
      if (!document.getElementById(elementId)?.querySelector('.goog-te-gadget')) {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
          elementId
        );
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    // Check if the global init function is available (set by layout.tsx)
    if (typeof (window as any).googleTranslateElementInitGlobal === 'function') {
        // Attempt direct initialization if API is already loaded
        if ((window as any).google?.translate?.TranslateElement) {
            initGoogleTranslate('google_translate_element_header');
            initGoogleTranslate('google_translate_element_header_mobile');
        }
    }
    
    // Setup observer for elements that might render later (e.g. popover content)
    const observer = new MutationObserver((mutationsList, observerInstance) => {
      if ((window as any).google?.translate?.TranslateElement) { // Check again if Google API is ready
        const headerDiv = document.getElementById('google_translate_element_header');
        if (headerDiv && !headerDiv.querySelector('.goog-te-gadget')) {
          initGoogleTranslate('google_translate_element_header');
        }
        const mobileHeaderDiv = document.getElementById('google_translate_element_header_mobile');
        if (mobileHeaderDiv && !mobileHeaderDiv.querySelector('.goog-te-gadget')) {
          initGoogleTranslate('google_translate_element_header_mobile');
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isClient, initGoogleTranslate]);


  useEffect(() => {
    if (!isClient) return;
    let SpeechRecognitionAPI: any;
    if (typeof window !== 'undefined') {
      SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    }

    if (!SpeechRecognitionAPI) {
      setIsRecognitionApiSupported(false);
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }
    setIsRecognitionApiSupported(true);

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognitionAPI();
      const recognition = recognitionRef.current;
      if (!recognition) {
        setRecognitionError(t.voiceAssistErrorInit);
        return;
      }
      recognition.lang = 'en-US';
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
          errorMessage = `${t.voiceAssistErrorGeneric || 'Speech recognition error'} (Code: ${event.error})`;
        }
        setRecognitionError(errorMessage);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [isClient, t]); 

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
    if (!isRecognitionApiSupported) {
        setRecognitionError(t.voiceAssistNotSupported);
    }
    setTranscript('');
    setRecognitionError(isRecognitionApiSupported ? null : (t.voiceAssistNotSupported));
    setIsVoiceDialogVisible(true);
  }, [isRecognitionApiSupported, t]);

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
               setRecognitionError(t.voiceAssistErrorStart || "Could not start voice recognition.");
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
            {/* Desktop Translate Button */}
            {isClient && (
              <Popover open={isDesktopTranslateOpen} onOpenChange={setIsDesktopTranslateOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hidden md:inline-flex text-foreground hover:text-primary hover:bg-primary/10" 
                    aria-label={t.googleTranslateLabel || "Translate Page"}
                  >
                    <Languages size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-1 bg-card text-card-foreground shadow-lg rounded-md border z-[10001] popover-content-language-translator"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div id="google_translate_element_header" ref={googleTranslateElementHeaderRef}></div>
                </PopoverContent>
              </Popover>
            )}

            {isClient && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openVoiceDialog}
                className="hidden md:inline-flex text-foreground hover:text-primary hover:bg-primary/10 ml-1 lg:ml-2"
                aria-label={t.voiceAssistLabel || "Voice Assistant"}
                disabled={!isRecognitionApiSupported && isClient} 
              >
                <Mic size={20} />
              </Button>
            )}

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
                      <p className="text-sm text-muted-foreground">{t.jobListEmpty || "Your job list is empty. Add providers!"}</p>
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
                                <span className="sr-only">{t.removeProvider(item.name) || `Remove ${item.name}`}</span>
                              </Button>
                            </li>
                          ))}
                        </ul>
                        <Separator className="my-3" />
                        <div className="space-y-2">
                          <Label htmlFor="customer-address" className="text-xs font-medium text-muted-foreground">{t.serviceAddressOptional || "Service Address (Optional)"}</Label>
                          <Input
                            id="customer-address"
                            placeholder={t.enterAddressPlaceholder || "Enter your address or area"}
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
                    <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:text-primary hover:bg-primary/10">
                      <UserCircle size={24} />
                       <span className="sr-only">{t.myAccount || "My Account"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                    <DropdownMenuLabel>{t.myAccount || "My Account"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profileNavItems.map(item => (
                       <DropdownMenuItem key={item.label} asChild>
                         <Link href={item.href} className="flex items-center gap-2 w-full">{item.icon} {item.label}</Link>
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
                  <Link href={`/login`} passHref>
                    <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                      {t.navLogin || "Login"}
                    </Button>
                  </Link>
                  <Link href={`/signup`} passHref>
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

          {/* Mobile Menu and Actions */}
          <div className="md:hidden ml-2 flex items-center">
             {isClient && (
              <Popover open={isMobileTranslateOpen} onOpenChange={setIsMobileTranslateOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="inline-flex text-foreground hover:text-primary hover:bg-primary/10 mr-1" /* md:hidden is implicit from parent */
                    aria-label={t.googleTranslateLabel || "Translate Page"}
                  >
                    <Languages size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-1 bg-card text-card-foreground shadow-lg rounded-md border z-[10001] popover-content-language-translator"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div id="google_translate_element_header_mobile" ref={googleTranslateElementHeaderMobileRef}></div>
                </PopoverContent>
              </Popover>
            )}
            {isClient && (
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={openVoiceDialog}
                    className="inline-flex text-foreground hover:text-primary hover:bg-primary/10 mr-1" /* md:hidden is implicit */
                    aria-label={t.voiceAssistLabel || "Voice Assistant"}
                    disabled={!isRecognitionApiSupported && isClient}
                  >
                    <Mic size={20} />
                  </Button>
            )}
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
                  
                  {isClient && isLoggedIn ? (
                    <>
                      {profileNavItems.map(item => (
                         <SheetClose asChild key={item.label}>
                          <NavLink href={item.href} icon={item.icon} className="w-full justify-start text-lg py-3" currentPath={currentPathname}>
                            {item.label}
                          </NavLink>
                         </SheetClose>
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
                          <Link href={`/login`} passHref>
                          <Button variant="outline" className="w-full justify-center text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                              <UserCircle size={20} /> {t.navLogin || "Login"}
                          </Button>
                          </Link>
                      </SheetClose>
                      <SheetClose asChild>
                          <Link href={`/signup`} passHref>
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

      {isClient && isVoiceDialogVisible && ( // Conditionally render Dialog only on client and when visible
        <Dialog open={isVoiceDialogVisible} onOpenChange={setIsVoiceDialogVisible}>
          <DialogContent className="sm:max-w-md bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mic className="text-primary" /> {t.voiceAssistDialogTitle || "Voice Assistant (Simulated)"}
              </DialogTitle>
              <DialogDescription>
               {t.voiceAssistDisclaimer || "Voice feature depends on browser & network. May not work in all environments."}
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-4 p-4 bg-background rounded-md min-h-[60px] flex items-center justify-center text-center">
              {isListening ? (
                <p className="text-sm text-primary italic animate-pulse">{t.voiceAssistListening || "Listening..."}</p>
              ) : transcript ? (
                <p className="text-sm text-foreground">{transcript}</p>
              ) : recognitionError ? (
                <p className="text-sm text-destructive">{recognitionError}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {isClient && isRecognitionApiSupported ? (t.voiceAssistPrompt || "Click the microphone below to start speaking.") : (t.voiceAssistNotSupported || "Voice recognition not supported in your browser.")}
                </p>
              )}
            </div>

            <Button
              variant={isListening ? "destructive" : "default"}
              className="w-full"
              onClick={handleToggleListening}
              disabled={!isClient || !isRecognitionApiSupported}
            >
              <Mic className="mr-2 h-4 w-4" />
              {isListening ? (t.voiceAssistStopListening || "Stop Listening") : (t.voiceAssistStartListening || "Start Listening")}
            </Button>
            
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {t.close || "Close"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

