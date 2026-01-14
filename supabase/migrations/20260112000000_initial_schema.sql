-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads Table (Unified Intake)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  case_type TEXT CHECK (case_type IN ('divorce', 'immigration', 'pi', 'wc', 'criminal')),
  triage_score INT DEFAULT 0,
  operational_mode TEXT DEFAULT 'LDA_ONLY', -- 'LDA_ONLY' or 'ATTORNEY'
  status TEXT DEFAULT 'new',
  raw_data JSONB, -- Stores the triage answers
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Compliance Config (SB 37 Disclosures)
CREATE TABLE IF NOT EXISTS compliance_config (
  id SERIAL PRIMARY KEY,
  mode TEXT NOT NULL, -- 'LDA' vs 'ATTORNEY'
  disclosure_text TEXT,
  lda_number TEXT,
  attorney_name TEXT,
  office_address TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Orders (with B&P 6410 24-hour rescission)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  service_type TEXT,
  status TEXT DEFAULT 'waiting_period', -- 'waiting_period', 'ready', 'processing', 'completed'
  contract_signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Only allow document generation after 24 hours
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Wait for 24h rescission" 
ON orders 
FOR SELECT 
USING (
  status != 'waiting_period' OR 
  (now() > (created_at + interval '24 hours'))
);

-- 4. Document Mappings
CREATE TABLE IF NOT EXISTS doc_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_code TEXT, -- e.g., 'FL-100'
  field_map JSONB -- Maps React state keys to PDF field names
);
