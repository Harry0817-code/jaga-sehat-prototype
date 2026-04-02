import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CompListDoctors(props) {
  const { id, name, specialization, experience_years, connected } = props.doctor;
  const navigate = useNavigate();

  return (
    <div className="card-list-doctor">
      <div className="header-list-doctor" onClick={() => id && navigate(`/list-doctors/${id}`)}>
        <img src="https://img.icons8.com/color/96/doctor-male.png" alt={name} />
        <div className="name-specialization-doctor">
          <h3>{name}</h3>
          <p className='specialization-doctor'>{specialization}</p>
          <p className='experience-doctor'>{experience_years} tahun pengalaman</p>
        </div>
        <div className="flag-connection-chat-history"
          style={{ color: connected === 'Online' ? 'white' : '#304550', background: connected === 'Online' ? '#1dafa1' : '#f2f8f8' }}>
          {connected}
        </div>
      </div>

      <button className='btn-consultant-now' style={{ opacity: connected === "Online" ? 1 : .5 }} onClick={() => connected === "Online" && navigate(`/message/${id}`)}>
        <MessageCircle />
        {connected === "Online" ? "Konsultasi sekarang" : "Tidak Tersedia"}
      </button>
    </div>
  );
}

export default CompListDoctors;