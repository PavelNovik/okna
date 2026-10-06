import { services, servicePath } from '../content/services.js'
import { useLang } from '../i18n/index.jsx'

// Таблица цен. PL — все позиции со страниц услуг со ссылками; DE — по одной строке «ab … zł» на услугу.
export default function PriceList() {
  const { t, lang } = useLang()
  const s = t.services
  if (lang !== 'pl') {
    return (
      <table className="prices">
        <tbody>
          {services.map((x) => (
            <tr key={x.id}>
              <th scope="row">{s.items[x.id].name}</th>
              <td>{x.from ? `${s.from} ${x.from} ${s.currency}` : s.custom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return (
    <table className="prices">
      <caption className="visually-hidden">Orientacyjne ceny usług serwisu okien</caption>
      <thead>
        <tr>
          <th scope="col">Usługa</th>
          <th scope="col">Cena</th>
        </tr>
      </thead>
      {services.map((x) => (
        <tbody key={x.id}>
          <tr className="prices__group">
            <th scope="rowgroup" colSpan={2}>
              <a href={servicePath(x)}>{x.name}</a>
            </th>
          </tr>
          {x.prices.map(([label, price]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  )
}
