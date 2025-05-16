import Logo from '@/components/Logo';
// This root loading.tsx will be used by Next.js if a more specific one (e.g. in [locale]) isn't found or isn't triggered first.
// Keeping it simple.
export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
      <div className="animate-pulse">
        <Logo size="xlarge" />
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Loading your experience...</p>
    </div>
  );
}
