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
  { key: 'symptoms',  label: 'Feeling sick or unwell',
    hint: 'Fever, pain, vomiting, diarrhoea, dizziness, weakness or fainting' },
  { key: 'breathing', label: 'Trouble breathing',
    hint: 'Asthma, wheezing, shortness of breath, or breathing that worries you' },
  { key: 'injury',    label: 'An injury, wound or burn',
    hint: 'Cuts, bleeding, sprains, burns, head injury or possible broken bone' },
  { key: 'chest',     label: 'Chest pain or fainting',
    hint: 'Chest pain, palpitations, fainting, face drooping, arm weakness or trouble speaking' },
  { key: 'allergic',  label: 'Allergic reaction or swelling',
    hint: 'Rash, itching, swelling or a reaction after food, medicine or a sting' },
  { key: 'mental',    label: 'Mental health or mood',
    hint: 'Anxiety, low mood, panic, severe distress, or a sudden change in how you are coping' },
  { key: 'pregnancy', label: 'A pregnancy concern',
    hint: 'Pain, bleeding, reduced movement, or anything that worries you about the pregnancy' },
  { key: 'child',     label: 'My baby or child is unwell',
    hint: 'Fever, injury, illness, or a baby that is not feeding or seems unwell' },
  { key: 'routine',   label: 'Repeat medicine or test results',
    hint: 'Getting repeat medicine, checking test results, or following up on a previous visit' },
  { key: 'unsure',    label: 'I am not sure',
    hint: 'Not sure what is wrong or where to go? We can help you decide' },
];

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));

const BODY_PARTS_LIST = [
  { key: 'head',    label: 'Head or face' },
  { key: 'eyes',   label: 'Eyes' },
  { key: 'ears',   label: 'Ears' },
  { key: 'throat', label: 'Neck or throat' },
  { key: 'chest',  label: 'Chest' },
  { key: 'abdomen', label: 'Belly or stomach' },
  { key: 'back',   label: 'Back' },
  { key: 'limbs',  label: 'Arms, hands, legs or feet' },
  { key: 'skin',   label: 'Skin' },
  { key: 'urinary', label: 'Bladder, groin or pelvic area' },
];

const BODY_PART_SYMPTOMS = {
  head: {
    label: 'Head or face',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Sudden very bad headache — the worst of your life',
        'Head injury with confusion, vomiting or passing out',
        'Seizure or fit (body shaking)',
        'Stroke signs — face drooping, arm weakness or slurred speech',
        'Stiff neck with high fever and pain in bright light',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Headache getting worse with fever',
        'Severe migraine not getting better with medicine',
        'Head injury — no blackout but headache keeps going',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Headache lasting more than a day',
        'Facial pain or swelling',
        'Jaw pain or toothache spreading to face',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Headaches that keep coming back',
        'Minor skin or face concern',
      ]},
    ],
  },
  eyes: {
    label: 'Eyes',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Sudden loss of sight — all or part of vision gone',
        'Something stuck in the eye',
        'Chemical splash in the eye',
        'Severe eye pain after injury',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Sudden blurred or double vision',
        'Eye pain with redness and hurts in bright light',
        'Flashes of light or new spots in vision',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Red or irritated eye — no pain or sight change',
        'Sticky or watery fluid from the eye',
        'Feels like something is in the eye',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Dry or itchy eyes that keep coming back',
        'Mild eye irritation that keeps coming back',
      ]},
    ],
  },
  ears: {
    label: 'Ears',
    tiers: [
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Sudden hearing loss for no clear reason',
        'Severe ear pain with high fever',
        'Ear hurt by a knock — bleeding or fluid coming out',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Ear pain or ache',
        'Fluid or discharge from the ear',
        'Ringing in the ears',
        'Ear feels blocked or full',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Hearing loss getting slowly worse',
        'Mild earache that comes and goes',
      ]},
    ],
  },
  throat: {
    label: 'Neck or throat',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Throat swelling making it hard to breathe or swallow',
        'Stiff neck with high fever',
        'Choking or something blocking the airway',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Very sore throat — hard to swallow even saliva',
        'Neck pain or stiffness after an injury',
        'Swollen glands in neck with high fever',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Sore throat with mild trouble swallowing',
        'Hoarse or croaky voice for over a week',
        'Swollen glands — no high fever',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Mild sore throat or tickle',
        'Voice that is always hoarse or croaky',
      ]},
    ],
  },
  chest: {
    label: 'Chest',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Chest pain or pressure that will not go away',
        'Hard to breathe even while sitting still',
        'Heart racing or fluttering with fainting or near-fainting',
        'Coughing up or vomiting blood',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Chest pain that changes with breathing or position',
        'Shortness of breath that started in the last day or two',
        'Heart beating too fast for no clear reason',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Mild chest tightness when active or exercising',
        'Ongoing cough with mild shortness of breath',
        'Chest wall pain after minor injury',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Cough that keeps coming back',
        'Chest tightness only during exercise',
      ]},
    ],
  },
  abdomen: {
    label: 'Belly or stomach',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Sudden very bad stomach pain',
        'Throwing up blood or dark material',
        'Stomach is very hard and painful to touch',
        'Very bad pain on the lower right side with fever',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Stomach pain that is not getting better',
        'Blood in poo — bright red or dark and sticky',
        'Kept vomiting — cannot keep fluids down',
        'Very dry mouth and no urine for many hours',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Mild to moderate stomach pain',
        'Diarrhoea with mild pain',
        'Ongoing nausea or not feeling hungry',
        'Constipation lasting several days',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Bloating or mild indigestion',
        'Mild recurring stomach cramps',
      ]},
    ],
  },
  back: {
    label: 'Back',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Back injury with leg weakness, numbness or loss of bladder control',
        'Very bad back pain after a fall, crash or impact',
        'Cannot stand or walk after a back injury',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Back pain that spreads down the leg — with numbness or tingling',
        'Back pain with fever',
        'Moderate back pain after injury — no weakness',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Moderate back pain with no injury',
        'Back pain that stops you doing normal things',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Mild recurring back ache',
        'Minor muscle stiffness',
      ]},
    ],
  },
  limbs: {
    label: 'Arms, hands, legs or feet',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Bleeding that will not stop',
        'Possible broken bone — bone visible or limb looks bent',
        'Crush injury or damage to a blood vessel',
        'Sudden very bad leg pain with coldness or colour change',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Possible broken bone — swollen, bent or cannot put weight on it',
        'A joint that is out of place (dislocated)',
        'A deep cut that may need stitches',
        'Sudden swollen, red, warm leg',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Sprain or strain — can still put weight on it',
        'A small cut or wound',
        'Joint pain or swelling — no injury',
        'Numbness or tingling in hands or feet',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Minor bruising',
        'Mild recurring joint or muscle pain',
        'Ingrown toenail or minor foot issue',
      ]},
    ],
  },
  skin: {
    label: 'Skin',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Severe burn — large area or on face, hands or near the airway',
        'Wide rash with trouble breathing or throat swelling',
        'Redness and swelling that is spreading fast',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Wound that looks infected — more red, hot and with pus',
        'Red, swollen skin spreading over hours',
        'Moderate burn — blistering on a small area',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Rash with no breathing problem',
        'Wound with mild redness — possible infection',
        'Minor burn with blistering',
        'Hives or allergic skin reaction — no breathing problem',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Ongoing skin condition or rash',
        'Mild skin irritation or itch',
        'Acne or minor skin concern',
      ]},
    ],
  },
  urinary: {
    label: 'Bladder, groin or pelvic area',
    tiers: [
      { level: 2, tone: 'red', heading: 'Emergency — seek help now', symptoms: [
        'Sudden very bad pain in the groin or testicle',
        'Cannot pass urine and in bad pain',
        'Heavy bleeding from the groin or genitals',
      ]},
      { level: 3, tone: 'amber', heading: 'Urgent — should be seen today', symptoms: [
        'Burning when urinating with fever, back pain or shaking',
        'Blood in urine',
        'Very bad pelvic pain',
      ]},
      { level: 4, tone: 'teal', heading: 'Polyclinic visit recommended', symptoms: [
        'Burning or pain when passing urine',
        'Needing to urinate much more than usual',
        'Unusual discharge',
        'Mild pelvic pain or pressure',
      ]},
      { level: 5, tone: 'green', heading: 'Routine visit', symptoms: [
        'Mild urinary infection that keeps coming back',
        'Minor urinary or genital concern',
      ]},
    ],
  },
};

// Each entry: { label, ctas } where ctas 1-2 = emergency (A&E/511), ctas 3 = urgent today (Fast Track), ctas 4+ = polyclinic
const WARNING_SIGNS = {
  symptoms: [
    { label: 'Very drowsy or hard to wake', ctas: 2 },
    { label: 'Confused or acting very differently', ctas: 2 },
    { label: 'Too weak to stand or move', ctas: 2 },
    { label: 'Getting worse very fast — very weak, confused or short of breath', ctas: 2 },
    { label: 'The pain is severe and getting worse quickly', ctas: 3 },
    { label: 'Not passed urine for many hours — very dry mouth or too weak to drink', ctas: 3 },
  ],
  breathing: [
    { label: 'Struggling to breathe, gasping or choking', ctas: 2 },
    { label: 'Lips, tongue or face look blue or grey', ctas: 2 },
    { label: 'Cannot speak in full sentences', ctas: 2 },
    { label: 'Breathing is getting worse quickly', ctas: 2 },
    { label: 'Very drowsy, confused or hard to wake', ctas: 2 },
  ],
  injury: [
    { label: 'Bleeding will not slow or stop', ctas: 2 },
    { label: 'The burn is serious or covers a large area of the body', ctas: 2 },
    { label: 'Head injury — confused, headache getting worse or blacked out', ctas: 2 },
    { label: 'Confused or drowsy after the injury', ctas: 2 },
    { label: 'The wound is deep or may need stitches', ctas: 3 },
    { label: 'The injury was from a serious fall, crash or fight', ctas: 3 },
  ],
  chest: [
    { label: 'Chest pain, tightness or pressure that will not go away', ctas: 2 },
    { label: 'Has fainted or is hard to wake', ctas: 2 },
    { label: 'One side of the face is drooping', ctas: 2 },
    { label: 'One arm is weak or numb', ctas: 2 },
    { label: 'Speech is slurred or hard to understand', ctas: 2 },
    { label: 'Suddenly confused or acting very differently', ctas: 2 },
  ],
  allergic: [
    { label: 'Face, lips, tongue or throat are swelling', ctas: 2 },
    { label: 'Trouble breathing', ctas: 2 },
    { label: 'Has collapsed or feels faint', ctas: 2 },
    { label: 'The reaction is spreading or getting worse quickly', ctas: 2 },
    { label: 'Confused, very weak or hard to wake', ctas: 2 },
  ],
  mental: [
    { label: 'Has threatened to harm themselves or someone else', ctas: 2 },
    { label: 'Has already harmed themselves', ctas: 2 },
    { label: 'Very confused or aggressive in a way that worries you', ctas: 3 },
  ],
  pregnancy: [
    { label: 'Heavy bleeding', ctas: 2 },
    { label: 'Very bad stomach pain or low belly pain', ctas: 2 },
    { label: 'Has collapsed or fainted', ctas: 2 },
    { label: 'Trouble breathing', ctas: 2 },
    { label: 'Stroke signs — face drooping, arm weakness or trouble speaking', ctas: 2 },
    { label: 'The baby has stopped moving or is moving much less than usual', ctas: 3 },
  ],
  child: [
    { label: 'Struggling to breathe', ctas: 2 },
    { label: 'Lips, tongue or face look blue or grey', ctas: 2 },
    { label: 'A seizure or fit — body shaking uncontrollably', ctas: 2 },
    { label: 'Very drowsy or hard to wake', ctas: 2 },
    { label: 'An injury or bleeding that will not stop', ctas: 2 },
    { label: 'Getting much worse quickly', ctas: 2 },
    { label: 'A baby under 3 months with a fever', ctas: 3 },
  ],
  routine: [
    { label: 'Medicine may be causing a bad reaction — rash, swelling or very unwell', ctas: 3 },
    { label: 'Test results suggest something urgent', ctas: 3 },
    { label: 'The condition has got much worse since the last visit', ctas: 3 },
  ],
  unsure: [
    { label: 'Struggling to breathe, gasping or choking', ctas: 2 },
    { label: 'Chest pain, tightness or pressure that will not go away', ctas: 2 },
    { label: 'Stroke signs — face drooping, arm weakness or trouble speaking', ctas: 2 },
    { label: 'Bleeding that will not slow or stop', ctas: 2 },
    { label: 'Blacked out, very drowsy, confused or hard to wake', ctas: 2 },
    { label: 'Has threatened to harm themselves or someone else', ctas: 2 },
    { label: 'Getting worse very fast', ctas: 2 },
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
        'Mild wheeze that got better quickly with an inhaler (2–4 puffs)',
        'Mild breathlessness after exercise that settles when you rest',
        'Blocked or stuffy nose making it a little hard to breathe',
      ],
    },
    {
      key: 'today', tone: 'amber', heading: 'Needs medical attention today?',
      items: [
        'Asthma — inhaler only partly helped after 2–3 puffs',
        'Wheeze or chest tightness that has not gone away with rest',
        'Shortness of breath while resting — started in the last few hours',
      ],
    },
    {
      key: 'serious', tone: 'red', heading: 'Could this be serious right now?',
      items: [
        'Gasping, choking or cannot breathe normally at all',
        'Lips, tongue or face are blue or grey',
        'Cannot speak in full sentences because of breathlessness',
        'Breathing getting worse even after using the inhaler',
      ],
    },
  ],
};
