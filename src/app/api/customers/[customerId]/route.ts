import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

interface RouteParams {
  params: {
    customerId: string;
  };
}

// GET /api/customers/[customerId] - Get customer details
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    const { customerId } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // In a real implementation, we would fetch the customer from the database with Prisma
    // For now, we'll use placeholder data
    const customer = {
      id: customerId,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "0412 345 678",
      totalOrders: 5,
      totalSpent: 1250.75,
      lastOrderDate: new Date("2025-05-15"),
      createdAt: new Date("2024-11-10"),
      addresses: [
        {
          id: "addr-1",
          type: "billing",
          line1: "123 Main Street",
          line2: "",
          city: "Geelong",
          state: "VIC",
          postcode: "3220",
          country: "Australia",
          isDefault: true,
        },
        {
          id: "addr-2",
          type: "shipping",
          line1: "456 High Street",
          line2: "Unit 7",
          city: "Geelong",
          state: "VIC",
          postcode: "3220",
          country: "Australia",
          isDefault: true,
        },
      ],
      orders: [
        {
          id: "order-1",
          orderNumber: "GGD-10001",
          date: new Date("2025-05-15"),
          status: "completed",
          total: 350.75,
          items: 3,
        },
        {
          id: "order-2",
          orderNumber: "GGD-10002",
          date: new Date("2025-04-20"),
          status: "completed",
          total: 275.00,
          items: 2,
        },
      ],
    };

    // If customer not found, return 404
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/customers/[customerId] - Update customer
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    const { customerId } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();

    // In a real implementation, we would update the customer in the database with Prisma
    // For now, we'll just return the updated customer data
    const updatedCustomer = {
      id: customerId,
      name: body.name || "John Smith",
      email: body.email || "john.smith@example.com",
      phone: body.phone || "0412 345 678",
      totalOrders: 5,
      totalSpent: 1250.75,
      lastOrderDate: new Date("2025-05-15"),
      createdAt: new Date("2024-11-10"),
      updatedAt: new Date(),
      ...body,
    };

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[customerId] - Delete customer
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    const { customerId } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // In a real implementation, we would delete the customer from the database with Prisma
    // For now, we'll just return a success message

    return NextResponse.json(
      { message: `Customer ${customerId} deleted successfully` }
    );
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
