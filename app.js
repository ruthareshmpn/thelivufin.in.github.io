const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
});

const controls = [
  { input: document.querySelector('#monthly'), range: document.querySelector('#monthly-range') },
  { input: document.querySelector('#rate'), range: document.querySelector('#rate-range') },
  { input: document.querySelector('#tenure'), range: document.querySelector('#tenure-range') }
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
let scheduleMode = 'monthly';

function estimateMaturity(monthly, annualRate, months) {
  if (months <= 0) return 0;
  const quarterlyRate = annualRate / 400;
  return monthly * ((Math.pow(1 + quarterlyRate, months / 3) - 1) / (1 - Math.pow(1 + quarterlyRate, -1 / 3)));
}

function calculate() {
  const monthly = clamp(Number(controls[0].input.value) || 500, 500, 100000);
  const annualRate = clamp(Number(controls[1].input.value) || 1, 1, 12);
  const months = clamp(Number(controls[2].input.value) || 6, 6, 120);
  const maturity = estimateMaturity(monthly, annualRate, months);
  const principal = monthly * months;
  const firstQuarterMonths = Math.min(3, months);
  const firstQuarterInterest = estimateMaturity(monthly, annualRate, firstQuarterMonths) - (monthly * firstQuarterMonths);
  const interest = Math.max(0, maturity - principal);
  const principalShare = principal / maturity * 100;

  document.querySelector('#maturity').textContent = money.format(maturity);
  document.querySelector('#principal').textContent = money.format(principal);
  document.querySelector('#interest').textContent = money.format(interest);
  document.querySelector('#monthly-added').textContent = money.format(monthly);
  document.querySelector('#first-quarter-interest').textContent = money.format(firstQuarterInterest);
  document.querySelector('#taxable-interest').textContent = money.format(interest);
  document.querySelector('#principal-bar').style.width = `${principalShare}%`;
  document.querySelector('#interest-bar').style.width = `${100 - principalShare}%`;
  renderSchedule(monthly, annualRate, months);
  return { monthlyDeposit: monthly, annualRate, tenureMonths: months, maturityAmount: Math.round(maturity), totalDeposited: principal, interestEarned: Math.round(interest) };
}

function renderSchedule(monthly, annualRate, months) {
  const head = document.querySelector('#schedule-table-head');
  const body = document.querySelector('#schedule-table-body');
  const summary = document.querySelector('#schedule-summary');
  const note = document.querySelector('#schedule-note');

  summary.textContent = money.format(monthly) + ' is added each month. Interest is compounded every quarter at ' + annualRate + '% p.a.';
  if (scheduleMode === 'monthly') {
    head.innerHTML = '<tr><th>Month</th><th>Deposits</th><th>Monthly interest</th><th>Quarter interest</th><th>Balance</th></tr>';
    const rows = [];
    for (let start = 0; start < months; start += 3) {
      const end = Math.min(start + 3, months);
      const periodMonths = end - start;
      const openingBalance = estimateMaturity(monthly, annualRate, start);
      const closingBalance = estimateMaturity(monthly, annualRate, end);
      const periodInterest = Math.max(0, closingBalance - openingBalance - (monthly * periodMonths));
      const weights = Array.from({ length: periodMonths }, (_, index) => openingBalance + (monthly * (index + 1)));
      const weightTotal = weights.reduce((sum, value) => sum + value, 0);

      weights.forEach((depositBase, index) => {
        const month = start + index + 1;
        const isQuarterEnd = month === end;
        const monthlyInterest = weightTotal ? periodInterest * (depositBase / weightTotal) : 0;
        rows.push(
          '<tr class="' + (isQuarterEnd ? 'quarter-end' : '') + '">' +
          '<td>Month ' + month + '</td>' +
          '<td>' + money.format(depositBase) + '</td>' +
          '<td>' + money.format(monthlyInterest) + '</td>' +
          '<td>' + (isQuarterEnd ? money.format(periodInterest) : '—') + '</td>' +
          '<td>' + (isQuarterEnd ? money.format(closingBalance) : '—') + '</td>' +
          '</tr>'
        );
      });
    }
    body.innerHTML = rows.join('');
    note.textContent = 'Each green quarter-end row totals the three monthly interest amounts and shows the updated balance after that interest is added.';
    return;
  }

  head.innerHTML = '<tr><th>Quarter</th><th>New deposits</th><th>Interest added</th><th>Closing balance</th></tr>';
  const rows = [];
  for (let start = 0, quarter = 1; start < months; start += 3, quarter += 1) {
    const end = Math.min(start + 3, months);
    const deposits = monthly * (end - start);
    const openingBalance = estimateMaturity(monthly, annualRate, start);
    const closingBalance = estimateMaturity(monthly, annualRate, end);
    const interestAdded = Math.max(0, closingBalance - openingBalance - deposits);
    const label = end - start === 3
      ? 'Q' + quarter + ' · Months ' + (start + 1) + '–' + end
      : 'Partial Q' + quarter + ' · Months ' + (start + 1) + '–' + end;
    rows.push('<tr><td>' + label + '</td><td>' + money.format(deposits) + '</td><td class="interest-cell">+' + money.format(interestAdded) + '</td><td>' + money.format(closingBalance) + '</td></tr>');
  }
  body.innerHTML = rows.join('');
  note.textContent = 'Quarterly interest is the estimated growth during each three-month period after subtracting that period’s new deposits. A final partial quarter is shown as accrued interest.';
}

const bankRateData = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    effective: 'Rates effective 15 Dec 2025',
    regular: [null, 6.25, 6.40, 6.30, 6.30, 6.05],
    senior: [null, 6.75, 6.90, 6.80, 6.80, 7.05],
    source: 'https://sbi.bank.in/web/interest-rates/deposit-rates/retail-domestic-term-deposits'
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    effective: 'Rates effective 29 Dec 2025',
    regular: [4.50, 6.25, 6.30, 6.45, 6.50, 6.50],
    senior: [5.00, 6.75, 6.80, 6.95, 7.10, 7.10],
    source: 'https://www.icici.bank.in/personal-banking/deposits/recurring-deposits/rd-interest-rates'
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    effective: 'Rates effective 23 Sep 2026',
    regular: [5.50, 6.35, 6.65, 6.40, 6.40, 6.25],
    senior: [6.00, 6.85, 7.15, 7.00, 7.00, 6.75],
    source: 'https://m.kotak.com/td-rates/'
  },
  {
    id: 'ippb',
    name: 'India Post Payments Bank',
    effective: 'RBI-licensed payments bank · no RD',
    regular: [null, null, null, null, null, null],
    senior: [null, null, null, null, null, null],
    source: 'https://www.ippbonline.com/en/web/ippb/digital-saving-account'
  }
];

function formatRate(rate) {
  return rate.toFixed(2) + '%';
}

function renderBankRates() {
  const bankFilter = document.querySelector('#bank-filter');
  const customerType = document.querySelector('#customer-type');
  const body = document.querySelector('#bank-rate-body');
  if (!bankFilter || !customerType || !body) return;

  const visibleBanks = bankFilter.value === 'all'
    ? bankRateData
    : bankRateData.filter((bank) => bank.id === bankFilter.value);
  const rateType = customerType.value === 'senior' ? 'senior' : 'regular';
  const allVisibleRates = visibleBanks.flatMap((bank) => bank[rateType]).filter(Number.isFinite);

  body.innerHTML = visibleBanks.map((bank) => {
    const rates = bank[rateType];
    const validRates = rates.filter(Number.isFinite);
    const hasRates = validRates.length > 0;
    const minimum = hasRates ? Math.min(...validRates) : null;
    const maximum = hasRates ? Math.max(...validRates) : null;
    const rateCells = rates.map((rate) => {
      if (!Number.isFinite(rate)) return '<td class="rate-na">Not available</td>';
      const classes = [rate === minimum ? 'rate-low' : '', rate === maximum ? 'rate-high' : ''].filter(Boolean).join(' ');
      return '<td class="' + classes + '">' + formatRate(rate) + '</td>';
    }).join('');
    return '<tr>' +
      '<td><strong>' + bank.name + '</strong><small>' + bank.effective + '</small></td>' +
      rateCells +
      '<td class="rate-range-cell">' + (hasRates ? formatRate(minimum) + '–' + formatRate(maximum) : 'Not applicable') + '</td>' +
      '<td><a class="official-link" href="' + bank.source + '" target="_blank" rel="noopener noreferrer">Official site ↗</a></td>' +
      '</tr>';
  }).join('');

  document.querySelector('#bank-rate-min').textContent = allVisibleRates.length ? formatRate(Math.min(...allVisibleRates)) : '—';
  document.querySelector('#bank-rate-max').textContent = allVisibleRates.length ? formatRate(Math.max(...allVisibleRates)) : '—';
  document.querySelector('#bank-count').textContent = String(visibleBanks.length);
}

const bankFilter = document.querySelector('#bank-filter');
const customerType = document.querySelector('#customer-type');
if (bankFilter && customerType) {
  bankFilter.addEventListener('change', renderBankRates);
  customerType.addEventListener('change', renderBankRates);
  renderBankRates();
}
controls.forEach(({ input, range }) => {
  range.addEventListener('input', () => { input.value = range.value; calculate(); });
  input.addEventListener('input', () => {
    const value = clamp(Number(input.value), Number(range.min), Number(range.max));
    if (Number.isFinite(value)) range.value = value;
    calculate();
  });
  input.addEventListener('change', () => {
    const value = clamp(Number(input.value) || Number(range.min), Number(range.min), Number(range.max));
    input.value = value;
    range.value = value;
    calculate();
  });
});

document.querySelectorAll('[data-schedule]').forEach((button) => {
  button.addEventListener('click', () => {
    scheduleMode = button.dataset.schedule;
    document.querySelectorAll('[data-schedule]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    calculate();
  });
});

calculate();

const context = document.modelContext;
if (context?.registerTool) {
  const lifecycle = new AbortController();
  const registration = context.registerTool({
    name: 'calculate_recurring_deposit',
    title: 'Calculate recurring deposit',
    description: 'Set the monthly deposit, annual interest rate and tenure, then calculate and display the estimated RD maturity value.',
    inputSchema: {
      type: 'object',
      properties: {
        monthlyDeposit: { type: 'number', minimum: 500, maximum: 100000 },
        annualRate: { type: 'number', minimum: 1, maximum: 12 },
        tenureMonths: { type: 'integer', minimum: 6, maximum: 120 }
      },
      required: ['monthlyDeposit', 'annualRate', 'tenureMonths'],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute(input) {
      const values = [input.monthlyDeposit, input.annualRate, input.tenureMonths];
      if (!values.every(Number.isFinite) || !Number.isInteger(input.tenureMonths) ||
          input.monthlyDeposit < 500 || input.monthlyDeposit > 100000 ||
          input.annualRate < 1 || input.annualRate > 12 ||
          input.tenureMonths < 6 || input.tenureMonths > 120) {
        throw new Error('Enter a monthly deposit from ₹500 to ₹1,00,000, a rate from 1% to 12%, and a whole-month tenure from 6 to 120.');
      }
      const next = [input.monthlyDeposit, input.annualRate, input.tenureMonths];
      controls.forEach(({ input: field, range }, index) => {
        field.value = String(next[index]);
        range.value = String(next[index]);
      });
      return calculate();
    }
  }, { signal: lifecycle.signal });
  Promise.resolve(registration).catch(() => {});
}







