"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./tanstackQuery";
import { Toaster } from "sonner";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  );
}
