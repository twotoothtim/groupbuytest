# Research Use Only Group Buy Platform

A tiered group-buy website for research-use-only peptide products, with adjustable countdowns, deposit tracking, and multiple payment rails (Stripe + crypto/cash fallback).

## Features

- **Tiered pricing:** Admin sets discount tiers based on total kits committed across participants.
- **Deposit system:** $20 flat deposit per participant; final payment due within configurable window.
- **Multiple fulfillment modes:** Direct shipment or admin collection after testing.
- **Payment rails:** Stripe (primary), Crypto (USDC fallback), Cash App manual route.
- **Live countdown timers** on all active group buy pages.
- **Admin panel:** Create/edit buys, view participants + payment states, export orders to CSV for supplier, process refunds, extend countdowns.

## Research Use Only Disclaimer

Every page includes a prominent RUO banner and footer. The site is intentionally designed with no dosing instructions or health claims.

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd groupbuy
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file in the `groupbuy/` directory:

```env
STRIPE_SECRET_KEY=sk_test_xxx              # From Stripe Dashboard > Developers > API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx    # Same dashboard, under "Publishable keys"
NEXT_PUBLIC_CRYPTOWALLET_ADDRESS=So111...  # Solana or ERC20 USDC wallet address (for fallback rail)
NEXT_PUBLIC_CASHAPP_CASHTAG=$xxxxx         # Your Cash App $cashtag for manual route
DATABASE_URL=postgresql://user:password@host/dbname    # Your PostgreSQL connection string
```

### 3. Run Migrations

Run the SQL schema against your database:

```bash
psql -f db/schema.sql -d your_database_name
```

Adjust `db/schema.sql` if you need additional fields (e.g., addresses, COAs).

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the public landing page with example active group buys and countdowns.  
Admin panel is at `http://localhost:3000/admin`.

---

## Payment Flow Overview

1. **Deposit (signup):** User pays $20 via Stripe Checkout (or crypto/cash fallback). Deposit status recorded in `deposits` table.
2. **Countdown:** The buy's countdown timer runs; participants can add kits until close.
3. **Buy closes / Final payment window ends:** Remaining balance is due within the configured duration. If not paid, deposit becomes forfeited or refunded per policy (currently: non-refundable unless buy fails minimum).
4. **Final payment:** User pays remaining balance via Stripe Checkout session (`final-payment/success` page on completion).
5. **Shipping / Tracking:** Admin exports CSV for direct fulfillment mode; records tracking numbers in `shipments` table.

---

## Database Schema Summary

| Table            | Purpose                              |
|------------------|--------------------------------------|
| `users`          | Auth & profile                       |
| `group_buys`     | Active buy campaigns                 |
| `group_buy_tiers`| Pricing tiers per buy                |
| `deposits`       | $20 signup deposits + shipping info  |
| `final_payments` | Remaining balance payments           |
| `shipments`      | Tracking for direct fulfillment mode |
| `crypto_payments`| USDC fallback rail (manual credit)   |
| `cash_payments`  | Cash App ledger entries              |

---

## Admin Panel Features

- Create/edit group buys: product name, unit price tiers, countdown window, minimum kits required.
- View participants + payment states per buy.
- Export participant addresses & order details to CSV for supplier (direct fulfillment).
- Extend countdown window before close.
- Process refunds when a buy fails its minimum commitment.

---

## Fulfillment Modes

1. **Direct:** Participant address collected at checkout; admin exports shipping list after final payments.
2. **Collection by Admin:** Participants reserve kits; after testing, kits are picked up from collection address or shipped in bulk to participants.

---

## Deployment Notes

- Recommended: Vercel + Railway PostgreSQL. Push code to deploy on Vercel.
- Stripe webhooks must be configured to listen for `checkout.session.completed` events and update deposit/final-payment status accordingly (webhook code can be added after initial scaffold).
- Crypto payments are currently manual credit; add webhook listener to verify blockchain confirmations in production if needed.

---

## License & Legal

This software is provided as-is for a research-use-only group buy platform. All products remain strictly RUO and must comply with local laws. Review Terms of Service, Privacy Policy, and refund policies with legal counsel before launch.
