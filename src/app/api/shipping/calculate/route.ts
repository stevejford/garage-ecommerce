import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/shipping/calculate - Calculate shipping cost for a cart
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.postcode || body.weight === undefined) {
      return NextResponse.json(
        { error: "Postcode and weight are required" },
        { status: 400 }
      );
    }

    const { postcode, weight, items } = body;
    
    // In a real implementation, we would:
    // 1. Find the shipping zone that matches the postcode
    // 2. Find the shipping rate within that zone that matches the weight
    // 3. Calculate the shipping cost based on the rate and any other factors
    
    // For now, we'll use a simple algorithm to calculate shipping
    let shippingZone;
    let shippingRate;
    
    // Determine shipping zone based on postcode
    const postcodeNum = parseInt(postcode);
    
    if (postcodeNum >= 3200 && postcodeNum <= 3220) {
      shippingZone = {
        id: "zone-1",
        name: "Geelong Metro",
      };
    } else if (postcodeNum >= 3000 && postcodeNum <= 3207) {
      shippingZone = {
        id: "zone-2",
        name: "Melbourne Metro",
      };
    } else if (postcodeNum >= 3221 && postcodeNum <= 3999) {
      shippingZone = {
        id: "zone-3",
        name: "Regional Victoria",
      };
    } else {
      shippingZone = {
        id: "zone-4",
        name: "Interstate",
      };
    }
    
    // Determine shipping rate based on weight and zone
    if (shippingZone.id === "zone-1") {
      if (weight <= 5) {
        shippingRate = {
          cost: 10,
          description: "Standard Shipping (0-5kg)",
        };
      } else if (weight <= 20) {
        shippingRate = {
          cost: 15,
          description: "Standard Shipping (5-20kg)",
        };
      } else {
        shippingRate = {
          cost: 25,
          description: "Heavy Item Shipping (20kg+)",
        };
      }
    } else if (shippingZone.id === "zone-2") {
      if (weight <= 5) {
        shippingRate = {
          cost: 15,
          description: "Standard Shipping (0-5kg)",
        };
      } else if (weight <= 20) {
        shippingRate = {
          cost: 25,
          description: "Standard Shipping (5-20kg)",
        };
      } else {
        shippingRate = {
          cost: 35,
          description: "Heavy Item Shipping (20kg+)",
        };
      }
    } else if (shippingZone.id === "zone-3") {
      if (weight <= 5) {
        shippingRate = {
          cost: 20,
          description: "Standard Shipping (0-5kg)",
        };
      } else if (weight <= 20) {
        shippingRate = {
          cost: 30,
          description: "Standard Shipping (5-20kg)",
        };
      } else {
        shippingRate = {
          cost: 45,
          description: "Heavy Item Shipping (20kg+)",
        };
      }
    } else {
      if (weight <= 5) {
        shippingRate = {
          cost: 30,
          description: "Standard Shipping (0-5kg)",
        };
      } else if (weight <= 20) {
        shippingRate = {
          cost: 45,
          description: "Standard Shipping (5-20kg)",
        };
      } else {
        shippingRate = {
          cost: 65,
          description: "Heavy Item Shipping (20kg+)",
        };
      }
    }
    
    // Apply any special rules or discounts
    let finalCost = shippingRate.cost;
    let discountApplied = false;
    let discountDescription = "";
    
    // Example: Free shipping for orders over $100
    if (items && items.length > 0) {
      const orderTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      
      if (orderTotal >= 100) {
        finalCost = 0;
        discountApplied = true;
        discountDescription = "Free shipping on orders over $100";
      }
    }
    
    // Return shipping calculation result
    return NextResponse.json({
      zone: shippingZone,
      rate: shippingRate,
      cost: finalCost,
      discountApplied,
      discountDescription,
      estimatedDelivery: {
        min: shippingZone.id === "zone-1" ? 1 : shippingZone.id === "zone-2" ? 2 : 3,
        max: shippingZone.id === "zone-1" ? 2 : shippingZone.id === "zone-2" ? 3 : 5,
        unit: "business days",
      },
    });
  } catch (error) {
    console.error("Error calculating shipping:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
