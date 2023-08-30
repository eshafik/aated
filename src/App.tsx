import { RouterProvider } from "react-router-dom";
import { App as AntApp } from "antd";
import { protectedRouter } from "./route/router";

function App() {
  return (
    <AntApp>
      <RouterProvider router={protectedRouter} />
    </AntApp>
  );
}

export default App;
