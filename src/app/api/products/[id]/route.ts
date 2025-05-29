import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products/:id - Get product details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        images: true,
        manuals: true,
        doorType: true,
        tags: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/products/:id - Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const product = await db.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        sku: body.sku,
        stockQty: parseInt(body.stockQty),
        brandId: body.brandId,
        categoryId: body.categoryId,
        subCategoryId: body.subCategoryId,
        compatibilityNotes: body.compatibilityNotes,
        isFeatured: body.isFeatured,
        isArchived: body.isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/:id - Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
