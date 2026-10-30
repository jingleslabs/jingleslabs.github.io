---
layout: post
title: Before buying more inference, classify the wrong answer
date: 2026-10-30
category: Learning notes
description: A counting benchmark suggests a practical way to separate a wrong interpretation from a lack of reasoning effort.
reading_minutes: 3
sources:
  - title: "DecoyCount: Evaluating Visual-Reasoning Misalignment in Counting"
    url: https://arxiv.org/html/2610.34855v1
    publisher: Qiuyi (Richard) Zhang and colleagues, arXiv
---

A wrong count can be more informative than a low score. If it matches a number printed on the packaging, the system may be reading the label rather than counting the contents. Paying for a longer answer would not necessarily address that mistake.

[DecoyCount, published October 26](https://arxiv.org/html/2610.34855v1), makes this distinction testable. Its authors register plausible wrong counts before evaluation, then compare neutral questions with answer-free cues targeting the suspected mistake. Across six models, matched cues improved accuracy by 11.8–22.1 percentage points. In a two-model control, generic or mismatched cues recovered at most 18% of the matched improvement.

The study deliberately selected difficult images. Its absolute scores are not estimates of everyday counting reliability. Nor does a cue establish that every remaining error is perceptual. The useful evidence is narrower: changing the counting rule can repair some answers without changing the image. These are the authors' results; I have not reproduced them.

## Make the next experiment answer a decision

My proposed use of this finding is to change how a team chooses its next experiment.

“Try a stronger model” changes the system but may leave the diagnosis unresolved. A more useful first question is: **What result would make us choose a different intervention?**

For a visual-counting feature, I would separate three decisions:

- **Clarify the task:** Is the requested unit defined consistently in the product, labels and evaluation?
- **Improve the evidence:** Does the input give enough usable detail to identify individual objects?
- **Increase inference:** Does more computation improve the intended result enough to justify its latency and cost?

These are competing hypotheses, not three mandatory upgrades. The aim is to avoid spending a week optimizing the third when the first has never been specified.

Before running a comparison, write down the suspected failure and the outcome that would count against it. If a targeted instruction changes nothing, keep that negative result. Do not keep rewriting the instruction against the same examples until something passes and call the final score an independent test.

## Separate diagnosis from deployment

There is a practical trap in using a matched cue: an evaluator can know which mistake an image invites, while a deployed system may not.

That distinction changes what a successful experiment means. A hand-selected cue can show that a failure is repairable under guidance. Shipping the repair also requires a reliable way to decide when to apply it, or a task-wide instruction that works without that decision.

I would therefore measure two versions separately:

1. **Diagnostic version:** use the known failure category to choose the cue. This tests whether the intervention is worth investigating.
2. **Deployable version:** choose the instruction using only information available at runtime. Evaluate that whole selection process on untouched examples.

Do not report the first version's accuracy as the second version's expected performance. The missing selection step is part of the product, not an implementation detail to assume away.

## Keep the errors that a better score hides

For each candidate change, retain the individual outcomes: previously wrong answers that became correct, previously correct answers that became wrong, and failures that remained. Review the newly introduced errors before deciding that an average gain is acceptable.

Then compare the deployable candidate with extra inference under an explicit budget. Keep the input set, scoring rule and required output fixed; record cost and latency alongside correctness. A useful improvement might be fewer expensive retries, more reliable counts, or a clearer boundary for human review. The experiment should say which one it demonstrated.

This is a proposed evaluation procedure, not a tested production recipe. Its value is in making the next choice more specific. A wrong answer should help decide what to change, rather than automatically become a request for more computation.
