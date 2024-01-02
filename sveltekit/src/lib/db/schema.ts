import { sql } from "drizzle-orm";

import { integer, sqliteTable, text, } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
},)

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const transactions = sqliteTable("transactions", {
    id: integer("id").primaryKey({
        autoIncrement: true,
    }),
    userId: text("user_id").references(() => users.id),
    category: text("category").notNull(),
    description: text("description").notNull(),
    amount: integer("amount").notNull(),
    type: text("type", {
        enum: ["income", "expense"]
    }).notNull(),
    recurrenceInterval: integer("recurrence_interval"),
    date: integer("date", { mode: "timestamp" }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const insertTransactionSchema = createInsertSchema(transactions);
export const insertTransactionSchemaForm = insertTransactionSchema.omit({
    id: true,
    userId: true,
    createdAt: true,
})

export const updateTransactionSchema = insertTransactionSchemaForm.extend({
    action: z.enum(["delete", "update"])
})
export const selectTransactionSchema = createSelectSchema(transactions);


export const investments = sqliteTable("investments", {
    id: integer("id").primaryKey({
        autoIncrement: true,
    }),
    userId: text("user_id").references(() => users.id),
    category: text("category", {
        enum: ["crypto", "etf", "real estate", "custom"]
    }).notNull(),
    buyPrice: integer("buy_price").notNull(),
    description: text("description").notNull(),
    amount: integer("amount").notNull(),
    apr: integer("apr"),
    sellPrice: integer("sell_price"),
    quantity: integer("quantity").notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const insertInvestmentSchema = createInsertSchema(investments);
export const selectInvestmentSchema = createSelectSchema(investments);

export const debt = sqliteTable("debt", {
    id: integer("id").primaryKey({
        autoIncrement: true,
    }),
    userId: text("user_id").references(() => users.id),
    category: text("category", {
        enum: ["credit card", "mortgage", "loan", "custom"]
    }).notNull(),
    description: text("description").notNull(),
    dueDate: integer("due_date", { mode: "timestamp" }),
    interestRate: integer("interest_rate"),
    paymentAmount: integer("payment_amount"),
    amount: integer("amount").notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const insertDebtSchema = createInsertSchema(debt);
export const selectDebtSchema = createSelectSchema(debt);