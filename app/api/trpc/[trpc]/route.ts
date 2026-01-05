import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@server/routers";
import type { TrpcContext } from "@server/_core/context";

async function createContext(): Promise<TrpcContext> {
  return {
    req: {} as any,
    res: {} as any,
    user: null,
  };
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
