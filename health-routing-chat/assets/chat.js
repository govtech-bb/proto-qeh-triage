// Scripted chat. Not a real LLM — keyword matching against the same
// CATEGORIES/WARNING_SIGNS/router as the other variants. Voice IN via Web Speech
// (SpeechRecognition); voice OUT via SpeechSynthesis. Inline body diagram for
// pain-without-location. Three-tier triage panel for breathing.

(function () {
  var stream, input, micBtn, sendBtn, restartBtn, form, voiceStatus;
  var state = {
    step: 'open',
    category: null,
    parish: null,
    warningsTriggered: false,
  };

  // Category-only patterns (used for steering the conversation when no warning sign is matched)
  var INTENT_PATTERNS = [
    { cat: 'chest',     words: ['chest pain', 'chest hurt', 'chest tight', 'heart attack', 'palpit', 'fainting', 'stroke', 'face droop', 'arm weak', 'slurr'] },
    { cat: 'breathing', words: ['breath', 'asthma', 'wheez', 'inhaler', 'shortness of breath'] },
    { cat: 'allergic',  words: ['allerg', 'rash', 'swelling', 'swell', 'itch', 'hives', 'reaction'] },
    { cat: 'pregnancy', words: ['pregnan', 'baby moving', 'baby kick'] },
    { cat: 'child',     words: ['child', 'baby', 'kid', 'son', 'daughter', 'toddler', 'infant'] },
    { cat: 'mental',    words: ['anxiet', 'anxious', 'depress', 'panic', 'stress', 'sad', 'low mood', 'cant cope', "can't cope", 'mental', 'overwhelm'] },
    { cat: 'injury',    words: ['cut', 'bleed', 'burn', 'broke', 'broken', 'fell', 'fall', 'sprain', 'wound', 'fracture', 'crash'] },
    { cat: 'routine',   words: ['repeat medic', 'refill', 'prescription', 'test result', 'follow up', 'follow-up', 'check up', 'check-up'] },
    { cat: 'symptoms',  words: ['fever', 'temperature', 'vomit', 'throw up', 'diarrhoea', 'diarrhea', 'dizzy', 'tired', 'weak', 'sick', 'unwell', 'nauseous', 'nausea'] },
  ];

  function matchCategory(text) {
    var t = text.toLowerCase();
    for (var i = 0; i < INTENT_PATTERNS.length; i++) {
      var p = INTENT_PATTERNS[i];
      for (var j = 0; j < p.words.length; j++) {
        if (t.indexOf(p.words[j]) !== -1) return p.cat;
      }
    }
    return null;
  }

  // ── Bubbles / chips ──────────────────────────────────
  function bubble(kind, html) {
    var b = document.createElement('div');
    b.className = 'bubble bubble--' + kind;
    b.innerHTML = html;
    stream.appendChild(b);
    if (kind === 'bot' && window.speechSynthesis) {
      var bubbleText = b.innerText.trim();
      var readBtn = document.createElement('button');
      readBtn.type = 'button';
      readBtn.className = 'bubble-read-btn';
      readBtn.textContent = 'Read aloud';
      readBtn.setAttribute('aria-label', 'Read this response aloud');
      readBtn.addEventListener('click', function () {
        if (readBtn.textContent === 'Stop') {
          window.speechSynthesis.cancel();
          readBtn.textContent = 'Read aloud';
          readBtn.classList.remove('bubble-read-btn--playing');
          return;
        }
        speakText(bubbleText, readBtn);
      });
      var readWrap = document.createElement('div');
      readWrap.className = 'bubble-read-wrap';
      readWrap.appendChild(readBtn);
      b.appendChild(readWrap);
    }
    if (kind === 'user') {
      stream.scrollTop = stream.scrollHeight;
    } else {
      b.scrollIntoView({ block: 'start' });
    }
    return b;
  }

  function chips(items) {
    var wrap = document.createElement('div');
    wrap.className = 'chips';
    items.forEach(function (it) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip' + (it.danger ? ' chip--danger' : '');
      btn.textContent = it.label;
      btn.addEventListener('click', function () {
        wrap.remove();
        bubble('user', escapeHtml(it.label));
        it.onPick();
      });
      wrap.appendChild(btn);
    });
    stream.appendChild(wrap);
    return wrap;
  }

  function escapeHtml(s) {
    return String(s).replace(/[<>&"']/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ── TTS ──────────────────────────────────────────────
  function speakText(text, btn) {
    if (!window.speechSynthesis || !text) return;
    var clean = text.replace(/\s+/g, ' ').trim();
    if (!clean) return;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(clean);
    var voices = window.speechSynthesis.getVoices() || [];
    var preferred = voices.find(function (v) { return /en-GB/i.test(v.lang); })
                 || voices.find(function (v) { return /en-US/i.test(v.lang); })
                 || voices.find(function (v) { return /^en/i.test(v.lang); });
    if (preferred) u.voice = preferred;
    u.rate = 1.0; u.pitch = 1.0;
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('bubble-read-btn--playing');
      u.onend  = function () { btn.textContent = 'Read aloud'; btn.classList.remove('bubble-read-btn--playing'); };
      u.onerror = function () { btn.textContent = 'Read aloud'; btn.classList.remove('bubble-read-btn--playing'); };
    }
    window.speechSynthesis.speak(u);
  }

  // ── Inline body diagram bubble ──────────────────────
  function bubbleBodyDiagram(onPickRegion) {
    var b = document.createElement('div');
    b.className = 'bubble bubble--bot';
    b.style.maxWidth = '100%';
    b.innerHTML = '<p style="margin: 0 0 8px;"><strong>Where is the pain?</strong> Tap the body, or type/say it.</p>' +
      '<svg class="mini-body" viewBox="0 0 220 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tappable body diagram">' +
        '<g class="body-fill" pointer-events="none">' +
          '<ellipse cx="110" cy="40" rx="28" ry="32"/>' +
          '<rect x="100" y="68" width="20" height="14"/>' +
          '<path d="M70,82 L150,82 L160,160 L155,260 L65,260 L60,160 Z"/>' +
          '<path d="M70,82 L40,100 L32,200 L42,210 L52,200 L60,160 Z"/>' +
          '<path d="M150,82 L180,100 L188,200 L178,210 L168,200 L160,160 Z"/>' +
          '<path d="M65,260 L155,260 L160,300 L60,300 Z"/>' +
          '<path d="M60,300 L95,300 L100,440 L78,440 L72,360 Z"/>' +
          '<path d="M125,300 L160,300 L148,360 L142,440 L120,440 Z"/>' +
        '</g>' +
        '<g>' +
          '<ellipse class="region" data-region="head"      data-category="symptoms" cx="110" cy="40" rx="30" ry="34" tabindex="0" role="button" aria-label="Head"/>' +
          '<rect    class="region" data-region="chest"     data-category="chest"    x="78" y="92"  width="64" height="60" rx="6" tabindex="0" role="button" aria-label="Chest"/>' +
          '<rect    class="region" data-region="stomach"   data-category="symptoms" x="78" y="158" width="64" height="60" rx="6" tabindex="0" role="button" aria-label="Stomach"/>' +
          '<path    class="region" data-region="arm-left"  data-category="injury"   d="M40,100 L60,100 L62,200 L42,210 Z" tabindex="0" role="button" aria-label="Left arm"/>' +
          '<path    class="region" data-region="arm-right" data-category="injury"   d="M160,100 L180,100 L178,210 L158,200 Z" tabindex="0" role="button" aria-label="Right arm"/>' +
          '<rect    class="region" data-region="pelvis"    data-category="symptoms" x="68" y="225" width="84" height="50" rx="6" tabindex="0" role="button" aria-label="Pelvis"/>' +
          '<path    class="region" data-region="leg-left"  data-category="injury"   d="M70,305 L98,305 L98,440 L78,440 Z" tabindex="0" role="button" aria-label="Left leg"/>' +
          '<path    class="region" data-region="leg-right" data-category="injury"   d="M122,305 L150,305 L142,440 L122,440 Z" tabindex="0" role="button" aria-label="Right leg"/>' +
        '</g>' +
      '</svg>';
    stream.appendChild(b);
    stream.scrollTop = stream.scrollHeight;
    b.querySelectorAll('.region').forEach(function (r) {
      r.addEventListener('click', function () {
        b.querySelectorAll('.region').forEach(function (o) { o.classList.remove('selected'); });
        r.classList.add('selected');
        var label = r.getAttribute('aria-label');
        bubble('user', escapeHtml(label));
        onPickRegion(r.getAttribute('data-category'), r.getAttribute('data-region'));
      });
      r.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); r.click(); }
      });
    });
    return b;
  }

  // ── Tiered breathing triage bubble ──────────────────
  function bubbleTieredBreathing(onResolve) {
    var wrapper = document.createElement('div');
    wrapper.className = 'symptom-picker';

    var chipClassMap = { serious: 'chip--symptom-emergency', today: 'chip--symptom-urgent', home: '' };

    TIERED_BREATHING.tiers.forEach(function (tier) {
      var row = document.createElement('div');
      row.className = 'chips';
      tier.items.forEach(function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip ' + (chipClassMap[tier.key] || '');
        btn.textContent = item;
        (function (tierKey) {
          btn.addEventListener('click', function () {
            wrapper.remove();
            bubble('user', escapeHtml(item));
            onResolve({ tier: tierKey });
          });
        }(tier.key));
        row.appendChild(btn);
      });
      wrapper.appendChild(row);
    });

    var actionRow = document.createElement('div');
    actionRow.className = 'chips';

    var notSureBtn = document.createElement('button');
    notSureBtn.type = 'button';
    notSureBtn.className = 'chip';
    notSureBtn.textContent = 'I am not sure — talk to a nurse';
    notSureBtn.addEventListener('click', function () {
      wrapper.remove();
      bubble('user', 'I am not sure — talk to a nurse');
      onResolve({ tier: null, fallback: 'unsure' });
    });
    actionRow.appendChild(notSureBtn);

    var noneBtn = document.createElement('button');
    noneBtn.type = 'button';
    noneBtn.className = 'chip';
    noneBtn.textContent = 'None of these apply to me';
    noneBtn.addEventListener('click', function () {
      wrapper.remove();
      bubble('user', 'None of these apply to me');
      onResolve({ tier: null });
    });
    actionRow.appendChild(noneBtn);
    wrapper.appendChild(actionRow);

    stream.appendChild(wrapper);
    wrapper.scrollIntoView({ block: 'start' });
    return wrapper;
  }

  // ── Conversation flow ────────────────────────────────
  function start() {
    bubble('bot',
      "Hello. Tell me how you're feeling, or pick one of the options below and I'll help you find the right place to go."
    );
    var quickPicks = CATEGORIES.map(function (c) {
      return { label: c.label, onPick: function () { gotCategory(c.key); } };
    });
    quickPicks.push({ label: 'None of these', onPick: function () { goBodyPart(); } });
    chips(quickPicks);
  }

  function goBodyPart() {
    state.step = 'bodypart';
    bubble('bot', "Where in your body do you feel unwell? Pick a part below.");
    var items = BODY_PARTS_LIST.map(function (p) {
      return { label: p.label, onPick: function () { goBodySymptoms(p.key); } };
    });
    chips(items);
  }

  function goBodySymptoms(bodyKey) {
    var part = BODY_PART_SYMPTOMS[bodyKey];
    if (!part) { goParish(); return; }
    state.step = 'bodysymptoms';
    bubble('bot', "For " + part.label.toLowerCase() + " — tap the option that best matches what you are feeling.");
    bubbleSymptomPicker(part, function (level) {
      if (level <= 2) {
        state.category = 'symptoms';
        goEmergency();
      } else if (level === 3) {
        state.category = 'symptoms';
        state.tier = 'today';
        goParish('today');
      } else {
        state.category = 'symptoms';
        goParish();
      }
    });
  }

  function bubbleSymptomPicker(part, onPick) {
    var wrapper = document.createElement('div');
    wrapper.className = 'symptom-picker';

    var chipClass = { red: 'chip--symptom-emergency', amber: 'chip--symptom-urgent', teal: '', green: 'chip--symptom-routine' };

    part.tiers.forEach(function (tier) {
      var row = document.createElement('div');
      row.className = 'chips';

      tier.symptoms.forEach(function (symptom) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip ' + (chipClass[tier.tone] || '');
        btn.textContent = symptom;
        btn.addEventListener('click', function () {
          wrapper.remove();
          bubble('user', escapeHtml(symptom));
          onPick(tier.level);
        });
        row.appendChild(btn);
      });

      wrapper.appendChild(row);
    });

    stream.appendChild(wrapper);
    wrapper.scrollIntoView({ block: 'start' });
    return wrapper;
  }

  function gotCategory(cat) {
    state.category = cat;
    state.step = 'warnings';
    var label = CATEGORY_LABELS[cat] || cat;

    // Special case: breathing → three-tier triage
    if (cat === 'breathing') {
      bubble('bot', "Got it. Pick the option that best describes your breathing right now.");
      bubbleTieredBreathing(function (res) {
        if (res.fallback === 'unsure') { goCallCentre(); return; }
        if (res.tier === 'serious') { goEmergency(); return; }
        if (res.tier === 'today')   { state.tier = 'today'; goParish('today'); return; }
        if (res.tier === 'home')    { state.tier = 'home';  goResult(); return; }
        // No tick (or 'none of these')
        goParish();
      });
      return;
    }

    // All other categories: standard list of warning chips
    bubble('bot',
      "Got it. Are any of these happening right now? Tap any that apply, or 'None of these' to keep going."
    );
    var signs = WARNING_SIGNS[cat] || WARNING_SIGNS.unsure;
    var items = signs.map(function (s) {
      return {
        label: s.label,
        danger: s.ctas <= 2,
        onPick: (function (ctas) {
          return function () {
            if (ctas <= 2) {
              goEmergency();
            } else {
              state.tier = 'today';
              goParish('today');
            }
          };
        }(s.ctas)),
      };
    });
    items.push({ label: 'None of these', onPick: function () { goParish(); } });
    chips(items);
  }

  function goResult() {
    var qs = '?category=' + encodeURIComponent(state.category || '');
    if (state.warningsTriggered) qs += '&warnings=1';
    if (state.parish) qs += '&parish=' + encodeURIComponent(state.parish);
    if (state.tier)   qs += '&tier='   + encodeURIComponent(state.tier);
    qs += '&from=chat';
    bubble('bot', "Great — let me show you where to go.");
    setTimeout(function () { window.location.href = 'result.html' + qs; }, 700);
  }

  function resolveParish(parish) {
    state.parish = parish;
    goResult();
  }

  function goEmergency() {
    state.warningsTriggered = true;
    bubble('bot',
      '<strong>Please get emergency help right away.</strong><br>' +
      'Call 511 for an ambulance, or go to QEH Accident and Emergency.'
    );
    chips([
      { label: 'Call 511 now', danger: true, onPick: function () { window.location.href = 'tel:511'; } },
      { label: 'Show me where to go', onPick: function () { goResult(); } },
    ]);
  }

  function goCallCentre() {
    state.category = 'unsure';
    bubble('bot', "No problem — let me connect you with the nurse advice line.");
    setTimeout(function () { goResult(); }, 600);
  }

  function goParish(tier) {
    state.step = 'parish';
    if (tier) state.tier = tier;
    bubble('bot', "Which parish do you live in? I'll find your nearest clinic.");
    var items = PARISHES.map(function (p) {
      return { label: p, onPick: function () { resolveParish(p); } };
    });
    chips(items);
  }

  // ── Free-text handler ───────────────────────────────
  function handleUserText(text) {
    text = text.trim();
    if (!text) return;
    bubble('user', escapeHtml(text));

    if (state.step === 'parish') {
      var match = PARISHES.find(function (p) {
        return text.toLowerCase().indexOf(p.toLowerCase().replace('st. ', '')) !== -1
            || text.toLowerCase().indexOf(p.toLowerCase()) !== -1;
      });
      if (match) {
        bubble('bot', escapeHtml(match) + " — got it.");
        resolveParish(match);
      } else {
        bubble('bot', "I didn't catch the parish — please tap one of these:");
        var items = PARISHES.map(function (p) {
          return { label: p, onPick: function () { resolveParish(p); } };
        });
        chips(items);
      }
      return;
    }

    // STEP 1: Look for any warning-sign keywords across all categories.
    var signs = extractWarningSigns(text);
    if (signs.length) {
      // Use the most-mentioned category as context
      var catFromSign = signs[0].cat;
      state.category = catFromSign;
      state.warningsTriggered = true;
      bubble('bot',
        "That sounds urgent — I picked up: <em>" +
        escapeHtml(signs[0].sign.toLowerCase()) +
        "</em>. <strong>Get emergency help right away.</strong>"
      );
      chips([
        { label: 'Call 511', danger: true, onPick: function () { window.location.href = 'tel:511'; } },
        { label: 'Show me where to go', onPick: function () { goResult(); } },
      ]);
      return;
    }

    // STEP 2: Look for a category in the text.
    var cat = matchCategory(text);

    // STEP 3: Detect pain mentions and body parts.
    var hasPain = mentionsPain(text);
    var bodyPart = detectBodyPart(text);

    if (hasPain && !bodyPart && !cat) {
      // "I'm in pain" — show body diagram
      bubble('bot', "Sorry to hear that. Where's the pain?");
      bubbleBodyDiagram(function (cat, region) {
        gotCategory(cat);
      });
      return;
    }

    if (hasPain && bodyPart && !cat) {
      // "I have a pain in my arm" — use the body part's category
      gotCategory(bodyPart.category);
      return;
    }

    if (cat) {
      gotCategory(cat);
      return;
    }

    // Nothing matched — fall back to chips
    bubble('bot', "I'm not sure I follow. Could you tell me a bit more, or tap one of the options below?");
    var quickPicks = CATEGORIES.map(function (c) {
      return { label: c.label, onPick: function () { gotCategory(c.key); } };
    });
    chips(quickPicks);
  }

  // ── Voice input ──────────────────────────────────────
  function setupVoice() {
    if (!micBtn) return;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      micBtn.disabled = true;
      micBtn.title = 'Voice not supported in this browser';
      micBtn.setAttribute('aria-label', 'Voice not supported in this browser');
      micBtn.style.opacity = 0.45;
      return;
    }
    var rec = new SR();
    rec.lang = 'en-BB';
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    var listening = false;

    micBtn.addEventListener('click', function () {
      if (listening) { rec.stop(); return; }
      try { rec.start(); } catch (e) {}
    });

    rec.addEventListener('start', function () {
      listening = true;
      micBtn.classList.add('text-tool-btn--listening');
      micBtn.setAttribute('aria-label', 'Listening — tap to stop');
      voiceStatus.textContent = 'Listening… speak now.';
    });
    rec.addEventListener('end', function () {
      listening = false;
      micBtn.classList.remove('text-tool-btn--listening');
      micBtn.setAttribute('aria-label', 'Speak instead of typing');
      if (input.value.trim()) {
        voiceStatus.textContent = '';
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      } else {
        voiceStatus.textContent = "Didn't catch that. Try again or type instead.";
      }
    });
    rec.addEventListener('result', function (e) {
      var txt = '';
      for (var i = e.resultIndex; i < e.results.length; i++) {
        txt += e.results[i][0].transcript;
      }
      input.value = txt.trim();
    });
    rec.addEventListener('error', function (e) {
      listening = false;
      micBtn.classList.remove('text-tool-btn--listening');
      voiceStatus.textContent =
        e.error === 'not-allowed'
          ? 'Microphone permission needed — please allow it and try again.'
          : 'Voice error: ' + e.error;
    });
  }

  // ── Boot ─────────────────────────────────────────────
  window.addEventListener('DOMContentLoaded', function () {
    stream      = document.getElementById('chat-stream');
    input       = document.getElementById('msg-input');
    micBtn      = document.getElementById('mic-btn');
    sendBtn     = document.getElementById('send-btn');
    restartBtn  = document.getElementById('restart-btn');
    form        = document.getElementById('composer');
    voiceStatus = document.getElementById('voice-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value;
      input.value = '';
      handleUserText(text);
    });

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {};
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        stream.innerHTML = '';
        input.value = '';
        state.step = 'open';
        state.category = null;
        state.parish = null;
        state.warningsTriggered = false;
        state.tier = null;
        start();
        stream.scrollTop = 0;
      });
    }

    setupVoice();
    start();
    stream.scrollTop = 0;
  });
})();
