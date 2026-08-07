import { ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl sm:text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl sm:text-3xl font-semibold">
        This page doesn't exist
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md">
        The link may be broken or the page may have moved.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to portfolio
      </a>
    </main>
  );
};
