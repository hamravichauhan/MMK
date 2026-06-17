import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`videos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`article_tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`article_tags_id\`) REFERENCES \`article_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_rels_order_idx\` ON \`videos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`videos_rels_parent_idx\` ON \`videos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_rels_path_idx\` ON \`videos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`videos_rels_article_tags_id_idx\` ON \`videos_rels\` (\`article_tags_id\`);`)
  await db.run(sql`DROP TABLE \`gallery_photos_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_videos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Migration Placeholder Title' NOT NULL,
  	\`youtube_id\` text NOT NULL,
  	\`description\` text DEFAULT 'Migration placeholder description. Please update this in the admin dashboard.' NOT NULL,
  	\`status\` text DEFAULT 'published' NOT NULL,
  	\`category\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_videos\`("id", "title", "youtube_id", "description", "status", "category", "updated_at", "created_at") SELECT "id", "title", "youtube_id", "description", "status", "category", "updated_at", "created_at" FROM \`videos\`;`)
  await db.run(sql`DROP TABLE \`videos\`;`)
  await db.run(sql`ALTER TABLE \`__new_videos\` RENAME TO \`videos\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`videos_youtube_id_idx\` ON \`videos\` (\`youtube_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_updated_at_idx\` ON \`videos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_created_at_idx\` ON \`videos\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`soldiers\` ADD \`slug\` text NOT NULL;`)
  await db.run(sql`CREATE UNIQUE INDEX \`soldiers_slug_idx\` ON \`soldiers\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`gallery_photos\` ADD \`album_id\` integer NOT NULL REFERENCES gallery_albums(id);`)
  await db.run(sql`CREATE INDEX \`gallery_photos_album_idx\` ON \`gallery_photos\` (\`album_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`gallery_photos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`gallery_albums_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`gallery_photos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gallery_albums_id\`) REFERENCES \`gallery_albums\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gallery_photos_rels_order_idx\` ON \`gallery_photos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gallery_photos_rels_parent_idx\` ON \`gallery_photos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_photos_rels_path_idx\` ON \`gallery_photos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`gallery_photos_rels_gallery_albums_id_idx\` ON \`gallery_photos_rels\` (\`gallery_albums_id\`);`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`videos_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_gallery_photos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`caption\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_gallery_photos\`("id", "media_id", "caption", "sort_order", "updated_at", "created_at") SELECT "id", "media_id", "caption", "sort_order", "updated_at", "created_at" FROM \`gallery_photos\`;`)
  await db.run(sql`DROP TABLE \`gallery_photos\`;`)
  await db.run(sql`ALTER TABLE \`__new_gallery_photos\` RENAME TO \`gallery_photos\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`gallery_photos_media_idx\` ON \`gallery_photos\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_photos_updated_at_idx\` ON \`gallery_photos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_photos_created_at_idx\` ON \`gallery_photos\` (\`created_at\`);`)
  await db.run(sql`DROP INDEX \`soldiers_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`soldiers\` DROP COLUMN \`slug\`;`)
  await db.run(sql`CREATE TABLE \`__new_videos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`youtube_id\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`status\` text DEFAULT 'published',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_videos\`("id", "youtube_id", "category", "status", "updated_at", "created_at") SELECT "id", "youtube_id", "category", "status", "updated_at", "created_at" FROM \`videos\`;`)
  await db.run(sql`DROP TABLE \`videos\`;`)
  await db.run(sql`ALTER TABLE \`__new_videos\` RENAME TO \`videos\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`videos_youtube_id_idx\` ON \`videos\` (\`youtube_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_updated_at_idx\` ON \`videos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_created_at_idx\` ON \`videos\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT 'editor' NOT NULL;`)
}
