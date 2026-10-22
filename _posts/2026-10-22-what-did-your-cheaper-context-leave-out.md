---
layout: post
title: What did your cheaper context leave out?
date: 2026-10-22
category: Learning notes
description: A practical evaluation for passage selection that checks missing evidence alongside token savings.
reading_minutes: 4
sources:
  - title: "Introducing Rerank 5: precise, efficient enterprise document retrieval"
    url: https://cohere.com/blog/rerank-5
    publisher: Cohere, October 21, 2026
  - title: Cohere Rerank documentation
    url: https://docs.cohere.com/docs/rerank
    publisher: Cohere, accessed October 22, 2026
---

Removing text from an AI system's context changes what the system can know about the question in front of it. The useful evaluation is therefore not just how many tokens disappeared. It is whether the answer still has the evidence it needs, including the sentence that qualifies an otherwise convincing answer.

Passage selection makes that trade-off concrete. Instead of forwarding whole retrieved documents, a system selects smaller pieces for the answering model. The engineering question is what to keep, and how to notice when the selection was too aggressive.

## Read the savings with their comparison intact

[Cohere's October 21 Rerank 5 announcement](https://cohere.com/blog/rerank-5) introduces Context Focus, which returns relevant passages alongside document rankings. In the vendor's six deep-search benchmarks, its full retrieval stack with Context Focus at threshold 0.4 used 41% fewer tokens than BM25 alone, while reported accuracy rose from 39% to 52%.

That comparison includes the reranker as well as passage selection. It does not isolate Context Focus's contribution. The token measure covers total input, output and reasoning tokens across the agent's calls, including cached tokens. It is neither a promise of a 41% smaller input for every question nor a measurement of a 41% lower bill for another application.

The result is a reason to evaluate the approach, not a substitute for that evaluation.

## A short question can still need a long explanation

The [official documentation](https://docs.cohere.com/docs/rerank) makes a useful distinction: Context Focus suits targeted queries; broad summarization needs the full document. It also warns that tables, forms and code split less cleanly than prose. Raising the passage threshold removes more text. If no passage meets it, the result omits the `relevant_spans` field.

That last state needs careful handling. “No passage met the threshold” does not establish that the original document contains no answer.

A targeted query is not automatically a simple one, either. Consider a hypothetical equipment manual: one paragraph gives a replacement interval, while another explains that a particular operating condition shortens it. Selecting the first paragraph could yield a well-cited answer that still omits the condition the reader needs. This is an illustrative failure case, not an observed defect in Rerank 5.

## Compare answers against the original evidence

Here is a proposed small evaluation. It has not been run for this note.

Start with questions whose answers can be checked against retained source documents. Include straightforward lookups, answers with exceptions, questions requiring several passages, and questions the documents cannot answer. Keep broad summaries and structured documents as separate groups rather than letting easy prose lookups dominate the average.

For the passage-selection comparison, hold the retrieved documents, answering model, instructions and generation settings fixed where possible. Run one condition with the full retrieved evidence and another with selected passages. Repeat across the settings under consideration. If document ranking changes too, add a separate comparison so a ranking improvement is not mistaken for a passage-selection improvement.

The full-context answer is a baseline, not the answer key. Judge both outputs against the original evidence. A longer input can also produce a wrong answer.

For each question, record:

- **Required evidence retained:** Did the selected text preserve every fact and qualification needed for an acceptable answer?
- **Answer correctness and completeness:** Did the answer omit an exception, overstate certainty or add an unsupported claim?
- **Citation support:** Does the cited passage support the claim actually made, not merely concern the same topic?
- **Resource use:** What were total latency and cost across retrieval, selection, generation and any retries?
- **Recovery:** When the selected evidence was insufficient, did the system retrieve more context, abstain appropriately, or answer anyway?

Review the cases where the answers differ. An average quality score can conceal a recurring omission in one document type. Keep those failures visible even if aggregate token use looks attractive.

## Decide when to widen the context

A practical policy needs an alternative to choosing between aggressive filtering and always sending everything. One proposed approach is to use selected passages for supported narrow questions, retain fuller context for broad requests, and expand the evidence when an answer depends on missing qualifications or structure.

That policy is itself something to test. Extra retrieval and retries may consume the savings, and a model may fail to recognize that evidence is missing. Include cases designed to expose those problems; do not assume a request for more context will happen reliably.

Set acceptance criteria before comparing results. A system answering low-consequence lookups may tolerate different errors from one used to interpret operational instructions. Report quality, latency and cost separately, with a clear reason for accepting any trade-off.

The smaller context is useful when it preserves the evidence needed for the task. Count the removed tokens, but inspect what was removed with them.
