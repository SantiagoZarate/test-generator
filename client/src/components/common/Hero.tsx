export function Hero() {
  return (
    <section className="relative w-full border-b [mask-image:linear-gradient(90deg,transparent_10%,#000_25%,#000_75%,transparent_90%)] print:hidden">
      <div className="absolute bottom-0 z-0">
        <img
          src="/images/sunbeam.avif"
          className="rotate-180 -hue-rotate-60"
          alt=""
        />
      </div>
      <article className="relative z-10 mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-2 py-24">
        <h1 className="text-center text-6xl font-black">
          Craft the Perfect Exam for Every Lesson
        </h1>
        <p>Design diverse assessments tailored to your students' needs.</p>
      </article>
    </section>
  );
}
