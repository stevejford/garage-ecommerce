# Schema Changes Log

## 2025-05-22
- Created initial Prisma schema with the following models:
  - Product: Core product model with relations to brands, categories, and door types
  - Brand: For managing different manufacturers (B&D, Steel-Line, etc.)
  - Category: Main product categories
  - SubCategory: More specific product categorization
  - DoorType: Types of garage doors (Roller, Sectional, Tilt)
  - Image: For storing product images
  - Manual: For storing product manuals and documentation
  - Tag: For product tagging and filtering
  - Order: For customer orders
  - OrderItem: Individual items within an order
  - ClerkUser: For storing Clerk user metadata
- Added enums:
  - OrderStatus: For tracking order progress
  - UserRole: For distinguishing between admin and regular users
