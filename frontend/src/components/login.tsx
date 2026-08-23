"use client";

import { FormEvent, useState } from "react";

import { ApiError, api } from "../lib/api";
import { Button, Card, Input } from "./ui";

export function Login({ onSignedIn, reason }: { onSignedIn: () => void; reason?: string | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.login(email.trim(), password);
      onSignedIn();
    } catch (caught) {
      // The API answers every failure - unknown address, wrong password,
      // deactivated account - with one message on purpose, so that a wrong
      // guess cannot be used to discover which addresses exist. Repeating it
      // verbatim keeps that property instead of guessing at a friendlier
      // reason the API declined to give.
      setError(
        caught instanceof ApiError && caught.status === 401
          ? "Invalid email or password."
          : caught instanceof ApiError
            ? caught.message
            : "Unable to reach Project Atlas. Check the API service and try again.",
      );
      setPassword("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mesh flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="font-mono text-label uppercase tracking-wider text-signal">
            EPC project intelligence
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Project Atlas</h1>
        </div>

        <Card>
          {reason ? (
            <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-900">
              {reason}
            </p>
          ) : null}

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                required
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm text-rose-800">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={submitting || !email || !password}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Card>

        <p className="mt-4 text-center text-xs leading-5 text-muted">
          Accounts are created by an administrator. There is no self-service sign-up
          and no password reset flow.
        </p>
      </div>
    </main>
  );
}
