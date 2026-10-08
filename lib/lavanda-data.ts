// ============================================================
// LOCAL CMS — Студия красоты «Лаванда»
// Архитектурный паттерн ECC: Data-Driven / Local CMS
// Все тексты, цены и контакты — здесь. Верстка не меняется.
// ============================================================

export type ServiceCategory = "Маникюр" | "Брови & Ресницы" | "Уход за кожей" | "Массаж"

export interface Service {
  id: number
  name: string
  description: string
  price: string
  priceFrom?: boolean
  time: string
  category: ServiceCategory
  popular?: boolean
}

export interface TeamMember {
  id: number
  name: string
  role: string
  experience: string
  photo: string
  specialization: string[]
}

export interface Review {
  id: number
  author: string
  rating: number
  text: string
  service: string
  date: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface GalleryImage {
  id: number
  url: string
  alt: string
  category: ServiceCategory
}

export const lavandaData = {
  studio: {
    name: "Лаванда",
    tagline: "Студия красоты",
    headline: "Пространство, где красота встречает заботу",
    subline: "Профессиональный уход за собой в атмосфере уюта и спокойствия. Мы создаём красоту с любовью к каждой детали.",
    address: "Москва, ул. Садовая-Кудринская, 15",
    subway: "м. Баррикадная / Краснопресненская",
    phone: "tel:+74951234567",
    phoneDisplay: "+7 (495) 123-45-67",
    instagram: "https://instagram.com/lavanda_studio",
    telegram: "https://t.me/lavanda_studio",
    whatsapp: "https://wa.me/74951234567?text=Здравствуйте!%20Хочу%20записаться%20в%20студию%20Лаванда",
    schedule: {
      weekdays: "Пн – Пт: 10:00 – 21:00",
      weekend: "Сб – Вс: 10:00 – 20:00",
    },
    founded: "2019",
    clientsServed: "3 200+",
    mastersCount: "8",
    rating: "4.9",
  },

  services: [
    {
      id: 1,
      name: "Маникюр с покрытием",
      description: "Классический аппаратный маникюр, обработка кутикулы, нанесение гель-лака ведущих брендов (Kodi, OPI, CND).",
      price: "2 200 ₽",
      time: "1 ч 20 мин",
      category: "Маникюр",
      popular: true,
    },
    {
      id: 2,
      name: "Комплекс «Всё включено»",
      description: "Снятие старого покрытия, аппаратный маникюр, выравнивание базой, гель-лак + 1 дизайн.",
      price: "3 100 ₽",
      time: "2 ч",
      category: "Маникюр",
      popular: false,
    },
    {
      id: 3,
      name: "Педикюр классический",
      description: "Обработка стоп, педикюрная ванночка с морской солью, опил, гель-лак на ногти ног.",
      price: "3 500 ₽",
      time: "1 ч 45 мин",
      category: "Маникюр",
      popular: false,
    },
    {
      id: 4,
      name: "Коррекция бровей",
      description: "Придание формы по золотому сечению, окрашивание хной или краской. Долговременный результат до 4 недель.",
      price: "1 800 ₽",
      time: "50 мин",
      category: "Брови & Ресницы",
      popular: true,
    },
    {
      id: 5,
      name: "Наращивание ресниц",
      description: "Классика, объём 2D-6D. Гипоаллергенный клей, корейские ресницы Nagaraku. Мягкий и натуральный результат.",
      price: "4 500 ₽",
      priceFrom: true,
      time: "2 ч 30 мин",
      category: "Брови & Ресницы",
      popular: false,
    },
    {
      id: 6,
      name: "Ламинирование ресниц",
      description: "Подъём, укрепление и питание натуральных ресниц. Эффект сохраняется 6–8 недель.",
      price: "3 200 ₽",
      time: "1 ч",
      category: "Брови & Ресницы",
      popular: false,
    },
    {
      id: 7,
      name: "Чистка лица",
      description: "Комбинированная чистка: ультразвук + ручная экстракция + успокаивающая маска. Для всех типов кожи.",
      price: "4 800 ₽",
      time: "1 ч 30 мин",
      category: "Уход за кожей",
      popular: true,
    },
    {
      id: 8,
      name: "Массаж лица + шеи",
      description: "Антивозрастной лифтинг-массаж по технике Жако. Улучшает тонус кожи и снимает мышечные зажимы.",
      price: "3 600 ₽",
      time: "1 ч",
      category: "Массаж",
      popular: false,
    },
  ] as Service[],

  team: [
    {
      id: 1,
      name: "Ольга Петрова",
      role: "Nail-мастер",
      experience: "Опыт 7 лет",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      specialization: ["Маникюр", "Педикюр", "Дизайн"],
    },
    {
      id: 2,
      name: "Анна Соколова",
      role: "Мастер бровей",
      experience: "Опыт 5 лет",
      photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
      specialization: ["Брови", "Ресницы", "Ламинирование"],
    },
    {
      id: 3,
      name: "Мария Иванова",
      role: "Косметолог",
      experience: "Опыт 6 лет",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      specialization: ["Уход за кожей", "Чистка", "Массаж лица"],
    },
  ] as TeamMember[],

  gallery: [
    { id: 1, url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80", alt: "Маникюр нюд", category: "Маникюр" },
    { id: 2, url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80", alt: "Гель-лак", category: "Маникюр" },
    { id: 3, url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80", alt: "Маникюр розовый", category: "Маникюр" },
    { id: 4, url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", alt: "Педикюр", category: "Маникюр" },
    { id: 5, url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80", alt: "Уход за кожей", category: "Уход за кожей" },
    { id: 6, url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80", alt: "Брови", category: "Брови & Ресницы" },
  ] as GalleryImage[],

  reviews: [
    {
      id: 1,
      author: "Алина М.",
      rating: 5,
      text: "Невероятная атмосфера! Ольга сделала мне идеальный маникюр — кутикула обработана идеально, покрытие ровное. Хожу уже 3 месяца и не хочу менять мастера.",
      service: "Маникюр с покрытием",
      date: "Сентябрь 2026",
    },
    {
      id: 2,
      author: "Екатерина В.",
      rating: 5,
      text: "Анна — волшебница с бровями! Форма идеально подходит моему лицу, хна держится 3 недели. Рекомендую всем подругам.",
      service: "Коррекция бровей",
      date: "Октябрь 2026",
    },
    {
      id: 3,
      author: "Светлана К.",
      rating: 5,
      text: "Записалась на чистку лица впервые — и это лучшее решение за последний год. Мария очень деликатна, кожа сияет! Процедура была абсолютно комфортной.",
      service: "Чистка лица",
      date: "Август 2026",
    },
    {
      id: 4,
      author: "Надя Р.",
      rating: 5,
      text: "Студия просто мечта. Везде чисто, красиво, пахнет лавандой. Мастера внимательные. Комплекс «всё включено» на ногти — лучшее соотношение цены и качества.",
      service: "Комплекс «Всё включено»",
      date: "Октябрь 2026",
    },
  ] as Review[],

  faq: [
    {
      id: "f1",
      question: "Как записаться на услугу?",
      answer: "Запись доступна через WhatsApp, Telegram или по телефону. Также вы можете нажать кнопку «Записаться» на сайте и выбрать удобный способ связи. Мы отвечаем в течение 15 минут.",
    },
    {
      id: "f2",
      question: "Используете ли вы одноразовые инструменты?",
      answer: "Да, все расходные материалы (пилки, баф, шлифовщики) — одноразовые. Металлические инструменты стерилизуются в автоклаве и запаиваются в крафт-пакеты, которые вскрываются только при вас.",
    },
    {
      id: "f3",
      question: "Есть ли парковка рядом?",
      answer: "Да, рядом со студией есть платная парковка. Если вы приедете на метро — выход из м. Баррикадная займёт 5–7 минут пешком. Мы пришлём точную ссылку на карты при подтверждении записи.",
    },
    {
      id: "f4",
      question: "Какая гарантия на результат?",
      answer: "Мы даём гарантию 5 дней на маникюр и педикюр. Если в этот период произошёл скол не по вашей вине — исправим бесплатно. На ресницы гарантия 3 дня.",
    },
    {
      id: "f5",
      question: "Можно прийти с ребёнком?",
      answer: "Да, у нас есть небольшая зона ожидания с планшетом и книжками для детей. Но просим предупредить заранее при записи, чтобы мы могли подготовиться.",
    },
  ] as FAQItem[],
}
