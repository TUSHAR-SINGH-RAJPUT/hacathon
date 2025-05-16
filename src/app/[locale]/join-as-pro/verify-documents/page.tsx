import DocumentVerificationForm from './DocumentVerificationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

export default async function VerifyDocumentsPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.VerifyDocumentsPage || {};
  const formTranslations = dict.DocumentVerificationForm || {};
  
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
           <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.identityDocumentVerification || "Identity & Document Verification"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.provideVerificationDetails || "Please provide the following details for verification. This information is kept confidential and is crucial for building trust on the platform."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentVerificationForm translations={formTranslations} locale={locale} />
        </CardContent>
      </Card>
    </div>
  );
}
