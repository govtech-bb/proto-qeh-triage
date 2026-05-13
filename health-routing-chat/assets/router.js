// Routing logic shared by all three variants. Given the user's category,
// any warning signs they ticked, and their parish, decide where to send them.

function decideRoute({ category, hasWarningSigns, parish, tier }) {
  // 0. Tier-based outcomes from the three-panel breathing triage take precedence.
  if (tier === 'home') {
    return {
      mode: 'home',
      facility: FACILITIES['call-centre'],
      heading: 'You can likely manage this at home',
      intro: 'Based on what you ticked, this should settle without a clinic visit. Rest, take any prescribed inhaler or medicine as directed, and watch how things change. Call the QEH advice line if you are unsure.',
    };
  }
  if (tier === 'today') {
    // Treat as urgent-today: parish-driven polyclinic, or Fast Track if after hours.
    const key = PARISH_TO_POLYCLINIC[parish] || 'sir-winston';
    const facility = FACILITIES[key];
    const open = isFacilityOpen(key);
    if (key === 'sir-winston' || !open) {
      return {
        mode: 'urgent-today',
        facility: FACILITIES['sir-winston'],
        heading: 'Go to Sir Winston Scott Fast Track today',
        intro: 'You should be seen today. Fast Track is open 24 hours, so you can go now.',
        statusText: 'Fast Track: open 24 hours',
      };
    }
    return {
      mode: 'urgent-today',
      facility,
      heading: `Go to ${facility.short} today`,
      intro: 'You should be seen today. This polyclinic is in your parish and is open now.',
      statusText: 'Open now',
    };
  }
  if (tier === 'serious') {
    return {
      mode: 'emergency',
      facility: FACILITIES.qeh,
      heading: 'Get emergency medical help now',
      intro: 'What you described needs emergency care. Call 511 for an ambulance, or go to QEH Accident and Emergency.',
    };
  }

  // 1. Any warning sign at all → emergency. The chat/body/form variants
  //    can also short-circuit on individual ticks for faster feedback.
  if (hasWarningSigns) {
    return {
      mode: 'emergency',
      facility: FACILITIES.qeh,
      heading: 'Get emergency medical help now',
      intro: 'Call 511 for an ambulance, or go to QEH Accident and Emergency.',
    };
  }

  // 2. Mental health (no warning signs) → Psychiatric Hospital outpatient
  if (category === 'mental') {
    return {
      mode: 'psychiatric',
      facility: FACILITIES.psychiatric,
      heading: 'Visit the Psychiatric Hospital',
      intro: 'For mental health support, the Psychiatric Hospital in Black Rock has outpatient clinics weekdays. You can also speak to your polyclinic or call the QEH advice line.',
    };
  }

  // 3. Unsure (no warning signs) → call centre
  if (category === 'unsure') {
    return {
      mode: 'callcentre',
      facility: FACILITIES['call-centre'],
      heading: 'Call the QEH medical advice line',
      intro: 'Speak to medical staff who can help you decide where to go.',
    };
  }

  // 4. Otherwise pick a polyclinic by parish, falling back to Sir Winston Scott
  const key = PARISH_TO_POLYCLINIC[parish] || 'sir-winston';
  const facility = FACILITIES[key];
  const open = isFacilityOpen(key);
  const isRoutine = category === 'routine';

  if (key === 'sir-winston') {
    return {
      mode: 'fasttrack',
      facility,
      heading: 'Go to Sir Winston Scott Fast Track',
      intro: 'Fast Track is open 24 hours, every day — including evenings, weekends and public holidays.',
      statusText: 'Open now — Fast Track runs 24 hours',
    };
  }

  if (open) {
    return {
      mode: 'polyclinic-open',
      facility,
      heading: `Go to ${facility.short}`,
      intro: 'This polyclinic is in your parish and should be open now.',
      statusText: 'Open now',
    };
  }

  if (isRoutine) {
    return {
      mode: 'polyclinic-closed-routine',
      facility,
      heading: `${facility.short} is closed right now`,
      intro: 'For repeat medicine, test results or follow-up, please visit during opening hours: Monday to Friday, 8:30am to 4:30pm.',
      statusText: 'Closed now',
    };
  }

  // Polyclinic closed, urgent need → redirect to Fast Track
  return {
    mode: 'fasttrack-redirect',
    facility: FACILITIES['sir-winston'],
    heading: 'Your nearest polyclinic is closed — go to Sir Winston Scott Fast Track',
    intro: 'Polyclinics are open Monday to Friday, 8:30am to 4:30pm. Fast Track at Sir Winston Scott is open 24 hours for urgent care.',
    statusText: 'Fast Track: open 24 hours',
  };
}
