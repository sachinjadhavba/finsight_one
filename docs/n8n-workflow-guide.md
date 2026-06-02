# FinsightOne — n8n Workflow Guide
**Version 1.0 · June 2026**  
Complete workflow architecture for document intake, analysis, and report delivery.

---

## OVERVIEW — 3 WORKFLOWS

| Workflow ID | Name | Trigger | Output |
|---|---|---|---|
| FO-W01 | Document Intake & Validation | Email received at documents@finsightone.co | Validation JSON + client alert if docs missing |
| FO-W02 | Monthly Report Generation | Manual trigger / scheduled per client | Completed report PDF sent to client |
| FO-W03 | Monthly Document Request | Scheduled: 25th of each month | Document request email to all active clients |

---

## WORKFLOW FO-W01 — DOCUMENT INTAKE & VALIDATION

**Purpose:** Receives client document emails, extracts text from attachments, validates completeness, alerts team.

**Trigger:** Email received → Gmail trigger node (watch `documents@finsightone.co`)

```
NODE 1: Gmail Trigger
  — Watch: documents@finsightone.co
  — On: New email received
  — Output: email body, sender, subject, attachments list

NODE 2: Extract Attachments
  — For each attachment in email:
  — If PDF: extract text via PDF parser (use n8n PDF Extract node or Gotenberg)
  — If image/JPG: send to Claude Vision for OCR extraction
  — Combine all extracted text into single string
  — Output: {{extracted_document_text}}

NODE 3: Client Lookup
  — Search client tracking sheet (Google Sheets node)
  — Match by: sender email OR business name in subject
  — Output: {{client_record}} (client_id, plan_type, primary_bank, current_limit, etc.)
  — If no match: route to "New Client" branch (Node 3B)

NODE 3B: New Client Branch (if email not matched)
  — Send Slack/WhatsApp alert: "New document email from unknown sender — [email] — manual review needed"
  — Stop workflow

NODE 4: Claude — Module 1 (Document Intake & Validation)
  — HTTP Request to Anthropic API
  — Model: claude-sonnet-4-6
  — System prompt: [Master Prompt Library — System Prompt]
  — User prompt: [Master Prompt Library — Module 1]
  — Variables to inject:
      {{client_name}} from client record
      {{business_name}} from client record
      {{primary_bank}} from client record
      {{current_limit}} from client record
      {{plan_type}} from client record
      {{loan_type}} from client record
      {{extracted_document_text}} from Node 2
  — Output: intake_validation JSON

NODE 5: Parse Validation JSON
  — Extract: intake_complete, missing_critical, documents_found, documents_missing, next_step

NODE 6: Route by Validation Result
  — If next_step = "proceed_to_analysis":
      → Node 7A: Update client record (docs received, date, doc list)
      → Node 7B: Send confirmation to client
      → Node 7C: Trigger FO-W02 (Report Generation) — pass client_id and extracted_document_text
  — If next_step = "request_missing_documents":
      → Node 8A: Send targeted missing-doc request to client
      → Node 8B: Alert team on Slack

NODE 7A: Google Sheets — Update Client Record
  — Sheet: FinsightOne Clients
  — Update: docs_received_date, docs_list, status = "docs_received"

NODE 7B: Gmail — Send Confirmation to Client
  — Template: "We have received your documents. Report ready by [date]."
  — Date = today + 2 days (Credit Watch) or today + 3 days (Business Health/Premium)

NODE 7C: Trigger FO-W02
  — Pass: client_id, plan_type, extracted_document_text

NODE 8A: Gmail — Missing Document Request
  — Template: Template 3 from onboarding checklist
  — Insert ONLY the specific missing document(s) — not full list

NODE 8B: Slack Alert
  — Channel: #finsightone-ops
  — Message: "⚠️ Missing docs for [Client Name] ([Plan]): [missing_documents list]"
```

---

## WORKFLOW FO-W02 — MONTHLY REPORT GENERATION

**Purpose:** Runs full analysis and generates report for one client. Can be triggered automatically from FO-W01 or manually.

**Trigger:** Manual (or called from FO-W01 Node 7C) · Input: client_id

```
NODE 1: Load Client Data
  — Google Sheets: fetch full client record by client_id
  — Load: client_name, business_name, primary_bank, current_limit, plan_type, loan_type,
           prior_bureau_score, prior_actions_json, months_since_last_enhancement,
           last_enhancement_amount, annual_turnover, cc_renewal_date
  — Also load: bank benchmark object from bank-benchmark-library.json
      → Match primary_bank to JSON key → fallback to PSU/PRIVATE/NBFC_DEFAULT

NODE 2: Load Documents
  — Retrieve extracted_document_text from FO-W01 output (passed as parameter)
  — OR: load from Google Drive folder for this client (if re-running manually)

NODE 3: BRANCH BY PLAN TYPE
  ├── Credit Watch → Jump to Credit Watch Branch
  ├── Business Health → Jump to Business Health Branch
  └── Premium → Jump to Premium Branch

─────────────────────────────────────────────────────────────
CREDIT WATCH BRANCH
─────────────────────────────────────────────────────────────

NODE CW-1: Claude — Module 2 (Credit Watch Analysis)
  — Inject all variables from Node 1 + Node 2
  — Output: credit_watch_json

NODE CW-2: Anti-Hallucination Validation
  — Claude call: Master Prompt Library — Anti-Hallucination Safeguard
  — Input: credit_watch_json
  — Output: validation_result {validation_passed, flags, safe_to_proceed}

NODE CW-3: Route on Validation
  — safe_to_proceed = true → Node CW-4
  — safe_to_proceed = false → Alert team on Slack → STOP (manual review required)

NODE CW-4: Render HTML Report
  — Load credit-watch-report-template.html
  — Replace all {{placeholders}} with values from credit_watch_json
  — Output: rendered HTML string

NODE CW-5: Generate PDF
  — Send HTML to Gotenberg (PDF generation service)
  — Output: PDF file

NODE CW-6: Quality Gate
  — For first 100 reports: Slack message with PDF attached → wait for human approval
  — After 100 reports: auto-proceed
  — On approval: Node CW-7

NODE CW-7: Send Report to Client
  — Gmail: send PDF to client email
  — WhatsApp: send notification via WhatsApp Business API
  — Update Google Sheets: report_sent_date, report_month

─────────────────────────────────────────────────────────────
BUSINESS HEALTH BRANCH
─────────────────────────────────────────────────────────────

NODE BH-1: Claude — Module 2 (Credit Watch signals)
  — Same as CW-1 — reuse for the bank alerts section
  — Output: credit_watch_json

NODE BH-2: Claude — Module 3A (8-Ratio Dashboard)
  — Inject: extracted_document_text + bank_benchmarks_json + client variables
  — Output: ratio_analysis_json

NODE BH-3: Claude — Module 3B (Enhancement Readiness Score)
  — Inject: ratio_analysis_json + client variables
  — Output: enhancement_score_json

NODE BH-4: Claude — Module 3C (Fix-It Action)
  — Inject: ratio_analysis_json + enhancement_score_json + prior_actions_json
  — Output: fix_it_action_json

NODE BH-5: Claude — Module 3D (12-Month Calendar)
  — Inject: client variables + enhancement_score_json + ratio_analysis_json
  — Output: calendar_json

NODE BH-6: Anti-Hallucination Validation
  — Run validation on: ratio_analysis_json + fix_it_action_json
  — Output: validation_result

NODE BH-7: Route on Validation
  — Fail → Slack alert → STOP for manual review
  — Pass → Node BH-8

NODE BH-8: Render HTML Report
  — Load business-health-report-template.html
  — Inject all JSON outputs into template sections
  — Output: rendered HTML

NODE BH-9: Generate PDF

NODE BH-10: Human Review Gate (mandatory for first 100 reports)
  — Slack: post PDF + summary to #finsightone-review
  — Wait for approval reaction (✅ emoji) from team member
  — On approval: Node BH-11

NODE BH-11: Send Report to Client
  — Gmail + WhatsApp notification
  — Update Google Sheets

─────────────────────────────────────────────────────────────
PREMIUM BRANCH
─────────────────────────────────────────────────────────────

NODE PR-1 to PR-5: Same as BH-1 to BH-5
  — Run all Business Health modules first

NODE PR-6: Claude — Module 4A (Bank-Specific Strategy)
  — Inject: ratio_analysis_json + enhancement_score_json + bank_profile_json + client variables
  — Output: bank_strategy_json

NODE PR-7: Claude — Module 4B (Banker Meeting Script)
  — Inject: ratio_analysis_json + bank_strategy_json + enhancement_score_json
  — Output: meeting_script_json

NODE PR-8: Claude — Module 4C (Rate Negotiation Brief)
  — Inject: client rate data + market_rates_json + client bureau + DSCR
  — Output: rate_negotiation_json

NODE PR-9: Claude — Module 4D (10-Question Mock Q&A)
  — Inject: ratio_analysis_json + bank_strategy_json + business_type + known_issues
  — Output: mock_qa_json

NODE PR-10: Anti-Hallucination Validation
  — Run on all JSON outputs

NODE PR-11: Render HTML Report
  — Load premium-report-template.html
  — Inject all 8 JSON outputs

NODE PR-12: Generate PDF

NODE PR-13: Human Review Gate (mandatory for ALL Premium reports — not just first 100)
  — Assigned expert reviews:
      — Ratio calculations correct?
      — Meeting script is specific to this client's numbers?
      — Mock Q&A questions match this client's actual weak areas?
      — Rate negotiation figures are current?
  — Expert can edit any section via Google Doc before final PDF generation
  — On approval: Node PR-14

NODE PR-14: Send Report + Expert Note
  — Gmail: report PDF + 1–2 sentence expert note
  — WhatsApp: notification
  — Update Google Sheets
```

---

## WORKFLOW FO-W03 — MONTHLY DOCUMENT REQUEST

**Purpose:** On the 25th of each month, automatically send document request emails to all active clients.

**Trigger:** Schedule trigger → 25th of each month, 9:00 AM IST

```
NODE 1: Google Sheets — Load Active Clients
  — Filter: status = "active"
  — Output: list of all active client records

NODE 2: Loop Over Clients
  — For each client:

NODE 2A: Determine Document List
  — Switch by plan_type:
      Credit Watch → short document list
      Business Health → full document list
      Premium → full + extras document list

NODE 2B: Calculate Deadline Date
  — Deadline = 3rd of next month
  — Report ready = 8th of next month

NODE 2C: Gmail — Send Document Request
  — Template: Monthly Recurring Email from onboarding checklist
  — Personalise: client name, plan, document list, deadline date

NODE 2D: WhatsApp — Send Reminder
  — Short message: "Hi [Name], time to send your [Month] documents for your FinsightOne report.
    Please email to documents@finsightone.co by [3rd]. Reply here if you need help."

NODE 2E: Update Google Sheets
  — Log: doc_request_sent_date for this month

NODE 3: Slack Alert to Team
  — "Monthly document requests sent to [N] clients. Next step: watch for incoming docs."
```

---

## GOOGLE SHEETS SCHEMA — CLIENT TRACKING

**Sheet name:** `FinsightOne Clients`

| Column | Field | Type | Notes |
|---|---|---|---|
| A | client_id | Text | FO-2026-0001 format |
| B | client_name | Text | Promoter full name |
| C | business_name | Text | |
| D | business_type | Text | Manufacturer / Trader / Services etc. |
| E | gstin | Text | |
| F | primary_bank | Text | Must match bank-benchmark-library.json key |
| G | current_limit | Number | In lakhs |
| H | loan_type | Text | CC / OD / Term / LAP |
| I | plan_type | Text | Credit Watch / Business Health / Premium |
| J | assigned_expert | Text | Premium only |
| K | status | Text | active / paused / churned |
| L | payment_date | Date | |
| M | next_renewal_date | Date | |
| N | client_email | Email | |
| O | whatsapp_number | Text | With country code |
| P | prior_bureau_score | Number | Updated monthly |
| Q | prior_actions_json | JSON | Last month's fix-it action — for Module 3C |
| R | months_since_last_enhancement | Number | Updated manually when client reports enhancement |
| S | last_enhancement_amount | Number | In lakhs |
| T | annual_turnover | Number | In lakhs — updated from ITR each year |
| U | cc_renewal_date | Date | When CC limit renews with bank |
| V | doc_request_sent_date | Date | Last request sent |
| W | docs_received_date | Date | Last docs received |
| X | report_sent_date | Date | Last report sent |
| Y | report_month | Text | Last report month |
| Z | notes | Text | Any manual notes |

---

## CLAUDE API CONFIGURATION

**Model:** `claude-sonnet-4-6` for all modules  
**Max tokens per call:** 4,000 (sufficient for all modules)  
**Temperature:** 0 (deterministic — financial analysis must not vary randomly)  
**API endpoint:** `https://api.anthropic.com/v1/messages`

**n8n HTTP Request node setup:**
```
Method: POST
URL: https://api.anthropic.com/v1/messages
Headers:
  x-api-key: {{$credentials.anthropicApiKey}}
  anthropic-version: 2023-06-01
  content-type: application/json
Body:
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 4000,
  "temperature": 0,
  "system": "[System Prompt from Master Prompt Library]",
  "messages": [
    {
      "role": "user",
      "content": "[Module Prompt with variables injected]"
    }
  ]
}
```

**Extract JSON from Claude response:**  
Add n8n Code node after each Claude call:
```javascript
const response = $input.first().json;
const text = response.content[0].text;
// Claude may wrap JSON in markdown code blocks — strip them
const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
return [{ json: JSON.parse(cleaned) }];
```

---

## PDF GENERATION — GOTENBERG SETUP

Gotenberg is an open-source HTML-to-PDF microservice. Run via Docker on Railway (same platform as n8n).

**Railway deployment:**
```
Image: gotenberg/gotenberg:8
Port: 3000
```

**n8n HTTP Request to Gotenberg:**
```
Method: POST
URL: http://gotenberg:3000/forms/chromium/convert/html
Content-Type: multipart/form-data
Body:
  files[index.html]: [rendered HTML string]
  paperWidth: 8.27
  paperHeight: 11.69
  marginTop: 0
  marginBottom: 0
  marginLeft: 0
  marginRight: 0
Output: Binary (PDF file)
```

---

## ERROR HANDLING

**Claude API errors:**
- Rate limit (429) → Wait 60 seconds → Retry once → If fails again: Slack alert + manual queue
- Token limit exceeded → Log error + Slack alert (document may be too large — client to resubmit)
- Invalid JSON response → Run JSON extraction again → If fails: Slack alert + manual review

**Email parsing errors:**
- No attachments found → Send to client: "We received your email but could not find attachments. Please resend."
- PDF extraction fails → Try alternative parser → If both fail: Slack alert for manual extraction

**Validation failures:**
- Hallucination flag → STOP → Slack alert → Human review before sending
- Missing critical field → Re-run module with explicit instruction to fill the missing field → If fails: manual

**Slack alert format (all errors):**
```
🚨 FinsightOne Workflow Error
Client: [name] ([client_id])
Workflow: [FO-W01 / FO-W02 / FO-W03]
Node: [node name]
Error: [error description]
Action needed: [what human should do]
```

---

## IMPLEMENTATION SEQUENCE

Build in this order — each depends on the previous:

1. **FO-W03** first — simplest. Just Google Sheets + Gmail + WhatsApp. Test with 1 client.
2. **FO-W01** second — email trigger + document extraction + Module 1 validation.
3. **FO-W02 Credit Watch branch** — first full analysis workflow. Validate on a real client.
4. **FO-W02 Business Health branch** — add Modules 3A–3D after Credit Watch is stable.
5. **FO-W02 Premium branch** — add Modules 4A–4D last.
6. **Gotenberg PDF** — integrate after HTML reports are working correctly.

**Do not build all at once.** Test each stage on one real client before moving to the next.

---

## CREDENTIALS NEEDED IN n8n

| Credential | Type | Used In |
|---|---|---|
| Anthropic API Key | HTTP Header Auth | All Claude nodes |
| Gmail (documents@finsightone.co) | Gmail OAuth2 | FO-W01, FO-W02, FO-W03 |
| Google Sheets | Google OAuth2 | All workflows |
| Google Drive | Google OAuth2 | Document storage |
| WhatsApp Business API | HTTP Header Auth | FO-W02, FO-W03 |
| Gotenberg | HTTP (no auth) | FO-W02 PDF generation |
| Slack | Slack OAuth2 | All workflows (alerts) |

---

*FinsightOne n8n Workflow Guide v1.0 · June 2026 · Internal Use Only*
