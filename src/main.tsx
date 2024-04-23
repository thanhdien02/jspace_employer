import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/configureStore.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider
      //  clientId="577482635111-k3s954r3ldl1vkf7fnd60r4vrtnukb0a.apps.googleusercontent.com"
      clientId="812530234129-9ri12aol4ntmq4sdlk2b4fqhl1rkr7uv.apps.googleusercontent.com"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
