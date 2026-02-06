import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our website",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          This is your home page
        </p>
      </div>
    </main>
  );
}
