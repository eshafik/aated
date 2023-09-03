import { RouterProvider } from "react-router-dom";
import { App as AntApp } from "antd";
import { publicRoute } from "./route/router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});
function App() {
  return (
    <AntApp>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={publicRoute} />
      </QueryClientProvider>
    </AntApp>
  );
}

export default App;
