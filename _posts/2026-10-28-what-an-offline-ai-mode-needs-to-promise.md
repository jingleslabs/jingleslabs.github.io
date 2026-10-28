---
layout: post
title: What an offline AI mode needs to promise
date: 2026-10-28
category: Learning notes
description: A practical acceptance test for an offline AI feature, from setup dependencies to recovery.
reading_minutes: 3
sources:
  - title: Coding From the Himalayas With an Offline AI Agent
    url: https://lspace.beehiiv.com/p/offline-coding
    publisher: Latent.Space
  - title: OpenCode integration
    url: https://docs.ollama.com/integrations/opencode
    publisher: Ollama
  - title: Disabling cloud features
    url: https://docs.ollama.com/faq
    publisher: Ollama
---

A user who chooses an offline mode needs to know what they can finish after the connection disappears. Selecting a local model answers only part of that question.

Rittika Jindal's [October 27 walkthrough](https://lspace.beehiiv.com/p/offline-coding) offers a deliberately small example: repair an expense calculator using OpenCode and a model running through Ollama. The project and tools were prepared before disconnecting. The author reports a one-line repair and five passing tests, with the original test file unchanged.

I read the published text; I did not run the experiment or inspect its recording. It supports a narrow conclusion: a prepared, self-contained coding task can be completed with this setup. It does not establish how well the same model handles an unfamiliar framework or a large repository.

For builders, the useful detail is the boundary around the task.

## Separate setup from everyday use

An offline claim should name its prerequisites. Does the user need to download a model, open the project once, install dependencies or save reference documents while connected? Can they tell that preparation is complete?

Those are onboarding requirements. If they are hidden, the user discovers them at the moment they can no longer satisfy them.

[Ollama's integration documentation](https://docs.ollama.com/integrations/opencode) shows OpenCode connecting to a localhost endpoint. It also says existing OpenCode settings still apply when launching through Ollama. That means a local model selection is not, on its own, a description of every tool or helper the application may use.

The [Ollama FAQ](https://docs.ollama.com/faq) separately documents disabling its cloud features with OLLAMA_NO_CLOUD=1 and restarting the service. That control applies to Ollama. Treating it as proof that an entire application has no network dependencies would go beyond the documentation.

## Test the promise from a fresh session

My proposed acceptance check is simple enough to put beside a feature specification:

1. **State the supported task.** Name the operation and the local inputs it requires. Avoid a claim as broad as “the assistant works offline.”
2. **Complete the documented preparation.** Use the steps a customer receives, rather than an engineer's already-configured machine.
3. **Disconnect and start again.** Launch a fresh session with external networking unavailable. A session opened while online may conceal a dependency needed at startup.
4. **Verify the finished result.** Inspect the saved output and run the appropriate independent check. For a repair, keep the original tests intact.
5. **Try one unavailable operation.** Check that the application explains the missing dependency, preserves the user's work and offers a useful next step.
6. **Restore the connection.** Check what resumes and what requires explicit action. Reconnection should not silently repeat an operation the user already completed.

This is a proposed product test, not a test suite I ran for the cited tools. Its purpose is to turn an ambiguous feature label into observable behavior.

## Make the limitation useful

A narrower promise can make the product easier to choose and trust. State the tasks that remain available, the preparation they require and the operations that still need a connection. Show that information before the user starts work, and keep it available when a dependency fails.

The same discipline applies to the result you report internally. A successful local model call proves that inference worked. A completed task under the documented offline conditions is stronger evidence for the feature users were promised.

The release question is whether someone can finish the advertised task with the resources they have at that moment.

