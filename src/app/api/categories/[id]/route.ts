import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/categories/:id - Get category details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        subCategories: true,
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

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/categories/:id - Update category
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const category = await db.category.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/:id - Delete category
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if there are products in this category
    const productsCount = await db.product.count({
      where: { categoryId: params.id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with products" },
        { status: 400 }
      );
    }

    await db.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
