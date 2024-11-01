CREATE TABLE `multiple_choice_question` (
	`id` text PRIMARY KEY NOT NULL,
	`order` integer,
	`content` text,
	`test_id` text NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `multiple_choice_test`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `multiple_choice_test` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `option` (
	`content` text,
	`order` integer,
	`is_correct` integer DEFAULT false NOT NULL,
	`question_id` text NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `multiple_choice_question`(`id`) ON UPDATE no action ON DELETE cascade
);

