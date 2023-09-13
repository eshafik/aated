import { StyleProvider } from "@ant-design/cssinjs";
import { App as AntApp, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { useAuth } from "./libs/auth";
import { protectedRouter, publicRoute } from "./route/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AntApp>
      <ConfigProvider>
        <StyleProvider hashPriority="high">
          <QueryClientProvider client={queryClient}>
            <RouterProvider
              router={isAuthenticated ? protectedRouter : publicRoute}
            />
          </QueryClientProvider>
        </StyleProvider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
