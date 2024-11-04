ALTER TABLE question RENAME TO question_old;
--> statement-breakpoint

CREATE TABLE `question` (
	`question` text,
	`test_id` text NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `test`(`id`) ON UPDATE no action ON DELETE CASCADE
);
--> statement-breakpoint

INSERT INTO question (question, test_id)
  SELECT question, test_id
  FROM question_old;
--> statement-breakpoint

DROP TABLE IF EXISTS question_old;
