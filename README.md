# MMK Digital Platform v2.0 Documentation

## 1. Project Overview

The **MMK Digital Platform** is a content-driven website designed to serve as the central digital home for **Major Madhan Kumar**, a retired Indian Army officer and geopolitical analyst.

### Core Goals

* Establish authority in geopolitical and defense analysis.
* Deliver daily-updated, high-density content (news, analysis, videos, events).
* Provide a professional, Firstpost-style, category-filtered news feed.
* Auto-sync YouTube videos without manual intervention.
* Honour the Indian Armed Forces via the **"Know Your Soldiers"** database.

---

## 2. Technical Stack

| Component        | Technology                                                       |
| ---------------- | ---------------------------------------------------------------- |
| Framework        | Next.js (App Router)                                             |
| CMS              | Payload CMS 3.0                                                  |
| Database         | SQLite (Local Development) / PostgreSQL on Supabase (Production) |
| Storage          | Cloudinary (via `@payloadcms/plugin-cloud-storage`)              |
| Monorepo Manager | Turborepo                                                        |
| Package Manager  | pnpm                                                             |

---

## 3. Installation & Setup

### Prerequisites

* Node.js v20+
* pnpm installed
* Git installed

### Setup Steps

#### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd mmk-platform
```

#### 2. Initialize Monorepo

Ensure you have **Turborepo** initialized at the project root.

#### 3. Install Dependencies

```bash
pnpm install
```

Run this command from the root directory.

#### 4. Configure Environment Variables

Create a `.env` file and populate the required values:

```env
DATABASE_URI=
PAYLOAD_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Use `.env.example` as the reference template.

#### 5. Run Development Server

```bash
pnpm dev
```

---

## 4. Key Features & Content Schema

The platform is built around **9 core database collections**.

| Collection              | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| Users                   | Admin management and authentication.                         |
| Media                   | Image and media storage via Cloudinary.                      |
| Articles                | Blog posts, geopolitical analysis, and news content.         |
| Article Tags            | Categorization and filtering system.                         |
| Videos                  | Auto-synced YouTube content using only the `youtube_id`.     |
| Events                  | Management of upcoming, ongoing, and past events.            |
| Gallery Albums & Photos | Visual event and activity coverage.                          |
| Soldiers                | Detailed profiles for the **Know Your Soldiers** initiative. |
| Contact Submissions     | Secure, rate-limited contact form submissions.               |

### Articles Collection

Typical fields include:

* Title
* Slug
* Excerpt
* Content Body
* Featured Image
* Category
* Tags
* Language
* Author
* Published Date
* Status

### Videos Collection

Stores:

* YouTube ID
* Title
* Thumbnail
* Description
* Published Date
* Auto-synced Metadata

### Soldiers Collection

Stores:

* Name
* Rank
* Regiment
* Biography
* Service History
* Awards & Decorations
* Gallery Images
* Legacy Information

---

## 5. Troubleshooting & Maintenance

### Cloudinary Integration

To prevent package registry and adapter conflicts:

* Always use:

```bash
@payloadcms/plugin-cloud-storage
```

instead of individual storage adapters.

* Ensure the following setting exists in `Media.ts`:

```ts
disableLocalStorage: true
```

### Query Errors

If Next.js throws a `QueryError`:

1. Verify that commonly queried fields (e.g., `status`) include:

```ts
index: true
```

2. Ensure sufficient query depth is provided:

```ts
payload.find({
  collection: 'articles',
  depth: 2,
})
```

### Database Maintenance

#### Local Development

```bash
pnpm payload migrate
```

#### Production

Use PostgreSQL hosted on Supabase and apply migrations before deployment.

---

## 6. Deployment Strategy

### Recommended Architecture

| Service    | Purpose                     |
| ---------- | --------------------------- |
| Vercel     | Next.js Frontend Hosting    |
| Railway    | Payload CMS Backend Hosting |
| Supabase   | PostgreSQL Database         |
| Cloudinary | Media Storage & CDN         |

### Deployment Flow

```text
Developer
    ↓
GitHub Repository
    ↓
 ┌───────────────┬───────────────┐
 │               │               │
Vercel       Railway        Supabase
Frontend     Payload CMS     Database
 │               │
 └────── Cloudinary ──────┘
         Media Storage
```

---

## 7. Additional Resources

### Documentation

* Payload CMS Documentation
* Next.js App Router Documentation
* Cloudinary Storage Plugin Documentation
* Supabase Documentation
* Railway Documentation
* Vercel Documentation

---

## 8. Project Vision

The MMK Digital Platform aims to become a premier destination for:

* Geopolitical analysis
* Defense and strategic affairs
* Military history
* Current affairs commentary
* Veteran engagement
* Public education on the Indian Armed Forces

By combining modern publishing tools, automated content synchronization, and structured military heritage archives, the platform serves as both a professional media presence and a lasting digital legacy for Major Madhan Kumar.
