---
layout: post
title: When an overall provider score hides your task
date: 2026-10-24
category: Learning notes
description: Before switching inference providers, inspect which tasks improve, which regress, and whose workload the average represents.
reading_minutes: 3
sources:
  - title: Vals Inference Provider Index
    url: https://www.vals.ai/benchmarks/inference_provider
    publisher: Vals AI, updated October 20, 2026
---

An overall provider score answers a question about a particular mixture of tasks. If that mixture is not yours, a reassuring average may be the wrong reason to switch endpoints.

The useful comparison is more specific: which tasks would the change make better, and which previously acceptable results would it put at risk?

## Find the mixture inside the average

The [Vals Inference Provider Index](https://www.vals.ai/benchmarks/inference_provider), updated October 20, compares the same open-weight models across providers. It reports that overall accuracy was within error of each model creator's API, while individual benchmarks showed differences. Its Kimi examples concern K3, not K3.1.

The methodology matters here. Each comparison uses 66 finance tasks, 33 coding tasks and 66 legal tasks, but the overall score gives the three benchmark scores equal weight. Finance also aggregates category scores. The headline is not a simple fraction of successful tasks across all 165 examples.

These are the evaluator's reported results, not runs reproduced for this note. “Within error” does not establish that providers are equivalent. Nor do the benchmark-level gaps establish which individual tasks would change outcome in another application.

My interpretation is that the published average is useful for understanding this evaluation, not as a ready-made estimate of a product's success rate. Changing its weights would not fix a mismatch between the benchmark tasks and the product's actual work.

## Inspect what changes sides

Here is a proposed way to make a provider-switch decision more concrete. Choose tasks representative of the intended application and define acceptable output before running either endpoint. Use the same inputs and grading criteria for both. Keep the model version and compatible settings fixed; record any differences that cannot be controlled.

For each task, retain both outputs and put the observed result in one of four groups:

- Both endpoints produced an acceptable result.
- Only the current endpoint did.
- Only the proposed endpoint did.
- Neither endpoint did.

The middle two groups deserve close inspection. Similar overall success rates can conceal different failures. A new endpoint might fix one kind of request while breaking another that already worked. Calling that a neutral change because the totals cancel would discard the information needed to judge it.

One run is not enough to label a task permanently won or lost. Repeat uncertain cases under comparable conditions and keep inconsistent outcomes visible. This grouping is a diagnostic aid, not a statistical proof that the provider caused a difference.

## Keep frequency separate from consequence

Decide which task groups matter before looking at the results. Frequency helps describe the workload; it does not fully describe the harm of a mistake.

In a hypothetical catalog tool, most requests might draft descriptions, while a smaller group updates structured product fields. Better descriptions would not automatically compensate for incorrect field updates. The team could set a separate acceptance threshold for those updates instead of blending everything into one score. This is an illustrative decision rule, not an observed provider result.

Avoid turning this into a search for favorable weights after the comparison. Keep the workload definition and unacceptable failure types fixed for the decision. If the intended workload changes, name that as a new question rather than quietly revising the old score.

A provider comparison can then support a bounded conclusion: this endpoint met the criteria for these tasks under these conditions. That is a more useful basis for a switch than assuming an unchanged model name or a similar average means an unchanged product experience.

*Reading scope: the accessible Vals page and methodology were read on October 24. Underlying executions were not reproduced. The paired review and catalog example are proposed analysis, not measured outcomes or a recommendation to buy a particular service.*
