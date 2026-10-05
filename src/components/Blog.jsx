import { img, posts } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function Blog() {
  const { t } = useLang()
  const b = t.blog
  return (
    <section className="section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <div className="panel panel--head">
          <SectionHead id="blog-title" eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
        </div>
        <ul className="posts">
          {posts.map((p, i) => (
            <li key={p.href} className="post panel" data-reveal style={{ '--d': `${i * 80}ms` }}>
              <img src={img(p.img, 'sm')} alt="" width="640" height="480" loading="lazy" decoding="async" />
              <div className="post__body">
                <h3>{b.items[i].title}</h3>
                <p>{b.items[i].text}</p>
                <a className="link-arrow" href={p.href} target="_blank" rel="noopener" hrefLang="pl">
                  {b.more} <Icon name="arrow" size={18} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
