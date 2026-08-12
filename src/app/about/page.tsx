import { ArchivePage } from "@/components/archive-page";
import { getPublicProfile } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: "The working principles and areas of work behind VXNUS.",
  path: "/about",
});

export default async function AboutPage() {
  const profile = await getPublicProfile();

  return (
    <ArchivePage title="About the studio" description={profile.positioning}>
      <div className="about-grid">
        <section>
          <h2>What we do</h2>
          <p className="reading-copy">{profile.introduction}</p>
          <p className="reading-copy">
            Products are one outcome of article, not the goal itself. We work across software,
            tools, and knowledge systems.
          </p>
        </section>
        <section>
          <h2>How we work</h2>
          <ol className="principle-list">
            {profile.principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{principle}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </ArchivePage>
  );
}
