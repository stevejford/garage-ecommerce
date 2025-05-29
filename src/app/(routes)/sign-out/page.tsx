"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignOutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
        <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <button 
            onClick={handleSignOut}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors w-full"
          >
            Sign out
          </button>
          
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
