import { query } from "firebase/database";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../config/firebase";

export default function ChatRoom({ uid, name, room }) {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([])
  const [roomRef, setRoomRef] = useState(null);
  const [inputMsg, SetInputMsg] = useState("");

  useEffect(() => {
    getDoc(doc(firestore, 'room', room)).then(roomDoc => {
      setRoomRef(roomDoc.ref);
    })
  }, [room]);

  useEffect(() => {
    if (roomRef) {
      const SubscribeRetrieveMessage = onSnapshot(query(collection(roomRef, 'messages')), orderBy('seq', 'desc'), (data) => {
        setMessages(data.docs.map(ms => ms.data()));
      })
      return () => SubscribeRetrieveMessage();
    }
  }, [roomRef]);

  useEffect(() => {
    if (roomRef) {
      const SubscribeRetrieveMembers = onSnapshot(query(collection(roomRef, 'member')), (data) => {
        setMembers(data.docs.map(mb => ({
          uid: mb.id,
          name: mb.data().name
        })));
      })
      return () => SubscribeRetrieveMembers();
    }
  }, [roomRef]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMsg.replace(/\s/g, '').length) {
      addDoc(collection(roomRef, 'messages'), {
        desc: inputMsg,
        sendDate: new Date(),
        sender: uid,
        name: name,
        seq: messages.length > 0 ? messages[0].seq + 1 : 1,
      }).then(() => {
        SetInputMsg('')
      })
    } else {
      SetInputMsg('')
    }
  }

  return (
    <div>
      <div className="room-name">ห้อง {room}</div>
      <div className="div-chat">
        {messages.map((ms, index) => {
          return <div key={index}>
            {ms.sender === uid ?
              <div className='d-flex j-end'>
                <div className="send-date">{ms.sendDate.toDate().toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}</div>
                <div className="message">{ms.desc}</div>
              </div> :
              <div className='d-flex'>
                <div className="message">
                  <div className="tag-name">คุณ {members.find(mb => mb.uid === ms.sender)?.name}</div>
                  <div>{ms.desc}</div>
                </div>
                <div className="send-date">{ms.sendDate.toDate().toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}</div>
              </div>
            }
          </div>
        })}
      </div>
      <form onSubmit={sendMessage}>
        <input
          className="input input-message"
          value={inputMsg}
          onChange={e => SetInputMsg(e.target.value)}
        />
      </form>
    </div>
  )
}