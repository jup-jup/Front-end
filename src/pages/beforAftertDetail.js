import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Example() {
  const [comments, setComments] = useState([
    { id: 1, author: '사용자1', content: '멋진 before/after 사진이네요!' },
    { id: 2, author: '사용자2', content: '정말 대단한 변화입니다.' },
    { id: 3, author: '사용자3', content: '어떤 방법으로 이렇게 변했나요?' },
    { id: 4, author: '사용자4', content: '놀라운 결과네요!' },
    { id: 5, author: '사용자5', content: '정말 인상적입니다.' },
    { id: 6, author: '사용자6', content: '변화가 대단해요.' },
    { id: 7, author: '사용자7', content: '어떤 과정을 거쳤는지 궁금해요.' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const newCommentObj = {
        id: comments.length + 1,
        author: '현재 사용자',
        content: newComment.trim(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setCurrentPage(Math.ceil((comments.length + 1) / commentsPerPage));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className="bg-white py-2 sm:py-12 relative mx-auto max-w-7xl">
      <div className="flex">
      </div>
      <div className="flex gap-4">
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
          <img
            alt=""
            src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          <p className="absolute text-white left-4 top-4">BEFORE</p>
        </div>
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
          <img
            alt=""
            src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          <p className="absolute text-white left-4 top-4">BEFORE</p>
        </div>
      </div>

      <div className="flex">
      </div>
      <div className='flex mt-6'>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block h-8 w-8 rounded-full"
        />
        <h1 className='mt-1 ml-2'>닉네임</h1>

      </div>
        <Link to ="/beforAftertUpdate"
          href="#"
          className="float-right rounded-md bg-[#4EC0DE] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          수정하기
        </Link>
      <p className='mb-12 mt-6'>블라블라 설명</p>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg> 하트찜 총 수 


      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        <div className="space-y-4">
          {currentComments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">{comment.author}</p>
              <p>{comment.content}</p>
              <div className='mt-2 flex gap-4'>
                <p className='text-xs'>신고하기</p>
                <p className='text-xs'>수정하기</p>
                <p className='text-xs'>삭제하기</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmitComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="댓글을 입력하세요..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            댓글 작성
          </button>
        </form>
      </div>
    </div>
    </>
  );
}