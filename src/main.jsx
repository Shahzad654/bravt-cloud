import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import ANTDProvider from "./providers/ANTDProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ANTDProvider>
      <App />
    </ANTDProvider>
  </Provider>
);
