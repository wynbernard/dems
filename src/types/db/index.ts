// ─── Table Enum ───────────────────────────────────────────────────────────────

export enum Table {
    Sessions       = 'sessions',
    Admin          = 'admin',
    Users          = 'users',
    Tenants        = 'tenants',
    CalendarEvents = 'calendar_events',
    Contacts       = 'contacts',
  }
  
  // ─── Base ─────────────────────────────────────────────────────────────────────
  
  export interface BaseRow {
    id:         string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_active:  boolean;
  }
  
  // ─── Sessions ─────────────────────────────────────────────────────────────────
  
  export interface Sessions extends BaseRow {
    user_id:       string;
    token:         string;
    refresh_token: string;
    ip_address:    string | null;
    user_agent:    string | null;
    expires_at:    string;
  }
  
  // ─── Users ────────────────────────────────────────────────────────────────────
  
  export interface Users extends BaseRow {
    tenant_id:  string;
    name:       string;
    email:      string;
    password:   string;
    role:       string;
    avatar_url: string | null;
  }
  
  // ─── Tenants ──────────────────────────────────────────────────────────────────
  
  export interface Tenants extends BaseRow {
    name:    string;
    slug:    string;
    plan_id: string | null;
  }
  
  // ─── Calendar Events ──────────────────────────────────────────────────────────
  
  export interface CalendarEvents extends BaseRow {
    tenant_id:                string;
    title:                    string;
    description:              string | null;
    event_type:               string;
    event_color:              string | null;
    start_date:               string;
    start_time:               string | null;
    end_date:                 string | null;
    end_time:                 string | null;
    all_day:                  boolean;
    source_type:              string | null;
    source_id:                string | null;
    assigned_to_user_ids:     string[];
    associated_resource_type: string | null;
    associated_resource_id:   string | null;
  }
  
  // ─── Contacts ─────────────────────────────────────────────────────────────────
  
  export interface Contacts extends BaseRow {
    tenant_id:  string;
    first_name: string;
    last_name:  string;
    email:      string | null;
    phone:      string | null;
    company:    string | null;
    job_title:  string | null;
    address:    string | null;
    city:       string | null;
    country:    string | null;
    notes:      string | null;
    avatar_url: string | null;
    tags:       string[];
  }