// File: src/pages/Settings.tsx

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const [settings, setSettings] = useState({
    boutiqueName: "HelsClouds Boutique",
    whatsapp: "",
    email: "",
    shippingCharge: "0",
    instagram: "",
    facebook: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSave() {
    alert(
      "Settings save functionality will be connected later."
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl border bg-white p-8">

      <div className="mb-8">

        <h1 className="text-2xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500">
          Boutique information and configuration.
        </p>

      </div>

      <div className="space-y-5">

        <div>

          <Label>Boutique Name</Label>

          <Input
            name="boutiqueName"
            value={settings.boutiqueName}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>WhatsApp Number</Label>

          <Input
            name="whatsapp"
            value={settings.whatsapp}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Email</Label>

          <Input
            name="email"
            value={settings.email}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Shipping Charge</Label>

          <Input
            type="number"
            name="shippingCharge"
            value={settings.shippingCharge}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Instagram</Label>

          <Input
            name="instagram"
            value={settings.instagram}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Facebook</Label>

          <Input
            name="facebook"
            value={settings.facebook}
            onChange={handleChange}
          />

        </div>

        <Button
          className="w-full"
          onClick={handleSave}
        >
          Save Settings
        </Button>

      </div>

    </div>
  );
}