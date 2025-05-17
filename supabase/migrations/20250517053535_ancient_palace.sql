/*
  # Initial Schema Setup for MKS Platform

  1. New Tables
    - `staking`
      - `amount` (numeric, not null)
      - `duration_months` (integer, not null)
      - `start_date` (timestamptz, not null)
      - `status` (text, not null)
      - `wallet_address` (text, not null)
    - `users`
      - `joined_at` (timestamptz, not null)
      - `referrals` (integer, not null)
      - `tier` (text, not null)
      - `wallet_address` (text, not null, unique)
    - `whitelist`
      - `email` (text, not null)
      - `timestamp` (timestamptz, not null)
      - `wallet_address` (text, not null, unique)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enum types for status and tier
CREATE TYPE user_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum');
CREATE TYPE staking_status AS ENUM ('active', 'completed', 'withdrawn');

-- Create staking table
CREATE TABLE IF NOT EXISTS staking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric NOT NULL CHECK (amount > 0),
  duration_months integer NOT NULL CHECK (duration_months > 0),
  start_date timestamptz NOT NULL DEFAULT now(),
  status staking_status NOT NULL DEFAULT 'active',
  wallet_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  joined_at timestamptz NOT NULL DEFAULT now(),
  referrals integer NOT NULL DEFAULT 0,
  tier user_tier NOT NULL DEFAULT 'bronze',
  wallet_address text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create whitelist table
CREATE TABLE IF NOT EXISTS whitelist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  wallet_address text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE staking ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist ENABLE ROW LEVEL SECURITY;

-- Create policies for staking table
CREATE POLICY "Users can read their own staking data"
  ON staking
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'wallet_address' = wallet_address);

CREATE POLICY "Users can insert their own staking data"
  ON staking
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'wallet_address' = wallet_address);

-- Create policies for users table
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'wallet_address' = wallet_address);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'wallet_address' = wallet_address);

-- Create policies for whitelist table
CREATE POLICY "Anyone can insert into whitelist"
  ON whitelist
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own whitelist entry"
  ON whitelist
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'wallet_address' = wallet_address);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_staking_wallet_address ON staking(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_whitelist_wallet_address ON whitelist(wallet_address);
CREATE INDEX IF NOT EXISTS idx_whitelist_email ON whitelist(email);