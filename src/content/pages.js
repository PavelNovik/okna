// Тексты внутренних страниц (только PL). Мета — для <title>/<meta description>/OG, см. src/seo.js
import { brand } from '../config.js'

export const pages = {
  services: {
    title: 'Usługi — naprawa i serwis okien i drzwi Poznań | Liwserwis',
    description:
      'Regulacja okien, wymiana uszczelek, szyb zespolonych, okuć, zawiasów i klamek, naprawa rolet, serwis okien dachowych i diagnostyka termowizyjna. Poznań i Wielkopolska.',
    h1: 'Usługi serwisu okien i drzwi',
    lead: 'Naprawiamy okna i drzwi balkonowe PCV oraz drewniane — w domach, mieszkaniach, biurach i instytucjach. Wybierz usługę, aby zobaczyć szczegóły i orientacyjne ceny.',
    crumb: 'Usługi',
  },
  prices: {
    title: 'Cennik naprawy okien Poznań — regulacja od 50 zł | Liwserwis',
    description:
      'Orientacyjny cennik serwisu okien: regulacja od 50 zł, wymiana uszczelki od 30 zł, klamki od 75 zł, szyby zespolonej od 500 zł. Bezpłatna wycena. Poznań i Wielkopolska.',
    h1: 'Cennik naprawy i serwisu okien',
    lead: 'Ceny są orientacyjne i zależą od stanu okna, typu okuć i miejscowości. Dokładną cenę podajemy po krótkiej rozmowie telefonicznej lub po obejrzeniu okien na miejscu.',
    crumb: 'Cennik',
    howTitle: 'Jak ustalamy cenę?',
    how: [
      'Opisujesz problem przez telefon lub WhatsApp — najlepiej ze zdjęciem.',
      'Podajemy orientacyjną cenę i termin wizyty.',
      'Na miejscu serwisant diagnozuje usterkę i podaje ostateczną cenę przed rozpoczęciem pracy.',
      'Decydujesz, czy zlecasz naprawę. Bez ukrytych opłat.',
    ],
  },
  about: {
    title: 'O nas — serwis okien Liwserwis, Poznań',
    description:
      'Liwserwis (LIVANS sp. z o.o.) — serwis okien i drzwi w Poznaniu i Wielkopolsce. Autoryzowany serwis okuć Winkhaus, szkolenie FAKRO, gwarancja do 24 miesięcy.',
    h1: 'O firmie Liwserwis',
    lead: 'Jesteśmy serwisem okien i drzwi z Poznania. Naprawiamy, regulujemy i konserwujemy okna PCV i drewniane, drzwi balkonowe i tarasowe, rolety zewnętrzne oraz okna dachowe w całej Wielkopolsce.',
    crumb: 'O nas',
    companyTitle: 'Dane firmy',
  },
  contact: {
    title: 'Kontakt — serwis okien Poznań, tel. 453 506 360 | Liwserwis',
    description:
      'Zadzwoń: +48 453 506 360 (codziennie 8:00–20:00) lub napisz na WhatsApp. Serwis okien i drzwi w Poznaniu, Kaliszu, Pile, Lesznie, Gnieźnie i okolicach.',
    h1: 'Kontakt',
    lead: 'Najszybciej skontaktujesz się z nami telefonicznie. Możesz też wysłać zdjęcie okna przez WhatsApp — podamy orientacyjną cenę i termin.',
    crumb: 'Kontakt',
  },
  blog: {
    title: 'Porady — jak dbać o okna i drzwi PCV | Liwserwis',
    description:
      'Praktyczne porady serwisanta: usterki okien PCV, tryb zimowy i letni, regulacja i konserwacja okien.',
    h1: 'Porady o oknach',
    lead: 'Praktyczne wskazówki serwisanta — jak rozpoznać usterkę, co zrobić samemu i kiedy wezwać fachowca.',
    crumb: 'Porady',
  },
  privacy: {
    title: 'Polityka prywatności i plików cookies | Liwserwis',
    description: 'Zasady przetwarzania danych osobowych i wykorzystywania plików cookies na stronie Liwserwis.',
    h1: 'Polityka prywatności i plików cookies',
    crumb: 'Polityka prywatności',
    // TODO: zweryfikować z klientem przed publikacją (adres, NIP, narzędzia analityczne)
    blocks: [
      ['h2', '1. Administrator danych'],
      ['p', `Administratorem danych osobowych jest ${brand.legalName}, ${brand.street}, ${brand.postalCode} ${brand.city}, NIP ${brand.nip}, prowadząca serwis Liwserwis. Kontakt w sprawach danych osobowych: ${brand.email}.`],
      ['h2', '2. Jakie dane przetwarzamy i w jakim celu'],
      ['p', 'Przetwarzamy dane, które przekazujesz nam, kontaktując się telefonicznie, przez WhatsApp lub e-mail: imię, numer telefonu, adres e-mail, miejscowość oraz treść wiadomości. Dane wykorzystujemy wyłącznie, aby odpowiedzieć na zapytanie, przygotować wycenę i wykonać usługę.'],
      ['p', 'Formularz na stronie nie wysyła danych na nasz serwer — przygotowuje gotową wiadomość, którą sam wysyłasz przez WhatsApp lub swój program pocztowy. Do takiej wiadomości stosuje się także regulamin i polityka prywatności WhatsApp (Meta) lub Twojego dostawcy poczty.'],
      ['h2', '3. Podstawa prawna'],
      ['ul', [
        'art. 6 ust. 1 lit. b RODO — działania na Twoje żądanie przed zawarciem umowy oraz wykonanie umowy,',
        'art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes administratora, czyli prowadzenie korespondencji,',
        'art. 6 ust. 1 lit. c RODO — obowiązki prawne, np. podatkowe, gdy wystawiamy dokumenty sprzedaży.',
      ]],
      ['h2', '4. Okres przechowywania'],
      ['p', 'Dane z zapytań przechowujemy nie dłużej niż 12 miesięcy od ostatniego kontaktu, a w przypadku wykonania usługi — przez okres wymagany przepisami prawa i okres gwarancji.'],
      ['h2', '5. Odbiorcy danych'],
      ['p', 'Nie sprzedajemy ani nie udostępniamy Twoich danych innym podmiotom, z wyjątkiem dostawców usług niezbędnych do prowadzenia działalności (np. hosting strony, poczta e-mail, komunikator) oraz organów uprawnionych na podstawie przepisów prawa.'],
      ['h2', '6. Twoje prawa'],
      ['p', 'Masz prawo do dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu. Przysługuje Ci także skarga do Prezesa Urzędu Ochrony Danych Osobowych.'],
      ['h2', '7. Pliki cookies'],
      ['p', 'Strona używa wyłącznie niezbędnego zapisu w pamięci przeglądarki, który zapamiętuje Twój wybór w banerze cookies. Narzędzia analityczne i marketingowe (np. Google Analytics, Google Ads, Meta Pixel) mogą zostać uruchomione dopiero po wyrażeniu przez Ciebie zgody w banerze. Zgodę możesz w każdej chwili zmienić, klikając „Ustawienia cookies” w stopce strony.'],
      ['h2', '8. Zmiany polityki'],
      ['p', 'Polityka może się zmienić wraz z rozwojem strony lub zmianą przepisów. Aktualna wersja jest zawsze dostępna na tej stronie.'],
    ],
  },
  notFound: {
    title: 'Nie znaleziono strony (404) | Liwserwis',
    description: 'Strona nie istnieje lub została przeniesiona.',
    h1: 'Nie znaleziono strony',
    lead: 'Strona mogła zostać przeniesiona po zmianie wyglądu serwisu. Wybierz usługę poniżej lub zadzwoń — pomożemy.',
    crumb: '404',
  },
}
