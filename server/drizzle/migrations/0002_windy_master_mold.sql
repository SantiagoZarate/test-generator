CREATE TABLE `test_result` (
	`id` text PRIMARY KEY NOT NULL,
	`test_id` text NOT NULL,
	`answers` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `test`(`id`) ON UPDATE no action ON DELETE cascade
);
