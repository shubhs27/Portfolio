# Portfolio Website

My personal portfolio — a single-page site covering my experience, skills and projects.

**Live:** https://shubhanan-sharma.vercel.app/

## 🚀 Tech Stack

- **React 19** + **Vite 6** — UI and build tooling
- **Tailwind CSS v4** — CSS-first theming in `src/index.css`, no `tailwind.config.js`
- **Framer Motion** — scroll, hover and stagger animations
- **Lucide React** — icons
- **EmailJS** — contact form, no backend
- **React Router** — routing for the 404 page
- **Radix UI** — toast primitives
- **ESLint** — linting

## ⚙️ Getting Started

```bash
git clone https://github.com/shubhs27/Portfolio.git
cd Portfolio
npm install
cp .env.example .env      # add your EmailJS credentials
npm run dev
```

| Command | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run lint` | ESLint — should exit clean |

## 📧 Contact Form (EmailJS)

The form sends straight from the browser, so there's no backend to run.

1. Create a service and an email template at [EmailJS](https://www.emailjs.com/).
2. Add the IDs to `.env`:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

3. Reference `{{from_name}}`, `{{from_email}}`, `{{message}}` and `{{to_name}}` in the template.

On Vercel these must also be set under **Project → Settings → Environment Variables**;
`.env` is local only. Without them every submission shows the error toast.

## 📱 Sections

| Section | What's in it |
|---|---|
| **Hero** | Rotating job titles, intro, résumé link, social links |
| **Experience** | Timeline grouped by company, listing every role held there; durations are computed from dates rather than hardcoded |
| **Education** | Degree and school, with grades |
| **Skills** | Nine categories behind sliding tabs, opening on SRE & Infra |
| **Projects** | Responsive carousel — 1 / 2 / 3 cards per page by viewport — with demo and source links |
| **Contact** | EmailJS form with toast feedback, plus direct links |

## ✨ Details worth knowing

- **Theme** — dark by default, persisted in `localStorage` and applied by an inline
  script before first paint, so there's no flash of the wrong theme on load.
- **Navigation** — smooth scrolling with active-section highlighting that resolves
  correctly at the bottom of the page, where the last section is shorter than the viewport.
- **Accessibility** — one `<h1>` per page, ARIA labels on every form field and
  icon-only link, and keyboard-dismissable mobile menu.
- **SEO** — meta description, Open Graph and Twitter card tags, `robots.txt`, `sitemap.xml`.
- **Routing** — `vercel.json` rewrites every path to `index.html`, so unknown URLs reach
  the site's own 404 page instead of Vercel's plain-text one.
- **Offline demos** — projects without a live demo render a non-interactive button
  rather than a link that goes nowhere.

Working on the code? `CLAUDE.md` covers the conventions and the Tailwind v4 gotchas
(most importantly: a colour utility only exists if its token is declared in `@theme`).

## 📄 License

[MIT](LICENSE)

---

**Built with ❤️ by Shubhanan Sharma**
