import { getDictionary } from '@/lib/dictionaries';
import EditProfilePageContent from './EditProfilePageContent';

export default async function EditProfilePage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.EditProfilePage || {}; // Assuming a key for this page's translations

  return <EditProfilePageContent t={t} locale={locale} />;
}
