-- =========================================================================
-- चंद्रकैलाश Tours & Travels - Supabase Central Database Schema
-- Run this script in your Supabase SQL Editor to enable cross-device sync.
-- =========================================================================

-- 1. Create central CMS store table
CREATE TABLE IF NOT EXISTS public.ck_cms_store (
    id TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.ck_cms_store ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for Public Access
DROP POLICY IF EXISTS "Public Read/Write Policy" ON public.ck_cms_store;

CREATE POLICY "Public Read/Write Policy" 
ON public.ck_cms_store 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 4. Enable Realtime Notifications (Optional)
ALTER PUBLICATION supabase_realtime ADD TABLE public.ck_cms_store;
