import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import useAxios from '../hooks/useAxios';

const DeleteUser = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성
  const { trigger } = useAxios({
    url: '/api/oauth/user/delete'
  });

  const handleDeleteUserClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalComplete = async () => {
    // 계정 삭제 요청 보내기
    await trigger({
      method: 'delete'
    });
    setShowModal(false);

    // 계정 삭제 완료 후 홈으로 이동
    navigate('/home');
  };

  return (
    <div className="relative z-50">
      <button
        className="absolute right-0 mr-4 mt-28 rounded-md p-2 btn-3d bg-yecolor text-stcolor text-xs shadow-md hover:shadow-lg active:shadow-none transition duration-200"
        onClick={handleDeleteUserClick}
      >
        계정삭제
      </button>
      {showModal && (
        <Modal
          message="계정을 삭제하시겠습니까?. 삭제 시 복구가 어려워요🥲"
          onClose={handleModalClose}
          onComplete={handleModalComplete}
        />
      )}
    </div>
  );
};

export default DeleteUser;
