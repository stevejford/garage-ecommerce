import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/media - List media/files
export async function GET(req: NextRequest) {
  try {
    // Get query parameters for filtering, sorting, and pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const type = url.searchParams.get("type"); // image, manual, etc.
    const productId = url.searchParams.get("productId");
    const sort = url.searchParams.get("sort") || "createdAt";
    const order = url.searchParams.get("order") || "desc";

    // Calculate pagination values
    const skip = (page - 1) * limit;

    // In a real implementation, we would fetch media files from the database with Prisma
    // For now, we'll use placeholder data
    const mediaFiles = [
      {
        id: "media-1",
        name: "sectional-door-1.jpg",
        url: "https://example.com/uploads/sectional-door-1.jpg",
        thumbnailUrl: "https://example.com/uploads/thumbnails/sectional-door-1.jpg",
        type: "image",
        size: 1024000, // bytes
        productId: "prod-1",
        productName: "Sectional Garage Door",
        createdAt: new Date("2025-05-15"),
      },
      {
        id: "media-2",
        name: "sectional-door-2.jpg",
        url: "https://example.com/uploads/sectional-door-2.jpg",
        thumbnailUrl: "https://example.com/uploads/thumbnails/sectional-door-2.jpg",
        type: "image",
        size: 1536000, // bytes
        productId: "prod-1",
        productName: "Sectional Garage Door",
        createdAt: new Date("2025-05-15"),
      },
      {
        id: "media-3",
        name: "roller-door-1.jpg",
        url: "https://example.com/uploads/roller-door-1.jpg",
        thumbnailUrl: "https://example.com/uploads/thumbnails/roller-door-1.jpg",
        type: "image",
        size: 921600, // bytes
        productId: "prod-2",
        productName: "Roller Garage Door",
        createdAt: new Date("2025-05-10"),
      },
      {
        id: "media-4",
        name: "installation-guide.pdf",
        url: "https://example.com/uploads/installation-guide.pdf",
        thumbnailUrl: "https://example.com/uploads/thumbnails/pdf-icon.png",
        type: "manual",
        size: 2048000, // bytes
        productId: null,
        productName: null,
        createdAt: new Date("2025-04-20"),
      },
      {
        id: "media-5",
        name: "smart-opener-manual.pdf",
        url: "https://example.com/uploads/smart-opener-manual.pdf",
        thumbnailUrl: "https://example.com/uploads/thumbnails/pdf-icon.png",
        type: "manual",
        size: 3072000, // bytes
        productId: "prod-4",
        productName: "Smart Garage Door Opener",
        createdAt: new Date("2025-04-15"),
      },
    ];

    // Filter by type if provided
    let filteredFiles = mediaFiles;
    if (type) {
      filteredFiles = filteredFiles.filter(file => file.type === type);
    }

    // Filter by productId if provided
    if (productId) {
      filteredFiles = filteredFiles.filter(file => file.productId === productId);
    }

    // Sort files
    filteredFiles.sort((a: any, b: any) => {
      const aValue = a[sort];
      const bValue = b[sort];
      
      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const paginatedFiles = filteredFiles.slice(skip, skip + limit);

    // Return paginated files with metadata
    return NextResponse.json({
      mediaFiles: paginatedFiles,
      meta: {
        total: filteredFiles.length,
        page,
        limit,
        totalPages: Math.ceil(filteredFiles.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching media files:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/media - Delete multiple media files
export async function DELETE(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return NextResponse.json(
        { error: "Media file IDs are required" },
        { status: 400 }
      );
    }

    const { ids } = body;

    // In a real implementation, we would delete the media files from the database with Prisma
    // For now, we'll just return a success message
    
    return NextResponse.json({
      message: `${ids.length} media file(s) deleted successfully`,
      deletedIds: ids,
    });
  } catch (error) {
    console.error("Error deleting media files:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
