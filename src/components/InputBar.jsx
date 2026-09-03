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
      />
      <button type="submit" className="send-btn">Send</button>
    </form>
  )
}
