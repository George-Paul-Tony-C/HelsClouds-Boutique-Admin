import { toast } from "sonner";

export function success(message: string) {
  toast.success(message);
}

export function error(message: string) {
  toast.error(message);
}