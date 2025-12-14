# Monolithe Rénovation - Website Documentation

A hybrid website combining a React-based interactive renovation quote form on the homepage with 11ty-powered static pages for SEO and maintainability.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Project Architecture](#project-architecture)
- [React Quote Form (Homepage)](#react-quote-form-homepage)
- [11ty Static Pages](#11ty-static-pages)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

This website uses a **hybrid approach** for optimal results:

1. **React Homepage**: Interactive multi-step questionnaire for renovation quotes
2. **11ty Static Pages**: About, Contact, Tips, and Legal pages built with Eleventy
3. **Netlify Forms**: Zero-backend form submissions with email notifications

### Key Benefits

- **Dynamic Quote Calculator**: Smart pricing based on user inputs
- **DRY Code**: Header/footer managed in one place
- **SEO Optimized**: Static HTML for excellent search engine visibility
- **Mobile Responsive**: Works perfectly on all devices
- **Easy Maintenance**: Update shared components once, changes everywhere

---

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Visit http://localhost:8080
```

### Build for Production

```bash
npm run build
# Output will be in the _site/ directory
```

---

## Project Architecture

### Directory Structure

```
monolithe_renovation/
├── src/                          # 11ty source files
│   ├── _includes/               # Reusable templates
│   │   ├── base.njk            # Main layout (header + footer)
│   │   └── legal.njk           # Legal page layout
│   ├── about-us.njk            # About page
│   ├── contact-us.njk          # Contact page
│   ├── tips-and-tricks.njk     # Tips page
│   └── mentions-legales.njk    # Legal page
├── _site/                       # Built output (generated, don't edit!)
├── images/                      # Images folder
├── index.html                   # React homepage entry point
├── app.jsx                      # React quote form application
├── styles.css                   # Global styles
├── .eleventy.js                 # 11ty configuration
├── package.json                 # Dependencies and scripts
├── netlify.toml                 # Netlify deployment config
└── README.md                    # This file
```

### How It Works Together

1. **Homepage (index.html + app.jsx)**: React-powered interactive form
2. **Other Pages (src/*.njk)**: 11ty generates static HTML from templates
3. **Shared Styles (styles.css)**: Used by both React and 11ty pages
4. **Netlify Forms**: Handles form submissions from both systems

---

## React Quote Form (Homepage)

### Overview

The homepage is a multi-step questionnaire that calculates renovation quotes based on user input.

### User Flow

1. **Landing Page** - Hero page with call-to-action
2. **Questionnaire** - 11 dynamic questions about renovation project
3. **Price Estimation** - Algorithm calculates price range
4. **Contact Form** - User provides details to receive detailed quote
5. **Submission** - Data sent via Netlify Forms
6. **Email Notification**

### Technical Architecture

```javascript
// State Management
const [step, setStep] = useState(-1);
const [formData, setFormData] = useState({...});

// Questions Array (11 questions)
const questions = [
  { id: 'projectCategory', title: '...', options: [...] },
  // ... with conditional logic
];

// Price Calculation Algorithm
const calculateEstimate = () => {
  // Factors: property type, scope, condition,
  // finish level, age, area, timeline
};
```

### Customizing the Questionnaire

#### Adding a New Question

Open [app.jsx](app.jsx) and find the `questions` array (around line 90):

```javascript
const questions = [
  // ... existing questions ...
  {
    id: 'numberOfRooms',
    title: 'Combien de pièces nécessitent une rénovation ?',
    subtitle: 'Sélectionnez le nombre de pièces',
    options: [
      { value: '1', label: 'Une Pièce', icon: '1️⃣', desc: 'Une seule pièce' },
      { value: '2-3', label: '2-3 Pièces', icon: '2️⃣', desc: 'Plusieurs pièces' },
      { value: '4+', label: '4+ Pièces', icon: '🏠', desc: 'Toute la maison' }
    ]
  }
];
```

**Important:** Also add the field to `formData` initial state:

```javascript
const [formData, setFormData] = useState({
  projectCategory: '',
  propertyType: '',
  numberOfRooms: '',  // Add your new field
  // ... other fields
});
```

#### Creating Conditional Questions

Questions that only appear based on previous answers:

```javascript
{
  id: 'kitchenStyle',
  title: 'Quel style de cuisine souhaitez-vous ?',
  // Only shows if renovationType is 'kitchen'
  condition: (data) => data.renovationType === 'kitchen',
  options: [
    { value: 'modern', label: 'Moderne', icon: '✨' },
    { value: 'traditional', label: 'Traditionnel', icon: '🏛️' }
  ]
}
```

#### Creating Input Questions

For text/number inputs instead of multiple choice:

```javascript
{
  id: 'budget',
  title: 'Quel est votre budget ?',
  type: 'input',
  inputType: 'number',
  placeholder: 'Entrez le montant en euros',
  suffix: '€'
}
```

### Adjusting Prices

The pricing algorithm is in `calculateEstimate()` function (around line 60 in [app.jsx](app.jsx)).

#### Price Calculation Formula

```
Base Price × Property Multiplier × Condition Multiplier ×
Finish Multiplier × Age Multiplier + Area Adjustments + Timeline Adjustments
```

#### Base Prices

```javascript
const renovationBase = {
  'complete': 60000,      // Full renovation
  'partial': 30000,       // Partial renovation
  'kitchen': 18000,       // Kitchen only
  'bathroom': 14000,      // Bathroom only
  'bedroom': 8000,        // Bedroom
  'livingroom': 12000,    // Living room
  'facade': 25000,        // Facade work
  'roofing': 20000,       // Roofing
  'insulation': 15000,    // Insulation
  'electrical': 10000,    // Electrical
  'plumbing': 12000,      // Plumbing
  'flooring': 8000,       // Flooring
  'painting': 5000,       // Painting
  'extension': 45000      // Extension
};
```

#### Multipliers

**Property Type:**
```javascript
const propertyMultiplier = {
  'house': 1.5,
  'flat': 1.0,
  'villa': 2.0,
  'office': 1.3,
  'commercial': 1.8
};
```

**Condition:**
```javascript
const conditionMultiplier = {
  'excellent': 0.7,    // 30% discount
  'good': 0.9,         // 10% discount
  'average': 1.0,      // No change
  'poor': 1.3,         // 30% increase
  'very-poor': 1.6     // 60% increase
};
```

**Finish Level:**
```javascript
const finishMultiplier = {
  'basic': 0.8,        // 20% cheaper
  'standard': 1.0,     // Baseline
  'premium': 1.4,      // 40% more
  'luxury': 2.0        // 100% more (double)
};
```

**Property Age:**
```javascript
const ageMultiplier = {
  'new': 0.8,          // 20% cheaper
  '0-10': 0.9,         // 10% cheaper
  '10-30': 1.0,        // Baseline
  '30-50': 1.1,        // 10% more
  '50+': 1.3           // 30% more
};
```

#### Area-Based Pricing

```javascript
if (formData.area) {
  const areaNum = parseInt(formData.area);

  if (areaNum > 150) basePrice *= 1.5;
  else if (areaNum > 100) basePrice *= 1.3;
  else if (areaNum > 50) basePrice *= 1.1;

  // Extra charge for very large properties
  if (areaNum > 200) {
    basePrice += (areaNum - 200) * 400;  // €400 per m² over 200m²
  }
}
```

#### Timeline Urgency

```javascript
if (formData.timeline === 'urgent') basePrice *= 1.2;      // 20% more
else if (formData.timeline === '1-3months') basePrice *= 1.1;  // 10% more
```

#### Price Range

```javascript
return {
  low: Math.round(basePrice * 0.85),      // -15%
  average: Math.round(basePrice),
  high: Math.round(basePrice * 1.25)      // +25%
};
```

### Complete Pricing Example

**User Input:**
- Property: House
- Renovation: Complete
- Condition: Average
- Finish: Premium
- Age: 10-30 years
- Area: 120m²
- Timeline: Flexible

**Calculation:**
```
Base: €60,000 (complete)
× 1.5 (house)
× 1.0 (average)
× 1.4 (premium)
× 1.0 (standard age)
= €126,000

Area adjustment (120m² > 100):
€126,000 × 1.3 = €163,800

Final Range:
Low: €139,230
Average: €163,800
High: €204,750
```

---

## 11ty Static Pages

### Overview

All pages except the homepage use Eleventy (11ty) for:
- **Template Reuse**: Header/footer in one place
- **Easy Maintenance**: Update once, changes everywhere
- **SEO Benefits**: Static HTML output
- **Fast Builds**: Under 100ms

### File Structure

```
src/
├── _includes/
│   ├── base.njk     # Main layout (About, Contact, Tips)
│   └── legal.njk    # Legal page layout
├── about-us.njk     # About Us page content
├── contact-us.njk   # Contact page content
├── tips-and-tricks.njk  # Tips page content
└── mentions-legales.njk # Legal page content
```

### Editing Pages

#### Update Header/Footer (All Pages)

Edit [src/_includes/base.njk](src/_includes/base.njk):

```html
<header class="header">
    <div class="logo">
        <img src="/images/logo.png" alt="Monolithe logo" />
        <a href="/index.html">Monolithe</a>
    </div>
    <nav class="nav">
        <a href="/index.html" class="nav-link">Accueil</a>
        <a href="/about-us.html" class="nav-link">À Propos</a>
        <a href="/tips-and-tricks.html" class="nav-link">Astuces</a>
        <a href="/contact-us.html" class="nav-link">Contact</a>
    </nav>
</header>
```

Changes apply to all pages automatically

#### Edit Page Content

Edit the content files in `src/`:

- **About Us**: [src/about-us.njk](src/about-us.njk)
- **Contact**: [src/contact-us.njk](src/contact-us.njk)
- **Tips**: [src/tips-and-tricks.njk](src/tips-and-tricks.njk)
- **Legal**: [src/mentions-legales.njk](src/mentions-legales.njk)

#### Add a New Page

1. Create `src/services.njk`:

```yaml
---
layout: base.njk
title: Nos Services
---

<section class="section">
    <div class="container">
        <h1>Nos Services</h1>
        <p>Your content here...</p>
    </div>
</section>
```

2. Build: `npm run build`
3. Page will be at `_site/services/index.html`
4. Update navigation in [src/_includes/base.njk](src/_includes/base.njk)

### Benefits: 

```
Update header navigation:
1. Edit src/_includes/base.njk
2. Run npm run build
✅ 1 file, guaranteed consistency!
```

---

## Deployment

### Understanding Netlify Forms

**Critical: Why the hidden HTML form is needed**

Netlify's form detection bots only parse static HTML at build time. For React forms:

1. **Static HTML Form** (in [index.html](index.html)): Hidden form for Netlify detection
2. **React Form** (in [app.jsx](app.jsx)): Actual interactive form
3. **Matching Names**: Both must have same `name="renovation-quote"`

**How it works:**
```
Build Time: Netlify bot finds hidden form → Sets up backend
Runtime: User fills React form → Submits to backend → Email sent
```

### Deploy to Netlify

#### Method 1: Git-Based Deploy (Recommended)

1. Push to GitHub
2. Connect repository to Netlify
3. Configuration (automatically detected from [netlify.toml](netlify.toml)):
   - Build command: `npm run build`
   - Publish directory: `_site`
4. Every push triggers automatic build and deploy

#### Method 2: Drag & Drop

1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop your entire project folder
4. Done!

### Enable Form Notifications

1. Go to Netlify dashboard
2. Click "Forms" in sidebar
3. Select "renovation-quote" form
4. Click "Settings & webhooks"
5. Add your email under "Form notifications"
6. Save

### Spam Protection

The form includes a **honeypot field** for spam protection:

```html
<!-- Hidden from real users, visible to bots -->
<p style={{display: 'none'}}>
  <label>Ne pas remplir : <input name="bot-field" /></label>
</p>
```

Bots fill all fields (including hidden ones) and get automatically filtered!

### netlify.toml Configuration

```toml
[build]
  command = "npm run build"
  publish = "_site"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- 11ty builds the static pages
- React homepage works correctly
- SPA routing works properly

---

## Customization

### Changing Company Name

Search and replace "Monolithe" in:
- [app.jsx](app.jsx) - React homepage
- [src/_includes/base.njk](src/_includes/base.njk) - 11ty pages

### Changing Colors

The site uses a blue color scheme. To change (e.g., to green):

**Search and replace in [app.jsx](app.jsx):**
- `from-blue-600` → `from-green-600`
- `to-blue-700` → `to-green-700`
- `bg-blue-600` → `bg-green-600`
- `text-blue-600` → `text-green-600`
- `border-blue-600` → `border-green-600`

### Changing Currency

Currently Euros (€). To change to USD ($):

```javascript
// In app.jsx, find:
€{estimate.low.toLocaleString()} - €{estimate.high.toLocaleString()}

// Change to:
${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
```

### Adding Analytics

Add to [index.html](index.html) before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

---

## Troubleshooting

### Forms Not Working on Netlify

**Problem:** Form submissions don't arrive

**Solutions:**

1. **Check hidden HTML form in [index.html](index.html):**
   ```html
   <form name="renovation-quote" netlify netlify-honeypot="bot-field" hidden>
   ```

2. **Check React form has matching name:**
   ```javascript
   <form name="renovation-quote" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="renovation-quote" />
   </form>
   ```

3. **Verify form appears in Netlify Dashboard → Forms**

4. **Check email notifications are enabled**

5. **Redeploy if needed** (sometimes required after adding form)

### Prices Showing as NaN

**Problem:** Estimate shows "NaN" or blank

**Solution:** Add fallback values:

```javascript
basePrice = renovationBase[formData.renovationType] || 30000;
```

### Questions Not Appearing

**Problem:** Some questions don't show

**Solution:**
1. Check `condition` property
2. Verify question `id` matches field in `formData`
3. Check browser console (F12) for JavaScript errors

### 11ty Changes Not Showing

**Problem:** Changes to 11ty pages not visible

**Solution:**
```bash
# Make sure you're editing src/ not _site/
# Clear cache and rebuild
rm -rf _site
npm run build
```

### Dev Server Not Updating

**Solution:**
```bash
# Restart the server
Ctrl+C
npm start
```

### Build Fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server at http://localhost:8080 with live reload |
| `npm run build` | Build production site to `_site/` directory |
| `npm run clean` | Delete `_site/` directory |

---

## Form Data Structure

When someone submits the form, you receive:

```
Name: Jean Dupont
Email: jean@example.com
Phone: +33 1 23 45 67 89
Estimate: €45,000 - €56,250

Project Details:
- projectCategory: renovation
- propertyType: house
- propertyAge: 10-30
- renovationType: complete
- area: 100
- currentCondition: good
- desiredFinish: standard
- timeline: 1-3months
- zipCode: 75001
- projectDescription: Besoin de rénover cuisine et salle de bain
```

---

## Performance

### Build Time
- **First build:** ~90ms
- **Subsequent builds:** ~50-100ms
- Very fast! ⚡

### Output
- Static HTML files (excellent SEO)
- No JavaScript needed for 11ty pages
- React only on homepage

### SEO Benefits
- Static HTML crawled perfectly by search engines
- Fast page load times
- Mobile responsive
- Semantic HTML structure

---

## Technology Stack

### Frontend
- **React** - Homepage interactive form
- **Eleventy (11ty)** - Static site generator
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Nunjucks** - Templating engine

### Forms & Backend
- **Netlify Forms** - Zero-backend form handling
- **Netlify Honeypot** - Spam protection

### Deployment
- **Netlify** - Automatic builds and hosting
- **Git** - Version control
- **Node.js** - Build tooling

---

## Project Statistics

### Code Reduction
- **Before migration:** 1,229 lines of HTML with duplication
- **After migration:** 594 lines (52% reduction!)
- **Maintenance:** 4x faster to update shared components

### Files
- **React Files:** 2 (index.html, app.jsx)
- **11ty Pages:** 4 (about, contact, tips, legal)
- **Layouts:** 2 (base.njk, legal.njk)
- **Total Pages Generated:** 5

---

## Success Checklist

### React Form Setup
- [ ] Questions are relevant to your business
- [ ] Pricing algorithm matches actual costs
- [ ] Form notifications work
- [ ] Tested full questionnaire flow
- [ ] Hidden HTML form in place
- [ ] Honeypot spam protection active

### 11ty Setup
- [ ] Header/footer updated with branding
- [ ] All pages reviewed and accurate
- [ ] Navigation links correct
- [ ] Build completes successfully
- [ ] Dev server runs without errors

### Deployment
- [ ] Site deployed to Netlify
- [ ] Form submissions tested
- [ ] Email notifications received
- [ ] All pages accessible
- [ ] Mobile responsive verified
- [ ] Analytics installed (optional)

### Content
- [ ] Company name updated
- [ ] Contact information current
- [ ] Images optimized
- [ ] Legal pages complete
- [ ] SEO metadata added

---

## Important Files Reference

| File | Purpose |
|------|---------|
| [index.html](index.html) | React homepage entry point |
| [app.jsx](app.jsx) | React quote form application |
| [src/_includes/base.njk](src/_includes/base.njk) | Main layout for most pages |
| [src/_includes/legal.njk](src/_includes/legal.njk) | Legal page layout |
| [styles.css](styles.css) | Global styles |
| [.eleventy.js](.eleventy.js) | 11ty configuration |
| [netlify.toml](netlify.toml) | Netlify deployment settings |
| [package.json](package.json) | Dependencies and scripts |

---

## Learning Resources

### Eleventy
- [11ty Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Template Docs](https://mozilla.github.io/nunjucks/)

### React
- [React Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react)

### Netlify
- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Forms Guide](https://docs.netlify.com/forms/setup/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)

---

## Support

### Documentation Files
- **This README** - Complete documentation
- **Quick Start** - Was QUICK-START.md (now integrated)
- **11ty Guide** - Was README-11ty.md (now integrated)
- **Migration Details** - Was MIGRATION-SUMMARY.md (now integrated)

### Online Help
- [11ty Discord](https://www.11ty.dev/blog/discord/)
- [Netlify Community](https://answers.netlify.com/)
- [Stack Overflow - #11ty](https://stackoverflow.com/questions/tagged/11ty)
- [Stack Overflow - #reactjs](https://stackoverflow.com/questions/tagged/reactjs)

---

## Version History

**Version 1.0.0** - December 2025
- Initial hybrid setup (React + 11ty)
- 11ty migration complete (52% code reduction)
- Netlify Forms integration
- Full documentation

---

## License

ISC

---

## Credits

**Built with:**
- React (Interactive form)
- Eleventy (Static pages)
- Tailwind CSS (Styling)
- Netlify (Hosting & Forms)

**Features:**
- No backend required
- Zero monthly costs
- Unlimited form submissions
- Excellent SEO
- Mobile responsive
- Easy maintenance

---

**Ready to generate leads and grow your renovation business!**
