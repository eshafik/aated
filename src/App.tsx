import { RouterProvider } from "react-router-dom";
import { App as AntApp } from "antd";
import { protectedRouter, publicRoute } from "./route/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth } from "./libs/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});
function App() {
  const { isAuthenticated } = useAuth();
  console.log("Login", isAuthenticated);

  return (
    <AntApp>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={isAuthenticated ? protectedRouter : publicRoute}
        />
      </QueryClientProvider>
    </AntApp>
  );
}

export default App;
