export interface User {
  email: string;
  password: string;
  reCaptchaToken: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  enabled: boolean;
  locked: boolean;
  notEnabledReasons: NotEnabledReason[];
  permissions: [];
  roles: Role[];
}

export interface NotEnabledReason {
  id: string;
  reason: string;
  timestamp: string;
  valid: boolean;
}

export interface Role {
  role_id: string;
  roleName: String;
}
