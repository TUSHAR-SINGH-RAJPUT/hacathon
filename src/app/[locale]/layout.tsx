// This file was part of the [locale] routing structure for i18n.
// As i18n is being reverted, this file is no longer needed.
// Its logic has been merged back into /src/app/layout.tsx.
// Please delete the /src/app/[locale] directory.

import React from 'react';

export default function ObsoleteRootLayoutForLocale({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
