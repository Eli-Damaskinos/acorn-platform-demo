/**
 * Acorn Insight — static concept demo.
 * Deliberately uses synthetic numbers and no APIs, credentials, or build tools.
 */
(() => {
  'use strict';

  const sites = {
    'three-maids': { name: 'Three Maids', factor: 1, co2Shift: 0 },
    'horse-close': { name: 'Horse Close', factor: 0.88, co2Shift: 1.1 },
    portsdown: { name: 'Portsdown', factor: 0.68, co2Shift: -2.2 },
    banbury: { name: 'Banbury', factor: 1.08, co2Shift: 0.7 },
    all: { name: 'All sites', factor: 3.64, co2Shift: 0.5 }
  };
  const periods = { 7: 1, 30: 30 / 7, 90: 90 / 7 };
  const series = {
    7: [52, 61, 55, 73, 69, 81, 76, 84, 87, 80, 93, 96],
    30: [47, 58, 51, 61, 67, 60, 71, 77, 70, 85, 81, 91, 86, 97, 95],
    90: [46, 54, 62, 58, 64, 73, 69, 80, 77, 91, 83, 95, 88, 99, 107]
  };
  const reports = {
    biomethane: {
      menu: 'Biomethane', eyebrow: 'BIOMETHANE PERFORMANCE', heading: 'Make sense of <em>every cubic metre.</em>',
      description: 'Track produced gas, compare it against the plan and give forecasting a home.',
      overline: 'GAS PRODUCTION', chart: 'Output and production plan', subtitle: 'Illustrative generation trend against a reference',
      chartLabel: 'Gas production', focusTitle: 'From feedstock to gas', focusDescription: 'A single thread between what goes into the digester and what comes out.',
      focusCaption: 'Illustrative planned output achieved', focusBig: '94%', focusWidth: 94,
      focusUnder: 'Not a measured production KPI',
      drivers: ['Daily and monthly gas production', 'Lab-based biomethane yield curves', 'Production forecast and variance'],
      questions: ['Are we producing the gas expected from the feedstock mix?', 'When did actual and forecast production diverge?', 'How much gas was exported, consumed or flared?'],
      accent: 0
    },
    co2: {
      menu: 'CO₂ recovery', eyebrow: 'CARBON UTILISATION', heading: 'See the value in <em>every tonne.</em>',
      description: 'Understand CO₂ generated, recovered, stored and missed — in context.',
      overline: 'LIQUEFACTION & RECOVERY', chart: 'CO₂ recovery trend', subtitle: 'Illustrative capture performance versus reference',
      chartLabel: 'CO₂ capture', focusTitle: 'Where does CO₂ go?', focusDescription: 'Connect production estimates to liquefaction, storage and collection.',
      focusCaption: 'Illustrative recovery efficiency', focusBig: '68.4%', focusWidth: 68.4,
      focusUnder: 'Synthetic example; not operating performance',
      drivers: ['Available versus recovered CO₂', 'Unit state time and recovery losses', 'Storage levels and tanker collections'],
      questions: ['How much CO₂ was available for capture?', 'What were the main causes of lost recovery?', 'Is storage or collection capacity the constraint?'],
      accent: -5
    },
    feedstock: {
      menu: 'Feedstock', eyebrow: 'DIGESTER INPUTS', heading: 'Follow the input.<br><em>Understand the output.</em>',
      description: 'Bring incoming loads, feeding, composition and estimated yields together.',
      overline: 'MATERIAL FLOW', chart: 'Feedstock fed over time', subtitle: 'Illustrative input pattern against a reference',
      chartLabel: 'Feeding trends', focusTitle: 'A clearer material mix', focusDescription: 'Compare energy crop and waste inputs without switching spreadsheets.',
      focusCaption: 'Illustrative energy crop share', focusBig: '45%', focusWidth: 45,
      focusUnder: 'Remaining 55% in other feedstock groups',
      drivers: ['Incoming weighbridge loads', 'Daily hopper feed by material', 'Clamp inventory and transfers'],
      questions: ['Which materials make up the current feeding mix?', 'Does intake match actual digester feeding?', 'How long might stored feedstock last?'],
      accent: 6
    },
    energy: {
      menu: 'Electricity & heat', eyebrow: 'ENERGY BALANCE', heading: 'Know where <em>the energy goes.</em>',
      description: 'Connect electrical demand, generation and opportunities for efficiency.',
      overline: 'ELECTRICAL DEMAND', chart: 'Electricity consumption trend', subtitle: 'Illustrative energy pattern against a reference',
      chartLabel: 'Energy balance', focusTitle: 'Power in context', focusDescription: 'A consolidated view of imports, on-site generation and major consumers.',
      focusCaption: 'Illustrative self-generation share', focusBig: '61%', focusWidth: 61,
      focusUnder: 'Synthetic proportion, not a site reading',
      drivers: ['Site-wide power and energy', 'CHP generation', 'Equipment consumption and demand peaks'],
      questions: ['What is driving site electricity demand?', 'When is on-site generation covering demand?', 'Which process is responsible for the largest peaks?'],
      accent: -8
    },
    logistics: {
      menu: 'Virtual pipeline', eyebrow: 'DOWNSTREAM LOGISTICS', heading: 'From filling bay<br><em>to final delivery.</em>',
      description: 'Envisage connected trailer positions, filling progress and delivered volumes.',
      overline: 'MOVEMENT & DELIVERY', chart: 'Illustrative delivery volume', subtitle: 'Synthetic delivery pattern against a reference',
      chartLabel: 'Trailer logistics', focusTitle: 'Movement, made visible', focusDescription: 'Bring fill telemetry, trailer position and deliveries onto one screen.',
      focusCaption: 'Illustrative scheduled deliveries met', focusBig: '86%', focusWidth: 86,
      focusUnder: 'Concept measure only',
      drivers: ['Trailer GPS and latest positions', 'Filling bay status and meter totals', 'Planned versus completed collections'],
      questions: ['Where are trailers and what is their latest status?', 'Which trailer is filling and when might it finish?', 'What was loaded and successfully delivered?'],
      accent: 3
    }
  };
  const specialViews = {
    forecasting: {
      menu: 'Forecasting', eyebrow: 'PERFORMANCE OUTLOOK', heading: 'Look ahead with <em>more clarity.</em>',
      description: 'Explore illustrative biomethane production and CO₂ recovery forecasts for the selected site and timeframe.',
      section: 'Forecast outlook'
    },
    anomalies: {
      menu: 'Anomaly detection', eyebrow: 'FAULT DETECTION', heading: 'Spot changes <em>worth a closer look.</em>',
      description: 'Review example process deviations and see how fault-detection signals could be surfaced.',
      section: 'Example fault signals'
    },
    reports: {
      menu: 'Report', eyebrow: 'PERSONALISED REPORTING', heading: 'Your KPIs, <em>your report.</em>',
      description: 'Choose the operational measures you want included and how often you would like to receive a report.',
      section: 'Create a report'
    }
  };

  const $ = (selector) => document.querySelector(selector);
  let state = { view: 'overview', site: 'three-maids', range: 7 };
  const number = (value) => Math.round(value).toLocaleString('en-GB');
  const decimal = (value) => value.toLocaleString('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  function getMetrics() {
    const site = sites[state.site];
    const multiplier = site.factor * periods[state.range];
    const pct = Math.max(40, Math.min(84, 68.4 + site.co2Shift + (state.range === 30 ? -1.2 : state.range === 90 ? 1.7 : 0)));
    const gas = 12840 * multiplier;
    const feedstock = 428 * multiplier;
    const electricity = 22.8 * multiplier;
    const potential = 108 * multiplier;
    return { gas, feedstock, electricity, potential, pct, captured: potential * pct / 100, unrecovered: potential * (100 - pct) / 100, multiplier };
  }

  function drawSpark(id, index) {
    const svg = document.getElementById(id);
    const vals = series[state.range].slice(-9).map((v, i) => v + Math.sin(i * 1.5 + index) * (4 + index));
    const lo = Math.min(...vals) - 6, hi = Math.max(...vals) + 6;
    const points = vals.map((v, i) => `${(i / (vals.length - 1) * 94).toFixed(1)},${(25 - (v - lo) / (hi - lo) * 22).toFixed(1)}`).join(' ');
    const last = points.split(' ').at(-1).split(',');
    const colour = ['#79a36a', '#83ae89', '#b6a063', '#86aab1'][index];
    svg.innerHTML = `<polyline fill="none" stroke="${colour}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${points}"/><circle cx="${last[0]}" cy="${last[1]}" r="3" fill="${colour}" stroke="white" stroke-width="1.5"/>`;
  }

  // Draws SVG directly, so the site requires no charting library or server.
  function drawTrend(svgId, offset = 0) {
    const svg = document.getElementById(svgId);
    const base = series[state.range].map((v, i) => v + offset + Math.sin(i * .85 + offset) * 6);
    const plan = base.map((v, i) => v * .92 + 7 + Math.sin(i * .57) * 2.5);
    const min = Math.min(...base, ...plan) - 18;
    const max = Math.max(...base, ...plan) + 15;
    const x = (i) => 46 + i * 676 / (base.length - 1);
    const y = (v) => 218 - (v - min) / (max - min) * 184;
    const curve = (data) => {
      let d = `M ${x(0).toFixed(1)} ${y(data[0]).toFixed(1)}`;
      for (let i = 1; i < data.length; i++) {
        const prev = i - 1;
        const mid = (x(prev) + x(i)) / 2;
        d += ` C ${mid.toFixed(1)} ${y(data[prev]).toFixed(1)}, ${mid.toFixed(1)} ${y(data[i]).toFixed(1)}, ${x(i).toFixed(1)} ${y(data[i]).toFixed(1)}`;
      }
      return d;
    };
    const gradient = `shade-${svgId}`;
    const actualLine = curve(base);
    const plannedLine = curve(plan);
    const coords = [0, 1, 2, 3, 4].map((i) => 38 + i * 45);
    const grid = coords.map((yy) => `<line x1="46" x2="722" y1="${yy}" y2="${yy}" stroke="#edf0eb" stroke-dasharray="3 5"/>`).join('');
    const labels = base.map((_, i) => {
      if (i !== 0 && i !== base.length - 1 && i % (state.range === 7 ? 2 : 3) !== 0) return '';
      const span = state.range === 90 ? 12 : state.range - 1;
      const bucket = Math.round(1 + (i * span / (base.length - 1)));
      const prefix = state.range === 90 ? 'W' : 'D';
      return `<text x="${x(i)}" y="255" font-size="11" fill="#a2b0a4" text-anchor="middle" font-family="DM Sans, sans-serif">${prefix}${bucket}</text>`;
    }).join('');
    const endX = x(base.length - 1), endY = y(base.at(-1));
    svg.innerHTML = `
      <defs><linearGradient id="${gradient}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a4d38d" stop-opacity=".34"/><stop offset="100%" stop-color="#d3e7c2" stop-opacity=".015"/></linearGradient></defs>
      ${grid}<path d="${actualLine} L ${endX.toFixed(1)} 222 L 46 222 Z" fill="url(#${gradient})"/>
      <path d="${plannedLine}" fill="none" stroke="#bfc8bf" stroke-width="2" stroke-dasharray="6 6" stroke-linecap="round"/>
      <path d="${actualLine}" fill="none" stroke="#71a96c" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="${endX.toFixed(1)}" cy="${endY.toFixed(1)}" r="8.5" fill="#dcebd5"/>
      <circle cx="${endX.toFixed(1)}" cy="${endY.toFixed(1)}" r="4.5" fill="#71a96c" stroke="white" stroke-width="2"/>
      ${labels}`;
  }

  function renderOverview(m) {
    $('#kpi-gas').textContent = number(m.gas);
    $('#kpi-co2').textContent = decimal(m.pct);
    $('#kpi-feedstock').textContent = number(m.feedstock);
    $('#kpi-energy').textContent = decimal(m.electricity);
    $('#chart-main-value').innerHTML = `${number(m.gas)} <small>m³</small>`;
    $('#capture-pct').innerHTML = `${decimal(m.pct)}<small>%</small>`;
    $('#capture-ring').style.setProperty('--pct', `${m.pct}%`);
    $('#captured-tonnes').textContent = `${decimal(m.captured)} t`;
    $('#uncaptured-tonnes').textContent = `${decimal(m.unrecovered)} t`;
    ['gas', 'co2', 'feedstock', 'energy'].forEach((key, i) => drawSpark(`spark-${key}`, i));
    drawTrend('production-chart');
  }

  function detailMetrics(view, m) {
    const v = state.range;
    if (view === 'biomethane') return [
      ['Gas produced', `${number(m.gas)} m³`, 'Modelled output'],
      ['Illustrative plan', `${number(m.gas * 1.06)} m³`, 'Reference output'],
      ['Forecast alignment', '94.0%', 'Example fit to plan'],
      ['Estimated gas flared', `${number(m.gas * .014)} m³`, 'Synthetic figure']
    ];
    if (view === 'co2') return [
      ['Estimated available CO₂', `${decimal(m.potential)} t`, 'Synthetic potential'],
      ['Captured CO₂', `${decimal(m.captured)} t`, 'Illustrative recovery'],
      ['Not recovered', `${decimal(m.unrecovered)} t`, 'Estimated difference'],
      ['Capture rate', `${decimal(m.pct)}%`, 'Of estimated availability']
    ];
    if (view === 'feedstock') return [
      ['Total feedstock fed', `${number(m.feedstock)} t`, 'Synthetic intake'],
      ['Energy crop share', '45%', 'Illustrative split'],
      ['Other material share', '55%', 'Illustrative split'],
      ['Average fed per day', `${decimal(m.feedstock / v)} t`, 'Per calendar day']
    ];
    if (view === 'energy') return [
      ['Total electricity used', `${decimal(m.electricity)} MWh`, 'Synthetic demand'],
      ['On-site generation', `${decimal(m.electricity * .61)} MWh`, 'Illustrative supply'],
      ['Grid contribution', `${decimal(m.electricity * .39)} MWh`, 'Illustrative supply'],
      ['Generation share', '61%', 'Synthetic proportion']
    ];
    return [
      ['Completed collections', number(14 * m.multiplier), 'Illustrative loads'],
      ['Volume transported', `${decimal(25.2 * m.multiplier)} t`, 'Illustrative volume'],
      ['Average load weight', '1.8 t', 'Synthetic figure'],
      ['Schedule completion', '86%', 'Synthetic proportion']
    ];
  }

  function renderDetail(m) {
    const report = reports[state.view];
    $('#detail-summary').innerHTML = detailMetrics(state.view, m).map(([label, value, note]) => `<article class="detail-metric"><div class="metric-overline">${label}</div><strong>${value}</strong><small>${note}</small></article>`).join('');
    $('#detail-overline').textContent = report.overline;
    $('#detail-chart-title').textContent = report.chart;
    $('#detail-chart-subtitle').textContent = report.subtitle;
    $('#detail-chart-label').textContent = report.chartLabel;
    $('#detail-highlight').textContent = state.view === 'co2' ? `${decimal(m.captured)} t` : detailMetrics(state.view, m)[0][1];
    $('#detail-highlight-note').textContent = state.view === 'co2' ? 'Illustrative CO₂ recovered' : 'Across selected period';
    $('#focus-title').textContent = report.focusTitle;
    $('#focus-description').textContent = report.focusDescription;
    $('#focus-caption').textContent = report.focusCaption;
    $('#focus-big').textContent = state.view === 'co2' ? `${decimal(m.pct)}%` : report.focusBig;
    $('#focus-bar').style.width = `${state.view === 'co2' ? m.pct : report.focusWidth}%`;
    $('#focus-under').textContent = report.focusUnder;
    $('#focus-list').innerHTML = report.drivers.map((item) => `<div class="focus-list-row">${item}</div>`).join('');
    $('#detail-questions').innerHTML = report.questions.map((q) => `<li>${q}</li>`).join('');
    drawTrend('detail-chart', report.accent);
  }

  function renderForecasting(m) {
    $('#forecast-gas-value').textContent = `${number(m.gas)} m³`;
    $('#forecast-co2-value').textContent = `${decimal(m.pct)}%`;
    $('#forecast-co2-note').textContent = `capture rate · ${decimal(m.captured)} t projected recovered`;
    drawTrend('forecast-gas-chart', 4);
    drawTrend('forecast-co2-chart', -3);
  }

  function renderAnomalies() {
    const chart = $('#anomaly-chart');
    drawTrend('anomaly-chart', 8);
    chart.insertAdjacentHTML('beforeend', `
      <line x1="270" x2="270" y1="38" y2="222" stroke="#d68e59" stroke-dasharray="4 5" opacity=".65"/>
      <circle cx="270" cy="91" r="8" fill="#fff1e6" stroke="#d68e59" stroke-width="2"/>
      <circle cx="270" cy="91" r="3" fill="#d68e59"/>
      <line x1="540" x2="540" y1="38" y2="222" stroke="#d6bd67" stroke-dasharray="4 5" opacity=".65"/>
      <circle cx="540" cy="135" r="8" fill="#fff9df" stroke="#c7a94c" stroke-width="2"/>
      <circle cx="540" cy="135" r="3" fill="#c7a94c"/>`);
  }

  function render() {
    const overview = state.view === 'overview';
    const report = reports[state.view];
    const special = specialViews[state.view];
    const page = report || special;
    $('#overview-view').hidden = !overview;
    $('#detail-view').hidden = overview || !report;
    $('#forecasting-view').hidden = state.view !== 'forecasting';
    $('#anomaly-view').hidden = state.view !== 'anomalies';
    $('#reports-view').hidden = state.view !== 'reports';
    $('#content-controls').hidden = state.view === 'reports';
    $('#breadcrumb-page').textContent = overview ? 'Overview' : page.menu;
    $('#page-eyebrow').textContent = overview ? 'OPERATIONS INTELLIGENCE' : page.eyebrow;
    $('#page-heading').innerHTML = overview ? 'Your operations.<br><em>One clear view.</em>' : page.heading;
    $('#page-description').textContent = overview
      ? 'See the connections between production, recovery, feedstock, energy and logistics — without jumping between systems.'
      : page.description;
    $('#section-label').textContent = overview ? 'Performance snapshot' : report ? `${report.menu} snapshot` : page.section;
    document.title = `Acorn Insight — ${overview ? 'Overview' : page.menu}`;
    document.querySelectorAll('[data-view]').forEach((button) => {
      const active = button.dataset.view === state.view;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-range]').forEach((button) => {
      const active = Number(button.dataset.range) === state.range;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const metrics = getMetrics();
    if (overview) renderOverview(metrics);
    else if (report) renderDetail(metrics);
    else if (state.view === 'forecasting') renderForecasting(metrics);
    else if (state.view === 'anomalies') renderAnomalies();
    else if (state.view === 'reports') $('#report-site-preview').textContent = sites[state.site].name;
  }

  function closeMenu() {
    $('#sidebar').classList.remove('is-open');
    $('#mobile-scrim').classList.remove('is-visible');
    $('#open-menu').setAttribute('aria-expanded', 'false');
  }
  function navigate(view) {
    if (view !== 'overview' && !reports[view] && !specialViews[view]) return;
    state.view = view;
    render();
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-view], [data-navigate]');
    if (nav) navigate(nav.dataset.view || nav.dataset.navigate);
    const range = event.target.closest('[data-range]');
    if (range) { state.range = Number(range.dataset.range); render(); }
  });
  $('#site-select').addEventListener('change', (event) => {
    state.site = event.target.value;
    render();
  });
  $('#report-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const message = $('#report-form-message');
    if (!document.querySelector('input[name="kpis"]:checked')) {
      message.textContent = 'Choose at least one KPI to include in your report.';
      message.classList.add('is-error');
      return;
    }
    message.textContent = 'Your report settings look good. This prototype does not store the request or send email.';
    message.classList.remove('is-error');
  });
  $('#open-menu').addEventListener('click', () => {
    $('#sidebar').classList.add('is-open');
    $('#mobile-scrim').classList.add('is-visible');
    $('#open-menu').setAttribute('aria-expanded', 'true');
  });
  $('#close-menu').addEventListener('click', closeMenu);
  $('#mobile-scrim').addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  $('#today-date').textContent = new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date());
  render();
})();
