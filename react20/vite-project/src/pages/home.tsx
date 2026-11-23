import Post from "../ui/Post";

export default function HomePage() {
  return (
    <>
      <h1>Hi, I am John, Creative Technologist</h1>

      <section>
        <h2>Recent posts</h2>
        <div>
          <Post
            title="Making a design system from scratch"
            date="12 feb 2020"
          />
          <Post
            title="Creating pixel perfect icons in Figma"
            date="14 may 2024"
          />
        </div>
      </section>
    </>
  );
}

