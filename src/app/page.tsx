import Link from "next/link";

import { PublicPage } from "@/components/public-page";
import { ArticleList } from "@/components/article-list";
import { getPublicProfile, getPublicArticle } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, article] = await Promise.all([getPublicProfile(), getPublicArticle()]);

  return (
    <PublicPage>
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

        <section className="home-article" aria-labelledby="latest-article">
          <div className="section-topline">
            <h2 id="latest-article">Latest article</h2>
            <Link href="/article">Article archive <span aria-hidden="true">→</span></Link>
          </div>
          <ArticleList articles={article} />
        </section>

        <section className="home-manifesto" aria-labelledby="manifesto">
          <div>
            <p className="meta-line">A working position</p>
            <h2 id="manifesto">Article is the beginning of better products.</h2>
          </div>
          <p>
            We preserve what works, remove unnecessary friction, and change our minds when
            evidence asks us to.
          </p>
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
      </main>
    </PublicPage>
  );
}
