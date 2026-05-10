-- ============================================================
-- Traveloop: 04_indexes_and_policies.sql
-- Performance indexes, RLS policies, and helper functions
-- ============================================================

-- ============================================================
-- INDEXES — Single Column
-- ============================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_trips_owner_id ON trips(owner_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_privacy ON trips(privacy);
CREATE INDEX idx_trip_stops_trip_id ON trip_stops(trip_id);
CREATE INDEX idx_trip_activities_trip_stop_id ON trip_activities(trip_stop_id);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_name ON activities(name);
CREATE INDEX idx_budgets_trip_id ON budgets(trip_id);
CREATE INDEX idx_packing_items_trip_id ON packing_items(trip_id);
CREATE INDEX idx_notes_trip_id ON notes(trip_id);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_collaborators_trip_id ON collaborators(trip_id);
CREATE INDEX idx_collaborators_user_id ON collaborators(user_id);
CREATE INDEX idx_shared_links_token ON shared_links(token);
CREATE INDEX idx_shared_links_trip_id ON shared_links(trip_id);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);
CREATE INDEX idx_ai_usage_logs_user_id ON ai_usage_logs(user_id);
CREATE INDEX idx_ai_usage_logs_created_at ON ai_usage_logs(created_at DESC);
CREATE INDEX idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_destinations_country ON destinations(country_name);
CREATE INDEX idx_destinations_city ON destinations(city_name);

-- ============================================================
-- INDEXES — Composite
-- ============================================================
CREATE INDEX idx_trip_stops_trip_order ON trip_stops(trip_id, order_index);
CREATE INDEX idx_trip_activities_stop_order ON trip_activities(trip_stop_id, order_index);
CREATE INDEX idx_budgets_trip_category ON budgets(trip_id, category);
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at DESC);
CREATE INDEX idx_ai_usage_user_feature ON ai_usage_logs(user_id, feature);

-- ============================================================
-- FULL TEXT SEARCH — Destinations
-- ============================================================
CREATE INDEX idx_destinations_search ON destinations USING GIN (
  to_tsvector('english', city_name || ' ' || country_name)
);

CREATE INDEX idx_activities_search ON activities USING GIN (
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- ============================================================
-- ROW LEVEL SECURITY (for Supabase)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Users: can read/update own record
CREATE POLICY users_select_own ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY users_update_own ON users FOR UPDATE USING (id = auth.uid());

-- Profiles: can read/update own profile
CREATE POLICY profiles_select_own ON profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY profiles_insert_own ON profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY profiles_update_own ON profiles FOR UPDATE USING (user_id = auth.uid());

-- Trips: owner or collaborator can access
CREATE POLICY trips_select ON trips FOR SELECT USING (
  owner_id = auth.uid()
  OR id IN (SELECT trip_id FROM collaborators WHERE user_id = auth.uid() AND status = 'accepted')
  OR privacy = 'public'
);
CREATE POLICY trips_insert ON trips FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY trips_update ON trips FOR UPDATE USING (
  owner_id = auth.uid()
  OR id IN (SELECT trip_id FROM collaborators WHERE user_id = auth.uid() AND role = 'editor' AND status = 'accepted')
);
CREATE POLICY trips_delete ON trips FOR DELETE USING (owner_id = auth.uid());

-- Trip stops: accessible if trip is accessible
CREATE POLICY trip_stops_select ON trip_stops FOR SELECT USING (
  trip_id IN (SELECT id FROM trips WHERE owner_id = auth.uid()
    OR id IN (SELECT trip_id FROM collaborators WHERE user_id = auth.uid() AND status = 'accepted')
    OR privacy = 'public')
);
CREATE POLICY trip_stops_insert ON trip_stops FOR INSERT WITH CHECK (
  trip_id IN (SELECT id FROM trips WHERE owner_id = auth.uid()
    OR id IN (SELECT trip_id FROM collaborators WHERE user_id = auth.uid() AND role = 'editor' AND status = 'accepted'))
);
CREATE POLICY trip_stops_update ON trip_stops FOR UPDATE USING (
  trip_id IN (SELECT id FROM trips WHERE owner_id = auth.uid()
    OR id IN (SELECT trip_id FROM collaborators WHERE user_id = auth.uid() AND role = 'editor' AND status = 'accepted'))
);
CREATE POLICY trip_stops_delete ON trip_stops FOR DELETE USING (
  trip_id IN (SELECT id FROM trips WHERE owner_id = auth.uid()
    OR id IN (SELECT trip_id FROM collaborators WHERE user_id = auth.uid() AND role = 'editor' AND status = 'accepted'))
);

-- Notifications: own only
CREATE POLICY notifications_select_own ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY notifications_update_own ON notifications FOR UPDATE USING (user_id = auth.uid());

-- AI usage logs: own only
CREATE POLICY ai_logs_select_own ON ai_usage_logs FOR SELECT USING (user_id = auth.uid());
CREATE POLICY ai_logs_insert_own ON ai_usage_logs FOR INSERT WITH CHECK (user_id = auth.uid());

-- Activities and Destinations: public read
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY activities_select_all ON activities FOR SELECT USING (true);

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY destinations_select_all ON destinations FOR SELECT USING (true);
