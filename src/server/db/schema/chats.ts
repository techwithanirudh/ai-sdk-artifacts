
import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  json,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AppUsage } from "@/lib/ai/usage";
import { users } from "./auth";

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  title: text("title").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  lastContext: jsonb("lastContext").$type<AppUsage | null>(),
});

export type Chat = InferSelectModel<typeof chats>;

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chats.id),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DBMessage = InferSelectModel<typeof messages>;

export const votes = pgTable(
  "votes",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chats.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => messages.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  }
);

export type Vote = InferSelectModel<typeof votes>;

export const documents = pgTable(
  "documents",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: ["text", "code", "image", "sheet"] })
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  }
);

export type Document = InferSelectModel<typeof documents>;
