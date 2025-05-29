import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/analytics/sales - Get sales analytics
export async function GET(req: NextRequest) {
  try {

    // Get query parameters for filtering
    const url = new URL(req.url);
    const period = url.searchParams.get("period") || "30days";
    
    // In a real implementation, we would fetch sales data from the database with Prisma
    // For now, we'll use placeholder data
    
    // Generate daily sales data for the specified period
    const getDailySales = () => {
      const days = period === "7days" ? 7 : period === "30days" ? 30 : period === "90days" ? 90 : 365;
      const result = [];
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate random sales data
        const sales = Math.floor(Math.random() * 1000) + 500;
        const orders = Math.floor(Math.random() * 10) + 1;
        
        result.push({
          date: date.toISOString().split('T')[0],
          sales,
          orders,
          averageOrderValue: Math.round(sales / orders),
        });
      }
      
      // Sort by date ascending
      return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };
    
    // Generate monthly sales data
    const getMonthlySales = () => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const result = [];
      
      for (let i = 0; i < 12; i++) {
        const month = months[i];
        
        // Generate random sales data
        const sales = Math.floor(Math.random() * 20000) + 8000;
        const orders = Math.floor(Math.random() * 100) + 50;
        
        result.push({
          month,
          sales,
          orders,
          averageOrderValue: Math.round(sales / orders),
        });
      }
      
      return result;
    };
    
    // Sales summary data
    const salesData = {
      today: 1250.75,
      yesterday: 975.50,
      thisWeek: 5430.25,
      lastWeek: 4875.00,
      thisMonth: 22450.75,
      lastMonth: 19875.50,
      thisYear: 125750.25,
    };
    
    // Sales by channel
    const salesByChannel = [
      { channel: "Website", sales: 15250.50, percentage: 68 },
      { channel: "Phone", sales: 4500.25, percentage: 20 },
      { channel: "In-Store", sales: 2700.00, percentage: 12 },
    ];
    
    // Sales by payment method
    const salesByPaymentMethod = [
      { method: "Credit Card", sales: 12500.75, percentage: 55 },
      { method: "PayPal", sales: 6800.50, percentage: 30 },
      { method: "Bank Transfer", sales: 2250.25, percentage: 10 },
      { method: "Other", sales: 1100.00, percentage: 5 },
    ];

    return NextResponse.json({
      summary: salesData,
      dailySales: getDailySales(),
      monthlySales: getMonthlySales(),
      salesByChannel,
      salesByPaymentMethod,
      period,
    });
  } catch (error) {
    console.error("Error fetching sales analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
