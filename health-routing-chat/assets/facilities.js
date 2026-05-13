// Public health facilities in Barbados.
// Coordinates are approximate (public locations, not citizen data).
// Hours and phone numbers are placeholders for prototype use only — to be
// confirmed by the Ministry of Health before any real release.

const FACILITIES = {
  qeh: {
    key: 'qeh',
    name: 'Queen Elizabeth Hospital — Accident and Emergency',
    short: 'QEH A&E',
    area: 'Martindales Road, Bridgetown, St. Michael',
    parish: 'St. Michael',
    phone: '511',
    phoneLabel: 'Call 511 for an ambulance',
    hours: 'Open 24 hours, 7 days a week.',
    open: 0, close: 24, alwaysOpen: true,
    lat: 13.0961, lng: -59.6029,
    type: 'emergency',
  },
  psychiatric: {
    key: 'psychiatric',
    name: 'Psychiatric Hospital',
    short: 'Psychiatric Hospital',
    area: 'Black Rock, St. Michael',
    parish: 'St. Michael',
    phone: '(246) 536-4500',
    hours: 'Outpatient clinics: Monday to Friday, 8:30am to 4:30pm. 24-hour care available for emergencies.',
    open: 8.5, close: 16.5, alwaysOpen: true,
    lat: 13.1078, lng: -59.6334,
    type: 'psychiatric',
  },
  'sir-winston': {
    key: 'sir-winston',
    name: 'Sir Winston Scott Polyclinic — Fast Track',
    short: 'Sir Winston Scott Fast Track',
    area: 'Ladymeade Gardens, Bridgetown, St. Michael',
    parish: 'St. Michael',
    phone: '(246) 536-3400',
    hours: 'Fast Track: open 24 hours, 7 days a week. Polyclinic clinics: Monday to Friday, 8:30am to 4:30pm.',
    open: 0, close: 24, alwaysOpen: true,
    lat: 13.0975, lng: -59.6135,
    type: 'fasttrack',
  },
  'maurice-byer': {
    key: 'maurice-byer', name: 'Maurice Byer Polyclinic', short: 'Maurice Byer Polyclinic',
    area: 'Ashton Hall, St. Peter', parish: 'St. Peter',
    phone: '(246) 422-6000',
    hours: 'Monday to Friday, 8:30am to 4:30pm. Some extended hours.',
    open: 8.5, close: 16.5, lat: 13.2425, lng: -59.6425, type: 'polyclinic',
  },
  'branford-taitt': {
    key: 'branford-taitt', name: 'Branford Taitt Polyclinic', short: 'Branford Taitt Polyclinic',
    area: 'Black Rock, St. Michael', parish: 'St. Michael',
    phone: '(246) 426-5570',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, lat: 13.1027, lng: -59.6307, type: 'polyclinic',
  },
  'edgar-cochrane': {
    key: 'edgar-cochrane', name: 'Edgar Cochrane Polyclinic', short: 'Edgar Cochrane Polyclinic',
    area: 'Wildey, St. Michael', parish: 'St. Michael',
    phone: '(246) 429-5090',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, lat: 13.0903, lng: -59.5750, type: 'polyclinic',
  },
  'eunice-gibson': {
    key: 'eunice-gibson', name: 'Eunice Gibson Polyclinic', short: 'Eunice Gibson Polyclinic',
    area: 'Warrens, St. Michael', parish: 'St. Michael',
    phone: '(246) 424-7572',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, lat: 13.1135, lng: -59.6057, type: 'polyclinic',
  },
  glebe: {
    key: 'glebe', name: 'Glebe Polyclinic', short: 'Glebe Polyclinic',
    area: 'The Glebe, St. George', parish: 'St. George',
    phone: '(246) 423-5060',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, lat: 13.1392, lng: -59.5412, type: 'polyclinic',
  },
  'randal-phillips': {
    key: 'randal-phillips', name: 'Randal Phillips Polyclinic', short: 'Randal Phillips Polyclinic',
    area: 'Oistins, Christ Church', parish: 'Christ Church',
    phone: '(246) 428-7350',
    hours: 'Monday to Friday, 8:30am to 4:30pm. Some extended hours.',
    open: 8.5, close: 16.5, lat: 13.0686, lng: -59.5447, type: 'polyclinic',
  },
  'st-philip': {
    key: 'st-philip', name: 'St. Philip Polyclinic', short: 'St. Philip Polyclinic',
    area: 'Six Roads, St. Philip', parish: 'St. Philip',
    phone: '(246) 423-4500',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, lat: 13.1133, lng: -59.4683, type: 'polyclinic',
  },
  'david-thompson': {
    key: 'david-thompson',
    name: 'David Thompson Health and Social Services Complex',
    short: 'David Thompson Complex',
    area: 'Gall Hill, St. John', parish: 'St. John',
    phone: '(246) 423-6060',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, lat: 13.1817, lng: -59.4892, type: 'polyclinic',
  },
  'call-centre': {
    key: 'call-centre',
    name: 'QEH medical advice call centre',
    short: 'QEH advice line',
    area: 'Phone-only service',
    parish: '',
    phone: '(246) 536-5555',
    hours: 'Monday to Friday, 8:30am to 4:30pm.',
    open: 8.5, close: 16.5, alwaysOpen: false,
    lat: 13.0961, lng: -59.6029,
    type: 'advice',
  },
};

const PARISH_TO_POLYCLINIC = {
  'Christ Church': 'randal-phillips',
  'St. Andrew':    'maurice-byer',
  'St. George':    'glebe',
  'St. James':     'branford-taitt',
  'St. John':      'david-thompson',
  'St. Joseph':    'david-thompson',
  'St. Lucy':      'maurice-byer',
  'St. Michael':   'sir-winston',
  'St. Peter':     'maurice-byer',
  'St. Philip':    'st-philip',
  'St. Thomas':    'sir-winston',
};

const PARISHES = [
  'Christ Church', 'St. Andrew', 'St. George', 'St. James', 'St. John',
  'St. Joseph', 'St. Lucy', 'St. Michael', 'St. Peter', 'St. Philip', 'St. Thomas'
];

const CATEGORIES = [
  { key: 'symptoms',  label: 'Symptoms or feeling unwell',
    hint: 'Fever, pain, vomiting, diarrhoea, dizziness, weakness or fainting' },
  { key: 'breathing', label: 'A breathing problem',
    hint: 'Asthma, wheezing, shortness of breath, or breathing that worries you' },
  { key: 'injury',    label: 'An injury, wound or burn',
    hint: 'Cuts, bleeding, sprains, burns, head injury or possible broken bone' },
  { key: 'chest',     label: 'Chest pain, fainting or stroke signs',
    hint: 'Chest pain, palpitations, fainting, face drooping, arm weakness or trouble speaking' },
  { key: 'allergic',  label: 'An allergic reaction or swelling',
    hint: 'Rash, itching, swelling or a reaction after food, medicine or a sting' },
  { key: 'mental',    label: 'Mental health or how you are feeling',
    hint: 'Anxiety, low mood, panic, severe distress, or a sudden change in how you are coping' },
  { key: 'pregnancy', label: 'A pregnancy concern',
    hint: 'Pain, bleeding, reduced movement, or anything that worries you about the pregnancy' },
  { key: 'child',     label: 'A baby or child',
    hint: 'Fever, injury, illness, or a baby that is not feeding or seems unwell' },
  { key: 'routine',   label: 'Repeat medicine, test results or follow-up',
    hint: 'Getting repeat medicine, checking test results, or following up on a previous visit' },
  { key: 'unsure',    label: 'I am not sure',
    hint: 'Not sure what is wrong or where to go? We can help you decide' },
];

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));

const WARNING_SIGNS = {
  symptoms: [
    'Very drowsy or hard to wake.',
    'Confused or acting very differently.',
    'The pain is very bad or getting worse quickly.',
    'Too weak to stand.',
    'Has not passed urine in a long time, dry mouth, or too weak to drink.',
    'Getting worse quickly — very weak, confused, or short of breath.',
  ],
  breathing: [
    'Struggling to breathe, gasping or choking.',
    'Lips, tongue or face look blue or grey.',
    'Cannot speak full sentences.',
    'Breathing is getting worse quickly.',
    'Very drowsy, confused or hard to wake.',
  ],
  injury: [
    'Bleeding will not slow or stop.',
    'The wound is deep or large.',
    'The burn is serious or covers a large area.',
    'A head injury — confused, headache getting worse, or blacked out.',
    'Confused, drowsy or behaving differently after the injury.',
    'The injury happened in a serious fall, crash or fight.',
  ],
  chest: [
    'Chest pain, tightness or pressure that will not go away.',
    'Has fainted or is hard to wake.',
    'One side of the face is drooping.',
    'One arm is weak or numb.',
    'Speech is slurred, confused or hard to understand.',
    'Suddenly confused or acting very differently.',
  ],
  allergic: [
    'Face, lips, tongue or throat are swelling.',
    'Trouble breathing.',
    'Has collapsed or feels faint.',
    'The reaction is getting worse quickly.',
    'Confused, very weak or hard to wake.',
  ],
  mental: [
    'Has threatened to harm themselves or someone else.',
    'Has already harmed themselves.',
    'Very confused, aggressive, or behaving in a way that worries you.',
  ],
  pregnancy: [
    'Heavy bleeding.',
    'Very bad pain in the stomach or lower abdomen.',
    'The baby has stopped moving or is moving much less than usual.',
    'Stroke signs — face drooping, arm weakness or trouble speaking.',
    'Has collapsed or fainted.',
    'Trouble breathing.',
  ],
  child: [
    'Struggling to breathe.',
    'Lips, tongue or face look blue or grey.',
    'A seizure or fit — body shakes uncontrollably.',
    'Very drowsy or hard to wake.',
    'An injury or bleeding that will not stop.',
    'A baby under 3 months with a fever.',
    'Getting much worse quickly.',
  ],
  routine: [
    'You think the medicine is causing a bad reaction (rash, swelling, very unwell).',
    'Test results suggest something urgent.',
    'The condition has got much worse since the last visit.',
  ],
  unsure: [
    'Struggling to breathe, gasping or choking.',
    'Chest pain, tightness or pressure that will not go away.',
    'Stroke signs — face drooping, arm weakness or trouble speaking.',
    'Bleeding will not slow or stop.',
    'Blacked out, very drowsy, confused or hard to wake.',
    'Has threatened to harm themselves or someone else.',
    'Getting worse quickly.',
  ],
};

// Open/closed check for Barbados time (UTC-4)
function isFacilityOpen(key) {
  const f = FACILITIES[key];
  if (!f) return false;
  if (f.alwaysOpen) return true;
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Barbados' }));
  const day = now.getDay();
  const t = now.getHours() + now.getMinutes() / 60;
  const weekday = day >= 1 && day <= 5;
  return weekday && t >= f.open && t < f.close;
}

// ── Free-text warning-sign extraction ─────────────────
// Each entry: keyword phrases → category + canonical sign text.
// If ANY of these match the user's free text, we treat it as a warning sign
// and route straight to emergency without further questions.
const WARNING_KEYWORDS = [
  // Breathing emergencies
  { cat: 'breathing', sign: 'Gasping, choking or cannot breathe normally', words: ['gasping', 'choking', 'cant breathe', "can't breathe", 'cannot breathe', 'struggling to breathe', 'fighting for breath'] },
  { cat: 'breathing', sign: 'Lips, tongue or face are blue or grey',     words: ['lips blue', 'face blue', 'turning blue', 'blue lips', 'grey lips', 'tongue blue'] },
  { cat: 'breathing', sign: 'Cannot speak full sentences',                 words: ['cant speak', "can't speak", 'cannot speak in sentences', 'cant get words out', 'short of breath at rest'] },

  // Chest / stroke
  { cat: 'chest',     sign: 'Chest pain, tightness or pressure that will not go away', words: ['chest pain', 'chest tight', 'chest pressure', 'crushing chest', 'heart attack'] },
  { cat: 'chest',     sign: 'Has fainted or is hard to wake',              words: ['fainted', 'passed out', 'blacked out', 'wont wake up', "won't wake up", 'unconscious', 'collapsed'] },
  { cat: 'chest',     sign: 'Stroke signs — face drooping or arm weakness', words: ['face drooping', 'face droops', 'arm weak', 'arm numb', 'one side weak', 'speech slurred', 'slurring', 'cant talk properly'] },

  // General severity
  { cat: 'symptoms',  sign: 'Too weak to stand',                           words: ['too weak to stand', 'cant stand', "can't stand", 'cant get up', "can't get up", 'falling down', 'cant walk', "can't walk"] },
  { cat: 'symptoms',  sign: 'Confused or acting very differently',         words: ['very confused', 'not making sense', 'acting strange', 'doesnt know who', "doesn't know"] },
  { cat: 'symptoms',  sign: 'Very drowsy or hard to wake',                 words: ['hard to wake', 'cant wake', "can't wake", 'very drowsy', 'sleeping a lot'] },
  { cat: 'symptoms',  sign: 'The pain is very bad or getting worse quickly', words: ['unbearable pain', 'worst pain', 'pain getting worse', 'severe pain'] },

  // Bleeding
  { cat: 'injury',    sign: 'Bleeding will not slow or stop',              words: ['bleeding heavy', 'wont stop bleeding', "won't stop bleeding", 'lots of blood', 'bleeding badly'] },
  { cat: 'injury',    sign: 'A serious head injury',                       words: ['head injury', 'hit my head', 'banged my head', 'head hurts after fall'] },

  // Allergic
  { cat: 'allergic',  sign: 'Face, lips, tongue or throat are swelling',   words: ['throat swelling', 'tongue swelling', 'face swelling', 'lips swelling', 'cant swallow', "can't swallow"] },

  // Mental health
  { cat: 'mental',    sign: 'Has threatened to harm themselves or someone else', words: ['want to die', 'kill myself', 'end it all', 'hurt myself', 'harm myself', 'suicid'] },

  // Pregnancy
  { cat: 'pregnancy', sign: 'Heavy bleeding',                              words: ['pregnant and bleeding', 'bleeding while pregnant', 'losing blood pregnant'] },
  { cat: 'pregnancy', sign: 'The baby has stopped moving',                 words: ['baby stopped moving', 'baby not moving', 'no movement'] },

  // Child
  { cat: 'child',     sign: 'A seizure or fit',                            words: ['seizure', 'fit', 'convulsion', 'shaking uncontrollably'] },
  { cat: 'child',     sign: 'A baby under 3 months with a fever',          words: ['newborn fever', 'baby has fever', 'baby fever'] },
];

// Find any matching warning signs in free text. Returns array of matches.
function extractWarningSigns(text) {
  const t = (text || '').toLowerCase();
  const found = [];
  for (const w of WARNING_KEYWORDS) {
    for (const phrase of w.words) {
      if (t.indexOf(phrase) !== -1) {
        found.push({ cat: w.cat, sign: w.sign, matched: phrase });
        break;
      }
    }
  }
  return found;
}

// ── Body parts and pain detection ────────────────────
const PAIN_WORDS = ['pain', 'painful', 'hurt', 'hurts', 'hurting', 'ache', 'aches', 'aching', 'sore', 'soreness'];

const BODY_PARTS = {
  chest:    { keys: ['chest', 'heart area', 'breast'],                 category: 'chest',    region: 'chest' },
  head:     { keys: ['head', 'headache', 'skull'],                     category: 'symptoms', region: 'head' },
  throat:   { keys: ['throat', 'neck'],                                category: 'symptoms', region: 'head' },
  stomach:  { keys: ['stomach', 'belly', 'tummy', 'abdomen', 'gut'],   category: 'symptoms', region: 'stomach' },
  back:     { keys: ['back'],                                          category: 'symptoms', region: 'back' },
  arm:      { keys: ['arm', 'shoulder', 'elbow', 'hand', 'wrist'],     category: 'injury',   region: 'arm-left' },
  leg:      { keys: ['leg', 'knee', 'foot', 'ankle', 'thigh', 'calf'], category: 'injury',   region: 'leg-left' },
  pelvis:   { keys: ['hip', 'pelvis', 'groin'],                        category: 'symptoms', region: 'pelvis' },
};

// Returns {bodyKey, category, region} or null
function detectBodyPart(text) {
  const t = (text || '').toLowerCase();
  for (const [k, v] of Object.entries(BODY_PARTS)) {
    for (const key of v.keys) {
      // Match whole word boundaries to avoid 'hand' matching 'hands' (still ok) or 'hip' matching 'hippo'
      const re = new RegExp('\\b' + key + '\\b', 'i');
      if (re.test(t)) return { bodyKey: k, category: v.category, region: v.region };
    }
  }
  return null;
}

function mentionsPain(text) {
  const t = (text || '').toLowerCase();
  return PAIN_WORDS.some(w => new RegExp('\\b' + w + '\\b', 'i').test(t));
}

// ── Three-tier triage for breathing/asthma ──────────
// Mirrors the screenshot: green (home), amber (today), red (serious now).
const TIERED_BREATHING = {
  category: 'breathing',
  title: 'For breathing difficulty',
  subtitle: 'Tick anything that applies right now — then choose an option below.',
  tiers: [
    {
      key: 'home', tone: 'green', heading: 'Can this be managed at home?',
      items: [
        'Mild wheeze that eases quickly after using a reliever inhaler (2–4 puffs)',
        'Mild breathlessness after exercise that settles fully at rest',
        'Slight nasal congestion or blocked nose causing mild breathing discomfort',
      ],
    },
    {
      key: 'today', tone: 'amber', heading: 'Needs medical attention today?',
      items: [
        'Known asthma — inhaler only partially helped after 2–3 puffs',
        'Persistent wheeze or chest tightness not resolving with rest',
        'Shortness of breath at rest that started in the last few hours',
      ],
    },
    {
      key: 'serious', tone: 'red', heading: 'Could this be serious right now?',
      items: [
        'Gasping, choking or cannot breathe normally at all',
        'Lips, tongue or face are blue or grey',
        'Cannot speak in full sentences because of breathlessness',
        'Breathing getting rapidly worse despite using the inhaler',
      ],
    },
  ],
};
