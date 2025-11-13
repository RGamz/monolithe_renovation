# RenovatePro - Renovation Quote Website

A sophisticated, multi-step questionnaire website for generating renovation quotes. Built with React, styled with Tailwind CSS, and deployed on Netlify with zero backend required.

## 📋 Table of Contents

- [How It Works](#how-it-works)
- [Project Architecture](#project-architecture)
- [Customizing the Questionnaire](#customizing-the-questionnaire)
- [Adjusting Prices](#adjusting-prices)
- [Deployment Guide](#deployment-guide)
- [Advanced Customization](#advanced-customization)
- [Troubleshooting](#troubleshooting)

---

## 🎯 How It Works

### User Flow

1. **Landing Page** - User arrives at attractive hero page with call-to-action
2. **Questionnaire** - User answers 11 dynamic questions about their renovation project
3. **Estimation** - System calculates a price range based on their answers
4. **Contact Form** - User fills in contact details to receive detailed quote
5. **Submission** - Form data sent via Netlify Forms (no database needed)
6. **Email** - You receive an email with all project details and contact information

### Technical Flow

```
User Input → State Management → Conditional Logic → Price Calculation → Form Submission → Email Notification
```

### Key Features

- **Dynamic Questions**: Questions adapt based on previous answers (conditional logic)
- **Smart Pricing**: Sophisticated algorithm considers multiple factors
- **No Backend**: Uses Netlify Forms for data collection (no server needed)
- **100% Free**: No monthly costs, no database, no hosting fees
- **Mobile Responsive**: Works perfectly on all devices

---

## 🏗️ Project Architecture

### Files Structure

```
project/
├── index.html          # Entry point, loads React and app
├── app.jsx            # Main React application (in French)
└── netlify.toml       # Netlify configuration
```

### How app.jsx Works

```javascript
// 1. State Management
const [step, setStep] = useState(-1);  // Current question number
const [formData, setFormData] = useState({...});  // User's answers

// 2. Questions Array
const questions = [
  { id: 'projectCategory', title: '...', options: [...] },
  { id: 'propertyType', title: '...', options: [...] },
  // ... more questions
];

// 3. Conditional Logic
condition: (data) => data.projectCategory === 'renovation'

// 4. Price Calculation
const calculateEstimate = () => {
  // Complex algorithm that considers:
  // - Property type
  // - Renovation scope
  // - Current condition
  // - Desired finish level
  // - Property age
  // - Area size
  // - Timeline urgency
};

// 5. Form Submission
<form name="renovation-quote" method="POST" data-netlify="true">
  // Netlify automatically handles form submissions
</form>
```

---

## 📝 Customizing the Questionnaire

### Adding a New Question

Open `app.jsx` and find the `questions` array (around line 90). Add your new question:

```javascript
const questions = [
  // ... existing questions ...
  
  {
    id: 'numberOfRooms',  // Unique identifier
    title: 'Combien de pièces nécessitent une rénovation ?',  // Question text
    subtitle: 'Sélectionnez le nombre de pièces',  // Optional subtitle
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
  // ... existing fields ...
  numberOfRooms: '',  // Add your new field here
});
```

### Modifying Existing Questions

Find the question by its `id` and edit the options:

```javascript
{
  id: 'propertyType',
  title: 'Quel type de bien s\'agit-il ?',
  options: [
    // Edit these options
    { value: 'house', label: 'Maison', icon: '🏠', desc: 'Maison individuelle' },
    { value: 'condo', label: 'Copropriété', icon: '🏢', desc: 'Copropriété' },  // NEW
    // Add or remove options as needed
  ]
}
```

### Creating Conditional Questions

Questions that only appear based on previous answers:

```javascript
{
  id: 'kitchenStyle',
  title: 'Quel style de cuisine souhaitez-vous ?',
  subtitle: 'Choisissez votre style préféré',
  // This question ONLY shows if renovationType is 'kitchen'
  condition: (data) => data.renovationType === 'kitchen',
  options: [
    { value: 'modern', label: 'Moderne', icon: '✨', desc: 'Design contemporain' },
    { value: 'traditional', label: 'Traditionnel', icon: '🏛️', desc: 'Style classique' },
    { value: 'rustic', label: 'Rustique', icon: '🪵', desc: 'Style campagne' }
  ]
}
```

**Multiple conditions:**

```javascript
condition: (data) => 
  data.projectCategory === 'renovation' && 
  data.propertyType === 'house'
```

### Creating Input Questions (Not Multiple Choice)

For questions where users type an answer:

```javascript
{
  id: 'budget',
  title: 'Quel est votre budget ?',
  subtitle: 'Entrez votre budget maximum',
  type: 'input',  // This makes it an input field
  inputType: 'number',  // Type of input (number, text, email, tel)
  placeholder: 'Entrez le montant en euros',
  suffix: '€'  // Optional: shows at the end of input
}
```

### Removing a Question

1. Find the question in the `questions` array
2. Delete the entire question object
3. Remove the corresponding field from `formData` initial state

**Example:**

```javascript
// DELETE THIS ENTIRE BLOCK
{
  id: 'propertyAge',
  title: 'Quel est l\'âge de la propriété ?',
  options: [...]
},
```

---

## 💰 Adjusting Prices

The pricing algorithm is in the `calculateEstimate()` function (around line 60 in `app.jsx`).

### Understanding the Pricing Logic

The final price is calculated by:

```
Base Price × Property Multiplier × Condition Multiplier × Finish Multiplier × Age Multiplier + Area Adjustments + Timeline Adjustments
```

### Changing Base Prices

Find the `renovationBase` object:

```javascript
const renovationBase = {
  'complete': 60000,      // Full renovation: €60,000 base
  'partial': 30000,       // Partial renovation: €30,000 base
  'kitchen': 18000,       // Kitchen only: €18,000 base
  'bathroom': 14000,      // Bathroom only: €14,000 base
  'bedroom': 8000,        // Bedroom: €8,000 base
  'livingroom': 12000,    // Living room: €12,000 base
  'facade': 25000,        // Facade work: €25,000 base
  'roofing': 20000,       // Roofing: €20,000 base
  'insulation': 15000,    // Insulation: €15,000 base
  'electrical': 10000,    // Electrical: €10,000 base
  'plumbing': 12000,      // Plumbing: €12,000 base
  'flooring': 8000,       // Flooring: €8,000 base
  'painting': 5000,       // Painting: €5,000 base
  'extension': 45000      // Extension: €45,000 base
};
```

**How to change:** Simply edit the numbers to match your pricing.

### Adjusting Property Type Multipliers

```javascript
const propertyMultiplier = {
  'house': 1.5,        // Houses cost 1.5× base price
  'flat': 1.0,         // Apartments cost 1.0× (no change)
  'villa': 2.0,        // Villas cost 2.0× base price
  'office': 1.3,       // Offices cost 1.3× base price
  'commercial': 1.8    // Commercial cost 1.8× base price
};
```

**Example:** If base price is €20,000:
- House: €20,000 × 1.5 = €30,000
- Flat: €20,000 × 1.0 = €20,000
- Villa: €20,000 × 2.0 = €40,000

### Adjusting Condition Multipliers

```javascript
const conditionMultiplier = {
  'excellent': 0.7,     // Good condition = 30% discount
  'good': 0.9,          // Good = 10% discount
  'average': 1.0,       // Average = no change
  'poor': 1.3,          // Poor = 30% increase
  'very-poor': 1.6      // Very poor = 60% increase
};
```

**Logic:** Worse condition = more work = higher price

### Adjusting Finish Level Multipliers

```javascript
const finishMultiplier = {
  'basic': 0.8,        // Basic finishes = 20% cheaper
  'standard': 1.0,     // Standard = baseline
  'premium': 1.4,      // Premium = 40% more expensive
  'luxury': 2.0        // Luxury = 100% more expensive (double)
};
```

### Adjusting Age Multipliers

```javascript
const ageMultiplier = {
  'new': 0.8,          // New buildings = 20% cheaper (less work)
  '0-10': 0.9,         // Recent = 10% cheaper
  '10-30': 1.0,        // Standard age = baseline
  '30-50': 1.1,        // Older = 10% more expensive
  '50+': 1.3           // Very old = 30% more expensive
};
```

### Area-Based Pricing

```javascript
// Area adjustment logic
if (formData.area) {
  const areaNum = parseInt(formData.area);
  
  // Add multipliers based on size
  if (areaNum > 150) basePrice *= 1.5;       // Large properties
  else if (areaNum > 100) basePrice *= 1.3;  // Medium-large
  else if (areaNum > 50) basePrice *= 1.1;   // Medium
  
  // Extra charge for very large properties
  if (areaNum > 200) {
    basePrice += (areaNum - 200) * 400;  // €400 per m² over 200m²
  }
}
```

**How to adjust:**
- Change the area thresholds (50, 100, 150, 200)
- Change the multipliers (1.1, 1.3, 1.5)
- Change the per-square-meter rate (400)

### Timeline Urgency Pricing

```javascript
if (formData.timeline === 'urgent') basePrice *= 1.2;      // Urgent = 20% more
else if (formData.timeline === '1-3months') basePrice *= 1.1;  // Soon = 10% more
```

### Price Range Calculation

```javascript
return {
  low: Math.round(basePrice * 0.85),      // Minimum = -15%
  average: Math.round(basePrice),          // Average = calculated price
  high: Math.round(basePrice * 1.25)       // Maximum = +25%
};
```

**How to adjust:** Change 0.85 and 1.25 to widen or narrow the range.

### Complete Pricing Example

Let's walk through a calculation:

**User selects:**
- Property: House
- Renovation: Complete
- Condition: Average
- Finish: Premium
- Age: 10-30 years
- Area: 120m²
- Timeline: Flexible

**Calculation:**
```
Base Price: €60,000 (complete renovation)
× 1.5 (house multiplier)
× 1.0 (average condition)
× 1.4 (premium finish)
× 1.0 (standard age)
= €126,000

Area adjustment (120m² > 100):
€126,000 × 1.3 = €163,800

No timeline urgency: no additional multiplier

Final range:
Low: €163,800 × 0.85 = €139,230
Average: €163,800
High: €163,800 × 1.25 = €204,750
```

### Adding Your Own Pricing Factors

Want to add a new factor? Here's how:

```javascript
// 1. Add a new multiplier object
const locationMultiplier = {
  'urban': 1.3,
  'suburban': 1.0,
  'rural': 0.8
};

// 2. Apply it in the calculation
basePrice *= locationMultiplier[formData.location] || 1;
```

---

## 🚀 Deployment Guide

### Quick Deploy to Netlify

1. **Prepare files:**
   - `index.html`
   - `app.jsx`
   - `netlify.toml`

2. **Upload to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag and drop your folder
   - Wait 30 seconds - Done!

3. **Enable form notifications:**
   - Go to your site in Netlify dashboard
   - Click "Forms" in sidebar
   - Select "renovation-quote" form
   - Click "Settings & webhooks"
   - Add your email under "Form notifications"
   - Save

### Testing Locally

1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open `index.html`
3. Right-click → "Open with Live Server"
4. Test the entire flow

---

## 🎨 Advanced Customization

### Changing Company Name

Search and replace "RenovatePro" in `app.jsx`:

```javascript
<span className="text-2xl font-bold text-white">VotreEntreprise</span>
```

### Changing Colors

The site uses a blue color scheme. To change to another color:

**Search and replace in `app.jsx`:**
- `from-blue-600` → `from-green-600` (for green)
- `to-blue-700` → `to-green-700`
- `bg-blue-600` → `bg-green-600`
- `text-blue-600` → `text-green-600`
- `border-blue-600` → `border-green-600`

**Tailwind color options:**
- `red-600`, `green-600`, `purple-600`, `pink-600`, `indigo-600`
- `orange-600`, `yellow-600`, `teal-600`, `cyan-600`

### Changing Currency

Currently set to Euros (€). To change to another currency:

**In the estimate display (around line 450):**
```javascript
// Find this line:
€{estimate.low.toLocaleString()} - €{estimate.high.toLocaleString()}

// Change to:
${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}  // USD
£{estimate.low.toLocaleString()} - £{estimate.high.toLocaleString()}  // GBP
CHF {estimate.low.toLocaleString()} - CHF {estimate.high.toLocaleString()}  // Swiss Franc
```

### Adding Analytics

Add tracking code to `index.html` before `</head>`:

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

## 🐛 Troubleshooting

### Forms Not Working on Netlify

**Problem:** Form submissions don't arrive

**Solution:**
1. Check `data-netlify="true"` is in the `<form>` tag
2. Ensure `netlify.toml` is in root directory
3. Make sure form has a unique `name` attribute
4. Verify email notifications are enabled in Netlify dashboard
5. Check spam folder

### Prices Showing as NaN or Undefined

**Problem:** Estimate shows "NaN" or blank

**Solution:**
1. Check all multiplier objects have values for selected options
2. Ensure `formData` contains the expected values
3. Add fallback values: `|| 1` or `|| 30000`

Example:
```javascript
basePrice = renovationBase[formData.renovationType] || 30000;  // Default to 30000
```

### Questions Not Appearing

**Problem:** Some questions don't show up

**Solution:**
1. Check the `condition` property - is it preventing the question from showing?
2. Verify question `id` matches the field in `formData`
3. Check for JavaScript errors in browser console (F12)

### Conditional Logic Not Working

**Problem:** Questions appear when they shouldn't (or vice versa)

**Solution:**
1. Check the condition function:
```javascript
condition: (data) => data.projectCategory === 'renovation'
```
2. Verify the comparison values match exactly (case-sensitive)
3. Test the condition with console.log:
```javascript
condition: (data) => {
  console.log('Testing condition:', data.projectCategory);
  return data.projectCategory === 'renovation';
}
```

---

## 📊 Understanding Form Data

When someone submits the form, you receive an email with:

```
Name: Jean Dupont
Email: jean@example.com
Phone: +33 1 23 45 67 89
Estimate: €45,000 - €56,250

Hidden Fields (from questionnaire):
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

## 🎉 Success Checklist

- [ ] Questions are clear and relevant to your business
- [ ] Pricing algorithm matches your actual costs
- [ ] Form notifications are set up and working
- [ ] Tested on mobile devices
- [ ] Company name and branding updated
- [ ] Analytics tracking installed (optional)
- [ ] Tested full user journey
- [ ] Contact information updated
- [ ] Ready to generate leads!

---

**Built with React, Tailwind CSS, and Netlify Forms**

*No backend required • Zero monthly costs • Unlimited submissions*