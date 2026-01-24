export enum TicketStatus {
  NEW = 'new',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  WAITING = 'waiting',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketType {
  INCIDENT = 'incident',
  REQUEST = 'request',
  PROBLEM = 'problem',
  CHANGE = 'change',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum TicketUrgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TicketImpact {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TicketSource {
  HELPDESK = 'helpdesk',
  EMAIL = 'email',
  PHONE = 'phone',
  PORTAL = 'portal',
}
