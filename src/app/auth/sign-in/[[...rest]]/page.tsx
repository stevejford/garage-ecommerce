import { SignIn } from "@clerk/nextjs";
import "@/styles/globals.css";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-inter text-3xl font-semibold text-gray-900 tracking-normal">Geelong Garage Doors</h1>
          </Link>
          <p className="font-geist text-base text-gray-600 mt-2">Sign in to your admin account</p>
        </div>
        
        <div className="material-card">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "material-button-primary w-full",
                card: "bg-white shadow-none rounded-none p-6",
                headerTitle: "font-inter text-2xl font-semibold text-gray-900 tracking-normal",
                headerSubtitle: "font-geist text-base text-gray-600",
                socialButtonsBlockButton: "border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-stone-50",
                formFieldLabel: "font-inter text-sm font-medium text-gray-700 mb-1",
                formFieldInput: "font-geist appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base",
                footerActionLink: "font-medium text-blue-500 hover:text-blue-600",
                footer: "mt-6",
                main: "w-full",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
                termsPageUrl: "/terms",
                privacyPageUrl: "/privacy",
                helpPageUrl: "/help",
              },
            }}
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/auth/sign-up"
            redirectUrl="/admin"
          />
        </div>
        
        <div className="mt-6 text-center">
          <p className="font-geist text-sm text-gray-600">
            Need help? {" "}
            <Link href="/contact" className="font-medium text-blue-500 hover:text-blue-600">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
