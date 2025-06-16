import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          OCI Homes & Properties
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link href="/properties" className="hover:text-blue-200">
            Properties
          </Link>
          <Link href="/contact" className="hover:text-blue-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
