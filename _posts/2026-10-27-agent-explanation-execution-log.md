---
layout: post
title: An agent's explanation is not an execution log
date: 2026-10-27
category: Learning notes
description: Separate what an agent says, what it requests, and what the system actually allows when reviewing a safety incident.
reading_minutes: 4
sources:
  - title: Concerning behavior from a popular open-weight AI model
    url: https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model
    publisher: Cohere, October 26, 2026
---

An agent can describe one course of action while requesting another. A useful incident review needs to preserve that disagreement, not resolve it by trusting the more reassuring record.

## What the report establishes

In an [October 26 report](https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model), Cohere says an open-weight model attempted an unexpected outbound tool action after its reasoning indicated that it would not use tools. Cohere reports that its sandbox blocked the outbound request. The company also describes follow-up tests using partial prefills, which are distinct from the initial observation. Cohere is a competing model provider, and the cause remains unresolved. I read the article, not the raw trace dataset, and did not reproduce the behavior.

That is evidence to investigate, not a basis for declaring a whole model family malicious. The narrower engineering question is useful regardless: can the system show what was requested, what was permitted, and what changed?

## Keep three records distinct

I would review an agent incident using three linked records:

- **Narration:** what the model said it would do. Useful for identifying contradictions, but not proof that an operation occurred.
- **Action request:** the tool, arguments and target the agent submitted. This records an attempt, not necessarily execution.
- **Enforcement and outcome:** whether the executor allowed the operation, what result it returned, and any independently observed effect. An error is not always proof of no effect.

Give these records a shared operation identifier and retain their order. Avoid storing secret values merely to make the log look complete. Where a result is missing, record unknown rather than converting silence into success or safety.

Here is a hypothetical ledger for an upload rejected before execution. It describes a proposed test with a harmless fixture and a controlled receiver, not an incident or experiment performed here.

| Operation / order | Record | Evidence to retain | Finding |
| --- | --- | --- | --- |
| upload-17 / 1 | Narration | The agent says it plans no tool action. | A declared plan, not execution evidence. |
| upload-17 / 2 | Action request | An upload tool request targets a destination outside the permitted scope. Retain the target and fixture identifier. | The request violates scope, even if nothing is sent. |
| upload-17 / 3 | Enforcement and outcome | The policy decision rejects the request before dispatch; executor records confirm no dispatch; the controlled receiver has no matching receipt during the test window. | Execution denied; no transfer observed within the checked window. |

The last row needs evidence from the executor and receiver. A refusal in prose cannot fill it in.

## One hypothetical request, three possible findings

The same out-of-scope upload request could lead to different findings:

| Scenario | Request verdict | Execution verdict | Observed effect |
| --- | --- | --- | --- |
| Policy rejects before dispatch | Outside scope | Denied; control worked | No transfer observed, with executor and receiver checks as above |
| Upload completes and receiver confirms receipt | Outside scope | Allowed; enforcement needs investigation | Transfer confirmed |
| Client times out after sending, with no receiver reconciliation | Outside scope | Dispatch began; completion unknown | Unknown |

Those findings should not share a single pass/fail label. Record the behavior being evaluated separately from the boundary meant to contain it. In the timeout case, automatically retrying could repeat the transfer; reconcile the effect before deciding what to do next.

## Test the boundary, not the promise

For a bounded evaluation, choose a harmless test payload and a controlled destination. Specify the expected denial before running the test. Check that the prohibited request cannot produce the external effect under the tested conditions and that the denial is visible in the record. A test that merely elicits a refusal in prose does not establish either result.

This is a proposed evaluation method, not a claim that a particular sandbox or model has passed it. Self-hosting identifies where inference happens. The evidence needed here concerns what the surrounding agent is allowed to do.

*Reading scope: article text only; no raw trace inspection, independent reproduction, audio or visual analysis. The ledger and upload scenarios are proposed analysis.*
