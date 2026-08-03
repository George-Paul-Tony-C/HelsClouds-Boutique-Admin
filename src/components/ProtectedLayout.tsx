import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getCurrentSession,
} from "@/lib/auth";

import {
  getProfile,
} from "@/lib/profile";

import { ROUTES } from "@/constants/routes";

export default function ProtectedLayout() {
  const [loading, setLoading] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    
    async function check() {
      try {
        const session =
          await getCurrentSession();
  
        if (!session) {
          setAllowed(false);
  
          return;
        }
  
        const profile =
          await getProfile(
            session.user.id
          );
  
        if (
          profile.role !== "admin"
        ) {
          setAllowed(false);
  
          return;
        }
  
        setAllowed(true);
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    }

    check();
  }, []);


  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  if (!allowed)
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );

  return <Outlet />;
}