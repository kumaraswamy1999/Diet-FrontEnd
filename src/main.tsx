import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/appRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
