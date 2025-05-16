// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file

import DocumentVerificationForm from '../DocumentVerificationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/../next.config';

type Props = {
  params: { locale: Locale };
};

export default async function VerifyDocumentsPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  const formTranslations = {
    aadhaarNumber: dict.aadhaarNumber || "Aadhaar Number",
    panNumber: dict.panNumber || "PAN Card Number",
    otherDocumentsDetails: dict.otherDocumentsDetails || "Other Relevant Documents (Optional)",
    aadhaarDescription: dict.aadhaarDescription || "Enter your 12-digit Aadhaar number. It will be stored without spaces.",
    panDescription: dict.panDescription || "Enter your 10-character PAN number. It will be stored in uppercase.",
    otherDocumentsDescription: dict.otherDocumentsDescription || "List any other documents or certifications that can help verify your profile.",
    completeRegistration: dict.completeRegistration || "Complete Registration & Submit for Verification",
    requiredDocuments: dict.requiredDocuments || "Required Documents",
    documentUploadNote: dict.documentUploadNote || "Actual document upload functionality would be part of a full backend implementation. For now, please provide the numbers.",
    // Toast messages for the form (if needed directly by form, or handled by parent)
    error: dict.error || "Error",
    couldNotRetrieveInitialData: dict.couldNotRetrieveInitialData || "Could not retrieve initial registration data. Please start over.",
    registrationSubmittedSuccessfully: dict.registrationSubmittedSuccessfully || "Registration Submitted Successfully!",
    profileWillBeReviewed: dict.profileWillBeReviewed || "Thank you for registering. Your profile and documents will be reviewed for verification."
  };
  
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
           <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {dict.identityDocumentVerification || "Identity & Document Verification"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {dict.provideVerificationDetails || "Please provide the following details for verification. This information is kept confidential and is crucial for building trust on the platform."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentVerificationForm translations={formTranslations} />
        </CardContent>
      </Card>
    </div>
  );
}
