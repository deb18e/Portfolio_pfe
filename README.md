# Portfolio – Emna Debbech

Simple, responsive portfolio built with HTML, CSS and vanilla JS. Includes light/dark theme, smooth scrolling, and a basic contact form (no backend).

## Run locally

- Open `index.html` directly in your browser.
- Or serve with a lightweight server to avoid CORS issues for future assets:
```bash
# PowerShell (from project root)
python -m http.server 5500
# then visit http://localhost:5500
```

## Edit content

- Update text in `index.html` sections: `hero`, `profil`, `formation`, `stage`, `projets`, `competences`, `contact`.
- Replace `assets/img/avatar.jpg` with your own photo (optional).
- Colors and layout live in `assets/css/styles.css`.
- Interactions in `assets/js/main.js` (theme toggle, mobile menu, smooth scroll).

## Deploy

- You can host on GitHub Pages, Netlify, or any static hosting.
- The contact form includes a `netlify` attribute for easy Netlify Forms capture.

## License

MIT
