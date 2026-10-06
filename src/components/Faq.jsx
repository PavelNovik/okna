import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

// Вопросы на <details> — работают без JS и попадают в Schema.org FAQPage (src/seo.js)
// items — [{ q, a }]; по умолчанию общие вопросы с главной (t.faq)
export default function Faq({ items, title, eyebrow, id = 'faq' }) {
  const { t } = useLang()
  const f = { eyebrow: eyebrow ?? t.faq.eyebrow, title: title ?? t.faq.title, items: items ?? t.faq.items }
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container panel faq">
        <SectionHead id={`${id}-title`} eyebrow={f.eyebrow} title={f.title} center />
        <div className="faq__list">
          {f.items.map((item, i) => (
            <details key={item.q} className="faq__item" data-reveal style={{ '--d': `${i * 50}ms` }} open={i === 0}>
              <summary>
                <h3>{item.q}</h3>
                <Icon name="chevron" size={20} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
