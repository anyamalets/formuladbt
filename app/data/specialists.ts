export type Specialist = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  focus: string[];
  age: string;
  format: string;
  prices: string;
  links: { label: string; href: string }[];
};

export const specialists: Specialist[] = [
  {
    slug: "anna-malyutochkina",
    name: "Анна Малюточкина",
    role: "Клинический психолог · КПТ, ACT, ДБТ",
    photo: "/team/portraits/anna-malyutochkina.jpg",
    focus: [
      "РПП — анорексия, булимия, приступообразное переедание, фиксация на «правильном» питании и весе. Также — тревога, СДВГ, перфекционизм.",
    ],
    age: "Взрослые от 18 лет",
    format: "Онлайн",
    prices: "4 000 ₽",
    links: [
      { label: "Сайт", href: "https://anyamalets.ru" },
      { label: "Telegram", href: "https://t.me/anya_malets" },
    ],
  },
  {
    slug: "maria-petrenko",
    name: "Мария Петренко",
    role: "Клинический психолог, к.псих.н. · КПТ, ДБТ, CFT",
    photo: "/team/portraits/maria-petrenko.jpg",
    focus: [
      "Депрессивное и тревожное расстройство (включая социальную тревогу), БАР, ПРЛ. А также апатия, прокрастинация, трудности в коммуникации и регуляции эмоций.",
    ],
    age: "Взрослые от 18 лет",
    format: "Онлайн · очно в Санкт-Петербурге",
    prices: "3 500 ₽ онлайн · 5 000 ₽ очно",
    links: [
      { label: "b17", href: "https://www.b17.ru/mari_petrenko/?prt=885327" },
    ],
  },
  {
    slug: "aliya-jailaubekova",
    name: "Алия Джайлаубекова",
    role: "Практический психолог · КПТ, ACT, ДБТ",
    photo: "/team/portraits/aliya-jailaubekova.jpg",
    focus: [
      "Тревога, депрессия, панические атаки, эмоциональная нестабильность, суицидальные мысли, проблемы в отношениях, профессиональное выгорание.",
    ],
    age: "Взрослые от 18 лет",
    format: "Онлайн · очно в Астане",
    prices: "3 000 ₽ онлайн · 3 500 ₽ очно",
    links: [
      { label: "Сайт", href: "https://www.aliyajailaubekova.com/" },
      { label: "b17", href: "https://www.b17.ru/id1023155/" },
    ],
  },
  {
    slug: "inna-mosievskih",
    name: "Инна Мосиевских",
    role: "Клинический психолог · КПТ, ACT, ДБТ",
    photo: "/team/portraits/inna-mosievskih.jpg",
    focus: [
      "РПП и переедание. Работа с отношением к телу и еде, влияние гормональных факторов на пищевое поведение, психотерапевтические группы.",
    ],
    age: "Взрослые от 18 лет",
    format: "Онлайн · очно в Москве",
    prices: "3 500 ₽ онлайн · 4 000 ₽ очно",
    links: [
      { label: "Telegram", href: "https://t.me/innaslod" },
      { label: "VK", href: "https://vk.com/innaslod_psy" },
    ],
  },
];
