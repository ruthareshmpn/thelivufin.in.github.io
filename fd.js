const fdMoney = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
});

const fdControls = [
  { input: document.querySelector('#fd-principal'), range: document.querySelector('#fd-principal-range') },
  { input: document.querySelector('#fd-rate'), range: document.querySelector('#fd-rate-range') },
  { input: document.querySelector('#fd-tenure'), range: document.querySelector('#fd-tenure-range') }
];
const fdFrequency = document.querySelector('#fd-frequency');
const fdClamp = (value, min, max) => Math.min(max, Math.max(min, value));

const fdFrequencyDetails = {
  12: { months: 1, singular: 'Month', adjective: 'Monthly' },
  4: { months: 3, singular: 'Quarter', adjective: 'Quarterly' },
  2: { months: 6, singular: 'Half-year', adjective: 'Half-yearly' },
  1: { months: 12, singular: 'Year', adjective: 'Yearly' }
};

function fdTenureLabel(months) {
  if (months < 12) return months + (months === 1 ? ' month' : ' months');
  if (months % 12 === 0) {
    const years = months / 12;
    return years + (years === 1 ? ' year' : ' years');
  }
  return Math.floor(months / 12) + ' yr ' + (months % 12) + ' mo';
}

function renderFdSchedule(principal, annualRate, months, frequency) {
  const detail = fdFrequencyDetails[frequency] || fdFrequencyDetails[4];
  const periodRate = (annualRate / 100) / frequency;
  const completePeriods = Math.floor(months / detail.months);
  const remainingMonths = months - (completePeriods * detail.months);
  const rows = [];
  let balance = principal;

  for (let period = 1; period <= completePeriods; period += 1) {
    const interestAdded = balance * periodRate;
    balance += interestAdded;
    rows.push({
      label: detail.singular + ' ' + period + ' · month ' + (period * detail.months),
      interestAdded,
      balance,
      isFinal: period === completePeriods && remainingMonths === 0
    });
  }

  if (remainingMonths > 0) {
    const partialGrowth = Math.pow(1 + periodRate, remainingMonths / detail.months);
    const interestAdded = balance * (partialGrowth - 1);
    balance += interestAdded;
    rows.push({
      label: 'Maturity · month ' + months + ' (partial period)',
      interestAdded,
      balance,
      isFinal: true
    });
  }

  document.querySelector('#fd-schedule-title').textContent = detail.adjective + ' interest credits';
  document.querySelector('#fd-schedule-count').textContent = rows.length + (rows.length === 1 ? ' period' : ' periods');
  document.querySelector('#fd-schedule-body').innerHTML = rows.map((row) => (
    '<tr' + (row.isFinal ? ' class="is-maturity"' : '') + '>' +
      '<td>' + row.label + '</td>' +
      '<td>+' + fdMoney.format(row.interestAdded) + '</td>' +
      '<td>' + fdMoney.format(row.balance) + '</td>' +
    '</tr>'
  )).join('');
  document.querySelector('#fd-schedule-note').textContent = remainingMonths > 0
    ? 'The final row is a prorated estimate for an incomplete ' + detail.singular.toLowerCase() + '. Bank day-count and maturity rules may differ.'
    : 'Each row shows when interest is added to the deposit and begins earning interest in later periods.';
}

const fdBankRateData = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    type: 'DICGC-insured bank FD',
    typeClass: 'bank-fd',
    effective: 'Card rates w.e.f. 15 Dec 2025',
    regular: [5.65, 6.25, 6.40, 6.30, 6.30, 6.05],
    senior: [6.15, 6.75, 6.90, 6.80, 6.80, 7.05],
    source: 'https://sbi.bank.in/web/interest-rates/deposit-rates/retail-domestic-term-deposits'
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    type: 'DICGC-insured bank FD',
    typeClass: 'bank-fd',
    effective: 'Official page checked 30 Sep 2026',
    regular: [4.25, 6.25, 6.45, 6.45, 6.50, 6.40],
    senior: [4.75, 6.75, 6.95, 6.95, 7.10, 6.90],
    source: 'https://www.hdfc.bank.in/fixed-deposit/fd-interest-rate'
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    type: 'DICGC-insured bank FD',
    typeClass: 'bank-fd',
    effective: 'Rates w.e.f. 11 Sep 2026',
    regular: [5.50, 6.25, 6.30, 6.45, 6.50, 6.50],
    senior: [6.00, 6.75, 6.80, 6.95, 7.10, 7.10],
    source: 'https://www.icici.bank.in/personal-banking/deposits/fixed-deposit/fd-interest-rates'
  },
  {
    id: 'mahindra',
    name: 'Mahindra Finance',
    type: 'NBFC FD · no DICGC cover',
    typeClass: 'nbfc-fd',
    effective: 'Rates w.e.f. 22 May 2026',
    regular: [null, 6.60, 6.85, 7.40, 7.45, 7.45],
    senior: [null, 6.85, 7.10, 7.75, 7.80, 7.80],
    source: 'https://www.mahindrafinance.com/investment/fixed-deposit'
  },
  {
    id: 'shriram',
    name: 'Shriram Finance',
    type: 'NBFC FD · no DICGC cover',
    typeClass: 'nbfc-fd',
    effective: 'Rates w.e.f. 2 Jul 2026',
    regular: [null, 6.85, 7.10, 7.50, 7.50, 7.50],
    senior: [null, 7.35, 7.60, 8.00, 8.00, 8.00],
    source: 'https://www.shriramfinance.in/fixed-deposit-interest-rates'
  },
  {
    id: 'ippb',
    name: 'India Post Payments Bank',
    type: 'Payments bank · no FD/RD',
    typeClass: 'payments-bank',
    effective: 'RBI-licensed · no fixed deposits',
    regular: [null, null, null, null, null, null],
    senior: [null, null, null, null, null, null],
    source: 'https://www.ippbonline.com/en/web/ippb/digital-saving-account'
  }
];

function fdFormatRate(rate) {
  return rate.toFixed(2) + '%';
}

function renderFdBankRates() {
  const bankFilter = document.querySelector('#fd-bank-filter');
  const customerType = document.querySelector('#fd-customer-type');
  const body = document.querySelector('#fd-bank-rate-body');
  if (!bankFilter || !customerType || !body) return;

  const visibleBanks = bankFilter.value === 'all'
    ? fdBankRateData
    : fdBankRateData.filter((bank) => bank.id === bankFilter.value);
  const rateType = customerType.value === 'senior' ? 'senior' : 'regular';
  const visibleRates = visibleBanks.flatMap((bank) => bank[rateType]).filter(Number.isFinite);

  body.innerHTML = visibleBanks.map((bank) => {
    const rates = bank[rateType];
    const validRates = rates.filter(Number.isFinite);
    const hasRates = validRates.length > 0;
    const minimum = hasRates ? Math.min(...validRates) : null;
    const maximum = hasRates ? Math.max(...validRates) : null;
    const cells = rates.map((rate) => {
      if (!Number.isFinite(rate)) return '<td class="rate-na">Not offered</td>';
      const classes = [rate === minimum ? 'rate-low' : '', rate === maximum ? 'rate-high' : ''].filter(Boolean).join(' ');
      return '<td class="' + classes + '">' + fdFormatRate(rate) + '</td>';
    }).join('');
    return '<tr>' +
      '<td><strong>' + bank.name + '</strong><small>' + bank.effective + '</small></td>' +
      '<td><span class="fd-type-badge ' + bank.typeClass + '">' + bank.type + '</span></td>' +
      cells +
      '<td class="rate-range-cell">' + (hasRates ? fdFormatRate(minimum) + '–' + fdFormatRate(maximum) : 'Not applicable') + '</td>' +
      '<td><a class="official-link" href="' + bank.source + '" target="_blank" rel="noopener noreferrer">Official site ↗</a></td>' +
    '</tr>';
  }).join('');

  document.querySelector('#fd-bank-rate-min').textContent = visibleRates.length ? fdFormatRate(Math.min(...visibleRates)) : '—';
  document.querySelector('#fd-bank-rate-max').textContent = visibleRates.length ? fdFormatRate(Math.max(...visibleRates)) : '—';
  document.querySelector('#fd-bank-count').textContent = String(visibleBanks.length);
}

function calculateFd() {
  const principal = fdClamp(Number(fdControls[0].input.value) || 1000, 1000, 10000000);
  const annualRate = fdClamp(Number(fdControls[1].input.value) || 1, 1, 12);
  const months = fdClamp(Number(fdControls[2].input.value) || 1, 1, 120);
  const frequency = Number(fdFrequency.value) || 4;
  const years = months / 12;
  const maturity = principal * Math.pow(1 + (annualRate / 100) / frequency, frequency * years);
  const interest = Math.max(0, maturity - principal);
  const effectiveYield = (Math.pow(1 + (annualRate / 100) / frequency, frequency) - 1) * 100;
  const principalShare = principal / maturity * 100;

  document.querySelector('#fd-maturity').textContent = fdMoney.format(maturity);
  document.querySelector('#fd-invested').textContent = fdMoney.format(principal);
  document.querySelector('#fd-interest').textContent = fdMoney.format(interest);
  document.querySelector('#fd-taxable').textContent = fdMoney.format(interest);
  document.querySelector('#fd-tenure-label').textContent = fdTenureLabel(months);
  document.querySelector('#fd-yield').textContent = effectiveYield.toFixed(2) + '%';
  document.querySelector('#fd-principal-bar').style.width = principalShare + '%';
  document.querySelector('#fd-interest-bar').style.width = (100 - principalShare) + '%';
  renderFdSchedule(principal, annualRate, months, frequency);
}

fdControls.forEach(({ input, range }) => {
  range.addEventListener('input', () => { input.value = range.value; calculateFd(); });
  input.addEventListener('input', () => {
    const value = fdClamp(Number(input.value), Number(range.min), Number(range.max));
    if (Number.isFinite(value)) range.value = String(value);
    calculateFd();
  });
  input.addEventListener('change', () => {
    const value = fdClamp(Number(input.value) || Number(range.min), Number(range.min), Number(range.max));
    input.value = String(value);
    range.value = String(value);
    calculateFd();
  });
});
fdFrequency.addEventListener('change', calculateFd);
const fdBankFilter = document.querySelector('#fd-bank-filter');
const fdCustomerType = document.querySelector('#fd-customer-type');
if (fdBankFilter && fdCustomerType) {
  fdBankFilter.addEventListener('change', renderFdBankRates);
  fdCustomerType.addEventListener('change', renderFdBankRates);
  renderFdBankRates();
}
calculateFd();





