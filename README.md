# NIMAI ENGINEERING — Official Website Redesign

Complete, responsive, production-ready web application for **NIMAI ENGINEERING** (Johor Bahru, Malaysia), preserving all original company content, verified photographs, partner logos, organisation charts, service items, and project categories with a modern Royal Blue corporate engineering design system.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Motion & Smooth Scroll**: GSAP + ScrollTrigger, Framer Motion (`motion`), Lenis
- **Icons**: Lucide React + custom animated architectural & engineering SVG visualisations
- **Backend**: Express (`server.ts`) providing validated enquiry ingestion (`POST /api/enquiries`) with durable JSON storage and optional webhook/email relay (`ENQUIRY_WEBHOOK_URL`)
- **Hosting Config**: Ready for Google Firebase Hosting (`firebase.json`, `.firebaserc`) or Node full-stack deployment

## Local Development
```bash
npm install
npm run dev
```
The server runs on `http://localhost:3000`.

## Unit Tests & Verification
```bash
npx --yes tsx --test src/utils/siteLogic.test.ts
npm run lint
npm run build
```

## Google Firebase Hosting Deployment
The repository includes `firebase.json` (configured for `dist/`, SPA rewrites, `cleanUrls`, security headers, and immutable asset caching) and a clean `.firebaserc` template with no hardcoded project IDs.

When you are ready to deploy with your authorized Google / Firebase account:

```bash
# 1. Install dependencies and build production bundle
npm install
npm run build

# 2. Authenticate and verify your Firebase project
firebase login
firebase projects:list

# 3. Link your real Firebase project (updates .firebaserc)
firebase use --add

# 4. Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Custom Domain (`nimaiengineering.com`)
Do **not** modify existing DNS records until you have reviewed the Firebase preview URL:
1. Open **Firebase Console → Hosting → Add custom domain**.
2. Enter `nimaiengineering.com` and follow Firebase's TXT verification step.
3. Only after approval, update your registrar's `A` / `CNAME` records to the values provided by Firebase Hosting for automatic SSL provisioning.

### Enquiry Form on Static Firebase Hosting
- When running via the included Express server (`npm run dev` / `npm start`), enquiries submit to `POST /api/enquiries`, are validated server-side, saved to `data/enquiries.json`, and optionally forwarded to `ENQUIRY_WEBHOOK_URL`.
- When hosting statically on Firebase Hosting alone, configure `VITE_ENQUIRY_API_URL` in `.env` pointing to your deployed Cloud Function / Express endpoint or email provider (e.g., Formspree / Mailgun webhook) before running `npm run build`.
