# Aditya Malviya — Portfolio

Personal portfolio for Aditya Malviya, Azure Data Engineer (Mumbai, India).
Live at https://adityamalviya04692.github.io/aditya-portfolio/

Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, lucide-react.

## The one thing to know

All content lives in src/data/portfolio.json.

No component hardcodes a name, date, metric or bullet. To update the site, edit that one JSON file and nothing else.

## Install and run

npm install
npm run dev
npm run build
npm run preview

## Deployment

Pushing to main triggers .github/workflows/deploy.yml, which builds and publishes to GitHub Pages. One-time setup: Settings then Pages then Source then GitHub Actions.

vite.config.ts sets base '/aditya-portfolio/' to match the project-page URL.
