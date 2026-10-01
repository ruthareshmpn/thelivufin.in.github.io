const poMoney = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const poSchemes = {
  savings: {
    short: 'Savings Account', name: 'Post Office Savings Account', rate: 4, rateLabel: '4.00%', amountLabel: 'Account balance', defaultAmount: 100000,
    terms: [{ value: 1, label: '1 year illustration' }], frequency: 'Annual credit · variable rate',
    summary: 'A Government small-savings transaction account with annual interest credit and flexible access.',
    audience: 'Individuals seeking a basic savings account with access to deposits and withdrawals under scheme rules.',
    deposit: 'Maintain an eligible account balance. Monthly interest calculations depend on the qualifying balance window.',
    interest: 'Calculated from eligible monthly balances and credited annually. The Government-notified rate can change.',
    access: 'Ongoing account rather than a fixed maturity product.',
    prematureLabel: 'Flexible access', penaltyLabel: 'No fixed-term penalty', loanLabel: 'Not available',
    premature: 'Withdrawals are available during the life of the account, and the account holder may close the account at any time using the prescribed closure process.',
    penalty: 'There is no premature-maturity penalty because this is not a fixed-term deposit. Normal account-balance and service-charge rules can still apply.',
    loan: 'No separate loan-against-deposit facility is provided under this savings-account scheme; the balance itself remains withdrawable.',
    accessSource: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=163'
  },
  rd: {
    short: 'Recurring Deposit', name: '5-year Recurring Deposit', rate: 6.7, rateLabel: '6.70%', amountLabel: 'Monthly deposit', defaultAmount: 1000,
    terms: [{ value: 5, label: '5 years · 60 deposits' }], frequency: 'Quarterly compounding',
    summary: 'Build a maturity amount through equal monthly contributions over a standard five-year term.',
    audience: 'Savers who prefer a fixed monthly habit instead of investing one lump sum.',
    deposit: 'A fixed amount is deposited every month for 60 months, subject to the scheme rules.',
    interest: 'Each instalment compounds quarterly for its remaining time. Earlier deposits earn for longer.',
    access: 'Standard maturity is five years; premature closure and loan rules are governed by the scheme.',
    prematureLabel: 'After three years', penaltyLabel: 'Savings-account interest rate', loanLabel: 'Up to 50% after one year',
    premature: 'Premature closure is permitted after three years from opening, subject to completion of any advance-deposit period.',
    penalty: 'On permitted premature closure, interest is recalculated as simple interest at the Post Office Savings Account rate.',
    loan: 'After one year, a loan of up to 50% of the account balance may be available. Scheme interest on the loan is two percentage points above the RD rate.',
    accessSource: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=165'
  },
  td: {
    short: 'Time Deposit', name: 'Post Office Time Deposit', rate: 6.9, rateLabel: '6.90%–7.50%', amountLabel: 'Investment amount', defaultAmount: 100000,
    terms: [{value:1,label:'1 year · 6.90%',rate:6.9},{value:2,label:'2 years · 7.00%',rate:7},{value:3,label:'3 years · 7.10%',rate:7.1},{value:5,label:'5 years · 7.50%',rate:7.5}], frequency: 'Quarterly calculation · annual payout',
    summary: 'Lock a lump sum for one, two, three or five years and receive interest annually.',
    audience: 'Investors seeking a Government small-savings term deposit with a defined opening rate.',
    deposit: 'One lump-sum deposit at opening. Select from the available one-, two-, three- or five-year terms.',
    interest: 'Calculated quarterly and payable annually. Unclaimed annual interest does not earn additional scheme interest.',
    access: 'Principal returns at maturity; premature withdrawal rules and reduced rates can apply.',
    prematureLabel: 'After six months', penaltyLabel: 'Reduced interest rate', loanLabel: 'No automatic scheme loan',
    premature: 'The deposit cannot be withdrawn during the first six months. It may be closed after six months under the scheme rules.',
    penalty: 'Closure between six and twelve months earns the Post Office Savings Account rate. Later closure uses the prescribed reduced rate; already-paid annual interest may be recovered.',
    loan: 'No automatic loan is built into the Time Deposit. Any pledge-based credit depends on whether the account and proposed lender meet the applicable rules.',
    accessSource: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=164'
  },
  mis: {
    short: 'Monthly Income', name: 'Monthly Income Account', rate: 7.4, rateLabel: '7.40%', amountLabel: 'Investment amount', defaultAmount: 100000,
    terms: [{ value: 5, label: '5 years' }], frequency: 'Monthly interest payout',
    summary: 'Convert a lump sum into a fixed monthly interest stream for five years.',
    audience: 'Eligible individuals seeking predictable monthly income rather than reinvested growth.',
    deposit: 'One lump sum, within the current individual or joint-account limits.',
    interest: 'Paid monthly. Payouts do not compound inside the account unless separately reinvested.',
    access: 'Principal returns after five years; early closure deductions can apply.',
    prematureLabel: 'After one year', penaltyLabel: '1%–2% of the deposit', loanLabel: 'Not available',
    premature: 'The account may be closed after one year from opening. Closure is not normally available during the first year.',
    penalty: 'A deduction of 2% of the deposit applies when closed on or before three years; after three years the deduction is 1%.',
    loan: 'The scheme does not provide a loan or overdraft against the Monthly Income Account deposit.',
    accessSource: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=166'
  },
  scss: {
    short: 'Senior Citizens Scheme', name: 'Senior Citizens Savings Scheme', rate: 8.2, rateLabel: '8.20%', amountLabel: 'Investment amount', defaultAmount: 100000,
    terms: [{ value: 5, label: '5 years' }], frequency: 'Quarterly interest payout',
    summary: 'A five-year quarterly-income scheme for applicants who meet the prescribed age or retirement conditions.',
    audience: 'Senior citizens and certain eligible retired applicants as defined by the official rules.',
    deposit: 'One lump sum within the scheme limit. Eligibility evidence is required at opening.',
    interest: 'Paid quarterly and not compounded within the SCSS account.',
    access: 'Five-year term with extension and premature-closure provisions under the scheme.',
    prematureLabel: 'Allowed with deductions', penaltyLabel: 'Interest recovery or 1%–1.5%', loanLabel: 'Not available',
    premature: 'The account can be closed before maturity. An extended account can be closed without deduction after one year from the extension date.',
    penalty: 'Before one year, paid interest is recovered. From one to under two years, 1.5% of the deposit is deducted; from two years onward, 1% is deducted.',
    loan: 'SCSS does not provide a loan or pledge facility against the deposit.',
    accessSource: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=168'
  },
  ppf: {
    short: 'Public Provident Fund', name: 'Public Provident Fund', rate: 7.1, rateLabel: '7.10%', amountLabel: 'Illustrative opening amount', defaultAmount: 100000,
    terms: [{ value: 15, label: '15 years' }], frequency: 'Monthly calculation · annual credit',
    summary: 'A long-term account with annual interest credit and a Government-notified rate that may change.',
    audience: 'Long-term savers who can work within annual deposit limits and withdrawal restrictions.',
    deposit: 'Contributions may be made during each financial year within the prescribed minimum and maximum.',
    interest: 'Calculated monthly on the qualifying balance and credited at financial year-end. Future rates can vary.',
    access: 'Normal maturity is 15 years, with extension, loan and partial-withdrawal rules.',
    prematureLabel: 'Restricted after five years', penaltyLabel: '1 percentage-point rate reduction', loanLabel: 'Available during early years',
    premature: 'One partial withdrawal per year is available after five years from the end of the opening financial year. Full premature closure after that period is restricted to specified medical, education or residency grounds.',
    penalty: 'For permitted premature closure, interest is recalculated at one percentage point below the rates credited since opening or the latest extension.',
    loan: 'A loan of up to 25% of the eligible earlier balance is available after one year but before five years from the end of the opening financial year. It carries 1% annual interest if repaid within 36 months; overdue repayment is charged at 6%.',
    accessSource: 'https://www.nsiindia.gov.in/writereaddata/SchemeRules/PublicProvidentFundSchemeRule.pdf'
  },
  ssa: {
    short: 'Sukanya Samriddhi', name: 'Sukanya Samriddhi Account', rate: 8.2, rateLabel: '8.20%', amountLabel: 'Annual contribution', defaultAmount: 100000,
    terms: [{ value: 21, label: '21 years from opening' }], frequency: 'Monthly calculation · financial-year credit',
    summary: 'A Government small-savings account for a girl child, with deposits permitted for 15 years and maturity 21 years from opening.',
    audience: 'A guardian may open one account for a resident girl child before she turns 10. Normally, accounts are limited to two eligible girls per family, subject to the scheme exceptions.',
    deposit: 'Deposit ₹250 to ₹1,50,000 in a financial year, in multiples of ₹50. Deposits are permitted for 15 years from opening; a default account can be regularised under the scheme rules.',
    interest: '8.20% for October–December 2026. Interest is calculated monthly on the lowest balance between the close of the fifth day and month-end, then credited after the financial year. The notified rate can change quarterly.',
    access: 'Matures 21 years from opening. Up to 50% of the preceding financial year-end balance may be withdrawn for higher education after age 18 or passing Class 10, whichever is earlier. Eligible marriage closure is available from age 18.',
    prematureLabel: 'Purpose- and event-based only', penaltyLabel: 'No flat penalty for permitted cases', loanLabel: 'Not available',
    premature: 'Higher-education withdrawal is limited to 50% of the preceding financial year-end balance and documented costs. Full closure is permitted for marriage from age 18, death, or qualifying compassionate grounds; compassionate closure normally requires five completed years.',
    penalty: 'There is no flat percentage penalty for a permitted marriage or compassionate closure. Eligibility, documents and timing are decisive; after death, the period until closure earns the Post Office Savings Account rate.',
    loan: 'The scheme does not provide a loan or allow the account to be pledged as security.',
    accessSource: 'https://www.nsiindia.gov.in/writereaddata/SchemeRules/SukanyaSamriddhiAccountSchemeRule.pdf'
  },
  nsc: {
    short: 'NSC', name: 'National Savings Certificate', rate: 7.7, rateLabel: '7.70%', amountLabel: 'Investment amount', defaultAmount: 100000,
    terms: [{ value: 5, label: '5 years' }], frequency: 'Annual compounding · maturity payout',
    summary: 'A five-year certificate account where interest compounds annually and is paid at maturity.',
    audience: 'Investors seeking fixed-at-opening compound growth over five years.',
    deposit: 'One investment at opening; additional investments are opened as separate certificate accounts.',
    interest: 'Compounded annually at the rate applicable when opened and paid with principal at maturity.',
    access: 'Five-year maturity; premature encashment is restricted to specified circumstances.',
    prematureLabel: 'Exceptional cases only', penaltyLabel: 'Reduced payout under scheme rules', loanLabel: 'Pledge facility available',
    premature: 'Early closure is not freely available. It is limited to death of an account holder, forfeiture by an eligible government pledgee, or a court order.',
    penalty: 'If an eligible closure occurs before one year, only principal is paid. From one to under three years, interest is limited to the Post Office Savings Account rate; later payment follows the prescribed premature-value table.',
    loan: 'The certificate may be pledged to an eligible bank or other permitted institution as security. The loan amount, rate and approval remain the lender’s decision.',
    accessSource: 'https://www.nsiindia.gov.in/writereaddata/SchemeRules/NationalSavingsCertificatesRule.pdf'
  },
  kvp: {
    short: 'Kisan Vikas Patra', name: 'Kisan Vikas Patra', rate: 7.5, rateLabel: '7.50%', amountLabel: 'Investment amount', defaultAmount: 100000,
    terms: [{ value: 115/12, label: '115 months · 9 years 7 months' }], frequency: 'Accumulated return · maturity payout',
    summary: 'A certificate account designed to double the invested amount over the currently notified 115-month term.',
    audience: 'Investors who want a Government small-savings maturity value and can hold for the notified term.',
    deposit: 'One lump-sum investment at opening.',
    interest: 'The current notified terms produce a doubling at maturity; no regular interest payout is made.',
    access: 'Matures after 115 months; premature encashment is subject to the official lock-in and value table.',
    prematureLabel: 'Normally after 2½ years', penaltyLabel: 'Prescribed early-value table', loanLabel: 'Pledge facility available',
    premature: 'Normal premature closure is available after two years and six months. Earlier closure is restricted to specified events such as death, eligible forfeiture by a pledgee, or a court order.',
    penalty: 'There is no single flat penalty. The amount paid is taken from the official premature-closure value table for the opening date and completed holding period, and will be below the maturity doubling value.',
    loan: 'KVP may be pledged or transferred as security to eligible banks and other permitted institutions. Loan approval, value and interest rate are set by the lender.',
    accessSource: 'https://www.nsiindia.gov.in/writereaddata/SchemeRules/KisanVikasPatra.pdf'
  }
};

const pageKey = poSchemes[document.body.dataset.scheme] ? document.body.dataset.scheme : 'savings';
const page = poSchemes[pageKey];
const root = document.querySelector('#scheme-page');

document.body.insertAdjacentHTML('afterbegin', `<header class="site-header"><nav class="nav shell" aria-label="Primary navigation"><a class="brand" href="index.html" aria-label="finclarity.in home"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 16h3v3H5zm5-5h3v8h-3zm5-5h3v13h-3" fill="currentColor"/></svg></span>finclarity.in</a><div class="nav-links"><a href="index.html">Explore</a><a href="rd.html">RD calculator</a><a href="fd.html">FD calculator</a><a class="active" href="index.html#post-office-schemes">Post Office schemes</a></div></nav></header>`);

root.innerHTML = `
  <section class="page-intro shell scheme-page-intro">
    <div class="breadcrumb"><a href="index.html">Passive income</a> &nbsp;/&nbsp; <a href="index.html#post-office-schemes">Post Office schemes</a> &nbsp;/&nbsp; ${page.short}</div>
    <p class="eyebrow">Post Office investment option</p><h1 id="scheme-title"></h1><p id="scheme-summary"></p>
  </section>
  <section class="scheme-workspace shell" aria-label="${page.name} estimator">
    <div class="scheme-main">
      <section class="scheme-estimator-card">
        <div class="scheme-estimator-head"><div><p class="eyebrow">Illustrative calculator</p><h2>Estimate this investment</h2></div><div class="current-rate"><span>Current rate</span><strong id="scheme-rate">—</strong></div></div>
        <form id="scheme-form" class="scheme-form"><label><span id="amount-label">Investment amount</span><div class="money-input"><span>₹</span><input id="scheme-amount" type="number" min="1" step="500"></div></label><div id="scheme-extra-field" hidden></div><label><span id="term-label">Term</span><select id="scheme-term"></select></label><button class="button" type="submit">Update estimate</button></form>
        <p class="estimate-note" id="estimate-note"></p><div class="scheme-results" aria-live="polite"><article><span id="result-one-label">Estimated maturity</span><strong id="result-one">—</strong><small id="result-one-note" hidden></small></article><article id="ssa-contributed-card" hidden><span>Total contributed</span><strong id="ssa-contributed">—</strong><small id="ssa-contributed-note"></small></article><article><span id="result-two-label">Estimated interest</span><strong id="result-two">—</strong><small id="result-two-note" hidden></small></article><article><span id="result-frequency-label">Interest treatment</span><strong id="result-frequency">—</strong></article><article id="ssa-withdrawal-card" hidden><span>Estimated education withdrawal</span><strong id="ssa-withdrawal">—</strong><small id="ssa-withdrawal-note"></small></article><article id="ssa-early-closure-card" hidden><span>Estimated marriage closure amount</span><strong id="ssa-early-closure">—</strong><small id="ssa-early-closure-note"></small></article></div>
      </section>
      <section class="scheme-information" aria-labelledby="details-title"><p class="eyebrow">Before you invest</p><h2 id="details-title">${page.name} details</h2><div class="scheme-facts"><article><span>Who it is for</span><p id="scheme-audience"></p></article><article><span>Deposit pattern</span><p id="scheme-deposit"></p></article><article><span>Interest and payout</span><p id="scheme-interest"></p></article><article><span>Access and maturity</span><p id="scheme-access"></p></article></div><div class="scheme-caution"><strong>Planning estimate only.</strong> Government rates can change for some schemes, and official rounding, deposit dates, premature closure, eligibility and tax rules can alter the outcome.</div><div class="scheme-actions"><a class="button" href="https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx" target="_blank" rel="noopener noreferrer">Open official India Post details ↗</a><a href="index.html#post-office-schemes">Compare all schemes →</a></div></section>
      <section class="scheme-information access-options" aria-labelledby="access-options-title"><p class="eyebrow">Access before maturity</p><h2 id="access-options-title">Withdrawals, penalties and borrowing</h2><p class="ssa-tax-intro">Check the exit rules before committing your money. A permitted withdrawal, a full premature closure and a loan against an investment are different facilities.</p><div class="access-option-grid"><article><span>Premature withdrawal or closure</span><strong>${page.prematureLabel}</strong><p>${page.premature}</p></article><article><span>Reduction or penalty</span><strong>${page.penaltyLabel}</strong><p>${page.penalty}</p></article><article><span>Loan against investment</span><strong>${page.loanLabel}</strong><p>${page.loan}</p></article></div><div class="scheme-caution"><strong>Important:</strong> The account office checks eligibility and documents. A bank or lender separately decides whether to grant a pledge-based loan and on what terms.</div><nav class="ssa-tax-links" aria-label="Official early-access reference"><a href="${page.accessSource}" target="_blank" rel="noopener noreferrer">Open official scheme rules ↗</a></nav></section>
      ${pageKey === 'ssa' ? `<section class="scheme-information ssa-tax-section" aria-labelledby="ssa-tax-title"><p class="eyebrow">Income-tax treatment</p><h2 id="ssa-tax-title">How Sukanya Samriddhi is taxed</h2><p class="ssa-tax-intro">SSA is commonly described as exempt–exempt–exempt, subject to the account rules and the income-tax law applicable to you.</p><div class="ssa-tax-grid"><article><span>Contribution · Section 80C</span><strong>Eligible within the combined ₹1.5 lakh limit</strong><p>A parent or legal guardian can claim eligible deposits under Section 80C. SSA shares the overall limit with other qualifying items; it is not an additional deduction. The deduction is generally relevant when using the old tax regime.</p></article><article><span>Interest</span><strong>Exempt</strong><p>Interest credited to an eligible SSA is exempt rather than added to taxable income.</p></article><article><span>Withdrawal and maturity · Section 10(11A)</span><strong>Eligible payments are exempt</strong><p>Payments from an account operated under the scheme rules, including eligible withdrawals and maturity proceeds, are exempt under Section 10(11A).</p></article><article><span>TDS</span><strong>No TDS on exempt SSA interest</strong><p>Because eligible SSA interest is exempt, it is not treated like taxable bank-deposit interest for TDS. Keep account statements and deposit evidence for your records.</p></article></div><div class="scheme-caution"><strong>Tax note:</strong> Eligibility depends on the applicable tax regime and current law. This page is educational and does not replace advice based on your return.</div><nav class="ssa-tax-links" aria-label="Official Sukanya references"><a href="https://wmstatic-prd.incometaxindia.gov.in/web/guest/w/threshold-limits-under-income-tax-act" target="_blank" rel="noopener noreferrer">Income Tax Department · Section 80C ↗</a><a href="https://www.incometaxindia.gov.in/w/section-10-56" target="_blank" rel="noopener noreferrer">Income Tax Act · Section 10(11A) ↗</a><a href="https://www.nsiindia.gov.in/writereaddata/SchemeRules/SukanyaSamriddhiAccountSchemeRule.pdf" target="_blank" rel="noopener noreferrer">NSI · 2019 scheme rules ↗</a><a href="https://dea.gov.in/budget-division/475" target="_blank" rel="noopener noreferrer">DEA · current rates ↗</a></nav></section>` : pageKey === 'nsc' ? `<section class="scheme-information ssa-tax-section" aria-labelledby="nsc-tax-title"><p class="eyebrow">Income-tax treatment</p><h2 id="nsc-tax-title">How National Savings Certificate is taxed</h2><p class="ssa-tax-intro">NSC provides an eligible Section 80C investment, but its interest is taxable. The deduction and annual interest reporting should be considered separately.</p><div class="ssa-tax-grid"><article><span>Initial investment · Section 80C</span><strong>Eligible within the combined ₹1.5 lakh limit</strong><p>The amount invested can qualify under Section 80C, within the overall limit shared with other eligible investments and payments. This deduction is generally relevant under the old tax regime.</p></article><article><span>Interest taxation</span><strong>Taxable as income from other sources</strong><p>Interest accrues annually even though it is paid at maturity. It should be included in taxable income according to the accounting method consistently followed for your return.</p></article><article><span>Years 1–4 interest</span><strong>Deemed reinvested and potentially eligible under Section 80C</strong><p>Interest accrued through the end of the fourth year is deemed reinvested in the certificate and may qualify for Section 80C, still within the same combined annual limit.</p></article><article><span>Fifth-year interest</span><strong>Taxable, with no reinvestment deduction</strong><p>The final year's interest is paid at maturity rather than reinvested, so it does not receive the reinvested-interest Section 80C treatment. Tax remains payable at your applicable slab rate.</p></article><article><span>Maturity proceeds</span><strong>Principal is not taxed again</strong><p>The original investment is a return of capital. The interest component is taxable; keeping the annual accrual certificate helps avoid reporting the same income twice.</p></article><article><span>TDS and filing</span><strong>Taxability does not depend on TDS</strong><p>Do not treat the absence of tax deduction as an exemption. Retain the certificate and annual interest-accrual statement and report taxable interest correctly in your return.</p></article></div><div class="scheme-caution"><strong>Tax note:</strong> Tax regime, accounting method and your other Section 80C claims affect the result. This page is educational and does not replace advice based on your tax return.</div><nav class="ssa-tax-links" aria-label="Official NSC tax references"><a href="https://www.incometaxindia.gov.in/w/deductions" target="_blank" rel="noopener noreferrer">Income Tax Department · deductions ↗</a><a href="https://www.incometaxindia.gov.in/w/section-80c-48" target="_blank" rel="noopener noreferrer">Income Tax Act · Section 80C ↗</a><a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=167" target="_blank" rel="noopener noreferrer">NSI · NSC scheme rules ↗</a></nav></section>` : pageKey === 'kvp' ? `<section class="scheme-information ssa-tax-section" aria-labelledby="kvp-tax-title"><p class="eyebrow">Income-tax treatment</p><h2 id="kvp-tax-title">How Kisan Vikas Patra is taxed</h2><p class="ssa-tax-intro">KVP offers Government-backed compound growth, but it does not provide an investment deduction or tax-free interest.</p><div class="ssa-tax-grid"><article><span>Initial investment · Section 80C</span><strong>No Section 80C deduction</strong><p>The amount invested in KVP does not qualify for the Section 80C deduction. This differs from eligible investments such as NSC, PPF and Sukanya Samriddhi.</p></article><article><span>Interest taxation</span><strong>Taxable as income from other sources</strong><p>The growth over the original deposit is interest income and is taxable at the investor's applicable slab rate. KVP interest is not tax-exempt.</p></article><article><span>Annual accrual</span><strong>Interest should be tracked as it accrues</strong><p>CBDT guidance states that KVP interest is assessed on an accrual basis. Keep an annual interest calculation or certificate so the accrued amount can be reported for each financial year.</p></article><article><span>Maturity proceeds</span><strong>Principal is not taxed again</strong><p>The original deposit is returned capital. The difference between that deposit and the maturity value is interest; amounts already reported annually should not be counted twice.</p></article><article><span>Premature closure</span><strong>Interest remains taxable</strong><p>If the account is closed early under the scheme rules, the applicable closure value determines the gain. The interest component remains taxable even though the maturity doubling target was not reached.</p></article><article><span>TDS and filing</span><strong>Tax liability is separate from withholding</strong><p>Do not treat an amount received without tax deduction as tax-free. Retain the deposit receipt, yearly accrual calculation and closure or maturity statement for your return.</p></article></div><div class="scheme-caution"><strong>Tax note:</strong> Your accounting method, tax slab and other income affect the final liability. This page is educational and does not replace advice based on your return.</div><nav class="ssa-tax-links" aria-label="Official KVP tax references"><a href="https://wmstatic-prd.incometaxindia.gov.in/documents/20117/42998/Circular-No-687-dated-19-8-1994_2026-01-13_04-29-51_cf6e23_Unknown.pdf/c7bc6950-1b30-91ac-d627-03bb76b88065?t=1774352267980&amp;version=1.0" target="_blank" rel="noopener noreferrer">Income Tax Department · CBDT Circular 687 ↗</a><a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=170" target="_blank" rel="noopener noreferrer">NSI · KVP scheme rules ↗</a><a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=56" target="_blank" rel="noopener noreferrer">NSI · KVP features ↗</a></nav></section>` : ''}
    </div>
  </section>`;

if (pageKey === 'scss') {
  document.querySelector('.scheme-main').insertAdjacentHTML('beforeend', `<section class="scheme-information ssa-tax-section" aria-labelledby="scss-tax-title"><p class="eyebrow">Income-tax treatment</p><h2 id="scss-tax-title">How Senior Citizens Savings Scheme is taxed</h2><p class="ssa-tax-intro">The deposit may provide an eligible investment deduction, but SCSS interest is taxable. Tax deducted at source is only a collection mechanism—it is not the final tax calculation.</p><div class="ssa-tax-grid"><article><span>Investment deduction</span><strong>Eligible within the combined ₹1.5 lakh savings limit</strong><p>An eligible SCSS deposit can be claimed within the overall savings-investment deduction limit. This benefit is generally relevant under the old tax regime; the same limit is shared with other qualifying investments.</p></article><article><span>Quarterly interest</span><strong>Fully taxable at the applicable slab rate</strong><p>Each quarterly payout is taxable as interest income, generally under “Income from other sources”. The interest is not exempt merely because SCSS is Government-backed.</p></article><article><span>Senior-citizen interest deduction</span><strong>Up to ₹50,000, when Section 80TTB applies</strong><p>A resident senior citizen using the eligible deduction framework may claim up to ₹50,000 against qualifying bank, co-operative-bank and post-office deposit interest in total. It is not an additional exemption for every account.</p></article><article><span>TDS threshold</span><strong>₹1,00,000 of annual interest</strong><p>For a resident senior citizen, the current Section 194A threshold for interest paid by a bank, co-operative bank or post office is ₹1 lakh in a financial year. Once applicable, TDS is normally 10% with a valid PAN and can be higher without PAN. The threshold does not make the interest tax-free.</p></article><article><span>Nil estimated tax</span><strong>Form 121—earlier Form 15H</strong><p>An eligible resident senior citizen whose estimated tax for the year is nil may give the prescribed declaration to the payer before interest is paid so that TDS is not deducted. Eligibility must be checked each year.</p></article><article><span>Maturity and early closure</span><strong>Normal principal return is not taxed again</strong><p>At normal maturity, the returned principal is not fresh income. If the account is closed before five years, the amount previously claimed as an investment deduction can become taxable in the closure year; interest already taxed is excluded from that reversal.</p></article></div><div class="scheme-caution"><strong>Tax note:</strong> Tax regime, residency, total interest across deposits and your other deductions affect the result. TDS can be claimed as credit in the income-tax return. This page is educational and does not replace advice based on your return.</div><nav class="ssa-tax-links" aria-label="Official SCSS tax references"><a href="https://www.incometaxindia.gov.in/w/deductions" target="_blank" rel="noopener noreferrer">Income Tax Department · deductions ↗</a><a href="https://wmstatic-prd.incometaxindia.gov.in/web/guest/w/threshold-limits-under-income-tax-act" target="_blank" rel="noopener noreferrer">Income Tax Department · TDS thresholds ↗</a><a href="https://www.incometaxindia.gov.in/documents/d/guest/form-121-faqs" target="_blank" rel="noopener noreferrer">Income Tax Department · Form 121 ↗</a><a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=168" target="_blank" rel="noopener noreferrer">NSI · SCSS rules ↗</a></nav></section>`);
}

document.body.insertAdjacentHTML('beforeend', `<footer><div class="footer-row shell"><span>© 2026 finclarity.in</span><span>Educational information only — not financial advice.</span></div></footer>`);

const termSelect = document.querySelector('#scheme-term');
const amountInput = document.querySelector('#scheme-amount');
const extraField = document.querySelector('#scheme-extra-field');

function selectedKey() { return pageKey; }
function compound(principal, rate, years, periods = 1) { return principal * Math.pow(1 + rate / 100 / periods, periods * years); }
function rdMaturity(monthly, rate, months) { const q = rate / 400; return monthly * ((Math.pow(1 + q, months / 3) - 1) / (1 - Math.pow(1 + q, -1 / 3))); }
function ssaBalanceAtYears(annualContribution, rate, contributionPattern, totalYears, withdrawalYear = null, withdrawalAmount = 0) {
  let balance = 0;
  let accruedInterest = 0;
  const monthlyContribution = annualContribution / 12;
  for (let month = 0; month < totalYears * 12; month += 1) {
    if (withdrawalYear !== null && month === withdrawalYear * 12) balance = Math.max(0, balance - withdrawalAmount);
    if (month < 15 * 12) {
      if (contributionPattern === 'monthly') balance += monthlyContribution;
      else if (month % 12 === 0) balance += annualContribution;
    }
    accruedInterest += balance * (rate / 100 / 12);
    if (month % 12 === 11) {
      balance += Math.round(accruedInterest);
      accruedInterest = 0;
    }
  }
  return balance + accruedInterest;
}

function renderScheme() {
  const key = selectedKey();
  const scheme = poSchemes[key];
  document.querySelector('#scheme-title').textContent = scheme.name;
  document.querySelector('#scheme-summary').textContent = scheme.summary;
  document.querySelector('#scheme-rate').textContent = scheme.rateLabel;
  document.querySelector('#amount-label').textContent = scheme.amountLabel;
  document.querySelector('#scheme-audience').textContent = scheme.audience;
  document.querySelector('#scheme-deposit').textContent = scheme.deposit;
  document.querySelector('#scheme-interest').textContent = scheme.interest;
  document.querySelector('#scheme-access').textContent = scheme.access;
  termSelect.innerHTML = scheme.terms.map(item => `<option value="${item.value}">${item.label}</option>`).join('');
  amountInput.value = scheme.defaultAmount;
  if (key === 'ssa') {
    document.querySelector('#scheme-form').classList.add('ssa-form');
    amountInput.min = '250';
    amountInput.max = '150000';
    amountInput.step = '50';
    document.querySelector('#term-label').textContent = 'Contribution pattern';
    termSelect.innerHTML = '<option value="annual">Annual · deposit before the 5th</option><option value="monthly">Monthly · deposit before the 5th</option>';
    extraField.hidden = false;
    extraField.className = 'ssa-extra-fields';
    extraField.innerHTML = `<label><span>Girl child's age when starting</span><div class="age-input"><input id="ssa-start-age" type="number" min="0" max="9" step="1" value="0"><span>years</span></div></label><fieldset class="ssa-option"><label class="ssa-check"><input id="ssa-include-withdrawal" type="checkbox" checked><span>Include education withdrawal</span></label><label><span>Planned education withdrawal age</span><div class="age-input"><input id="ssa-withdrawal-age" type="number" min="18" max="20" step="1" value="18"><span>years</span></div></label></fieldset><fieldset class="ssa-option"><label class="ssa-check"><input id="ssa-include-marriage" type="checkbox" checked><span>Include marriage pre-closure</span></label><label><span>Planned marriage closure age</span><div class="age-input"><input id="ssa-marriage-age" type="number" min="18" max="20" step="1" value="20"><span>years</span></div></label></fieldset>`;
  }
  calculateScheme();
}

function calculateScheme() {
  const key = selectedKey();
  const scheme = poSchemes[key];
  const enteredAmount = Number(amountInput.value) || scheme.defaultAmount;
  const amount = key === 'ssa' ? Math.min(150000, Math.max(250, enteredAmount)) : Math.max(1, enteredAmount);
  const selectedTerm = scheme.terms[termSelect.selectedIndex] || scheme.terms[0];
  const years = Number(selectedTerm.value);
  const rate = selectedTerm.rate || scheme.rate;
  let oneLabel = 'Estimated maturity', twoLabel = 'Estimated interest', one = 0, two = 0, note = '';

  if (key === 'rd') {
    one = rdMaturity(amount, rate, 60); two = one - amount * 60;
    note = `${poMoney.format(amount)} deposited monthly for 60 months.`;
  } else if (key === 'td') {
    const annualPayout = amount * (Math.pow(1 + rate / 400, 4) - 1);
    oneLabel = 'Principal + total payouts'; twoLabel = 'Annual interest payout';
    one = amount + annualPayout * years; two = annualPayout;
    note = `Annual payouts shown separately; they do not compound inside the TD.`;
  } else if (key === 'mis') {
    const monthly = amount * rate / 100 / 12;
    oneLabel = 'Estimated monthly income'; twoLabel = 'Total 5-year interest';
    one = monthly; two = monthly * 60;
    note = `${poMoney.format(amount)} principal is returned at maturity, subject to the scheme terms.`;
  } else if (key === 'scss') {
    const quarterly = amount * rate / 100 / 4;
    oneLabel = 'Estimated quarterly income'; twoLabel = 'Total 5-year interest';
    one = quarterly; two = quarterly * 20;
    note = `${poMoney.format(amount)} principal is returned at maturity, subject to the scheme terms.`;
  } else if (key === 'ssa') {
    const ageInput = document.querySelector('#ssa-start-age');
    const withdrawalAgeInput = document.querySelector('#ssa-withdrawal-age');
    const marriageAgeInput = document.querySelector('#ssa-marriage-age');
    const includeWithdrawalInput = document.querySelector('#ssa-include-withdrawal');
    const includeMarriageInput = document.querySelector('#ssa-include-marriage');
    const includeWithdrawal = includeWithdrawalInput?.checked ?? true;
    const includeMarriage = includeMarriageInput?.checked ?? true;
    const startAge = Math.min(9, Math.max(0, Number(ageInput?.value) || 0));
    const latestWithdrawalAge = startAge + 20;
    const withdrawalAge = Math.min(latestWithdrawalAge, Math.max(18, Number(withdrawalAgeInput?.value) || 18));
    const withdrawalYearsFromOpening = withdrawalAge - startAge;
    const marriageAge = Math.min(latestWithdrawalAge, Math.max(18, Number(marriageAgeInput?.value) || Math.min(21, latestWithdrawalAge)));
    const marriageYearsFromOpening = marriageAge - startAge;
    const contributionPattern = termSelect.value === 'monthly' ? 'monthly' : 'annual';
    const precedingYearBalance = ssaBalanceAtYears(amount, rate, contributionPattern, Math.max(0, withdrawalYearsFromOpening - 1));
    const withdrawalLimit = precedingYearBalance * 0.5;
    const finalYearsFromOpening = includeMarriage ? marriageYearsFromOpening : 21;
    const withdrawalApplied = includeWithdrawal && withdrawalYearsFromOpening < finalYearsFromOpening;
    const estimatedWithdrawal = withdrawalApplied ? withdrawalLimit : 0;
    const contributionYears = Math.min(15, finalYearsFromOpening);
    const contributed = amount * contributionYears;
    one = ssaBalanceAtYears(amount, rate, contributionPattern, finalYearsFromOpening, withdrawalApplied ? withdrawalYearsFromOpening : null, estimatedWithdrawal);
    two = one + estimatedWithdrawal - contributed;
    oneLabel = includeMarriage ? 'Estimated marriage closure' : includeWithdrawal ? 'Maturity after withdrawal' : 'Estimated maturity';
    twoLabel = 'Total estimated interest';
    amountInput.value = String(amount);
    if (ageInput) ageInput.value = String(startAge);
    if (withdrawalAgeInput) {
      withdrawalAgeInput.max = String(latestWithdrawalAge);
      withdrawalAgeInput.value = String(withdrawalAge);
      withdrawalAgeInput.disabled = !includeWithdrawal;
    }
    if (marriageAgeInput) {
      marriageAgeInput.max = String(latestWithdrawalAge);
      marriageAgeInput.value = String(marriageAge);
      marriageAgeInput.disabled = !includeMarriage;
    }
    includeWithdrawalInput?.closest('.ssa-option')?.classList.toggle('is-disabled', !includeWithdrawal);
    includeMarriageInput?.closest('.ssa-option')?.classList.toggle('is-disabled', !includeMarriage);
    document.querySelector('#ssa-contributed-card').hidden = false;
    document.querySelector('#ssa-contributed').textContent = poMoney.format(contributed);
    document.querySelector('#ssa-contributed-note').textContent = contributionYears < 15 ? `${contributionYears} contribution years before closure` : 'Deposits continue for the 15-year contribution period';
    document.querySelector('#result-one-note').hidden = false;
    document.querySelector('#result-one-note').textContent = includeMarriage ? `Full projected balance paid when the account closes at age ${marriageAge}` : includeWithdrawal ? `Balance remaining at normal maturity after the education withdrawal` : 'Projected balance at normal 21-year maturity';
    document.querySelector('#result-two-note').hidden = false;
    document.querySelector('#result-two-note').textContent = `Final payout${withdrawalApplied ? ' + education withdrawal' : ''} − total contributions`;
    document.querySelector('#ssa-withdrawal-card').hidden = false;
    document.querySelector('#ssa-withdrawal').textContent = includeWithdrawal ? withdrawalApplied ? poMoney.format(estimatedWithdrawal) : 'Not applied' : 'Not included';
    document.querySelector('#ssa-withdrawal-note').textContent = includeWithdrawal ? withdrawalApplied ? `Year ${withdrawalYearsFromOpening} after opening · age ${withdrawalAge} · 50% cap` : 'The account closes before or at the selected withdrawal age' : 'Enable the checkbox to include this option';
    document.querySelector('#ssa-early-closure-card').hidden = false;
    document.querySelector('#ssa-early-closure').textContent = includeMarriage ? poMoney.format(one) : 'Not included';
    document.querySelector('#ssa-early-closure-note').textContent = includeMarriage ? `Year ${marriageYearsFromOpening} after opening · age ${marriageAge}${withdrawalApplied ? ' · after education withdrawal' : ''}` : 'Enable the checkbox to include pre-closure';
    const depositDescription = contributionPattern === 'monthly' ? poMoney.format(amount / 12) + ' before the 5th of each month' : 'one deposit at the start of each 12-month cycle';
    note = `${poMoney.format(amount)} per financial year, modelled as ${depositDescription}. ${includeMarriage ? `Contributions stop when the account closes in year ${marriageYearsFromOpening}, so total contributed is limited to ${contributionYears} years.` : 'Contributions continue for 15 years.'}${withdrawalApplied ? ` The education withdrawal uses 50% of the modelled balance one year before age ${withdrawalAge}; the official limit uses the preceding financial year-end balance and cannot exceed documented education costs.` : ''}${includeMarriage ? ` Marriage closure at age ${marriageAge} requires age proof and must fall within the official marriage-date window.` : ''} The current 8.20% rate is assumed throughout only for illustration, although notified rates can change quarterly.`;
    document.querySelector('#result-frequency-label').textContent = includeMarriage ? 'Planned closure age' : "Child's age at maturity";
    scheme.frequency = includeMarriage ? `${marriageAge} years` : `${startAge + 21} years`;
  } else if (key === 'kvp') {
    one = amount * 2; two = amount;
    note = `Current notified maturity is 115 months.`;
  } else {
    one = compound(amount, rate, years, 1); two = one - amount;
    if (key === 'savings' || key === 'ppf') note = `Illustration assumes the current ${rate.toFixed(2)}% rate stays unchanged; actual future rates can vary.`;
  }

  if (key !== 'ssa') document.querySelector('#result-frequency-label').textContent = 'Interest treatment';

  document.querySelector('#result-one-label').textContent = oneLabel;
  document.querySelector('#result-two-label').textContent = twoLabel;
  document.querySelector('#result-one').textContent = poMoney.format(one);
  document.querySelector('#result-two').textContent = poMoney.format(two);
  document.querySelector('#result-frequency').textContent = scheme.frequency;
  document.querySelector('#estimate-note').textContent = note;
}

termSelect.addEventListener('change', calculateScheme);
extraField.addEventListener('input', calculateScheme);
document.querySelector('#scheme-form').addEventListener('submit', event => { event.preventDefault(); calculateScheme(); });
renderScheme();
