const pfForm=document.querySelector('#pf-form');
const money=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});

function futureValue(monthly,annualRate,months){
  const rate=annualRate/1200;
  if(!rate)return monthly*months;
  return monthly*((Math.pow(1+rate,months)-1)/rate)*(1+rate);
}

function value(id){return Math.max(0,Number(document.querySelector(id).value)||0)}

function updateProvidentEstimate(event){
  if(event)event.preventDefault();
  const employeeEpf=value('#pf-employee');
  const vpf=value('#pf-vpf');
  const employerEpf=value('#pf-employer');
  const ppf=value('#pf-ppf');
  const years=Math.min(40,Math.max(1,value('#pf-years')));
  const epfRate=Math.min(20,value('#pf-epf-rate'));
  const ppfRate=Math.min(20,value('#pf-ppf-rate'));
  const months=Math.round(years*12);
  const epfMonthly=employeeEpf+vpf+employerEpf;
  const epfCorpus=futureValue(epfMonthly,epfRate,months);
  const ppfCorpus=futureValue(ppf,ppfRate,months);
  const totalContribution=(epfMonthly+ppf)*months;
  const employeeContribution=(employeeEpf+vpf+ppf)*months;
  document.querySelector('#pf-total-contributed').textContent=money.format(totalContribution);
  document.querySelector('#pf-employee-contributed').textContent=money.format(employeeContribution);
  document.querySelector('#pf-epf-corpus').textContent=money.format(epfCorpus);
  document.querySelector('#pf-ppf-corpus').textContent=money.format(ppfCorpus);
  document.querySelector('#pf-total-corpus').textContent=money.format(epfCorpus+ppfCorpus);
  document.querySelector('#pf-growth').textContent=money.format(Math.max(0,epfCorpus+ppfCorpus-totalContribution));
  document.querySelector('#pf-epf-rate-badge').textContent=`${epfRate.toFixed(2)}%`;
  document.querySelector('#pf-estimate-note').textContent=`Illustration for ${years} year${years===1?'':'s'}. It assumes unchanged monthly contributions and rates; actual EPF declarations, PPF quarterly rates, contribution timing, EPS allocation and tax can change the result.`;
}

pfForm.addEventListener('submit',updateProvidentEstimate);
pfForm.addEventListener('input',updateProvidentEstimate);
updateProvidentEstimate();
