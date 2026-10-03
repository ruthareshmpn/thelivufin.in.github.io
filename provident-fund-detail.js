const fundForm=document.querySelector('#fund-form');
const inr=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
function field(id){return Math.max(0,Number(document.querySelector(id)?.value)||0)}
function estimate(event){
  if(event)event.preventDefault();
  const monthly=field('#fund-monthly');
  const opening=field('#fund-opening');
  const years=Math.min(45,Math.max(1,field('#fund-years')));
  const rate=Math.min(20,field('#fund-rate'));
  const months=Math.round(years*12);
  const monthlyRate=rate/1200;
  const recurring=monthlyRate?monthly*((Math.pow(1+monthlyRate,months)-1)/monthlyRate)*(1+monthlyRate):monthly*months;
  const corpus=opening*Math.pow(1+monthlyRate,months)+recurring;
  const contributed=opening+monthly*months;
  document.querySelector('#fund-contributed').textContent=inr.format(contributed);
  document.querySelector('#fund-corpus').textContent=inr.format(corpus);
  document.querySelector('#fund-growth').textContent=inr.format(Math.max(0,corpus-contributed));
  document.querySelector('#fund-rate-badge').textContent=`${rate.toFixed(2)}%`;
  document.querySelector('#fund-note').textContent=`Illustration for ${years} year${years===1?'':'s'} using a constant ${rate.toFixed(2)}% annual assumption and beginning-of-month deposits. Actual crediting rules and future rates can differ.`;
}
fundForm?.addEventListener('submit',estimate);
fundForm?.addEventListener('input',estimate);
estimate();
