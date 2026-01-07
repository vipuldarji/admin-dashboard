import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect all dashboard routes, product routes, etc.
export const config = { 
  matcher: [
    "/dashboard/:path*", 
    "/products/:path*", 
    "/orders/:path*", 
    "/customers/:path*",
    "/inquiries/:path*",
    "/settings/:path*"
  ] 
};