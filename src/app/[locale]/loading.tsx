import Logo from '@/components/Logo';
// No dictionary needed here as it's a very simple loading state

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
