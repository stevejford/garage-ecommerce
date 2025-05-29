import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Geelong Garage Doors account
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignIn
            appearance={{
              baseTheme: dark,
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-md',
                footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
                card: 'shadow-none',
                header: 'hidden',
                footer: 'pb-0',
                formFieldInput: 'rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                formFieldLabel: 'text-gray-700 text-sm font-medium',
              }
            }}
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/auth/sign-up"
          />
        </div>
        
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
