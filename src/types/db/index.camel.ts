// ─── Base ─────────────────────────────────────────────────────────────────────

export interface BaseType {
    id:        string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    isActive:  boolean;
  }
  
  // ─── Sessions ─────────────────────────────────────────────────────────────────
  
  export interface SessionsType extends BaseType {
    userId:       string;
    token:        string;
    refreshToken: string;
    ipAddress:    string | null;
    userAgent:    string | null;
    expiresAt:    string;
  }
  
  // ─── Users ────────────────────────────────────────────────────────────────────
  
  export interface UsersType extends BaseType {
    tenantId:  string;
    name:      string;
    email:     string;
    password:  string;
    role:      string;
    avatarUrl: string | null;
  }
  
  // ─── Tenants ──────────────────────────────────────────────────────────────────
  
  export interface TenantsType extends BaseType {
    name:   string;
    slug:   string;
    planId: string | null;
  }
  
  // ─── Calendar Events ──────────────────────────────────────────────────────────
  
  export interface CalendarEventsType extends BaseType {
    tenantId:               string;
    title:                  string;
    description:            string | null;
    eventType:              string;
    eventColor:             string | null;
    startDate:              string;
    startTime:              string | null;
    endDate:                string | null;
    endTime:                string | null;
    allDay:                 boolean;
    sourceType:             string | null;
    sourceId:               string | null;
    assignedToUserIds:      string[];
    associatedResourceType: string | null;
    associatedResourceId:   string | null;
  }
  
  // ─── Contacts ─────────────────────────────────────────────────────────────────
  
  export interface ContactsType extends BaseType {
    tenantId:    string;
    firstName:   string;
    lastName:    string;
    email:       string | null;
    phone:       string | null;
    company:     string | null;
    jobTitle:    string | null;
    address:     string | null;
    city:        string | null;
    country:     string | null;
    notes:       string | null;
    avatarUrl:   string | null;
    tags:        string[];
  }