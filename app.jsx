// Simple SVG Icons
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const ArrowLeft = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
  </svg>
);

const CheckCircle = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DollarSign = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function RenovationWebsite() {
  const [step, setStep] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);
  const [formData, setFormData] = React.useState({
    projectCategory: '',
    propertyType: '',
    propertyAge: '',
    renovationType: '',
    area: '',
    currentCondition: '',
    desiredFinish: '',
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
      'house': 1.5, 'flat': 1.0, 'villa': 2.0, 'office': 1.3, 'commercial': 1.8
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
    
    const finishMultiplier = {
      'basic': 0.8, 'standard': 1.0, 'premium': 1.4, 'luxury': 2.0
    };
    
    const ageMultiplier = {
      'new': 0.8, '0-10': 0.9, '10-30': 1.0, '30-50': 1.1, '50+': 1.3
    };
    
    basePrice = renovationBase[formData.renovationType] || 30000;
    basePrice *= propertyMultiplier[formData.propertyType] || 1;
    basePrice *= conditionMultiplier[formData.currentCondition] || 1;
    basePrice *= finishMultiplier[formData.desiredFinish] || 1;
    basePrice *= ageMultiplier[formData.propertyAge] || 1;
    
    if (formData.area) {
      const areaNum = parseInt(formData.area);
      if (areaNum > 150) basePrice *= 1.5;
      else if (areaNum > 100) basePrice *= 1.3;
      else if (areaNum > 50) basePrice *= 1.1;
      if (areaNum > 200) basePrice += (areaNum - 200) * 400;
    }
    
    if (formData.timeline === 'urgent') basePrice *= 1.2;
    else if (formData.timeline === '1-3months') basePrice *= 1.1;
    
    return {
      low: Math.round(basePrice * 0.85),
      average: Math.round(basePrice),
      high: Math.round(basePrice * 1.25)
    };
  };

  const questions = [
    {
      id: 'projectCategory',
      title: 'Quel type de projet avez-vous en tête ?',
      subtitle: 'Sélectionnez la catégorie qui décrit le mieux votre rénovation',
      options: [
        { value: 'renovation', label: 'Rénovation', icon: '🏗️', desc: 'Améliorer l\'espace existant' },
        { value: 'extension', label: 'Extension', icon: '📐', desc: 'Ajouter de l\'espace' },
        { value: 'specific-room', label: 'Pièce Spécifique', icon: '🚪', desc: 'Projet d\'une seule pièce' },
        { value: 'exterior', label: 'Travaux Extérieurs', icon: '🏡', desc: 'Façade, toiture, jardin' }
      ]
    },
    {
      id: 'propertyType',
      title: 'Quel type de bien s\'agit-il ?',
      subtitle: 'Parlez-nous de votre propriété',
      options: [
        { value: 'house', label: 'Maison', icon: '🏠', desc: 'Maison individuelle' },
        { value: 'flat', label: 'Appartement', icon: '🏢', desc: 'Immeuble collectif' },
        { value: 'villa', label: 'Villa', icon: '🏰', desc: 'Grande maison de luxe' },
        { value: 'office', label: 'Bureau', icon: '💼', desc: 'Espace commercial' }
      ]
    },
    {
      id: 'propertyAge',
      title: 'Quel est l\'âge de la propriété ?',
      subtitle: 'L\'âge du bien influence les exigences de rénovation',
      options: [
        { value: 'new', label: 'Moins de 5 ans', icon: '✨' },
        { value: '0-10', label: '5-10 ans', icon: '🏗️' },
        { value: '10-30', label: '10-30 ans', icon: '🏠' },
        { value: '30-50', label: '30-50 ans', icon: '🏚️' },
        { value: '50+', label: 'Plus de 50 ans', icon: '🏛️' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Quel type de travaux de rénovation souhaitez-vous ?',
      subtitle: 'Sélectionnez la portée principale de votre projet',
      condition: (data) => data.projectCategory === 'renovation',
      options: [
        { value: 'complete', label: 'Rénovation Complète', icon: '🏗️', desc: 'Transformation totale' },
        { value: 'partial', label: 'Rénovation Partielle', icon: '🔨', desc: 'Plusieurs pièces' },
        { value: 'insulation', label: 'Isolation & Énergie', icon: '♨️', desc: 'Efficacité énergétique' },
        { value: 'electrical', label: 'Mise à Niveau Électrique', icon: '⚡', desc: 'Câblage et systèmes' },
        { value: 'plumbing', label: 'Travaux de Plomberie', icon: '🚰', desc: 'Systèmes d\'eau' },
        { value: 'painting', label: 'Peinture & Décoration', icon: '🎨', desc: 'Finitions cosmétiques' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Quelle pièce nécessite une rénovation ?',
      subtitle: 'Sélectionnez la pièce spécifique',
      condition: (data) => data.projectCategory === 'specific-room',
      options: [
        { value: 'kitchen', label: 'Cuisine', icon: '🍳', desc: 'Rénovation complète cuisine' },
        { value: 'bathroom', label: 'Salle de Bain', icon: '🚿', desc: 'Amélioration salle de bain' },
        { value: 'bedroom', label: 'Chambre', icon: '🛏️', desc: 'Refonte chambre' },
        { value: 'livingroom', label: 'Salon', icon: '🛋️', desc: 'Espace de vie' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Quels travaux extérieurs souhaitez-vous ?',
      subtitle: 'Sélectionnez votre projet extérieur',
      condition: (data) => data.projectCategory === 'exterior',
      options: [
        { value: 'facade', label: 'Rénovation de Façade', icon: '🏛️', desc: 'Murs extérieurs' },
        { value: 'roofing', label: 'Travaux de Toiture', icon: '🏠', desc: 'Réparation/remplacement' }
      ]
    },
    {
      id: 'renovationType',
      title: 'Quel type d\'extension ?',
      subtitle: 'Décrivez votre projet d\'extension',
      condition: (data) => data.projectCategory === 'extension',
      options: [
        { value: 'extension', label: 'Extension de Maison', icon: '📐', desc: 'Ajouter espace habitable' }
      ]
    },
    {
      id: 'area',
      title: "Quelle est la superficie totale concernée ?",
      subtitle: 'Cela nous aide à estimer les matériaux et la main-d\'œuvre',
      type: 'input',
      inputType: 'number',
      placeholder: 'Entrez la superficie en mètres carrés',
      suffix: 'm²'
    },
    {
      id: 'currentCondition',
      title: 'Quel est l\'état actuel ?',
      subtitle: 'Une évaluation honnête aide à un prix précis',
      options: [
        { value: 'excellent', label: 'Excellent', icon: '⭐', desc: 'Récemment rénové' },
        { value: 'good', label: 'Bon', icon: '😊', desc: 'Bien entretenu' },
        { value: 'average', label: 'Moyen', icon: '😐', desc: 'Montre de l\'usure' },
        { value: 'poor', label: 'Mauvais', icon: '😟', desc: 'Nécessite attention' },
        { value: 'very-poor', label: 'Très Mauvais', icon: '🆘', desc: 'Problèmes majeurs' }
      ]
    },
    {
      id: 'desiredFinish',
      title: 'Quel niveau de qualité souhaitez-vous ?',
      subtitle: 'Choisissez votre standard de finition',
      options: [
        { value: 'basic', label: 'Basique', icon: '🔨', desc: 'Fonctionnel & abordable' },
        { value: 'standard', label: 'Standard', icon: '✅', desc: 'Bonne qualité' },
        { value: 'premium', label: 'Premium', icon: '⭐', desc: 'Finitions haut de gamme' },
        { value: 'luxury', label: 'Luxe', icon: '💎', desc: 'Top du marché' }
      ]
    },
    {
      id: 'timeline',
      title: 'Quand souhaitez-vous commencer ?',
      subtitle: 'Aidez-nous à planifier votre projet',
      options: [
        { value: 'urgent', label: 'Urgent (Dès que possible)', icon: '⚡', desc: 'Démarrer immédiatement' },
        { value: '1-3months', label: '1-3 mois', icon: '📅', desc: 'Bientôt' },
        { value: '3-6months', label: '3-6 mois', icon: '📆', desc: 'Planification anticipée' },
        { value: 'flexible', label: 'Flexible', icon: '🤷', desc: 'Pas pressé' }
      ]
    },
    {
      id: 'zipCode',
      title: 'Où se situe la propriété ?',
      subtitle: "Nous vous mettrons en contact avec des professionnels locaux",
      type: 'input',
      inputType: 'text',
      placeholder: 'Entrez le code postal',
      maxLength: 10
    }
  ];

  const filteredQuestions = questions.filter(q => !q.condition || q.condition(formData));
  const currentQuestion = filteredQuestions[step] || questions[step];
  const estimate = step >= filteredQuestions.length ? calculateEstimate() : null;
  const totalQuestions = filteredQuestions.length;

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
    }, 300);
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setStep(filteredQuestions.length + 1);
  };

  if (step === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <nav className="relative z-10 container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                <HomeIcon />
              </div>
              <span className="text-2xl font-bold text-white">RenovatePro</span>
            </div>
          </nav>

          <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-400/30">
                  ⚡ Obtenez Votre Devis Instantané
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Transformez Votre Espace
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  En Maison de Rêve
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
                Obtenez une estimation détaillée de rénovation en seulement 2 minutes. Qualité professionnelle, tarifs transparents, experts locaux.
              </p>
              
              <button
                onClick={() => { setStep(0); setProgress(10); }}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
              >
                Commencer Votre Devis Gratuit
                <ArrowRight />
              </button>
              
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle />
                  <span>Estimation Gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle />
                  <span>Sans Engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle />
                  <span>2 Min Seulement</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                <HomeIcon />
              </div>
              <span className="text-xl font-bold text-gray-800">RenovatePro</span>
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">
              {step >= 0 && step < totalQuestions ? `Question ${step + 1} sur ${totalQuestions}` : 'Presque terminé !'}
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {step >= 0 && step < totalQuestions && currentQuestion && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-6 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-gray-600 text-lg">{currentQuestion.subtitle}</p>
                )}
              </div>

              {currentQuestion.type === 'input' ? (
                <form onSubmit={handleInputSubmit} className="max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type={currentQuestion.inputType}
                      placeholder={currentQuestion.placeholder}
                      maxLength={currentQuestion.maxLength}
                      className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors"
                      required
                      autoFocus
                    />
                    {currentQuestion.suffix && (
                      <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        {currentQuestion.suffix}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Continuer <ArrowRight />
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option.value)}
                      className={`group relative p-6 rounded-2xl border-2 transition-all ${
                        formData[currentQuestion.id] === option.value
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-4xl mb-3">{option.icon}</div>
                        <div className="text-lg font-bold text-gray-800 mb-1">
                          {option.label}
                        </div>
                        {option.desc && (
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        )}
                      </div>
                      {formData[currentQuestion.id] === option.value && (
                        <div className="absolute top-4 right-4 text-blue-600">
                          <CheckCircle />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {step > 0 && (
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2 font-semibold"
              >
                <ArrowLeft />
                Question Précédente
              </button>
            )}
          </div>
        )}

        {step === totalQuestions && estimate && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
                  <DollarSign />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  Votre Estimation Personnalisée
                </h2>
                <p className="text-gray-600 text-lg">Basée sur vos besoins spécifiques</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
                <div className="text-center">
                  <div className="text-sm text-blue-200 mb-2">Coût Estimé du Projet</div>
                  <div className="text-4xl md:text-6xl font-bold mb-4">
                    €{estimate.low.toLocaleString()} - €{estimate.high.toLocaleString()}
                  </div>
                  <div className="text-blue-200">Moyenne : €{estimate.average.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-bold text-gray-800 mb-4 text-xl">Résumé de Votre Projet</h3>
                {[
                  { label: 'Type de Projet', value: formData.projectCategory?.replace('-', ' ') },
                  { label: 'Propriété', value: formData.propertyType },
                  { label: 'Travaux Nécessaires', value: formData.renovationType?.replace('-', ' ') },
                  { label: 'Superficie', value: formData.area ? `${formData.area}m²` : 'Non spécifié' },
                  { label: 'État', value: formData.currentCondition },
                  { label: 'Niveau de Finition', value: formData.desiredFinish },
                  { label: 'Calendrier', value: formData.timeline?.replace('-', ' ') },
                  { label: 'Localisation', value: formData.zipCode || 'Non spécifié' }
                ].filter(item => item.value).map((item, i) => (
                  <div key={i} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">{item.label} :</span>
                    <span className="font-bold capitalize">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Obtenez Votre Devis Détaillé</h3>
                <p className="text-gray-600">Contactez notre équipe pour un devis précis et une consultation gratuite</p>
              </div>
              
              <form 
                name="renovation-quote" 
                method="POST" 
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleContactSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="renovation-quote" />
                
                {/* All questionnaire data */}
                <input type="hidden" name="projectCategory" value={formData.projectCategory} />
                <input type="hidden" name="propertyType" value={formData.propertyType} />
                <input type="hidden" name="propertyAge" value={formData.propertyAge} />
                <input type="hidden" name="renovationType" value={formData.renovationType} />
                <input type="hidden" name="area" value={formData.area} />
                <input type="hidden" name="currentCondition" value={formData.currentCondition} />
                <input type="hidden" name="desiredFinish" value={formData.desiredFinish} />
                <input type="hidden" name="timeline" value={formData.timeline} />
                <input type="hidden" name="zipCode" value={formData.zipCode} />
                <input type="hidden" name="estimate" value={`€${estimate.low.toLocaleString()} - €${estimate.high.toLocaleString()}`} />
                
                {/* Honeypot field for spam protection - hidden from users */}
                <p style={{display: 'none'}}>
                  <label>
                    Ne pas remplir si vous êtes humain : <input name="bot-field" />
                  </label>
                </p>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nom Complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Détails Supplémentaires (Optionnel)</label>
                  <textarea
                    name="projectDescription"
                    rows="4"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none resize-none"
                    placeholder="Des exigences spécifiques ?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all text-lg shadow-xl"
                >
                  Obtenir Mon Devis Détaillé →
                </button>
              </form>
            </div>
          </div>
        )}

        {step === totalQuestions + 1 && (
          <div className="text-center animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
                <CheckCircle />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Demande Reçue !</h2>
              <p className="text-xl text-gray-600 mb-8">
                Merci ! Notre équipe vous contactera dans les 24 heures avec un devis détaillé.
              </p>
              <button
                onClick={() => {
                  setStep(-1);
                  setProgress(0);
                  setFormData({
                    projectCategory: '', propertyType: '', propertyAge: '', renovationType: '',
                    area: '', currentCondition: '', desiredFinish: '', timeline: '', zipCode: '',
                    name: '', email: '', phone: '', projectDescription: ''
                  });
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                Commencer Un Autre Devis
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
}