# Database Schema (Draft)

## Product Table
- id (UUID, PK)
- name (string)
- description (text, rich)
- price (decimal)
- sku (string, unique)
- status (enum: draft, published, archived)
- stock (integer)
- low_stock_threshold (integer)
- category_id (FK)
- brand_id (FK)
- weight (decimal)  # For shipping
- image_url (string) — main image
- gallery (array of strings) — additional images
- seo_title (string)
- seo_description (string)
- created_at (timestamp)
- updated_at (timestamp)

## Category Table
- id (UUID, PK)
- name (string)
- parent_id (FK, nullable)
- slug (string, unique)
- sort_order (integer)
- created_at, updated_at

## Brand Table
- id (UUID, PK)
- name (string)
- slug (string, unique)
- logo_url (string)
- created_at, updated_at

## Order Table
- id (UUID, PK)
- customer_id (FK)
- status (enum: pending, paid, shipped, completed, cancelled)
- total (decimal)
- shipping_cost (decimal)
- shipping_method (string)
- shipping_zone (string)
- shipping_address (json)
- billing_address (json)
- tracking_number (string)
- notes (text)
- created_at, updated_at

## OrderItem Table
- id (UUID, PK)
- order_id (FK)
- product_id (FK)
- quantity (integer)
- price (decimal)
- variant (json, optional)

## Customer Table
- id (UUID, PK)
- name (string)
- email (string, unique)
- phone (string)
- address (json)
- created_at, updated_at

## Media/File Table
- id (UUID, PK)
- url (string)
- type (enum: image, pdf, manual, etc.)
- product_id (FK, nullable)
- alt_text (string)
- uploaded_by (FK to staff)
- created_at

## Staff Table
- id (UUID, PK)
- name (string)
- email (string, unique)
- role (enum: admin, manager, staff)
- created_at, updated_at

## Settings Table
- id (PK, singleton)
- store_name, branding, etc.

## ShippingZone Table
- id (UUID, PK)
- name (string)
- postcode_range (string or array)
- created_at, updated_at

## ShippingRate Table
- id (UUID, PK)
- zone_id (FK)
- min_weight (decimal)
- max_weight (decimal)
- cost (decimal)
- created_at, updated_at
