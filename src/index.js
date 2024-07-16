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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
					<Route path="/" element={<App />}></Route>
					<Route path="/JupJup" element={<JupJup />}></Route>
					<Route path="/BeforeAfter" element={<BeforeAfter />}></Route>
					<Route path="/signin" element={<SignIn />}></Route>
					<Route path="/signUp" element={<SignUp />}></Route>
					<Route path="/forgetPw" element={<ForgetPw />}></Route>
					<Route path="/jupjupDetail" element={<JupjupDetail />}></Route>
					<Route path="/beforAftertUpload" element={<BeforAftertUpload />}></Route>
					<Route path="/chat" element={<Chat />}></Route>
					<Route path="/beforAftertDetail" element={<BeforAftertDetail />}></Route>
				</Routes>
        <div className="flex-grow justify-center"></div>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
