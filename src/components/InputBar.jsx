import React, { useState } from 'react'

export default function InputBar({ onSend }) {
  const [value, setValue] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onSend(value.trim())
    setValue('')
  }

  return (
    <form className="input-bar" onSubmit={submit}>
      <input
        aria-label="Type a message"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Ask Zik a question"
        autoComplete="off"
      />
      <button type="submit" className="send-btn" aria-label="Send">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/></svg>
        <span>Send</span>
      </button>
    </form>
  )
}
