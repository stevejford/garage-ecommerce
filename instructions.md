# Geelong Garage Doors E-Commerce - Project Instructions

## 1. Project Overview
This project is a full-stack e-commerce application for Geelong Garage Doors, a specialized supplier of garage door parts in Australia. The platform will enable customers to browse, search, and purchase garage door components from various brands including B&D, Steel-Line, Centurion, Taurean, and Eco Garage Doors, as well as generic/remanufactured parts and remote controls. The application includes both a customer-facing storefront and an admin dashboard for product, order, and content management.

## 2. Core Functionalities

### Authentication
- Role-based access control (admin vs user)
- Secure login/signup flows via Clerk
- Protected routes based on user roles

### Admin Dashboard
- Product management (CRUD operations)
- Order processing and management
- Brand and category management
- File uploads and management
- Inventory tracking

### Customer Storefront
- Product browsing by brand, category, and door type
- Product search and filtering
- Product detail pages with compatibility information
- Shopping cart functionality
- Order submission process

### Data Management
- PostgreSQL database via Neon
- File storage via UploadThing
- Product compatibility tracking
- Order history and status tracking

## 3. Docs and Libraries

### Frontend
- Next.js 15 with App Router
- React 18+
- TypeScript
- TailwindCSS for styling
- shadcn/ui for component library
- lucide-react for icons
- Framer Motion for animations

### Authentication
- Clerk (https://clerk.com/docs)

### Database
- Neon PostgreSQL (https://neon.tech/docs)
- Prisma ORM (https://www.prisma.io/docs)

### File Management
- UploadThing (https://docs.uploadthing.com/)

## 4. Current File Structure
```
/garage-ecommerce
├── MVP.md
├── ROADMAP.md
└── instructions.md
```

## Development Process
1. Follow the ROADMAP.md file for development phases
2. Implement features according to the MVP.md priorities
3. Test each functionality after implementation
4. Document file changes in filechanges.md
5. Document schema changes in schemachanges.md
6. Update ROADMAP.md after completing each phase
