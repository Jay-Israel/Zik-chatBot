# Zik — Mobile-first Chat (Prototype)

This is a minimal, mobile-first React prototype for a realistic-feeling chatbot called Zik.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

Backend (optional, Node/Express)

1. Install server deps

```bash
cd server
npm install
```

2. Create `.env` from the example and set your OpenAI key

```bash
copy .env.example .env
set OPENAI_API_KEY=your_key_here   # Windows (PowerShell/cmd)
# or on macOS/Linux: export OPENAI_API_KEY=your_key_here
```

3. Start the server

```bash
npm start
```

4. Enable the client to call the backend by creating a `.env` file at the project root with:

```
VITE_USE_BACKEND=true
```

Then run the client dev server from the root:

```bash
npm run dev
```


Features
- Mobile-first responsive UI with a blue/lilac/white theme
- Simulated Zik responses (replaceable with real AI integration)

Notes on adding real AI
- For production, add a backend endpoint to call an LLM (OpenAI, Anthropic, etc.) and keep API keys server-side.
# Zik-chatBot
