# Calendly And Coordination

Last updated: 2026-10-03

**Primary readers:** Backend, Frontend, Product Designer
**Priority:** Highest

## Purpose

This feature gives a Mentee one clear Mentor-selected route to coordinate an accepted Ask. It does not create a native scheduling, chat, rescheduling, or booking-verification product.

## Core Rules

- a Mentor may save an optional default coordination route during onboarding or Profile: public Calendly event URL or LinkedIn profile URL
- coordination setup never affects community membership or matching eligibility
- if a saved LinkedIn default exists, accepting an Ask snapshots it without asking again
- if a saved Calendly default exists, accepting an Ask does not re-ask for the URL or method, but requires `Review my Calendly availability` and `Confirm. I've reviewed my availability` before snapshotting it
- if no default exists, the Mentor must select one valid route before acceptance is committed
- the Mentor may save a newly entered route as the default for future accepted Asks; changing a default later never changes a snapshotted accepted Ask
- only one route is shown to the Mentee for an accepted Ask; personal email is never shown

## Calendly Route

- show `Create or sign in to Calendly` as an external CTA, then ask the Mentor to return and paste a public event-type booking URL, for example `https://calendly.com/name/coffee-chat`
- do not accept dashboard, account-settings, or profile-only URLs
- before saving or confirming a Calendly route, show: `Make sure you indicate or update your availability for the whole semester. Mentees will use this link to book directly with you.`
- OAA validates public URL format only; it does not verify open times
- Mentee CTA: `Choose a time with [Mentor]`; render inline embed after action with a new-tab fallback

## LinkedIn Route

- Mentor supplies a valid LinkedIn profile URL
- Mentee CTA: `Connect with [Mentor] on LinkedIn`; open it in a new tab
- OAA does not create messages or suggest copy in MVP

## Self-Reported Conversation Follow-Up

- one day after acceptance, send Mentee private prompt: `When did or will your conversation with [Mentor] happen?`
- options: `It already happened`, `It is scheduled`, `Not scheduled yet`
- scheduled requires expected date, not time
- not scheduled may capture: Mentor has not responded, scheduling conflict, no longer meeting, Other, or Prefer not to say
- after `Not scheduled yet`, send one private Mentee follow-up after three days; send no more scheduling follow-ups
- if expected date is supplied, invite both participants to private pulse one day later; if conversation already happened, invite both immediately
- participants never see the other person's timing answer, reason, or feedback
- accepted Asks never expire due to missing booking signal

## MVP Boundary

- no Calendly OAuth, APIs, webhooks, calendar sync, booking/cancellation/reschedule tracking, or provider-event storage
- no in-platform messaging or personal-email sharing
- record selected route, immutable snapshot URL, CTA render/click, Mentee self-report, and private pulse events
- verified completion and credentialing are post-MVP
