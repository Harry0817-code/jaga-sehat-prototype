import React, { useEffect, useRef, useMemo } from 'react';
import { Send } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

function CompMessage(props) {
  const { displayHeaderMessage, displayMessage, handlerSend, activeChatId } = props;
  const { register, handleSubmit } = useFormContext();

  const bottomRef = useRef(null);

  // Ambil conversation dengan aman
  const selectedConversation = useMemo(() => {
    return (
      displayMessage
        ?.find(record => record.idDoctor === activeChatId)
        ?.conversation || []
    );
  }, [displayMessage, activeChatId]);

  // Auto scroll smooth setiap conversation berubah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [selectedConversation]);

  return (
    <>
      <div className="header-message">
        <div className="background-img-header-message">
          <img
            src="https://img.icons8.com/color/96/doctor-male.png"
            alt={displayHeaderMessage?.name}
          />
        </div>
        <div className="name-and-specialization-message">
          <p className='name-contact-message'>
            {displayHeaderMessage?.name}
          </p>
          <p className='specialization-contact-message'>
            {displayHeaderMessage?.specialization}
          </p>
        </div>
      </div>

      <div className="message">
        {selectedConversation
          .filter(msg => msg?.message?.trim())
          .map((msg, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                justifyContent:
                  msg.type === "receive" ? "flex-start" : "flex-end",
                marginBottom: "10px"
              }}
            >
              <div
                className="list-message"
                style={{
                  color:
                    msg.type === "receive"
                      ? "hsl(200 25% 15%)"
                      : "white",
                  background:
                    msg.type === "receive"
                      ? "hsl(180 15% 94%)"
                      : "hsl(174 72% 40%)"
                }}
              >
                <p>{msg.message}</p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent:
                      msg.type === "receive"
                        ? "flex-start"
                        : "flex-end",
                    color:
                      msg.type === "receive"
                        ? "hsl(200 15% 45%)"
                        : "hsl(0 0% 100% / .7)"
                  }}
                >
                  <span>12:04</span>
                </div>
              </div>
            </div>
          ))}

        {/* Anchor untuk auto scroll */}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit(handlerSend)}>
        <div className="input-and-btn-message">
          <input
            type="text"
            placeholder='Ketik pesan...'
            {...register('sendMessage', { required: true })}
          />
          <button type='submit'>
            <Send />
          </button>
        </div>
      </form>
    </>
  );
}

export default CompMessage;
