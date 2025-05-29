import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/categories - List all categories
export async function GET(req: NextRequest) {
  try {
    const categories = await db.category.findMany({
      include: {
        subCategories: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    // Transform the data to include product count
    const transformedCategories = categories.map(category => ({
      ...category,
      productCount: category.products.length,
      products: undefined, // Remove the products array
    }));

    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const category = await db.category.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });
    
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
