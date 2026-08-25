# Spoken script — slides 8 to 11

Four slides, roughly **3 minutes 30 seconds** total. Written to be said out loud,
not read off the screen. Short sentences on purpose.

**Bold** = land it, slow down. *(brackets)* = stage direction, do not say.
⚠️ = an honesty line. Say it exactly as written; it is what makes the rest
believable.

---

## Slide 8 — MARKET PLAN · ~55 seconds

> India's data-centre pipeline is **8.33 gigawatts**.
>
> Today about **1,123 megawatts** is actually live. By 2027 that roughly doubles
> to **2,073**.
>
> So the gap between what is announced and what is built is enormous — and every
> megawatt of it has to be delivered by somebody, on a date they have already
> promised.
>
> *(beat)*
>
> **Who uses Atlas:** project controls, procurement, QA/QC and commissioning
> teams. The four groups who currently find out about each other's problems in a
> meeting, three weeks late.
>
> **Who pays:** EPC contractors buy it per project. Data-centre owners buy it
> across a portfolio.
>
> **Where we start** is deliberately narrow — 30 to 100 megawatt Tier III and
> Tier IV builds in India. That is the size where an equipment delay is
> expensive enough to be worth preventing.
>
> ⚠️ On the software opportunity — that **$29 million is our own estimate**, not
> a published market figure. We took the construction spend and applied a
> software-intensity rate derived from Procore's public pricing. The arithmetic
> is on the slide so you can check it.

---

## Slide 9 — PRICED AGAINST PROJECT DELAY · ~55 seconds

> Two products.
>
> **Fifty lakh to one and a quarter crore** for an annual project licence.
> **Three point three crore and up** for an enterprise portfolio licence across
> multiple projects.
>
> *(beat)*
>
> **How we enter is the important part.** We do not ask anyone to roll this out
> across a campus. We start with a **twelve-week pilot on one critical equipment
> package** — the switchgear, or the UPS. One package.
>
> In those twelve weeks we measure three things: deviations caught, engineering
> hours saved, and schedule exposure identified before it became a delay.
>
> If those numbers are good, we expand. If they are not, the customer has spent
> twelve weeks, not a year.
>
> *(beat — this is the money line)*
>
> **Why the price makes sense.** A three-month delay on a 50 megawatt project
> creates roughly **₹72 crore in financing cost alone** — before lost revenue,
> before penalties. Our licence is **two to three percent of that one number.**
>
> ⚠️ And that ₹72 crore is an illustrative calculation from public build costs.
> It is not a measured customer result. We do not have one yet.

---

## Slide 10 — WHY ATLAS · ~50 seconds

> If you remember one sentence from this pitch, make it this one.
>
> **Other tools manage project stages. Atlas connects their consequences.**
>
> *(beat — let it sit)*
>
> Three parts.
>
> **Evidence.** Instead of searching across separate folders and systems, a team
> asks one question and gets a cited answer, linked back to the clause in the
> original document. If the project's own documents do not support an answer,
> Atlas says so instead of guessing.
>
> **Consequence.** This is the part nobody else does. Atlas does not stop at
> "non-compliant". It calculates the procurement delay, the critical-path
> exposure and the commissioning impact that follow from it.
>
> **Control.** The engineering maths is deterministic code, not a language
> model. And every suggested action stays **pending until an engineer approves
> it.** Atlas never decides anything.
>
> *(read the bottom line straight across)*
>
> **One question. One cited answer. One connected impact chain. One controlled
> decision.**

---

## Slide 11 — SCALABILITY PLAN · ~50 seconds

> Quickly, because judges ask.
>
> **What is already production-shaped.** The API is async and stateless, so it
> takes horizontal replicas today. Models load once. CPU-heavy work stays off
> the event loop. Every database row and every vector is isolated by project.
> Migrations, health and readiness probes, bounded ingestion — all in.
>
> *(beat)*
>
> Then three stages, and each one is triggered by a customer, not a calendar.
>
> **Stage one, first design partner:** native sparse retrieval, worker-based
> ingestion, object storage, Redis caching. Target is p95 query under two
> seconds.
>
> **Stage two, five to ten projects:** we split embedding and reranking into
> their own service, add read replicas, connection pooling, quotas and tracing.
>
> **Stage three, portfolio scale:** tenant sharding, queue-based autoscaling,
> backups and disaster recovery, published SLOs.
>
> *(land it)*
>
> **We split services only after measuring a real bottleneck.** A prototype that
> ships as twelve microservices is not scalable — it is just harder to change.

---

## If you are running short on time

Cut in this order:

1. Slide 11 down to two sentences: *"Async, stateless, project-isolated, ready
   for replicas today. We scale in three stages and we split services only after
   measuring a real bottleneck."*
2. Slide 8's "who uses it" list — the slide already says it.
3. Never cut the ₹72 crore line on slide 9, or the one-sentence hook on slide 10.
   Those two are the pitch.

## The three questions you will get

**"Is the $29 million real?"**
> It is our own arithmetic, and the assumption is on the slide. 8.33 gigawatts,
> about $7 million per megawatt, times a software rate we derived from Procore's
> public pricing. Change the rate and the number changes. We would rather show
> the method than quote someone else's number we cannot defend.

**"Why would an EPC contractor pay this instead of using Procore?"**
> They will keep using Procore — it is the system of record and we do not
> replace it. Procore tells you the submittal was rejected. It will not tell you
> what that does to your energisation date. That calculation is the product.

**"You have no customers."**
> Correct. No revenue, no pilots, no letters of intent. That is exactly why the
> entry point is a twelve-week pilot on one equipment package, and why we
> measure deviations caught and hours saved rather than asking anyone to take
> our word for it.
