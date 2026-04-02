import React, { useState } from 'react';
import { MessageCircle, User } from 'lucide-react';
import { usePagination } from '../hooks/setPages.js';

import { LIST_CHAT_HISTORY } from './../utils/ListChatHistory.js'
import { LIST_DOCTORS } from '../utils/ListDoctors.js';
import Pagination from './Pagination.jsx';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 3;
const MAX_VISIBLE_PAGES = 5;

function HomeChatHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const timeAgo = (lastMessageAt) => {
    const now = new Date();
    const past = new Date(lastMessageAt);

    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;
    if (diffHour < 24) return `${diffHour} jam lalu`;
    if (diffDay < 7) return `${diffDay} hari lalu`;

    return past.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  const connected = (idHistoryDoctor) => {
    return LIST_DOCTORS.find(record => record.id === idHistoryDoctor).connected;
  }

  const { resultPages: paginatedDoctors, totalPages } = usePagination(LIST_CHAT_HISTORY, ITEMS_PER_PAGE, currentPage)

  return (
    <section className='chat-history-section'>
      <div className="section-header">
        <h2>Riwayat Percakapan</h2>
        <p>Lihat riwayat konsultasi Anda dengan dokter</p>
      </div>

      <div className="section-list-history">
        {paginatedDoctors.map(listChatHistory => (
          <div className="card-chat-history" key={listChatHistory.id} onClick={() => navigate(`/message/${listChatHistory.id}`)}>
            <div className="chat-history-header">
              <div className="chat-history-header-icon-and-name">
                <div className="icon-doctor-chat-history">
                  <User />
                </div>
                <div className="name-specialization-chat-history-doctors">
                  <h3>{LIST_DOCTORS.find(record => record.id === listChatHistory.id)?.name}</h3>
                  <p>{LIST_DOCTORS.find(record => record.id === listChatHistory.id)?.specialization}</p>
                </div>
              </div>
              <div className="flag-connection-chat-history"
                style={{ color: connected(listChatHistory.id) === 'Online' ? 'white' : '#304550', background: connected(listChatHistory.id) === 'Online' ? '#1dafa1' : '#f2f8f8' }}>
                {connected(listChatHistory.id)}
              </div>
            </div>

            <div className="chat-history-last-message-time">
              <div className="last-message">
                <MessageCircle />
                <p>{listChatHistory.lastMessage}</p>
              </div>
              <p>{timeAgo(listChatHistory.lastMessageAt)}</p>
            </div>

          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={MAX_VISIBLE_PAGES}
      />
    </section>
  );
}

export default HomeChatHistory;