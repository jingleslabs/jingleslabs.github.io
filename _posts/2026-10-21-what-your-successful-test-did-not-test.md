---
layout: post
title: What your successful test did not test
date: 2026-10-21
category: Learning notes
description: A working inference engine, a balanced simulation and a completed ticket each leave different questions unanswered about the system people will use.
reading_minutes: 4
sources:
  - title: DeepInfer README at revision 9bd9cf2
    url: https://github.com/deepseek-ai/DeepInfer/blob/9bd9cf243fc53ef9afbf8f04d391d989117d6ab9/README.md
    publisher: DeepSeek
  - title: Battle Drones—a vibe coded RTS with audio-based multiplayer
    url: https://simonwillison.net/2026/Oct/20/battledrones/
    publisher: Simon Willison
  - title: Building an AI-Native SDLC
    url: https://www.tenex.co/blog/building-an-ai-native-sdlc
    publisher: Tenex
---

A passing test can be accurate and still leave the important question unanswered. An inference engine can generate output without supplying everything needed to operate a service. A simulation can finish sensible matches without telling us whether a person enjoys playing them.

The useful response is not to distrust the result. It is to identify the next boundary the result has not crossed: from component to service, from simulation to device, or from recorded progress to an accepted outcome.

## The engine is only part of the service

The [DeepInfer README](https://github.com/deepseek-ai/DeepInfer/blob/9bd9cf243fc53ef9afbf8f04d391d989117d6ab9/README.md) makes its release boundary explicit. It provides offline inference and core serving functionality, while listing a KV cache system, VE/prefill/decode disaggregation and load balancing across replicas as requirements for a complete service that are not included. It also notes that most engine functionality needed for disaggregation is already implemented.

That is a scope statement, not evidence that the engine has failed. It does mean that running the supplied inference example and operating a dependable shared endpoint are different accomplishments.

For a hypothetical deployment, the next test should exercise the surrounding service rather than repeat an isolated engine measurement. What happens when requests arrive together? When a replica becomes unavailable? When a workload stops benefiting from cached context? Those are proposed questions for the operator's system, not defects established in DeepInfer.

A useful release decision separates two statements: “this component works under the tested conditions” and “we have supplied and checked the remaining dependencies.” Neither statement substitutes for the other.

## The simulation does not experience the device

In his [Battle Drones account](https://simonwillison.net/2026/Oct/20/battledrones/), Simon Willison reports using agent-run simulated matches to refine a browser game. He also describes replay desynchronization from small differences in mathematical results between browsers. Later, discomfort caused by the audio-based multiplayer led him to add a warning and a WebSocket-based alternative.

These are the author's observations, not tests reproduced for this note. Their value is in showing different layers of feedback. Simulated matches can reveal game-state behavior. They do not, by themselves, establish cross-browser agreement or whether the interface is comfortable to use.

Consider a proposed multiplayer acceptance session. Two supported devices join, play through a match and compare the final state. Repeat after a connection interruption. Separately, ask players whether they can understand and comfortably use the controls and feedback. A synchronized match does not answer the comfort question; positive feedback on one device does not establish interoperability.

This changes how to spend the next hour of testing. If simulation behavior is already well explored, another thousand simulated matches may answer less than one carefully chosen session across the actual devices people use.

## A completion record needs an outcome behind it

[Tenex's description of its development process](https://www.tenex.co/blog/building-an-ai-native-sdlc) offers a way to preserve these distinctions. It separates current facts, intended work and history in a versioned project record, and describes checks that require evidence behind completion claims. The article also acknowledges that its full structure can be excessive for a small team. It describes a process, not a measured reliability improvement established here.

The smaller idea worth adopting is to keep unresolved boundaries visible. A ticket should not turn “engine example ran” into “service ready” merely because both fit under the same feature name. Nor should a successful automated test silently settle a usability question.

For a small project, a few lines beside the work may be enough:

- **Established:** the component behavior that was actually observed, with the version and evidence.
- **Still unresolved:** the operating condition or user need that observation did not cover.
- **Next check:** the smallest realistic exercise that could resolve it, and who will judge the result.

This is a proposed working practice, not a requirement from those projects. Keep it short enough to update when the implementation changes.

The aim is not an endlessly expanding test suite. It is a better choice of the next test. Before repeating a successful check, ask which untested dependency, environment or human experience could still prevent the intended outcome.

*Reading scope: this note uses the public DeepInfer README, Willison's written account including its update, and Tenex's process article. It does not reproduce their software results, assess the game's audio, or summarize video material. The deployment and acceptance-session examples are proposals, not experiments performed here.*
