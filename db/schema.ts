import { auth } from "@/lib/auth";
import { relations, sql, SQL } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  check,
  decimal,
  integer,
  pgEnum,
  pgPolicy,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("nom Complet").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    commune: text().notNull(),
    ilot: text().notNull(),
    phone: text().unique().notNull(),
    adresse: text().notNull(),
    username: text("code_client").notNull(),
    displayUsername: text("display_username"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [
    // uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
    uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  ]
);
export const lower = (email: AnyPgColumn): SQL => {
  return sql`lower(${email})`;
};
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
export type Session = typeof auth.$Infer.Session;

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
export const livreurTable = pgTable("livreur", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  nomComplet: text().notNull(),
  phone: text().notNull().unique(),
});
export const statusEnum = pgEnum("status", ["non pay", "payed"]);

export const facturesTable = pgTable(
  "factures",
  {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    utiliateurId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    montant: decimal("montant").notNull(),
    livreurNom: integer("livrer_par")
      .notNull()
      .references(() => livreurTable.id),
    DemandeAt: timestamp("demander_a").notNull().defaultNow(),
    num_avis: text().notNull(),
    url: text("url").notNull(),
    status: statusEnum().default("non pay"),
  },
  (table) => [check("montant", sql`${table.montant} > 0`)]
);
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  utiliateurId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const UtilisateurRelation = relations(user, ({ many }) => ({
  factures_demander: many(facturesTable),
}));
export const livreurRelations = relations(livreurTable, ({ many }) => ({
  factures: many(facturesTable),
}));
export const FacturesRelations = relations(facturesTable, ({ one }) => ({
  team: one(user, {
    fields: [facturesTable.utiliateurId],
    references: [user.id],
  }),
  livreur: one(livreurTable, {
    fields: [facturesTable.livreurNom],
    references: [livreurTable.nomComplet],
  }),
}));
export const invoicesRelations = relations(invoices, ({ one }) => ({
  utilisateur: one(user, {
    fields: [invoices.utiliateurId],
    references: [user.id],
  }),
}));
export const schema = {
  user,
  session,
  account,
  verification,
  facturesTable,
  livreurTable,
  invoices,
};
