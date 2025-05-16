import DocumentVerificationForm from '../DocumentVerificationForm'; // Adjusted path
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string };
};
  
export default async function VerifyDocumentsPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  // Assuming translations for this page and its form are nested.
  // Fallbacks are provided for structure.
  const t = dict.VerifyDocumentsPage || {
    identityDocumentVerification: "Identity & Document Verification",
    provideVerificationDetails: "Please provide the following details for verification. This information is kept confidential and is crucial for building trust on the platform."
  };

  const formTranslations = dict.DocumentVerificationForm || {
    aadhaarNumber: "Aadhaar Number",
    panNumber: "PAN Card Number",
    otherDocumentsDetails: "Other Relevant Documents (Optional)",
    aadhaarDescription: "Enter your 12-digit Aadhaar number. It will be stored without spaces.",
    panDescription: "Enter your 10-character PAN number. It will be stored in uppercase.",
    otherDocumentsDescription: "List any other documents or certifications that can help verify your profile.",
    completeRegistration: "Complete Registration & Submit for Verification",
    requiredDocuments: "Required Documents",
    documentUploadNote: "Actual document upload functionality would be part of a full backend implementation. For now, please provide the numbers.",
    error: "Error",
    couldNotRetrieveInitialData: "Could not retrieve initial registration data. Please start over.",
    registrationSubmittedSuccessfully: "Registration Submitted Successfully!",
    profileWillBeReviewed: "Thank you for registering. Your profile and documents will be reviewed for verification."
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
           <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.identityDocumentVerification}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.provideVerificationDetails}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentVerificationForm translations={formTranslations} locale={locale} />
        </CardContent>
      </Card>
    </div>
  );
}
