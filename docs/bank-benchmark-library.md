# FinsightOne — Bank-wise Benchmark Library
**Version 1.0 · June 2026**  
Reference for analysts and n8n workflows. Machine-readable version: `bank-benchmark-library.json`

---

## HOW TO READ THIS

Each bank section shows:
- **Benchmarks** — the thresholds used to assign Green / Amber / Red in Module 3A
- **Interest rates** — current market rates for rate negotiation briefs (Module 4C)
- **Enhancement timing** — best months to approach, months to avoid
- **Credit culture** — how this bank's credit managers actually think
- **Negotiation note** — what works when asking for a rate reduction

Traffic light logic: **Green** = within benchmark · **Amber** = approaching limit · **Red** = breached benchmark

---

## FALLBACK DEFAULTS

Use these when the client's specific bank is not listed below.

| Ratio | PSU Default | Private Default | NBFC Default |
|---|---|---|---|
| DSCR minimum | 1.25 | 1.20 | 1.10 |
| DSCR comfortable | 1.50 | 1.40 | 1.30 |
| CC utilisation — flag | 75% | 75% | 80% |
| CC utilisation — concern | 85% | 85% | 90% |
| Debtor days max | 60 days | 60 days | 75 days |
| Debtor days amber | 45 days | 50 days | 60 days |
| Creditor days range | 15–45 days | 10–45 days | 10–60 days |
| Drawing Power coverage | DP ≥ Limit | DP ≥ Limit | DP ≥ 90% of Limit |
| Turnover vs GST match | ≥ 90% | ≥ 88% | ≥ 85% |
| Bureau score minimum | 700 | 700 | 680 |
| Bureau score comfortable | 730 | 720 | 700 |
| Cheque returns — amber | 1 | 1 | 2 |
| Cheque returns — red | 3 | 2 | 4 |
| Bureau enquiries — amber | 2 | 2 | 3 |
| Bureau enquiries — red | 4 | 3 | 5 |
| Typical MSME rate | 12.50% | 11.75% | 16.00% |

**Drawing Power Formula (standard):**  
`DP = 75% of stock + 75% of debtors under 90 days − creditors`

---

## PSU BANKS

### State Bank of India (SBI)

| Ratio | Threshold | Notes |
|---|---|---|
| DSCR minimum | **1.33** | Stricter than most PSU banks |
| DSCR comfortable | 1.50 | Lead with this in meetings |
| CC utilisation flag | 75% | Automated flag in their system |
| Bureau score minimum | 700 | Below 700 — near-certain rejection |
| Bureau score comfortable | 725 | |
| Turnover vs GST | ≥ 90% | Checked during processing |

**Rates:** 11.15% – 13.65% · Typical MSME: 12.50% · Linked to MCLR + 2.50%

**Best approach months:** May, June, October, November  
**Avoid:** March, September (balance sheet months — maximum conservatism)

**Credit culture:** Most conservative PSU bank. Heavy weight on ITR consistency, DSCR, and zero cheque returns. Processing time 4–8 weeks. Branch RM drafts internal note — relationship with RM is essential. Limits above ₹25L go through MSME Processing Centre, not branch.

**Negotiation note:** MCLR-linked rates have limited negotiation room. However, for bureau 720+ with 5+ year vintage, 0.25–0.50% reduction is possible at renewal. Most effective lever: *"We are willing to route all primary business transactions through SBI."* PSU credit managers are explicitly rewarded for increasing transaction volume in MSME accounts.

**Common rejection reasons:** CC utilisation above 80% at review date · ITR income inconsistent with bank credits · Any cheque return in prior 12 months · Promoter score below 700 · DP below sanctioned limit

---

### Bank of Baroda

| Ratio | Threshold |
|---|---|
| DSCR minimum | 1.25 |
| CC utilisation flag | 75% |
| Bureau score minimum | 700 |

**Rates:** 11.00% – 13.50% · Typical: 12.25%

**Best months:** May, October · **Avoid:** March, September

**Credit culture:** Moderately conservative. Slightly more open than SBI on DSCR for established customers. Active MSME book growth target — more willing to approve borderline cases than SBI. Baroda MSME Sulabh branches process faster (3–6 weeks).

**Negotiation note:** BoB has been competitive on MSME rates to gain market share. Bureau 715+ can negotiate to 11.50–12.00%.

---

### Punjab National Bank

**Rates:** 11.25% – 13.75% · Typical: 12.75%  
**Best months:** June, November · **Avoid:** March

**Credit culture:** Conservative. Slower processing than BoB. Strong in North India MSME sector. Branch manager has more discretion than SBI — relationship matters more here.

---

### Canara Bank

**Rates:** 11.00% – 13.50% · Typical: 12.25%  
**Best months:** May, October · **Avoid:** March, September

**Credit culture:** Strong in South India MSME sector. Good for manufacturing businesses. Moderately conservative.

---

### Union Bank of India

**Rates:** 11.15% – 13.65% · Typical: 12.50%  
**Best months:** May, October

Uses PSU_DEFAULT benchmarks. Bureau minimum: 695 (slightly more lenient).

---

## PRIVATE BANKS

### HDFC Bank

| Ratio | Threshold | Notes |
|---|---|---|
| DSCR minimum | **1.20** | Lower than PSU — more flexible |
| CC utilisation flag | 75% | Auto-flag in their system |
| CC utilisation concern | 85% | Triggers enhanced monitoring |
| Bureau score minimum | **700** | Below 700 — automated rejection |
| Bureau score comfortable | 720 | |
| Turnover vs GST | ≥ 88% | |
| Cheque returns red | **2** | Stricter than PSU on this |

**Rates:** 10.75% – 13.00% · Typical: 11.75% · RLLR-linked

**Best approach months:** January, February, July, August  
**Avoid:** March, December (year-end book management)

**Credit culture:** Fully data-driven. Automated bureau and utilisation triggers. CC above 80% gets auto-flagged. Bureau below 700 rarely gets manual override. Fast approvals (5–10 business days for clean files). Less relationship-weight than PSU — data is the relationship. Limits up to ₹5Cr processed at branch level.

**Negotiation note:** HDFC negotiates on rate for bureau 720+ clients. They respond to competitor rate quotes — cite ICICI or Axis rates calmly. Do not frame it as a threat. Phrase: *"We have received indicative rates from ICICI at 11.25%. We prefer to stay with HDFC given our relationship — can we match this?"*

**Common rejection reasons:** Bureau below 700 · CC utilisation above 85% at review date · Any cheque return in prior 6 months · GST mismatch above 12%

---

### ICICI Bank

| Ratio | Threshold |
|---|---|
| DSCR minimum | 1.20 |
| CC utilisation flag | 75% |
| Bureau score minimum | 700 |
| Bureau score comfortable | 720 |

**Rates:** 10.50% – 12.75% · Typical: 11.50% — **lowest rates among large banks**

**Best months:** January, July, August · **Avoid:** March, December

**Credit culture:** Most aggressive of large private banks for MSME customer acquisition. Willing to match competitor rates. Strong digital bureau integration — flags are instant. Fast processing. DP formula: 80% of debtors (vs 75% for most banks).

**Negotiation note:** Most negotiation-friendly bank overall. Bureau 720+ with clean utilisation can get 10.75–11.25%. ICICI actively competes with HDFC — use HDFC quote as leverage here.

---

### Axis Bank

| Ratio | Threshold |
|---|---|
| DSCR minimum | 1.20 |
| CC utilisation flag | 75% |
| Bureau score minimum | 700 |
| Bureau score comfortable | 720 |

**Rates:** 10.75% – 13.00% · Typical: 11.75%

**Best months:** February, August · **Avoid:** March, September

**Credit culture:** Balanced between data and relationship. More flexible than HDFC on DSCR for established customers. Responds well to long banking vintage (5+ years). Dedicated SME RM for limits above ₹1Cr. Processing: 7–14 days.

**Negotiation note:** Axis responds to vintage-based loyalty. *"We have been with Axis for 7 years with zero returns."* 5+ year customers with clean record can achieve 0.25–0.50% below standard rate.

---

### Kotak Mahindra Bank

| Ratio | Threshold | Notes |
|---|---|---|
| DSCR minimum | 1.25 | Stricter than other private banks |
| CC utilisation flag | **70%** | Lower threshold — watch this |
| Bureau score minimum | **710** | Higher bar than HDFC/ICICI |
| Bureau score comfortable | 730 | |

**Rates:** 11.00% – 13.50% · Typical: 12.25%

**Credit culture:** Conservative for a private bank. Higher bureau expectation. Good for high-income professional MSME owners. Selective about sectors (prefers services, IT, professionals). Less negotiation-friendly — maintains standard rates.

---

### IndusInd Bank

| Ratio | Threshold |
|---|---|
| DSCR minimum | 1.20 |
| Bureau score minimum | 695 |
| CC utilisation flag | 80% |

**Rates:** 11.25% – 14.00% · Typical: 12.50%

**Credit culture:** Aggressive MSME growth targets. More flexible on bureau and collateral. Good option for businesses needing faster approval or with bureau 695–710 who cannot get HDFC/ICICI.

---

### IDFC First Bank

| Ratio | Threshold |
|---|---|
| DSCR minimum | 1.15 |
| Bureau score minimum | 690 |
| CC utilisation flag | 80% |
| Turnover vs GST | ≥ 85% |

**Rates:** 11.50% – 15.00% · Typical: 13.00%

**Credit culture:** Growth-oriented digital bank. More flexible criteria, slightly higher rates. Good for growing businesses that need faster decisions.

---

### Yes Bank

⚠️ **Analyst note:** Advise clients to keep Yes Bank as secondary bank only. Do not recommend building primary banking relationship with Yes Bank currently.

**Rates:** 11.50% – 14.50% · Typical: 13.00%  
Bureau minimum: 700 · DSCR minimum: 1.25 · CC utilisation flag: 75%

**Credit culture:** Rebuilding MSME book post-2020 restructuring. Stricter on documentation. Higher rates. Relationship manager quality varies significantly by branch.

---

## NBFCs

### General NBFC Guidance

NBFCs are for clients who cannot get bank approval or need faster funds. Always pair NBFC recommendation with a 12–18 month plan to refinance to a bank CC. Rate differential is 4–8% above PSU banks — expensive but accessible.

### Bajaj Finance

**Rates:** 14% – 22% · Typical: 17%  
Bureau minimum: 685 · DSCR minimum: 1.10 · Fully digital underwriting · 24–72 hour approval

### Tata Capital

**Rates:** 13.50% – 19% · Typical: 16.50%  
Bureau minimum: 690 · More conservative than Bajaj · Better for larger MSME working capital where banks are slow.

### Ugro Capital

**Rates:** 15% – 24% · Typical: 18%  
Bureau minimum: 675 · Sector-focused (8 MSME sectors) · Uses GST data heavily · Good for newer businesses.

### Lendingkart Finance

⚠️ **Analyst note:** Last resort only. Rates are very high (15–27%). Only recommend for urgent bridge needs. Always pair with a refinancing plan.

**Rates:** 15% – 27% · Typical: 19%  
Digital-only · Cash flow-based · No physical documents · Approval in hours.

---

## CURRENT MARKET RATES — June 2026

*For MSME clients: bureau score 700–750 · 3+ year banking vintage · clean repayment record*

| Bank | Product | Rate Range | Profile Required |
|---|---|---|---|
| ICICI Bank | Working Capital OD | 10.50% – 12.00% | CIBIL 730+, ₹2Cr+ turnover |
| HDFC Bank | CC / OD | 10.75% – 12.25% | CIBIL 720+, clean 12 months |
| Axis Bank | CC (MSME) | 10.75% – 12.50% | CIBIL 720+, 5yr vintage preferred |
| SBI | Cash Credit | 11.15% – 13.65% | CIBIL 700+, ITR consistent |
| Bank of Baroda | CC (MSME) | 11.00% – 13.50% | CIBIL 700+, clean repayment |
| Kotak Mahindra | Business OD | 11.00% – 13.50% | CIBIL 710+, professional promoter |
| IndusInd Bank | Working Capital CC | 11.25% – 14.00% | CIBIL 695+, flexible collateral |
| IDFC First Bank | Business CC | 11.50% – 15.00% | CIBIL 690+, growth-stage MSME |

---

## DRAWING POWER FORMULA BY BANK TYPE

| Bank | Stock % | Debtors % | Debtor Age Cutoff |
|---|---|---|---|
| SBI / PSU default | 75% | 75% | 90 days |
| HDFC Bank | 75% | 80% | 90 days |
| ICICI Bank | 75% | 80% | 90 days |
| Axis Bank | 75% | 75% | 90 days |
| Kotak Mahindra | 75% | 75% | 90 days |
| NBFC default | 70% | 70% | 120 days |

**Formula:** `DP = (Stock × %) + (Eligible Debtors × %) − Creditors`  
DP must equal or exceed the sanctioned CC limit. If DP < Limit, bank has grounds to reduce the limit at renewal.

---

## ENHANCEMENT APPROACH CALENDAR — ALL BANKS

| Bank | Best Window | Avoid | Reason |
|---|---|---|---|
| SBI | May–June, Oct–Nov | Mar, Sep | Post-half-year credit reviews, fresh targets |
| Bank of Baroda | May, Oct | Mar, Sep | Same as SBI |
| PNB / Canara | Jun, Nov | Mar | Slightly offset from SBI cycle |
| HDFC Bank | Jan–Feb, Jul–Aug | Mar, Dec | Half-year MSME book targets |
| ICICI Bank | Jan, Jul–Aug | Mar, Dec | Relationship manager targets reset |
| Axis Bank | Feb, Aug | Mar, Sep | SME book review cycle |
| Kotak Mahindra | Feb, Aug | Mar, Dec | Conservative — needs time to process |
| NBFCs | Any time | — | Target-driven throughout year |

---

*FinsightOne Bank Benchmark Library v1.0 · June 2026 · Internal Use Only*  
*Update rates and thresholds quarterly. Verify with current RBI circulars for regulatory changes.*
