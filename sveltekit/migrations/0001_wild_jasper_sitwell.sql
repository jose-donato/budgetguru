ALTER TABLE `transactions` RENAME COLUMN `emoji` TO `category`;--> statement-breakpoint
ALTER TABLE transactions ADD `date` integer NOT NULL;