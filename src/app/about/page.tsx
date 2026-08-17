import { ArchivePage } from "@/components/archive-page";
import { GithubIcon } from "@/components/github-icon";
import { getPublicProfile } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

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
          <h2>About VXNUS</h2>
          <p className="reading-copy">{profile.introduction}</p>
        </section>
        <section>
          <h2>What We Explore</h2>
          <p className="reading-copy">
            Products are one outcome of research, not the goal itself. We work across software,
            tools, and knowledge systems.
          </p>
        </section>
        <section>
          <h2>How We Work</h2>
          <ol className="principle-list">
            {profile.principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{principle}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2>Origin & Founder</h2>
          <p className="reading-copy">
            VXNUS was founded by <a href={site.founder.url} target="_blank" rel="noopener noreferrer">{site.founder.name}</a>. 
            It is the studio through which this work is researched, developed, and published.
          </p>
        </section>
        <section>
          <h2>Code & Open Source</h2>
          <p className="reading-copy">
            Public repositories and open software experiments are maintained and published under{" "}
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontWeight: 500,
              }}
              aria-label="GitHub repository: vxnuslabs"
            >
              <GithubIcon size={15} style={{ display: "inline-block", verticalAlign: "-2px" }} />
              <span>{site.github.name} ↗</span>
            </a>
            .
          </p>
        </section>
      </div>
    </ArchivePage>
  );
}
