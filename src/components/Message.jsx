import React from 'react'

export default function Message({ role, text, isTyping }) {
  const cls = role === 'user' ? 'msg user' : 'msg zik'
  return (
    <div className={cls}>
      <div className="bubble">
        {isTyping ? <span className="dot-typing">•••</span> : text}
      </div>
    </div>
  )
}
