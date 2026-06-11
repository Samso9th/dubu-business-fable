export const DASHBOARD_URL = "https://merchant.dubupay.com/";
export const DEMO_URL = "https://forms.gle/wAvp4gazqpJrccm77";
export const DOCS_URL = "https://docs.dubupay.com";

export const SOCIALS = [
  { label: "Twitter / X", href: "https://x.com/dubupay" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dubupay/" },
  { label: "Instagram", href: "https://www.instagram.com/dubupay" },
];

export const NAV_LINKS = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: DOCS_URL, external: true },
];

export const HERO_VERBS = [
  { word: "Accept", cls: "text-volt" },
  { word: "Manage", cls: "text-gold" },
  { word: "Settle", cls: "text-white-soft" },
];

export const TICKER_ITEMS = [
  "0.85% NGN collections",
  "1.5% USD payments",
  "<5 min settlement",
  "50+ countries",
  "99.7% settlement rate",
  "USDT · USDC native",
  "No setup fees",
  "One API",
];

/* Terminal script typed in the hero */
export const TERMINAL_SCRIPT = [
  { type: "cmd", text: "curl -X POST https://api.dubupay.com/v1/payments \\" },
  { type: "cmd", text: '  -d \'{ "amount": 2500, "currency": "USD" }\'' },
  { type: "res", text: '{ "id": "pay_8Xk2…", "status": "pending" }' },
  { type: "event", text: "⚡ webhook  payment.confirmed          +2.1s" },
  { type: "event", text: "⚡ webhook  fx.converted → ₦3,950,000   +2.8s" },
  { type: "ok", text: "✓ settled  NGN balance               +4.6s" },
];

export const OLD_RAILS = [
  { name: "Wire transfer", time: "3–5 days", cost: "$25–45" },
  { name: "FX conversion", time: "1–2 days", cost: "2–4%" },
  { name: "Reconciliation", time: "manual", cost: "hours/week" },
];

export const NEW_RAILS = [
  { name: "Any currency in", value: "one API" },
  { name: "Auto settlement", value: "< 5 min" },
  { name: "Full visibility", value: "real-time" },
];

export const PIPELINE_STEPS = [
  {
    id: "accept",
    label: "01 · Accept",
    title: "Customer pays in their currency",
    body: "USD via ACH/Wire, NGN via NUBAN virtual accounts, or USDT/USDC on-chain. One payment session, every rail open.",
  },
  {
    id: "verify",
    label: "02 · Verify",
    title: "Webhooks confirm instantly",
    body: "Signed payloads hit your endpoint the moment money lands. No polling, no manual chasing, no stalled transfers.",
  },
  {
    id: "convert",
    label: "03 · Convert",
    title: "The FX engine does the math",
    body: "Controlled rates between USD, NGN, and stablecoins — transparent pricing, no hidden spread.",
  },
  {
    id: "settle",
    label: "04 · Settle",
    title: "Funds land in under 5 minutes",
    body: "NGN bank accounts, external USD destinations, or crypto wallets — routed by rules you define.",
  },
];

export const FEATURES = [
  {
    title: "Cross-border payments",
    body: "Accept USD, NGN, and stablecoins in one unified flow — built for international customers and Nigerian collections.",
    tag: "RAILS",
    size: "lg",
  },
  {
    title: "API + webhooks",
    body: "Create payment sessions, verify via signed webhooks, automate fulfillment end-to-end.",
    tag: "DEV",
    size: "lg",
    code: true,
  },
  {
    title: "USD infrastructure",
    body: "Issue USD virtual accounts, receive via ACH/Wire, pay out to external USD accounts.",
    tag: "USD",
    size: "sm",
  },
  {
    title: "NGN collections",
    body: "NUBAN virtual accounts for local payments, unified with your global reporting.",
    tag: "NGN",
    size: "sm",
  },
  {
    title: "Crypto payments",
    body: "USDT/USDC deposit addresses, withdrawals, and on-chain transfers — auto-reconciled.",
    tag: "CHAIN",
    size: "sm",
  },
  {
    title: "Checkout links",
    body: "No-code payment links and invoices. Share via email or WhatsApp, get paid, track everything.",
    tag: "NO-CODE",
    size: "sm",
  },
  {
    title: "Fast payouts",
    body: "Withdraw to NGN banks, send crypto to external wallets, or settle in USD — most payouts in under 5 minutes.",
    tag: "SPEED",
    size: "med",
  },
];

export const CODE_TABS = [
  {
    id: "create",
    label: "create_session",
    lang: "bash",
    lines: [
      "$ curl -X POST https://api.dubupay.com/v1/sessions \\",
      '    -H "Authorization: Bearer sk_live_…" \\',
      "    -d amount=100000 \\",
      "    -d currency=NGN \\",
      "    -d rails[]=nuban -d rails[]=usdc",
      "",
      "HTTP/2 201",
      "{",
      '  "id": "ses_4kZn1q",',
      '  "nuban": "9012345678 · Wema Bank",',
      '  "usdc_address": "0x4f6…a21",',
      '  "expires_in": 3600',
      "}",
    ],
  },
  {
    id: "webhook",
    label: "webhook_event",
    lang: "json",
    lines: [
      "POST /your-endpoint  ·  signed payload",
      "",
      "{",
      '  "event": "payment.confirmed",',
      '  "data": {',
      '    "session": "ses_4kZn1q",',
      '    "amount": 100000,',
      '    "currency": "NGN",',
      '    "rail": "nuban",',
      '    "confirmed_at": "2026-06-11T10:31:08Z"',
      "  },",
      '  "signature": "t=1718100668,v1=5f8a…"',
      "}",
    ],
  },
  {
    id: "payout",
    label: "trigger_payout",
    lang: "bash",
    lines: [
      "$ curl -X POST https://api.dubupay.com/v1/payouts \\",
      '    -d amount=3950000 \\',
      "    -d currency=NGN \\",
      '    -d destination=bank_acct_01HX…',
      "",
      "HTTP/2 201",
      "{",
      '  "id": "po_9mW2c",',
      '  "status": "processing",',
      '  "eta": "under 5 minutes"',
      "}",
      "",
      "# 4 min 38 s later → status: settled ✓",
    ],
  },
];

export const USE_CASES = [
  { num: "01", title: "Global remittances", body: "Fast, low-cost transfers across borders with USD, NGN, and stablecoin rails." },
  { num: "02", title: "Stablecoin on/off ramps", body: "Collect USDT/USDC, settle to fiat, route liquidity with programmable policies." },
  { num: "03", title: "Borderless banking", body: "Power multi-currency accounts so users can hold, pay, and settle globally." },
  { num: "04", title: "International SaaS billing", body: "Accept global payments, confirm via webhooks, provision access instantly." },
  { num: "05", title: "Marketplace payments", body: "Collect from buyers worldwide, pay sellers locally with rule-based settlement." },
  { num: "06", title: "Cross-border payouts", body: "Withdraw to NGN accounts, send USD externally, or route crypto to wallets." },
  { num: "07", title: "Digital goods & vouchers", body: "Create sessions, verify instantly, fulfill orders automatically via API." },
  { num: "08", title: "FX-enabled checkout", body: "Convert between USD, NGN, and crypto with controlled rates and preferred settlement." },
];

export const PRICING = {
  local: {
    title: "Local payments",
    subtitle: "NGN transactions",
    rate: 0.0085,
    rateLabel: "0.85%",
    cap: 2000,
    capLabel: "capped at ₦2,000",
    currency: "₦",
    sliderMin: 10000,
    sliderMax: 2000000,
    sliderStep: 10000,
    sliderDefault: 250000,
    features: [
      "NGN bank transfers & collections",
      "NUBAN virtual accounts",
      "Checkout links & invoicing",
      "Instant settlement to NGN accounts",
      "Real-time webhooks & API access",
      "Dashboard analytics & reporting",
    ],
  },
  intl: {
    title: "International payments",
    subtitle: "USD via ACH & SWIFT",
    rate: 0.015,
    rateLabel: "1.5%",
    cap: 8.5,
    capLabel: "capped at $8.50",
    currency: "$",
    sliderMin: 50,
    sliderMax: 10000,
    sliderStep: 50,
    sliderDefault: 567,
    features: [
      "USD payments via ACH & SWIFT",
      "USD virtual accounts",
      "Cross-border payouts",
      "Checkout links & invoicing",
      "Real-time webhooks & API access",
      "Dashboard analytics & reporting",
    ],
  },
};

export const REVENUE_SPLIT = {
  title: "Revenue split",
  body: "Processing exceptional volumes? We offer custom revenue-sharing partnerships for merchants doing ₦100M+ monthly — instead of a flat fee, we share in your growth.",
  points: [
    "Custom revenue-sharing model",
    "Reduced effective rate as volume grows",
    "Dedicated account manager",
    "Priority settlement & support",
  ],
};

export const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "Pipeline", href: "#pipeline" },
      { label: "Features", href: "#features" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: DOCS_URL },
      { label: "Get started", href: DASHBOARD_URL },
      { label: "Book a demo", href: DEMO_URL },
    ],
  },
  {
    title: "Company",
    links: SOCIALS.map((s) => ({ label: s.label, href: s.href })),
  },
];
