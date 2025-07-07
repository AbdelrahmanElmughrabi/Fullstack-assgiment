// App.tsx
// Main application component. Sets up React Query, routing, and page structure.
// Provides global context for data fetching and navigation.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

// Set up React Query client for server state management
const queryClient = new QueryClient();

function App() {
  return (
    // Provide React Query client to the app
    <QueryClientProvider client={queryClient}>
      {/* Set up client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Index />} />
          {/* Product detail page */}
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* 404 Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
