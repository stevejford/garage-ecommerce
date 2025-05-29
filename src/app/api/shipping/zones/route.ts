import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

// GET /api/shipping/zones - List all shipping zones
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

    // In a real implementation, we would fetch shipping zones from the database with Prisma
    // For now, we'll use placeholder data
    const shippingZones = [
      {
        id: "zone-1",
        name: "Geelong Metro",
        postcodeRange: "3200-3220",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "zone-2",
        name: "Melbourne Metro",
        postcodeRange: "3000-3207",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "zone-3",
        name: "Regional Victoria",
        postcodeRange: "3221-3999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "zone-4",
        name: "Interstate",
        postcodeRange: "1000-2999, 4000-9999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return NextResponse.json({ shippingZones });
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/shipping/zones - Create a new shipping zone
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
    if (!body.name || !body.postcodeRange) {
      return NextResponse.json(
        { error: "Name and postcode range are required" },
        { status: 400 }
      );
    }

    // In a real implementation, we would create a shipping zone in the database with Prisma
    // For now, we'll just return the shipping zone data with a generated ID
    const newShippingZone = {
      id: `zone-${Date.now()}`,
      name: body.name,
      postcodeRange: body.postcodeRange,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body,
    };

    return NextResponse.json(newShippingZone, { status: 201 });
  } catch (error) {
    console.error("Error creating shipping zone:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
