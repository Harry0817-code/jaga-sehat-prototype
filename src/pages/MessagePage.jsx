import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LIST_DOCTORS } from '../utils/ListDoctors.js';
import { LIST_CHAT_HISTORY } from '../utils/ListChatHistory.js';
import CompContact from '../components/ContactAndMessage/CompContact.jsx';
import CompMessage from '../components/ContactAndMessage/CompMessage.jsx';
import { FormProvider, useForm } from 'react-hook-form';

function MessagePage() {
  const methods = useForm({
    defaultValues: {
      sendMessage: ""
    }
  })
  const [activeChatId, setActiveChatId] = useState("");
  const { id: idClickMessageDoctor } = useParams();
  const [listMessage, setListMessage] = useState([]);

  const displayListContact = useMemo(() => {
    if (LIST_CHAT_HISTORY === "") {
      return;
    }

    const isExistContactHistory = LIST_CHAT_HISTORY.some(record => record.id === idClickMessageDoctor);
    if (!isExistContactHistory) {
      const newContact = [...LIST_CHAT_HISTORY, {
        id: idClickMessageDoctor,
        lastMessage: ''
      }]
      return newContact;
    }

    return LIST_CHAT_HISTORY;
  }, [idClickMessageDoctor]);

  const specialization = (idHistoryDoctor) => {
    return LIST_DOCTORS.find(record => record.id === idHistoryDoctor).specialization;
  }

  const nameDoctor = (idHistoryDoctor) => {
    return LIST_DOCTORS.find(record => record.id === idHistoryDoctor).name;
  }

  const connected = (idHistoryDoctor) => {
    return LIST_DOCTORS.find(record => record.id === idHistoryDoctor).connected;
  }

  //Effect untuk klik conversation atau dari history beranda
  useEffect(() => {
    function FetchKClickConversation() {
      const idClickContactDoctor = activeChatId || idClickMessageDoctor;

      //check apakah ada last message atau tidak di LIST_HOSTORY_DOCTOR
      const isExistLastMessage = LIST_CHAT_HISTORY.find(record => record.id === idClickContactDoctor);
      if (isExistLastMessage) {
        const isExistIdDoctorListMessage = listMessage.find(record => record.idDoctor === idClickContactDoctor);
        if (isExistIdDoctorListMessage) {
          return;
        }

        setListMessage(prev => (
          [...prev, {
            idDoctor: isExistLastMessage.id,
            conversation: [{
              message: isExistLastMessage.lastMessage,
              type: 'receive'
            }]
          }]
        ))
        if (activeChatId === "") {
          setActiveChatId(idClickMessageDoctor);
        }
        return;
      }

      const isExistContactListDoctor = LIST_DOCTORS.find(record => record.id === idClickContactDoctor);
      if (isExistContactListDoctor) {
        const isExistIdDoctorListMessage = listMessage.find(record => record.idDoctor === idClickContactDoctor);
        if (isExistIdDoctorListMessage) {
          return;
        }

        setListMessage(prev => (
          [...prev, {
            idDoctor: idClickContactDoctor,
            conversation: [{
              message: '',
              type: 'receive'
            }]
          }]
        ))
        if (activeChatId === "") {
          setActiveChatId(idClickMessageDoctor);
        }
        return;
      }
    }

    FetchKClickConversation();
  }, [activeChatId, idClickMessageDoctor, listMessage])

  const handlerClickConversation = (idClickConversation) => {
    setActiveChatId(idClickConversation);
    //check apakah ada last message atau tidak di LIST_HOSTORY_DOCTOR
    const isExistLastMessage = LIST_CHAT_HISTORY.find(record => record.id === idClickConversation);
    if (isExistLastMessage) {
      const isExistIdDoctorListMessage = listMessage.find(record => record.idDoctor === idClickConversation);
      if (isExistIdDoctorListMessage) {
        return;
      }

      setListMessage(prev => (
        [...prev, {
          idDoctor: isExistLastMessage.id,
          conversation: [{
            message: isExistLastMessage.lastMessage,
            type: 'receive'
          }]
        }]
      ));
    }
  }

  const handlerSend = () => {
    const messageFormSender = methods.getValues('sendMessage');

    setListMessage(prev =>
      prev.map(record => record.idDoctor === activeChatId ?
        {
          ...record,
          conversation: [
            ...record.conversation, {
              message: messageFormSender,
              type: 'sender'
            }
          ]
        } : record
      )
    );

    setTimeout(() => {
      setListMessage(prev =>
        prev.map(record => record.idDoctor === activeChatId ?
          {
            ...record,
            conversation: [
              ...record.conversation, {
                message: 'Hai terima kasih sudah menghubungi saya, ini adalah test untuk percakapan',
                type: 'receive'
              }
            ]
          } : record
        )
      );
    }, 1500);

    methods.setValue('sendMessage', '');
  }

  const displayHeaderMessage = useMemo(() => {
    const contactDoctor = displayListContact.find(record => record.id === activeChatId);
    const headerDoctor = contactDoctor ?
      {
        name: nameDoctor(contactDoctor.id),
        specialization: specialization(contactDoctor.id)
      }
      : null;

    return headerDoctor;
  }, [activeChatId, displayListContact])

  const displayMessage = useMemo(() => {
    return listMessage;
  }, [listMessage]);

  return (
    <div className='container-message-page'>
      <h1>Kontak Pesan</h1>
      <div className="contact-and-message">
        <section className='section-list-contact-doctor'>
          {displayListContact.map((ele, idx) => (
            <CompContact
              key={idx}
              ele={ele}
              activeChatId={activeChatId}
              handlerClickConversation={handlerClickConversation}
              nameDoctor={nameDoctor}
              specialization={specialization}
              connected={connected}
            />
          ))}
        </section>

        <section className='section-receive-send-message'>
          {displayHeaderMessage === "" || displayHeaderMessage === null ? (
            <p>Klik kontak pesan untuk memulai percakapan</p>
          ) : (
            <FormProvider {...methods}>
              <CompMessage
                displayHeaderMessage={displayHeaderMessage}
                displayMessage={displayMessage}
                activeChatId={activeChatId}
                handlerSend={methods.handleSubmit(handlerSend)}
              />
            </FormProvider>
          )}
        </section>
      </div>
    </div>
  );
}

export default MessagePage;