import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/analytics/orders - Get order analytics
export async function GET(req: NextRequest) {
  try {
    // Get query parameters for filtering
    const url = new URL(req.url);
    const period = url.searchParams.get("period") || "30days";
    
    // In a real implementation, we would fetch order analytics from the database with Prisma
    // For now, we'll use placeholder data
    
    // Order stats
    const orderStats = {
      pending: 5,
      processing: 3,
      shipped: 8,
      delivered: 42,
      cancelled: 2,
      total: 60,
      conversion: 3.2, // percentage
    };
    
    // Order trends over time
    const getOrderTrends = () => {
      const days = period === "7days" ? 7 : period === "30days" ? 30 : period === "90days" ? 90 : 365;
      const result = [];
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate random order data
        const orders = Math.floor(Math.random() * 5) + 1;
        const revenue = (Math.random() * 500 + 200) * orders;
        
        result.push({
          date: date.toISOString().split('T')[0],
          orders,
          revenue: parseFloat(revenue.toFixed(2)),
          averageOrderValue: parseFloat((revenue / orders).toFixed(2)),
        });
      }
      
      // Sort by date ascending
      return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };
    
    // Order fulfillment metrics
    const fulfillmentMetrics = {
      averageProcessingTime: 1.2, // days
      averageShippingTime: 3.5, // days
      averageDeliveryTime: 4.7, // days
      onTimeDeliveryRate: 94.5, // percentage
      returnRate: 2.8, // percentage
    };
    
    // Order distribution by status
    const ordersByStatus = [
      { status: "Pending", count: 5, percentage: 8.3 },
      { status: "Processing", count: 3, percentage: 5.0 },
      { status: "Shipped", count: 8, percentage: 13.3 },
      { status: "Delivered", count: 42, percentage: 70.0 },
      { status: "Cancelled", count: 2, percentage: 3.3 },
    ];
    
    // Order distribution by payment method
    const ordersByPaymentMethod = [
      { method: "Credit Card", count: 35, percentage: 58.3 },
      { method: "PayPal", count: 18, percentage: 30.0 },
      { method: "Bank Transfer", count: 5, percentage: 8.3 },
      { method: "Other", count: 2, percentage: 3.3 },
    ];
    
    // Recent orders
    const recentOrders = [
      {
        id: "order-1",
        orderNumber: "GGD-10001",
        customer: "John Smith",
        date: new Date("2025-05-28"),
        status: "Processing",
        total: 350.75,
        items: 3,
      },
      {
        id: "order-2",
        orderNumber: "GGD-10002",
        customer: "Sarah Johnson",
        date: new Date("2025-05-27"),
        status: "Shipped",
        total: 275.00,
        items: 2,
      },
      {
        id: "order-3",
        orderNumber: "GGD-10003",
        customer: "Michael Brown",
        date: new Date("2025-05-26"),
        status: "Delivered",
        total: 425.00,
        items: 4,
      },
      {
        id: "order-4",
        orderNumber: "GGD-10004",
        customer: "Emma Wilson",
        date: new Date("2025-05-25"),
        status: "Delivered",
        total: 150.00,
        items: 1,
      },
      {
        id: "order-5",
        orderNumber: "GGD-10005",
        customer: "David Lee",
        date: new Date("2025-05-24"),
        status: "Cancelled",
        total: 50.00,
        items: 1,
      },
    ];

    return NextResponse.json({
      orderStats,
      orderTrends: getOrderTrends(),
      fulfillmentMetrics,
      ordersByStatus,
      ordersByPaymentMethod,
      recentOrders,
      period,
    });
  } catch (error) {
    console.error("Error fetching order analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
