export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  budget: number;
  created_at: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive";
  created_at: string;
};
