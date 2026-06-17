# MMK Digital Platform v2.0 Documentation

## 1. Project Overview

The MMK Digital Platform is a content-driven website designed to serve as the central digital home for Major Madhan Kumar, a retired Indian Army officer and geopolitical analyst.

### Core Goals

- Establish authority in geopolitical and defense analysis.
- Deliver daily-updated, high-density content (news, analysis, videos, events).
- Provide a professional, Firstpost-style, category-filtered news feed.
- Auto-sync YouTube videos without manual intervention.
- Honour the Indian Armed Forces via the "Know Your Soldiers" database.

---

## 2. Technical Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js (App Router) |
| CMS | Payload CMS 3.0 |
| Database | SQLite (Local Development) / PostgreSQL on Supabase (Production) |
| Storage | Cloudinary (via @payloadcms/plugin-cloud-storage) |
| Monorepo Manager | Turborepo |
| Package Manager | pnpm |

---

## 3. Installation & Setup

### Prerequisites

- Node.js v20+
- pnpm installed
- Git installed

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone [your-repository-url]
   cd mmk-platform
