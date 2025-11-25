// Simple SVG Icons
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
      'new': 0.8, '0-10': 0.9, '10-30': 1.0, '30-50': 1.1, '50+': 1.3
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
        { value: 'new', label: 'Moins de 5 ans' },
        { value: '0-10', label: '5-10 ans' },
        { value: '10-30', label: '10-30 ans' },
        { value: '30-50', label: '30-50 ans' },
        { value: '50+', label: 'Plus de 50 ans' }
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
  const estimate = step >= filteredQuestions.length ? calculateEstimate() : null;
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
              <img src="./logo.png" alt="Monolithe logo" />
              <a href="/index.html">Monolithe</a>
            </div>
            <nav className="nav">
              <a href="index.html" className="nav-link nav-link-active">Accueil</a>
              <a href="about-us.html" className="nav-link">À Propos</a>
              <a href="tips-and-tricks.html" className="nav-link">Astuces</a>
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
              Répondez à quelques questions simples et recevez une estimation détaillée en 2 minutes
            </p>

            <button
              onClick={() => { setStep(0); setProgress(10); }}
              className="btn btn-primary btn-lg"
            >
              Commencer
              <ArrowRight />
            </button>

            {/* Benefits */}
            <div className="check-list check-list-inline pt-12">
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
                <a href="/index.html">Monolithe</a>
              </div>
              <nav className="nav hidden-mobile">
                <a href="about-us.html" className="nav-link">À Propos</a>
                <a href="tips-and-tricks.html" className="nav-link">Astuces</a>
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

        {/* Estimate Screen */}
        {step === totalQuestions && estimate && (
          <div className="space-y-12 animate-fade-in">
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

            {/* Summary */}
            <div>
              <h3 className="heading-small mb-6">Résumé</h3>
              <div className="summary-table">
                {[
                  { label: 'Projet', value: getFrenchLabel('projectCategory', formData.projectCategory) },
                  { label: 'Bien', value: getFrenchLabel('propertyType', formData.propertyType) },
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

            {/* Contact Form */}
            <div className="card card-padded">
              <h3 className="heading-card mb-6">
                Recevez votre devis détaillé
              </h3>
              
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
                      <a href="mentions-legales.html" target="_blank" rel="noopener noreferrer" className="text-link">
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
                  {isSubmitting ? 'Envoi...' : 'Recevoir mon devis'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {step === totalQuestions + 1 && (
          <div className="text-center animate-fade-in">
            <div className="card card-padded-lg">
              <div className="success-icon">
                <Check />
              </div>
              <h2 className="heading-section mb-4">Demande envoyée</h2>
              <p className="text-body">
                Notre équipe vous contactera dans les 24 heures
              </p>
            </div>
            
            <button
              onClick={() => {
                setStep(-1);
                setProgress(0);
                setFormData({
                  projectCategory: '', propertyType: '', propertyAge: '', renovationType: '',
                  area: '', currentCondition: '', timeline: '', zipCode: '',
                  name: '', email: '', phone: '', projectDescription: ''
                });
              }}
              className="btn btn-text mt-8"
            >
              Nouvelle demande
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
