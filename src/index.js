import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Footer from './components/Footer';
import JupJup from './pages/jupjup';
import BeforeAfter from './pages/beforeAfter';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import ForgetPw from './pages/forgetPw';
import BeforAftertUpload from './pages/beforAftertUpload';
import BeforAftertDetail from './pages/beforAftertDetail';
import JupjupDetail from './pages/jupjupDetail';
import Chat from './pages/chat';
import JupjupWrite from './pages/jupjupWrite';
import ChatOtherList from './pages/chatOtherList';
import ChatOtherDetail from './pages/chatOtherDetail';
import Mypage from './pages/Mypage';
import MypageGIVE from './pages/MypageGIVE';
import MypageReceive from './pages/MypageReceive';
import JupjupUpdate from './pages/jupjupUpdate';
import ProfileUpdate from './pages/ProfileUpdate';
import BeforAftertUpdate from './pages/beforAftertUpdate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/JupJup' element={<JupJup />}></Route>
            <Route path='/BeforeAfter' element={<BeforeAfter />}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/signUp' element={<SignUp />}></Route>
            <Route path='/forgetPw' element={<ForgetPw />}></Route>
            <Route path='/jupjupDetail' element={<JupjupDetail />}></Route>
            <Route
              path='/beforAftertUpload'
              element={<BeforAftertUpload />}
            ></Route>
            <Route path='/chat' element={<Chat />}></Route>
            <Route
              path='/beforAftertDetail'
              element={<BeforAftertDetail />}
            ></Route>
            <Route path='/jupjupWrite' element={<JupjupWrite />}></Route>
            <Route path='/chatOtherList' element={<ChatOtherList />}></Route>
            <Route
              path='/chatOtherDetail'
              element={<ChatOtherDetail />}
            ></Route>
            <Route path='/Mypage' element={<Mypage />}></Route>
            <Route path='/MypageGIVE' element={<MypageGIVE />}></Route>
            <Route path='/MypageReceive' element={<MypageReceive />}></Route>
            <Route path='/jupjupUpdate' element={<JupjupUpdate />}></Route>
            <Route path='/ProfileUpdate' element={<ProfileUpdate />}></Route>
            <Route
              path='/beforAftertUpdate'
              element={<BeforAftertUpdate />}
            ></Route>
          </Routes>
          <div className='flex-grow justify-center'></div>
          <Footer />
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
