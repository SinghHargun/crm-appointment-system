# crm-appointment-system
Secure web-based CRM for appointment scheduling, automated reminders, and follow-up tracking — designed for an independent financial consultant
Built as part of CPS412 at Toronto Metropolitan University.

## Overview

The system addresses three core problems faced by the consultant:
* Missed appointments due to no automated reminders
* Inconsistent follow-up communication after consultations
* No centralized place to manage sensitive client records

## Features

* Client management — create, update, and delete client profiles
* Appointment scheduling with automatic conflict detection
* Appointment status tracking (Scheduled, Completed, No-show, Rescheduled)
* Follow-up task creation with priority levels and due dates
* Overdue task detection and flagging
* RESTful API backend built with Node.js and Express

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | PostgreSQL (in-memory store for demo) |
| Authentication | Firebase Auth (planned) |
| Email reminders | SendGrid API (planned) |
| SMS reminders | Twilio API (planned) |

## Security Design

* HTTPS / TLS encryption for all data in transit
* AES-256 encryption for data at rest
* Firebase Auth with MFA support
* Role-based access control
* Audit logging for all record changes
* PIPEDA-compliant data handling

## How to Run (Backend)

```bash
cd backend
npm install
npm run dev
```

API runs at `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/clients | Get all clients |
| POST | /api/clients | Create a client |
| GET | /api/appointments | Get all appointments |
| POST | /api/appointments | Book an appointment |
| GET | /api/appointments/upcoming | Get upcoming appointments |
| GET | /api/followups/overdue | Get overdue follow-up tasks |
| POST | /api/followups | Create a follow-up task |
| PUT | /api/followups/:id | Update follow-up status |

## Project Context

This system was designed and partially implemented as part of a group project (Group 39) for CPS412 at TMU. The Phase 3 report covers full requirements analysis, system architecture, security specifications, and design analysis including equity, sustainability, and ethical considerations.
