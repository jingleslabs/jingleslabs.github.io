---
layout: post
title: A working screen is not a working journey
date: 2026-10-29
category: Learning notes
description: Test what remains possible after the state changes, not only what the first screen shows.
reading_minutes: 3
sources:
  - title: The October inflection point for vibe game development
    url: https://simonwillison.net/2026/Oct/28/vibe-game-development/
    publisher: Simon Willison
  - title: Declarative Schemas 2.0 with pg-delta
    url: https://supabase.com/blog/declarative-schemas-2-0-pg-delta
    publisher: Supabase
---

A quest needs a character. Another part of the story moves that character somewhere else. The player reaches the quest and cannot finish it.

That is one of the gameplay problems Simon Willison describes in his [October 28 account of building browser games with AI](https://simonwillison.net/2026/Oct/28/vibe-game-development/). He reports finding and addressing problems through additional playtesting and prompting. I have read his account, not played the games; it is evidence of his experience, not an independent assessment of their quality.

The useful detail is the interaction between two events. Moving a character can work. A quest can work. Their combination can still leave the player stuck.

For reviewing generated software, that suggests a better question than whether each screen looks finished: **Can the user still complete the task after something important changes?**

## Start with what must remain possible

Consider a hypothetical project app. Someone opens an unfinished form, another person changes a record it depends on, and the first person returns to submit it. The screen might look exactly as it did before. Its assumptions no longer hold.

A review should specify the intended outcome before deciding how to implement it. Perhaps the form should refresh its options. Perhaps it should preserve the entered text and explain why submission needs another choice. Silently attaching the work to an obsolete record would not be an acceptable substitute.

The key is to name what must survive: the person's input, the identity of the destination, or a clear way to recover. “The form opens” checks none of those requirements.

This is an illustrative scenario, not a defect observed in a particular product. It helps separate two review questions: what should the interface show now, and what should happen to work started earlier?

## A desired state does not describe a safe transition

Database tooling offers a concrete, separate example. [Supabase's October 13 explanation of Declarative Schemas 2.0](https://supabase.com/blog/declarative-schemas-2-0-pg-delta) says the tool compares schema files with replayed migration history, rather than reading the live database during sync. It also warns that a column rename can be represented as dropping the old column and adding a new one. Applying that output unchanged would lose the column's data.

The resulting column names could look correct while the transition failed a requirement that mattered more: retaining existing values. Supabase explicitly calls for reviewing generated migrations and rewriting destructive statements where necessary. I have not run these migrations; this is the behavior documented in that article, accessed October 29.

A broken quest and a destructive migration have different causes and consequences. The connection I draw is narrower: describing the destination leaves important questions about the route unanswered.

## One focused review to add

For a feature under review, choose one consequential change and walk through it:

1. **Begin real work.** Identify the user's goal and the state they start from. Use an existing task or saved record, not only a clean demo.
2. **Change one dependency.** Move, rename, update or remove something the task relies on, using a controlled test setup.
3. **Resume the task.** Check the final result as well as the visible response. Confirm that retained data is still present and associated with the right object.
4. **Inspect recovery.** If completion is no longer valid, check whether the explanation is understandable and whether useful work survives.

This is a proposed review method, not a measured guarantee. One case cannot establish coverage of every possible interaction. Choose it because the dependency is important or has failed before, then expand only where the risk warrants it.

It also does not answer whether the experience is enjoyable or worth repeating. A player can finish a game and still find it dull. A user can complete a workflow and still avoid it next time. Correctness, comprehensibility and appeal deserve separate observations.

The first screen is a starting point. The stronger acceptance test follows the user's work into the changed state and checks what remains possible there.
