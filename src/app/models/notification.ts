export interface Notification {
  id: string;
  rolesToNotify?: Role[];
  userToNotify?: any;
  message: string;
  type: string;
  args?: Args;
  taskCreatorName?: string;
  createdAt?: Date;
  resolvedAt?: Date;
}

interface Role {
  role_id: string;
  roleName: string;
}

interface Args {
  [key: string]: string;
}
