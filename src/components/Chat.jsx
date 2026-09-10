import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Message from './Message'
import InputBar from './InputBar'

const STORAGE_KEY = 'zik_history_v1'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', text: 'Zik online. Tell me your request.' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setMessages(JSON.parse(raw))
    } catch (e) { /* ignore */ }
  }, [])

  // Persist history
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) } catch (e) {}
  }, [messages])

  function clearHistory() {
    setMessages([{ id: Date.now(), role: 'system', text: 'Zik online. Tell me your request.' }])
    localStorage.removeItem(STORAGE_KEY)
  }

  function sendMessage(text) {
    if (!text) return
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    simulateZikResponse(text)
  }

  async function simulateZikResponse(userText) {
    // If Vite env var VITE_USE_BACKEND is true, call the Express server
    if (import.meta.env.VITE_USE_BACKEND === 'true') {
      setIsTyping(true)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userText })
        })
        const data = await res.json()
        const reply = data.reply || (data.raw?.choices?.[0]?.message?.content) || 'Sorry, no reply.'
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'zik', text: reply }])
      } catch (e) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'zik', text: 'Sorry — the server could not be reached.' }])
      } finally {
        setIsTyping(false)
      }
      return
    }

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
        <div className="status">Online • <button className="clear-btn" onClick={clearHistory}>Clear</button></div>
      </header>

      <main className="chat-area" ref={listRef}>
        <div className="hero-orb">
          <div className="orb" aria-hidden="true" />
        </div>
        <div className="messages">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                <Message role={m.role} text={m.text} />
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Message role="zik" text={"..."} isTyping />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <InputBar onSend={sendMessage} />
    </div>
  )
}
