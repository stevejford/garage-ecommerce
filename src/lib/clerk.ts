import { currentUser } from "@clerk/nextjs/server";
import type { OrganizationMembership, User as ClerkUser } from "@clerk/nextjs/server";

// Extended User type to include organizationMemberships
type User = ClerkUser & {
  organizationMemberships?: OrganizationMembership[];
};

export const getUser = async () => {
  try {
    const user = await currentUser();
    return user;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
};

export const getUserRole = async () => {
  try {
    const user = await currentUser() as User | null;
    if (!user) return null;
    
    // Check if the user has an admin role in any organization
    const isAdmin = user.organizationMemberships?.some(
      (membership: OrganizationMembership) => membership.role === "org:admin"
    );

    return isAdmin ? "admin" : "user";
  } catch (error) {
    console.error("Failed to get user role:", error);
    return null;
  }
};
