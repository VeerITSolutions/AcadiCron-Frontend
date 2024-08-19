// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Simulate authentication logic
    if (email == 'pranay.l@veerit.com' && password == '12345') {
      const token = 'dummy-token'; // Simulate a generated token
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
