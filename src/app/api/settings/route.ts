import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/settings - Get store settings
export async function GET(req: NextRequest) {
  try {

    // In a real implementation, we would fetch settings from the database with Prisma
    // For now, we'll use placeholder data
    const settings = {
      storeName: "Geelong Garage Doors",
      storeEmail: "sales@geelonggaragedoors.com.au",
      storePhone: "(03) 5222 1234",
      storeAddress: "123 Main Street, Geelong VIC 3220",
      logoUrl: "/logo.png",
      primaryColor: "#0066cc",
      secondaryColor: "#f0f0f0",
      shippingNote: "Free shipping on orders over $100",
      returnPolicy: "30-day returns on all products",
      enableReviews: true,
      enableGuestCheckout: true,
      updatedAt: new Date(),
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update store settings
export async function PUT(req: NextRequest) {
  try {

    // Parse request body
    const body = await req.json();

    // In a real implementation, we would update settings in the database with Prisma
    // For now, we'll just return the updated settings
    const updatedSettings = {
      storeName: body.storeName || "Geelong Garage Doors",
      storeEmail: body.storeEmail || "sales@geelonggaragedoors.com.au",
      storePhone: body.storePhone || "(03) 5222 1234",
      storeAddress: body.storeAddress || "123 Main Street, Geelong VIC 3220",
      logoUrl: body.logoUrl || "/logo.png",
      primaryColor: body.primaryColor || "#0066cc",
      secondaryColor: body.secondaryColor || "#f0f0f0",
      shippingNote: body.shippingNote || "Free shipping on orders over $100",
      returnPolicy: body.returnPolicy || "30-day returns on all products",
      enableReviews: body.enableReviews !== undefined ? body.enableReviews : true,
      enableGuestCheckout: body.enableGuestCheckout !== undefined ? body.enableGuestCheckout : true,
      updatedAt: new Date(),
      ...body,
    };

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
