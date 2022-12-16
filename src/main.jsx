import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ShowModalProvider } from "./context/showModalContext";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./components/loading/LoadingPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Suspense fallback={<LoadingPage />}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ShowModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </ShowModalProvider>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </Provider>
  </Suspense>
  //  </StrictMode>
);
