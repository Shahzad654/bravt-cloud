import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import ANTDProvider from "./providers/ANTDProvider.jsx";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ANTDProvider>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </ANTDProvider>
    </Provider>
  </BrowserRouter>
);
