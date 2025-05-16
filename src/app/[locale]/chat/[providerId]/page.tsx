
import { getDictionary } from '@/lib/dictionaries';
import ChatPageContent from './ChatPageContent';
import { dummyProviders } from '@/components/providers/dummyData'; // Import dummyProviders

type Props = {
  params: { locale: string; providerId: string };
};

export async function generateStaticParams() {
  const locales = ['en', 'kn']; 
  const providerIds = dummyProviders.map(provider => provider.id);
  
  const params = [];
  for (const locale of locales) {
    for (const providerId of providerIds) {
      params.push({ locale, providerId });
    }
  }
  return params;
}

export default async function ChatPage({ params }: Props) {
  const { locale, providerId } = params;
  const dict = await getDictionary(locale);
  const t = dict.ChatPage || {};
  return <ChatPageContent t={t} locale={locale} providerId={providerId} />;
}
