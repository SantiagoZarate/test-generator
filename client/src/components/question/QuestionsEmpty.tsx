export function QuestionsEmpty() {
  return (
    <section
      data-testid="questions-placeholder"
      className="flex w-full items-center justify-center rounded-md border border-neutral-600 bg-neutral-800 p-4"
    >
      You havent introduce any questions yet, go ahead and add some!
    </section>
  );
}
