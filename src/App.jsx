import Header from "./components/header";
import ModalLogin from "./components/modal/ModalLogin";
import { useShowModal } from "./context/showModalContext";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FollowingFeature from "./features/Following";
import LiveFeature from "./features/live";
import UploadFeature from "./features/Upload";
import NotFound from "./components/NotFound";
import { lazy } from "react";
const HomeFeature = lazy(() => import("./features/home"));
const DetailsFeature = lazy(() => import("./features/detailsUser"));
const FeedbackFeautres = lazy(() => import("./features/feedback"));

function App() {
  const { showModal, setShowModal } = useShowModal();
  return (
    <div className="App">
      <Outlet />
      <ModalLogin open={showModal} setOpen={setShowModal} />
      <Routes>
        <Route index element={<HomeFeature></HomeFeature>}></Route>
        <Route path="/@:nickname/*" element={<DetailsFeature />}></Route>
        <Route
          path="/following"
          element={<FollowingFeature></FollowingFeature>}
        ></Route>
        <Route
          path="/feedback"
          element={<FeedbackFeautres></FeedbackFeautres>}
        ></Route>
        <Route path="/live" element={<LiveFeature></LiveFeature>}></Route>
        <Route path="/upload" element={<UploadFeature></UploadFeature>}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
