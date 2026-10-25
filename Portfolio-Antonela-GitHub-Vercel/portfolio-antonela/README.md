# Portfolio · Antonela María Serafino

**Del Pensar al Hacer · Academia de Coaching**

This is a static site: HTML, CSS and JS with no build step. It matches the Figma design. Its contents:

```
index.html        → page structure and all the text
styles.css        → palette, typography and responsive layout
main.js           → animations: arch phrase, word band, carousel, pop-ups, back-to-top button
vercel.json       → Vercel settings: cache and clean URLs
assets/img/       → photo, logos, butterflies, Método 4C images and video thumbnail
assets/fonts/     → Fraunces and Ms Madi fonts, hosted in the site (OFL license)
```

## 1. Upload to GitHub

1. Go to <https://github.com/new> and create a repository, for example `portfolio-antonela`. It can be public or private.
2. Inside the new repo, click **"uploading an existing file"**.
3. Drag in **everything inside this folder**: `index.html`, `styles.css`, `main.js`, `vercel.json`, `README.md` and the `assets` folder. Don't drag the parent folder itself.
4. Click **Commit changes**.

Using Git from a terminal instead:

```bash
cd portfolio-antonela
git init
git add .
git commit -m "Portfolio Antonela Serafino"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio-antonela.git
git push -u origin main
```

## 2. Publish on Vercel

1. Go to <https://vercel.com> and sign in with your GitHub account.
2. Click **Add New → Project**, find the `portfolio-antonela` repo and click **Import**.
3. Under *Framework Preset* choose **Other**. Leave *Build Command* and *Output Directory* empty.
4. Click **Deploy**. In about a minute you get a link like `portfolio-antonela.vercel.app`.
5. Optional: to use your own domain, go to **Settings → Domains**.

Every time you change a file on GitHub, Vercel republishes the site automatically.

## 3. Common edits

- **Text:** everything is in `index.html`, organized by section (Mi recorrido, Método 4C, Testimonios…).
- **Photo:** replace `assets/img/antonela.jpg` with another image of the same name. A vertical image of about 600 px wide works well.
- **Colors:** change the variables at the top of `styles.css` (`--bordo`, `--ocre`, `--oliva`, `--crema`, `--verde`).
- **Messages carousel:** each message is a `<button class="msg">` inside `#carrusel`. Copy one to add more; the dots update on their own.
- **Video:** the link is `https://youtube.com/shorts/ba4MsakO9PA`. Search for it in `index.html` to change it.

## Viewing it on your computer

Opening `index.html` with a double-click works. If the browser blocks the fonts, open a terminal in the folder, run `python3 -m http.server` and go to <http://localhost:8000>.

> Before publishing, confirm you have consent from the people who appear in the testimonials, the messages and the workshop photos.
