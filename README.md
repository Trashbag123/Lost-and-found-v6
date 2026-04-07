# School Lost & Found

A lost and found web app built for my school. You can browse items that have been turned in, submit something you found, or file a claim to get your stuff back. There's also an admin dashboard for staff to review submissions and approve claims.

---

## What it does

- **Browse items** — search and filter by category, location, or status
- **Report a found item** — fill out a form with a photo and description, gets reviewed before going live
- **Submit a claim** — describe the item to prove it's yours, get a tracking ID to check status later
- **Notifications** — get updated when your claim is approved
- **Admin panel** — approve/reject submissions and claims, view basic analytics
- **5 themes** — light, dark, and 3 colorblind-friendly modes (deuteranopia, protanopia, tritanopia)

---

## Running it

```bash
npm install
npm run dev
```

```bash
# build
npm run build
```

**Admin login:**
- Username: `admin`
- Password: `admin123`

---

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- shadcn/ui + Radix UI
- Framer Motion
- Recharts (for the admin charts)
- Sonner (toasts)
- qrcode.react

State is all React Context + localStorage — no backend.

---

## Structure

```
src/app/
  components/   pages and UI components
  contexts/     ItemsContext, ClaimsContext, AuthContext, ThemeContext, NotificationsContext
  utils/        confetti helper
```

---

## Notes

Everything runs client-side, so data resets if you clear localStorage. Images are stored as base64 strings which isn't great for larger files. The authentication is just a hardcoded demo — not meant for real use.
