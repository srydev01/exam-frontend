import { Button } from "@mui/material"
import React from "react"

export default function PrepareRoom({ name, setStep }) {
  return (
    <div className='form p40'>
      <div className='title'>คุณ {name}</div>
      <Button
        variant="contained"
        className='btn btn-create_room'
        onClick={() => setStep('create_room')}
      >
        สร้างห้องใหม่
      </Button>
      <div
        className='btn btn-join'
        onClick={() => setStep('join_room')}
      >
        เข้าร่วมแชท
      </div>
      <div
        className='btn btn-back abs'
        onClick={() => setStep('input_name')}
      >
        กลับ
      </div>
    </div>
  )
}