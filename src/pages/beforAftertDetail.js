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
    <div className="bg-white py-24 sm:py-32 relative mx-auto max-w-7xl">
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
      <div className="flex gap-4">
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
          <img
            alt=""
            src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          <p className="absolute text-white left-4 top-4">AFTER</p>
        </div>
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
          <img
            alt=""
            src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          <p className="absolute text-white left-4 top-4">AFTER</p>
        </div>
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
          <img
            alt=""
            src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          <p className="absolute text-white left-4 top-4">AFTER</p>
        </div>
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
          <img
            alt=""
            src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          <p className="absolute text-white left-4 top-4">AFTER</p>
        </div>
      </div>
      <div className='flex'>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block h-14 w-14 rounded-full"
        />
        <h1>닉네임</h1>
      </div>
      <p>블라블라 설명</p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        <div className="space-y-4">
          {currentComments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">{comment.author}</p>
              <p>{comment.content}</p>
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
  );
}