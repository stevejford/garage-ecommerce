import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/brands/:id - Get brand details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const brand = await db.brand.findUnique({
      where: { id: params.id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            sku: true,
            stockQty: true,
            isFeatured: true,
            images: {
              where: { isMain: true },
              take: 1,
            },
          },
        },
      },
    });

    if (!brand) {
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/brands/:id - Update brand
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const brand = await db.brand.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        logo: body.logo,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error updating brand:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/brands/:id - Delete brand
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if there are products with this brand
    const productsCount = await db.product.count({
      where: { brandId: params.id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete brand with products" },
        { status: 400 }
      );
    }

    await db.brand.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
