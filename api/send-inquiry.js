// api/send-inquiry.js
import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const { name, email, message } = req.body;

  try {
    await client.execute({
      sql: 'INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)',
      args: [name || '', email || '', message || ''],
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
