// Define basic types for our e-commerce system
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stockQty: number;
  brandId: string;
  categoryId: string;
  subCategoryId?: string | null;
  compatibilityNotes?: string | null;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description?: string | null;
  logo?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string | null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DoorType {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  url: string;
  productId: string;
  isMain: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Manual {
  id: string;
  name: string;
  url: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface ClerkUser {
  id: string;
  email: string;
  fullName?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Extended types with relations
export interface ProductWithRelations extends Product {
  brand?: Brand;
  category?: Category;
  subCategory?: SubCategory | null;
  doorType?: DoorType[];
  images?: Image[];
  manuals?: Manual[];
  tags?: Tag[];
  orderItems?: OrderItem[];
}

export interface OrderWithItems extends Order {
  items: (OrderItem & {
    product: Product;
  })[];
}

export interface CategoryWithRelations extends Category {
  subCategories: SubCategory[];
  products: Product[];
}

export interface BrandWithRelations extends Brand {
  products: Product[];
}
