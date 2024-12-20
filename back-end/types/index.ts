type Role = 'admin' | 'user' | 'test';
export interface UserType {
    id: number;
    username: string;
    password: string;
    avatar: string;
    role: Role;
    badges?: BadgeType[];
  }
  
  export interface BadgeType {
    id: number;
    title: string;
    description: string;
    image: string;
  }

export { Role };
