
// This file was part of the [locale] routing structure for i18n.
// As i18n is being reverted, this file is no longer needed.
// Its logic has been merged back into /src/app/page.tsx.
// Please delete the /src/app/[locale] directory.

import React from 'react';

export default function ObsoleteRootPageForLocale() {
  // This is a minimal page component to satisfy Next.js if it's looking for it.
  // It should be deleted if the [locale] directory is removed.
  return (
    <div>
      <p>This is an obsolete root page for a specific locale and should be removed.</p>
      <p>The main landing page is at /.</p>
    </div>
  );
}
