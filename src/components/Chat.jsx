import React, { useState, useEffect, useRef } from 'react'
import Message from './Message'
import InputBar from './InputBar'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', text: 'Hi — I\'m Zik. How can I help today?' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text) {
    if (!text) return
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    simulateZikResponse(text)
  }

  function simulateZikResponse(userText) {
    setIsTyping(true)
    setTimeout(() => {
      const reply = generateReply(userText)
      setMessages(prev => [...prev, { id: Date.now()+1, role: 'zik', text: reply }])
      setIsTyping(false)
    }, 900 + Math.random() * 1000)
  }

  function generateReply(input) {
    // Basic simulated replies. Replace with real AI integration if desired.
    const l = input.toLowerCase()
    if (l.includes('hello') || l.includes('hi')) return 'Hey! I\'m Zik — ready to help.'
    if (l.includes('help')) return 'Sure — tell me what you want to build or the question you have.'
    if (l.includes('design')) return 'I can suggest color palettes, layouts, and animations.'
    return 'I\'m on it — give me a moment or ask me to expand on this.'
  }

  return (
    <div className="phone-shell">
      <header className="phone-header">
        <div className="logo">Zik</div>
        <div className="status">Online</div>
      </header>

      <main className="chat-area" ref={listRef}>
        <div className="hero-orb">
          <div className="orb" aria-hidden="true" />
        </div>
        <div className="messages">
          {messages.map(m => (
            <Message key={m.id} role={m.role} text={m.text} />
          ))}
          {isTyping && <Message role="zik" text={"..."} isTyping />}
        </div>
      </main>

      <InputBar onSend={sendMessage} />
    </div>
  )
}
