import Header from "./components/header";
import ModalLogin from "./components/modal/ModalLogin";
import { useShowModal } from "./context/showModalContext";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeFeature from "./features/home";
import FollowingFeature from "./features/Following";
import DetailsFeature from "./features/detailsUser";
import FeedbackFeautres from "./features/feedback";
import LiveFeature from "./features/live";
import UploadFeature from "./features/Upload";
import NotFound from "./components/NotFound";

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
