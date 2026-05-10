-- ============================================================
-- Traveloop: 01_initial_schema.sql
-- Base tables: users, profiles, trips, trip_stops, activities, trip_activities
-- Execute first. Requires PostgreSQL 15+.
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(20),
  city VARCHAR(100),
  country VARCHAR(100),
  language VARCHAR(10) DEFAULT 'en',
  travel_preferences JSONB DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{"email":true,"push":false,"in_app":true}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================================
-- TRIPS
-- ============================================================
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  start_date DATE,
  end_date DATE,
  traveler_count INTEGER DEFAULT 1 CHECK (traveler_count > 0),
  budget_target NUMERIC(12, 2),
  currency VARCHAR(3) DEFAULT 'INR',
  trip_type VARCHAR(20) DEFAULT 'solo' CHECK (trip_type IN ('solo', 'family', 'group', 'honeymoon', 'business', 'adventure', 'luxury', 'budget')),
  privacy VARCHAR(20) DEFAULT 'private' CHECK (privacy IN ('private', 'shared', 'public')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  transport_preference VARCHAR(30),
  accommodation_preference VARCHAR(30),
  origin_city VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIP STOPS
-- ============================================================
CREATE TABLE trip_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_name VARCHAR(100) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  arrival_date DATE,
  departure_date DATE,
  timezone VARCHAR(50),
  order_index INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  estimated_transport_cost NUMERIC(10, 2),
  estimated_transport_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ACTIVITIES (reference/catalog)
-- ============================================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_source_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(30) CHECK (category IN ('sightseeing', 'cultural', 'nightlife', 'food', 'adventure', 'shopping', 'family', 'nature', 'wellness', 'local_experiences')),
  location_json JSONB,
  estimated_cost NUMERIC(10, 2),
  estimated_duration INTEGER,
  rating NUMERIC(3, 2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIP ACTIVITIES (junction: stop <-> activity)
-- ============================================================
CREATE TABLE trip_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  title VARCHAR(255),
  description TEXT,
  day_number INTEGER,
  time_slot VARCHAR(20),
  custom_notes TEXT,
  custom_cost NUMERIC(10, 2),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DESTINATIONS (search/discovery seed data)
-- ============================================================
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name VARCHAR(100) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  destination_type VARCHAR(30),
  estimated_budget_index INTEGER CHECK (estimated_budget_index BETWEEN 1 AND 5),
  seasonal_recommendation VARCHAR(50),
  highlights JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
