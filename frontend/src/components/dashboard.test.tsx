import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Dashboard, ExecutiveMetrics, SignedInDashboard } from "./dashboard";
import { Login } from "./login";

describe("Atlas demo dashboard", () => {
  // The workspace is rendered directly rather than through <Dashboard />, which
  // now resolves the session first and shows an interstitial on its first pass.
  // An anonymous identity is the shape the API returns while
  // ATLAS_AUTH_ENABLED is false, which is the current deployed default.
  const anonymous = { id: "0", email: "anonymous (authentication disabled)", is_active: true };

  it("renders every required demo destination and the safe reset control", () => {
    const html = renderToStaticMarkup(<SignedInDashboard user={anonymous} onSignOut={null} />);

    for (const label of [
      "Project overview",
      "Knowledge / RFI",
      "Equipment thread",
      "Compliance findings",
      "Impact Chain",
      "Mitigation simulator",
      "Commissioning readiness",
      "Supply-chain simulation",
      "Evidence Dashboard",
      "Evaluation",
    ]) expect(html).toContain(label);
    expect(html).toContain("Reset Demo");
    expect(html).toContain("Synthetic simulation");
    expect(html).not.toContain("% hours saved");
  });

  it("provides the executive risk summary empty state", () => {
    const html = renderToStaticMarkup(<ExecutiveMetrics />);
    expect(html).toContain("executive risk summary");
    for (const label of ["Critical deviations", "Equipment at risk", "Schedule exposure", "Supply-chain alerts", "Commissioning readiness", "Open NCRs", "Measured hours saved", "Recommended mitigation", "Evidence confidence"]) expect(html).toContain(label);
  });

  it("shows an interstitial before the session is known, not the workspace", () => {
    const html = renderToStaticMarkup(<Dashboard />);
    expect(html).toContain("Connecting to Project Atlas");
    // The workspace must not leak out before the caller is identified.
    expect(html).not.toContain("Reset Demo");
  });

  it("offers a sign-out control only when a real account is signed in", () => {
    const signedIn = { id: "1", email: "member@example.com", is_active: true };
    const withAuth = renderToStaticMarkup(<SignedInDashboard user={signedIn} onSignOut={() => {}} />);
    expect(withAuth).toContain("Sign out");
    expect(withAuth).toContain("member@example.com");

    // With authentication disabled there is no session to end, so the control
    // is hidden rather than shown and broken.
    const withoutAuth = renderToStaticMarkup(<SignedInDashboard user={anonymous} onSignOut={null} />);
    expect(withoutAuth).not.toContain("anonymous (authentication disabled)");
  });

  it("renders the sign-in form with labelled credential fields", () => {
    const html = renderToStaticMarkup(<Login onSignedIn={() => {}} />);
    expect(html).toContain("Sign in");
    // Password managers rely on these. Asserted in the casing this React
    // version emits into static markup.
    expect(html).toContain("autoComplete=\"username\"");
    expect(html).toContain("autoComplete=\"current-password\"");
    expect(html).toContain("type=\"password\"");
  });

  it("surfaces the reason it returned to the sign-in screen", () => {
    const html = renderToStaticMarkup(<Login onSignedIn={() => {}} reason="Your session expired. Sign in again to continue." />);
    expect(html).toContain("Your session expired");
  });
});