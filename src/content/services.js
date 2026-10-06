// Страницы услуг (только PL). Тексты — со страниц liwserwis.com/service/…, исправлены и дополнены
// уникальными FAQ вместо одного общего блока, повторявшегося на всех страницах.
// Цены — «от», как в «Orientacyjny cennik» на оригинальном сайте (октябрь 2026).
// id = иконка в Icon.jsx и фото public/images/<img>.webp; old — старый URL (301 в vercel.json).

export const services = [
  {
    id: 'adjust',
    slug: 'regulacja-okien',
    old: '/service/regulacja-okien-i-drzwi-balkolnowych/',
    img: 'adjust',
    photos: ['rej3', 'rej7'],
    from: 50,
    name: 'Regulacja okien i drzwi balkonowych',
    short: 'Okno ciężko się otwiera, nie domyka się, ociera o ramę lub ciągnie od niego zimno — w większości przypadków wystarczy regulacja.',
    title: 'Regulacja okien Poznań — od 50 zł | Liwserwis',
    description:
      'Regulacja okien PCV i drzwi balkonowych w Poznaniu i Wielkopolsce: opadnięte skrzydło, przeciągi, tryb zimowy i letni. Od 50 zł za okno, gwarancja do 24 miesięcy.',
    h1: 'Regulacja okien i drzwi balkonowych w Poznaniu',
    lead: 'Przywracamy prawidłowe domykanie, docisk i szczelność okien PCV i drewnianych — zwykle podczas jednej wizyty, bez wymiany okna.',
    signs: [
      'skrzydło opadło, ociera o ramę lub trudno je domknąć,',
      'czuć przeciąg lub chłód przy zamkniętym oknie,',
      'klamka obraca się z oporem, skrzypi lub ma luz,',
      'okno nie przełącza się płynnie w tryb uchylny,',
      'budynek osiadł albo okna regulowano ostatnio dawno temu lub nigdy,',
      'po remoncie skrzydło pracuje inaczej niż wcześniej.',
    ],
    causes:
      'Budynki osiadają, materiały pracują pod wpływem temperatury, a mechanizmy zużywają się przy codziennym użytkowaniu. Kurz i brak smarowania zwiększają tarcie, a ciężkie zasłony czy trzaskanie skrzydłem dodatkowo obciążają zawiasy.',
    steps: [
      ['Diagnoza', 'sprawdzamy zawiasy, okucia, docisk i uszczelki we wszystkich zgłoszonych oknach.'],
      ['Regulacja zawiasów', 'ustawiamy skrzydło w pionie i poziomie, aby równo przylegało do ramy.'],
      ['Regulacja docisku', 'ustawiamy rolki ryglujące (mimośrody) — tryb zimowy lub letni.'],
      ['Klamka i mechanizm', 'usuwamy luzy, skrzypienie i opór przy obracaniu klamki.'],
      ['Czyszczenie i smarowanie', 'usuwamy brud i stary smar, nakładamy specjalistyczny środek do okuć.'],
      ['Test szczelności', 'sprawdzamy domykanie i brak przeciągów, doradzamy, jak dbać o okna.'],
    ],
    note: 'W większości przypadków dobrze wykonana regulacja w zupełności wystarcza — nie trzeba wymieniać całego okna.',
    prices: [
      ['Regulacja jednego okna', 'od 50 zł'],
      ['Regulacja drzwi balkonowych', 'od 110 zł'],
      ['Regulacja kilku okien', 'wycena indywidualna'],
    ],
    faq: [
      [
        'Ile trwa regulacja okna?',
        'Zwykle od 30 do 90 minut na okno, w zależności od stanu okuć. Kilka okien regulujemy podczas jednej wizyty.',
      ],
      [
        'Czy regulacja pomoże, gdy okno ciężko się otwiera?',
        'Tak, to jeden z najczęstszych problemów. Najczęściej wystarczy regulacja zawiasów i docisku, wyczyszczenie i nasmarowanie mechanizmu, a w razie potrzeby wymiana zużytej uszczelki.',
      ],
      [
        'Jak często regulować okna?',
        'Przegląd i regulację warto wykonywać co najmniej raz w roku, najlepiej jesienią przed sezonem grzewczym. Przy intensywnym użytkowaniu — wiosną i jesienią.',
      ],
      [
        'Czym różni się tryb zimowy od letniego?',
        'W trybie zimowym skrzydło jest mocniej dociśnięte do ramy, co ogranicza przeciągi. W trybie letnim docisk jest słabszy, co chroni uszczelki przed nadmiernym zużyciem.',
      ],
    ],
    related: ['seal', 'fittings', 'maintenance'],
  },
  {
    id: 'seal',
    slug: 'wymiana-uszczelek',
    old: '/service/wymiana-uszczelek-okiennych-i-drzwi-balkonowych/',
    img: 'seal',
    photos: ['rej6'],
    from: 30,
    name: 'Wymiana uszczelek w oknach i drzwiach balkonowych',
    short: 'Twarde, popękane uszczelki to przeciągi, hałas, wilgoć i wyższe rachunki za ogrzewanie.',
    title: 'Wymiana uszczelek okiennych Poznań — od 30 zł | Liwserwis',
    description:
      'Wymiana uszczelek w oknach PCV i drzwiach balkonowych w Poznaniu i Wielkopolsce. Koniec z przeciągami i hałasem. Od 30 zł, bezpłatna wycena, gwarancja do 24 miesięcy.',
    h1: 'Wymiana uszczelek w oknach i drzwiach balkonowych',
    lead: 'Nowa uszczelka przywraca szczelność, izolację cieplną i akustyczną okna — bez wymiany skrzydła czy całego okna.',
    signs: [
      'uszczelka jest twarda, krucha lub popękana i nie wraca do kształtu po naciśnięciu,',
      'przy zamkniętym oknie czuć napływ zimnego powietrza,',
      'podczas deszczu woda dostaje się do środka,',
      'szyby parują od strony pomieszczenia,',
      'z zewnątrz słychać więcej hałasu niż kiedyś,',
      'przy uszczelkach pojawia się pleśń, wilgoć lub trwałe zabrudzenia.',
    ],
    causes:
      'Uszczelki z czasem tracą elastyczność pod wpływem słońca, mrozu i stałego docisku. Zużyta uszczelka to realne straty ciepła i wyższe rachunki za energię.',
    steps: [
      ['Diagnoza', 'sprawdzamy stan uszczelek oraz docisk skrzydła — czasem wystarczy regulacja.'],
      ['Dobór uszczelki', 'dobieramy profil uszczelki do systemu okna (PCV lub drewno).'],
      ['Demontaż starej uszczelki', 'usuwamy zużytą uszczelkę z rowka ramy i skrzydła.'],
      ['Czyszczenie rowka', 'oczyszczamy rowek z brudu i resztek starej uszczelki.'],
      ['Montaż nowej uszczelki', 'wciskamy nową uszczelkę na całym obwodzie, dbając o narożniki.'],
      ['Regulacja i test', 'dopasowujemy docisk skrzydła i sprawdzamy brak przeciągów.'],
    ],
    note: 'Po wymianie okno odzyskuje szczelność oraz izolację termiczną i akustyczną, a jego użytkowanie znów jest komfortowe.',
    prices: [
      ['Wymiana uszczelki okiennej', 'od 30 zł'],
      ['Wymiana uszczelki w drzwiach balkonowych', 'od 30 zł'],
    ],
    faq: [
      [
        'Skąd wiadomo, że uszczelkę trzeba wymienić, a nie tylko wyregulować okno?',
        'Jeśli uszczelka jest twarda, popękana lub trwale odkształcona, regulacja nie pomoże. Jeśli jest elastyczna, a mimo to wieje — zwykle wystarczy zwiększyć docisk skrzydła.',
      ],
      [
        'Czy wymieniacie uszczelki w oknach drewnianych?',
        'Tak, serwisujemy okna PCV i drewniane. Profil uszczelki dobieramy do konkretnego okna.',
      ],
      [
        'Jak dbać o uszczelki, żeby dłużej służyły?',
        'Raz lub dwa razy w roku warto je umyć i zabezpieczyć preparatem silikonowym, a latem przestawić okna w tryb letni, aby zmniejszyć docisk.',
      ],
    ],
    related: ['adjust', 'maintenance', 'thermo'],
  },
  {
    id: 'glass',
    slug: 'wymiana-szyby-zespolonej',
    old: '/service/wymiana-pakietu-szybowegow-oknie/',
    img: 'glass',
    photos: ['rej1'],
    from: 500,
    name: 'Wymiana szyby zespolonej (pakietu szybowego)',
    short: 'Pęknięta, zaparowana od środka lub porysowana szyba — wymieniamy sam pakiet, rama zostaje na miejscu.',
    title: 'Wymiana szyby w oknie (pakietu szybowego) Poznań | Liwserwis',
    description:
      'Wymiana szyby zespolonej w oknach PCV i drewnianych w Poznaniu i Wielkopolsce: pęknięta lub zaparowana szyba, lepsza izolacja. Od 500 zł, bez wymiany ramy.',
    h1: 'Wymiana szyby zespolonej w oknie',
    lead: 'Wymieniamy pakiet szybowy w oknach PCV, drewnianych i aluminiowych. Rama zostaje na miejscu, dlatego to szybsze i tańsze niż wymiana całego okna.',
    signs: [
      'szyba jest pęknięta, głęboko porysowana lub ma wady szkła,',
      'między szybami pojawiło się zaparowanie lub wilgoć,',
      'pakiet po wielu latach stracił właściwości izolacyjne (np. ulotnił się gaz),',
      'chcesz cieplejszy, dźwiękochłonny, antywłamaniowy lub przeciwsłoneczny pakiet,',
      'przy oknie wyraźnie czuć chłód mimo sprawnych okuć i uszczelek.',
    ],
    causes:
      'Pakiet szybowy to hermetyczna konstrukcja z dwóch lub więcej szyb wypełniona gazem (np. argonem lub kryptonem). Odpowiada za izolację cieplną i akustyczną — gdy traci szczelność, okno przestaje spełniać swoją funkcję.',
    steps: [
      ['Pomiar i diagnoza', 'oceniamy stan okna i dokładnie mierzymy pakiet.'],
      ['Zamówienie pakietu', 'zamawiamy identyczny lub lepszy pakiet — czas realizacji 3–14 dni, zależnie od typu.'],
      ['Demontaż', 'zdejmujemy listwy przyszybowe i ostrożnie wyjmujemy uszkodzony pakiet.'],
      ['Montaż', 'czyścimy wręb, układamy podkładki dystansowe i osadzamy nowy pakiet.'],
      ['Listwy i regulacja', 'zakładamy listwy przyszybowe i regulujemy skrzydło, aby prawidłowo się domykało.'],
      ['Kontrola', 'sprawdzamy szczelność i działanie, usuwamy folie i czyścimy szybę.'],
    ],
    note: 'Sam montaż nowego pakietu trwa zwykle 20–60 minut na okno.',
    prices: [['Wymiana pakietu szybowego w oknie', 'od 500 zł']],
    faq: [
      [
        'Czy można wymienić samą szybę bez wymiany okna?',
        'Tak. Wymieniamy tylko pakiet szybowy, a rama i skrzydło zostają na miejscu.',
      ],
      [
        'Ile czeka się na nową szybę?',
        'Pakiet szybowy wykonywany jest na wymiar — zwykle od 3 do 14 dni, zależnie od typu. Sam montaż trwa około godziny.',
      ],
      [
        'Szyba paruje od środka — czy to wina szyby?',
        'Jeśli wilgoć jest między szybami, pakiet stracił szczelność i trzeba go wymienić. Jeśli szyba paruje od strony pokoju, przyczyną jest zwykle wilgotność i wentylacja, a nie sama szyba.',
      ],
    ],
    related: ['adjust', 'seal', 'thermo'],
  },
  {
    id: 'fittings',
    slug: 'naprawa-okuc',
    old: '/service/naprawa-i-wymiana-okuc-w-oknach-i-drzwiach-pcv/',
    img: 'fittings',
    photos: ['rej3', 'rej2'],
    from: 50,
    name: 'Naprawa i wymiana okuć',
    short: 'Okno nie uchyla się, klamka się blokuje, rygle nie trzymają — naprawiamy lub wymieniamy mechanizm okucia.',
    title: 'Naprawa okuć okiennych Poznań — Winkhaus, Roto, Maco | Liwserwis',
    description:
      'Naprawa i wymiana okuć w oknach i drzwiach PCV w Poznaniu i Wielkopolsce: nożyce, rygle, zasuwnice, mechanizmy sztulpowe. Autoryzowany serwis okuć Winkhaus. Od 50 zł.',
    h1: 'Naprawa i wymiana okuć w oknach i drzwiach PCV',
    lead: 'Okucia obwiedniowe odpowiadają za otwieranie, uchylanie i ryglowanie okna. Naprawiamy je i wymieniamy — często wystarczy wymiana jednego elementu zamiast całego mechanizmu.',
    signs: [
      'okno nie przechodzi w tryb uchylny lub „wypada” z zawiasu przy uchylaniu,',
      'klamka się blokuje albo nie da się jej obrócić do końca,',
      'słychać trzaski i zgrzyty, wyczuwalne są luzy,',
      'okno nie domyka się szczelnie mimo regulacji,',
      'widoczne są uszkodzenia, korozja lub pęknięte elementy,',
      'chcesz zwiększyć bezpieczeństwo (okucia antywłamaniowe).',
    ],
    causes:
      'Okucia pracują przy każdym otwarciu okna. Po latach intensywnego użytkowania, przy braku smarowania lub po gwałtownym zatrzaśnięciu skrzydła ich elementy zużywają się lub pękają.',
    steps: [
      ['Diagnoza', 'zdejmujemy osłony i sprawdzamy cały mechanizm obwiedniowy.'],
      ['Dobór części', 'dobieramy oryginalne lub kompatybilne elementy (nożyce, rygle, zasuwnice, narożniki) do systemu okuć.'],
      ['Demontaż', 'usuwamy uszkodzone elementy — w razie potrzeby na całym obwodzie skrzydła.'],
      ['Montaż', 'montujemy nowe części i dopasowujemy długość zasuwnicy.'],
      ['Regulacja', 'ustawiamy docisk, położenie skrzydła, funkcję uchylną i mikrowentylację.'],
      ['Testy', 'sprawdzamy otwieranie, uchylanie, ryglowanie i szczelność.'],
    ],
    note: 'Jesteśmy autoryzowanym serwisem okuć WINKHAUS (systemy autoPilot, activPilot, duoPort, proPilot). Serwisujemy też okucia Roto, Maco, Siegenia i inne.',
    prices: [['Naprawa lub wymiana elementów okucia', 'od 50 zł']],
    faq: [
      [
        'Czy trzeba wymieniać całe okucie?',
        'Zwykle nie. W wielu przypadkach wystarczy wymiana jednego lub dwóch elementów, co jest znacznie tańsze niż wymiana całego mechanizmu.',
      ],
      [
        'Ile trwa naprawa okucia?',
        'Od 30 do 120 minut na skrzydło, zależnie od zakresu prac i typu okucia. Potrzebne części dobieramy i dowozimy sami.',
      ],
      [
        'Okno wypadło z zawiasu przy uchylaniu — co robić?',
        'Nie zamykaj go na siłę. Podtrzymaj skrzydło, ustaw klamkę w pozycji „otwarte” i spróbuj ostrożnie wsunąć skrzydło w górny zawias. Jeśli się nie da — zadzwoń, to typowa usterka nożyc okucia.',
      ],
    ],
    related: ['hinge', 'handle', 'adjust'],
  },
  {
    id: 'hinge',
    slug: 'wymiana-zawiasow',
    old: '/service/wymiana-zawiasow-w-oknach-i-drzwiach-pcv/',
    img: 'hinge',
    photos: ['rej7'],
    from: 250,
    name: 'Wymiana zawiasów w oknach i drzwiach',
    short: 'Wyłamany, pęknięty lub luźny zawias — wymieniamy go w oknach i drzwiach balkonowych oraz tarasowych PCV.',
    title: 'Wymiana zawiasów w oknach PCV Poznań | Liwserwis',
    description:
      'Wymiana zawiasów w oknach oraz drzwiach balkonowych i tarasowych PCV w Poznaniu i Wielkopolsce: wyłamany zawias, opadające skrzydło, zawiasy wzmocnione. Od 250 zł.',
    h1: 'Wymiana zawiasów w oknach i drzwiach PCV',
    lead: 'Zawiasy przenoszą cały ciężar skrzydła. Wymieniamy zużyte i uszkodzone zawiasy — także na wzmocnione do ciężkich drzwi tarasowych.',
    signs: [
      'zawias jest pęknięty, wygięty lub wyrwany (np. po zatrzaśnięciu skrzydła przez przeciąg),',
      'skrzydło opada, ociera o ramę i regulacja już nie pomaga,',
      'zawiasy skrzypią lub stawiają opór,',
      'skrzydło zostało obciążone cięższym pakietem szybowym,',
      'zawiasy są skorodowane lub zużyte po wielu latach.',
    ],
    causes:
      'Osiadanie budynku, przeciążenie skrzydła i trzaskanie nim powodują deformację zawiasów. Po 10–20 latach zużywają się też sworznie i tuleje.',
    steps: [
      ['Diagnoza', 'oceniamy stan zawiasów, typ okucia i ciężar skrzydła.'],
      ['Dobór zawiasów', 'dobieramy identyczne lub wzmocnione zawiasy o odpowiedniej nośności.'],
      ['Zdjęcie skrzydła', 'podpieramy skrzydło, odkręcamy stare zawiasy i zdejmujemy skrzydło.'],
      ['Montaż', 'montujemy nowe zawiasy, w razie potrzeby wykonując nowe otwory montażowe.'],
      ['Regulacja', 'zawieszamy skrzydło i ustawiamy je w pionie, poziomie i docisku.'],
      ['Testy', 'sprawdzamy otwieranie, uchylanie, szczelność i brak opadania skrzydła.'],
    ],
    note: 'Aby obciążenie rozkładało się równomiernie, zalecamy wymianę wszystkich zawiasów na danym skrzydle jednocześnie. Wymiana jednego skrzydła trwa zwykle 30–90 minut.',
    prices: [['Wymiana zawiasów (z demontażem i regulacją)', 'od 250 zł']],
    faq: [
      [
        'Czy wyłamany zawias w drzwiach balkonowych da się naprawić?',
        'Tak, wymieniamy uszkodzony zawias i regulujemy skrzydło. To jedna z częstszych usterek po zatrzaśnięciu drzwi przez przeciąg.',
      ],
      [
        'Czy trzeba wymieniać wszystkie zawiasy?',
        'Zalecamy wymianę wszystkich zawiasów na danym skrzydle, aby obciążenie rozkładało się równomiernie, ale zawsze decyzja należy do Ciebie.',
      ],
      [
        'Ile trwa wymiana zawiasów?',
        'Zwykle od 30 do 90 minut na jedno skrzydło, zależnie od typu i liczby zawiasów.',
      ],
    ],
    related: ['fittings', 'adjust', 'handle'],
  },
  {
    id: 'handle',
    slug: 'wymiana-klamek',
    old: '/service/wymiana-klamek-w-oknach-i-drzwiach-pcv/',
    img: 'handle',
    photos: ['rej9'],
    from: 75,
    name: 'Wymiana klamek okiennych',
    short: 'Luźna, zacinająca się lub uszkodzona klamka — wymieniamy ją w kilkanaście minut, także na model z kluczykiem.',
    title: 'Wymiana klamki w oknie Poznań — od 75 zł | Liwserwis',
    description:
      'Wymiana klamek w oknach oraz drzwiach balkonowych i tarasowych w Poznaniu i Wielkopolsce: klamki z kluczykiem, z przyciskiem, w różnych kolorach. Od 75 zł.',
    h1: 'Wymiana klamek w oknach i drzwiach balkonowych',
    lead: 'Klamka to najczęściej używany element okna. Wymieniamy zużyte i uszkodzone klamki w oknach PCV, drewnianych i aluminiowych — także na modele z kluczykiem dla bezpieczeństwa dzieci.',
    signs: [
      'klamka ma luz, obraca się z trudem lub skrzypi,',
      'nie blokuje się w pozycji uchylnej albo nie wraca do pozycji wyjściowej,',
      'jest pęknięta lub uszkodzona,',
      'jest skorodowana lub wyblakła od słońca,',
      'po wymianie okuć stara klamka nie pasuje do mechanizmu,',
      'chcesz klamkę z kluczykiem lub przyciskiem albo w innym kolorze.',
    ],
    causes:
      'Klamki w oknach, drzwiach balkonowych i tarasowych zużywają się szybciej niż pozostałe okucia, bo używamy ich codziennie — często z nadmierną siłą.',
    steps: [
      ['Diagnoza', 'sprawdzamy klamkę, trzpień i mechanizm okucia.'],
      ['Dobór klamki', 'dobieramy model o właściwej długości trzpienia, rozstawie śrub i kolorze.'],
      ['Demontaż', 'odkręcamy starą klamkę spod osłony.'],
      ['Montaż', 'zakładamy nową klamkę, przykręcamy i ustawiamy w prawidłowej pozycji.'],
      ['Test', 'sprawdzamy płynność obrotu, blokadę pozycji i działanie kluczyka.'],
    ],
    note: 'Wymiana jednej klamki trwa zwykle 10–30 minut i nie wymaga demontażu skrzydła.',
    prices: [['Wymiana klamki (z demontażem starej)', 'od 75 zł']],
    faq: [
      [
        'Czy klamka z kluczykiem pasuje do każdego okna?',
        'Do większości okien PCV tak. Na miejscu sprawdzamy długość trzpienia i rozstaw śrub, aby dobrać właściwy model.',
      ],
      [
        'Klamka się kręci, ale okno się nie otwiera — to wina klamki?',
        'Nie zawsze. Często przyczyną jest blokada w okuciu lub opadnięte skrzydło. Na miejscu sprawdzamy cały mechanizm.',
      ],
      [
        'Ile trwa wymiana klamki?',
        'Zwykle 10–30 minut na jedną klamkę.',
      ],
    ],
    related: ['fittings', 'adjust', 'hinge'],
  },
  {
    id: 'maintenance',
    slug: 'konserwacja-okien',
    old: '/service/konserwacja-i-planowy-przeglad-okien-i-drzwi-pcv/',
    img: 'maintenance',
    photos: ['rej3'],
    from: 50,
    name: 'Konserwacja i przegląd okien',
    short: 'Czyszczenie, smarowanie i regulacja okuć raz w roku zapobiega większym awariom i wydłuża życie okien.',
    title: 'Konserwacja i przegląd okien PCV Poznań — od 50 zł | Liwserwis',
    description:
      'Konserwacja i planowy przegląd okien oraz drzwi PCV w Poznaniu i Wielkopolsce: czyszczenie i smarowanie okuć, regulacja, kontrola uszczelek. Od 50 zł za okno.',
    h1: 'Konserwacja i przegląd okien i drzwi PCV',
    lead: 'Planowy przegląd zapobiega nagłym awariom, ogranicza koszty napraw i pomaga zachować warunki gwarancji producenta okien.',
    signs: [
      'okna nie były serwisowane od 1–2 lat,',
      'zbliża się sezon grzewczy,',
      'mieszkasz w nowym budynku po pierwszym roku użytkowania,',
      'zakończył się remont (pył i zabrudzenia w okuciach),',
      'pojawiają się pierwsze oznaki nieprawidłowej pracy okna,',
      'chcesz zachować warunki gwarancji producenta.',
    ],
    causes:
      'Kurz, brak smarowania i zmiany temperatur sprawiają, że okucia pracują z coraz większym oporem, a uszczelki tracą elastyczność.',
    steps: [
      ['Ocena stanu', 'sprawdzamy działanie wszystkich okien i drzwi.'],
      ['Czyszczenie', 'usuwamy brud i osady z okuć, rowków i odwodnień.'],
      ['Smarowanie', 'zabezpieczamy okucia specjalistycznym środkiem, a uszczelki — preparatem silikonowym.'],
      ['Regulacja', 'korygujemy ustawienie skrzydeł i docisk.'],
      ['Test i zalecenia', 'sprawdzamy szczelność i płynność pracy, przekazujemy zalecenia i potwierdzenie wykonania usługi.'],
    ],
    note: 'Po serwisie okna pracują płynnie i cicho, a ryzyko kosztownych usterek wyraźnie maleje.',
    prices: [['Czyszczenie i konserwacja okuć (za okno)', 'od 50 zł']],
    faq: [
      [
        'Jak często robić przegląd okien?',
        'Co najmniej raz w roku, najlepiej jesienią. Przy intensywnym użytkowaniu warto dwa razy w roku — wiosną i jesienią.',
      ],
      [
        'Czy przegląd jest potrzebny, jeśli okna działają dobrze?',
        'Tak, przegląd jest profilaktyką: drobne korekty i smarowanie kosztują mniej niż późniejsza wymiana zużytych okuć.',
      ],
      [
        'Czy obsługujecie biura i firmy?',
        'Tak, wykonujemy przeglądy dla klientów indywidualnych, firm i instytucji. Przy większej liczbie okien przygotowujemy wycenę indywidualną.',
      ],
    ],
    related: ['adjust', 'seal', 'fittings'],
  },
  {
    id: 'shutter',
    slug: 'naprawa-rolet-zewnetrznych',
    old: '/service/naprawa-rolet-zewnetrznych/',
    img: 'shutter',
    photos: [],
    from: 200,
    name: 'Naprawa rolet zewnętrznych',
    short: 'Roleta się zacina, opada lub nie reaguje na pilota — naprawiamy rolety ręczne i elektryczne.',
    title: 'Naprawa rolet zewnętrznych Poznań — od 200 zł | Liwserwis',
    description:
      'Naprawa rolet zewnętrznych ręcznych i elektrycznych w Poznaniu i Wielkopolsce: zerwana taśma, uszkodzony pancerz, sprężyna, silnik. Od 200 zł.',
    h1: 'Naprawa rolet zewnętrznych',
    lead: 'Naprawiamy rolety zewnętrzne ręczne i elektryczne — skuteczna naprawa wydłuża ich żywotność i pozwala uniknąć kosztów wymiany na nowe.',
    signs: [
      'roleta trudno się podnosi lub opuszcza albo zatrzymuje w połowie,',
      'lamele pancerza są pęknięte, wygięte lub wypadły z prowadnic,',
      'podczas pracy słychać skrzypienie, trzaski lub zgrzyty,',
      'roleta sama opada lub nie trzyma pozycji,',
      'taśma jest przetarta lub zerwana, zwijacz nie działa,',
      'roleta elektryczna nie reaguje na pilota, przycisk lub aplikację.',
    ],
    causes:
      'Roleta składa się z pancerza, skrzynki, prowadnic, wału oraz napędu ręcznego lub elektrycznego. Po 10–15 latach elementy te naturalnie się zużywają, a woda i brud w skrzynce przyspieszają awarie.',
    steps: [
      ['Diagnoza', 'otwieramy skrzynkę i sprawdzamy pancerz, wał, prowadnice i napęd.'],
      ['Czyszczenie', 'usuwamy brud, liście i stary smar z wału, prowadnic i skrzynki.'],
      ['Wymiana części', 'wymieniamy taśmę, zwijacz, lamele, łożyska lub sprężynę.'],
      ['Napęd elektryczny', 'naprawiamy lub wymieniamy sterowanie, programujemy piloty.'],
      ['Regulacja', 'wyrównujemy pancerz i prowadnice, aby roleta pracowała płynnie.'],
      ['Testy', 'wielokrotnie podnosimy i opuszczamy roletę, sprawdzając pracę i szczelność skrzynki.'],
    ],
    note: 'Po naprawie roleta działa płynnie, cicho i bezpiecznie. Regularna konserwacja zapobiega poważnym awariom.',
    prices: [['Wymiana i regeneracja niesprawnych elementów rolety', 'od 200 zł']],
    faq: [
      [
        'Czy naprawiacie rolety elektryczne?',
        'Tak. Diagnozujemy napęd i sterowanie, wymieniamy uszkodzone elementy i programujemy piloty.',
      ],
      [
        'Zerwała się taśma rolety — czy to duża naprawa?',
        'Nie, to jedna z najprostszych napraw. Wymieniamy taśmę, a w razie potrzeby także zwijacz.',
      ],
      [
        'Opłaca się naprawiać starą roletę?',
        'Zwykle tak — wymiana taśmy, lamel czy sprężyny kosztuje ułamek ceny nowej rolety. Na miejscu powiemy, czy naprawa ma sens.',
      ],
    ],
    related: ['maintenance', 'adjust', 'roof'],
  },
  {
    id: 'roof',
    slug: 'serwis-okien-dachowych',
    old: '/service/serwis-okien-dachowych/',
    img: 'roof',
    photos: ['rej5'],
    from: 200,
    name: 'Serwis okien dachowych',
    short: 'Okna dachowe VELUX, FAKRO i inne: regulacja, uszczelnienie, wymiana zużytych części.',
    title: 'Serwis okien dachowych VELUX, FAKRO — Poznań | Liwserwis',
    description:
      'Serwis i naprawa okien dachowych VELUX, FAKRO i innych w Poznaniu i Wielkopolsce: nieszczelność, zaparowanie, uszkodzone okucia. Szkolenie FAKRO. Od 200 zł.',
    h1: 'Serwis okien dachowych',
    lead: 'Okna dachowe są szczególnie narażone na pogodę, a ich serwis wymaga doświadczenia i bezpiecznego dostępu. Przywracamy im szczelność i płynną pracę.',
    signs: [
      'okno trudno się otwiera lub zamyka,',
      'pojawiają się zacieki, wilgoć lub nadmierne zaparowanie,',
      'czuć przeciągi albo słychać więcej hałasu z zewnątrz,',
      'podczas pracy słychać nietypowe dźwięki,',
      'po trudnym okresie pogodowym (wichury, śnieg),',
      'serwis profilaktyczny w celu zachowania gwarancji.',
    ],
    causes:
      'Okna dachowe pracują w trudniejszych warunkach niż pionowe: słońce, deszcz i śnieg działają na nie bezpośrednio, a do tego są często trudno dostępne.',
    steps: [
      ['Ocena stanu', 'sprawdzamy stan techniczny okna, uszczelek i okuć.'],
      ['Przygotowanie', 'zabezpieczamy miejsce pracy, aby prace były bezpieczne.'],
      ['Czyszczenie', 'czyścimy wszystkie elementy, także odpływy.'],
      ['Wymiana części', 'w razie potrzeby wymieniamy zużyte lub niesprawne elementy.'],
      ['Konserwacja i regulacja', 'zabezpieczamy okucia i regulujemy ustawienia.'],
      ['Test końcowy', 'sprawdzamy szczelność i działanie, udzielamy gwarancji na usługę.'],
    ],
    note: 'Przeszliśmy szkolenie producenta okien dachowych FAKRO. Serwisujemy także okna VELUX i innych marek.',
    prices: [['Wymiana zużytych lub niesprawnych części okna dachowego', 'od 200 zł']],
    faq: [
      [
        'Jakie okna dachowe serwisujecie?',
        'Okna VELUX, FAKRO i innych producentów. Przeszliśmy szkolenie FAKRO z serwisu okien dachowych.',
      ],
      [
        'Okno dachowe przecieka — co zrobić?',
        'Zabezpiecz miejsce pod oknem i zadzwoń. Przyczyną może być uszczelka, kołnierz lub zabrudzony odpływ — ustalimy to na miejscu.',
      ],
      [
        'Jak często serwisować okna dachowe?',
        'Raz w roku, najlepiej przed zimą. Regularny serwis jest szczególnie ważny przy oknach zamontowanych wysoko i trudno dostępnych.',
      ],
    ],
    related: ['seal', 'maintenance', 'shutter'],
  },
  {
    id: 'thermo',
    slug: 'diagnostyka-termowizyjna',
    old: null,
    img: 'diagnostic',
    photos: ['rej4'],
    from: null,
    name: 'Diagnostyka termowizyjna okien',
    short: 'Kamera termowizyjna i anemometr pokazują, gdzie okno traci ciepło — przed decyzją o naprawie.',
    title: 'Diagnostyka termowizyjna okien Poznań — kamera i anemometr | Liwserwis',
    description:
      'Badanie okien kamerą termowizyjną i anemometrem w Poznaniu i Wielkopolsce: utrata ciepła, nieszczelności, błędy montażowe. Raport z wynikami.',
    h1: 'Diagnostyka okien kamerą termowizyjną i anemometrem',
    lead: 'Sprawdzamy, gdzie okno traci ciepło i skąd naprawdę wieje — zanim wydasz pieniądze na naprawę lub wymianę.',
    signs: [
      'czujesz przeciąg, ale nie wiesz, skąd dokładnie,',
      'w pomieszczeniu jest chłodno mimo ogrzewania,',
      'podejrzewasz błędy montażowe nowych okien,',
      'chcesz sprawdzić okna przed zakupem mieszkania lub odbiorem budynku,',
      'planujesz poprawę energooszczędności budynku.',
    ],
    causes:
      'Kamera termowizyjna pokazuje miejsca utraty ciepła, ukryte nieszczelności i błędy montażowe. Anemometr mierzy rzeczywisty napływ zimnego powietrza przez szczeliny.',
    steps: [
      ['Pomiar kamerą', 'wykonujemy zdjęcia termowizyjne okien i ich otoczenia.'],
      ['Pomiar anemometrem', 'mierzymy napływ powietrza przy ramie, skrzydle i uszczelkach.'],
      ['Analiza', 'wskazujemy przyczyny strat ciepła: okucia, uszczelki, szyba czy montaż.'],
      ['Raport', 'przygotowujemy czytelny raport z wynikami i zaleceniami.'],
    ],
    note: 'Raport z wynikami to dobra podstawa do dalszych prac serwisowych lub poprawy energooszczędności budynku.',
    prices: [['Diagnostyka termowizyjna z raportem', 'wycena indywidualna']],
    faq: [
      [
        'Kiedy najlepiej wykonać badanie termowizyjne?',
        'Gdy różnica temperatur między wnętrzem a zewnętrzem jest duża — zwykle w sezonie grzewczym. Wtedy straty ciepła są najlepiej widoczne.',
      ],
      [
        'Co otrzymam po badaniu?',
        'Raport z wynikami pomiarów i zaleceniami, co warto naprawić w pierwszej kolejności.',
      ],
      [
        'Czy po diagnostyce możecie od razu naprawić okna?',
        'Tak. Jeśli przyczyną jest regulacja, uszczelka lub okucie, zwykle możemy naprawić okno podczas tej samej lub kolejnej wizyty.',
      ],
    ],
    related: ['seal', 'adjust', 'glass'],
  },
]

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]))
export const servicePath = (s) => `/uslugi/${s.slug}/`
export const priceFrom = (s) => (s.from ? `od ${s.from} zł` : 'wycena indywidualna')
