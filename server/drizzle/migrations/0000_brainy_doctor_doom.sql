CREATE TABLE `question` (
	`question` text,
	`test_id` text NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `test`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`title` text NOT NULL
);
