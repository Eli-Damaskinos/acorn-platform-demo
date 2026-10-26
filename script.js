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
    operational: {
      menu: 'Live view', eyebrow: 'OPERATIONAL VIEW', heading: 'The plant, <em>in one view.</em>',
      description: 'Explore an illustrative process schematic and sample sensor readings across the plant.',
      section: 'Plant live view'
    },
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
  const operationalAreas = {
    clamps: {
      title: 'Clamps', description: 'Feedstock storage and clamp face monitoring',
      pipe: 'M 145 250 H 365 V 305 H 750',
      equipment: [
        { type: 'clamp', x: 100, y: 125, label: 'CLAMP 01' },
        { type: 'clamp', x: 335, y: 125, label: 'CLAMP 02' },
        { type: 'hopper', x: 680, y: 230, label: 'FEED HOPPER' }
      ],
      sensors: [
        { id: 'CL-01', label: 'Clamp 01 temperature', value: '18.6', unit: '°C', x: 190, y: 175 },
        { id: 'CL-02', label: 'Clamp 02 stock level', value: '72', unit: '%', x: 425, y: 175 },
        { id: 'FD-01', label: 'Feed rate', value: '5.8', unit: 't/h', x: 735, y: 290 }
      ]
    },
    dispensers: {
      title: 'Dispensers', description: 'Gas dispensing points and delivery pressure',
      pipe: 'M 145 315 H 755 M 300 315 V 220 M 600 315 V 220',
      equipment: [
        { type: 'dispenser', x: 225, y: 105, label: 'DISPENSER 01' },
        { type: 'dispenser', x: 525, y: 105, label: 'DISPENSER 02' }
      ],
      sensors: [
        { id: 'DP-01', label: 'Dispenser 01 pressure', value: '210', unit: 'bar', x: 275, y: 205 },
        { id: 'DP-02', label: 'Dispenser 02 pressure', value: '198', unit: 'bar', x: 575, y: 205 },
        { id: 'FL-01', label: 'Total flow rate', value: '1,240', unit: 'Nm³/h', x: 740, y: 315 }
      ]
    },
    co2: {
      title: 'CO₂ recovery', description: 'Recovery, liquefaction and storage overview',
      pipe: 'M 140 290 H 300 V 225 H 465 V 290 H 735 M 565 290 V 350 H 735',
      equipment: [
        { type: 'vessel', x: 95, y: 170, label: 'SEPARATOR' },
        { type: 'compressor', x: 330, y: 165, label: 'LIQUEFACTION' },
        { type: 'tank', x: 650, y: 155, label: 'CO₂ STORAGE' }
      ],
      sensors: [
        { id: 'CO-01', label: 'Recovery rate', value: '68.4', unit: '%', x: 170, y: 250 },
        { id: 'PT-02', label: 'Liquefaction pressure', value: '18.2', unit: 'bar', x: 430, y: 255 },
        { id: 'LT-03', label: 'Storage level', value: '64', unit: '%', x: 735, y: 250 }
      ]
    },
    upgraders: {
      title: 'Upgraders', description: 'Gas upgrading stages and product quality',
      pipe: 'M 110 300 H 760 M 310 300 V 225 M 585 300 V 225',
      equipment: [
        { type: 'vessel', x: 175, y: 120, label: 'PRE-TREATMENT' },
        { type: 'compressor', x: 450, y: 135, label: 'UPGRADER 01' },
        { type: 'tank', x: 700, y: 160, label: 'PRODUCT GAS' }
      ],
      sensors: [
        { id: 'CH-01', label: 'Methane concentration', value: '97.8', unit: '%', x: 255, y: 265 },
        { id: 'PT-04', label: 'Inlet pressure', value: '7.2', unit: 'bar', x: 520, y: 265 },
        { id: 'QT-02', label: 'Product gas flow', value: '1,820', unit: 'Nm³/h', x: 735, y: 300 }
      ]
    },
    digesters: {
      title: 'Digester tanks', description: 'Digestion vessels and gas collection',
      pipe: 'M 160 315 H 730 M 290 315 V 250 M 590 315 V 250 M 290 160 V 115 H 590 V 160',
      equipment: [
        { type: 'digester', x: 155, y: 105, label: 'DIGESTER 01' },
        { type: 'digester', x: 455, y: 105, label: 'DIGESTER 02' }
      ],
      sensors: [
        { id: 'TT-01', label: 'Digester 01 temperature', value: '39.2', unit: '°C', x: 280, y: 215 },
        { id: 'LT-02', label: 'Digester 02 level', value: '81', unit: '%', x: 580, y: 215 },
        { id: 'PT-03', label: 'Biogas header pressure', value: '42.6', unit: 'mbar', x: 735, y: 115 }
      ]
    }
  };

  const $ = (selector) => document.querySelector(selector);
  let state = { view: 'overview', site: 'three-maids', range: 7, area: 'digesters' };
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

  function renderPlantEquipment(equipment) {
    if (equipment.type === 'digester' || equipment.type === 'tank') {
      const height = equipment.type === 'digester' ? 150 : 126;
      return `<g class="plant-equipment"><rect x="${equipment.x}" y="${equipment.y + 18}" width="130" height="${height}" rx="5"/><ellipse cx="${equipment.x + 65}" cy="${equipment.y + 18}" rx="65" ry="18"/><path d="M ${equipment.x} ${equipment.y + height + 18} Q ${equipment.x + 65} ${equipment.y + height + 44} ${equipment.x + 130} ${equipment.y + height + 18}"/><text x="${equipment.x + 65}" y="${equipment.y + height + 2}" text-anchor="middle">${equipment.label}</text></g>`;
    }
    if (equipment.type === 'clamp') {
      return `<g class="plant-equipment"><path d="M ${equipment.x} ${equipment.y + 40} L ${equipment.x + 25} ${equipment.y + 12} H ${equipment.x + 180} L ${equipment.x + 205} ${equipment.y + 40} V ${equipment.y + 130} H ${equipment.x} Z"/><path class="equipment-accent" d="M ${equipment.x + 13} ${equipment.y + 45} H ${equipment.x + 192}"/><text x="${equipment.x + 102}" y="${equipment.y + 100}" text-anchor="middle">${equipment.label}</text></g>`;
    }
    if (equipment.type === 'hopper') {
      return `<g class="plant-equipment"><path d="M ${equipment.x} ${equipment.y} H ${equipment.x + 120} L ${equipment.x + 100} ${equipment.y + 75} H ${equipment.x + 20} Z"/><path d="M ${equipment.x + 45} ${equipment.y + 75} V ${equipment.y + 115} H ${equipment.x + 75} V ${equipment.y + 75}"/><text x="${equipment.x + 60}" y="${equipment.y - 12}" text-anchor="middle">${equipment.label}</text></g>`;
    }
    if (equipment.type === 'dispenser') {
      return `<g class="plant-equipment"><rect x="${equipment.x}" y="${equipment.y}" width="105" height="118" rx="9"/><rect class="equipment-screen" x="${equipment.x + 18}" y="${equipment.y + 18}" width="68" height="37" rx="4"/><path d="M ${equipment.x + 52} ${equipment.y + 58} V ${equipment.y + 93} M ${equipment.x + 52} ${equipment.y + 93} q 25 0 25 -19"/><text x="${equipment.x + 52}" y="${equipment.y + 141}" text-anchor="middle">${equipment.label}</text></g>`;
    }
    if (equipment.type === 'compressor') {
      return `<g class="plant-equipment"><rect x="${equipment.x}" y="${equipment.y}" width="155" height="112" rx="8"/><circle cx="${equipment.x + 52}" cy="${equipment.y + 55}" r="26"/><path d="M ${equipment.x + 52} ${equipment.y + 34} V ${equipment.y + 76} M ${equipment.x + 31} ${equipment.y + 55} H ${equipment.x + 73}"/><rect class="equipment-screen" x="${equipment.x + 91}" y="${equipment.y + 25}" width="43" height="57" rx="4"/><text x="${equipment.x + 77}" y="${equipment.y + 135}" text-anchor="middle">${equipment.label}</text></g>`;
    }
    return `<g class="plant-equipment"><rect x="${equipment.x}" y="${equipment.y}" width="125" height="112" rx="8"/><ellipse cx="${equipment.x + 62}" cy="${equipment.y}" rx="62" ry="12"/><path d="M ${equipment.x + 28} ${equipment.y + 42} H ${equipment.x + 97} M ${equipment.x + 28} ${equipment.y + 57} H ${equipment.x + 97}"/><text x="${equipment.x + 62}" y="${equipment.y + 94}" text-anchor="middle">${equipment.label}</text></g>`;
  }

  function renderOperational() {
    const area = operationalAreas[state.area];
    $('#operational-area-title').textContent = area.title;
    $('#schematic-title').textContent = area.title;
    $('#schematic-description').textContent = area.description;
    $('#sensor-site-name').textContent = `${sites[state.site].name} · sample values`;
    $('#readings-time').textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(new Date());
    document.querySelectorAll('[data-area]').forEach((button) => {
      const active = button.dataset.area === state.area;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $('#sensor-readings').innerHTML = area.sensors.map((sensor) => `
      <div class="sensor-reading">
        <span class="sensor-status" aria-label="Sample reading"></span>
        <div class="sensor-reading-copy"><strong>${sensor.label}</strong><small>${sensor.id} · Sample</small></div>
        <div class="sensor-reading-value"><strong>${sensor.value}<small>${sensor.unit}</small></strong><span>Example</span></div>
      </div>`).join('');
    $('#plant-schematic').setAttribute('aria-label', `Illustrative ${area.title.toLowerCase()} process schematic with synthetic sensor points`);
    $('#plant-schematic').innerHTML = `
      <defs>
        <pattern id="plant-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 H 0 V 28" fill="none" stroke="#eaf0e9" stroke-width="1"/></pattern>
        <filter id="sensor-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="900" height="440" rx="12" fill="url(#plant-grid)"/>
      <path class="process-pipe" d="${area.pipe}"/>
      ${area.equipment.map(renderPlantEquipment).join('')}
      ${area.sensors.map((sensor) => `<g class="plant-sensor"><circle cx="${sensor.x}" cy="${sensor.y}" r="13" class="sensor-halo"/><circle cx="${sensor.x}" cy="${sensor.y}" r="5" class="sensor-core" filter="url(#sensor-glow)"/><rect class="sensor-tag" x="${sensor.x + 17}" y="${sensor.y - 13}" width="54" height="24" rx="6"/><text class="sensor-tag-text" x="${sensor.x + 44}" y="${sensor.y + 3}" text-anchor="middle">${sensor.id}</text></g>`).join('')}`;
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
    $('#operational-view').hidden = state.view !== 'operational';
    $('#content-controls').hidden = state.view === 'reports';
    $('#range-control').hidden = state.view === 'reports' || state.view === 'operational';
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
    else if (state.view === 'operational') renderOperational();
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
    const area = event.target.closest('[data-area]');
    if (area && operationalAreas[area.dataset.area]) {
      state.area = area.dataset.area;
      renderOperational();
    }
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
