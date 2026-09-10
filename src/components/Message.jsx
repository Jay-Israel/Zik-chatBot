import React from 'react'

export default function Message({ role, text, isTyping }) {
  const cls = role === 'user' ? 'msg user' : role === 'system' ? 'msg system' : 'msg zik'
  return (
    <div className={cls}>
      {role === 'zik' && (
        <div style={{width:36,display:'flex',alignItems:'center',justifyContent:'center',marginRight:8}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#g)" />
            <path d="M8 10h.01M16 10h.01M8 14h8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#6b77ff" />
                <stop offset="1" stopColor="#b993ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      <div className="bubble">
        {isTyping ? <span className="dot-typing">•••</span> : text}
      </div>
    </div>
  )
}
