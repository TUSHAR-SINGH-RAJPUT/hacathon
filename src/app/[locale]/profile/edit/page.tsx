
import { getDictionary } from '@/lib/dictionaries';
import EditProfilePageContent from './EditProfilePageContent';

type Props = {
  params: { locale: string };
};

export default async function EditProfilePage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.EditProfilePage || {};
  return <EditProfilePageContent t={t} locale={locale} />;
}
