import { tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Липкая панель «Позвонить / WhatsApp» внизу экрана на телефонах (вместо круглой кнопки WhatsApp)
export default function MobileBar() {
  const { t } = useLang()
  return (
    <div className="mobile-bar">
      <a className="mobile-bar__call" href={tel}>
        <Icon name="phone" size={20} /> {t.bar.call}
      </a>
      <a className="mobile-bar__wa" href={waLink(t.wa.hello)} target="_blank" rel="noopener">
        <Icon name="whatsapp" size={22} /> {t.bar.wa}
      </a>
    </div>
  )
}
