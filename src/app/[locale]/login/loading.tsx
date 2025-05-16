// This file was part of the [locale] routing structure for i18n, specifically for the login route.
// As i18n is being reverted, this file (and the entire /src/app/[locale] directory) is no longer needed.
// A general loading.tsx at /src/app/loading.tsx should suffice.
// Please delete the /src/app/[locale] directory.

import React from 'react';
import Logo from '@/components/Logo';

export default function ObsoleteLoginLoadingForLocale() {
  // This is a minimal loading component to satisfy Next.js if it's looking for it.
  // It should be deleted if the [locale] directory is removed.
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
      <div className="animate-pulse">
        <Logo size="xlarge" />
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Loading Login...</p>
    </div>
  );
}
