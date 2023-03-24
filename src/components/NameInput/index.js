import { Button } from "@mui/material";
import React from "react";

export default function NameInput({ name, setName, setStep }) {

  const submitName = (e) => {
    e.preventDefault();
    setStep('name_created');
  }

  return (
    <div className="p40">
      <div className='title'>ชื่อของคุณ</div>
      <form onSubmit={submitName} className='form'>
        <input
          type='text'
          className='input'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          variant="contained"
          className='btn btn-name'
          type='submit'
        >
          ยืนยัน
        </Button>
      </form>
    </div>
  )
}