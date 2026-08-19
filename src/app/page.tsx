import Link from "next/link";

import { HomeJsonLd } from "@/components/home-json-ld";
import { PublicPage } from "@/components/public-page";
import { ArticleList } from "@/components/article-list";
import { WorkList } from "@/components/work-list";
import { GithubIcon } from "@/components/github-icon";
import { getPublicProfile, getPublicArticle, getPublicWork } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: site.name,
  description: site.description,
  path: "/",
});

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, article, work] = await Promise.all([getPublicProfile(), getPublicArticle(), getPublicWork()]);

  const projects = work.filter((w) => w.type === "project");
  const openSource = work.filter((w) => w.type === "open_source");

  return (
    <PublicPage>
      <HomeJsonLd profile={profile} />
      <main>
        <section className="home-intro">
          <p className="intro-kicker">{profile.positioning}</p>
          <h1>
            {profile.name}
          </h1>
          <div className="intro-statement">
            <p className="intro-tagline">{profile.introduction.split('. ')[0]}.</p>
            {profile.introduction.split('. ').slice(1).length > 0 && (
              <p className="intro-descriptor">{profile.introduction.split('. ').slice(1).join('. ')}</p>
            )}
          </div>
          <div className="intro-rule" aria-hidden="true" />
        </section>

        <section className="home-projects" aria-labelledby="latest-projects">
          <div className="section-topline">
            <h2 id="latest-projects">What VXNUS is making</h2>
            <Link href="/projects">All projects <span aria-hidden="true">→</span></Link>
          </div>
          <WorkList work={projects} emptyMessage="Selected projects will appear here as they reach a publishable state." />
        </section>

        <section className="home-manifesto" aria-labelledby="manifesto">
          <div>
            <p className="meta-line">A working position</p>
            <h2 id="manifesto">Research is the beginning of better products.</h2>
          </div>
          <p>
            We preserve what works, remove unnecessary friction, and change our minds when
            evidence asks us to.
          </p>
        </section>

        <section className="home-article" aria-labelledby="latest-article">
          <div className="section-topline">
            <h2 id="latest-article">Research & Notes</h2>
            <Link href="/article">Article archive <span aria-hidden="true">→</span></Link>
          </div>
          <ArticleList articles={article} />
        </section>

        <section className="home-areas" aria-labelledby="areas-of-work">
          <div className="section-topline">
            <h2 id="areas-of-work">Areas of work</h2>
            <Link href="/about">About the studio <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="area-list">
            {profile.areasOfWork.map((area, index) => (
              <li key={area}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-opensource" aria-labelledby="open-source">
          <div className="section-topline">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <h2 id="open-source">Open Source</h2>
              <a
                href={site.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-pill-link"
                aria-label="GitHub repository: vxnuslabs"
              >
                <GithubIcon size={13} />
                <span>{site.github.name} ↗</span>
              </a>
            </div>
            <Link href="/open-source">All repositories <span aria-hidden="true">→</span></Link>
          </div>
          <WorkList work={openSource} emptyMessage="Selected open-source artifacts will appear here as they are published." />
        </section>
      </main>
    </PublicPage>
  );
}
