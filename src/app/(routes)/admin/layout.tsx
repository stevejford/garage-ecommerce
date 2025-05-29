import React from "react";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import type { OrganizationMembership, User as ClerkUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/layout/admin-sidebar";
import "@/styles/globals.css";

// Extended User type to include organizationMemberships
type User = ClerkUser & {
  organizationMemberships?: OrganizationMembership[];
};

export const metadata: Metadata = {
  title: "Geelong Garage Doors | Admin Dashboard",
  description: "Admin dashboard for managing products, orders, and content",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser() as User | null;
  
  // Additional protection at the layout level
  if (!user || !user.organizationMemberships?.some((membership: OrganizationMembership) => 
    membership.role === "org:admin"
  )) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 bg-stone-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">
        <main className="material-container">
          {children}
        </main>
      </div>
    </div>
  );
}
