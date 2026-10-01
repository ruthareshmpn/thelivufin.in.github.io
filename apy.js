const apyMoney = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const apyMonthlyTable = {
  18:[42,84,126,168,210],19:[46,92,138,183,228],20:[50,100,150,198,248],21:[54,108,162,215,269],22:[59,117,177,234,292],23:[64,127,192,254,318],24:[70,139,208,277,346],25:[76,151,226,301,376],26:[82,164,246,327,409],27:[90,178,268,356,446],28:[97,194,292,388,485],29:[106,212,318,423,529],30:[116,231,347,462,577],31:[126,252,379,504,630],32:[138,276,414,551,689],33:[151,302,453,602,752],34:[165,330,495,659,824],35:[181,362,543,722,902],36:[198,396,594,792,990],37:[218,436,654,870,1087],38:[240,480,720,957,1196],39:[264,528,792,1054,1318],40:[291,582,873,1164,1454]
};
const apyPensions = [1000,2000,3000,4000,5000];
const apyNomineeCorpus = [170000,340000,510000,680000,850000];
const apyAge = document.querySelector('#apy-age');
const apyForm = document.querySelector('#apy-form');

apyAge.innerHTML = Array.from({length:23}, (_,index) => 18 + index).map(age => `<option value="${age}"${age === 30 ? ' selected' : ''}>${age} years</option>`).join('');

function calculateApy() {
  const age = Number(apyAge.value);
  const pension = Number(document.querySelector('#apy-pension').value);
  const frequency = Number(document.querySelector('#apy-frequency').value);
  const pensionIndex = apyPensions.indexOf(pension);
  const monthly = apyMonthlyTable[age][pensionIndex];
  const years = 60 - age;
  const debit = monthly * frequency;
  const frequencyLabel = frequency === 1 ? 'Monthly auto-debit' : frequency === 3 ? 'Quarterly auto-debit' : 'Half-yearly auto-debit';

  document.querySelector('#apy-monthly').textContent = apyMoney.format(monthly);
  document.querySelector('#apy-debit').textContent = apyMoney.format(debit);
  document.querySelector('#apy-debit-label').textContent = frequencyLabel;
  document.querySelector('#apy-years').textContent = `${years} years`;
  document.querySelector('#apy-total').textContent = apyMoney.format(monthly * years * 12);
  document.querySelector('#apy-result-pension').textContent = `${apyMoney.format(pension)} / month`;
  document.querySelector('#apy-corpus').textContent = apyMoney.format(apyNomineeCorpus[pensionIndex]);
  document.querySelector('#apy-note').textContent = `Official monthly contribution for joining at age ${age} and selecting a ${apyMoney.format(pension)} guaranteed pension. The displayed ${frequencyLabel.toLowerCase()} is the monthly amount multiplied by ${frequency}; follow the exact debit communicated by the service provider.`;
}

apyForm.addEventListener('submit', event => { event.preventDefault(); calculateApy(); });
apyForm.addEventListener('change', calculateApy);
calculateApy();
