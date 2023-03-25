import { Button } from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react"
import { firestore } from "../../config/firebase";

export default function CreateRoom({ uid, name, room, setRoom, setStep }) {

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
          setDoc(doc(firestore, 'room', room), {
            room: room
          }).then(async () => {
            const roomRef = await doc(firestore, 'room', room)
            setDoc(doc(collection(roomRef, 'member'), uid), {
              name: name
            }).then(() => {
              setStep('chat_room')
            })
          })
        }
      })
    } else {
      setRoom("")
    }
  }

  return (
    <div className="p40">
      <div className='title'>สร้างห้องใหม่</div>
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
            ยืนยัน
          </Button>
        </div>
      </form>
    </div>
  )
}