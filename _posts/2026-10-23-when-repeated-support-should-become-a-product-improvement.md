---
layout: post
title: When repeated support should become a product improvement
date: 2026-10-23
category: Learning notes
description: A practical way to distinguish a recurring product obstacle from a customer problem that still needs expert help.
reading_minutes: 3
sources:
  - title: "Why AI Compute Comes in Rectangles — Erik Bernhardsson, Modal CEO"
    url: https://www.latent.space/p/modal-d
    publisher: Latent.Space
---

A support team can solve the same problem many times without making it easier for the next person to solve. That does not make the help wasted. It does make the repetition worth examining.

In [Latent.Space’s interview with Modal CEO Erik Bernhardsson](https://www.latent.space/p/modal-d), the transcript passage around 1:15:00 describes a transition he wants to make: start by working directly with customers to optimize their models, then turn that work into products customers can use themselves. This is his account of a product strategy, not independent evidence that it has improved customer outcomes.

The useful question is smaller than whether to automate support: **which part of the assistance should the next customer no longer need?**

## Record the obstacle, not just the request

Here is a proposed decision aid, rather than a finding from the interview.

For a recurring support issue, write down four things:

- The outcome the customer was trying to reach.
- The point where they became stuck.
- What the person helping them actually changed or explained.
- What would have to be true for that intervention to work safely without an expert.

This separates a requested feature from the obstacle behind it. A customer may ask for another setting because the existing default is wrong for their workload. Adding the setting could help; changing the default, explaining the trade-off or making the error clearer might help more.

Consider a hypothetical data-import tool. Several customers ask support to repair their uploads. If the files all contain the same unsupported date format, a preview that identifies the affected rows may be a useful experiment. If each file requires a different business interpretation, a silent automatic conversion could replace visible friction with incorrect data.

The repeated request is a clue. It is not yet a specification.

## Choose the smallest reusable intervention

Before building, ask whether the recurrence reflects the same underlying problem. Similar ticket titles can conceal different causes; one large customer can also generate many tickets.

Then ask what can be made reusable. Sometimes that is a product capability. Sometimes it is a validation message, a documented example or a safer default. Keep human assistance available where judgment, consequences or unusual constraints make self-service inappropriate.

For the import example, the first change could show the proposed interpretation and let the customer correct it before any data is committed. That tests whether visibility removes the obstacle without assuming the software should decide the meaning.

## Check the original outcome

Fewer support tickets alone would be an ambiguous result. Customers might be succeeding independently, abandoning the task or failing to find help.

For a bounded trial, check whether people can complete the original task correctly, where they still get stuck, and whether the change creates a new failure. Use only the information needed for that review, with appropriate consent.

The aim is not to eliminate every conversation. It is to stop requiring the same explanation when a safe, understandable product change can do that work.

*Reading scope: this note uses an accessible indexed transcript excerpt from the public interview. The full page could not be fetched during this review; no audio or video was consumed. The checklist and import example are original proposed analysis, not reported customer results.*
