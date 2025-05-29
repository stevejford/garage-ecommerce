import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

interface RouteParams {
  params: {
    staffId: string;
  };
}

// GET /api/staff/[staffId] - Get staff member details
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    const { staffId } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // In a real implementation, we would fetch the staff member from the database with Prisma
    // For now, we'll use placeholder data
    const staffMember = {
      id: staffId,
      name: "Steve Johnson",
      email: "steve@geelonggaragedoors.com.au",
      role: "Admin",
      permissions: ["all"],
      lastActive: new Date("2025-05-29"),
      createdAt: new Date("2024-01-10"),
      activityLog: [
        {
          id: "activity-1",
          action: "Updated product 'Sectional Garage Door' price",
          timestamp: new Date("2025-05-29T14:30:00"),
        },
        {
          id: "activity-2",
          action: "Created new category 'Remote Controls'",
          timestamp: new Date("2025-05-28T10:15:00"),
        },
        {
          id: "activity-3",
          action: "Processed order #GGD-10005",
          timestamp: new Date("2025-05-27T09:30:00"),
        },
      ],
    };

    // If staff member not found, return 404
    if (!staffMember) {
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(staffMember);
  } catch (error) {
    console.error("Error fetching staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/staff/[staffId] - Update staff member
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    const { staffId } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();

    // In a real implementation, we would:
    // 1. Check if the user has admin permissions
    // 2. Update the staff member in the database
    
    // For now, we'll just return the updated staff member data
    const updatedStaffMember = {
      id: staffId,
      name: body.name || "Steve Johnson",
      email: body.email || "steve@geelonggaragedoors.com.au",
      role: body.role || "Admin",
      permissions: body.permissions || ["all"],
      lastActive: new Date(),
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date(),
      ...body,
    };

    return NextResponse.json(updatedStaffMember);
  } catch (error) {
    console.error("Error updating staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/staff/[staffId] - Delete staff member
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    const { staffId } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // In a real implementation, we would:
    // 1. Check if the user has admin permissions
    // 2. Delete the staff member from the database
    // 3. Handle any cleanup tasks (e.g., reassigning resources)
    
    // For now, we'll just return a success message
    return NextResponse.json(
      { message: `Staff member ${staffId} deleted successfully` }
    );
  } catch (error) {
    console.error("Error deleting staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
