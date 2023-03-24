import React, { useState, useEffect } from 'react';

import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import '../../config/firebase';

import './home.scss';
import NameInput from '../../components/NameInput';
import PrepareRoom from '../../components/PrepareRoom';
import CreateRoom from '../../components/CreateRoom';
import ChatRoom from '../../components/ChatRoom';
import JoinRoom from '../../components/JoinRoom';

const auth = getAuth();

export default function Home() {
  const [uid, setUid] = useState('');
  const [step, setStep] = useState('input_name');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUid(user.uid);
        console.log(user.uid);
      } else {
        signInAnonymously(auth)
      }
    });
  }, []);

  return (
    <div>
      {step === 'input_name' ?
        <NameInput name={name} setName={setName} setStep={setStep} /> :
        <div></div>
      }
      {step === 'name_created' ?
        <PrepareRoom name={name} setStep={setStep} /> :
        <div></div>
      }
      {step === 'create_room' ?
        <CreateRoom name={name} uid={uid} room={room} setRoom={setRoom} setStep={setStep} /> :
        <div></div>
      }
      {step === 'join_room' ?
        <JoinRoom name={name} uid={uid} room={room} setRoom={setRoom} setStep={setStep} /> :
        <div></div>
      }
      {step === 'chat_room' ?
        <ChatRoom uid={uid} name={name} room={room} /> :
        <div></div>
      }
    </div>
  )
}