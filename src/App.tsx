import { RouterProvider } from "react-router-dom";
import { App as AntApp } from "antd";
import { publicRoute } from "./route/router";

function App() {
  return (
    <AntApp>
      <RouterProvider router={publicRoute} />
    </AntApp>
  );
}

export default App;
