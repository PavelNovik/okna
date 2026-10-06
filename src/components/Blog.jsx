import { img } from '../config.js'
import { posts, postPath } from '../content/posts.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

// Анонсы статей (только PL). headless — без заголовка секции (страница /porady/)
export default function Blog({ headless = false, headingLevel = 3 }) {
  const { t } = useLang()
  const b = t.blog
  const H = `h${headingLevel}`
  const list = (
    <ul className="posts">
      {posts.map((p, i) => (
        <li key={p.slug} className="post panel" data-reveal style={{ '--d': `${i * 80}ms` }}>
          <img src={img(p.img, 'sm')} alt="" width="640" height="480" loading="lazy" decoding="async" />
          <div className="post__body">
            <H>
              <a className="post__link" href={postPath(p)}>
                {p.title}
              </a>
            </H>
            <p>{p.excerpt}</p>
            <span className="link-arrow" aria-hidden="true">
              {b.more} <Icon name="arrow" size={18} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
  if (headless) return list
  return (
    <section className="section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <div className="panel panel--head">
          <SectionHead id="blog-title" eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
        </div>
        {list}
      </div>
    </section>
  )
}
