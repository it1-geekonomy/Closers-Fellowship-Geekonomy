# HRMS integration

Applications are posted from the browser to this Next.js route:

```text
POST /api/apply
```

That route forwards to HRMS:

```text
POST {HRMS_API_URL}
Headers:
  Content-Type: application/json
  X-API-Key: {HRMS_API_KEY}
```

## Payload fields

- `full_name`
- `email`
- `phone`
- `seat`
- `linkedin_portfolio`
- `answer_q1` / `answer_q2` / `answer_q3`
- `utm_campaign` / `utm_content` / `utm_term` / `utm_source` / `utm_medium`

## Local vs production

| Environment | API base |
| ----------- | -------- |
| Local HRMS  | `http://10.0.0.216:8000/api/recruitment/closers-fellowship/` |
| Production  | `https://people.thegeekonomy.com/api/recruitment/closers-fellowship/` |

Never expose `HRMS_API_KEY` to the browser. Keep it in `.env.local` only.
