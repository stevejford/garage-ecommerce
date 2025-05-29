import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products - List, filter, sort, and paginate products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId");
    const brandId = searchParams.get("brandId");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Build the where clause based on filters
    const where: any = {
      isArchived: false,
    };
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (brandId) {
      where.brandId = brandId;
    }
    
    // Get products with pagination
    const products = await db.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        subCategory: true,
        images: {
          where: { isMain: true },
          take: 1,
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });
    
    // Get total count for pagination
    const total = await db.product.count({ where });
    
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const product = await db.product.create({
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
        isFeatured: body.isFeatured || false,
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
