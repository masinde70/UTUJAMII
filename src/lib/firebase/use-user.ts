"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./client";

export function useUser() {
  const [user, setUser] = useState<User | null | undefined>(
    auth.currentUser ?? undefined,
  );

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return user;
}
