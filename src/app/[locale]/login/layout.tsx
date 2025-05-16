// This file was part of the [locale] routing structure for i18n.
// As i18n is being reverted, this file is no longer needed
// if src/app/login/page.tsx exists and src/app/layout.tsx is the main layout.
// The /src/app/[locale]/login/page.tsx should also have been reverted.
// Ideally, the entire /src/app/[locale] directory (including this file) should be deleted.
// If you see this content, it means this file was not deleted after the i18n revert.

import React from 'react';

export default function ObsoleteLoginLayoutForLocale({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout does nothing and just passes children through.
  // It's here to prevent Next.js from erroring if it finds this file
  // and expects a valid React component as a default export.
  return <>{children}</>;
}
