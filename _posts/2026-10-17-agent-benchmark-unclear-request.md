---
layout: post
title: A better agent benchmark starts with an unclear request
date: 2026-10-17
category: Learning notes
description: Why agent evaluations should measure clarification, delivery, and verified outcomes separately.
reading_minutes: 4
sources:
  - title: "FDE-Gym: The Last Mile of AI Delivery, version 1"
    url: https://arxiv.org/abs/2610.22350v1
    publisher: Dongxu Yang and coauthors, October 15, 2026
  - title: Introducing Muse Spark Open
    url: https://research.meta.ai/blog/muse-spark-open
    publisher: Meta AI Research, October 15, 2026
---

An agent evaluation can accidentally give away the hardest part of the job: deciding what the job actually is.

Write a precise ticket, list the constraints, supply the acceptance tests, and you have already done substantial work for the agent. That is a useful way to test implementation. It leaves a different question open: what happens when the initial request is incomplete, or when satisfying it will not produce the outcome the requester needs?

I would put that question near the beginning of an agent evaluation, before choosing which model gets the highest score.

## What an unclear request reveals

[FDE-Gym, a preprint submitted on October 15](https://arxiv.org/abs/2610.22350v1), evaluates 95 delivery tasks adapted from customer projects. Agents work in simulated systems with scripted stakeholders. In its realistic setting, the best tested configuration resolved 14 tasks, using a threshold of at least 0.8 with no incident. Its mean score was 0.56.

The detail worth lingering on is smaller: on 23 tasks where that configuration obtained every key fact, only 10 reached normalized business uplift of at least 0.8. That uplift measure is distinct from the final score, which also accounts for stakeholder contact costs and incidents. Getting the information did not guarantee an effective delivery.

These results come from one task distribution and a specific experimental setup. They do not establish a ceiling for production agents or a comparison with human engineers; the paper says its human baseline is still being collected. The useful lesson is a measurement question, not a verdict on an entire field.

## Keep separate records of separate failures

My recommendation is to keep a short evidence record for each stage of an evaluation. A single success label makes it too easy to prescribe the wrong fix.

**Before the change:** What outcome is being sought? Which constraints are known, which are uncertain, and what evidence would resolve the uncertainty? Record whether the agent noticed that information was missing. An unsupported guess should remain visible even if it happens to produce a passing result.

**During the work:** Which questions actually changed a decision? Count the time and attention required from people, alongside tool and model costs. The target should be useful clarification. Asking about every possible detail can become its own way of failing to deliver.

**At delivery:** Did the implemented change work through the intended interface, on data it had not already seen? Was the observed outcome better than the unchanged baseline? Keep functional correctness and outcome improvement as separate entries. Both deserve evidence.

**After a problem:** Did the agent recognize the failure, limit its effects, and recover within its permissions? Record recovery cost separately. A successful retry should not erase an earlier unauthorized action or an avoidable disruption.

This is a proposed evaluation practice, not a claim that the paper has validated this exact checklist. Its purpose is diagnostic: help a team decide whether to improve instructions, information access, implementation, or verification.

## Test judgment without rewarding disobedience

There is a trap in celebrating agents that challenge the request. A benchmark can become a puzzle in which the correct strategy is always to distrust the person asking.

I would include ordinary requests that are already complete, alongside ambiguous ones. The agent should earn credit for noticing the difference. It should also have a way to propose a better scope and seek approval when needed. Discovering that another change might help does not grant permission to make it.

Keep a version with the missing information supplied, too. Comparing the two versions can help distinguish trouble discovering constraints from trouble acting on known constraints. Use the same environment and outcome checks, and inspect the individual runs rather than relying only on the average.

## Name the layer you measured

A separate announcement offers a useful reminder about measurement. In its [Muse Spark Open release post](https://research.meta.ai/blog/muse-spark-open), Meta reports 1.03–3.95× kernel-level speedups on NVIDIA and AMD GPUs, alongside a 3% end-to-end speedup on AMD MI350. Those are Meta's reported results at different measurement levels. The larger figure is not a whole-workflow speedup.

The same care belongs in agent evaluation. A better component score can be valuable without establishing a better delivered outcome. Neither result should borrow the other's label.

For a small first evaluation, choose one bounded workflow and write down the unchanged baseline, the allowed actions, the uncertainty the agent must resolve, and the evidence required to call the result useful. Keep the full path from request to outcome available for review.

The final score can tell you whether the run succeeded. The record should tell you what to improve next.
