import React, { useEffect, useRef, useState } from 'react';
import portfolio from '../../data/portfolio';
import './chat.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const { title, greeting, presets } = portfolio.chat;

function getSessionId() {
  if (typeof window === 'undefined') return 'guest-session';

  let sessionId = window.sessionStorage.getItem('portfolio-session-id');
  if (!sessionId) {
    sessionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    window.sessionStorage.setItem('portfolio-session-id', sessionId);
  }

  return sessionId;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: greeting }]);
  const endRef = useRef(null);
  const sessionIdRef = useRef(getSessionId());

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, open]);

  async function send(text) {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionIdRef.current,
        },
        // skip the local greeting; the server wants history starting with a user turn
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = res.ok
        ? data.reply
        : data.error || 'Something went wrong. Please try again.';
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: "I can't reach the server right now. You can email Anurag at nrgchandra@gmail.com." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-root">
      {open && (
        <div className="chat-panel" role="dialog" aria-label={title}>
          <div className="chat-header">
            <span>{title}</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.content}</div>
            ))}
            {loading && <div className="chat-msg assistant chat-typing">Thinking…</div>}

            {messages.length === 1 && (
              <div className="chat-chips">
                {presets.map((p) => (
                  <button key={p} onClick={() => send(p)}>{p}</button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask a question…"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>Send</button>
          </form>
        </div>
      )}

      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label="Toggle chat">
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}
