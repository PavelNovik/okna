export default {
  name: 'Polski',
  label: 'PL',
  locale: 'pl_PL',

  meta: {
    title: 'Naprawa okien Poznań — regulacja i serwis okien PCV | Liwserwis',
    description:
      'Naprawa i regulacja okien PCV i drewnianych w Poznaniu i Wielkopolsce. Regulacja od 50 zł, uszczelki od 30 zł, gwarancja do 24 mies. Tel. 453 506 360.',
  },

  nav: {
    skip: 'Przejdź do treści',
    menu: 'Menu',
    close: 'Zamknij menu',
    lang: 'Język',
    cta: 'Zadzwoń',
    links: [
      ['/uslugi/', 'Usługi'],
      ['/cennik/', 'Cennik'],
      ['/#realizacje', 'Realizacje'],
      ['/o-nas/', 'O nas'],
      ['/porady/', 'Porady'],
      ['/kontakt/', 'Kontakt'],
    ],
    home: 'Strona główna',
    area: 'Poznań i Wielkopolska',
    crumbs: 'Ścieżka nawigacji',
  },

  bar: { call: 'Zadzwoń', wa: 'WhatsApp' },

  hero: {
    eyebrow: 'Serwis okien i drzwi · Poznań i Wielkopolska',
    title: ['Naprawa i regulacja ', 'okien i drzwi', ' w Poznaniu'],
    lead: 'Regulacja, wymiana uszczelek, okuć, zawiasów, klamek i szyb w oknach PCV i drewnianych. Większość usterek usuwamy podczas jednej wizyty — z gwarancją do 24 miesięcy.',
    price: 'Regulacja okna od 50 zł',
    primary: 'Zadzwoń',
    secondary: 'WhatsApp',
    hours: 'Codziennie 8:00–20:00',
    free: 'Bezpłatna wycena',
    freeText: 'Zapytaj 24/7 o cenę i termin',
    scroll: 'Przewiń — otwórz okno',
    place: 'Poznań · Wielkopolska',
    explore: 'Zobacz usługi',
    stages: ['Wnętrze', 'Okno otwarte', 'Widok na Poznań'],
    stageLabel: 'Poziom',
  },

  perks: [
    { icon: 'tools', title: 'Wszystkie naprawy', text: 'Okna i drzwi balkonowe dla klientów indywidualnych oraz firm.' },
    { icon: 'shield', title: 'Gwarancja jakości', text: 'Na wszystkie naprawy udzielamy aż do 24 miesięcy gwarancji.' },
    { icon: 'bolt', title: 'Szybka pomoc', text: 'Drobne problemy rozwiązujemy w dniu zgłoszenia lub w dogodnym terminie.' },
    { icon: 'van', title: 'Od ręki i na miejscu', text: 'Sami kupujemy i dowozimy potrzebne materiały i części.' },
  ],

  about: {
    eyebrow: 'O nas',
    title: 'Naprawiamy okna od ręki — w domu, biurze i na obiekcie',
    text: [
      'Pracujemy z różnymi markami i systemami profili. Większość awarii okien oraz drzwi balkonowych i tarasowych naprawiamy w dniu zgłoszenia.',
      'Specjalizujemy się w serwisie okien i drzwi w domach prywatnych, mieszkaniach, biurach, instytucjach i innych obiektach. Dbamy o każdego klienta: dotrzymujemy ustaleń i błyskawicznie rozwiązujemy problemy, aby współpraca była w pełni satysfakcjonująca.',
    ],
    stats: [
      { value: '24', unit: 'mies.', label: 'gwarancji' },
      { value: '5,0', unit: '★', label: 'w Google' },
      { value: '7/7', unit: '', label: 'dni w tygodniu' },
    ],
    winkhaus: 'Autoryzowany serwis okuć WINKHAUS',
    brandsTitle: 'Serwisujemy okna i okucia m.in. marek',
    more: 'Więcej o firmie',
  },

  process: {
    eyebrow: 'Jak działamy',
    title: 'Od telefonu do sprawnego okna',
    steps: [
      { title: 'Zgłoszenie', text: 'Dzwonisz lub wysyłasz zdjęcie okna przez WhatsApp. Podajemy orientacyjną cenę.' },
      { title: 'Termin', text: 'Umawiamy wizytę — zwykle w ciągu 24–48 godzin, także w weekend.' },
      { title: 'Diagnoza i cena', text: 'Serwisant sprawdza okna i podaje ostateczną cenę, zanim zacznie pracę.' },
      { title: 'Naprawa z gwarancją', text: 'Większość usterek usuwamy od razu, na miejscu. Na usługę dajemy do 24 miesięcy gwarancji.' },
    ],
  },

  services: {
    eyebrow: 'Usługi',
    title: 'Pełen serwis okien i drzwi',
    lead: 'PCV i drewno, okna rozwierne, uchylne, dachowe, drzwi balkonowe i tarasowe. Ceny orientacyjne — dokładną podajemy po diagnozie.',
    ask: 'Zapytaj o wycenę',
    more: 'Szczegóły i cennik',
    all: 'Pełny cennik',
    from: 'od',
    currency: 'zł',
    custom: 'wycena indywidualna',
    items: {
      adjust: {
        name: 'Regulacja okien i drzwi balkonowych',
        text: 'Problemy z otwieraniem i domykaniem, przeciągi, hałas, parowanie szyb i opadnięte skrzydła obniżają komfort i podnoszą koszty ogrzewania. Regulacja przywraca szczelność.',
      },
      glass: {
        name: 'Wymiana pakietu szybowego',
        text: 'Pęknięcia, utrata hermetyczności, parowanie między szybami, głębokie rysy lub chęć poprawy parametrów cieplnych — wymieniamy pakiet bez wymiany okna.',
      },
      hinge: {
        name: 'Wymiana zawiasów',
        text: 'Zawiasy to elementy nośne, które przenoszą ciężar skrzydła. Zużyte lub wyłamane wymieniamy w oknach i drzwiach balkonowych oraz tarasowych PCV.',
      },
      fittings: {
        name: 'Naprawa i wymiana okuć',
        text: 'Okucia obwiedniowe odpowiadają za otwieranie, uchylanie i ryglowanie. Naprawiamy i wymieniamy mechanizmy, także w oknach dwuskrzydłowych ze słupkiem ruchomym (sztulpowych).',
      },
      handle: {
        name: 'Wymiana klamek',
        text: 'Luzy, opór przy obracaniu, korozja czy wyblaknięcie to sygnał, że czas na nową klamkę. Dobierzemy i zamontujemy odpowiedni model.',
      },
      maintenance: {
        name: 'Konserwacja i przegląd okien',
        text: 'Smarowanie, czyszczenie i regulacja okuć, wymiana zużytych elementów. Planowy przegląd zapobiega większym awariom i wydłuża życie stolarki.',
      },
      seal: {
        name: 'Wymiana uszczelek',
        text: 'Twarde, popękane uszczelki to przeciągi, hałas i wilgoć. Nowa uszczelka przywraca szczelność okien i drzwi balkonowych.',
      },
      shutter: {
        name: 'Naprawa rolet zewnętrznych',
        text: 'Zacinające się lub opadające rolety naprawiamy na miejscu — skuteczna naprawa wydłuża ich żywotność i pozwala uniknąć kosztów wymiany.',
      },
      thermo: {
        name: 'Diagnostyka termowizyjna',
        text: 'Kamera termowizyjna i anemometr pokazują, gdzie okno traci ciepło i skąd wieje. Otrzymujesz raport z wynikami.',
      },
      roof: {
        name: 'Serwis okien dachowych',
        text: 'Okna dachowe są szczególnie narażone na pogodę, a ich serwis jest skomplikowany. Regulujemy, uszczelniamy i wymieniamy elementy okien VELUX, FAKRO i innych.',
      },
    },
  },

  cta: {
    title: 'Twojego problemu nie ma na liście?',
    text: 'Zadzwoń lub napisz — doradzimy i podamy cenę oraz termin.',
    btn: 'Napisz na WhatsApp',
  },

  diag: {
    eyebrow: 'Diagnostyka',
    title: 'Kamera termowizyjna i anemometr',
    lead: 'Nowoczesna diagnostyka pozwala szybko i rzetelnie ocenić szczelność okien i jakość izolacji.',
    items: [
      { icon: 'thermo', title: 'Kamera termowizyjna', text: 'Pokazuje miejsca utraty ciepła, ukryte nieszczelności i błędy montażowe — częste źródło przeciągów i chłodu w pomieszczeniach.' },
      { icon: 'wind', title: 'Anemometr', text: 'Mierzy rzeczywisty napływ zimnego powietrza przez szczeliny, uzupełniając badanie kamerą.' },
      { icon: 'doc', title: 'Raport i certyfikat', text: 'Na podstawie pomiarów przygotowujemy czytelny raport z wynikami — podstawę do dalszych prac lub poprawy energooszczędności budynku.' },
    ],
  },

  gallery: {
    eyebrow: 'Realizacje',
    title: 'Efekty naszej pracy',
    lead: 'Zdjęcia z naszych zleceń — kliknij, aby powiększyć.',
    close: 'Zamknij',
    prev: 'Poprzednie zdjęcie',
    next: 'Następne zdjęcie',
    items: {
      rej1: 'Wymiana pakietu szybowego',
      rej2: 'Wymiana mechanizmu sztulpowego',
      rej3: 'Wymiana części okucia',
      rej4: 'Diagnostyka termowizyjna',
      rej5: 'Serwis okna dachowego',
      rej6: 'Wymiana uszczelki',
      rej7: 'Wymiana zawiasu',
      rej8: 'Montaż samozamykacza',
      rej9: 'Wymiana klamki',
    },
  },

  reviews: {
    eyebrow: 'Opinie',
    title: 'Co mówią nasi klienci',
    lead: 'Być może masz podobny problem z oknami — chętnie poradzimy sobie z nim również u Ciebie.',
    google: 'Opinie w Google',
    count: 'opinii',
    cta: 'Zobacz opinie w Google',
    prev: 'Poprzednia opinia',
    next: 'Następna opinia',
    note: '',
    items: [
      {
        name: 'Sylwia',
        text: 'Z całego serca polecam! Trafiłam na Panów przez aplikację Fixly i to był strzał w dziesiątkę. Naprawili bardzo poważną usterkę — wyłamany zawias w podwójnych drzwiach balkonowych. Pracowali błyskawicznie i cicho.',
      },
      {
        name: 'Paulina',
        text: 'Zamówiłam serwis naprawy okien w tej firmie i jestem bardzo zadowolona! Fachowiec przyjechał na czas, wymienił uszczelkę, a po skończonej pracy zostawił porządek. Punktualność, szybkość i czystość — bardzo polecam!',
      },
      {
        name: 'Grzegorz',
        text: 'Zlecenie serwisu okna wykonane solidnie. Panowie znają się na swojej pracy. U mnie zlecenie na pewno nie będzie ostatnim. Firma godna polecenia z czystym sercem.',
      },
    ],
  },

  certs: {
    eyebrow: 'Certyfikaty',
    title: 'Potwierdzone kwalifikacje',
    lead: 'Szkolenia producentów okuć i okien — kliknij, aby zobaczyć dokument.',
    items: [
      { title: 'Autoryzowany serwis WINKHAUS', text: 'Świadectwo dla LIVANS sp. z o.o. LIWSERWIS — okucia autoPilot, activPilot, duoPort, proPilot' },
      { title: 'Szkolenie techniczne Winkhaus', text: 'Dobór, regulacja i konserwacja okuć' },
      { title: 'Certyfikat FAKRO', text: 'Szkolenie z okien dachowych' },
      { title: 'Certyfikat eksperta KRISHOME', text: 'Serwis bram przemysłowych i automatyki' },
    ],
  },

  blog: {
    eyebrow: 'Warto wiedzieć',
    title: 'Porady o oknach',
    lead: 'Praktyczne wskazówki dla większego komfortu w domu.',
    more: 'Czytaj poradę',
    all: 'Wszystkie porady',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Najczęstsze pytania',
    items: [
      {
        q: 'Na jakim terenie działacie?',
        a: 'W Poznaniu i na terenie całej Wielkopolski — m.in. w Kaliszu, Pile, Lesznie, Gnieźnie i okolicznych miejscowościach.',
      },
      {
        q: 'Ile kosztuje dojazd i wycena?',
        a: 'Diagnoza i wycena na miejscu są bezpłatne. Jeśli wycena Ci nie odpowiada, nie płacisz za dojazd ani za diagnozę. Orientacyjne ceny usług znajdziesz w cenniku.',
      },
      {
        q: 'Jak szybko przyjedziecie?',
        a: 'Zwykle umawiamy wizytę w ciągu 24–48 godzin. Większość usterek usuwamy podczas jednej wizyty.',
      },
      {
        q: 'Czy pracujecie w weekendy?',
        a: 'Tak, pracujemy codziennie od 8:00 do 20:00, także w soboty i niedziele.',
      },
      {
        q: 'Ile trwa naprawa okna?',
        a: 'Proste usterki, takie jak regulacja okuć, wymiana uszczelki czy smarowanie mechanizmów, zajmują zwykle od 30 minut do 2 godzin.',
      },
      {
        q: 'Czy dajecie gwarancję?',
        a: 'Tak, na wykonaną usługę udzielamy gwarancji do 24 miesięcy.',
      },
      {
        q: 'Czy naprawiacie okna drewniane i dachowe?',
        a: 'Tak. Serwisujemy okna i drzwi PCV oraz drewniane, okna dachowe (m.in. VELUX, FAKRO) i rolety zewnętrzne.',
      },
      {
        q: 'Czy muszę sam kupić części?',
        a: 'Nie. Sami dobieramy, kupujemy i dowozimy potrzebne okucia, zawiasy, klamki, uszczelki i pakiety szybowe.',
      },
    ],
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Szybka naprawa okien — zadzwoń lub napisz',
    lead: 'Opisz problem, a najlepiej dołącz zdjęcie przez WhatsApp. Oddzwonimy i doradzimy.',
    phone: 'Telefon',
    wa: 'WhatsApp',
    email: 'E-mail',
    hours: 'Godziny pracy',
    hoursValue: 'Codziennie 8:00–20:00',
    area: 'Działamy na terenie Wielkopolski',
    areaMore: 'i inne miejscowości',
    social: 'Jesteśmy też tutaj',
    form: {
      name: 'Imię',
      phone: 'Telefon',
      service: 'Usługa',
      place: 'Miejscowość',
      message: 'Wiadomość',
      choose: 'Wybierz…',
      other: 'Inne',
      placeholders: {
        name: 'Anna',
        phone: '+48 …',
        place: 'np. Poznań',
        message: 'Co się dzieje z oknem lub drzwiami? Ile sztuk, PCV czy drewno, jaki termin…',
      },
      sendWa: 'Wyślij przez WhatsApp',
      sendMail: 'Wyślij e-mailem',
      note: 'Formularz nie zapisuje danych na serwerze — otworzy się WhatsApp lub program pocztowy z gotową wiadomością.',
      subject: 'Zapytanie ze strony — Liwserwis',
      hello: 'Dzień dobry! Zapytanie ze strony Liwserwis:',
    },
  },

  footer: {
    tagline: 'Naprawa, regulacja i serwis okien oraz drzwi PCV i drewnianych w Wielkopolsce.',
    rights: 'Wszelkie prawa zastrzeżone.',
    cookies: 'Ustawienia cookies',
    photos: 'Zdjęcie tła: Unsplash',
    top: 'Do góry',
    services: 'Usługi',
    company: 'Firma',
    contact: 'Kontakt',
    privacy: 'Polityka prywatności',
  },

  wa: { label: 'Napisz na WhatsApp', hello: 'Dzień dobry! Mam pytanie w sprawie naprawy okna: ' },

  cookies: {
    title: 'Pliki cookies',
    text: 'Używamy niezbędnych plików cookies, aby strona działała, i — za Twoją zgodą — analitycznych, by ją ulepszać.',
    acceptAll: 'Akceptuj wszystkie',
    rejectAll: 'Tylko niezbędne',
    settings: 'Ustawienia',
    dialogTitle: 'Ustawienia cookies',
    save: 'Zapisz wybór',
    close: 'Zamknij',
    always: 'Zawsze aktywne',
    categories: {
      necessary: { title: 'Niezbędne', text: 'Zapamiętują język strony i Twój wybór cookies.' },
      analytics: { title: 'Analityczne', text: 'Anonimowe statystyki odwiedzin.' },
      marketing: { title: 'Marketingowe', text: 'Dopasowanie reklam w mediach społecznościowych.' },
    },
  },
}
