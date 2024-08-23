import { useParams, useLocation, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { posts } from "components/dummydata/chat";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JupJup from "./pages/jupjup";
import BeforeAfter from "./pages/beforeAfter";
import SignIn from "./pages/signIn";
// import SignUp from './pages/signUp';
import ForgetPw from "./pages/forgetPw";
import BeforAftertUpload from "./pages/beforAftertUpload";
import BeforAftertDetail from "./pages/beforAftertDetail";
import JupjupDetail from "./pages/jupjupDetail";
import Chat from "./pages/chat";
import JupjupWrite from "./pages/jupjupWrite";
import ChatOtherList from "./pages/chatOtherList";
import ChatOtherDetail from "./pages/chatOtherDetail";
import Mypage from "./pages/Mypage";
import MypageGIVE from "./pages/MypageGIVE";
import MypageReceive from "./pages/MypageReceive";
import JupjupUpdate from "./pages/jupjupUpdate";
import ProfileUpdate from "./pages/ProfileUpdate";
import BeforAftertUpdate from "./pages/beforAftertUpdate";
import Main from "pages/Main";
import { PageLayout } from "Outlet";
import ModalView from "pages/ModalView";

export default function Example() {
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    // URL의 쿼리 파라미터를 파싱합니다.
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("access_token");
    const userEmail = searchParams.get("userEmail");
    const userName = searchParams.get("userName");

    // sessionStorage에 저장
    if (accessToken) {
      sessionStorage.setItem("access_token", accessToken);
    }
    if (userEmail) {
      sessionStorage.setItem("userEmail", userEmail);
      window.dispatchEvent(new Event("loginStateChange"));
    }
    if (userName) sessionStorage.setItem("userName", userName);

    // ... 나머지 코드는 그대로 유지
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Main />} />
          <Route path="/JupJup" element={<JupJup />} />
          <Route path="/BeforeAfter" element={<BeforeAfter />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path='/signUp' element={<SignUp />}></Route> */}
          <Route path="/forgetPw" element={<ForgetPw />} />
          <Route path="/jupjupDetail" element={<JupjupDetail />} />
          <Route path="/beforAftertUpload" element={<BeforAftertUpload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/beforAftertDetail" element={<BeforAftertDetail />} />
          <Route path="/jupjupWrite" element={<JupjupWrite />} />
          <Route path="/chatOtherList" element={<ChatOtherList />} />
          <Route path="/chatOtherDetail" element={<ChatOtherDetail />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/MypageGIVE" element={<MypageGIVE />} />
          <Route path="/MypageReceive" element={<MypageReceive />} />
          <Route path="/jupjupUpdate" element={<JupjupUpdate />} />
          <Route path="/ProfileUpdate" element={<ProfileUpdate />} />
          <Route path="/beforAftertUpdate" element={<BeforAftertUpdate />} />

          <Route path="/modal" element={<ModalView />} />
        </Route>
      </Routes>
    </div>
  );
}
