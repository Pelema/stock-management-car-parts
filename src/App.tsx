import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="h-[100vh]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
