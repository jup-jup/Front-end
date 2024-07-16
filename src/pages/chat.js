import React, { useState, useRef, useEffect } from 'react';
import { PhotoIcon, CameraIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef(null);

  const currentUser = {
    id: 'user1',
    name: '나',
    avatar: 'https://via.placeholder.com/40'
  };

  const otherUser = {
    id: 'user2',
    name: '상대방',
    avatar: 'https://via.placeholder.com/40'
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: currentUser
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // 상대방의 응답을 시뮬레이션 (실제로는 서버에서 받아야 함)
      setTimeout(() => {
        const replyMessage = {
          id: Date.now() + 1,
          text: '안녕하세요! 메시지 잘 받았습니다.',
          sender: otherUser
        };
        setMessages(prevMessages => [...prevMessages, replyMessage]);
      }, 1000);
    }
  };

  return (
    <div className='mx-auto max-w-7xl'>
    <div className='flex mb-12'>
        <img className='w-40' src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" />
        <div>
            <p>제목제목</p>
            <p>설명설명</p>
        </div>
    </div>
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1" />
      <div 
        ref={chatContainerRef}
        className="overflow-y-auto p-4 max-h-[70vh]"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            {message.sender.id !== currentUser.id && (
              <img src={message.sender.avatar} alt={message.sender.name} className="w-10 h-10 rounded-full mr-3" />
            )}
            <div className={`max-w-xs ${message.sender.id === currentUser.id ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg p-3 shadow`}>
              {message.sender.id !== currentUser.id && (
                <div className="font-bold mb-1">{message.sender.name}</div>
              )}
              <div>{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="메시지를 입력하세요..."
        />
      </form>
      <div className="flex justify-around">
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <PhotoIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <CameraIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <MapPinIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <CalendarIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
    </div>
    </div>
  );
}

export default ChatApp;