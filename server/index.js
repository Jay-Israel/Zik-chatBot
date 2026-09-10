const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

app.get('/', (req, res) => res.json({ status: 'Zik server running' }))

app.post('/api/chat', async (req, res) => {
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' })
  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ error: 'prompt is required' })

  const messages = [
    { role: 'system', content: 'You are Zik, a friendly, concise assistant for a mobile app.' },
    { role: 'user', content: prompt }
  ]

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const reply = response.data.choices?.[0]?.message?.content || ''
    res.json({ reply, raw: response.data })
  } catch (err) {
    console.error('OpenAI error', err.response?.data || err.message)
    res.status(500).json({ error: 'OpenAI request failed', details: err.response?.data || err.message })
  }
})

const port = process.env.PORT || 5174
app.listen(port, () => console.log(`Zik server listening on ${port}`))

