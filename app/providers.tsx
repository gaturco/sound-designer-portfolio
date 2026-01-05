"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useMemo } from "react";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useMemo(
    () => [
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
      }),
    ],
    []
  );
  const [trpcClient] = useMemo(
    () => [
      trpc.createClient({
        links: [
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              }).then(res => {
                console.log('tRPC Response:', res.status);
                return res;
              });
            },
          }),
        ],
      }),
    ],
    []
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" switchable={false}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
