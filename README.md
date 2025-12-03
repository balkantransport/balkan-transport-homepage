# Balkan Transport — Zvanična Web Prezentacija

[![Build](https://github.com/lukakalinic/balkan-transport-homepage/actions/workflows/build.yml/badge.svg)](https://github.com/lukakalinic/balkan-transport-homepage/actions/workflows/build.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/17f73295-83da-4f87-84a1-9c18302b5d5e/deploy-status)](https://app.netlify.com/projects/balkantransport/deploys)

Ovo je modernizovana verzija prethodnog Hugo projekta sa potpunim čišćenjem,
optimizacijom performansi i uklanjanjem zastarelih tehnologija poput Webpack-a.
Sajt koristi **Hugo Extended**, moderni **ESBuild**, modularni JavaScript i SCSS.

---

## 🚀 Tehnologije

- **Hugo Extended** (v0.121+)
- **ESBuild** za JS bundling
- **Hugo Pipes** za SCSS kompilaciju i minifikaciju
- **Modularni JS entry fajlovi**
- **Netlify** deploy

---

## 📁 Struktura projekta

```txt
site/
├── assets/
│ ├── js/ # JS entrypoints (core, home, gallery, funfacts…)
│ ├── scss/ # Glavni SCSS i partials
│ └── plugins/ # jQuery, Slick, Venobox, Filterizr…
│
├── content/
│ ├── blog/
│ ├── projects/
│ └── about.md
│
├── static/
│ ├── images/ # Slike sajta
│ └── fonts/ # Themify i custom fontovi
│
├── layouts/ # Custom partials i page layout-i
└── themes/
└── balkantransport/
├── layouts/
├── static/
└── theme.toml
```

---

## 🔎 Pull Request Workflow

Svaki PR mora da prođe:

- ✔ Hugo Build (CI test)
- ✔ Netlify Deploy Preview
- ✔ Code review

Uspešan PR pokazuje 2 zelena badge-a u PR-u.

## ▶️ Lokalni razvoj

Pokreni komandu:

```sh
cd site
hugo server --disableFastRender
```

Sajt će biti dostupan na: http://localhost:1313

## 🛠️ Produkcioni build

```sh
cd site
hugo --gc --minify
```

Build izlazi u direktorijum: site/public/

## 🌐 Deploy na Netlify

Netlify koristi sledeći netlify.toml:

[build]
  command = "npm run build"
  publish = "site/public"

npm run build pokreće:
  hugo -s site --gc --minify

## 🧩 JavaScript Bundling

JS je organizovan modularno i bundluje se preko Hugo ESBuild-a.
Entry fajlovi:

- core-entry.js — globalno (header, navbar, preloader…)
- home-entry.js — slider, animacije za home
- gallery-entry.js — Photoswipe inicijalizacija
- funfacts-entry.js — animirani brojači
- Dodatne skripte po potrebi (helpers / utils)

Hugo automatski:

- bundluje
- minimizuje
- fingerprintuje

## 🎨 SCSS Bundling

Glavni fajl:
  site/assets/scss/main.scss

Hugo Pipes radi:

- kompajliranje SCSS → CSS
- minifikaciju
- fingerprint

Kao rezultat dobija se optimalan CSS bundle.

## 📜 Licenca

MIT License
