import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@server/routers";
import type { TrpcContext } from "@server/_core/context";

async function createContext(req: Request): Promise<TrpcContext> {
  // Check if user is authenticated via admin cookie
  const cookieHeader = req.headers.get("cookie") || "";
  const isAuthenticated = cookieHeader.includes("admin_authenticated=true");
  
  return {
    req: {} as any,
    res: {} as any,
    user: isAuthenticated ? { id: "admin", name: "Admin" } : null,
  };
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });

export { handler as GET, handler as POST };
