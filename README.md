# BrandForge AI

A polished React + Tailwind demo that turns a raw business idea into a structured brand and sales website plan.

## Included

- Premium light-theme homepage
- Business-idea input form
- Dummy AI generation service
- Brand identity and positioning output
- Colour palette and audience cards
- Landing-page section plan
- Sales chatbot conversation
- WhatsApp follow-up messages
- Used-laptop recommendation catalogue
- Lead capture form
- localStorage-powered lead dashboard
- Smooth Motion animations
- Kimi-ready service architecture

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Connect Kimi safely

Do not call Kimi directly from the React browser application because that would expose the API key.

1. Create a backend endpoint such as `POST /api/generate-brand`.
2. Store the Kimi API key in the backend environment.
3. Send the six form values from React to your backend.
4. Ask Kimi to return a strict JSON object matching the shape in `src/data/demoData.js`.
5. Uncomment and adapt the fetch example in `src/services/aiService.js`.
6. Add `VITE_API_BASE_URL` to your local `.env` file.

## Suggested next integrations

- Kimi API through FastAPI or Node.js
- Supabase/PostgreSQL lead storage
- WhatsApp Cloud API follow-up automation
- Shopify or custom product inventory
- n8n webhook for lead routing
