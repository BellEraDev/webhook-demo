import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Webhook Demo</h1>
      <p className="mb-6">Real-time data handling with user sessions</p>
      <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">Go to Dashboard</Link>
    </main>
  );
}
