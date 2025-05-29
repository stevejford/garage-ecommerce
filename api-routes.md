# API Route Structure

This document outlines all planned API endpoints for the Geelong Garage Doors e-commerce backend, including admin and storefront functionality, shipping logic, and advanced features. Use as a reference for backend and frontend integration.

---

## Products
- `GET /api/products` — List, filter, sort, and paginate products
- `POST /api/products` — Create a new product
- `GET /api/products/:id` — Get product details
- `PUT /api/products/:id` — Update product
- `DELETE /api/products/:id` — Delete product
- `POST /api/products/import` — Bulk import products (CSV/XLSX)
- `GET /api/products/export` — Export products

## Categories
- `GET /api/categories`
- `POST /api/categories`
- `GET /api/categories/:id`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

## Brands
- `GET /api/brands`
- `POST /api/brands`
- `GET /api/brands/:id`
- `PUT /api/brands/:id`
- `DELETE /api/brands/:id`

## Orders
- `GET /api/orders` — List, filter, search, paginate
- `POST /api/orders` — Create order (checkout)
- `GET /api/orders/:id` — Order details
- `PUT /api/orders/:id` — Update order (status, tracking)
- `DELETE /api/orders/:id` — Cancel/delete order

## Customers
- `GET /api/customers`
- `POST /api/customers`
- `GET /api/customers/:id`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

## Media/Files (UploadThing)
- `POST /api/upload` — Upload image/file (UploadThing handler)
- `GET /api/media` — List media/files
- `DELETE /api/media/:id` — Delete file

## Staff
- `GET /api/staff`
- `POST /api/staff`
- `PUT /api/staff/:id`
- `DELETE /api/staff/:id`

## Settings
- `GET /api/settings`
- `PUT /api/settings`

## Shipping Zones & Rates
- `GET /api/shipping/zones` — List all shipping zones
- `POST /api/shipping/zones` — Create a shipping zone
- `GET /api/shipping/zones/:id` — Get shipping zone details
- `PUT /api/shipping/zones/:id` — Update zone
- `DELETE /api/shipping/zones/:id` — Delete zone

- `GET /api/shipping/rates` — List all shipping rates
- `POST /api/shipping/rates` — Create shipping rate
- `GET /api/shipping/rates/:id` — Get rate details
- `PUT /api/shipping/rates/:id` — Update rate
- `DELETE /api/shipping/rates/:id` — Delete rate

- `POST /api/shipping/calculate` — Calculate shipping cost for a cart (input: postcode, weight, etc.)

## Discounts, Coupons, Promotions (Advanced/Future)
- `GET /api/discounts`
- `POST /api/discounts`
- `PUT /api/discounts/:id`
- `DELETE /api/discounts/:id`

## Reviews & Q&A (Advanced/Future)
- `GET /api/reviews`
- `POST /api/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`

## Analytics & Dashboard
- `GET /api/analytics/sales`
- `GET /api/analytics/products`
- `GET /api/analytics/orders`

## Webhooks/API Keys (Advanced/Future)
- `POST /api/webhooks/:service`
- `GET /api/api-keys`
- `POST /api/api-keys`
- `DELETE /api/api-keys/:id`

---

**All endpoints should follow REST conventions and return clear, consistent responses. Admin endpoints should be protected with Clerk authentication once enabled.**
