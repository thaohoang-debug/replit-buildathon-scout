import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  GitBranch,
  Globe,
  Play,
  Sparkles,
  X,
} from 'lucide-react'
import { siWordpress, siWebflow, siFramer, siWix } from 'simple-icons'
import './App.css'

function SiIcon({ icon, size = 20 }) {
  return (
    <svg fill={`#${icon.hex}`} height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d={icon.path} />
    </svg>
  )
}

const knowledgeNodes = [
  {
    id: 'root',
    label: 'logistic.rabbitfly.org',
    className: 'knowledge-node-root',
    style: { left: '7%', top: '69%' },
  },
  {
    id: 'sea',
    label: '/services/sea',
    style: { left: '30%', top: '16%' },
  },
  {
    id: 'tracking',
    label: '/tracking',
    style: { left: '30%', top: '30%' },
  },
  {
    id: 'admin',
    label: '/admin',
    style: { left: '30%', top: '44%' },
  },
  {
    id: 'global',
    label: '/services/global',
    style: { left: '30%', top: '55%' },
  },
  {
    id: 'missing-build',
    label: '/nonexistent-page-12345',
    style: { left: '30%', top: '66%' },
  },
  {
    id: 'missing',
    label: '/nonexistent-page',
    style: { left: '30%', top: '77%' },
  },
  {
    id: 'sitemap',
    label: '/sitemap.xml',
    style: { left: '30%', top: '88%' },
  },
  {
    id: 'land',
    label: '/services/land',
    style: { left: '56%', top: '16%' },
  },
  {
    id: 'tracking-upper',
    label: '/TRACKING',
    style: { left: '56%', top: '26%' },
  },
  {
    id: 'tracking-lower',
    label: '/nonexistent',
    style: { left: '56%', top: '36%' },
  },
  {
    id: 'dashboard',
    label: '/dashboard',
    style: { left: '56%', top: '44%' },
  },
  {
    id: 'favicon',
    label: '/favicon.ico',
    style: { left: '56%', top: '82%' },
  },
  {
    id: 'contact',
    label: '/contact',
    style: { left: '80%', top: '16%' },
  },
  {
    id: 'about',
    label: '/about',
    style: { left: '80%', top: '44%' },
  },
]

const knowledgePaths = [
  'M222 386 H266 V104 H300',
  'M222 386 H266 V182 H300',
  'M222 386 H266 V260 H300',
  'M222 386 H266 V322 H300',
  'M222 386 H266 V384 H300',
  'M222 386 H266 V446 H300',
  'M222 386 H266 V508 H300',
  'M438 104 H520',
  'M438 182 H494 V146 H520',
  'M438 182 H494 V208 H520',
  'M438 260 H520',
  'M438 474 H520',
  'M658 104 H744',
  'M658 260 H744',
]

const platformRows = [
  {
    label: 'Built with',
    logos: [
      { id: 'lovable', name: 'Lovable', src: '/logos/platforms/lovable.svg' },
      { id: 'replit', name: 'Replit', src: '/logos/platforms/replit.svg' },
      { id: 'v0', name: 'v0', src: '/logos/platforms/v0.svg' },
      { id: 'base44', name: 'Base44', src: '/logos/platforms/base44.png' },
    ],
  },
  {
    label: 'Works inside',
    logos: [
      { id: 'claude-code', name: 'Claude Code', src: '/logos/platforms/claude.svg' },
      { id: 'cursor', name: 'Cursor', src: '/logos/platforms/cursor.svg' },
      { id: 'windsurf', name: 'Windsurf', src: '/logos/platforms/windsurf.svg' },
      { id: 'antigravity', name: 'Antigravity', src: '/logos/platforms/antigravity.svg' },
    ],
  },
]

const platformToolDetails = {
  lovable: {
    audience: 'Lovable',
    context: 'latest Lovable preview',
    steps: ['Paste prompt in Lovable chat', 'Run Scout on preview URL', 'Apply fix prompts and re-check'],
    prompt: `Use ScoutQA to test the latest Lovable preview at [YOUR_URL].

Focus on:
- onboarding flow
- primary CTA path
- responsive layout issues

Run a full Scout scan and return:
1. top issues by severity
2. screenshots or replay notes
3. fix prompts I can apply immediately.`,
    output: ['Preview URL detected', '3 broken flows found', '4 fix prompts generated'],
  },
  replit: {
    audience: 'Replit',
    context: 'active Replit deployment',
    steps: ['Ask Replit Agent to run Scout', 'Scout scans pages and flows', 'Patch regressions before share'],
    prompt: `Run ScoutQA against the active Replit deployment at [YOUR_URL].

Test the app like a first-time user and check:
- navigation
- forms
- mobile responsiveness

Return a concise report with the biggest issues, why they matter, and a fix prompt for each.`,
    output: ['Replit deployment connected', 'Checkout form regression flagged', 'Ready-to-run fix prompts returned'],
  },
  v0: {
    audience: 'v0',
    context: 'current v0 preview',
    steps: ['Trigger Scout from v0 workflow', 'Scan new UI states in parallel', 'Verify fixes before publish'],
    prompt: `Use ScoutQA on the current v0 preview at [YOUR_URL].

Scan the app in parallel across key flows:
- landing page to signup
- navigation and empty states
- mobile layout

Summarize the findings and generate fix prompts I can use in v0 right away.`,
    output: ['Parallel scan started', '2 layout issues detected', 'Prompt-ready fixes prepared'],
  },
  base44: {
    audience: 'Base44',
    context: 'Base44 build preview',
    steps: ['Paste prompt in Base44 assistant', 'Scout inspects production-like flow', 'Loop findings back into build'],
    prompt: `Run ScoutQA on this Base44 build at [YOUR_URL].

Act like a real user and inspect:
- first-run experience
- form validation
- broken states or dead ends

Return the highest-priority issues plus a direct fix prompt for each one.`,
    output: ['Preview graph mapped', 'Broken validation state found', 'Fix prompts attached to each issue'],
  },
  'claude-code': {
    audience: 'Claude Code',
    context: 'editor workflow',
    steps: ['Paste prompt in Claude Code', 'Scout runs against target URL', 'Claude applies and verifies fixes'],
    prompt: `Use ScoutQA on [YOUR_URL] and act like a real first-time user.

Check:
- main conversion flow
- navigation clarity
- responsive issues

For every issue you find:
1. explain the user impact
2. provide a fix prompt I can run in Claude Code
3. tell me what to re-test after the fix.`,
    output: ['Scout run requested from Claude Code', 'User-impact summary generated', 'Closed-loop fix instructions ready'],
  },
  cursor: {
    audience: 'Cursor',
    context: 'editor workflow',
    steps: ['Paste prompt in Cursor', 'Scout scans the preview or prod URL', 'Use fix prompts without leaving editor'],
    prompt: `In Cursor, run ScoutQA against [YOUR_URL].

Cover the most important user journeys in parallel and report:
- critical usability issues
- mobile and layout regressions
- broken interactions

For each finding, generate a concrete fix prompt I can use immediately in Cursor, then suggest what to re-run in ScoutQA to verify.`,
    output: ['Cursor prompt accepted', 'Parallel user flows scanned', 'Fix prompts generated for each issue'],
  },
  windsurf: {
    audience: 'Windsurf',
    context: 'Windsurf agent workflow',
    steps: ['Kick off Scout from Windsurf', 'Collect ranked findings', 'Patch and re-run inside same loop'],
    prompt: `From Windsurf, run ScoutQA on [YOUR_URL].

Behave like a first-time user and inspect:
- top navigation
- key CTA flow
- forms and error states

Return a ranked issue list plus a ready-to-run Windsurf prompt for each fix.`,
    output: ['Windsurf agent loop active', 'Findings ranked by severity', 'Verification prompts included'],
  },
  antigravity: {
    audience: 'Antigravity',
    context: 'Antigravity workspace',
    steps: ['Send prompt in Antigravity', 'Scout explores real user paths', 'Review fixes with context attached'],
    prompt: `Use ScoutQA inside Antigravity for [YOUR_URL].

Scan the product as a new user and focus on:
- navigation dead ends
- missing feedback states
- responsive and interaction bugs

Return the report with concise fix prompts I can hand back to the coding agent immediately.`,
    output: ['Workspace context loaded', 'Real-user path issues found', 'Agent-ready fix prompts returned'],
  },
}

const timelineSteps = [
  {
    id: 'step-vision',
    title: "You built something real.\nNow prove it works.",
    body: "Most buildathon apps never get honest feedback before real users try them. Judges skim. Your users won't.",
  },
  {
    id: 'step0',
    sectionName: 'Powerful Agent',
    title: "Built by Katalon. Powered by AWS AgentCore.",
    body: "Scout behaves like a real customer exploring your app — no scripts, no setup. Get sharp feedback now, not after waiting in Replit's queue.",
    cta: { label: 'Learn more', href: 'https://aws.amazon.com/solutions/case-studies/katalon/' },
    visual: 'trust',
  },
  {
    id: 'step-criteria',
    sectionName: 'Buildathon-Ready Feedback',
    title: "Feedback mapped to\nReplit's judging criteria.",
    body: 'Replit scores 5,000+ apps — no one gets a real review. Scout audits your product against the actual criteria: clarity, functionality, and market fit. Win or not, you leave with actionable lessons instead of a number on a leaderboard.',
    visual: 'screenshot',
  },
  {
    id: 'step3',
    sectionName: 'Quality Signal',
    title: 'A grade worth sharing.\nProof you shipped something real.',
    body: "The prize resets. Your portfolio doesn't. A Scout quality badge proves you didn't just build — you built something that works.",
    cta: { label: 'Get your badge', href: 'https://app.scoutqa.ai' },
    visual: 'badge-share',
  },
  {
    id: 'step-momentum',
    sectionName: 'Keep Building',
    title: "The buildathon ends.\nYour product doesn't have to.",
    body: "Most projects die the week after — not because the idea was bad, but because no one tells you what to fix. Scout finds the issues and gives you a ready-to-use fix prompt for each one. Just copy, paste, and keep going.",
    visual: 'fix-prompt',
  },
  {
    id: 'step4',
    sectionName: 'Scout Everywhere',
    title: 'Vibe test on your favourite platform without leaving your editor',
    body:
      'Scout scans your pages, flows, and interactions in minutes — and every finding comes with a prompt your coding agent can run to fix it.',
    bullets: [
      'Parallel scanning — multiple flows covered in a single run',
      'Fix prompts included every ship',
      'Closed loop — find it, fix it, re-run Scout to verify. Done.',
    ],
    visual: 'none',
  },
]

const testimonials = [
  {
    label: 'Peter, Vibe coder from UK',
    name: 'Kartik Aggarwal',
    role: 'Tech Lead at Bilt',
  },
  {
    label: 'Kumar, Freelance Dev',
    name: 'Daniel Lobaton',
    role: 'CTO at G2X',
  },
  {
    label: 'Unikorn',
    name: 'Daniel Moretti',
    role: 'Co-Founder & CTO at Mappa',
  },
  {
    label: 'Amanote',
    name: 'Antoine Vulcain',
    role: 'Founder & CEO at Capitalyze',
  },
]

const metrics = [
  {
    label: 'ISSUES FOUND',
    target: 86000,
  },
  {
    label: 'HOURS SAVED',
    target: 6500,
  },
  {
    label: 'EXECUTIONS',
    target: 15000,
  },
  {
    label: 'UNIQUE LINKS',
    target: 5800,
  },
]

const faqs = [
  {
    question: 'Is Scout free to use?',
    answer:
      'Completely free. No credit card, no trial, no limits to worry about. Just paste your URL and go.',
  },
  {
    question: 'My app is built with Replit Agent. Can Scout test it?',
    answer:
      'Absolutely. Just paste your deployed Replit app URL and Scout runs immediately — no setup, no scripts, no config. It explores your app the same way a real user would and surfaces what needs fixing.',
  },
  {
    question: 'What does Scout actually check?',
    answer:
      "Scout tests your app against the criteria judges actually care about: clarity of concept, functionality, design, and user experience. You get a quality grade, ranked findings, and plain-English fix suggestions — not just a score.",
  },
  {
    question: 'How is this different from just asking a friend to try my app?',
    answer:
      "A friend gives you subjective reactions. Scout gives you structured findings mapped to real quality criteria — ranked by severity, with specific fixes attached. It's honest feedback at scale, available at 2am before your deadline.",
  },
  {
    question: 'Can I share my Scout report publicly?',
    answer:
      'Yes. Every Scout report has a shareable link. Post it on LinkedIn, X, or your GitHub README as proof that your app was quality-checked — not just shipped.',
  },
]

function formatCount(value) {
  return `${new Intl.NumberFormat('en-US').format(value)}+`
}

function normalizePath(path) {
  if (!path || path === '/') {
    return '/'
  }

  const normalized = path.replace(/\/+$/, '')
  return normalized || '/'
}

function useCountUp(target, active, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      return undefined
    }

    let frameId = 0
    let startTime = 0
    let timeoutId = 0

    const tick = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(frameId)
    }
  }, [active, delay, duration, target])

  return value
}

function ScoutWordmark() {
  return (
    <svg
      aria-label="Scout"
      className="brand-wordmark"
      fill="none"
      viewBox="0 0 200 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M192.602 10.136h7.397l-1.905 11.126h-7.34l-2.948 17.757q-.114.877.077 1.486.19.608.762.914.61.267 1.6.267.685.038 1.638-.153a45 45 0 0 0 1.486-.305l.457 10.822q-1.181.305-3.162.723-1.943.458-4.534.573-5.334.267-8.688-1.106-3.353-1.41-4.649-4.382t-.457-7.391l3.183-19.205h-4.677l-2.205 13.883q-.929 5.636-4.311 9.782-3.383 4.11-8.555 6.333-5.174 2.221-11.54 2.255-6.365-.034-10.809-2.255-4.41-2.221-6.4-6.333-1.562-3.312-1.284-7.576a25.9 25.9 0 0 1-3 5.707q-3.43 4.915-8.84 7.696-5.372 2.744-12.307 2.744t-11.43-2.744q-4.46-2.782-6.25-7.696-.85-2.354-1.046-5.072-1.197 3.791-3.51 6.825-3.164 4.152-8.117 6.439-4.915 2.248-11.24 2.248-6.936 0-11.432-2.744-4.457-2.782-6.249-7.696a18 18 0 0 1-.747-2.76q-.879 3.87-3.695 6.722-3.087 3.125-7.811 4.801t-10.441 1.677q-10.06 0-15.05-4-4.992-4.04-4.535-10.48h.43l-.22-.23h25.785q-.198-.368-.656-.608-.877-.495-3.315-.99l-7.316-1.296q-6.325-1.105-9.222-4.535-2.856-3.467-1.981-8.801.724-4.23 3.43-7.126 2.744-2.896 7.202-4.344Q18.633 9.603 24.5 9.603q9.564 0 14.48 3.847 4.867 3.812 4.053 10.426l.109.09h-.119l-.004.039H29.302v-.038H18.626q.08.376.427.724.571.534 2.933.99l8.383 1.525q6.325 1.181 9.22 4.268a8.2 8.2 0 0 1 1.712 2.721q.104-1.287.332-2.645 1.029-6.554 4.458-11.469 3.466-4.953 8.878-7.697 5.41-2.781 12.346-2.781 9.41 0 14.059 4.99 3.87 4.156 3.593 10.608a25.6 25.6 0 0 1 2.756-5.12q3.43-4.953 8.84-7.697 5.41-2.781 12.345-2.781 6.897 0 11.355 2.78 4.496 2.745 6.287 7.698.844 2.271 1.06 4.89l2.366-14.885h13.813L140.216 33.6q-.365 2.288.331 4.079a5.9 5.9 0 0 0 2.354 2.785c1.105.685 2.004 1.027 3.321 1.027 1.546 0 2.335-.342 3.617-1.027a9.5 9.5 0 0 0 3.217-2.785q1.326-1.791 1.691-4.08l4.056-23.513h13.814l-.008.05h4.753L179.042 0h15.242zm-88.073 10.003a12.08 12.08 0 0 1-10.014 7.641L56.41 31.748l36.008 1.643c4.088.186 7.182 3.757 6.78 7.82L98.02 53.087l4.773-11.41a15.38 15.38 0 0 1 11.848-9.255l18.449-2.84-17.946-1.479a7.13 7.13 0 0 1-6.553-7.101V9.669z"
        fill="currentColor"
      />
    </svg>
  )
}

function PixelRabbit({ idle }) {
  return (
    <svg
      aria-hidden="true"
      className={`pixel-rabbit ${idle ? 'pixel-rabbit-idle' : ''}`}
      shapeRendering="crispEdges"
      viewBox="0 0 180 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="rabbit-ears">
        <rect x="60" y="80" width="10" height="60" fill="white" />
        <rect x="170" y="80" width="10" height="60" fill="white" />
        <rect x="130" y="160" width="10" height="60" fill="white" />
        <rect x="20" y="140" width="10" height="70" fill="white" />
        <rect y="150" width="10" height="20" fill="white" />
        <path
          clipRule="evenodd"
          d="M100 30H90V70H160V80H170V140H160V150H90V160H130V210H120V200H110V180H100V210H80V200H90V190H50V200H40V210H30V140H40V130H60V140H70V80H80V10H100V30ZM70 150H80V140H70V150ZM130 140H140V130H130V140ZM110 130H120V100H110V130ZM150 130H160V100H150V130Z"
          fill="black"
          fillRule="evenodd"
        />
        <path d="M20 170H10V150H20V170Z" fill="black" />
        <path d="M160 30H150V60H140V10H160V30Z" fill="black" />
        <rect x="10" y="140" width="10" height="10" fill="white" />
        <rect x="10" y="170" width="10" height="10" fill="white" />
        <rect x="30" y="130" width="10" height="10" fill="white" />
        <rect x="70" y="140" width="10" height="10" fill="white" />
        <rect x="130" y="130" width="10" height="10" fill="#3ECF74" />
        <rect x="160" y="140" width="10" height="10" fill="white" />
        <rect x="70" y="190" width="10" height="20" fill="white" />
        <rect x="50" y="190" width="10" height="20" fill="white" />
        <rect x="50" y="190" width="40" height="10" fill="white" />
        <rect x="30" y="210" width="20" height="10" fill="white" />
        <rect x="80" y="210" width="20" height="10" fill="white" />
        <rect x="110" y="210" width="30" height="10" fill="white" />
        <rect x="40" y="120" width="30" height="10" fill="white" />
        <rect x="40" y="200" width="10" height="20" fill="white" />
        <rect x="110" y="200" width="10" height="20" fill="white" />
        <rect x="100" y="180" width="10" height="30" fill="white" />
        <rect x="150" y="100" width="10" height="30" fill="white" />
        <rect x="110" y="100" width="10" height="30" fill="white" />
        <rect x="160" y="10" width="10" height="70" fill="white" />
        <rect x="70" y="10" width="10" height="70" fill="white" />
        <rect x="90" y="30" width="10" height="40" fill="#3ECF74" />
        <rect x="150" y="30" width="10" height="40" fill="#3ECF74" />
        <rect x="100" y="10" width="10" height="60" fill="white" />
        <rect x="100" y="60" width="50" height="10" fill="white" />
        <rect x="90" y="150" width="70" height="10" fill="white" />
        <rect x="80" width="20" height="10" fill="white" />
        <rect x="140" width="20" height="10" fill="white" />
        <rect x="130" y="10" width="10" height="60" fill="white" />
      </g>
    </svg>
  )
}

function PixelBug() {
  return (
    <svg
      aria-hidden="true"
      className="pixel-bug"
      shapeRendering="crispEdges"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="40" y="20" width="10" height="20" fill="#FFFFFF" />
      <rect x="70" y="20" width="10" height="20" fill="#FFFFFF" />
      <rect x="30" y="40" width="60" height="10" fill="#FFFFFF" />
      <rect x="20" y="50" width="80" height="30" fill="#FFFFFF" />
      <rect x="30" y="80" width="60" height="10" fill="#FFFFFF" />
      <rect x="40" y="90" width="10" height="20" fill="#FFFFFF" />
      <rect x="70" y="90" width="10" height="20" fill="#FFFFFF" />
      <rect x="50" y="50" width="10" height="10" fill="#0A0A0A" />
      <rect x="60" y="50" width="10" height="10" fill="#3ECF74" />
      <rect x="10" y="55" width="10" height="10" fill="#FFFFFF" />
      <rect x="100" y="55" width="10" height="10" fill="#FFFFFF" />
    </svg>
  )
}

function PixelTurtle() {
  const G = '#52B788'
  const D = '#2D6A4F'
  const B = '#000'
  return (
    <svg aria-hidden="true" className="pixel-turtle" shapeRendering="crispEdges" viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">
      {/* Shell */}
      <rect x="30" y="10" width="80" height="10" fill={G} />
      <rect x="20" y="20" width="100" height="10" fill={G} />
      <rect x="20" y="30" width="100" height="10" fill={G} />
      <rect x="20" y="40" width="100" height="10" fill={G} />
      <rect x="30" y="50" width="80" height="10" fill={G} />
      {/* Shell pattern */}
      <rect x="30" y="10" width="80" height="3" fill={D} />
      <rect x="20" y="35" width="100" height="3" fill={D} />
      <rect x="68" y="10" width="3" height="50" fill={D} />
      <rect x="42" y="20" width="3" height="14" fill={D} />
      <rect x="94" y="20" width="3" height="14" fill={D} />
      <rect x="42" y="38" width="3" height="22" fill={D} />
      <rect x="94" y="38" width="3" height="22" fill={D} />
      {/* Shell outline */}
      <rect x="30" y="10" width="80" height="3" fill={B} />
      <rect x="20" y="20" width="3" height="40" fill={B} />
      <rect x="117" y="20" width="3" height="40" fill={B} />
      <rect x="30" y="57" width="80" height="3" fill={B} />
      {/* Neck */}
      <rect x="117" y="25" width="10" height="20" fill={G} />
      {/* Head */}
      <rect x="125" y="18" width="30" height="30" fill={G} />
      <rect x="125" y="18" width="30" height="3" fill={B} />
      <rect x="152" y="18" width="3" height="30" fill={B} />
      <rect x="125" y="45" width="30" height="3" fill={B} />
      {/* Eye */}
      <rect x="138" y="25" width="8" height="8" fill={B} />
      <rect x="140" y="27" width="3" height="3" fill="white" />
      {/* Mouth */}
      <rect x="148" y="38" width="7" height="3" fill={B} />
      {/* Tail */}
      <rect x="10" y="30" width="12" height="10" fill={G} />
      <rect x="10" y="30" width="12" height="3" fill={B} />
      <rect x="10" y="37" width="12" height="3" fill={B} />
      <rect x="10" y="30" width="3" height="10" fill={B} />
      {/* Legs */}
      <rect x="35" y="58" width="20" height="25" fill={G} />
      <rect x="30" y="76" width="25" height="10" fill={G} />
      <rect x="35" y="58" width="20" height="3" fill={B} />
      <rect x="30" y="83" width="25" height="3" fill={B} />
      <rect x="85" y="58" width="20" height="25" fill={G} />
      <rect x="85" y="76" width="25" height="10" fill={G} />
      <rect x="85" y="58" width="20" height="3" fill={B} />
      <rect x="85" y="83" width="25" height="3" fill={B} />
    </svg>
  )
}

function RaceVisual() {
  return (
    <div className="visual-frame visual-race">
      <div className="visual-glow" />
      <div className="race-track">
        {/* Speed lines behind bunny */}
        <div className="race-speed-lines" aria-hidden="true">
          {[0,1,2,3,4].map(i => <span key={i} style={{ '--i': i }} />)}
        </div>
        {/* Scout bunny — far ahead */}
        <div className="race-char race-bunny">
          <div className="race-label race-label-scout">
            <span className="race-label-dot" />
            Scout
          </div>
          <PixelRabbit idle />
        </div>
        {/* Turtle — lagging behind */}
        <div className="race-char race-turtle-wrap">
          <PixelTurtle />
          <div className="race-label race-label-tools">
            <span>Playwright</span>
            <i />
            <span>TestSprite</span>
          </div>
        </div>
        {/* Track ground */}
        <div className="race-ground">
          <div className="race-dashes" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryBackground({ scrollY }) {
  return (
    <div aria-hidden="true" className="story-background">
      <div className="story-stars" />
      <div
        className="story-cloud story-cloud-left"
        style={{ transform: `translate3d(0, ${scrollY * 0.25}px, 0)` }}
      />
      <div
        className="story-cloud story-cloud-right"
        style={{ transform: `translate3d(0, ${scrollY * 0.22}px, 0)` }}
      />
      <div
        className="story-mountains story-mountains-far"
        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
      />
      <div
        className="story-mountains story-mountains-mid"
        style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
      />
    </div>
  )
}

function DemoPanel() {
  return (
    <div className="demo-video-panel">
      <div className="demo-window-bar">
        <span />
        <span />
        <span />
        <p>app.scoutqa.ai</p>
      </div>
      <div className="demo-video-shell">
        <video
          autoPlay
          className="demo-video"
          loop
          muted
          playsInline
          src="/Interact.mov"
        >
          Your browser does not support the demo video.
        </video>
      </div>
    </div>
  )
}

function LogoCell({ logo, onClick }) {
  const name = typeof logo === 'string' ? logo : logo.name
  const content =
    typeof logo === 'string' ? (
      <span>{logo}</span>
    ) : (
      <img alt={logo.name} className="logo-mark" src={logo.src} />
    )

  if (onClick) {
    return (
      <button
        aria-label={`Open ${name}`}
        className="logo-cell logo-cell-button"
        onClick={onClick}
        type="button"
      >
        {content}
        <span className="logo-hover-label">See how Scout compares ↗</span>
      </button>
    )
  }

  if (typeof logo === 'string') {
    return (
      <div className="logo-cell" role="img" aria-label={logo}>
        {content}
      </div>
    )
  }

  return <div className="logo-cell">{content}</div>
}

function AlternativeTo({ label = 'BETTER THAN', onLogoClick, uspText, logos }) {
  return (
    <div className="alternative-strip fade-section">
      {uspText ? <div className="alternative-divider" /> : null}
      <div className="alternative-row">
        <div className="alternative-label">
          <GitBranch size={12} />
          <span>{label}</span>
        </div>
        <div className="alternative-logos">
          {logos.map((logo) => (
            <LogoCell
              key={typeof logo === 'string' ? logo : logo.name}
              logo={logo}
              onClick={
                typeof logo === 'object' && logo.route && onLogoClick
                  ? () => onLogoClick(logo.route)
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const comparePages = {
  '/playwright-compare': {
    kicker: 'Scout vs Playwright',
    heading: 'Why ScoutQA is a better fit for vibe testing than Playwright',
    intro: 'Playwright is strong when you want authored test automation. ScoutQA is better when you want real-user quality feedback fast, without building and maintaining the test system yourself.',
    competitorName: 'Playwright',
    sections: [
      {
        title: 'Without configuration',
        scout: [
          'Paste a URL and run immediately',
          'No browser setup or test project scaffolding',
          'No selectors, fixtures, or assertions to maintain',
        ],
        competitor: [
          'Requires project setup and test structure',
          'Needs authored scripts and maintained selectors',
          'Extra work whenever the UI changes',
        ],
        visual: 'Zero setup. URL in, report out.',
      },
      {
        title: 'Better report',
        scout: [
          'Findings ranked by impact',
          'Screenshots, plain-English summaries, and fix prompts together',
          'Built for fast triage, not raw logs',
        ],
        competitor: [
          'You get execution results, but reporting quality depends on your setup',
          'Debugging context usually needs extra tooling',
          'Human-readable issue summaries are not the default output',
        ],
        visual: 'Issue report, screenshots, and fix prompts in one loop.',
      },
      {
        title: 'Tracking',
        scout: [
          'Knowledge accumulates over repeated runs',
          'Bugs stay centralized in one place',
          'Continuous updates make regressions easy to spot',
        ],
        competitor: [
          'Execution history exists, but product knowledge does not compound the same way',
          'Bugs are often split across CI, dashboards, and manual notes',
          'Continuous maintenance stays on the team',
        ],
        visual: 'Better knowledge. Centralized bugs. Continuous updates.',
      },
    ],
  },
  '/testsprite-compare': {
    kicker: 'Scout vs TestSprite',
    heading: 'AI that runs your tests, not just writes them.',
    intro: 'TestSprite is impressive at generating test scripts from your UI — but generated code is still code. Scout skips the generation step entirely and goes straight to findings, so your team spends time fixing bugs, not reviewing scripts.',
    competitorName: 'TestSprite',
    sections: [
      {
        title: 'No code, no review',
        scout: [
          'Paste a URL and get a full findings report — no code involved',
          'No generated scripts to read, approve, or clean up',
          'Nothing to maintain when your UI changes',
        ],
        competitor: [
          'Generates test scripts automatically, but someone still has to review them',
          'Generated code drifts when the UI changes and needs manual updates',
          'Code review and maintenance overhead stays on the team',
        ],
        visual: 'No scripts. No review. Just findings.',
      },
      {
        title: 'Instant findings',
        scout: [
          'Bugs surface immediately after each run — ranked by impact',
          'Plain-English summaries and fix prompts come with every issue',
          'No pipeline configuration required to see results',
        ],
        competitor: [
          'You get tests faster, but findings still come from running and interpreting generated scripts',
          'Actionable fix guidance depends on your setup, not built in by default',
          'Getting to a shareable report takes extra steps beyond generation',
        ],
        visual: 'Run it. Read the findings. Ship the fix.',
      },
      {
        title: 'Living knowledge',
        scout: [
          'Each run compounds — Scout builds context about your product over time',
          'Regressions are caught automatically across repeated runs',
          'Bugs stay centralized, not scattered across script files and CI logs',
        ],
        competitor: [
          'Generated scripts capture a snapshot of your UI, not ongoing product knowledge',
          'Regression detection depends on keeping generated scripts current',
          'Test history lives in code repositories, not a shared findings layer',
        ],
        visual: "Knowledge that grows. Regressions that don't hide.",
      },
    ],
  },
  '/lighthouse-compare': {
    kicker: 'Scout vs Lighthouse',
    heading: 'Scores tell you something is wrong. Scout tells you what to fix.',
    intro: 'Lighthouse is the gold standard for auditing page quality — performance, accessibility, SEO, all in one report. But it tests a page at a point in time, not a product in motion. Scout tests real user flows, ranks actual bugs, and tells you exactly how to fix them.',
    competitorName: 'Lighthouse',
    sections: [
      {
        title: 'Flows, not snapshots',
        scout: [
          'Tests multi-step user flows — login, checkout, form submission, navigation',
          'Catches bugs that only appear after interaction, not on page load',
          'Simulates what a real user actually does across your product',
        ],
        competitor: [
          'Audits a single page at a point in time, not a sequence of actions',
          'Interaction bugs and flow-level regressions fall outside its scope',
          'Cannot follow a user journey across pages or states',
        ],
        visual: 'Scout tests flows. Lighthouse tests pages.',
      },
      {
        title: 'Actionable findings',
        scout: [
          'Every finding comes with a plain-English summary and a fix prompt',
          'Issues are ranked by impact so the team knows what to tackle first',
          'Reports are built for fast triage, not metric interpretation',
        ],
        competitor: [
          'Delivers scores and flagged metrics — translating them into fixes is on you',
          'Prioritization across findings requires manual judgment',
          'Useful for audits, but not optimized for a fix-first workflow',
        ],
        visual: 'Ranked bugs with fix prompts — not a scorecard to interpret.',
      },
      {
        title: 'Continuous coverage',
        scout: [
          'Run on every deploy to catch regressions as they happen',
          'Knowledge compounds across runs — Scout learns your product over time',
          'Bugs stay centralized and tracked, not buried in one-off audit reports',
        ],
        competitor: [
          'Best used as a periodic audit, not a continuous regression layer',
          'Each run is independent — historical context does not carry forward',
          'Regression detection for interaction bugs requires additional tooling',
        ],
        visual: 'Every deploy. Every flow. Regressions caught early.',
      },
    ],
  },
}

function ComparePage({ onNavigateHome, pageData }) {
  const [url, setUrl] = useState('')

  const handleCtaSubmit = (event) => {
    event.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    try {
      const parsed = new URL(normalized)
      window.location.href = `https://app.scoutqa.ai?url=${encodeURIComponent(parsed.toString())}`
    } catch {
      // invalid url, do nothing
    }
  }

  return (
    <main className="page-shell compare-page-shell">
      <section className="compare-hero">
        <div className="compare-hero-copy fade-section is-visible">
          <p className="section-kicker">{pageData.kicker}</p>
          <h1>{pageData.heading}</h1>
          <p className="compare-intro">{pageData.intro}</p>
          <div className="compare-actions">
            <button className="button button-primary" onClick={onNavigateHome} type="button">
              Back to Homepage
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="compare-grid">
        {pageData.sections.map((section) => (
          <article className="compare-card fade-section is-visible" key={section.title}>
            <div className="compare-card-copy">
              <p className="section-kicker">{section.title}</p>
              <div className="compare-columns">
                <div className="compare-column compare-column-scout">
                  <h2>ScoutQA</h2>
                  <ul className="compare-list">
                    {section.scout.map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="compare-column compare-column-playwright">
                  <h2>{pageData.competitorName}</h2>
                  <ul className="compare-list compare-list-muted">
                    {section.competitor.map((item) => (
                      <li key={item}>
                        <span className="compare-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="compare-visual">
              <div className="compare-visual-window">
                <div className="compare-visual-top">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="compare-visual-body">
                  <div className="compare-visual-badge">Scout run</div>
                  <strong>{section.visual}</strong>
                  <div className="compare-visual-bars">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="compare-visual-footer">
                    <span>No config</span>
                    <i />
                    <span>Better report</span>
                    <i />
                    <span>Continuous tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="final-cta-section">
        <div className="final-cta-card fade-section is-visible">
          <div className="final-copy">
            <h2>
              <span className="title-line">Your app is built.</span>
              <span className="title-line">Now make sure it works.</span>
            </h2>
          </div>
          <form className="url-form final-form" onSubmit={handleCtaSubmit}>
            <input
              aria-label="Enter your URL"
              name="compare-cta-url"
              onChange={(event) => setUrl(event.target.value)}
              placeholder="Enter your URL"
              type="text"
              value={url}
            />
            <button className="button button-primary" type="submit">
              Start Scouting
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function HowToRunPage({ onNavigateHome }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    try {
      const parsed = new URL(normalized)
      window.location.href = `https://app.scoutqa.ai?url=${encodeURIComponent(parsed.toString())}`
    } catch {
      // invalid url
    }
  }

  const methods = [
    {
      id: 'vibe',
      label: 'Vibe Coding Tools',
      platforms: 'Lovable · Replit',
      heading: 'Add .scoutqa to your domain',
      description: 'Get instant testing on Lovable and Replit. Just add .scoutqa to your domain and you\'re ready to go.',
      steps: [
        'Deploy or preview your app on Lovable or Replit',
        'Add .scoutqa to your preview domain (e.g. your-app.lovable.app.scoutqa)',
        'Scout scans your app instantly and returns ranked findings with fix prompts',
      ],
      code: 'your-app.lovable.app.scoutqa',
      codeLabel: 'Your domain',
    },
    {
      id: 'cli',
      label: 'CLI',
      platforms: 'Any terminal · CI/CD · GitHub Actions',
      heading: 'Install once, run anywhere',
      description: 'The Scout CLI lets you run scans from your terminal or drop it into any CI/CD pipeline. One line to install, one command to test.',
      steps: [
        'Install the Scout CLI via npm',
        'Run scout <url> to scan any publicly accessible URL',
        'Use scout tunnel for local dev environments',
      ],
      code: 'npm install -g @scoutqa/cli\nscout run https://your-app.com',
      codeLabel: 'Terminal',
    },
    {
      id: 'mcp',
      label: 'MCP Server',
      platforms: 'Claude Code · Cursor · Windsurf · Replit Agent',
      heading: 'Use Scout inside your coding agent',
      description: 'Connect Scout as an MCP server so your coding agent can call it directly. Scout becomes a tool your agent can invoke as part of any fix loop.',
      steps: [
        'Add the Scout MCP server to your agent config',
        'Your agent calls Scout automatically when testing is needed',
        'Findings and fix prompts flow directly back into the agent context',
      ],
      code: '{\n  "mcpServers": {\n    "scout": {\n      "command": "npx",\n      "args": ["-y", "@scoutqa/mcp"]\n    }\n  }\n}',
      codeLabel: 'mcp.json',
    },
    {
      id: 'web',
      label: 'Web Builders',
      platforms: 'WordPress · Webflow · Framer · Wix',
      heading: 'Paste your URL — no setup needed',
      description: 'For sites built on web builder platforms, just paste your live URL into Scout. No installs, no config. Scout tests it like a real user and returns ranked findings instantly.',
      steps: [
        'Publish or preview your site in WordPress, Webflow, Framer, or Wix',
        'Copy your live or staging URL',
        'Paste it into Scout below and hit Start Scouting',
      ],
      code: null,
      codeLabel: null,
    },
  ]

  return (
    <main className="page-shell compare-page-shell">
      <section className="compare-hero">
        <div className="compare-hero-copy fade-section is-visible">
          <p className="section-kicker">Quick run tips</p>
          <h1>Scout works wherever you build</h1>
          <p className="compare-intro">
            Whether you're in a vibe coding tool, a coding agent, or a no-code builder — Scout fits into your workflow without setup.
          </p>
          <div className="compare-actions">
            <button className="button button-primary" onClick={onNavigateHome} type="button">
              Back to Homepage
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="how-to-grid">
        {methods.map((method) => (
          <article className="how-to-card fade-section is-visible" key={method.id}>
            <div className="how-to-card-inner">
              <div className="how-to-meta">
                <p className="section-kicker">{method.label}</p>
                <p className="how-to-platforms">{method.platforms}</p>
              </div>
              <h2 className="how-to-heading">{method.heading}</h2>
              <p className="how-to-desc">{method.description}</p>
              <ol className="how-to-steps">
                {method.steps.map((step, i) => (
                  <li key={i}>
                    <span className="how-to-step-num">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {method.code && (
                <div className="how-to-code-block">
                  <p className="how-to-code-label">{method.codeLabel}</p>
                  <pre>{method.code}</pre>
                </div>
              )}
              {method.id === 'web' && (
                <form className="url-form how-to-form" onSubmit={handleSubmit}>
                  <input
                    aria-label="Enter your URL"
                    name="how-to-url"
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="Enter your URL"
                    type="text"
                    value={url}
                  />
                  <button className="button button-primary" type="submit">
                    Start Scouting
                  </button>
                </form>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="final-cta-section">
        <div className="final-cta-card fade-section is-visible">
          <div className="final-copy">
            <h2>
              <span className="title-line">Your app is built.</span>
              <span className="title-line">Now make sure it works.</span>
            </h2>
          </div>
          <form className="url-form final-form" onSubmit={handleSubmit}>
            <input
              aria-label="Enter your URL"
              name="how-to-cta-url"
              onChange={(event) => setUrl(event.target.value)}
              placeholder="Enter your URL"
              type="text"
              value={url}
            />
            <button className="button button-primary" type="submit">
              Start Scouting
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function PlatformSectionContent({ onLogoSelect }) {
  return (
    <>
      <div className="section-heading fade-section">
        <h2>Test software build on any platform</h2>
      </div>
      <div className="platform-rows">
        {platformRows.map((row) => (
          <div className="platform-row fade-section" key={row.label}>
            <p className="row-label">{row.label}</p>
            <div className="logo-grid">
              {row.logos.map((logo) => (
                <LogoCell key={logo.name} logo={logo} onClick={() => onLogoSelect(logo)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function PlatformPromptModal({ onClose, tool }) {
  if (!tool) {
    return null
  }

  const details = platformToolDetails[tool.id]

  if (!details) {
    return null
  }

  return (
    <div className="platform-modal-backdrop" onClick={onClose} role="presentation">
      <div
        aria-labelledby="platform-modal-title"
        aria-modal="true"
        className="platform-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close platform prompt modal"
          className="platform-modal-close"
          onClick={onClose}
          type="button"
        >
          <X size={16} />
        </button>

        <div className="platform-modal-columns">
          <section className="platform-modal-pane platform-prompt-pane">
            <div className="platform-modal-header">
              <div className="platform-modal-logo">
                <img alt={tool.name} className="logo-mark" src={tool.src} />
              </div>
              <div>
                <p className="platform-modal-kicker">Prompt to add in {details.audience}</p>
                <h3 id="platform-modal-title">Run ScoutQA from {tool.name}</h3>
              </div>
            </div>

            <p className="platform-modal-copy">
              Paste this into {details.audience} to run ScoutQA against your{' '}
              {details.context}. Replace <code>[YOUR_URL]</code> before running.
            </p>

            <pre className="platform-prompt-block">
              <code>{details.prompt}</code>
            </pre>
          </section>

          <section className="platform-modal-pane platform-visual-pane">
            <div className="platform-visual-frame">
              <div className="visual-glow" />
              <div className="platform-visual-window">
                <div className="platform-visual-toolbar">
                  <span />
                  <span />
                  <span />
                  <p>{tool.name}</p>
                </div>

                <div className="platform-visual-body">
                  <div className="platform-visual-card">
                    <small>Scout run</small>
                    <strong>{details.context}</strong>
                    <span>Scan launched from {details.audience}</span>
                  </div>

                  <div className="platform-visual-output">
                    {details.output.map((item) => (
                      <div className="platform-output-row" key={item}>
                        <span className="platform-output-dot" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="platform-visual-footer">
                    <span>Find</span>
                    <i />
                    <span>Fix</span>
                    <i />
                    <span>Verify</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const orbitRings = [
  {
    key: 'vibe',
    label: 'Vibe Code Platforms',
    r: 190,
    duration: 30,
    cw: true,
    items: [
      { name: 'Lovable', src: '/logos/platforms/lovable.svg' },
      { name: 'Replit',  src: '/logos/platforms/replit.svg' },
      { name: 'v0',      src: '/logos/platforms/v0.svg' },
      { name: 'Base44',  src: '/logos/platforms/base44.png' },
    ],
  },
  {
    key: 'agent',
    label: 'Coding Agents',
    r: 330,
    duration: 45,
    cw: false,
    items: [
      { name: 'Claude',      src: '/logos/platforms/claude.svg' },
      { name: 'Cursor',      src: '/logos/platforms/cursor.svg' },
      { name: 'Antigravity', src: '/logos/platforms/antigravity.svg' },
      { name: 'Codex',       src: '/logos/platforms/codex.svg' },
      { name: 'Windsurf',    src: '/logos/platforms/windsurf.svg' },
    ],
  },
  {
    key: 'web',
    label: 'Web Builders',
    r: 480,
    duration: 65,
    cw: true,
    items: [
      { name: 'WordPress', siIcon: () => <SiIcon icon={siWordpress} size={34} /> },
      { name: 'Webflow',   siIcon: () => <SiIcon icon={siWebflow}   size={34} /> },
      { name: 'Framer',    siIcon: () => <SiIcon icon={siFramer}    size={34} /> },
      { name: 'Wix',       siIcon: () => <SiIcon icon={siWix}       size={34} /> },
    ],
  },
]

function OrbitVisual() {
  return (
    <div className="orbit-wrap">
      {/* Orbit ring borders + labels */}
      {orbitRings.map((ring) => (
        <div key={ring.key} className="orbit-ring-border" style={{ width: ring.r * 2, height: ring.r * 2 }}>
          <span className="orbit-ring-label">{ring.label}</span>
        </div>
      ))}

      {/* Center */}
      <div className="orbit-center">
        <span className="orbit-center-label">Scout</span>
        <span className="orbit-center-sub">Works everywhere</span>
      </div>

      {/* Items per ring */}
      {orbitRings.map((ring) =>
        ring.items.map((item, i) => {
          const delay = -((ring.duration * i) / ring.items.length)
          return (
            <div
              key={item.name}
              className={`orbit-item ${ring.cw ? 'orbit-item-cw' : 'orbit-item-ccw'}`}
              style={{
                '--orbit-r': `${ring.r}px`,
                '--orbit-dur': `${ring.duration}s`,
                '--orbit-delay': `${delay}s`,
              }}
            >
              <div
                className={`orbit-logo ${ring.cw ? 'orbit-logo-ccw' : 'orbit-logo-cw'}`}
                style={{ '--orbit-dur': `${ring.duration}s`, '--orbit-delay': `${delay}s` }}
                data-name={item.name}
              >
                {item.siIcon
                  ? item.siIcon()
                  : item.src
                    ? <img alt={item.name} src={item.src} />
                    : <span>{item.name}</span>
                }
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}


function StepVisual({ variant }) {
  if (variant === 'architecture') {
    return (
      <div className="visual-frame visual-architecture">
        <div className="visual-glow" />
        <div className="scout-composer">
          <div className="scout-composer-prompt">
            <div aria-hidden="true" className="scout-composer-input" />
            <span className="scout-composer-counter">0 / 5,000</span>
          </div>
          <div className="scout-composer-actions">
            <button className="scout-chip" type="button">
              <Sparkles size={18} />
              <span>Smart mode</span>
              <ChevronDown size={16} />
            </button>
            <div className="scout-chip scout-chip-url">
              <Globe size={18} />
              <span className="scout-chip-placeholder" />
            </div>
            <button className="scout-run-button" type="button">
              <Play size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'network') {
    return (
      <div className="visual-frame visual-network">
        <div className="visual-glow" />
        <div className="service-stack">
          <div className="service-card service-card-top">
            <div className="service-title">
              <span className="service-orb" />
              <div>
                <strong>ackee analytics</strong>
                <span>api-prod.up.railway.app</span>
              </div>
            </div>
            <div className="service-meta">
              <span className="service-check">✓</span>
              <span>Online</span>
            </div>
          </div>
          <div className="pixel-stream" aria-hidden="true">
            {Array.from({ length: 32 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="stack-connector-pill network-pill-wide">
            <span className="service-check">✓</span>
            <span>TCP:5432</span>
            <i />
            <span>Private</span>
            <i />
            <span>Encrypted</span>
            <i />
            <span>&lt;1ms</span>
          </div>
          <div className="service-card service-card-bottom">
            <div className="service-title">
              <span className="service-orb service-orb-db" />
              <div>
                <strong>postgres</strong>
                <span>Primary database</span>
              </div>
            </div>
            <div className="service-meta">
              <span className="service-check">✓</span>
              <span>2 days ago via CLI</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'trust') return (
    <div className="visual-frame visual-trust">
      <div className="visual-glow" />
      <div className="trust-badges">
        <div className="trust-halo-card">
          <img src="/logos/katalon-logo.jpg" alt="Katalon" className="trust-logo-img" />
        </div>
        <div className="trust-halo-card">
          <img src="/logos/badges.png" alt="G2 Momentum Leader · AWS Qualified Software · AWS Partner" className="trust-logo-img" />
        </div>
      </div>
    </div>
  )

  if (variant === 'fix-prompt') return (
    <div className="visual-frame visual-screenshot">
      <div className="visual-glow" />
      <img src="/logos/scout-fix-prompt.png" alt="Scout fix prompt showing how to fix issues" className="screenshot-img" />
    </div>
  )

  if (variant === 'badge-share') return (
    <div className="visual-frame visual-screenshot">
      <div className="visual-glow" />
      <img src="/logos/scout-badge-share.png" alt="Scout quality badge shared on Discord" className="screenshot-img" />
    </div>
  )

  if (variant === 'screenshot') return (
    <div className="visual-frame visual-screenshot">
      <div className="visual-glow" />
      <img src="/logos/scout-report.png" alt="Scout report showing Replit buildathon criteria feedback" className="screenshot-img" />
    </div>
  )

  if (variant === 'race') return <RaceVisual />

  if (variant === 'vibe') return (
    <div className="visual-frame visual-vibe">
      <div className="visual-glow" />
      <div className="vibe-browser">
        <div className="vibe-bar">
          <span /><span /><span />
          <div className="vibe-url">yourapp.com</div>
        </div>
        <div className="vibe-page">
          <div className="vibe-lines">
            <div className="vibe-line vibe-line-xl" />
            <div className="vibe-line vibe-line-md" />
            <div className="vibe-line vibe-line-sm" />
            <div className="vibe-line vibe-line-btn" />
          </div>
          <div className="vibe-marker" style={{ top: '18%', left: '8%', '--d': '0s' }}>
            <div className="vibe-dot" />
            <div className="vibe-tip">CTA is below fold on mobile</div>
          </div>
          <div className="vibe-marker" style={{ top: '52%', right: '10%', '--d': '0.4s' }}>
            <div className="vibe-dot" />
            <div className="vibe-tip">Save button looks disabled</div>
          </div>
          <div className="vibe-marker" style={{ bottom: '20%', left: '38%', '--d': '0.8s' }}>
            <div className="vibe-dot" />
            <div className="vibe-tip">First-time users exit here</div>
          </div>
        </div>
      </div>
    </div>
  )

  if (variant === 'none') return null

  if (variant === 'orbit') {
    return (
      <div className="visual-frame visual-orbit">
        <div className="visual-glow" />
        <OrbitVisual />
      </div>
    )
  }

  if (variant === 'report') {
    return (
      <div className="visual-frame visual-report">

        {/* Live view — full width base image */}
        <img alt="Scout live view" className="rpt-img-live" src="/scout-live-view.png" />


        {/* Vibe score pill — top-left */}
        <div className="rpt-ab-pill">
          <span className="rpt-ab-pill-title">Vibe Score</span>
          <strong className="rpt-ab-score-num">42</strong>
          <span className="rpt-ab-pill-sub">5 issues found</span>
        </div>

        {/* Ranked findings — bottom-left */}
        <div className="rpt-findings-pill">
          <p className="rpt-findings-heading">Ranked findings</p>
          {[
            { rank: 1, sev: 'Critical', text: '/enterprise crashes — blank page', top: true },
            { rank: 2, sev: 'Critical', text: 'Form submits with no validation' },
            { rank: 3, sev: 'Critical', text: 'Login accepts empty email' },
            { rank: 4, sev: 'High',     text: 'Empty page title on auth redirect' },
            { rank: 5, sev: 'High',     text: 'React hydration errors on /agents' },
          ].map((f) => (
            <div key={f.rank} className={`rpt-finding-row ${f.top ? 'rpt-finding-row-top' : ''}`}>
              <span className="rpt-finding-rank">#{f.rank}</span>
              <span className={`rpt-finding-sev rpt-finding-sev-${f.sev.toLowerCase()}`}>{f.sev}</span>
              <span className="rpt-finding-text">{f.text}</span>
              {f.top && <span className="rpt-finding-tag">★ Top issue</span>}
            </div>
          ))}
        </div>

        {/* Fix suggestion card — bottom-right */}
        <div className="rpt-fix-card">
          <div className="rpt-fix-header">
            <span className="rpt-fix-title">Login accepts empty email field</span>
            <span className="rpt-fix-sev">● Critical</span>
          </div>
          <div className="rpt-fix-section">
            <p className="rpt-fix-label">IMPACT</p>
            <p className="rpt-fix-body">Users submit login with no email — form silently fails, no feedback, appears broken</p>
          </div>
          <div className="rpt-fix-section">
            <p className="rpt-fix-label">HOW TO FIX</p>
            <p className="rpt-fix-body">Add client-side validation — show "Email is required" below input, block submission when empty</p>
          </div>
          <div className="rpt-fix-tools">
            <span className="rpt-fix-tools-label">Fix with</span>
            {['Cursor', 'Codex', 'Windsurf'].map((t) => (
              <span key={t} className="rpt-fix-tool">{t}</span>
            ))}
          </div>
        </div>

      </div>
    )
  }

  if (variant === 'schedule') {
    return (
      <div className="visual-frame visual-schedule">
        <div className="visual-glow" />
        {/* Top: full-width schedules table */}
        <div className="sch-top">
          <div className="sch-table-header">
            <span className="sch-table-title">Schedules</span>
            <button className="sch-new-btn" type="button">+ New Schedule</button>
          </div>
          <div className="sch-table">
            <div className="sch-table-cols">
              <span>LABEL</span><span>URL</span><span>SCHEDULE</span><span>NEXT RUN</span><span>ACTIVE</span>
            </div>
            {[
              { label: 'Daily Smoke test', url: 'myapp.com', next: 'in 6 hours', on: true },
              { label: 'Post-deploy check', url: 'myapp.com/checkout', next: 'on push', on: true },
              { label: 'Weekly deep scan', url: 'myapp.com', next: 'in 3 days', on: false },
            ].map((row) => (
              <div className="sch-table-row" key={row.label}>
                <span className="sch-row-label">{row.label}</span>
                <span className="sch-row-url">{row.url}</span>
                <span className="sch-row-schedule">Runs <strong>every day</strong> at <strong>09:00 UTC</strong></span>
                <span className="sch-row-next">{row.next}</span>
                <span className={`sch-toggle ${row.on ? 'sch-toggle-on' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: create form + email prefs side by side */}
        <div className="sch-bottom">

          <div className="sch-form-panel">
            <p className="sch-panel-title">Create New Schedule</p>
            <div className="sch-field">
              <label>Label</label>
              <div className="sch-input sch-input-active">e.g., Daily Smoke Test</div>
            </div>
            <div className="sch-field">
              <label>URL</label>
              <div className="sch-input">https://myapp.com</div>
            </div>
            <div className="sch-field-row">
              <div className="sch-field">
                <label>Frequency</label>
                <div className="sch-select">Daily ∨</div>
              </div>
              <div className="sch-field">
                <label>Time (UTC)</label>
                <div className="sch-select">09:00 ∨</div>
              </div>
            </div>
            <button className="sch-create-btn" type="button">Create Schedule</button>
          </div>

          <div className="sch-email-panel">
            <p className="sch-panel-title">Email Preferences</p>
            {[
              { label: 'Scheduled Execution Summary', sub: 'Email after each scheduled test completes', on: true },
              { label: 'Weekly Summary', sub: 'Weekly activity summaries and reminders', on: true },
            ].map((pref) => (
              <div className="sch-pref-row" key={pref.label}>
                <div className="sch-pref-text">
                  <span className="sch-pref-label">{pref.label}</span>
                  <span className="sch-pref-sub">{pref.sub}</span>
                </div>
                <span className={`sch-toggle ${pref.on ? 'sch-toggle-on' : ''}`} />
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  }

  if (variant === 'monitoring') {
    return (
      <div className="visual-frame visual-monitoring">
        <div className="visual-glow" />
        <div className="cli-frame">
          <div className="cli-toolbar">
            <span />
            <span />
            <span />
            <p>Terminal</p>
          </div>
          <div className="cli-body">
            <div className="cli-command-card">
              <span className="cli-prompt">$</span>
              <code>scoutqa --url https://your-app.com --prompt "Test the homepage"</code>
            </div>

            <div className="cli-output">
              {[
                'Connecting to https://your-app.com',
                'Running Scout flow scan on homepage',
                '3 issues found, 3 fix prompts generated',
                'Ready to re-run verification',
              ].map((item, index) => (
                <div className="cli-output-row" key={item}>
                  <span className={`cli-status-dot ${index === 2 ? 'cli-status-dot-alert' : ''}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="cli-footer-pill">
              <span>CLI</span>
              <i />
              <span>Find</span>
              <i />
              <span>Fix</span>
              <i />
              <span>Verify</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="visual-frame visual-knowledge">
      <div className="visual-glow" />
      <div className="knowledge-surface">
        <div className="knowledge-board">
          <div className="knowledge-board-inner">
            <svg
              aria-hidden="true"
              className="knowledge-links"
              preserveAspectRatio="none"
              viewBox="0 0 1000 560"
            >
              {knowledgePaths.map((path) => (
                <path className="knowledge-link-path" d={path} key={path} />
              ))}
            </svg>

            {knowledgeNodes.map((node) => (
              <div
                className={`knowledge-node ${node.className ?? ''}`}
                key={node.id}
                style={node.style}
              >
                <span className="knowledge-node-status" aria-hidden="true">
                  ✓
                </span>
                <span>{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricRow({ active, delay, label, target }) {
  const value = useCountUp(target, active, 1800, delay)
  const display = formatCount(value)

  return (
    <div className="metric-row">
      <span className="metric-label">{label}</span>
      <div className="metric-digits" aria-label={display}>
        {display.split('').map((character, index) => (
          <span className={`digit-card ${character === ',' ? 'digit-comma' : ''}`} key={`${label}-${index}-${character}`}>
            {character}
          </span>
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({ label, name, role }) {
  return (
    <article className="testimonial-card">
      <p className="testimonial-label">{label}</p>
      <blockquote>
        “Awaiting approved Scout customer quote for launch. The final testimonial
        copy should replace this placeholder before publishing.”
      </blockquote>
      <footer>
        <strong>{name}</strong>
        <span>{role}</span>
      </footer>
    </article>
  )
}

function FaqItem({ answer, isOpen, onToggle, question }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-open' : ''}`}>
      <button className="faq-trigger" onClick={onToggle} type="button">
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  )
}

function App() {
  const [pathname, setPathname] = useState(normalizePath(window.location.pathname))
  const [heroUrl, setHeroUrl] = useState('')
  const [ctaUrl, setCtaUrl] = useState('')
  const [formError, setFormError] = useState('')
  const [scrollY, setScrollY] = useState(0)
  const [activeStepId, setActiveStepId] = useState('step1')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [metricsVisible, setMetricsVisible] = useState(false)
  const [selectedPlatformTool, setSelectedPlatformTool] = useState(null)
  const sectionRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname))

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.fade-section'))

    if (elements.length === 0) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!selectedPlatformTool) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPlatformTool(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPlatformTool])

  useEffect(() => {
    const elements = timelineSteps
      .map((step) => sectionRefs.current[step.id])
      .filter((element) => element instanceof HTMLElement)

    if (elements.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveStepId(visible[0].target.dataset.section)
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.45, 0.7],
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const metricsSection = sectionRefs.current.metrics

    if (!(metricsSection instanceof HTMLElement)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMetricsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(metricsSection)

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id) => (node) => {
    if (node) {
      sectionRefs.current[id] = node
      return
    }

    delete sectionRefs.current[id]
  }

  const submitUrl = (rawValue) => {
    const trimmed = rawValue.trim()

    if (!trimmed) {
      setFormError('Enter a URL to start scouting.')
      return
    }

    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

    try {
      const parsed = new URL(normalized)
      setFormError('')
      window.location.href = `https://app.scoutqa.ai?url=${encodeURIComponent(parsed.toString())}`
    } catch {
      setFormError('Enter a valid URL.')
    }
  }

  const navigateTo = (path) => {
    const nextPath = normalizePath(path)

    if (normalizePath(window.location.pathname) !== nextPath) {
      window.history.pushState({}, '', nextPath)
      setPathname(nextPath)
    }

    window.scrollTo(0, 0)
  }

  if (pathname === '/how-to-run') {
    return (
      <div className="app-shell">
        <StoryBackground scrollY={scrollY} />
        <header className="site-header">
          <button aria-label="Scout homepage" className="brand brand-button" onClick={() => navigateTo('/')} type="button">
            <ScoutWordmark />
          </button>
          <div className="header-actions">
            <a className="button button-ghost" href="https://app.scoutqa.ai" rel="noreferrer" target="_blank">
              Sign in
            </a>
            <a className="button button-primary" href="https://app.scoutqa.ai" rel="noreferrer" target="_blank">
              Start free
              <ArrowRight size={16} />
            </a>
          </div>
        </header>
        <HowToRunPage onNavigateHome={() => navigateTo('/')} />
      </div>
    )
  }

  const comparePageData = comparePages[pathname] || (pathname === '/playwrite-compare' ? comparePages['/playwright-compare'] : null)

  if (comparePageData) {
    return (
      <div className="app-shell">
        <StoryBackground scrollY={scrollY} />

        <header className="site-header">
          <button aria-label="Scout homepage" className="brand brand-button" onClick={() => navigateTo('/')} type="button">
            <ScoutWordmark />
          </button>
          <div className="header-actions">
            <a className="button button-ghost" href="https://app.scoutqa.ai" rel="noreferrer" target="_blank">
              Sign in
            </a>
            <a className="button button-primary" href="https://app.scoutqa.ai" rel="noreferrer" target="_blank">
              Start free
              <ArrowRight size={16} />
            </a>
          </div>
        </header>

        <ComparePage onNavigateHome={() => navigateTo('/')} pageData={comparePageData} />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <StoryBackground scrollY={scrollY} />

      <header className="site-header">
        <button aria-label="Scout homepage" className="brand brand-button" onClick={() => navigateTo('/')} type="button">
          <ScoutWordmark />
          <span className="brand-x">×</span>
          <img alt="" className="replit-logo-nav" src="/logos/platforms/replit.svg" />
          <span className="replit-wordmark-nav">replit</span>
        </button>
        <div className="header-actions">
          <a className="button button-ghost" href="https://app.scoutqa.ai" rel="noreferrer" target="_blank">
            Sign in
          </a>
          <a className="button button-primary" href="https://app.scoutqa.ai" rel="noreferrer" target="_blank">
            Start free
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero-section" data-section="hero" ref={setSectionRef('hero')}>
          <div className="hero-copy fade-section">
            <h1>Is your app actually ready?</h1>
            <div className="hero-subcopy">
              <p>Get honest feedback before your first real customers hit it.</p>
            </div>
            <form
              className="url-form"
              onSubmit={(event) => {
                event.preventDefault()
                submitUrl(heroUrl)
              }}
            >
              <input
                aria-label="Enter your URL"
                name="hero-url"
                onChange={(event) => setHeroUrl(event.target.value)}
                placeholder="Enter your URL"
                type="text"
                value={heroUrl}
              />
              <button className="button button-primary" type="submit">
                Start Scouting
              </button>
            </form>
            <p className="form-error">{formError}</p>
            <div className="hero-mascots">
              <PixelRabbit />
              <PixelBug />
            </div>
          </div>
        </section>

        <section className="action-section bleed-up">
          <div className="demo-card fade-section">
            <DemoPanel />
          </div>
        </section>

        <section className="timeline-section">
          <div className="timeline-shell">
            {timelineSteps.map((step, index) => (
              <div className="timeline-group" key={step.id}>
                <section
                  className="step-section"
                  data-section={step.id}
                  ref={setSectionRef(step.id)}
                >
                  <div className="timeline-column" aria-hidden="true">
                    <div className={`timeline-node ${activeStepId === step.id ? 'timeline-node-active' : ''}`} />
                    {index < timelineSteps.length - 1 && <div className="timeline-line" />}
                  </div>

                  {step.id === 'step-vision' ? (
                    <div className="step-vision-centered fade-section">
                      <h2>
                        {step.title.split('\n').map((line) => (
                          <span className="title-line" key={line}>{line}</span>
                        ))}
                      </h2>
                      {step.body && <p className="step-body">{step.body}</p>}
                    </div>
                  ) : step.id === 'step4' ? (
                    <>
                      {/* Col 2, Row 1: text header */}
                      <div className="eco-header fade-section">
                        <p className="section-kicker">{step.sectionName}</p>
                        <h2>
                          {step.title.split('\n').map((line) => (
                            <span className="title-line" key={line}>{line}</span>
                          ))}
                        </h2>
                        {step.body && <p className="step-body">{step.body}</p>}
                        <div className="eco-cta">
                          <button
                            className="button button-primary"
                            onClick={() => navigateTo('/how-to-run')}
                            type="button"
                          >
                            Tips to quick run Scout
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                      {/* Full-width Row 2: half-circle orbit */}
                      <div className="eco-orbit-band">
                        <div className="eco-orbit-stage">
                          <OrbitVisual />
                        </div>
                      </div>
                      {/* Full-width Row 3: horizontal bullets */}
                      {step.bullets && (
                        <ul className="eco-bullets fade-section">
                          {step.bullets.map((bullet) => (
                            <li key={bullet}>
                              <Sparkles size={15} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="step-copy fade-section">
                        <p className="section-kicker">{step.sectionName}</p>
                        <h2>
                          {step.title.split('\n').map((line) => (
                            <span className="title-line" key={line}>
                              {line}
                            </span>
                          ))}
                        </h2>
                        {step.body && <p className="step-body">{step.body}</p>}
                        {step.cta && (
                          <a className="step-cta-link" href={step.cta.href} target="_blank" rel="noreferrer">
                            {step.cta.label} <ArrowRight size={14} />
                          </a>
                        )}
                        {step.quote && (
                          <blockquote className="step-quote">"{step.quote}"</blockquote>
                        )}
                        {step.bodySecondary && (
                          <p className="step-body step-body-secondary">{step.bodySecondary}</p>
                        )}
                        {step.bullets && (
                          <ul className="step-bullets">
                            {step.bullets.map((bullet) => (
                              <li key={bullet}>
                                <Sparkles size={14} />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {step.alternative && (
                          <AlternativeTo
                            label={step.alternative.label}
                            onLogoClick={navigateTo}
                            logos={step.alternative.logos}
                            uspText={step.alternative.uspText}
                          />
                        )}
                      </div>

                      <div className="step-visual fade-section">
                        <StepVisual variant={step.visual} />
                      </div>
                    </>
                  )}
                </section>
              </div>
            ))}
          </div>
        </section>


        <section className="metrics-section" ref={setSectionRef('metrics')}>
          <div className="metrics-card fade-section">
            <div className="section-heading">
              <h2>86,000+ issues found (and counting)</h2>
              <p>Real-time stats across all Scout users</p>
            </div>
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <MetricRow
                  active={metricsVisible}
                  delay={index * 150}
                  key={metric.label}
                  label={metric.label}
                  target={metric.target}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta-section" data-section="cta" ref={setSectionRef('cta')}>
          <div className="final-cta-card fade-section">
            <div className="final-copy">

              <h2>
                <span className="title-line">Your app is built.</span>
                <span className="title-line">Now make sure it works.</span>
              </h2>
            </div>
            <form
              className="url-form final-form"
              onSubmit={(event) => {
                event.preventDefault()
                submitUrl(ctaUrl)
              }}
            >
              <input
                aria-label="Enter your URL"
                name="cta-url"
                onChange={(event) => setCtaUrl(event.target.value)}
                placeholder="Enter your URL"
                type="text"
                value={ctaUrl}
              />
              <button className="button button-primary" type="submit">
                Start Scouting
              </button>
            </form>

          </div>
        </section>

        <section className="faq-section">
          <div className="faq-shell">
            <div className="section-heading section-heading-dark fade-section">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <FaqItem
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  key={faq.question}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                  question={faq.question}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <PlatformPromptModal
        onClose={() => setSelectedPlatformTool(null)}
        tool={selectedPlatformTool}
      />
    </div>
  )
}

export default App
