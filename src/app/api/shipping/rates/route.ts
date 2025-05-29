import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

// GET /api/shipping/rates - List all shipping rates
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

    // Get query parameters for filtering
    const url = new URL(req.url);
    const zoneId = url.searchParams.get("zoneId");

    // In a real implementation, we would fetch shipping rates from the database with Prisma
    // For now, we'll use placeholder data
    const shippingRates = [
      {
        id: "rate-1",
        zoneId: "zone-1",
        zoneName: "Geelong Metro",
        minWeight: 0,
        maxWeight: 5,
        cost: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "rate-2",
        zoneId: "zone-1",
        zoneName: "Geelong Metro",
        minWeight: 5.01,
        maxWeight: 20,
        cost: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "rate-3",
        zoneId: "zone-2",
        zoneName: "Melbourne Metro",
        minWeight: 0,
        maxWeight: 5,
        cost: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "rate-4",
        zoneId: "zone-2",
        zoneName: "Melbourne Metro",
        minWeight: 5.01,
        maxWeight: 20,
        cost: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "rate-5",
        zoneId: "zone-3",
        zoneName: "Regional Victoria",
        minWeight: 0,
        maxWeight: 5,
        cost: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "rate-6",
        zoneId: "zone-4",
        zoneName: "Interstate",
        minWeight: 0,
        maxWeight: 5,
        cost: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Filter by zoneId if provided
    let filteredRates = shippingRates;
    if (zoneId) {
      filteredRates = shippingRates.filter(rate => rate.zoneId === zoneId);
    }

    return NextResponse.json({ shippingRates: filteredRates });
  } catch (error) {
    console.error("Error fetching shipping rates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/shipping/rates - Create a new shipping rate
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
    if (!body.zoneId || body.minWeight === undefined || body.maxWeight === undefined || body.cost === undefined) {
      return NextResponse.json(
        { error: "Zone ID, min weight, max weight, and cost are required" },
        { status: 400 }
      );
    }

    // In a real implementation, we would create a shipping rate in the database with Prisma
    // For now, we'll just return the shipping rate data with a generated ID
    const newShippingRate = {
      id: `rate-${Date.now()}`,
      zoneId: body.zoneId,
      zoneName: body.zoneName || "Unknown Zone",
      minWeight: parseFloat(body.minWeight),
      maxWeight: parseFloat(body.maxWeight),
      cost: parseFloat(body.cost),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body,
    };

    return NextResponse.json(newShippingRate, { status: 201 });
  } catch (error) {
    console.error("Error creating shipping rate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
