import { getDictionary } from '@/lib/dictionaries';
import ChatPageContent from './ChatPageContent';

export default async function ChatPage({ params: { locale, providerId } }: { params: { locale: string, providerId: string } }) {
  const dict = await getDictionary(locale);
  // Assuming you'll have a ChatPage section in your common.json
  const t = dict.ChatPage || {}; 
  
  return <ChatPageContent t={t} locale={locale} providerId={providerId} />;
}
