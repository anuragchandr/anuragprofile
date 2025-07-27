import React, { useEffect, useState } from 'react';
import { supabase } from '../contact/supabaseClient';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2>Contact Messages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {messages.map(msg => (
            <li key={msg.id || msg.created_at} style={{ marginBottom: 24, padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
              <strong>Name:</strong> {msg.name}<br />
              <strong>Email:</strong> {msg.email}<br />
              <strong>Message:</strong> {msg.message}<br />
              <small>{msg.created_at}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;