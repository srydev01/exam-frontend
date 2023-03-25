import { Button } from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react"
import { firestore } from "../../config/firebase";

//Toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function JoinRoom({ uid, name, room, setRoom, setStep }) {

  const submitRoom = async (e) => {
    e.preventDefault();
    if (room.replace(/\s/g, '').length) {
      getDoc(doc(firestore, 'room', room)).then(roomExisting => {
        if (roomExisting.data()) {
          setDoc(doc(collection(doc(firestore, 'room', room), 'member'), uid), {
            name: name
          }).then(() => {
            setStep('chat_room')
          })
        } else {
          toast.error("ไม่พบห้อง", {
            position: 'bottom-right'
          })
        }
      })
    } else {
      setRoom("")
    }
  }

  return (
    <div className="p40">
      <div className='title'>เข้าร่วมแชท</div>
      <form onSubmit={submitRoom} className='form'>
        <input
          type='text'
          className='input'
          autoFocus
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
        <div className='btn-grp'>
          <div
            className='btn btn-back'
            onClick={() => setStep('name_created')}
          >
            กลับ
          </div>
          <Button
            variant="contained"
            className='btn'
            type='submit'
          >
            เข้าร่วม
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}