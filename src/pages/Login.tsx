import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ROUTES } from "@/constants/routes";

import {
  getCurrentSession,
  signIn,
  signOut,
} from "@/lib/auth";

import { getProfile } from "@/lib/profile";
import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function checkSession() {
      try {
        const session = await getCurrentSession();
        
        if (!session) return;
        
        const profile = await getProfile(session.user.id);
        
        if (profile.role === "admin") {
          navigate(ROUTES.DASHBOARD, {
            replace: true,
          });
        } else {
          await signOut();
        }
      } catch (err) {
          console.error(err);

          error(getErrorMessage(err));
      }
    }
    
    checkSession();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await signIn(
        email,
        password
      );

      if (!user) {
        throw new Error("User not found.");
      }

      const profile = await getProfile(
        user.id
      );

      if (!profile) {
        throw new Error("Profile not found.");
      }

      if (
        profile.role.toLowerCase() !==
        "admin"
      ) {
        await signOut();

        throw new Error(
          "Access denied. You are not an administrator."
        );
      }

      navigate(ROUTES.DASHBOARD, {
        replace: true,
      });
    } catch (err) {
        console.error(err);

        error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              HelsClouds
            </h1>

            <p className="text-sm text-slate-500">
              Boutique Admin Panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}