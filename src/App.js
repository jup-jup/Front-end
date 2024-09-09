import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import JupJup from "./pages/JupJup/JupJup";
import SignIn from "./pages/SignIn/SignIn";
// import SignUp from './pages/signUp';
import { PageLayout } from "Outlet";
import Main from "pages/Main/Main";
import ModalView from "pages/ModalView";
import Chat from "./pages/Chat/Chat";
import ChatOtherDetail from "./pages/Chat/ChatOtherDetail";
import ChatOtherList from "./pages/Chat/ChatOtherList";
import JupjupDetail from "./pages/JupJup/JupJupDetail";
import WriteUpdate from "./pages/WriteOrUpdate/WriteUpdate";
import Mypage from "./pages/MyPage/Mypage";
import MypageGiveReceive from "./pages/MyPage/MypageGiveReceive";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";
import { jwtDecode } from "jwt-decode";
import { parseJwt } from "hooks/useParseJwt";
import { useAtom } from "jotai";
import { userAtom } from "store/User";
import { isDev } from "util/Util";
import PrivateRoute from "components/privateRoute/PrivateRoute";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setName] = useAtom(userAtom);

  useEffect(() => {
    // URL의 쿼리 파라미터를 파싱합니다.
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      try {
        // JWT 토큰 디코딩
        const decodedToken = jwtDecode(accessToken);

        // 디코딩된 토큰에서 필요한 정보 추출
        const { userName, exp } = decodedToken;

        // localStorage 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setName(userName);

        // 토큰 만료 시간 저장 (밀리초 단위)
        // localStorage.setItem("tokenExpiration", exp * 1000);

        // 로그인 상태 변경 이벤트 발생
        window.dispatchEvent(new Event("loginStateChange"));

        console.log("Token decoded and stored successfully");

        navigate("/");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Main />} />
        <Route path="/JupJup" element={<JupJup />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path='/signUp' element={<SignUp />}></Route> */}
        <Route path="/jupjupDetail/:id" element={<JupjupDetail />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/WriteUpdate/:id" element={<WriteUpdate />} />
        <Route
          path="/chatOtherList"
          element={<PrivateRoute element={<ChatOtherList />} />}
        />
        <Route path="/chatOtherDetail/:id" element={<ChatOtherDetail />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/MypageGiveReceive/:id" element={<MypageGiveReceive />} />
        <Route path="/ProfileUpdate" element={<ProfileUpdate />} />
        <Route path="/modal" element={<ModalView />} />
      </Route>
    </Routes>
  );
}
