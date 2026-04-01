---
name: full-code-review
description: 'Perform a full senior-level code review focused on correctness, security, performance, API contract quality, regressions, and test gaps. Use when asked for full review, production readiness review, or architecture-level quality checks.'
argument-hint: 'Scope to review (e.g., entire project, API only, auth flow, specific folder)'
user-invocable: true
---

# Full Code Review

## What This Skill Produces

A production-oriented review report with prioritized findings and concrete fixes.

## When To Use

Use this skill when the user asks for:
- full code review
- senior review
- production readiness review
- security/performance review
- API contract and status code review

## Review Standard

Always prioritize findings over summary.
Order findings by severity:
1. Critical
2. High
3. Medium
4. Low

For each finding include:
- file path and line
- issue
- risk/impact
- concrete fix

## Procedure

1. Define scope.
- If scope is unclear, default to entire backend/API first, then expand.
- Confirm whether review should include frontend folders.

2. Build context.
- Inspect controllers, DTOs, entities, data layer, migrations, auth, and startup config.
- Identify public vs admin endpoints and authorization boundaries.

3. Validate correctness.
- Check nullability handling, update logic, soft/hard delete behavior, and concurrency assumptions.
- Check edge cases: missing fields, invalid payloads, empty updates, and status code consistency.

4. Validate security.
- Verify auth/role protection on sensitive endpoints.
- Look for overexposure of internal fields in response DTOs.
- Check token/claims handling, refresh flow, and error leakage.

5. Validate performance and scalability.
- Verify query shape (`AsNoTracking`, projection to DTO, pagination strategy).
- Detect potential N+1 or unbounded query patterns.
- Check pagination limits and overflow risks.

6. Validate data model and migrations.
- Compare entity types with migration history.
- Detect runtime mismatch risks (e.g., type migrations with existing data).

7. Validate API contract quality.
- Ensure proper status codes (`200/201/204/400/401/403/404/409`).
- Ensure response shape consistency between similar endpoints.
- Prefer DTO responses over raw entities.

8. Review tests and gaps.
- Identify missing high-value tests for critical flows and regressions.

9. Produce output.
- Start with findings list sorted by severity.
- Then list assumptions/open questions.
- End with a short prioritized remediation plan.

## Decision Rules

- If no critical issues are found: explicitly state that.
- If evidence is incomplete: mark as assumption and ask one focused follow-up question.
- If multiple fixes are possible: recommend the smallest safe change first.

## Completion Checklist

A review is complete only if all are covered:
- correctness
- security
- performance
- API contract/status codes
- migrations/data consistency
- test gaps

## Output Template

Use this structure:

1. Findings
- [Severity] path:line - issue
- Risk
- Fix

2. Open Questions / Assumptions

3. Short Change Plan (prioritized)
