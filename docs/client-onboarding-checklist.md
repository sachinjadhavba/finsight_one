# FinsightOne — Client Onboarding Checklist
**Version 1.0 · June 2026**  
Use this for every new client from signup to first report delivery.

---

## STAGE 1 — SIGNUP & PLAN CONFIRMATION

**Triggered by:** Client submits eligibility check at finsightone.co/check

- [ ] Receive intake form submission (name, business, bank, current limit, loan type, plan interest)
- [ ] Confirm plan tier: Credit Watch / Business Health / Premium
- [ ] Send Plan Confirmation Email (template: `email-plan-confirmation.txt`)
- [ ] Collect payment (Razorpay link — send with confirmation email)
- [ ] On payment confirmation: create client record in tracking sheet
- [ ] Assign client ID: `FO-YYYY-XXXX` (e.g., FO-2026-0001)
- [ ] For Premium clients: assign dedicated expert from team roster, introduce via email within 24 hours

**Client record fields to capture:**
| Field | Source |
|---|---|
| Client ID | Auto-assigned |
| Full name (promoter) | Intake form |
| Business name | Intake form |
| Business type | Intake form |
| GSTIN | Intake form |
| Primary bank | Intake form |
| Current CC/OD limit | Intake form |
| Loan type | Intake form |
| Plan subscribed | Payment confirmation |
| Payment date | Razorpay |
| Report due date | Payment date + 5 working days |
| Client email | Intake form |
| WhatsApp number | Intake form |
| Assigned expert (Premium) | Internal assignment |

---

## STAGE 2 — DOCUMENT REQUEST

**Send within 24 hours of payment confirmation.**

### Credit Watch Plan — Minimum Documents Required

- [ ] Last **6 months bank statements** (PDF from bank — not screenshot) — all accounts where CC/OD is maintained
- [ ] Bureau report — CIBIL or Experian (if client has one; we pull bureau score from bank statement patterns if not available)
- [ ] **Optional but helpful:** GSTR-3B filing summary for last 6 months (screenshot from GST portal is fine)

*Note: Credit Watch can run on bank statements alone. Do not block report on missing bureau report.*

---

### Business Health Plan — Minimum Documents Required

- [ ] Last **12 months bank statements** — all business accounts (CC/OD account mandatory)
- [ ] Last **2 ITRs** — FY24 and FY25 (self-attested copy acceptable for first report)
- [ ] Latest **Balance Sheet + P&L** — FY25 (CA-certified preferred; provisional accepted)
- [ ] Latest **Stock Statement** — as of last month-end (if CC is stock-backed)
- [ ] **Debtor + Creditor Ageing** — as of last month-end (if available)
- [ ] Current **Sanction Letter** from bank (to confirm limit, rate, and security)
- [ ] GSTR-3B for last 12 months (portal screenshot or CA summary acceptable)

*If audited B/S not available: accept provisional + CA certificate and flag in report.*

---

### Premium Plan — Minimum Documents Required

All Business Health documents PLUS:

- [ ] **All bank statements** — including other banks (ICICI, HDFC etc. if they have multiple)
- [ ] **Loan repayment schedule** — for any term loans (to calculate DSCR accurately)
- [ ] **Top 5 customer list** with approximate annual billing (for meeting prep)
- [ ] **Any prior rejection letters** from banks (if applicable — helps tailor strategy)
- [ ] **Current interest rate** on CC (from sanction letter or latest bank communication)
- [ ] Preferred bank meeting date/window (for meeting script customisation)

---

## STAGE 3 — DOCUMENT COLLECTION FOLLOW-UP

**Day 1 after document request:** Send WhatsApp reminder if no documents received  
**Day 3:** Second WhatsApp + email reminder  
**Day 5:** Call client directly — offer to help them pull documents from their CA

**Common client difficulties and how to handle:**

| Problem | Solution |
|---|---|
| "I don't have PDF bank statements" | Ask them to log in to net banking → Statements → Download as PDF. Guide on WhatsApp if needed. |
| "My CA has the balance sheet" | Ask them to forward CA's email to our intake address, or ask CA to email us directly |
| "I don't know my CIBIL score" | Advise: download from app.cibil.com — free annual report. Or we can work without it for Credit Watch. |
| "Bank statement is too large for WhatsApp" | Direct them to email: documents@finsightone.co — no file size limit |
| "I don't have a stock statement" | For Credit Watch: skip. For Business Health: ask for latest purchase invoices as proxy. Flag in report. |
| "My ITR is not filed yet" | Accept provisional P&L + CA certificate. Flag in report: "ITR pending — ratios based on provisional accounts." |

---

## STAGE 4 — DOCUMENT RECEIPT & VALIDATION

**When documents arrive at documents@finsightone.co:**

- [ ] n8n workflow auto-triggers on email receipt
- [ ] Module 1 (Document Intake & Validation) runs automatically
- [ ] Review Module 1 output:
  - [ ] All critical documents present? → Proceed to analysis
  - [ ] Missing critical documents? → Send targeted request (not a generic "please send all documents")
- [ ] Log document receipt date in client record
- [ ] Confirm to client: *"We have received your documents. Your report will be ready by [date]."*

**Document storage:**
- File naming: `FO-2026-0001_bank-statement_HDFC_May2026.pdf`
- Store in: Google Drive folder → `Clients / FO-2026-0001 / Documents`
- Never store client documents in email — move to Drive immediately on receipt

---

## STAGE 5 — ANALYSIS & REPORT GENERATION

**Processing time targets:**
| Plan | Target | Maximum |
|---|---|---|
| Credit Watch | 48 hours from docs received | 72 hours |
| Business Health | 72 hours from docs received | 5 working days |
| Premium | 72 hours from docs received | 5 working days |

**Workflow:**
- [ ] Run n8n analysis workflow (see n8n-workflow-guide.md)
- [ ] Review Claude output — check for hallucination flags
- [ ] **For first 100 Business Health + Premium reports:** Human expert review before sending
  - Expert checks: ratio calculations, fix-it action quality, calendar accuracy
  - Expert can edit any section before report is finalised
- [ ] Generate PDF from HTML report template
- [ ] Quality check: does the report make sense for this specific client?

**Quality checklist before sending:**
- [ ] Client name and business name correct throughout
- [ ] Bank name matches client's actual bank
- [ ] All ratio values sourced from actual documents (not hallucinated)
- [ ] Fix-it action is specific — has rupee amount, named party, and deadline
- [ ] Enhancement readiness score verdict is consistent with ratio traffic lights
- [ ] No generic advice — every recommendation is specific to this client's numbers

---

## STAGE 6 — REPORT DELIVERY

- [ ] Send report PDF via email (template: `email-report-delivery.txt`)
- [ ] Send WhatsApp notification: *"Your [Month] FinsightOne report is ready — check your email."*
- [ ] For Premium clients: send personal note from assigned expert (1–2 sentences on the key finding)
- [ ] Log delivery date in client record
- [ ] Set reminder for next month's document request (25th of each month)

**Email subject line format:**  
`Your FinsightOne [Plan Name] Report — [Month Year] | [Business Name]`

---

## STAGE 7 — MONTHLY RECURRING CYCLE

**25th of each month:** Send document request for next month's report  
**Document deadline:** 3rd of following month  
**Report delivery:** By 8th of following month

**Monthly recurring email (send on 25th):**
> Subject: Your [Month+1] Documents — FinsightOne [Plan Name]
>
> Hi [Name],
>
> Time for your [Month+1] FinsightOne report. Please send the following to documents@finsightone.co by [3rd of month]:
>
> [Document list specific to their plan]
>
> The faster we receive documents, the earlier your report is ready. Questions? Reply to this email or WhatsApp us.

---

## STAGE 8 — RENEWAL & RETENTION

**Day 20 of subscription (first month):** Check-in call or WhatsApp — *"How did the first report feel? Any questions on the fix-it action?"*

**Day 25 of subscription:** Renewal reminder — *"Your [Plan] renews on [date]. Payment link below."*

**If client does not renew:**
- [ ] Send one follow-up 3 days after lapse
- [ ] Offer: *"If you would like a final summary of your progress since joining, we can send that free of charge."*
- [ ] Do not pursue aggressively — our reputation is built on quality, not pressure

**Upgrade triggers (suggest upgrade when):**
- Credit Watch client's CC utilisation has been above 75% for 3 months → suggest Business Health
- Business Health client has an upcoming enhancement meeting → suggest Premium for that month only
- Business Health client missed their fix-it action 2 months in a row → suggest Premium for expert accountability

---

## EMAIL TEMPLATES

### Template 1: Plan Confirmation + Document Request

```
Subject: Welcome to FinsightOne — Here's What to Send Next

Hi [Name],

Welcome to FinsightOne. Your [Credit Watch / Business Health / Premium] plan is confirmed.

To prepare your first report, please email the following documents to:
📧 documents@finsightone.co

[DOCUMENT LIST — insert plan-specific list from Stage 2]

A few things to keep in mind:
— PDF bank statements from net banking work best (screenshots lose data)
— WhatsApp is fine for smaller files. For large files (ITR, full statements), please use email
— If your CA has the balance sheet, they can email us directly at documents@finsightone.co

Once we receive your documents, your first report will be ready within [48 / 72 / 72] hours.

Questions? Reply to this email or WhatsApp us at +91 95794 53635.

— FinsightOne Team
```

---

### Template 2: Report Delivery

```
Subject: Your FinsightOne [Plan] Report — [Month Year] | [Business Name]

Hi [Name],

Your [Month Year] FinsightOne report is attached.

This month's key finding:
[One sentence — the most important thing from the report]

Your fix-it action for [Month]:
[One sentence — the exact action with deadline]

[PREMIUM ONLY:]
Your expert has reviewed this report and left a note in Section 9.

If you have questions on any section, reply to this email or WhatsApp us. We respond within 4 hours during business hours.

— FinsightOne Team

P.S. We'll send your [Next Month] document request on [25th].
```

---

### Template 3: Missing Documents Follow-Up

```
Subject: One More Document Needed — [Business Name] Report

Hi [Name],

We have received most of your documents — thank you.

We just need one more thing to complete your report:

[SPECIFIC DOCUMENT — be precise, not generic]

How to get it:
[Specific instruction — e.g., "Log in to net banking → Accounts → Download Statement → Select last 6 months → PDF"]

Please send to documents@finsightone.co at your earliest. Your report will be ready within 48 hours of receipt.

— FinsightOne Team
```

---

## QUICK REFERENCE — DOCUMENT REQUIREMENTS BY PLAN

| Document | Credit Watch | Business Health | Premium |
|---|---|---|---|
| Bank statements | 6 months | 12 months | 12 months (all banks) |
| ITR | Not required | Last 2 years | Last 2 years |
| Balance Sheet + P&L | Not required | Latest year | Latest year |
| Stock Statement | Not required | Latest month | Latest month |
| Debtor/Creditor Ageing | Not required | If available | Required |
| Sanction Letter | Not required | Required | Required |
| Loan Repayment Schedule | Not required | If term loan exists | Required |
| Bureau Report | Optional | Optional | Optional |
| GST Summary | Optional | Required | Required |
| Customer List (top 5) | Not required | Not required | Required |
| Prior Rejection Letters | Not required | Not required | If applicable |

---

*FinsightOne Client Onboarding Checklist v1.0 · June 2026 · Internal Use Only*
