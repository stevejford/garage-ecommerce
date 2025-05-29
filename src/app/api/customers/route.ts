import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

// GET /api/customers - List all customers
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

    // Get query parameters for filtering, sorting, and pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "createdAt";
    const order = url.searchParams.get("order") || "desc";

    // Calculate pagination values
    const skip = (page - 1) * limit;

    // In a real implementation, we would fetch customers from the database with Prisma
    // For now, we'll use placeholder data
    const customers = [
      {
        id: "cust-1",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "0412 345 678",
        totalOrders: 5,
        totalSpent: 1250.75,
        lastOrderDate: new Date("2025-05-15"),
        createdAt: new Date("2024-11-10"),
      },
      {
        id: "cust-2",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "0423 456 789",
        totalOrders: 3,
        totalSpent: 875.50,
        lastOrderDate: new Date("2025-05-20"),
        createdAt: new Date("2025-01-05"),
      },
      {
        id: "cust-3",
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "0434 567 890",
        totalOrders: 1,
        totalSpent: 350.00,
        lastOrderDate: new Date("2025-05-22"),
        createdAt: new Date("2025-05-10"),
      },
      {
        id: "cust-4",
        name: "Emma Wilson",
        email: "emma.w@example.com",
        phone: "0445 678 901",
        totalOrders: 8,
        totalSpent: 2450.25,
        lastOrderDate: new Date("2025-05-18"),
        createdAt: new Date("2024-08-15"),
      },
      {
        id: "cust-5",
        name: "David Lee",
        email: "david.lee@example.com",
        phone: "0456 789 012",
        totalOrders: 2,
        totalSpent: 725.00,
        lastOrderDate: new Date("2025-04-30"),
        createdAt: new Date("2025-03-20"),
      },
    ];

    // Filter by search term if provided
    let filteredCustomers = customers;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCustomers = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.includes(search)
      );
    }

    // Sort customers
    filteredCustomers.sort((a: any, b: any) => {
      const aValue = a[sort];
      const bValue = b[sort];
      
      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const paginatedCustomers = filteredCustomers.slice(skip, skip + limit);

    // Return paginated customers with metadata
    return NextResponse.json({
      customers: paginatedCustomers,
      meta: {
        total: filteredCustomers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredCustomers.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/customers - Create a new customer
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // In a real implementation, we would create a customer in the database with Prisma
    // For now, we'll just return the customer data with a generated ID
    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date(),
      ...body,
    };

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
