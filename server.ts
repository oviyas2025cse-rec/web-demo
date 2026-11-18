import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { validateEnquiryInput, sanitizeEnquiryInput } from './src/utils/siteLogic.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const DATA_DIR = path.resolve(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

interface StoredEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  webhookDispatched: boolean;
}

function loadEnquiries(): StoredEnquiry[] {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEnquiry(record: StoredEnquiry): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const existing = loadEnquiries();
  existing.unshift(record);
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'nimai-engineering-web' });
  });

  app.post('/api/enquiries', async (req, res) => {
    try {
      const sanitized = sanitizeEnquiryInput({
        name: String(req.body?.name ?? ''),
        email: String(req.body?.email ?? ''),
        phone: String(req.body?.phone ?? ''),
        subject: String(req.body?.subject ?? ''),
        message: String(req.body?.message ?? ''),
      });

      const validation = validateEnquiryInput(sanitized);
      if (!validation.valid) {
        res.status(400).json({
          ok: false,
          error: 'Please check the highlighted form fields and try again.',
          fieldErrors: validation.errors,
        });
        return;
      }

      const referenceId = `NIM-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

      let webhookDispatched = false;
      const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();
      if (webhookUrl) {
        try {
          const forwardRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              referenceId,
              recipient: 'enquiry@nimaiengineering.com',
              ...sanitized,
              submittedAt: new Date().toISOString(),
            }),
          });
          webhookDispatched = forwardRes.ok;
        } catch {
          webhookDispatched = false;
        }
      }

      const record: StoredEnquiry = {
        id: referenceId,
        ...sanitized,
        submittedAt: new Date().toISOString(),
        webhookDispatched,
      };

      saveEnquiry(record);

      res.status(201).json({
        ok: true,
        referenceId,
        submittedAt: record.submittedAt,
        message:
          'Your enquiry has been recorded by NIMAI Engineering. Our engineering team will review your requirements and respond shortly.',
      });
    } catch (err) {
      console.error('Enquiry submission error:', err);
      res.status(500).json({
        ok: false,
        error:
          'We were unable to record your enquiry right now. Please contact us directly via enquiry@nimaiengineering.com or +6011 5555 7677.',
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { maxAge: '1y', index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NIMAI Engineering server listening on http://localhost:${PORT}`);
  });
}

startServer();
