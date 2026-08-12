# Closers Fellowship — Geekonomy

Public application site for **The Closers Fellowship** hiring flow.

Built with Next.js, TypeScript, and Tailwind CSS. Form submissions are proxied server-side to Geekonomy HRMS so the API key stays private.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
HRMS_API_URL=http://10.0.0.216:8000/api/recruitment/closers-fellowship/
HRMS_API_KEY=your_api_key_here
```

Production URL:

```bash
HRMS_API_URL=https://people.thegeekonomy.com/api/recruitment/closers-fellowship/
```

Restart the dev server after changing env values.

## Form rules

- Name, email, phone, and seat are required
- LinkedIn / portfolio is optional
- Applicants must answer **any 2 of the 3** questions

## UTM tracking

UTM params are read from the page URL and sent to HRMS:

| Query param     | HRMS field   |
| --------------- | ------------ |
| `utm_campaign`  | Campaign     |
| `utm_content`   | Ad           |
| `utm_term`      | Adset        |
| `utm_source`    | UTM Source   |
| `utm_medium`    | UTM Medium   |

Example test link:

```text
http://localhost:3000/?utm_source=facebook&utm_medium=cpc&utm_campaign=closers-launch&utm_content=video-ad-1&utm_term=sales-leaders
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
