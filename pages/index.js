import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100">
      <nav className="bg-blue-900 w-full py-4">
        <div className="max-w-4xl mx-auto flex justify-around text-white">
          <Link href="/">Home</Link>
          <Link href="/add-school">Add School</Link>
          <Link href="/show-schools">Show Schools</Link>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-4xl font-bold text-blue-900">Welcome to Edunify School Management</h1>
      </div>
    </div>
  );
}
