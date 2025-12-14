// SVG Icon Components - Centralized
const ArrowRight = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const ArrowLeft = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
  </svg>
);

const Check = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-bottom">
        © 2025 Monolithe. Tous droits réservés. | <a href="/mentions-legales/" style={{color: 'inherit', textDecoration: 'underline'}}>Mentions légales</a>
      </div>
    </div>
  </footer>
);

function RenovationWebsite() {
  const [step, setStep] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [consentAccepted, setConsentAccepted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    projectCategory: '',
    propertyType: '',
    propertyAge: '',
    renovationType: '',
    area: '',
    currentCondition: '',
    timeline: '',
    zipCode: '',
    name: '',
    email: '',
    phone: '',
    projectDescription: ''
  });

  const calculateEstimate = () => {
    let basePrice = 0;
    
    const propertyMultiplier = {
      'house': 1.5, 'flat': 1.0, 'office': 1.3, 'commercial': 1.8
    };
    
    const renovationBase = {
      'complete': 60000, 'partial': 30000, 'kitchen': 18000, 'bathroom': 14000,
      'bedroom': 8000, 'livingroom': 12000, 'facade': 25000, 'roofing': 20000,
      'insulation': 15000, 'electrical': 10000, 'plumbing': 12000, 'flooring': 8000,
      'painting': 5000, 'extension': 45000
    };
    
    const conditionMultiplier = {
      'excellent': 0.7, 'good': 0.9, 'average': 1.0, 'poor': 1.3, 'very-poor': 1.6
    };
    
    const ageMultiplier = {
      '0-10': 0.9, '10-30': 1.0, '30+': 1.1
    };
    
    basePrice = renovationBase[formData.renovationType] || 30000;
    basePrice *= propertyMultiplier[formData.propertyType] || 1;
    basePrice *= conditionMultiplier[formData.currentCondition] || 1;
    basePrice *= ageMultiplier[formData.propertyAge] || 1;
    
    if (formData.area) {
      const areaNum = parseInt(formData.area);
      if (areaNum > 150) basePrice *= 1.5;
      else if (areaNum > 100) basePrice *= 1.3;
      else if (areaNum > 50) basePrice *= 1.1;
      if (areaNum > 200) basePrice += (areaNum - 200) * 400;
    }
    
    if (formData.timeline === 'urgent') basePrice *= 1.2;
    else if (formData.timeline === '1-3 mois') basePrice *= 1.1;
    
    return {
      low: Math.round(basePrice * 0.85),
      average: Math.round(basePrice),
      high: Math.round(basePrice * 1.25)
    };
  };

  const questions = [
    {
      id: 'projectCategory',
      title: 'Quel type de projet ?',
      options: [
        { value: 'renovation', label: 'Rénovation' },
        { value: 'extension', label: 'Extension' },
        { value: 'specific-room', label: 'Pièce spécifique' },
        { value: 'exterior', label: 'Travaux extérieurs' }
      ]
    },
    {
      id: 'propertyType',
      title: 'Type de bien ?',
      options: [
        { value: 'house', label: 'Maison' },
        { value: 'flat', label: 'Appartement' },
        { value: 'office', label: 'Bureau' }
      ]
    },
    {
      id: 'propertyAge',
      title: 'Âge de la propriété ?',
      options: [
        { value: '0-10', label: 'Moins de 10 ans' },
        { value: '10-30', label: '10-30 ans' },
        { value: '30+', label: 'Plus de 30 ans' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Type de rénovation ?',
      condition: (data) => data.projectCategory === 'renovation',
      options: [
        { value: 'complete', label: 'Complète' },
        { value: 'partial', label: 'Partielle' },
        { value: 'insulation', label: 'Isolation & Énergie' },
        { value: 'electrical', label: 'Électrique' },
        { value: 'plumbing', label: 'Plomberie' },
        { value: 'painting', label: 'Peinture' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Quelle pièce ?',
      condition: (data) => data.projectCategory === 'specific-room',
      options: [
        { value: 'kitchen', label: 'Cuisine' },
        { value: 'bathroom', label: 'Salle de bain' },
        { value: 'bedroom', label: 'Chambre' },
        { value: 'livingroom', label: 'Salon' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Travaux extérieurs ?',
      condition: (data) => data.projectCategory === 'exterior',
      options: [
        { value: 'facade', label: 'Façade' },
        { value: 'roofing', label: 'Toiture' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Type d\'extension ?',
      condition: (data) => data.projectCategory === 'extension',
      options: [
        { value: 'extension', label: 'Extension maison' }
      ]
    },
    {
      id: 'area',
      title: 'Superficie concernée ?',
      type: 'input',
      inputType: 'number',
      placeholder: 'en m²',
      suffix: 'm²'
    },
    {
      id: 'currentCondition',
      title: 'État actuel ?',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Bon' },
        { value: 'average', label: 'Moyen' },
        { value: 'poor', label: 'Mauvais' },
        { value: 'very-poor', label: 'Très mauvais' }
      ]
    },
    {
      id: 'timeline',
      title: 'Quand commencer ?',
      options: [
        { value: 'urgent', label: 'Urgent' },
        { value: '1-3 mois', label: '1-3 mois' },
        { value: '3-6 mois', label: '3-6 mois' },
        { value: 'flexible', label: 'Flexible' }
      ]
    },
    {
      id: 'zipCode',
      title: 'Code postal ?',
      type: 'input',
      inputType: 'text',
      placeholder: 'Ex: 75001',
      maxLength: 10
    }
  ];

  const filteredQuestions = questions.filter(q => !q.condition || q.condition(formData));
  const currentQuestion = filteredQuestions[step] || questions[step];
  const estimate = calculateEstimate();
  const totalQuestions = filteredQuestions.length;

  // Function to get French label from English value
  const getFrenchLabel = (questionId, value) => {
    if (!value) return '';
    const question = questions.find(q => q.id === questionId && q.options);
    const option = question?.options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  const handleOptionClick = (value) => {
    setFormData({ ...formData, [currentQuestion.id]: value });
    setTimeout(() => {
      if (step < filteredQuestions.length - 1) {
        setStep(step + 1);
        setProgress(((step + 2) / (filteredQuestions.length + 1)) * 100);
      } else {
        setStep(filteredQuestions.length);
        setProgress(100);
      }
    }, 200);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value) {
      setFormData({ ...formData, [currentQuestion.id]: input.value });
      if (step < filteredQuestions.length - 1) {
        setStep(step + 1);
        setProgress(((step + 2) / (filteredQuestions.length + 1)) * 100);
      } else {
        setStep(filteredQuestions.length);
        setProgress(100);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setProgress(((step) / (filteredQuestions.length + 1)) * 100);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formDataToSubmit = new FormData(form);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSubmit).toString()
      });
      
      if (response.ok) {
        setStep(filteredQuestions.length + 1);
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      alert('Impossible de soumettre le formulaire. Vérifiez votre connexion internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Landing Page
  if (step === -1) {
    return (
      <div>
        {/* Header */}
        <header className="header">
          <div className="container header-inner">
            <div className="logo">
              <img src="./images/logo.png" alt="Monolithe logo" />
              <a href="/">Monolithe</a>
            </div>
            <nav className="nav">
              <a href="/" className="nav-link nav-link-active">Accueil</a>
              <a href="/about-us/" className="nav-link">À Propos</a>
              <a href="/tips-and-tricks/" className="nav-link">Astuces</a>
              <a href="/projects/" className="nav-link">Nos projets</a>
              <a href="/contact-us/" className="nav-link">Contact</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container container-md section-hero" id="hero">
          <div className="text-center space-y-8">
            <h1 className="heading-hero">
              Obtenez votre devis<br />de rénovation
            </h1>

            <p className="text-large">
              Répondez à quelques questions simples et recevez* une estimation détaillée en 2 minutes
            </p>

            <button
              onClick={() => { setStep(0); setProgress(10); }}
              className="btn btn-primary btn-lg"
            >
              Commencer
            </button>

            <p className="text-small mt-2">
              *Vos coordonnées seront demandées pour recevoir votre devis estimatif
            </p>

            {/* Benefits */}
            <div className="check-list check-list-inline pt-8">
              <div className="flex items-center gap-2">
                <Check />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Check />
                <span>2 minutes</span>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Questionnaire & Results
  return (
    <div>
      {/* Header with Progress */}
      <header className="header header-sticky">
        <div className="container container-md">
          <div className="header-inner">
            <div className="flex items-center gap-8">
              <div className="logo">
                <img src="./images/logo.png" alt="Monolithe logo" />
                <a href="/">Monolithe</a>
              </div>
              <nav className="nav hidden-mobile">
                <a href="/about-us/" className="nav-link">À Propos</a>
                <a href="/tips-and-tricks/" className="nav-link">Astuces</a>
                <a href="/contact-us/" className="nav-link">Contact</a>
              </nav>
            </div>
            {step < totalQuestions && (
              <div className="text-small text-muted">
                {step + 1} / {totalQuestions}
              </div>
            )}
          </div>
          {/* Progress Bar */}
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="container container-sm section-content">
        {/* Questions */}
        {step >= 0 && step < totalQuestions && currentQuestion && (
          <div className="space-y-12 animate-fade-in">
            {/* Question Title */}
            <div>
              <h2 className="heading-hero">
                {currentQuestion.title}
              </h2>
            </div>

            {/* Input Type */}
            {currentQuestion.type === 'input' ? (
              <form onSubmit={handleInputSubmit} className="space-y-6">
                <div className="form-input-wrapper">
                  <input
                    type={currentQuestion.inputType}
                    placeholder={currentQuestion.placeholder}
                    maxLength={currentQuestion.maxLength}
                    className="form-input form-input-lg"
                    required
                    autoFocus
                  />
                  {currentQuestion.suffix && (
                    <span className="form-input-suffix">
                      {currentQuestion.suffix}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Continuer
                  <ArrowRight />
                </button>
              </form>
            ) : (
              /* Multiple Choice */
              <div className="option-grid">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className={`option-btn ${formData[currentQuestion.id] === option.value ? 'option-btn-selected' : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {/* Back Button */}
            {step > 0 && (
              <button onClick={handleBack} className="btn btn-text">
                <ArrowLeft />
                Retour
              </button>
            )}
          </div>
        )}

        {/* Contact Form Screen (after questions, before showing estimate) */}
        {step === totalQuestions && (
          <div className="space-y-12 animate-fade-in">
            <div className="card card-padded">
              <h3 className="heading-card mb-6">
                Vos coordonnées
              </h3>
              <p className="text-body mb-6">
                Renseignez vos informations pour découvrir votre estimation personnalisée
              </p>
              
              <form 
                name="renovation-quote" 
                method="POST" 
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleContactSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="renovation-quote" />
                
                {/* Hidden fields */}
                <input type="hidden" name="projectCategory" value={formData.projectCategory} />
                <input type="hidden" name="propertyType" value={formData.propertyType} />
                <input type="hidden" name="propertyAge" value={formData.propertyAge} />
                <input type="hidden" name="renovationType" value={formData.renovationType} />
                <input type="hidden" name="area" value={formData.area} />
                <input type="hidden" name="currentCondition" value={formData.currentCondition} />
                <input type="hidden" name="timeline" value={formData.timeline} />
                <input type="hidden" name="zipCode" value={formData.zipCode} />
                <input type="hidden" name="estimate" value={`€${estimate.low.toLocaleString()} - €${estimate.high.toLocaleString()}`} />
                
                {/* Honeypot */}
                <p className="hidden">
                  <label>Ne pas remplir : <input name="bot-field" /></label>
                </p>
                
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message (optionnel)</label>
                  <textarea
                    name="projectDescription"
                    rows="3"
                    className="form-input form-textarea"
                    placeholder="Précisions sur votre projet..."
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      required
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      J'accepte que mes données personnelles soient traitées par Monolithe dans le cadre de ma demande de devis et j'ai pris connaissance des{' '}
                      <a href="/mentions-legales/" target="_blank" rel="noopener noreferrer" className="text-link">
                        mentions légales
                      </a>.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !consentAccepted}
                  className="btn btn-primary btn-full"
                >
                  {isSubmitting ? 'Envoi...' : 'Voir mon estimation'}
                </button>
              </form>
            </div>

            {/* Back Button */}
            <button onClick={handleBack} className="btn btn-text">
              <ArrowLeft />
              Retour
            </button>
          </div>
        )}

        {/* Estimate Screen (after form submission) */}
        {step === totalQuestions + 1 && (
          <div className="space-y-12 animate-fade-in">
            {/* Success Message */}
            <div className="text-center">
              <div className="success-icon">
                <Check />
              </div>
              <p className="text-body">
                Votre demande a été envoyée avec succès
              </p>
            </div>

            {/* Estimate Card */}
            <div className="card card-padded-lg">
              <div className="estimate-display">
                <div className="estimate-label">Estimation de votre projet</div>
                <div className="estimate-value">
                  {estimate.low.toLocaleString()} - {estimate.high.toLocaleString()} €
                </div>
                <div className="estimate-average">
                  Moyenne : {estimate.average.toLocaleString()} €
                </div>
              </div>
            </div>

            
            {/* Call to Action - Calendly */}
            <div className="card card-padded text-center">
              <h3 className="heading-card mb-4">
                Envie d'en discuter ?
              </h3>
              <p className="text-body mb-6">
                Planifiez un appel gratuit avec un expert pour affiner votre projet
              </p>
              <a 
                href="https://calendly.com/YOUR_CALENDLY_LINK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <CalendarIcon />
                Planifier un appel
              </a>
            </div>

            {/* Summary */}
            <div>
              <h3 className="heading-small mb-6">Résumé</h3>
              <div className="summary-table">
                {[
                  { label: 'Projet', value: getFrenchLabel('projectCategory', formData.projectCategory) },
                  { label: 'Bien', value: getFrenchLabel('propertyType', formData.propertyType) },
                  { label: 'Âge', value: getFrenchLabel('propertyAge', formData.propertyAge) },
                  { label: 'Travaux', value: getFrenchLabel('renovationType', formData.renovationType) },
                  { label: 'Surface', value: formData.area ? `${formData.area} m²` : '' },
                  { label: 'État', value: getFrenchLabel('currentCondition', formData.currentCondition) },
                  { label: 'Délai', value: getFrenchLabel('timeline', formData.timeline) }
                ].filter(item => item.value).map((item, i) => (
                  <div key={i} className="summary-row">
                    <span className="summary-label">{item.label}</span>
                    <span className="summary-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Home Button */}
            <div className="text-center">
              <a href="/" className="btn btn-text">
                Retour à l'accueil
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
