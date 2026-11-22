-- Research Use Only Group Buy Platform Database Schema

-- Users table (for authentication & profile)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Group buys (active buy campaigns)
CREATE TABLE group_buys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,                          -- e.g., "Retatrutide Open Buy"
    description TEXT,
    product_name TEXT NOT NULL,                  -- peptide/compound name
    fulfillment_mode TEXT NOT NULL,              -- 'direct' or 'collection'
    collection_address TEXT,                     -- for 'collection' mode
    min_kits_required INTEGER DEFAULT 10,        -- minimum total kits to unlock best tier
    is_active BOOLEAN NOT NULL DEFAULT TRUE,     -- admin can close early
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

-- Tiers define pricing at different commitment levels (per buy)
CREATE TABLE group_buy_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_buy_id UUID NOT NULL REFERENCES group_buys(id) ON DELETE CASCADE,
    total_kits_min INTEGER NOT NULL,             -- e.g., 10 kits = this tier
    price_per_unit DECIMAL(10,2) NOT NULL,       -- unit price at this tier
    is_active BOOLEAN NOT NULL DEFAULT TRUE,     -- only the best matching tier should be active
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Participant deposits (when they sign up for a buy + kit count)
CREATE TABLE deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_buy_id UUID NOT NULL REFERENCES group_buys(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    kit_count INTEGER NOT NULL CHECK (kit_count > 0),
    deposit_amount DECIMAL(10,2) NOT NULL DEFAULT 20.00,
    total_with_shipping DECIMAL(10,2) NOT NULL,  -- (kits * tier_price) + shipping
    stripe_session_id TEXT,                      -- optional: if paid via Stripe Checkout
    status TEXT NOT NULL DEFAULT 'pending',      -- pending | confirmed | refunded | forfeited
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ                       -- timestamp when buy closes (deposit becomes final-payment due)
);

-- Final payments (when participants pay the remaining balance before shipping)
CREATE TABLE final_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deposit_id UUID NOT NULL REFERENCES deposits(id),
    stripe_session_id TEXT,                      -- optional: Stripe Checkout session ID for final payment
    amount DECIMAL(10,2) NOT NULL,               -- remaining balance to pay
    status TEXT NOT NULL DEFAULT 'pending',      -- pending | paid | failed | refunded
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shipments (for direct fulfillment mode)
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deposit_id UUID NOT NULL REFERENCES deposits(id),
    shipping_method TEXT,                        -- 'standard' | 'expedited'
    tracking_number TEXT,
    status TEXT NOT NULL DEFAULT 'pending',      -- pending | shipped | delivered
    notes TEXT,                                  -- cold-chain instructions, COA uploads, etc.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crypto payments (for fallback rail)
CREATE TABLE crypto_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deposit_id UUID REFERENCES deposits(id),
    amount_usdc DECIMAL(18,6) NOT NULL,
    network TEXT NOT NULL,                        -- 'solana' | 'ethereum'
    wallet_address TEXT NOT NULL,
    tx_hash TEXT,                                -- blockchain transaction hash (for admin verification)
    status TEXT NOT NULL DEFAULT 'pending',       -- pending | confirmed | failed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Cash App payments (simple ledger for manual route)
CREATE TABLE cash_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deposit_id UUID REFERENCES deposits(id),
    amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',       -- pending | confirmed | failed
    notes TEXT,                                  -- e.g., "Received $50 to cashtag xxx"
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance and referential clarity
CREATE INDEX idx_group_buys_active ON group_buys(is_active DESC) WHERE is_active = TRUE;
CREATE INDEX idx_deposits_buy_status ON deposits(group_buy_id, status, closed_at);
CREATE INDEX idx_final_payments_deposit ON final_payments(deposit_id);
