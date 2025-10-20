/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Router } from "./Router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <Toaster />
          <Router />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
