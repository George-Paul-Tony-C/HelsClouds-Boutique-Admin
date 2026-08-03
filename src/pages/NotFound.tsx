// File: src/pages/NotFound.tsx

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="text-center">

        <h1 className="text-7xl font-bold">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-2 text-slate-500">
          The page you are looking for doesn't exist.
        </p>

        <Link to="/">

          <Button className="mt-8">
            Back to Dashboard
          </Button>

        </Link>

      </div>

    </main>
  );
}