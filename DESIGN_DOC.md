# Kipon Ads Manager — Google Ads API Design Document

**Company:** Kipon
**Website:** https://kipon.io
**Contact:** joao@kipon.io
**Date:** March 2026

---

## 1. Tool Overview

**Kipon Ads Manager** is an internal command-line tool built by Kipon to programmatically manage Google Ads campaigns for the company's own consulting services.

The tool is used exclusively by Kipon's internal marketing team to create, monitor, and optimize campaigns that promote two B2B consulting offerings:

- **Skill Mapping Consulting** — helps HR and People leaders map employee skills and identify gaps
- **Humans + AI Agents Consulting** — helps operations leaders integrate AI agents into business workflows

---

## 2. Business Context

Kipon is a Brazilian B2B consulting company. Our clients are mid-to-large companies in Tech, Fintech, and Digital sectors. Our primary marketing channel is Google Search Ads driving traffic to dedicated landing pages.

The Google Ads API is used to:
- Create and configure campaigns programmatically from code
- Manage ad groups, keywords, and ad copy in a structured, version-controlled way
- Monitor campaign performance via API queries
- Apply optimization changes without manual UI work

---

## 3. Technical Architecture

```
[Internal CLI Tool]
       |
       v
[google-ads-api Node.js library]
       |
       v
[Google Ads API v23]
       |
       v
[Google Ads Manager Account: 153-614-2544]
       |
       v
[Client Account: kipon — 185-103-7564]
```

**Stack:**
- Runtime: Node.js (TypeScript)
- Library: `google-ads-api` (npm)
- Authentication: OAuth2 with refresh token (Desktop App flow)
- Execution: Manual, run by internal team member

---

## 4. API Usage

### Operations performed via API:

| Operation | Purpose |
|---|---|
| `Campaign.create` | Create search campaigns with defined budgets |
| `AdGroup.create` | Create ad groups per audience segment |
| `Ad.create` | Create responsive search ads |
| `Keyword.create` | Add targeted keywords with match types |
| `customer.query (GAQL)` | Monitor impressions, clicks, cost |

### Data accessed:
- Own account data only (Kipon's campaigns)
- No third-party or client account data
- No PII collected or stored

---

## 5. Access Scope

- **Who uses it:** Internal Kipon team only (1-2 people)
- **Accounts managed:** Only Kipon's own Google Ads accounts
- **No external users**, no clients, no resale
- **No automation or bulk actions** beyond Kipon's own campaigns

---

## 6. Security & Compliance

- Credentials stored locally in `.env` file, not committed to version control
- OAuth2 refresh token scoped to `https://www.googleapis.com/auth/adwords`
- Tool runs locally on team member's machine, not hosted on any server
- No data exported or shared with third parties

---

## 7. Intended Use Summary

This tool is built for internal use to replace manual Google Ads UI work with a code-driven workflow. It manages a small number of campaigns (2-4) for Kipon's own consulting services, with a combined budget of approximately R$40/day (~$8 USD/day).

The API access requested is **Basic Access** to manage our own non-test accounts.
