import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

// GET /api/staff - List all staff members
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // In a real implementation, we would fetch staff members from the database with Prisma
    // For now, we'll use placeholder data
    const staffMembers = [
      {
        id: "staff-1",
        name: "Steve Johnson",
        email: "steve@geelonggaragedoors.com.au",
        role: "Admin",
        permissions: ["all"],
        lastActive: new Date("2025-05-29"),
        createdAt: new Date("2024-01-10"),
      },
      {
        id: "staff-2",
        name: "Sarah Williams",
        email: "sarah@geelonggaragedoors.com.au",
        role: "Manager",
        permissions: ["products", "orders", "customers"],
        lastActive: new Date("2025-05-28"),
        createdAt: new Date("2024-03-15"),
      },
      {
        id: "staff-3",
        name: "Michael Brown",
        email: "michael@geelonggaragedoors.com.au",
        role: "Sales",
        permissions: ["products", "orders"],
        lastActive: new Date("2025-05-25"),
        createdAt: new Date("2024-06-20"),
      },
      {
        id: "staff-4",
        name: "Emma Davis",
        email: "emma@geelonggaragedoors.com.au",
        role: "Support",
        permissions: ["orders", "customers"],
        lastActive: new Date("2025-05-27"),
        createdAt: new Date("2024-09-05"),
      },
    ];

    return NextResponse.json({ staffMembers });
  } catch (error) {
    console.error("Error fetching staff members:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create a new staff member
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated and has admin permissions
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: "Name, email, and role are required" },
        { status: 400 }
      );
    }

    // In a real implementation, we would:
    // 1. Check if the user has admin permissions
    // 2. Create a new staff member in the database
    // 3. Set up authentication credentials for the new staff member
    
    // For now, we'll just return the staff member data with a generated ID
    const newStaffMember = {
      id: `staff-${Date.now()}`,
      name: body.name,
      email: body.email,
      role: body.role,
      permissions: body.permissions || [],
      lastActive: new Date(),
      createdAt: new Date(),
      ...body,
    };

    return NextResponse.json(newStaffMember, { status: 201 });
  } catch (error) {
    console.error("Error creating staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
