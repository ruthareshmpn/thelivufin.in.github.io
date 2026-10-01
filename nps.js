const npsMoney = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const npsForm = document.querySelector('#nps-form');

function npsValue(id, fallback) {
  const value = Number(document.querySelector(id).value);
  return Number.isFinite(value) ? value : fallback;
}

function calculateNps() {
  const monthly = Math.max(500, npsValue('#nps-monthly', 5000));
  const currentAge = Math.min(84, Math.max(18, npsValue('#nps-current-age', 30)));
  const exitAge = Math.min(85, Math.max(currentAge + 1, npsValue('#nps-exit-age', 60)));
  const annualReturn = Math.min(20, Math.max(1, npsValue('#nps-return', 10)));
  const annuityShare = Math.min(100, Math.max(20, npsValue('#nps-annuity-share', 40)));
  const annuityRate = Math.min(15, Math.max(1, npsValue('#nps-annuity-rate', 6)));
  const months = Math.round((exitAge - currentAge) * 12);
  const monthlyRate = annualReturn / 1200;
  const corpus = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const contributed = monthly * months;
  const annuityCorpus = corpus * annuityShare / 100;
  const lumpSum = corpus - annuityCorpus;
  const pension = annuityCorpus * annuityRate / 100 / 12;
  const lumpShare = 100 - annuityShare;

  document.querySelector('#nps-current-age').value = currentAge;
  document.querySelector('#nps-exit-age').value = exitAge;
  document.querySelector('#nps-annuity-share').value = annuityShare;
  document.querySelector('#nps-return-badge').textContent = `${annualReturn.toFixed(2)}%`;
  document.querySelector('#nps-contributed').textContent = npsMoney.format(contributed);
  document.querySelector('#nps-corpus').textContent = npsMoney.format(corpus);
  document.querySelector('#nps-growth').textContent = npsMoney.format(Math.max(0, corpus - contributed));
  document.querySelector('#nps-lump-sum').textContent = npsMoney.format(lumpSum);
  document.querySelector('#nps-annuity-corpus').textContent = npsMoney.format(annuityCorpus);
  document.querySelector('#nps-monthly-pension').textContent = npsMoney.format(pension);
  document.querySelector('#nps-lump-tax-note').textContent = lumpShare > 60 ? `${lumpShare}% illustrated; current tax exemption is limited to 60% of total corpus.` : `${lumpShare}% of estimated corpus; up to 60% is tax-exempt under current law.`;
  document.querySelector('#nps-estimate-note').textContent = `${months} end-of-month contributions over ${exitAge - currentAge} years. The ${annualReturn.toFixed(1)}% return and ${annuityRate.toFixed(1)}% annuity rate are assumptions, not promises. Charges, tax, market movement and actual annuity quotes can change the result.`;
}

npsForm.addEventListener('submit', event => { event.preventDefault(); calculateNps(); });
npsForm.addEventListener('input', calculateNps);
calculateNps();
