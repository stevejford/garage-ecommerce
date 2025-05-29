import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/brands - List all brands
export async function GET(req: NextRequest) {
  try {
    const brands = await db.brand.findMany({
      include: {
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    // Transform the data to include product count
    const transformedBrands = brands.map(brand => ({
      ...brand,
      productCount: brand.products.length,
      products: undefined, // Remove the products array
    }));

    return NextResponse.json(transformedBrands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/brands - Create a new brand
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const brand = await db.brand.create({
      data: {
        name: body.name,
        description: body.description,
        logo: body.logo,
      },
    });
    
    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
