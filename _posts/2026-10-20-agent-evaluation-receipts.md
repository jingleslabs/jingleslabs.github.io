---
layout: post
title: A better agent score needs an evaluation receipt
date: 2026-10-20
category: Learning notes
description: Record the system, budget, grading boundaries and missing results before treating an agent benchmark gain as an improvement worth adopting.
reading_minutes: 4
sources:
  - title: "Harness²: Recursive Agent Harnessing for an Open World, v1"
    url: https://arxiv.org/html/2610.14224v1
    publisher: Xu and colleagues, arXiv
  - title: Harness² experiment guide
    url: https://github.com/google-research/harness2/blob/main/docs/EXPERIMENTS.md
    publisher: Google Research repository
---

An agent's benchmark score is incomplete without a description of the system that earned it. A model name leaves out prompts, tools, retries, selection and the environment. Those omissions matter when deciding whether a result is worth reproducing or adopting.

I would attach a short evaluation receipt to every reported gain: what changed, what it cost, what was graded and what remained unknown. Harness² offers a concrete reason to do this.

## Read the budget beside the score

[Harness²](https://arxiv.org/html/2610.14224v1) changes an agent's surrounding harness while keeping the executor model's weights fixed. For Gemini 3.5 Flash with OpenCode, its WorkBuddy-Bench average moves from 72.4 at baseline to 77.5 with one improvement step, then 80.8 with parallel recursion at k=5. The last figure is an 8.4-point gain over baseline, not the result of one refinement step.

The method proposes edits, probes their behavior and composes a successor. It can retain the existing harness. Its default editor is a separate model, and larger budgets involve more exploration and selection. A frozen executor therefore does not mean an unchanged system or a free improvement. These are the authors' reported measurements, not a reproduction performed here.

The practical comparison should specify the resources available to each configuration. If one candidate gets extra attempts, record them. If a selector chooses among outputs, include that stage. A lower step count in the final execution would not, by itself, establish a lower cost for the whole process. The paper also reports a compute comparison that includes execution and improvement costs; the headline score should be read alongside it.

## Keep the grader out of reach

The project's [experiment guide](https://github.com/google-research/harness2/blob/main/docs/EXPERIMENTS.md#web-access) documents a release-validation rollout that downloaded its task's publicly available grading rubric without being instructed to. This does not establish that the paper's reported runs were contaminated. It does show a concrete evaluation-access risk.

The guide says the release leaves networking unrestricted and runs Codex with sandboxing disabled. It recommends network-level restrictions and reporting those restrictions with results. It also notes that failed evaluations remain unscored rather than becoming zeros.

Those details change how a result should be read. A task may legitimately require web research while its grading criteria must remain inaccessible. An unscored attempt is not a demonstrated failure, but neither is it a demonstrated success. Report missing verdicts separately so readers can see the denominator behind the average.

## A receipt that supports a decision

Here is a proposed record for a small agent comparison. It is a reporting checklist, not a standard established by the paper.

- **System identity:** executor and editor versions, harness revision, tool versions and any selector. Name the component being changed.
- **Task coverage:** dataset revision, included task IDs, exclusions and ordering. State whether earlier tasks can influence later ones through retained memory.
- **Budget:** attempts, parallel candidates, time limits, tokens and measured cost where available. Separate total work from elapsed time.
- **Evaluation boundary:** scorer version, permitted inputs, tool permissions and enforced network restrictions. Record what the executor cannot access.
- **Outcomes:** accepted results, observed errors, unscored attempts and regressions. Keep failed grading distinct from failed execution.
- **Decision:** adopt, reject or investigate further, with the specific evidence supporting that choice.

This can be short. The useful discipline is to make the next reader able to reconstruct the comparison, rather than infer its conditions from a headline.

Consider a hypothetical document-extraction agent. A revised prompt may improve field accuracy while causing more timeouts. Reporting accuracy only for completed documents could hide the trade-off. The receipt would show both the quality of completed outputs and the share of requested documents that received a verdict. Whether the change is worthwhile depends on the application's acceptance criteria, not the prettier number.

## Make keeping the baseline an ordinary outcome

An evaluation should be allowed to conclude that the proposed change has not earned adoption. Decide in advance which errors are unacceptable and which resource limits matter. Otherwise, it is easy to reinterpret the objective after seeing which metric improved.

Keep permission boundaries outside the component being optimized. A harness may revise how it approaches a task; that should not let it authorize new access or rewrite the conditions under which success is judged. This is a proposed engineering safeguard, not a safety guarantee demonstrated by the experiment.

A score can identify a promising configuration. An evaluation receipt makes the narrower, more useful question answerable: under these conditions, is there enough evidence to choose it over the baseline?

*Reading scope: this note uses the accessible paper text and the public experiment guide. Figures were not visually analyzed, and no model or benchmark run was performed. The receipt and document-extraction example are proposed analysis, not measured results.*
