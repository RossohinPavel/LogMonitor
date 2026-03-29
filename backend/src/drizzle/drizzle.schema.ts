import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const resources = sqliteTable("resources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  url: text("url"),
});

export type InsertResource = InferInsertModel<typeof resources>;
export type SelectResource = InferSelectModel<typeof resources>;

export const logs = sqliteTable("logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  resourceId: integer("resource_id")
    .notNull()
    .references(() => resources.id, { onDelete: "cascade" }),
  receivedAt: integer("received_at")
    .notNull()
    .default(sql`(unixepoch())`),
  type: text("type").notNull(),
  content: text("content").notNull(),
});

export type SelectLog = InferSelectModel<typeof logs>;

export interface LogStat {
  hour: number
  info: number
  warning: number
  success: number
  error: number
} 

// export const pings = sqliteTable("pings", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   resourceId: integer("resource_id")
//     .notNull()
//     .references(() => resources.id, { onDelete: "cascade" }),
//   sendAt: integer("send_at").notNull(),
//   receivedAt: integer("received_at").notNull(),
//   isSuccess: integer("is_success").default(0),
//   content: text("content"),
// });