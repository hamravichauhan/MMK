import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`ads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`left_ad_active\` integer DEFAULT true,
  	\`left_ad_image1_id\` integer,
  	\`left_ad_link1\` text,
  	\`left_ad_image2_id\` integer,
  	\`left_ad_link2\` text,
  	\`right_ad_active\` integer DEFAULT true,
  	\`right_ad_image1_id\` integer,
  	\`right_ad_link1\` text,
  	\`right_ad_image2_id\` integer,
  	\`right_ad_link2\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`left_ad_image1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`left_ad_image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`right_ad_image1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`right_ad_image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`ads_left_ad_image1_idx\` ON \`ads\` (\`left_ad_image1_id\`);`)
  await db.run(sql`CREATE INDEX \`ads_left_ad_image2_idx\` ON \`ads\` (\`left_ad_image2_id\`);`)
  await db.run(sql`CREATE INDEX \`ads_right_ad_image1_idx\` ON \`ads\` (\`right_ad_image1_id\`);`)
  await db.run(sql`CREATE INDEX \`ads_right_ad_image2_idx\` ON \`ads\` (\`right_ad_image2_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`ads\`;`)
}
