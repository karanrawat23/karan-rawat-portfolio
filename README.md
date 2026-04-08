# Karan Rawat Portfolio

A modern personal portfolio website built with HTML, CSS, and vanilla JavaScript.

## 🚀 Live Website

**https://karanrawat23.github.io/karan-rawat-portfolio/**

GitHub Pages is enabled for this repository to publish the site directly from the `main` branch.

## ✨ Features

- **Modern Design**: Deep space theme with neon cyan/magenta accents
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Custom Cursor**: Interactive cursor with hover effects
- **Smooth Animations**: Scroll-triggered reveals and micro-interactions
- **Contact Form**: Functional form using Formspree
- **SEO Optimized**: Meta tags for better search visibility
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Phosphor Icons
- Google Fonts (Space Grotesk, Instrument Serif, Fira Code)

## 📁 Project Structure

```
karan-rawat-portfolio/
├── index.html          # Main HTML file
├── style.css           # Styles and themes
├── script.js           # JavaScript functionality
├── assets/
│   └── photos/         # Portfolio images
└── README.md           # This file
```

## 🚀 Setup Instructions

### 1. Contact Form Setup (Formspree)

To make the contact form functional:

1. Go to [Formspree](https://formspree.io/)
2. Create a free account
3. Create a new form and copy the form ID
4. Replace `YOUR_FORM_ID` in `index.html` with your actual form ID:

```html
<form action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST" id="contactForm">
```

### 2. Add Your Portrait Photo

Replace the SVG placeholder in the hero section:

1. Add your portrait photo to `assets/photos/portrait.jpg`
2. Update the hero section to use the actual image instead of SVG

### 3. Update Project Links

Update the GitHub repository links in the projects section to point to your actual repositories:

```html
<a href="https://github.com/karanrawat23/YOUR_ACTUAL_REPO" target="_blank" rel="noopener" class="plink">
```

## 🎨 Customization

### Colors
Edit CSS custom properties in `:root` and `[data-theme="light"]` for theme customization.

### Content
Update personal information, project descriptions, and contact details in `index.html`.

### Skills
Modify skill percentages and add/remove skills in the skills section.

## 📱 Sections

- **Hero**: Profile introduction with animated typing effect
- **About**: Education, experience timeline, and personal cards
- **Skills**: Technical skills with animated progress bars
- **Projects**: Featured GitHub projects with descriptions
- **Contact**: Contact methods and functional contact form

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Make changes and test locally

### Deployment
Changes pushed to the `main` branch automatically deploy via GitHub Pages.

## 📈 Performance

- Optimized images and fonts
- Minimal JavaScript for fast loading
- CSS custom properties for efficient theming
- Lazy-loaded animations

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

## 📞 Contact

- **Email**: karanrawatxlk@gmail.com
- **LinkedIn**: [karan-rawat-515151281](https://www.linkedin.com/in/karan-rawat-515151281/)
- **GitHub**: [karanrawat23](https://github.com/karanrawat23)

---

Built with ❤️ by Karan Rawat
- Vanilla JavaScript

## Local Run

Open `index.html` directly in the browser, or run a local server:

```powershell
python -m http.server 3000
```

Then visit `http://127.0.0.1:3000`.
