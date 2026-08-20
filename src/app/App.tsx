import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
// Changed the path below from "./app/..." to "./..."
import { AIEngineProvider } from "./context/AIEngineContext"; 

function App() {
  return (
    <AIEngineProvider>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            border: "1px solid hsl(var(--border) / 0.2)",
            fontSize: "13px",
          },
        }}
        richColors
      />
    </AIEngineProvider>
  );
}

export default App;