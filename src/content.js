// Facts here are completed career milestones. Sources are listed in the Credits dialog.

export const ticker = [
  "8 BALLON D’OR",
  "WORLD CHAMPION 2022",
  "672 GOALS FOR BARCELONA",
  "91 GOALS IN 2012",
  "2 COPA AMÉRICAS · FINALISSIMA",
  "2 WORLD CUP GOLDEN BALLS",
  "OLYMPIC GOLD 2008",
  "6 EUROPEAN GOLDEN SHOES",
  "MLS CUP CHAMPION 2025",
  "SIX WORLD CUPS",
];

export const heroStats = [
  { value: 8, label: "BALLON D’OR AWARDS", suffix: "★", href: "#record-book" },
  { value: 91, label: "GOALS IN A YEAR · 2012", suffix: "↗", href: "#record-book" },
  { value: 672, label: "GOALS FOR FC BARCELONA", suffix: "↗", href: "#record-book" },
  { value: 1, label: "WORLD CUP · QATAR 2022", suffix: "♜", href: "#road" },
];

export const timeline = [
  { year: "1987", date: "24 JUN", title: "Born in Rosario", text: "Lionel Andrés Messi is born in Rosario, Argentina. Football is the family language from the first day.", icon: "◉" },
  { year: "2000", date: "AT 13", title: "Barcelona, and La Masia", text: "He moves across the Atlantic to join Barcelona’s academy. The boy from Rosario becomes a Catalan by choice.", icon: "→" },
  { year: "2004", date: "16 OCT", title: "First-team debut", text: "Messi debuts for Barcelona’s first team against Espanyol. He is 17. Seven months later, on 1 May 2005, he scores his first goal for the club.", icon: "①" },
  { year: "2005", date: "AUG", title: "Argentina’s senior side", text: "Debut for the senior national team, and a World Cup for under-20s with the Golden Ball and Golden Boot already in his pocket.", icon: "★" },
  { year: "2008", date: "AUG", title: "Olympic gold", text: "Argentina win the Beijing Olympic final over Nigeria, 1–0. An Olympic gold for Messi and Argentina.", icon: "◎" },
  { year: "2009", date: "THE YEAR", title: "Six trophies. First Ballon d’Or.", text: "Barcelona win every trophy they can in 2009. Messi scores in the Champions League final in Rome and is crowned the world’s best player for the first time.", icon: "⑥" },
  { year: "2012", date: "THE RECORD", title: "91 goals in a calendar year", text: "79 for Barcelona and 12 for Argentina: a number that surpassed Gerd Müller’s 85 from 1972.", icon: "91" },
  { year: "2014", date: "JUL", title: "The 2014 World Cup final", text: "Messi leads Argentina to a World Cup final and takes the Golden Ball, but Germany win 1–0 after extra time.", icon: "◐" },
  { year: "2015", date: "JUN", title: "Another treble", text: "Barcelona win La Liga, the Copa del Rey and the Champions League. The front three of Messi, Suárez and Neymar scored 122 goals.", icon: "③" },
  { year: "2021", date: "JUL", title: "Copa América, finally", text: "A 1–0 win over Brazil in the Maracanã. Messi, the tournament’s best player, wins his first major senior trophy for Argentina.", icon: "♕" },
  { year: "2021", date: "AUG", title: "Barcelona says goodbye", text: "After 21 years, he leaves Barcelona. Days later he joins Paris Saint-Germain, where he wins two Ligue 1 titles.", icon: "←" },
  { year: "2022", date: "18 DEC", title: "World champion", text: "Lusail. 3–3. Penalties. Argentina beat France 4–2 to win the World Cup, and Messi takes his second Golden Ball.", icon: "♜" },
  { year: "2023", date: "JUL", title: "Inter Miami, and a new city", text: "A free kick in the 94th minute on his debut. A first Leagues Cup. And on 30 October, an eighth Ballon d’Or.", icon: "♡" },
  { year: "2024", date: "JUL", title: "Copa América again", text: "A second consecutive Copa América title, 1–0 over Colombia in extra time in Miami.", icon: "II" },
  { year: "2025", date: "6 DEC", title: "MLS Cup", text: "Inter Miami beat Vancouver 3–1 to win the club’s first MLS Cup. Messi has a hand in two of the goals.", icon: "✦" },
  { year: "2026", date: "JUN–JUL", title: "A sixth World Cup", text: "A hat-trick against Algeria, a World Cup scoring record, and a run to the final, where Argentina lose 1–0 to Spain after extra time.", icon: "⑥" },
];

export const trophies = [
  {
    team: "FC Barcelona",
    years: "2004 — 2021",
    total: 35,
    accent: "#a50044",
    items: [
      ["10", "La Liga titles"],
      ["7", "Copa del Rey"],
      ["8", "Supercopa de España"],
      ["4", "Champions League"],
      ["3", "UEFA Super Cup"],
      ["3", "FIFA Club World Cup"],
    ],
  },
  {
    team: "Argentina",
    years: "2005 — 2026",
    total: 6,
    accent: "#4aa3d6",
    items: [
      ["1", "FIFA World Cup · 2022"],
      ["2", "Copa América · 2021, 2024"],
      ["1", "Finalissima · 2022"],
      ["1", "Olympic gold · 2008"],
      ["1", "U-20 World Cup · 2005"],
    ],
  },
  {
    team: "Paris Saint-Germain",
    years: "2021 — 2023",
    total: 3,
    accent: "#1b3a68",
    items: [
      ["2", "Ligue 1 titles"],
      ["1", "Trophée des Champions"],
    ],
  },
  {
    team: "Inter Miami CF",
    years: "2023 —",
    total: 3,
    accent: "#e5a0bd",
    items: [
      ["1", "Leagues Cup · 2023"],
      ["1", "Supporters’ Shield · 2024"],
      ["1", "MLS Cup · 2025"],
    ],
  },
];

export const roadMatches = [
  { stage: "GROUP C", opponent: "Saudi Arabia", score: "1–2", result: "L", note: "Messi scores from the spot, but a shock defeat opens the tournament.", video: "saudi" },
  { stage: "GROUP C", opponent: "Mexico", score: "2–0", result: "W", note: "A low left-footed strike from outside the box breaks the deadlock.", video: "mexico" },
  { stage: "GROUP C", opponent: "Poland", score: "2–0", result: "W", note: "Messi’s penalty is saved, but Argentina win and top the group." },
  { stage: "ROUND OF 16", opponent: "Australia", score: "2–1", result: "W", note: "A goal in his 1,000th senior match, then a nervy finish." },
  { stage: "QUARTER-FINAL", opponent: "Netherlands", score: "2–2", pens: "4–3 pens", result: "W", note: "A drama-filled night, with Emiliano Martínez the shoot-out hero." },
  { stage: "SEMI-FINAL", opponent: "Croatia", score: "3–0", result: "W", note: "A penalty, and an assist built from a mesmerising run.", video: "croatia" },
  { stage: "FINAL", opponent: "France", score: "3–3", pens: "4–2 pens", result: "W", note: "Two goals from Messi, and the one prize he’d always chased.", video: "final22" },
];

export const records = [
  { n: 8, cat: "awards", title: "Ballon d’Or awards", text: "2009 · 2010 · 2011 · 2012 · 2015 · 2019 · 2021 · 2023", tag: "A RECORD", href: "https://www.uefa.com/news/0242-0e97e0ac1cb3-eef786ff788c-1000--messi-all-his-records/" },
  { n: 6, cat: "awards", title: "European Golden Shoes", text: "2010 · 2012 · 2013 · 2017 · 2018 · 2019", tag: "A RECORD", href: "https://inside.fifa.com/news/three-more-records-for-a-goalscorer-supreme" },
  { n: 2, cat: "awards", title: "World Cup Golden Balls", text: "2014 and 2022: the tournament’s best player, twice.", tag: "A RECORD" },
  { n: 3, cat: "awards", title: "FIFA Best Men’s Player awards", text: "2019 · 2022 · 2023", tag: "" },
  { n: 91, cat: "barcelona", title: "A year like no other", text: "79 for Barcelona. 12 for Argentina. One astonishing 2012 that passed Gerd Müller’s 85.", tag: "CALENDAR-YEAR GOALS", href: "https://www.fcbarcelona.com/en/football/first-team/news/1670444/stat-of-the-day--91-messis-goals-in-a-calendar-year/amp" },
  { n: 672, cat: "barcelona", title: "One club. An everlasting legacy.", text: "Barcelona’s all-time leading scorer across 778 appearances.", tag: "FC BARCELONA · 2004–2021", href: "https://www.fcbarcelona.com/en/football/first-team/news/2153661/eighth-pichichi-for-leo-messi" },
  { n: 474, cat: "barcelona", title: "La Liga goals", text: "The all-time record in the Spanish top flight.", tag: "A RECORD" },
  { n: 73, cat: "barcelona", title: "Goals in a season", text: "2011–12, across all competitions: 50 of them in La Liga alone.", tag: "A RECORD" },
  { n: 36, cat: "barcelona", title: "La Liga hat-tricks", text: "More than any player in the league’s history.", tag: "A RECORD" },
  { n: 5, cat: "barcelona", title: "Goals in a Champions League match", text: "7–1 against Bayer Leverkusen, March 2012. The first player ever to do it.", tag: "A RECORD" },
  { n: 35, cat: "barcelona", title: "Trophies with Barcelona", text: "10 La Liga, 7 Copa del Rey, 8 Supercopa, 4 Champions League, 3 Super Cup, 3 Club World Cup.", tag: "TROPHY CABINET" },
  { n: 6, cat: "barcelona", title: "Trophies in a single year", text: "2009: Barcelona win all six competitions they enter.", tag: "THE SEXTUPLE" },
  { n: 4, cat: "argentina", title: "Senior trophies with Argentina", text: "Copa América 2021, Finalissima 2022, World Cup 2022, Copa América 2024.", tag: "SKY-BLUE AND WHITE" },
  { n: 1, cat: "argentina", title: "Olympic gold medal", text: "Beijing 2008, with a young Argentina side.", tag: "BEIJING 2008" },
  { n: 7, cat: "worldcup", title: "Goals at Qatar 2022", text: "Scoring in the group stage, round of 16, quarter-final, semi-final and final. A first.", tag: "WORLD CUP 2022" },
  { n: 3, cat: "worldcup", title: "Assists at Qatar 2022", text: "Seven goals and three assists in seven matches on the way to the Golden Ball.", tag: "WORLD CUP 2022" },
  { n: 26, cat: "worldcup", title: "World Cup appearances by Qatar", text: "A record, passing Lothar Matthäus. He has played more since.", tag: "A RECORD" },
  { n: 6, cat: "worldcup", title: "World Cups played", text: "2006 · 2010 · 2014 · 2018 · 2022 · 2026", tag: "SIX TOURNAMENTS" },
  { n: 3, cat: "worldcup", title: "A World Cup hat-trick", text: "Against Algeria, June 2026: his first hat-trick at a World Cup. He went on to set the all-time World Cup scoring record.", tag: "WORLD CUP 2026" },
  { n: 3, cat: "beyond", title: "Inter Miami trophies", text: "Leagues Cup 2023, Supporters’ Shield 2024, MLS Cup 2025.", tag: "MIAMI · 2023 —" },
  { n: 2, cat: "beyond", title: "Ligue 1 titles with PSG", text: "2021/22 and 2022/23, in two seasons in Paris.", tag: "PARIS · 2021–2023" },
];

export const recordCategories = [
  ["all", "Everything"],
  ["awards", "Awards"],
  ["barcelona", "Barcelona"],
  ["argentina", "Argentina"],
  ["worldcup", "World Cups"],
  ["beyond", "Paris & Miami"],
];

export const gallery = [
  {
    id: "barca-camp-nou",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lionel_Messi_in_a_La_Liga_match_at_Camp_Nou%2C_Barcelona_%28_Ank_Kumar%2C_Infosys_Limited%29_02.jpg/1280px-Lionel_Messi_in_a_La_Liga_match_at_Camp_Nou%2C_Barcelona_%28_Ank_Kumar%2C_Infosys_Limited%29_02.jpg",
    width: 1600, height: 1067,
    alt: "Lionel Messi in action for Barcelona at Camp Nou in a La Liga match",
    caption: "CAMP NOU · SEPTEMBER 2014",
    author: "Ank Kumar", license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lionel_Messi_in_a_La_Liga_match_at_Camp_Nou,_Barcelona_(_Ank_Kumar,_Infosys_Limited)_02.jpg",
    size: "wide",
  },
  {
    id: "barca-ball",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Lionel_Messi_in_a_La_Liga_match_at_Camp_Nou%2C_Barcelona_%28_Ank_Kumar%2C_Infosys_Limited%29_12.jpg/1280px-Lionel_Messi_in_a_La_Liga_match_at_Camp_Nou%2C_Barcelona_%28_Ank_Kumar%2C_Infosys_Limited%29_12.jpg",
    width: 1280, height: 853,
    alt: "Lionel Messi with the ball at his feet for Barcelona at Camp Nou",
    caption: "ON THE BALL · CAMP NOU 2014",
    author: "Ank Kumar", license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lionel_Messi_in_a_La_Liga_match_at_Camp_Nou,_Barcelona_(_Ank_Kumar,_Infosys_Limited)_12.jpg",
  },
  {
    id: "free-kick",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tiro_Libre_Messi_%2819153749690%29.jpg/1280px-Tiro_Libre_Messi_%2819153749690%29.jpg",
    width: 1600, height: 1067,
    alt: "Lionel Messi lining up a free kick for Argentina",
    caption: "THE FREE KICK · JUNE 2015",
    author: "Francisco Javier Gutierrez Zuñiga", license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tiro_Libre_Messi_(19153749690).jpg",
  },
  {
    id: "russia-2018",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg/1280px-FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg",
    width: 1600, height: 1200,
    alt: "Lionel Messi about to take a penalty for Argentina against Iceland at the 2018 World Cup",
    caption: "WORLD CUP 2018 · ARGENTINA v ICELAND",
    author: "Voltmetro", license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg",
    size: "wide",
  },
  {
    id: "miami-2025",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-143.jpg/1280px-Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-143.jpg",
    width: 1600, height: 1067,
    alt: "Lionel Messi playing for Inter Miami against the New England Revolution in July 2025",
    caption: "INTER MIAMI · JULY 2025",
    author: "Bryan Berlin", license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-143.jpg",
  },
];

export const quiz = [
  { q: "In which city was Lionel Messi born?", a: ["Buenos Aires", "Rosario", "Córdoba", "Barcelona"], c: 1, why: "Rosario, Argentina, on 24 June 1987." },
  { q: "How many Ballon d’Or awards has Messi won?", a: ["6", "7", "8", "9"], c: 2, why: "Eight: 2009, 2010, 2011, 2012, 2015, 2019, 2021 and 2023." },
  { q: "How many goals did Messi score in the calendar year 2012?", a: ["73", "85", "91", "100"], c: 2, why: "91 goals: 79 for Barcelona and 12 for Argentina, passing Gerd Müller’s 85." },
  { q: "Messi scored five goals in one Champions League match against which team?", a: ["Arsenal", "Bayer Leverkusen", "Bayern Munich", "Manchester United"], c: 1, why: "A 7–1 win against Bayer Leverkusen in March 2012." },
  { q: "Which goalkeeper did Messi famously chip in the 2015 Champions League semi-final?", a: ["Gianluigi Buffon", "Manuel Neuer", "Edwin van der Sar", "Petr Čech"], c: 1, why: "After leaving Jérôme Boateng on the turf, he chipped Manuel Neuer." },
  { q: "Where did Argentina win the 2021 Copa América final?", a: ["Buenos Aires", "Santiago", "Rio de Janeiro", "Lima"], c: 2, why: "A 1–0 win over Brazil in the Maracanã, in Rio." },
  { q: "What was the shoot-out score in the 2022 World Cup final?", a: ["3–2", "4–2", "4–3", "5–4"], c: 1, why: "Argentina won the shoot-out 4–2 after a 3–3 draw." },
  { q: "Which club did Messi join in 2023?", a: ["Inter Miami", "LA Galaxy", "Al-Hilal", "Newell’s Old Boys"], c: 0, why: "Inter Miami. He won the Leagues Cup in his first season." },
  { q: "Messi inherited Barcelona’s famous number 10 shirt from which player?", a: ["Xavi", "Ronaldinho", "Rivaldo", "Samuel Eto’o"], c: 1, why: "Ronaldinho left in 2008, and Messi took the number 10." },
  { q: "In which year did Messi win Olympic gold with Argentina?", a: ["2004", "2008", "2012", "2016"], c: 1, why: "Beijing 2008, 1–0 against Nigeria in the final." },
];
