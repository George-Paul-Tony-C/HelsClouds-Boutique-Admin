// File: src/components/orders/ShippingCard.tsx

import {
  House,
  MapPin,
  Phone,
  User,
} from "lucide-react";

interface ShippingCardProps {
  address?: {
    id: string;

    full_name: string;

    phone_number: string;

    address_line_1: string;

    address_line_2: string | null;

    city: string;

    state: string;

    postal_code: string;
  };
}

export default function ShippingCard({
  address,
}: ShippingCardProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Shipping Address
        </h2>

        <p className="text-sm text-slate-500">
          Delivery destination for this order.
        </p>

      </div>

      {address ? (

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
                Recipient
              </div>

              <div className="font-medium">
                {address.full_name}
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
                {address.phone_number}
              </div>

            </div>

          </div>

          <div className="flex items-start gap-3">

            <div className="rounded-lg bg-slate-100 p-2">

              <House
                size={18}
                className="text-slate-600"
              />

            </div>

            <div>

              <div className="text-xs text-slate-500">
                Address
              </div>

              <div className="font-medium">
                {address.address_line_1}
              </div>

              {address.address_line_2 && (
                <div className="text-slate-600">
                  {address.address_line_2}
                </div>
              )}

            </div>

          </div>

          <div className="flex items-start gap-3">

            <div className="rounded-lg bg-slate-100 p-2">

              <MapPin
                size={18}
                className="text-slate-600"
              />

            </div>

            <div>

              <div className="text-xs text-slate-500">
                City / State
              </div>

              <div className="font-medium">
                {address.city}, {address.state}
              </div>

              <div className="text-slate-600">
                {address.postal_code}
              </div>

            </div>

          </div>

        </div>

      ) : (

        <div className="rounded-lg border border-dashed py-12 text-center text-sm text-slate-500">

          Shipping address not available.

        </div>

      )}

    </section>
  );
}