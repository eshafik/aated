import { RouterProvider } from "react-router-dom";
import { App as AntApp } from "antd";
import { protectedRouter, publicRoute } from "./route/router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});
function App() {
  const token = localStorage.getItem("token");

  return (
    <AntApp>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={token ? protectedRouter : publicRoute} />
      </QueryClientProvider>
    </AntApp>
  );
}

export default App;
