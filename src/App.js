import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BeforeAfter from './pages/BeforeAfter/BeforeAfter';
import JupJup from './pages/JupJup/JupJup';
import SignIn from './pages/SignIn';
// import SignUp from './pages/signUp';
import { PageLayout } from 'Outlet';
import Main from 'pages/Main';
import ModalView from 'pages/ModalView';
import BeforAftertDetail from './pages/BeforeAfter/BeforAftertDetail';
import BeforAftertUpdate from './pages/BeforeAfter/BeforAftertUpdate';
import BeforAftertUpload from './pages/BeforeAfter/BeforAftertUpload';
import Chat from './pages/Chat/Chat';
import ChatOtherDetail from './pages/Chat/ChatOtherDetail';
import ChatOtherList from './pages/Chat/ChatOtherList';
import JupjupDetail from './pages/JupJup/JupJupDetail';
import JupjupUpdate from './pages/JupJup/JupJupUpdate';
import JupjupWrite from './pages/JupJup/JupJupWrite';
import Mypage from './pages/MyPage/Mypage';
import MypageGIVE from './pages/MyPage/MypageGive';
import MypageReceive from './pages/MyPage/MypageReceive';
import ProfileUpdate from './pages/Profile/ProfileUpdate';

export default function Example() {
  // const params = useParams();
  const location = useLocation();

  useEffect(() => {
    // URL의 쿼리 파라미터를 파싱합니다.
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');
    const userEmail = searchParams.get('userEmail');
    const userName = searchParams.get('userName');

    // sessionStorage에 저장
    if (accessToken) {
      sessionStorage.setItem('access_token', accessToken);
    }
    if (userEmail) {
      sessionStorage.setItem('userEmail', userEmail);
      window.dispatchEvent(new Event('loginStateChange'));
    }
    if (userName) sessionStorage.setItem('userName', userName);

    // ... 나머지 코드는 그대로 유지
  }, [location]);

  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route index element={<Main />} />
        <Route path='/JupJup' element={<JupJup />} />
        <Route path='/BeforeAfter' element={<BeforeAfter />} />
        <Route path='/signin' element={<SignIn />} />
        {/* <Route path='/signUp' element={<SignUp />}></Route> */}
        <Route path='/jupjupDetail' element={<JupjupDetail />} />
        <Route path='/beforAftertUpload' element={<BeforAftertUpload />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/beforAftertDetail' element={<BeforAftertDetail />} />
        <Route path='/jupjupWrite' element={<JupjupWrite />} />
        <Route path='/chatOtherList' element={<ChatOtherList />} />
        <Route path='/chatOtherDetail' element={<ChatOtherDetail />} />
        <Route path='/Mypage' element={<Mypage />} />
        <Route path='/MypageGIVE' element={<MypageGIVE />} />
        <Route path='/MypageReceive' element={<MypageReceive />} />
        <Route path='/jupjupUpdate' element={<JupjupUpdate />} />
        <Route path='/ProfileUpdate' element={<ProfileUpdate />} />
        <Route path='/beforAftertUpdate' element={<BeforAftertUpdate />} />
        <Route path='/modal' element={<ModalView />} />
      </Route>
    </Routes>
  );
}
