# Spoken script — slides 8 to 11

**About 100 seconds** — roughly 25 a slide, near 290 words.

Full sentences throughout, and each slide ends by opening the next, so the four
run as one argument: here is the market, here is what we charge, here is why we
can charge it, here is how it holds at scale.

**Bold** = lean on it. ⚠️ = say it exactly; those lines are what make every
number around them worth stating.

---

## Slide 8 — MARKET PLAN · ~25s

> India has announced **8.33 gigawatts** of data centres, and only about
> **1,123 megawatts** is running today. Every megawatt in that gap belongs to a
> team working to a date somebody has already promised.
>
> Those teams are our users — project controls, procurement, QA, commissioning.
> Contractors buy per project, owners per portfolio, and we start on **30 to 100
> megawatt builds in India**.
>
> ⚠️ The $29 million is our own arithmetic, not a published figure.

---

## Slide 9 — PRICED AGAINST DELAY · ~25s

> **So here is what we charge.** A project licence is **fifty lakh to one and a
> quarter crore**; a portfolio starts at **three point three crore**.
>
> We don't ask for a campus rollout. We start with a **twelve-week pilot on one
> equipment package** and measure what it caught. If the numbers hold, we expand.
>
> And they work, because **a three-month slip on 50 megawatts costs about ₹72
> crore in financing alone.** We cost two percent of that.
>
> ⚠️ That figure is illustrative, not a measured customer result.

---

## Slide 10 — WHY ATLAS · ~25s

> **We can price against delay because of what the product does.** One sentence,
> if you take nothing else: **other tools manage project stages — Atlas connects
> their consequences.**
>
> You ask one question and get one cited answer, linked to the clause it came
> from. Then we carry that deviation into the procurement delay, the critical
> path and the commissioning impact — **the part nobody else does.** The maths is
> code, not a model, and every action waits for an engineer.
>
> **One question, one cited answer, one impact chain, one controlled decision.**

---

## Slide 11 — SCALABILITY · ~25s

> **That has to hold beyond one project, and it is built for it** — async,
> stateless, replica-ready, every row isolated by project.
>
> We scale in three stages, each triggered by a customer rather than a calendar:
> object storage and sparse retrieval for the **first design partner**; a
> separate embedding service and read replicas at **ten projects**; sharding,
> autoscaling and published SLOs at **portfolio scale**.
>
> **We split services only after measuring a real bottleneck.**

---

## If you're running over

Cut slide 11 to one line: *"It's async, stateless and project-isolated, so it
takes replicas today — and we split services only after measuring a real
bottleneck."*

Never cut the ₹72 crore line or the hook on slide 10. Those two carry the pitch.

## Three questions you'll get

**"Is the $29M real?"**
> It's our arithmetic and the assumption is on the slide — change the software
> rate and the number changes. We'd rather show the method than quote a figure
> we can't defend.

**"Why not just Procore?"**
> They'll keep Procore; we don't replace the system of record. Procore tells you
> the submittal was rejected. It won't tell you what that does to your
> energisation date — and that calculation is the product.

**"You have no customers."**
> Correct — no revenue, no pilots, no letters of intent. That's exactly why the
> entry point is a twelve-week pilot on one package rather than a campus.
