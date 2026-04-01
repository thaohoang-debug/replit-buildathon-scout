# Scout Hero Page — Product Requirements Document
**For: Thanh (Engineer) | Owner: Thảo | Date: March 11, 2026**
**Reference design: Figma — Hero frame (screenshots provided)**

---

## 1. BRAND & VISUAL IDENTITY

### Color System

| Token | Value | Usage |
|---|---|---|
| `--color-black` | `#0A0A0A` | Page background, deep sections |
| `--color-green` | `#3ECF74` | Primary CTA buttons, active states, accent highlights, "Start Scouting" button |
| `--color-white` | `#FFFFFF` | Headlines, body copy, logo |
| `--color-green-dim` | `rgba(62, 207, 116, 0.15)` | Hover states, subtle glows, active timeline nodes |
| `--color-white-secondary` | `rgba(255,255,255,0.55)` | Subheadings, body text |
| `--color-white-muted` | `rgba(255,255,255,0.30)` | Labels, captions, "Alternative to" text |
| `--color-surface` | `rgba(255,255,255,0.04)` | Cards, panels, FAQ items |
| `--color-border` | `rgba(255,255,255,0.08)` | Card borders, dividers |

**Rule:** Only three colors exist in the Scout brand — black, green, white. No purple, no blue, no gradients except the storybook background art (which is an illustration asset, not a UI color). All interactive UI elements use only these three.

---

### Visual Concept — Alice in Wonderland / Storybook

The overall aesthetic is a **hand-illustrated storybook** — think Alice in Wonderland meets a quiet starry night. The page should feel like you're turning through pages of a story, not scrolling through a SaaS landing page.

| Element | Direction |
|---|---|
| Background | Full-page illustrated scene — dark night sky, painterly clouds, distant mountains, soft glow on horizon. The same scene continues as you scroll — it's one continuous painting, not repeated tiles. Use the existing Figma background asset as the base. |
| Depth layers | Parallax: far mountains move slowest, mid clouds move medium, near elements move fastest. Creates depth as user scrolls. |
| Mood | Peaceful, slightly magical. Not dark/scary. Think the quiet wonder of a storybook night — the rabbit is exploring, not fleeing. |
| Typography on background | All white. Headings feel like text painted onto the scene. |
| Section transitions | No hard cuts. Sections flow into each other. The background painting is continuous. |
| Illustration style | The pixel-art rabbit and bug are the only pixel elements. All other illustration is painterly/soft (the background). These two styles intentionally coexist — it's part of the character. |

---

### The Rabbit — Scroll Animation ★

The pixel-art rabbit is a **brand mascot and navigation device**. It hops horizontally across the page as the user scrolls through each step section (Steps 1–5 on the vertical timeline).

**Behavior:**

```
Hero         Step 1       Step 2       Step 3       Step 4       Step 5
  🐇 ─────────► 🐇 ─────────► 🐇 ─────────► 🐇 ─────────► 🐇 ─────────► 🐇
[left edge]  [20%]        [40%]        [55%]        [70%]        [85%]
```

- The rabbit sits on a **fixed horizontal ground line** (a thin illustrated ground/grass strip) that persists across the full width of the viewport
- The ground line appears just below the vertical timeline section, above the footer
- As user scrolls into each step section → rabbit hops to the next position with a bounce animation
- **Hop animation:** `translateX` + brief `translateY` arc (parabolic jump, not linear slide), 400ms, ease-in-out
- On the hero: rabbit is centered below the URL input (current Figma position)
- At the final CTA: rabbit reaches the right edge and does a small idle animation (ears wiggle)
- **Mobile:** rabbit hops vertically (top of screen, moves down) or is hidden at small breakpoints if performance is a concern

**Implementation:**

```js
// Intersection Observer on each step section
// When Step N enters viewport at 40% threshold → hop rabbit to position N
const rabbitPositions = {
  hero:   '50%',   // centered
  step1:  '20%',
  step2:  '35%',
  step3:  '50%',
  step4:  '65%',
  step5:  '80%',
  cta:    '90%',
}

// CSS transition on the rabbit container
.rabbit {
  position: fixed;          /* fixed to viewport during scroll */
  bottom: 80px;             /* sits on the ground strip */
  transition: left 400ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
}

// Hop arc: use CSS keyframes triggered on class change
@keyframes hop {
  0%   { transform: translateY(0) scaleX(1); }
  30%  { transform: translateY(-24px) scaleX(0.9); }   /* up */
  60%  { transform: translateY(-12px) scaleX(1.1); }   /* peak */
  80%  { transform: translateY(-4px) scaleX(1); }      /* coming down */
  100% { transform: translateY(0) scaleX(1); }         /* land */
}
```

**Ground strip:**
- Full-width fixed element, `bottom: 60px`
- Thin illustrated grass/ground line (1–2px painted stroke or a subtle SVG)
- Same green as brand color: `rgba(62, 207, 116, 0.3)` — glowing ground line

---

## 2. OVERVIEW

Build the Scout marketing homepage (`scoutqa.ai`) based on the Railway-style vertical scroll design visible in Figma. The page follows a single vertical timeline with progressive sections. Each section has:
- A left-side **step label** on a vertical timeline connector
- A **text block** (section name → H2 → body)
- A **product visual** (Scout app screenshot or UI)
- An **"Alternative to"** strip with competitor logos at the bottom

Copy is locked as shown in Figma. Do not change wording. Grammar/typo fixes are noted inline.

---

## 2. TECH REQUIREMENTS

| Item | Spec |
|---|---|
| Framework | Next.js 15 (existing codebase) |
| Styling | Tailwind CSS |
| Fonts | Scout brand font (existing) |
| Background | Dark navy — isometric illustrated style (starry night, matching Railway aesthetic already set in Figma) |
| Animations | Framer Motion — scroll-triggered fade-in for each section |
| Interactive demo | Tab switcher in "See Scout in Action" section (Start Test → Live Testing → Issues Found → Report) |
| FAQ | Accordion component with `+` expand icon |
| Metrics counter | Animated number flip (split-flap style, Railway reference) |
| Logo rows | SVG or PNG, grayscale, no outbound links |
| Responsive | Mobile: stack vertically, hide vertical timeline, keep all copy |
| Anonymous test | URL input submits to `app.scoutqa.ai` with URL as query param — no auth required |

---

## 3. PAGE SECTIONS — EXACT SPEC

---

### SECTION 1 — NAV

**Layout:** Fixed top bar, full width, transparent with blur

| Element | Content |
|---|---|
| Logo | Scout wordmark (green, existing brand asset) |
| Nav links | *(none shown in Figma — keep minimal)* |
| CTA Secondary | `Sign in` — ghost button |
| CTA Primary | `Start free →` — green filled button |

---

### SECTION 2 — HERO (Above the fold)

**Layout:** Full viewport height. Illustrated background (starry night sky, clouds — existing Figma asset). Centered content.

| Element | Content |
|---|---|
| H1 | `Ship it. Scout vibe test.` |
| H2 line 1 | `Find out if it actually works for customers who didn't` |
| H2 line 2 | `Paste your URL. Get a real quality report in seconds` |
| Input placeholder | `Enter your URL` |
| CTA button | `Start Scouting` — green |
| Visual | Pixel-art rabbit + pixel-art bug character (brand asset) centered below the input |
| Peek | Bottom edge of "See Scout in Action" card bleeds into view (~15% visible) — this creates the scroll pull |

**Input behavior:**
- On submit → redirect to `app.scoutqa.ai?url={encoded_url}`
- No validation beyond basic URL check (must start with http/https or add https:// automatically)
- No account prompt on this page

**Notes for engineer:**
- H2 line 2 typo fix: "in second" → "in seconds" *(copy stays as-is per owner, flagged only)*
- Pixel-art assets: use existing brand files, not emoji

---

### SECTION 3 — SEE SCOUT IN ACTION

**Layout:** Full-width dark card with rounded corners. Centered heading above the card. Inside the card: a tabbed interactive demo.

| Element | Content |
|---|---|
| Section heading | `See Scout in Action` |
| Subheading | `From pasting a URL to a full test report in minutes. Click through to explore each step.` |
| Tab 1 | `Start Test` |
| Tab 2 | `Live Testing` |
| Tab 3 | `Issues Found` |
| Tab 4 | `Report` |

**Tab 1 — Start Test content:**
- Mock browser chrome: `app.scoutqa.ai` in URL bar, red/yellow/green dots
- Scout icon (sparkle ✦)
- Prompt: `What would you like to test?`
- Text input with typing animation: `Test the che[ckout]`
- Below input: `Smart Mode` chip + URL chip `my-store.vercel.app` + `► Run` green button
- Suggestion chips (2×2 grid): `Test page navigation` · `Check forms & inputs` · `Test responsive design` · `Check interactive elements`
- Timer in bottom left: `► 0:12`

**Tab 2, 3, 4:** Placeholder for now — use static screenshots from existing app. Engineer to confirm with Huy for actual screen recordings.

**Notes:**
- Tabs are clickable but can be static images for MVP
- Card has `border: 1px solid rgba(255,255,255,0.1)` matching Figma style

---

### SECTION 4 — SOCIAL PROOF LOGO ROW

**Layout:** Full width, dark background, centered text above 2 logo rows with a section label above each row.

| Element | Content |
|---|---|
| Heading | `Test software build on any platform` |
| Row label 1 | `Built with` — small muted label above row 1 |
| Logo row 1 — Vibe coding platforms | Lovable · Replit · v0 · Base44 |
| Row label 2 | `Works inside` — small muted label above row 2 |
| Logo row 2 — Coding agents / IDEs | Claude Code · Cursor · Windsurf · Antigravity |

**Notes:**
- Two rows, each with its own label — separates "what you built with" from "where Scout runs"
- All logos grayscale / white, no color
- No outbound links on any logo
- Grid layout with subtle dividers between cells (matching Figma)
- Logo sources:
  - Lovable: lovable.dev brand assets
  - Replit: replit.com brand kit
  - v0: v0.dev (Vercel) brand assets
  - Base44: base44.com
  - Claude Code: Anthropic brand kit (use Claude logomark)
  - Cursor: cursor.com brand assets
  - Windsurf: codeium.com/windsurf brand assets
  - Antigravity: antigravity.ai brand assets

---

### SECTION 5 — STEP 1: GIVE SCOUT YOUR PRODUCT

**Layout:** Vertical timeline on left (circle node + connector line). Text block left side. Product visual right side. "Alternative to" strip below text block.

**Copy (do not change):**

```
[STEP LABEL / SECTION NAME]
Give Scout your product

[H2]
Vibe test anything
with no setup, no code

[BODY]
Paste any URL. Your app, your landing page, your staging link.
```

**Product visual:** Railway-style architecture diagram screenshot (existing Figma asset — the node graph showing frontend/backend/postgres)

---

**USP DIFFERENTIATOR STRIP — "Alternative to"**

*This is the new element to add. Pattern: small label + row of competitor logos (logos only, no names). Logo images sourced from brand kits. No outbound links.*

```
[LABEL]   Alternative to   [fork/branch icon]

[LOGO ROW — 5 logos, no names displayed]
  Playwright · Cypress · Selenium · Mabl · QA.tech
```

**USP context line** (appears above the logo row, small muted text):

> No test scripts. No browser setup. No configuration files.
> Just a URL — and Scout handles the rest.

**Why these competitors here:** These are script-based test frameworks. This section is about zero-setup entry — the contrast is "they require scripts to start, Scout requires only a URL."

---

### SECTION 6 — STEP 2: SEE THE MAGIC

**Layout:** Same vertical timeline pattern. Text left, visual right. "Alternative to" strip below.

**Copy (do not change):**

```
[SECTION NAME]
See the magic

[H2]
Discover what users are thinking
without hassle

[BODY]
"A first-time user who's never seen this." Plain English.
```

*(Note: "Discover .what" in Figma — the period before "what" appears to be a typo. Flag to owner before dev, keep as-is for now)*

**Product visual:** Railway networking screenshot (existing Figma asset — showing connections, TCP:5432, Private, Encrypted)

---

**USP DIFFERENTIATOR STRIP — "Alternative to"**

```
[LABEL]   Alternative to   [fork icon]

[LOGO ROW — 5 logos, no names]
  Octomind · Stably · QA.tech · BrowserStack · LambdaTest
```

**USP context line:**

> Describe the person, not the test.
> Scout infers what a real user would click, skip, or get confused by — you don't write a single step.

**Why these competitors here:** These tools require you to define test steps or generate scripts. This section is about intent-first natural language — the contrast is "they need you to specify what to test, Scout figures it out."

---

### SECTION 7 — STEP 3: DECODE THE INSIGHT

**Layout:** Same pattern. Text left, visual right. "Alternative to" strip below.

**Copy (do not change):**

```
[SECTION NAME]
Decode the insight

[H2]
Vibe score, quality report in one place.
Instant mind read into user of your product

[BODY]
A real quality report, ready in under 2 minutes

[BULLET 1]   Every finding is ranked by what matters most.
[BULLET 2]   Screenshots and live video included.
[BULLET 3]   Plain-English fix suggestions included.
```

**Bullet icon:** Small orange/amber sparkle icon (matching Figma — ✦ style)

**Product visual:** Grid of backend service cards (existing Figma asset — the 3×2 grid of "backend · Online" cards)

---

**USP DIFFERENTIATOR STRIP — "Alternative to"**

```
[LABEL]   Alternative to   [fork icon]

[LOGO ROW — 4 logos, no names]
  Sentry · Datadog · New Relic · LogRocket
```

**USP context line:**

> These tools alert you after a user hit the bug.
> Scout finds it before your users arrive — ranked, screenshotted, and ready to fix.

**Why these competitors here:** Sentry/Datadog/New Relic are production monitoring tools (post-incident). This section is about the report output — the contrast is "they tell you after damage is done, Scout tells you before."

---

### SECTION 8 — STEP 4: MONITOR 24/7 AND ALERT

**Layout:** Same pattern. Text left, visual right. "Alternative to" strip below.

**Copy (do not change):**

```
[SECTION NAME]
Monitor 24/7 and alert

[H2]
Vibe monitoring always on, just schedule
and stay away from unnoticed crash

[BODY]
(none — visual carries this section)
```

*(Note: "unnotice crash" in Figma — fix to "unnoticed crash" pending owner approval)*

**Product visual:** Observability/logs dashboard screenshot (existing Figma asset — error logs table + CPU/Memory/Network graphs)

---

**USP DIFFERENTIATOR STRIP — "Alternative to"**

```
[LABEL]   Alternative to   [fork icon]

[LOGO ROW — 3 logos, no names]
  Datadog · Sentry · Pingdom
```

**USP context line:**

> Scheduled vibe tests run while you sleep.
> Get alerted when something breaks — before a user files a complaint.

**Why these competitors here:** Uptime/infrastructure monitoring vs Scout's user-perspective monitoring. The contrast is "they monitor servers, Scout monitors the user experience."

---

### SECTION 9 — STEP 5: ACCUMULATED USER KNOWLEDGE

**Layout:** Same pattern. Text left, visual right. No "Alternative to" strip (this differentiator is unique — no direct competitor).

**Copy (do not change):**

```
[SECTION NAME]
Accumulated user knowledge

[H2]
An Agent that learns your product through the eyes
of every user profile you can imagine

[BODY / LINK STYLE]
Forget what the product looked like before and after — let Scout handle it
```

*(Note: "Forgot .what" in Figma — fix to "Forget what" pending owner approval)*

**Product visual:** Production vs PR comparison view (existing Figma asset — showing production environment and pr-112/pr-115 side by side)

**No "Alternative to" strip here.** This section is Scout's unique differentiator — no competitor claims this. The absence of the strip signals to the reader that this is territory Scout owns alone.

---

### SECTION 10 — SOCIAL PROOF / TESTIMONIALS

**Layout:** Dark background. Centered heading. CTA link. 2×2 card grid.

| Element | Content |
|---|---|
| Heading | `Trusted by builders, marketplace and SaaS company` |
| CTA | `Read customer stories →` — ghost button/link |

**Testimonial cards (2×2 grid):**

| Card | Author | Quote |
|---|---|---|
| Peter, Vibe coder from UK | Kartik Aggarwal, Tech Lead at Bilt | *[use real quote from Kartik — coordinate with Thảo]* |
| Kumar, Freelance Dev | Daniel Lobaton, CTO at G2X | *[use real quote — coordinate with Thảo]* |
| Unikorn | Daniel Moretti, Co-Founder & CTO at Mappa | *[use real quote]* |
| Amanote | Antoine Vulcain, Founder & CEO at Capitalyze | *[use real quote]* |

**Engineer note:** Testimonial names/quotes visible in Figma appear to be Railway's testimonials used as placeholders. Get real Scout testimonials from Thảo before going live. Card title = company/persona name. Body = quote in quotation marks. Footer = name, title.

---

### SECTION 11 — METRICS (Split-flap counter)

**Layout:** Full-width dark card with grid background. Centered heading. Animated counter rows.

| Element | Content |
|---|---|
| Heading | `14,000+ tests run (and counting)` |
| Subheading | `Real-time stats across all Scout users` |

**Counter rows (split-flap animation style — Railway reference):**

| # | Label | Display value | Raw number | Source |
|---|---|---|---|---|
| 1 | ISSUES FOUND | `86k+` | 86,000 | PostHog |
| 2 | HOURS SAVED | `6,500+` | See formula | Calculated from unique links |
| 3 | EXECUTIONS | `15k+` | 15,000 | PostHog |
| 4 | UNIQUE LINKS | `5.8k+` | 5,800 | PostHog |

**Hours saved — calculation formula:**

```
Basis: unique links tested (5,800)
Each unique link = one product someone would have manually checked

Scout runs per link:       5–10 min  (avg 7.5 min per execution)
Manual equivalent:         60–90 min (avg 75 min — exploratory check)
Time saved per link:       75 – 7.5  = 67.5 min saved

5,800 links × 67.5 min   = 391,500 min
                          ÷ 60
                          = 6,525 hours saved

Display as: 6,500+
```

**Section heading update:**
```
Old: "[X]+ tests run (and counting)"
New: "86,000+ issues found (and counting)"
```
Issues found is the most visceral number — it proves Scout finds real things, not just runs. Pair it with hours saved for the value 1-2 punch.

**Recommended display order** (most emotionally impactful first):
1. `86,000+` issues found
2. `6,500+` hours saved
3. `15,000+` executions run
4. `5,800+` unique products tested

**Animation:** Each digit flips independently (slot machine / departures board effect). Numbers increment on page enter via Intersection Observer.

```js
// Animate from 0 to target over 2s on scroll-into-view
// Stagger each row by 150ms
// Use requestAnimationFrame for smooth count-up
// Format with commas: 7000 → "7,000"
```

**Engineer note:** Hardcode values for MVP, add a `// TODO: pull from /api/stats` comment. The split-flap visual effect is the priority — use a library like `react-slot-counter` or `odometer.js` for the digit flip, or implement with CSS `@keyframes` on digit characters.

---

### SECTION 12 — FINAL CTA

**Layout:** Gradient background (dark purple/red glow — matching Figma). Centered. Stacked text above URL input.

| Element | Content |
|---|---|
| Eyebrow | `Vibe testing is` |
| Eyebrow line 2 | `the new future of builders` |
| H2 | `A better future is` |
| H2 line 2 | `now boarding` |
| Input placeholder | `Enter your URL` |
| Input CTA | `Start Scouting` — green button |
| Secondary CTA | `All Aboard` — purple pill button |

**Input behavior:** Same as hero — submit to `app.scoutqa.ai?url={encoded_url}`, no auth.

---

### SECTION 13 — FAQ

**Layout:** Light/white background (contrast break from dark). Centered heading. Accordion list.

| Element | Content |
|---|---|
| Heading | `Frequently Asked Questions` |

**Accordion items (collapsed by default, expand on click with `+` → `−`):**

| Q | A |
|---|---|
| Do I need to sign up to try it? | No. Paste your URL and hit Run. You'll get a report before we ask you for anything. |
| What kind of products can I test? | Any URL that's publicly accessible — web apps, landing pages, marketing sites, staging environments, SaaS dashboards. |
| What's the difference between Quick, Deep, and Smart? | Quick runs a fast health check in 90 seconds. Deep explores your full product flows. Smart lets you describe what to test in plain English — Scout figures out how. |
| What does Scout actually find? | Broken flows, confusing copy, layout problems, accessibility issues, error messages with no recovery path. Real things that affect whether users stay or leave. |
| Does it get better over time? | Yes. Every run adds to Scout's understanding of your product from a user's perspective. By run 3, it knows your flows. By run 10, it's surfacing patterns you'd never catch manually. |
| How much does it cost? | Free to start — no credit card, no time limit. Pro is $15/month. Less than what one bug reaching production costs you. |
| Can I use Scout in CI/CD? | Yes. Install the CLI, add one line to your pipeline. Full docs at docs.scoutqa.ai. |
| Who built this? | Scout is built by Katalon — the testing infrastructure company used by 100,000+ teams globally. Scout is their tool for founders and indie builders. |

---

## 4. THE "ALTERNATIVE TO" COMPONENT — FULL SPEC

This component appears at the bottom of Steps 1–4. It is new and not yet in the current HTML. Build it as a reusable component.

### Visual layout:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [small muted text — USP context, max 2 lines]      │
│                                                     │
│  ──────────────────────────────────────────────     │
│                                                     │
│  ⎇ Alternative to   [logo] [logo] [logo] [logo]    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Component props:

```tsx
interface AlternativeTo {
  uspText: string       // 1-2 lines of differentiator copy
  logos: {
    src: string         // path to logo SVG/PNG
    alt: string         // screen reader text (use company name)
    title?: string      // tooltip on hover (optional)
  }[]
}
```

### Styling:
- Background: `rgba(255,255,255,0.03)` — slightly lighter than page background
- Border top: `1px solid rgba(255,255,255,0.08)`
- USP text: `font-size: 13px`, `color: rgba(255,255,255,0.45)`, line-height 1.6
- Divider: `1px solid rgba(255,255,255,0.06)`
- "⎇ Alternative to" label: `font-size: 11px`, `color: rgba(255,255,255,0.3)`, monospace font
- Logos: grayscale filter (`filter: grayscale(1) opacity(0.4)`), hover → `opacity(0.7)`
- Logo height: `20px`, maintain aspect ratio
- Logo spacing: `gap: 24px`
- No outbound links on logos

### Full data per section:

**Step 1 — Give Scout your product:**
```
uspText: "No test scripts. No browser setup. No configuration files.\nJust a URL — and Scout handles the rest."
logos: [Playwright, Cypress, Selenium, Mabl, QA.tech]
```

**Step 2 — See the magic:**
```
uspText: "Describe the person, not the test.\nScout infers what a real user would click, skip, or get confused by."
logos: [Octomind, Stably, QA.tech, BrowserStack, LambdaTest]
```

**Step 3 — Decode the insight:**
```
uspText: "These tools alert you after a user hit the bug.\nScout finds it before your users arrive — ranked, screenshotted, ready to fix."
logos: [Sentry, Datadog, New Relic, LogRocket]
```

**Step 4 — Monitor 24/7:**
```
uspText: "Scheduled vibe tests run while you sleep.\nGet alerted when something breaks — before a user notices."
logos: [Datadog, Sentry, Pingdom]
```

**Step 5 — Accumulated knowledge:** No strip.

---

## 5. VERTICAL TIMELINE — SPEC

The left-side timeline runs through Sections 5–9 (the 5 steps).

```
●  ← filled circle node (16px, border: 2px solid accent color)
│
│  ← vertical line (1px, rgba(255,255,255,0.15))
│
○  ← next node
```

- Active node (current section in view): filled, glowing
- Inactive: outline only
- On scroll: nodes activate as section enters viewport (Intersection Observer)
- Mobile: hide timeline, keep step labels as inline text above each section

---

## 6. SCROLL ANIMATIONS

| Section enters viewport | Animation |
|---|---|
| Any section | Fade in + translateY(20px → 0), 400ms ease |
| Timeline node | Scale 0.8 → 1.0 + glow pulse, green glow `rgba(62,207,116,0.4)` |
| "Alternative to" strip | Slide up from below, 300ms, 100ms delay after text |
| Metrics counter | Number flip starts on enter, staggered per row 150ms apart |
| Logo rows | Fade in staggered left to right, 50ms between each |
| **Rabbit hop** | On each Step section entering viewport: rabbit translates to new X position with parabolic arc keyframe (see Section 1 — Rabbit spec). 400ms. Triggered once per step, not on every scroll tick. |
| Rabbit idle (at CTA) | Ear-wiggle loop: subtle `rotate(-5deg) → rotate(5deg)` on ear element, 800ms loop |
| Background parallax | Far layer (mountains): `translateY(scrollY * 0.1)`. Mid layer (clouds): `translateY(scrollY * 0.25)`. Near layer: `translateY(scrollY * 0.4)`. Use `will-change: transform` for GPU compositing. |

---

## 7. ASSETS NEEDED (coordinate with Huy/designer)

| Asset | Status | Notes |
|---|---|---|
| Pixel-art rabbit | Existing | Use in hero below input |
| Pixel-art bug | Existing | Paired with rabbit |
| Scout wordmark (green) | Existing | Nav |
| Starry night background | Existing Figma | Hero bg |
| Section 3 app screenshots | Need from Huy | Tab 2, 3, 4 content |
| Section 9 real testimonials | Need from Thảo | Replace Railway placeholders |
| Competitor logos | Need to source | Playwright, Cypress, Selenium, Mabl, QA.tech, Octomind, Stably, BrowserStack, LambdaTest, Sentry, Datadog, New Relic, LogRocket, Pingdom |
| Platform logos — row 1 (Section 4) | Need to source | Lovable · Replit · v0 · Base44 — download from each brand kit |
| Platform logos — row 2 (Section 4) | Need to source | Claude Code · Cursor · Windsurf · Antigravity — download from each brand kit |

---

## 8. OPEN QUESTIONS FOR THẢO BEFORE BUILD

1. **Testimonials** — Cards show Railway customer quotes. Need real Scout user quotes before go-live.
3. **Metrics numbers** — What are the real numbers for: issues found, active builders? Do we pull from PostHog live or hardcode?
4. **Section 8 copy** — "Forgot .what" → "Forget what" and "Discover .what" → "Discover what" — typo fix approval needed.
5. **"All Aboard" CTA** — Does this go to `app.scoutqa.ai` or `scoutqa.ai/pricing`? Confirm.
6. **"Read customer stories →"** — Is there a `/stories` or `/customers` page? If not, link to a placeholder or hide button.

---

## 9. LAUNCH CHECKLIST

- [ ] All copy matches Figma exactly (except approved typo fixes)
- [ ] URL inputs submit to `app.scoutqa.ai?url=` with no auth wall
- [ ] "Alternative to" strips built and reviewed by Thảo
- [ ] Real testimonials replace Railway placeholders
- [ ] Platform logos confirmed as real Scout users
- [ ] Competitor logos: grayscale, no outbound links, SVG preferred
- [ ] Mobile layout tested (iPhone 14 breakpoint minimum)
- [ ] Scroll animations tested at 60fps (no jank on low-end devices)
- [ ] FAQ accordion accessible (keyboard navigable)
- [ ] Meta title + description set for SEO
- [ ] OG image set for social sharing

---

*PRD authored March 11, 2026 | Owner: Thảo | Engineer: Thanh*
*Design reference: Figma — Hero frame (screenshots attached in Slack)*
