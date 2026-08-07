// File: src/components/orders/CustomerCard.tsx

import {
  Mail,
  Phone,
  User,
} from "lucide-react";

interface CustomerCardProps {
  profile?: {
    id: string;

    full_name: string;

    email: string;

    phone_number: string;
  };
}

export default function CustomerCard({
  profile,
}: CustomerCardProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Customer Information
        </h2>

        <p className="text-sm text-slate-500">
          Customer details for this order.
        </p>

      </div>

      {profile ? (

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-slate-100 p-2">

              <User
                size={18}
                className="text-slate-600"
              />

            </div>

            <div>

              <div className="text-xs text-slate-500">
                Full Name
              </div>

              <div className="font-medium">
                {profile.full_name}
              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-slate-100 p-2">

              <Mail
                size={18}
                className="text-slate-600"
              />

            </div>

            <div>

              <div className="text-xs text-slate-500">
                Email
              </div>

              <div className="font-medium break-all">
                {profile.email}
              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-slate-100 p-2">

              <Phone
                size={18}
                className="text-slate-600"
              />

            </div>

            <div>

              <div className="text-xs text-slate-500">
                Phone Number
              </div>

              <div className="font-medium">
                {profile.phone_number}
              </div>

            </div>

          </div>

        </div>

      ) : (

        <div className="rounded-lg border border-dashed py-12 text-center text-sm text-slate-500">

          Customer information is unavailable.

        </div>

      )}

    </section>
  );
}