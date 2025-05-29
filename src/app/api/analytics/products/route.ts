import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/analytics/products - Get product analytics
export async function GET(req: NextRequest) {
  try {
    // Get query parameters for filtering
    const url = new URL(req.url);
    const period = url.searchParams.get("period") || "30days";
    
    // In a real implementation, we would fetch product analytics from the database with Prisma
    // For now, we'll use placeholder data
    
    // Top selling products
    const topProducts = [
      {
        id: "prod-1",
        name: "Sectional Garage Door",
        sales: 12,
        revenue: 7200.00,
        stock: 8,
        growth: 15, // percentage growth compared to previous period
      },
      {
        id: "prod-2",
        name: "Roller Garage Door",
        sales: 10,
        revenue: 5500.00,
        stock: 15,
        growth: 8,
      },
      {
        id: "prod-3",
        name: "Remote Control",
        sales: 25,
        revenue: 2250.00,
        stock: 30,
        growth: 22,
      },
      {
        id: "prod-4",
        name: "Smart Garage Door Opener",
        sales: 8,
        revenue: 3200.00,
        stock: 12,
        growth: 30,
      },
      {
        id: "prod-5",
        name: "Tilt Garage Door",
        sales: 6,
        revenue: 3000.00,
        stock: 5,
        growth: -5,
      },
    ];
    
    // Product categories performance
    const topCategories = [
      {
        id: "cat-1",
        name: "Sectional Doors",
        sales: 18,
        revenue: 10800.00,
        growth: 12,
      },
      {
        id: "cat-2",
        name: "Roller Doors",
        sales: 15,
        revenue: 8250.00,
        growth: 5,
      },
      {
        id: "cat-3",
        name: "Door Openers",
        sales: 22,
        revenue: 6600.00,
        growth: 18,
      },
      {
        id: "cat-4",
        name: "Accessories",
        sales: 35,
        revenue: 3150.00,
        growth: 25,
      },
    ];
    
    // Inventory status
    const inventoryStatus = {
      totalProducts: 120,
      lowStock: 8,
      outOfStock: 3,
      excessStock: 15,
      totalValue: 85000.00,
    };
    
    // Product performance over time
    const getProductPerformance = () => {
      const days = period === "7days" ? 7 : period === "30days" ? 30 : period === "90days" ? 90 : 365;
      const result = [];
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate random product performance data
        result.push({
          date: date.toISOString().split('T')[0],
          views: Math.floor(Math.random() * 200) + 100,
          addedToCart: Math.floor(Math.random() * 50) + 20,
          purchased: Math.floor(Math.random() * 20) + 5,
          conversionRate: (Math.random() * 5 + 2).toFixed(2),
        });
      }
      
      // Sort by date ascending
      return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    return NextResponse.json({
      topProducts,
      topCategories,
      inventoryStatus,
      productPerformance: getProductPerformance(),
      period,
    });
  } catch (error) {
    console.error("Error fetching product analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
