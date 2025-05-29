"use client";

import React from "react";
import { useUser, SignIn, UserProfile, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { 
  FiPackage, 
  FiUser, 
  FiSettings, 
  FiShoppingBag, 
  FiLogOut, 
  FiChevronRight, 
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiTruck
} from "react-icons/fi";

// Helper component for account navigation items
const AccountNavItem = ({ 
  icon: Icon, 
  title, 
  href, 
  active = false, 
  onClick 
}: { 
  icon: React.ElementType, 
  title: string, 
  href: string, 
  active?: boolean, 
  onClick?: () => void 
}) => (
  <Link 
    href={href}
    onClick={onClick}
    className={`flex items-center p-4 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{title}</span>
    <FiChevronRight className="ml-auto w-5 h-5 text-gray-400" />
  </Link>
);

// Order status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Delivered: 'bg-green-100 text-green-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Processing: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.default;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

// Order card component
const OrderCard = ({ order }: { order: any }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
      <div className="mb-2 md:mb-0">
        <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
        <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center">
        <OrderStatusBadge status={order.status} />
      </div>
    </div>
    
    <div className="border-t border-gray-100 pt-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
          <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
        </div>
        <Link 
          href={`/account/orders/${order.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View details
        </Link>
      </div>
    </div>
  </div>
);

export default function AccountPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  
  // Sample order history data
  const orderHistory = [
    { 
      id: "ORD-001", 
      date: "2025-05-15", 
      status: "Delivered", 
      total: 149.97,
      items: [
        { name: "Garage Door Opener", quantity: 1, price: 129.99 },
        { name: "Installation Kit", quantity: 1, price: 19.98 }
      ]
    },
    { 
      id: "ORD-002", 
      date: "2025-04-28", 
      status: "Shipped", 
      total: 89.99,
      items: [
        { name: "Garage Door Seal", quantity: 2, price: 44.99 }
      ]
    },
  ];
  
  // Show loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }
  
  // Default view for unauthenticated users
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
          </div>
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <SignIn
              appearance={{
                baseTheme: dark,
                elements: {
                  formButtonPrimary: 'w-full bg-blue-600 hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-md',
                  footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
                  card: 'shadow-none',
                  header: 'hidden',
                  footer: 'pb-0',
                  formFieldInput: 'rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  formFieldLabel: 'text-gray-700 text-sm font-medium',
                }
              }}
              signUpUrl="/auth/sign-up"
              redirectUrl="/account"
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="font-medium text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Authenticated user view
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {user?.firstName || 'Valued Customer'}
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 space-x-3">
            <Link
              href="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiShoppingBag className="-ml-1 mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <nav className="space-y-1">
                  <AccountNavItem 
                    icon={FiUser} 
                    title="Account Overview" 
                    href="/account" 
                    active={true} 
                  />
                  <AccountNavItem 
                    icon={FiPackage} 
                    title="My Orders" 
                    href="/account/orders" 
                  />
                  <AccountNavItem 
                    icon={FiMapPin} 
                    title="Addresses" 
                    href="/account/addresses" 
                  />
                  <AccountNavItem 
                    icon={FiSettings} 
                    title="Account Settings" 
                    href="/account/settings" 
                  />
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Welcome back, {user?.firstName}!</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Here's what's happening with your orders and account.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      href="/account/orders"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View All Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <FiPackage className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">12</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                      <FiClock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Processing</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">2</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <FiCheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Delivered</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">10</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {orderHistory.length > 0 ? (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                    <div className="text-center mt-6">
                      <Link
                        href="/account/orders"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View all orders <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by placing an order.</p>
                    <div className="mt-6">
                      <Link
                        href="/shop"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiShoppingBag className="-ml-1 mr-2 h-5 w-5" />
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
