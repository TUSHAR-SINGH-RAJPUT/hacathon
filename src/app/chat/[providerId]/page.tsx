
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders } from '@/components/providers/dummyData';
import type { ServiceProvider, ChatMessage } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, UserCircle, AlertTriangle, Loader2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

// Hardcoded English strings
const t = {
  loadingChat: "Loading chat...",
  providerNotFound: "Provider Not Found",
  couldNotInitiateChat: "Could not initiate chat. The provider may not exist or there was an error.",
  backToProviders: "Back to Providers",
  typeYourMessage: "Type your message...",
  sendMessage: "Send message",
  simulatedChat: "This is a simulated chat. Messages are not actually sent.",
  initialMessage: (name: string) => `Hi there! I'm ${name}. How can I help you today?`,
  simulatedReply: (text: string) => `Thanks for your message! I'll get back to you shortly regarding "${text.substring(0,20)}...". (This is a simulated reply)`
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.providerId as string;

  const [provider, setProvider] = useState<ServiceProvider | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingProvider, setIsLoadingProvider] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (providerId) {
      const foundProvider = dummyProviders.find(p => p.id === providerId);
      setProvider(foundProvider);
      if (foundProvider) {
        setMessages([
          {
            id: `msg-${Date.now()}`,
            text: t.initialMessage(foundProvider.name),
            sender: 'provider',
            timestamp: new Date(),
          }
        ]);
      }
      setIsLoadingProvider(false);
    }
  }, [providerId]); 

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !provider) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const providerReply: ChatMessage = {
        id: `msg-provider-${Date.now()}`,
        text: t.simulatedReply(userMessage.text),
        sender: 'provider',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, providerReply]);
    }, 1500);
  };

  if (isLoadingProvider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">{t.loadingChat}</p>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500 text-center px-4">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">{t.providerNotFound}</h1>
        <p className="text-muted-foreground mb-6">{t.couldNotInitiateChat}</p>
        <Button onClick={() => router.push(`/browse-providers`)} variant="outline" className="text-primary border-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToProviders}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500 py-4">
      <Card className="flex-1 flex flex-col shadow-xl bg-card overflow-hidden">
        <CardHeader className="p-4 border-b flex flex-row items-center space-x-3 bg-card">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link href={`/browse-providers/profile/${provider.id}`} passHref>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Image
                src={provider.profileImageUrl || 'https://placehold.co/40x40.png'}
                alt={provider.name}
                width={40}
                height={40}
                className="rounded-full"
                data-ai-hint="person avatar"
              />
              <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {provider.name}
              </CardTitle>
            </div>
          </Link>
        </CardHeader>

        <ScrollArea className="flex-1 p-4 space-y-4 bg-background" ref={scrollAreaRef}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col mb-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl shadow ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 px-1">
                {format(msg.timestamp, 'p')}
              </span>
            </div>
          ))}
        </ScrollArea>

        <CardFooter className="p-4 border-t bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full items-center space-x-3"
          >
            <Input
              type="text"
              placeholder={t.typeYourMessage}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="h-5 w-5" />
              <span className="sr-only">{t.sendMessage}</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <p className="text-xs text-muted-foreground text-center mt-2">{t.simulatedChat}</p>
    </div>
  );
}
