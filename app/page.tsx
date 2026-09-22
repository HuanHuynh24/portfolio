'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Container,
  Database,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Moon,
  Server,
  Sun,
  Terminal,
  X,
} from 'lucide-react';

const navigation = [
  { number: '01', label: { en: 'ABOUT', vi: 'GIỚI THIỆU' }, href: '#about' },
  { number: '02', label: { en: 'EXPERTISE', vi: 'CHUYÊN MÔN' }, href: '#expertise' },
  { number: '03', label: { en: 'EXPERIENCE', vi: 'KINH NGHIỆM' }, href: '#experience' },
  { number: '04', label: { en: 'EDUCATION', vi: 'HỌC VẤN' }, href: '#education' },
  { number: '05', label: { en: 'CONTACT', vi: 'LIÊN HỆ' }, href: '#contact' },
];

type Language = 'en' | 'vi';
type Theme = 'dark' | 'light';

const DEFAULT_THEME: Theme = 'dark';

const copy = {
  en: {
    primaryNav: 'Primary navigation', toggleMenu: 'Toggle menu', switchLanguage: 'Switch to Vietnamese',
    switchLight: 'Switch to light mode', switchDark: 'Switch to dark mode', available: 'AVAILABLE_FOR_WORK', contactMe: 'CONTACT_ME',
    role: 'WEB_DEVELOPER // DA_NANG', heroLine: 'Digital systems,', typewriter: 'built to perform.',
    viewExperience: 'VIEW_EXPERIENCE', startConversation: 'START_A_CONVERSATION',
    heroIntro: 'I design, build and deploy production websites — from WordPress and PHP to Next.js, Docker and VPS infrastructure.',
    sections: ['ABOUT', 'EXPERTISE', 'EXPERIENCE', 'EDUCATION', 'CONTACT'],
    aboutTitle: ['Engineering clarity', 'into every layer.'],
    aboutBody: [
      'I am a web developer based in Da Nang, Vietnam, focused on building reliable digital experiences for companies and service businesses.',
      'My work spans interface implementation, WordPress customization, backend integrations and the infrastructure required to keep a website stable after launch.',
    ],
    aboutValues: ['DESIGN_TO_CODE', 'CLIENT_EDITABLE', 'PRODUCTION_READY', 'END_TO_END'],
    expertiseTitle: ['Five disciplines.', 'One delivery mindset.'],
    expertiseIntro: 'A practical stack for building, shipping and maintaining modern web products.',
    experienceTitle: ['From brief', 'to uptime.'],
    experienceIntro: 'Experience across the complete website lifecycle: implementation, integration, deployment and operational support.',
    academicPath: 'ACADEMIC_PATH', degree: 'Information Technology',
    university: 'University of Technology and Education — The University of Danang', locationCode: 'DA_NANG // VIETNAM',
    thesisLabel: 'GRADUATION_THESIS',
    thesis: 'Intelligent recruitment support system using NLP for CV extraction and machine learning for job recommendation.',
    haveProject: 'HAVE_A_PROJECT?', contactTitle: "Let's build it.", location: 'Da Nang, Vietnam',
  },
  vi: {
    primaryNav: 'Điều hướng chính', toggleMenu: 'Mở hoặc đóng menu', switchLanguage: 'Chuyển sang tiếng Anh',
    switchLight: 'Chuyển sang giao diện sáng', switchDark: 'Chuyển sang giao diện tối', available: 'SẴN_SÀNG_HỢP_TÁC', contactMe: 'LIÊN_HỆ_TÔI',
    role: 'LẬP_TRÌNH_VIÊN_WEB // ĐÀ_NẴNG', heroLine: 'Hệ thống số,', typewriter: 'tối ưu hiệu suất.',
    viewExperience: 'XEM_KINH_NGHIỆM', startConversation: 'BẮT_ĐẦU_TRAO_ĐỔI',
    heroIntro: 'Tôi thiết kế, phát triển và triển khai website thực tế — từ WordPress, PHP đến Next.js, Docker và hạ tầng VPS.',
    sections: ['GIỚI THIỆU', 'CHUYÊN MÔN', 'KINH NGHIỆM', 'HỌC VẤN', 'LIÊN HỆ'],
    aboutTitle: ['Biến sự phức tạp', 'thành hệ thống rõ ràng.'],
    aboutBody: [
      'Tôi là lập trình viên web tại Đà Nẵng, tập trung xây dựng các trải nghiệm số ổn định cho doanh nghiệp và đơn vị dịch vụ.',
      'Công việc của tôi bao gồm triển khai giao diện, tùy biến WordPress, tích hợp backend và xây dựng hạ tầng giúp website vận hành ổn định sau khi ra mắt.',
    ],
    aboutValues: ['THIẾT_KẾ_THÀNH_CODE', 'DỄ_DÀNG_CHỈNH_SỬA', 'SẴN_SÀNG_VẬN_HÀNH', 'TRỌN_GÓI'],
    expertiseTitle: ['Năm chuyên môn.', 'Một tư duy triển khai.'],
    expertiseIntro: 'Bộ công nghệ thực tiễn để xây dựng, triển khai và duy trì các sản phẩm web hiện đại.',
    experienceTitle: ['Từ yêu cầu', 'đến vận hành.'],
    experienceIntro: 'Kinh nghiệm xuyên suốt vòng đời website: phát triển, tích hợp, triển khai và hỗ trợ vận hành.',
    academicPath: 'HÀNH_TRÌNH_HỌC_TẬP', degree: 'Công nghệ Thông tin',
    university: 'Trường Đại học Sư phạm Kỹ thuật — Đại học Đà Nẵng', locationCode: 'ĐÀ_NẴNG // VIỆT_NAM',
    thesisLabel: 'ĐỒ_ÁN_TỐT_NGHIỆP',
    thesis: 'Xây dựng hệ thống hỗ trợ tuyển dụng thông minh: trích xuất thông tin CV bằng NLP và khuyến nghị việc làm phù hợp dựa trên mô hình học máy.',
    haveProject: 'BẠN_CÓ_DỰ_ÁN?', contactTitle: 'Cùng xây dựng.', location: 'Đà Nẵng, Việt Nam',
  },
} as const;

const expertise = [
  {
    number: '01',
    title: 'WordPress',
    tag: 'CMS / COMMERCE',
    description: {
      en: 'Corporate and multilingual websites built with custom themes, Gutenberg, Astra, Spectra, WooCommerce and Polylang.',
      vi: 'Website doanh nghiệp và đa ngôn ngữ với theme tùy chỉnh, Gutenberg, Astra, Spectra, WooCommerce và Polylang.',
    },
    icon: Code2,
  },
  {
    number: '02',
    title: 'Next.js',
    tag: 'FULL-STACK WEB',
    description: {
      en: 'Modern React applications with reusable components, responsive interfaces, server rendering and practical API integration.',
      vi: 'Ứng dụng React hiện đại với component tái sử dụng, giao diện responsive, server rendering và tích hợp API thực tế.',
    },
    icon: Terminal,
  },
  {
    number: '03',
    title: 'PHP',
    tag: 'BACKEND / WORDPRESS',
    description: {
      en: 'Theme hooks, plugin customization, AJAX forms, REST integrations and maintainable server-side business logic.',
      vi: 'Theme hook, tùy biến plugin, biểu mẫu AJAX, tích hợp REST và xử lý nghiệp vụ phía máy chủ dễ bảo trì.',
    },
    icon: Database,
  },
  {
    number: '04',
    title: 'Docker',
    tag: 'CONTAINERS / DELIVERY',
    description: {
      en: 'Reproducible local and production environments, service orchestration and dependable deployment workflows.',
      vi: 'Môi trường local và production nhất quán, điều phối dịch vụ và quy trình triển khai đáng tin cậy.',
    },
    icon: Container,
  },
  {
    number: '05',
    title: 'VPS',
    tag: 'INFRASTRUCTURE',
    description: {
      en: 'Linux server setup, DNS, SSL, Nginx, databases, backups, monitoring and incident troubleshooting.',
      vi: 'Thiết lập Linux server, DNS, SSL, Nginx, cơ sở dữ liệu, sao lưu, giám sát và xử lý sự cố.',
    },
    icon: Server,
  },
];

const experience = [
  {
    period: { en: 'PRESENT', vi: 'HIỆN TẠI' },
    role: { en: 'Website Developer', vi: 'Lập trình Website' },
    context: 'AGENCY DELIVERY',
    detail: {
      en: 'Deliver corporate and service websites from design handoff to production. Build responsive page systems, multilingual experiences, forms, commerce flows and client-editable content.',
      vi: 'Triển khai website doanh nghiệp và dịch vụ từ thiết kế đến production. Xây dựng hệ thống trang responsive, đa ngôn ngữ, biểu mẫu, luồng thương mại và nội dung dễ chỉnh sửa.',
    },
    highlights: { en: ['WordPress architecture', 'Figma to production', 'Performance & technical SEO'], vi: ['Kiến trúc WordPress', 'Figma đến production', 'Hiệu suất & SEO kỹ thuật'] },
  },
  {
    period: { en: 'FULL-STACK', vi: 'FULL-STACK' },
    role: { en: 'Web Application Development', vi: 'Phát triển Ứng dụng Web' },
    context: 'NEXT.JS / PHP',
    detail: {
      en: 'Develop component-based interfaces and backend integrations with a focus on clear architecture, practical maintainability and production-ready behavior.',
      vi: 'Phát triển giao diện theo component và tích hợp backend với kiến trúc rõ ràng, dễ bảo trì và sẵn sàng vận hành thực tế.',
    },
    highlights: { en: ['React & Next.js', 'PHP & REST APIs', 'Database integration'], vi: ['React & Next.js', 'PHP & REST API', 'Tích hợp cơ sở dữ liệu'] },
  },
  {
    period: { en: 'OPERATIONS', vi: 'VẬN HÀNH' },
    role: { en: 'Deployment & Infrastructure', vi: 'Triển khai & Hạ tầng' },
    context: 'DOCKER / VPS',
    detail: {
      en: 'Own the delivery layer beyond source code: containerized environments, Linux servers, domains, SSL, SMTP, backups and technical incident recovery.',
      vi: 'Phụ trách lớp vận hành sau mã nguồn: môi trường container, Linux server, tên miền, SSL, SMTP, sao lưu và khôi phục sự cố kỹ thuật.',
    },
    highlights: { en: ['Docker workflows', 'VPS administration', 'DNS, SSL & monitoring'], vi: ['Quy trình Docker', 'Quản trị VPS', 'DNS, SSL & giám sát'] },
  },
];

const stackGroups = [
  { label: 'CMS', items: ['WordPress', 'WooCommerce', 'Gutenberg', 'Astra', 'Spectra', 'Polylang'] },
  { label: 'WEB', items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'BACKEND', items: ['PHP', 'REST API', 'MySQL', 'AJAX', 'Prisma'] },
  { label: 'INFRA', items: ['Docker', 'Linux', 'VPS', 'Nginx', 'aaPanel', 'Git', 'SSL', 'DNS'] },
  { label: 'WORKFLOW', items: ['Figma', 'GA4', 'GTM', 'GSC', 'Technical SEO', 'Performance'] },
];

function GridBackground() {
  return (
    <div className="grid-background" aria-hidden="true">
      <span className="grid-v left-[12.5%]" />
      <span className="grid-v left-[37.5%]" />
      <span className="grid-v left-[62.5%]" />
      <span className="grid-v left-[87.5%]" />
    </div>
  );
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="reveal flex items-center gap-[10px] font-manrope text-[12px] md:text-[13px] leading-none tracking-[0.12em] uppercase">
      <span className="text-[#AFDDFF]">{number}.</span>
      <span className="text-white/60">[ {children} ]</span>
    </div>
  );
}

function Typewriter({ phrase }: { phrase: string }) {
  const [text, setText] = useState(phrase);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    const start = () => {
      clearTimeout(timer);
      if (preference.matches) { setText(phrase); return; }
      let count = 0;
      let deleting = false;
      setText('');
      const tick = () => {
        count += deleting ? -1 : 1;
        setText(phrase.slice(0, count));
        let delay = deleting ? 55 : 105;
        if (count === phrase.length) { deleting = true; delay = 1600; }
        if (count === 0) { deleting = false; delay = 650; }
        timer = setTimeout(tick, delay);
      };
      timer = setTimeout(tick, 600);
    };
    start();
    preference.addEventListener('change', start);
    return () => { clearTimeout(timer); preference.removeEventListener('change', start); };
  }, [phrase]);
  return <span className="typewriter" aria-label={phrase}>
    <span className="typewriter-reserve" aria-hidden="true">{phrase}</span>
    <span className="typewriter-text" aria-hidden="true">{text}<span className="typing-caret" /></span>
  </span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const t = copy[language];
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('portfolio-language');
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    setLanguage(savedLanguage === 'en' || savedLanguage === 'vi'
      ? savedLanguage
      : 'en');
    setTheme(savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : DEFAULT_THEME);
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.lang = language;
    window.localStorage.setItem('portfolio-language', language);
  }, [language, preferencesReady]);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme, preferencesReady]);

  useEffect(() => {
    // Observe individual elements, never an entire section or a tall wrapper.
    const wrappers = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    wrappers.forEach((element) => { element.classList.remove('reveal'); element.style.transitionDelay = ''; });
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(
      'main section:not(#top) h2, main section:not(#top) article, main section:not(#top) p, main section:not(#top) a, main section:not(#top) [data-reveal] > span, #expertise > div > div:last-child > div'
    )).filter((element) => !element.parentElement?.closest('article'));
    revealElements.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
    });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -35px 0px' },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      revealElements.forEach((element) => element.classList.remove('reveal', 'is-visible'));
    };
  }, []);

  return (
    <div className={`site-shell theme-${theme} relative min-h-screen overflow-x-hidden font-manrope selection:bg-[#AFDDFF] selection:text-black`}>
      <div className="floating-entity fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <video
          className="entity-video h-full w-full"
          ref={(video) => {
            if (!video) return;
            video.defaultMuted = true;
            video.muted = true;
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onCanPlay={(event) => {
            const video = event.currentTarget;
            video.defaultMuted = true;
            video.muted = true;
            video.play().catch(() => undefined);
          }}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4" type="video/mp4" />
        </video>
      </div>
      <GridBackground />

      <header className="site-header fixed top-0 left-0 z-40 w-full border-b border-white/10 bg-black/65 backdrop-blur-xl">
        <nav className="flex h-[70px] md:h-[78px] items-center px-5 md:px-[35px]" aria-label={t.primaryNav}>
          <a href="#top" className="font-graphik text-[18px] md:text-[21px] leading-none whitespace-nowrap">HUÂN // DEV</a>

          <div className="hidden xl:flex items-center gap-[34px] ml-auto">
            {navigation.map((item) => (
              <a key={item.number} href={item.href} className="group flex items-center gap-[3px] text-[12px] leading-none">
                <span className="text-[#AFDDFF]/80">{item.number}.</span>
                <span className="text-white/80 transition-colors group-hover:text-[#AFDDFF]">{item.label[language]}</span>
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-[6px] xl:ml-[24px]">
            <button className="header-control flex h-[38px] items-center gap-[6px] border border-white/15 px-[9px] text-[11px] tracking-[0.08em] transition-colors hover:border-[#AFDDFF] hover:text-[#AFDDFF]" type="button" aria-label={t.switchLanguage} title={t.switchLanguage} onClick={() => setLanguage((current) => current === 'en' ? 'vi' : 'en')}>
              <Languages className="h-[15px] w-[15px]" strokeWidth={1.5} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button className="header-control flex h-[38px] w-[38px] items-center justify-center border border-white/15 transition-colors hover:border-[#AFDDFF] hover:text-[#AFDDFF]" type="button" aria-label={theme === 'dark' ? t.switchLight : t.switchDark} title={theme === 'dark' ? t.switchLight : t.switchDark} onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-[16px] w-[16px]" strokeWidth={1.5} /> : <Moon className="h-[16px] w-[16px]" strokeWidth={1.5} />}
            </button>
          </div>

          <a href="mailto:huanhuynh2402@gmail.com" className="hidden md:flex ml-[10px] items-center gap-[9px] border border-[#AFDDFF]/70 px-[14px] py-[9px] text-[11px] tracking-[0.12em] text-[#AFDDFF] transition-colors hover:bg-[#AFDDFF] hover:text-black">
            {t.available} <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={1.5} />
          </a>

          <button className="relative ml-[6px] h-[40px] w-[40px] xl:hidden" aria-label={t.toggleMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
            <Menu className={`absolute inset-[9px] h-[22px] w-[22px] transition-all duration-300 ${menuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} strokeWidth={1.5} />
            <X className={`absolute inset-[9px] h-[22px] w-[22px] transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} strokeWidth={1.5} />
          </button>
        </nav>

        <div className={`mobile-menu absolute left-0 top-full w-full border-b border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-500 xl:hidden ${menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0'}`}>
          <div className="flex flex-col px-5 py-[30px] md:px-[35px]">
            {navigation.map((item, index) => (
              <a key={item.number} href={item.href} onClick={closeMenu} className="flex items-center gap-[14px] border-b border-white/10 py-[17px]" style={{ transitionDelay: menuOpen ? `${index * 55}ms` : '0ms' }}>
                <span className="text-[13px] text-[#AFDDFF]">{item.number}.</span>
                <span className="font-graphik text-[25px] leading-none">{item.label[language]}</span>
              </a>
            ))}
            <a href="mailto:huanhuynh2402@gmail.com" onClick={closeMenu} className="mt-[28px] flex items-center justify-between bg-[#AFDDFF] px-[18px] py-[15px] text-[12px] tracking-[0.12em] text-black">
              {t.contactMe} <ArrowUpRight className="h-[16px] w-[16px]" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="top" className="relative min-h-screen overflow-hidden border-b border-white/10">

          <div className="relative z-10 flex min-h-screen flex-col px-5 pb-[32px] pt-[125px] md:px-[35px] md:pb-[42px] md:pt-[150px]">
            <div className="anim-fade-up" style={{ animationDelay: '180ms' }}>
              <span className="inline-flex items-center gap-[8px] bg-[#AFDDFF] px-[7px] py-[3px] text-[11px] font-medium tracking-[0.12em] text-black"><span className="h-[5px] w-[5px] bg-black" /> {t.role}</span>
            </div>

            <h1 className="mt-[28px] max-w-[1050px] font-graphik text-[48px] font-normal leading-[0.94] tracking-[-0.035em] sm:text-[70px] md:text-[94px] lg:text-[118px] anim-fade-up" style={{ animationDelay: '320ms' }}>
              Huỳnh Ngọc Huân.<br />{t.heroLine}<br /><Typewriter phrase={t.typewriter} />
            </h1>

            <div className="mt-auto grid gap-[28px] pt-[60px] md:grid-cols-[1fr_380px] md:items-end">
              <div className="flex flex-wrap items-center gap-[10px] anim-fade-up" style={{ animationDelay: '620ms' }}>
                <a href="#experience" className="flex items-center gap-[10px] bg-[#AFDDFF] px-[18px] py-[13px] text-[12px] font-medium tracking-[0.1em] text-black transition-colors hover:bg-[#c8e8ff]">{t.viewExperience} <ArrowDown className="h-[15px] w-[15px]" strokeWidth={1.5} /></a>
                <a href="mailto:huanhuynh2402@gmail.com" className="flex items-center gap-[10px] border border-white/30 px-[18px] py-[12px] text-[12px] tracking-[0.1em] text-white transition-colors hover:border-[#AFDDFF] hover:text-[#AFDDFF]">{t.startConversation} <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={1.5} /></a>
              </div>
              <div className="border-l border-[#AFDDFF] pl-[18px] anim-slide-right" style={{ animationDelay: '760ms' }}>
                <p className="text-[15px] leading-[1.65] text-white/75">{t.heroIntro}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative border-b border-white/10 px-5 py-[90px] md:px-[35px] md:py-[130px]">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel number="01">{t.sections[0]}</SectionLabel>
            <div data-reveal className="reveal mt-[50px] grid gap-[48px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[90px]">
              <h2 className="font-graphik text-[42px] leading-[1.02] tracking-[-0.025em] sm:text-[58px] md:text-[72px]">{t.aboutTitle[0]}<br />{t.aboutTitle[1]}</h2>
              <div className="grid gap-[28px] text-[16px] leading-[1.8] text-white/65 md:grid-cols-2">
                <p>{t.aboutBody[0]}</p>
                <p>{t.aboutBody[1]}</p>
              </div>
            </div>
            <div data-reveal className="reveal mt-[72px] grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {t.aboutValues.map((label, index) => (
                <div key={label} className="border-b border-r border-white/10 p-[22px] md:p-[28px]">
                  <span className="text-[12px] text-[#AFDDFF]">0{index + 1}.</span>
                  <p className="mt-[28px] text-[13px] tracking-[0.1em] text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="relative border-b border-white/10 px-5 py-[90px] md:px-[35px] md:py-[130px]">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel number="02">{t.sections[1]}</SectionLabel>
            <div data-reveal className="reveal mt-[45px] flex flex-col gap-[24px] md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[780px] font-graphik text-[42px] leading-[1.02] tracking-[-0.025em] sm:text-[58px] md:text-[72px]">{t.expertiseTitle[0]}<br />{t.expertiseTitle[1]}</h2>
              <p className="max-w-[340px] text-[14px] leading-[1.7] text-white/50">{t.expertiseIntro}</p>
            </div>

            <div className="mt-[65px] grid border-l border-t border-white/10 md:grid-cols-2 xl:grid-cols-5">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article data-reveal key={item.number} className="reveal group min-h-[340px] border-b border-r border-white/10 p-[24px] transition-[opacity,transform,background-color,color] hover:bg-[#AFDDFF] hover:text-black md:p-[28px]" style={{ transitionDelay: `${index * 70}ms` }}>
                    <div className="flex items-start justify-between">
                      <span className="text-[12px] text-[#AFDDFF] group-hover:text-black/60">{item.number}.</span>
                      <Icon className="h-[24px] w-[24px] text-[#AFDDFF] group-hover:text-black" strokeWidth={1.25} />
                    </div>
                    <div className="mt-[78px]">
                      <span className="text-[10px] tracking-[0.14em] text-white/40 group-hover:text-black/55">{item.tag}</span>
                      <h3 className="mt-[10px] font-graphik text-[30px] leading-none">{item.title}</h3>
                      <p className="mt-[22px] text-[13px] leading-[1.75] text-white/55 group-hover:text-black/70">{item.description[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div data-reveal className="reveal mt-[70px] border-t border-white/10">
              {stackGroups.map((group) => (
                <div key={group.label} className="grid gap-[18px] border-b border-white/10 py-[22px] md:grid-cols-[180px_1fr] md:items-start">
                  <span className="text-[12px] tracking-[0.12em] text-[#AFDDFF]">[ {group.label} ]</span>
                  <div className="flex flex-wrap gap-x-[22px] gap-y-[10px]">
                    {group.items.map((item) => <span key={item} className="text-[14px] text-white/70">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="relative border-b border-white/10 px-5 py-[90px] md:px-[35px] md:py-[130px]">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel number="03">{t.sections[2]}</SectionLabel>
            <div data-reveal className="reveal mt-[45px] grid gap-[38px] lg:grid-cols-[0.72fr_1.28fr] lg:gap-[100px]">
              <div>
                <h2 className="font-graphik text-[42px] leading-[1.02] tracking-[-0.025em] sm:text-[58px] md:text-[72px]">{t.experienceTitle[0]}<br />{t.experienceTitle[1]}</h2>
                <p className="mt-[28px] max-w-[390px] text-[15px] leading-[1.75] text-white/55">{t.experienceIntro}</p>
              </div>
              <div className="border-t border-white/10">
                {experience.map((item, index) => (
                  <article data-reveal key={item.context} className="reveal group grid gap-[20px] border-b border-white/10 py-[32px] md:grid-cols-[120px_1fr] md:py-[40px]" style={{ transitionDelay: `${index * 90}ms` }}>
                    <div>
                      <span className="text-[12px] text-[#AFDDFF]">0{index + 1}.</span>
                      <p className="mt-[8px] text-[10px] tracking-[0.12em] text-white/35">{item.period[language]}</p>
                    </div>
                    <div>
                      <span className="text-[11px] tracking-[0.13em] text-[#AFDDFF]">{item.context}</span>
                      <h3 className="mt-[8px] font-graphik text-[28px] leading-[1.1] sm:text-[34px]">{item.role[language]}</h3>
                      <p className="mt-[18px] max-w-[680px] text-[14px] leading-[1.75] text-white/55">{item.detail[language]}</p>
                      <div className="mt-[22px] flex flex-wrap gap-[8px]">
                        {item.highlights[language].map((highlight) => <span key={highlight} className="border border-white/15 px-[10px] py-[6px] text-[10px] tracking-[0.08em] text-white/60 transition-colors group-hover:border-[#AFDDFF]/50 group-hover:text-[#AFDDFF]">{highlight}</span>)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="relative border-b border-white/10 px-5 py-[90px] md:px-[35px] md:py-[130px]">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel number="04">{t.sections[3]}</SectionLabel>
            <div data-reveal className="reveal mt-[50px] grid gap-[24px] lg:grid-cols-2">
              <article className="relative min-h-[360px] border border-white/10 p-[28px] md:p-[38px]">
                <div className="flex items-start justify-between">
                  <span className="bg-[#AFDDFF] px-[7px] py-[3px] text-[10px] tracking-[0.12em] text-black">{t.academicPath}</span>
                  <GraduationCap className="h-[28px] w-[28px] text-[#AFDDFF]" strokeWidth={1.25} />
                </div>
                <div className="mt-[80px]">
                  <h3 className="max-w-[520px] font-graphik text-[32px] leading-[1.15] sm:text-[40px]">{t.degree}</h3>
                  <p className="mt-[16px] text-[15px] leading-[1.7] text-white/60">{t.university}</p>
                </div>
                <span className="absolute bottom-[28px] left-[28px] text-[10px] tracking-[0.12em] text-white/30 md:bottom-[38px] md:left-[38px]">{t.locationCode}</span>
              </article>

              <article className="relative min-h-[360px] border border-[#AFDDFF]/45 p-[28px] md:p-[38px]">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] tracking-[0.12em] text-[#AFDDFF]">[ {t.thesisLabel} ]</span>
                  <Code2 className="h-[28px] w-[28px] text-[#AFDDFF]" strokeWidth={1.25} />
                </div>
                <h3 className="mt-[62px] max-w-[620px] font-graphik text-[25px] leading-[1.25] sm:text-[32px]">{t.thesis}</h3>
                <div className="absolute bottom-[28px] left-[28px] flex flex-wrap gap-[8px] md:bottom-[38px] md:left-[38px]">
                  {['NLP', 'MACHINE_LEARNING', 'RECOMMENDATION'].map((item) => <span key={item} className="text-[10px] tracking-[0.1em] text-white/35">{item}</span>)}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-[78vh] px-5 py-[90px] md:px-[35px] md:py-[130px]">
          <div data-reveal className="reveal mx-auto flex min-h-[58vh] max-w-[1440px] flex-col">
            <SectionLabel number="05">{t.sections[4]}</SectionLabel>
            <div className="my-auto py-[70px]">
              <p className="text-[12px] tracking-[0.13em] text-[#AFDDFF]">{t.haveProject}</p>
              <a href="mailto:huanhuynh2402@gmail.com" className="group mt-[18px] inline-flex items-end gap-[16px] font-graphik text-[42px] leading-[0.95] tracking-[-0.035em] sm:text-[66px] md:text-[90px] lg:text-[112px]">
                {t.contactTitle}
                <ArrowUpRight className="mb-[5px] h-[32px] w-[32px] shrink-0 text-[#AFDDFF] transition-transform group-hover:-translate-y-[5px] group-hover:translate-x-[5px] sm:h-[46px] sm:w-[46px] md:h-[62px] md:w-[62px]" strokeWidth={1} />
              </a>
            </div>

            <div className="grid gap-[24px] border-t border-white/10 pt-[28px] sm:grid-cols-2 md:grid-cols-3">
              <a href="mailto:huanhuynh2402@gmail.com" className="group flex items-center gap-[12px] text-[13px] text-white/65 hover:text-[#AFDDFF]"><Mail className="h-[16px] w-[16px]" strokeWidth={1.5} /> huanhuynh2402@gmail.com</a>
              <span className="flex items-center gap-[12px] text-[13px] text-white/65"><MapPin className="h-[16px] w-[16px]" strokeWidth={1.5} /> {t.location}</span>
              <span className="text-[11px] tracking-[0.12em] text-white/30 md:text-right">© 2026 HUỲNH NGỌC HUÂN</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
