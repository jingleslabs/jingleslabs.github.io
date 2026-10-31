---
layout: post
title: A published patch is not a protected user
date: 2026-10-31
category: Learning notes
description: Security updates need two separate clocks, from public fix to release and from release to a running patched version.
reading_minutes: 3
sources:
  - title: AI can turn security fixes into working exploits before users receive an update
    url: https://epoch.ai/publications/open-weight-models-patch-gap
    publisher: Aiden Ament and colleagues, Epoch AI
  - title: "Stronger with every update: How we’re making Chrome and the web safer in the AI Era"
    url: https://blog.google/security/chrome-stronger-with-every-update/
    publisher: Chrome Security Team
  - title: Security Vulnerabilities fixed in Firefox 159
    url: https://www.mozilla.org/en-US/security/advisories/mfsa2026-118/
    publisher: Mozilla
---

A release dashboard can be green while a user is still running the vulnerable version. The missing step may not be another security fix. It may be the moment when someone can safely restart without losing their work.

That makes update design a product problem as well as a release-engineering problem. The useful question is not just “Have we shipped?” but “What still stands between this fix and the people who need it?”

## Two clocks, different interventions

[Epoch AI's October 29 report](https://epoch.ai/publications/open-weight-models-patch-gap) describes isolated tests in which GLM 5.3 compromised six recent Firefox releases using information public at each release. The demonstrated outcome was file exfiltration, not arbitrary host code execution. The roughly $1,000 marginal cost per version followed more than $100,000 in initial Firefox research and setup.

Those attacks also depended on a previously unpublished vulnerability, since patched. [Mozilla's advisory](https://www.mozilla.org/en-US/security/advisories/mfsa2026-118/) confirms security fixes in Firefox 159 on October 27. Epoch had not established whether similar attacks could succeed against that patched release. Its findings do not settle the net effect of open models on attackers versus defenders.

The practical distinction is between two intervals:

- **Public fix to stable release:** the correction is visible, but the normal update channel does not yet contain it.
- **Stable release to activation:** an update exists, but the affected software is still running the old code.

A faster release process addresses the first. It cannot, by itself, finish the second.

## Reduce the cost of saying yes

The [Chrome Security Team's July account](https://blog.google/security/chrome-stronger-with-every-update/) explicitly includes restarting and applying the update in its vulnerability lifecycle. It says restart delays can contribute substantially to exposure, compared with the 1–2 days spent triaging, fixing, testing and releasing.

Its concrete example is Chrome 150 on macOS: when an update is pending and the application has no windows open, Chrome automatically restarts. That uses an existing quiet moment rather than demanding a new interruption. The same article describes twice-weekly security releases as a pilot and dynamic patching as research and development, not as universally delivered capabilities.

My interpretation is that teams should investigate the cost of complying before adding another reminder. A user may understand the request perfectly and still have a document, upload or working session they cannot afford to interrupt.

For a different application, the equivalent quiet moment needs evidence. “Idle” is not automatically “safe to restart.” Background work, unsaved state and recovery failures belong in the acceptance criteria.

## Make the dashboard answer the next decision

I would start a release review with three records, rather than a single shipped date:

1. **Availability:** when the fix first became public and when it reached each supported release channel.
2. **Activation:** which patched version is actually running among observable active installations.
3. **Friction:** what prevents the remaining installations from switching, where that can be measured without collecting private work content.

Report the observation window and denominator. A device that has not checked in is unknown, not proof of a successful update. A downloaded package is not evidence that its code is running.

Then choose the intervention from the delay. A long packaging interval calls for release-process investigation. A short packaging interval with slow activation points toward update delivery, compatibility, restart or recovery problems. Combining both into one average would hide that choice.

This is a proposed measurement approach, not a result I have tested. Evaluate a restart change against both activation time and disruption: lost state, failed restoration and interrupted tasks. Faster activation purchased by breaking the user's work is not an acceptable success metric.

The narrow lesson is actionable without predicting who wins the AI security race: define completion at the running version, and give the user a low-disruption way to get there.
