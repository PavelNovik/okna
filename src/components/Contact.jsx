import { useEffect, useRef, useState } from 'react'
import { brand, cities, mailLink, services, socials, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import { composeMessage } from '../send.js'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

const empty = { name: '', phone: '', service: '', place: '', message: '' }

// Форма без бэкенда: текст заявки уходит ссылкой wa.me (WhatsApp) или mailto: (почтовая программа)
export default function Contact({ initialService = '' }) {
  const { t, preset } = useLang()
  const c = t.contact
  const f = c.form
  const [form, setForm] = useState({ ...empty, service: initialService })
  const formRef = useRef(null)
  const waRef = useRef(null)

  // Услуга из карточки → выбрать в форме и поставить фокус на имя
  useEffect(() => {
    if (!preset) return
    setForm((v) => ({ ...v, service: preset.service }))
    const id = setTimeout(() => formRef.current?.querySelector('input')?.focus({ preventScroll: true }), 600)
    return () => clearTimeout(id)
  }, [preset])

  const set = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }))
  const serviceName = (id) => (id === 'other' ? f.other : t.services.items[id]?.name ?? '')

  const fields = [
    [f.name, form.name],
    [f.phone, form.phone],
    [f.service, serviceName(form.service)],
    [f.place, form.place],
    [f.message, form.message],
  ]
  // Обе кнопки — настоящие ссылки <a>, чтобы не блокировались как всплывающие окна
  const waHref = waLink(composeMessage([['', f.hello], ...fields]))
  const mailHref = mailLink(f.subject, composeMessage(fields))

  // Не пускаем по ссылке, пока не заполнены обязательные поля — браузер покажет подсказку
  const guard = (e) => {
    const el = formRef.current
    if (el && !el.checkValidity()) {
      e.preventDefault()
      el.reportValidity()
    }
  }

  const submit = (e) => {
    e.preventDefault()
    waRef.current?.click()
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container panel contact">
        <div className="contact__info">
          <SectionHead id="contact-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
          <ul className="contact__list" data-reveal>
            <li>
              <span className="contact__icon"><Icon name="phone" /></span>
              <div>
                <p className="contact__label">{c.phone}</p>
                <p className="contact__value"><a href={tel}>{brand.phone}</a></p>
              </div>
            </li>
            <li>
              <span className="contact__icon contact__icon--wa"><Icon name="whatsapp" /></span>
              <div>
                <p className="contact__label">{c.wa}</p>
                <p className="contact__value"><a href={waLink(t.wa.hello)} target="_blank" rel="noopener">{brand.whatsappDisplay}</a></p>
              </div>
            </li>
            <li>
              <span className="contact__icon"><Icon name="mail" /></span>
              <div>
                <p className="contact__label">{c.email}</p>
                <p className="contact__value"><a href={mailLink()}>{brand.email}</a></p>
              </div>
            </li>
            <li>
              <span className="contact__icon"><Icon name="clock" /></span>
              <div>
                <p className="contact__label">{c.hours}</p>
                <p className="contact__value">{c.hoursValue}</p>
              </div>
            </li>
            <li>
              <span className="contact__icon"><Icon name="pin" /></span>
              <div>
                <p className="contact__label">{c.area}</p>
                <ul className="chips">
                  {cities.map((city) => <li key={city}>{city}</li>)}
                  <li className="chips__more">{c.areaMore}</li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="contact__social" data-reveal>
            <p className="contact__label">{c.social}</p>
            <ul className="socials socials--dark">
              {socials.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                    <Icon name={s.id} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form ref={formRef} className="form" data-reveal onSubmit={submit}>
          <div className="form__row">
            <Field label={f.name} required>
              <input name="name" autoComplete="name" required value={form.name} onChange={set('name')} placeholder={f.placeholders.name} />
            </Field>
            <Field label={f.phone} required>
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required value={form.phone} onChange={set('phone')} placeholder={f.placeholders.phone} />
            </Field>
          </div>
          <div className="form__row">
            <Field label={f.service}>
              <div className="select">
                <select name="service" value={form.service} onChange={set('service')}>
                  <option value="">{f.choose}</option>
                  {services.map((id) => (
                    <option key={id} value={id}>
                      {t.services.items[id].name}
                    </option>
                  ))}
                  <option value="other">{f.other}</option>
                </select>
                <Icon name="chevron" size={18} />
              </div>
            </Field>
            <Field label={f.place}>
              <input name="place" autoComplete="address-level2" value={form.place} onChange={set('place')} placeholder={f.placeholders.place} />
            </Field>
          </div>
          <Field label={f.message} required>
            <textarea name="message" rows="5" required value={form.message} onChange={set('message')} placeholder={f.placeholders.message} />
          </Field>
          <div className="form__actions">
            <a ref={waRef} className="btn btn--wa btn--lg" href={waHref} target="_blank" rel="noopener" onClick={guard}>
              <Icon name="whatsapp" size={22} /> {f.sendWa}
            </a>
            <a className="btn btn--light btn--lg" href={mailHref} onClick={guard}>
              <Icon name="mail" size={20} /> {f.sendMail}
            </a>
          </div>
          <p className="form__note">{f.note}</p>
        </form>
      </div>
    </section>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
        {required && <span className="field__req" aria-hidden="true"> *</span>}
      </span>
      {children}
    </label>
  )
}
