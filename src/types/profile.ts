export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  avatar_url: string | null;
  role: "admin" | "customer";
}