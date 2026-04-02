import React from 'react';

function CompContact(props) {
  const { ele, activeChatId, handlerClickConversation, nameDoctor, specialization, connected } = props;
  
  return (
    <div className='card-contact-person-doctor'
      style={{
        background: activeChatId === ele.id ? 'rgb(222 247 244 / 72%)' : 'white',
        border: activeChatId === ele.id && '1px solid hsl(174 60% 40%)',
        borderRadius: activeChatId === ele.id && '20px'
      }}
      onClick={() => handlerClickConversation(ele.id)}
    >
      <div className="background-img-contact-person">
        <img src="https://img.icons8.com/color/96/doctor-male.png" alt={nameDoctor(ele.id)} />
      </div>
      <div className="name-and-connected-contact-doctor">
        <div className="name-and-specialization">
          <p className='name-contact-person'>{nameDoctor(ele.id)}</p>
          <p className='specialization-contact-person'>{specialization(ele.id)}</p>
          <p className='last-message-contact-person'>{ele.lastMessage}</p>
        </div>
        <div className="connected-for-contact-person"
          style={{ color: connected(ele.id) === 'Online' ? 'white' : '#304550', background: connected(ele.id) === 'Online' ? '#1dafa1' : '#f2f8f8' }}>
          {connected(ele.id)}
        </div>
      </div>
    </div>
  );
}

export default CompContact;