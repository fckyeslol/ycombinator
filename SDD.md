# Prewave Presentation Site — Specification-Driven Development

A complete SDD package for the one-page site that represents Prewave in the
YC Startup School 2026 Project Session. Specification → numbered requirements →
executable Gherkin.

---

## 1. Specification

### 1.1 Problem
The YC form field *"What would you like to present?"* is a **selection gate**.
Reviewers spend ~1-2 minutes per entry and will not watch a video to decide.
The text answer must stand alone; the linked site must prove the claim in
~5 seconds and reward deeper viewing with a video.

### 1.2 Goal & success metric
- **Primary:** get selected for the Project Session.
- **Success signal:** a reviewer lands on the site and understands *what Prewave
  is* + *the 40k->700k proof* before scrolling or pressing play.
- **Secondary:** the site itself reads as "this person ships fast" — a second
  proof point.

### 1.3 Personas
| Persona | Time | Needs | Wins them over |
|---|---|---|---|
| YC reviewer (selection) | 30-90s, skimming | Instant clarity + verifiable traction | Number above the fold, live account link |
| Session attendee (browsing directory) | 1-3 min | "Is this interesting/technical?" | The full-loop insight, the video |
| Mateo (presenter, live) | the session itself | An artifact to talk over | The video + visual loop diagram |

### 1.4 Scope
**In:** single page, hero, embedded 60-90s video (placeholder until recorded),
the-loop section, proof strip, live links, deploy.
**Out (until selected):** multi-page site, auth, CMS, dashboard, contact forms,
blog. *Premature before YC says yes.*

### 1.5 Content inventory (source of truth — the proof)
- **Hook:** Andres Bilbao (co-founder of **Rappi**), **40k -> 700k+ followers in
  5 months**.
- **Breadth:** Prewave runs **8 other accounts** today (one went **0 -> 30k**),
  monitoring **6 platforms** (Instagram, TikTok, YouTube, LinkedIn, X, Facebook).
- **What it is:** an AI system that runs an entire content team for a personal
  brand, end to end — it does much more than generate posts.
- **The full loop (the real product):**
  1. **Scrape & score** — monitors a watchlist of top creators across 6 platforms
     (Sandcastles API) and surfaces *outliers*: posts beating their own author's
     average, via anomaly + velocity scoring. Noise filter drops giveaways/junk.
  2. **Brief & script** — an LLM (GPT-4o-mini, Gemini fallback) turns each winner
     into a brief (why-viral, angle, hooks, AV direction) and a script in the
     account's own voice (per-avatar persona).
  3. **Swipe & QA** — a **Tinder-style** swipe board (`/revision`) for accept/reject,
     behind a QA reviewer gate (`/qa`).
  4. **Produce** — an editor **kanban** (por grabar -> por editar -> en revision ->
     aprobado) with **role-based access** (admin / producer / editor / creador),
     editor assignment + Slack/email notifications, and gating checklists.
  5. **Verify & publish** — content fact-checked against **live web search**
     (blocks false claims / dead tools), then scheduled and published multi-platform
     via Metricool + Substack; media preloaded Drive -> GCS/CDN.
  6. **Attribute** — daily follower deltas + attribution linking each publication
     back to the brief / source post that drove growth; dashboards, funnel, reports.
- **The insight:** most AI-content tools stop at *generation*. Prewave owns the
  whole loop — from scraping what works to attributing what grew — and runs it as
  a multi-role team product, not a single-user generator.
- **Video:** Mateo presenting Prewave (60-90s). *Placeholder until recorded.*

### 1.6 Non-functional requirements
- **Performance (microsite budget):** JS < 80kb gz, CSS < 15kb, LCP < 2.5s, CLS < 0.1.
- **Proof-without-play:** every core claim is readable as text/visual; nothing
  critical locked inside the video.
- **Distinctive design:** not a default template (hierarchy via scale contrast,
  intentional motion, real type pairing).
- **Responsive:** 320 / 375 / 768 / 1024 / 1440, no overflow.
- **Accessible:** keyboard-operable controls, captions, `prefers-reduced-motion`
  respected, AA contrast.

### 1.7 Design direction
"Mission control for personal brands" — clean light instrument panel, editorial
confidence. The hero number `40k -> 700k+` is the largest type on the page and is
*drawn* as a plotted ascent. Motion clarifies the loop; it never decorates.

---

## 2. Functional requirements (traceable)

| ID | Requirement | Maps to |
|---|---|---|
| FR-1 | Form field carries a self-contained text answer that earns the click | Feature: Selection Answer |
| FR-2 | Hero states what Prewave is + the headline number above the fold | Feature: Hero Proof |
| FR-3 | Video embedded, autoplay-muted, click/keyboard to unmute, captioned | Feature: Video |
| FR-4 | The loop is shown visually as 5 stages | Feature: The Loop |
| FR-5 | Proof strip lists 8 accounts + Rappi credibility + live links | Feature: Proof Strip |
| FR-6 | Site meets performance & accessibility budgets | Feature: Quality Gates |
| FR-7 | Site deploys to a public URL pasteable into the YC form | Feature: Deploy |

---

## 3. Gherkin feature specs

```gherkin
Feature: Selection Answer (the form field text)
  The text in the YC field must win selection on its own, since reviewers
  will not watch a video to decide.

  Scenario: Reviewer understands the product in one read
    Given a YC reviewer reading the "What would you like to present?" field
    When they read the first sentence
    Then they understand Prewave runs the full content engine for a personal brand
    And they encounter no jargon, buzzwords, or "platform"-speak

  Scenario: The headline number appears before any vision statement
    Given the text answer
    When the reviewer reaches the second sentence
    Then they see "40k to 700k+ followers in 5 months"
    And they see "Andres Bilbao (co-founder of Rappi)"
    And they see Prewave runs 8 other accounts

  Scenario: The answer ends when the point is made
    Given the text answer
    When the insight sentence (the full loop) is delivered
    Then the answer stops without an uplift closer
    And a link to the site is the final element
```

```gherkin
Feature: Hero Proof (above the fold)
  Proof must be readable in ~5 seconds without scrolling or pressing play.

  Background:
    Given the presentation site is loaded

  Scenario: Headline number is the largest element on screen
    When the hero renders
    Then "40k -> 700k+" is the largest text on the page
    And a one-line description of Prewave is visible beneath it

  Scenario Outline: Proof is legible across breakpoints
    When the viewport width is <width>px
    Then the headline number is fully visible without horizontal overflow
    And the one-line description does not clip

    Examples:
      | width |
      | 320   |
      | 375   |
      | 768   |
      | 1024  |
      | 1440  |

  Scenario: No critical claim is hidden inside the video
    When a reviewer reads only the text and visuals above the fold
    Then they learn the number, the Rappi name, and the 8 accounts
    Without playing the video
```

```gherkin
Feature: Video Presentation
  A 60-90s video rewards deeper viewers and powers the live session,
  but never blocks comprehension.

  Scenario: Placeholder reads as intentional, not broken
    Given the video has not been recorded yet
    When the visitor reaches the video section
    Then they see a styled poster with a clear "recording soon" label
    And the layout reserves the final 16:9 space (no shift on swap-in)

  Scenario: Viewer unmutes by click or keyboard (once real video is in)
    Given the video is playing muted
    When the viewer activates the unmute control by click or keyboard
    Then audio plays

  Scenario: Captions are available
    Given a viewer who cannot use audio
    When they play the video
    Then captions are available

  Scenario: Reduced motion is respected
    Given a visitor with prefers-reduced-motion enabled
    When the page loads
    Then non-essential motion is disabled
    And the hero trajectory renders in its final state without animating
```

```gherkin
Feature: The Loop
  Differentiates Prewave from tools that stop at generation.

  Scenario: The six stages render in order
    Given the visitor scrolls to the loop section
    Then they see the stages in order:
      | stage            |
      | scrape & score   |
      | brief & script   |
      | swipe & QA       |
      | produce          |
      | verify & publish |
      | attribute        |
    And the section frames this as a full content team run by one operator

  Scenario: The cycle closes
    When the visitor reads the last stage (attribute)
    Then it is shown to feed back into the first stage (scrape)

  Scenario: The distinctive subsystems are named on the page
    When the visitor reads the loop and the "why it works" section
    Then outlier scraping is named (posts beating their author's average)
    And the Tinder-style swipe board plus QA gate is named
    And role-based access for the team is named
    And fact-checking against live web search is named
```

```gherkin
Feature: Proof Strip
  Verifiable traction beats adjectives.

  Scenario: Live account link makes the claim checkable
    Given the proof strip
    When the reviewer activates the Andres Bilbao account link
    Then it opens the live account in a new tab
    And the 700k+ follower claim is independently verifiable

  Scenario: Breadth is shown, not just the hero case
    Given the proof strip
    Then it shows Prewave runs 8 other accounts
    And it highlights one that grew from 0 to 30k
    And it names Rappi as credibility for the hero account
```

```gherkin
Feature: Quality Gates
  Performance and accessibility budgets for a microsite.

  Scenario: Performance budget holds
    When the production page is audited
    Then LCP is under 2.5s
    And CLS is under 0.1
    And shipped JS is under 80kb gzipped
    And shipped CSS is under 15kb

  Scenario: Keyboard-only navigation works
    Given a keyboard-only visitor
    When they tab through the page
    Then every interactive control (video, links) is reachable and operable
    And focus states are visible

  Scenario: Design avoids template defaults
    When the page is reviewed against the design checklist
    Then it demonstrates at least four intentional design qualities
    And it would look believable in a real product screenshot
```

```gherkin
Feature: Deploy
  The site must exist at a pasteable public URL.

  Scenario: Public URL ready for the form
    Given the site builds successfully
    When it is deployed
    Then it is reachable at a public HTTPS URL
    And that URL can be pasted into the YC form field as the link
```

---

## 4. Build notes
- **Stack:** static HTML/CSS/vanilla JS (no framework) — easiest way to hold the
  microsite performance budget and deploy anywhere.
- **Files:** `index.html`, `styles.css`, `main.js`, `vercel.json`.
- **Open items before launch:**
  1. Record the founder walkthrough and replace the video placeholder.
  2. Replace `#REPLACE_WITH_LIVE_ACCOUNT` with the real Andres Bilbao account URL.
  3. Deploy and paste the URL into the YC form.
