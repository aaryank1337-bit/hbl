# Happy 22nd Birthday, Saniya ♡

A romantic, intimate, and elegant birthday surprise website crafted for Saniya's 22nd birthday. The site features an interactive digital photobook powered by PDF.js, high-DPI canvas rendering, mobile touch swipe gestures, editorial typography, gentle ambient animations, an editable love letter, and GitHub Pages deployment configuration.

---

## ✨ Features

- **5 Seamless Experiences**:
  1. **The Birthday Introduction**: Warm ivory welcoming screen with delicate sparkles and floating petals.
  2. **Personal Prologue**: An intimate prelude setting an emotional, romantic tone before revealing the album.
  3. **Digital Photobook**:
     - Physical luxury album aesthetic with warm cream backing, subtle page drop shadows, and book spine depth.
     - Dynamic client-side rendering via **PDF.js** directly in the browser (zero server dependencies).
     - Square 1:1 aspect ratio preserving original photograph compositions without cropping.
     - **High-DPI Retina Sharpness** using `window.devicePixelRatio`.
     - **Mobile Touch Swipe** gestures (swipe left for next, swipe right for previous).
     - **Keyboard Navigation** using Left (`←`) and Right (`→`) arrow keys.
     - **Direct Page Scrubber / Indicators** for quick navigation across all 21 personal pages.
     - **Fullscreen mode** toggle for immersive viewing.
     - **Privacy Sanitized**: Automatically excludes third-party vendor contact info from page 22 so only personal memories are displayed.
  4. **The Birthday Letter**:
     - Cream stationery card with deckle-edge styling and serif italic typography.
     - Editable from a single configuration file (`src/content/birthdayLetter.ts`).
  5. **The Final Surprise**:
     - Celebratory milestone confetti burst in soft rose gold and champagne tones.
     - Emotional closing message and interactive options to reread the letter or revisit favorite memories.
- **Mobile First & Responsive**:
  - Tested for screens from 320px to large desktop monitors.
  - Safe-area inset support for modern mobile devices (iPhone notch & navigation bars).
  - Minimum 44px touch targets for effortless mobile navigation.
  - Respects `prefers-reduced-motion` settings.

---

## 💌 How to Edit the Birthday Letter & Messages

All text, headings, and romantic paragraphs can be easily updated in:

📁 `src/content/birthdayLetter.ts`

You can customize:
- Saniya's name or age
- Intro screen heading and eyebrow text
- Prologue message
- Each paragraph of the birthday love letter
- Final surprise closing wishes

Once edited, save the file and run `npm run build` or push to GitHub to update your live site!

---

## 🚀 Running Locally

### 1. Requirements
- Node.js (v18 or newer)
- npm (v9 or newer)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
The production-ready static assets will be generated in the `dist/` directory.

---

## 🌐 Deploying to GitHub Pages

The repository is already configured with an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### Step-by-Step GitHub Pages Setup:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Saniya's 22nd Birthday Surprise Website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub.
   - Click on **Settings** > **Pages** (under "Code and automation").
   - Under **Build and deployment**:
     - Set **Source** to **GitHub Actions**.

3. **Automatic Deployment**:
   - Once pushed to `main`, GitHub Actions will build and deploy the website.
   - Your site will be live at:
     ```
     https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/
     ```

> **Note on Base Path**: `vite.config.ts` uses relative paths (`./`), so the website automatically works on any GitHub Pages repository subpath or custom domain without breaking asset links or PDF loading!

---

## 📂 Project Architecture

```text
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions Pages deployment
├── public/
│   └── assets/
│       ├── saniya-photobook.pdf  # Sanitized 21-page photobook
│       └── pdf.worker.min.js     # Standalone PDF.js worker
├── src/
│   ├── components/
│   │   ├── AmbientBackground.tsx # Floating sparkles and petals
│   │   ├── IntroSection.tsx      # Screen 1: Welcome
│   │   ├── PersonalIntroSection.tsx # Screen 2: Prologue
│   │   ├── PhotobookSection.tsx  # Screen 3: PDF.js interactive viewer
│   │   ├── BirthdayLetterSection.tsx # Screen 4: Romantic letter
│   │   └── FinalSurpriseSection.tsx  # Screen 5: Milestone closing & confetti
│   ├── content/
│   │   └── birthdayLetter.ts     # Editable text and letter configuration
│   ├── styles/
│   │   └── theme.css             # Romantic palette, typography & mobile styling
│   ├── App.tsx                   # Experience flow & state manager
│   ├── main.tsx                  # App mount entry point
│   └── vite-env.d.ts             # Vite TypeScript declarations
├── index.html                    # HTML entry with Google Fonts & viewport-fit
├── package.json
├── tsconfig.json
└── vite.config.ts                # Vite config with relative base path
```
