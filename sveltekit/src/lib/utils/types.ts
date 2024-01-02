import { z } from "zod";

const userSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  email: z.string().email(),
});

const investmentSchema = z.object({
  investment_id: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  timestamp: z.date(),
  user_id: z.string().optional(),
  group_id: z.string().optional(),
});

const groupSchema = z.object({
  group_id: z.string(),
  name: z.string(),
  user_ids: z.array(z.string()),
});

const debtSchema = z.object({
  debt_id: z.string(),
  description: z.string(),
  amount: z.number(),
  timestamp: z.date(),
  user_id: z.string().optional(),
  group_id: z.string().optional(),
});

const portfolioSchema = z.object({
  portfolio_id: z.string(),
  name: z.string(),
  description: z.string(),
  investment_ids: z.array(z.string()),
  debt_ids: z.array(z.string()),
});

const transactionSchema = z.object({
  transaction_id: z.string(),
  type: z.string(),
  amount: z.number(),
  timestamp: z.date(),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly", "single"]),
  investment_id: z.string().optional(),
  debt_id: z.string().optional(),
});
