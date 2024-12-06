import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../../lib/db';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [results] = await db.query('SELECT * FROM schools');
      return res.status(200).json(results);
    } catch (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === 'POST') {
    const uploadMiddleware = upload.single('image');
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ error: 'Error during file upload' });
      }

      const { name, address, city, state, contact, email } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      try {
        const query = 'INSERT INTO schools (name, address, city, state, contact, email, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await db.query(query, [name, address, city, state, contact, email, image]);
        return res.status(200).json({ message: 'School added successfully' });
      } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}