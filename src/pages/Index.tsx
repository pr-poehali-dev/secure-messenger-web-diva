import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'auth', label: 'Авторизация', icon: 'KeyRound' },
  { id: 'contacts', label: 'Контакты', icon: 'Users' },
  { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
  { id: 'profile', label: 'Профиль', icon: 'UserCircle2' },
  { id: 'premium', label: 'Премиум', icon: 'Sparkles' },
  { id: 'settings', label: 'Настройки', icon: 'Settings2' },
];

const chats = [
  { name: 'Аня · команда', msg: 'Закинула макет, гляньте 👀', time: '12:04', unread: 3, color: 'from-orange-400 to-pink-500', online: true },
  { name: 'Космо-чат 🚀', msg: 'Марк: запуск через 5 минут', time: '11:48', unread: 12, color: 'from-violet-500 to-fuchsia-500', online: true },
  { name: 'Лиза', msg: 'Голосовое · 0:42', time: '10:30', unread: 0, color: 'from-amber-400 to-orange-500', online: false },
  { name: 'Папа', msg: 'Перевёл ₽5 000 за билеты', time: 'Вчера', unread: 0, color: 'from-purple-600 to-indigo-600', online: false },
];

const features = [
  { icon: 'CreditCard', title: 'Платежи внутри чата', desc: 'Отправляй деньги другу так же легко, как стикер. Без комиссий между своими.', tag: 'Платежи' },
  { icon: 'Phone', title: 'HD-звонки и видео', desc: 'Кристальный звук, шумодав на ИИ и групповые звонки до 100 человек.', tag: 'Звонки' },
  { icon: 'Image', title: 'Медиа без сжатия', desc: 'Фото и видео в оригинале — до 4 ГБ за один файл и облако на терабайты.', tag: 'Медиа' },
  { icon: 'Smile', title: 'Живые аватарки', desc: 'Анимированные 3D-аватары, которые повторяют твою мимику в звонках.', tag: 'Аватарки' },
  { icon: 'Globe2', title: 'Социальное', desc: 'Истории, каналы, сообщества и публичные ленты — всё в одном приложении.', tag: 'Соцсеть' },
];

const Index = () => {
  const [active, setActive] = useState('chats');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden grain">
      {/* BG blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-orange/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-brand-violet/30 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-fuchsia-300/40 blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-brand-ink flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-violet" />
              <Icon name="MessageSquareDashed" size={20} className="relative text-white" />
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight">orbit<span className="text-brand-orange">.</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="hover:text-brand-orange transition-colors" href="#features">Возможности</a>
            <a className="hover:text-brand-orange transition-colors" href="#app">Приложение</a>
            <a className="hover:text-brand-orange transition-colors" href="#premium">Премиум</a>
          </nav>
          <Button className="rounded-full bg-brand-ink hover:bg-brand-violet text-white px-6 h-11 font-semibold">
            Скачать
            <Icon name="ArrowUpRight" size={16} className="ml-1" />
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-orange" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase">Запуск 2026 · бета открыта</span>
            </div>

            <h1 className="font-display font-black text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-tight text-balance">
              Мессенджер,
              <br />
              где живёт <span className="gradient-text italic">всё</span>
              <br />
              что важно.
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Чаты, звонки, платежи, медиа и соцсеть — в одном месте. Без рекламы, с шифрованием и оранжево-фиолетовым настроением.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="rounded-full h-14 px-8 bg-brand-orange hover:bg-brand-orange/90 text-white text-base font-semibold shadow-lg shadow-brand-orange/30">
                <Icon name="Apple" size={18} className="mr-2" />
                Скачать на iOS
              </Button>
              <Button variant="outline" className="rounded-full h-14 px-8 border-2 border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white text-base font-semibold">
                <Icon name="Smartphone" size={18} className="mr-2" />
                Android · APK
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {['from-orange-400 to-pink-500','from-violet-500 to-fuchsia-500','from-amber-400 to-orange-500','from-purple-600 to-indigo-600'].map((c,i)=>(
                  <div key={i} className={`w-11 h-11 rounded-full bg-gradient-to-br ${c} ring-4 ring-background`} />
                ))}
              </div>
              <div className="text-sm">
                <div className="font-bold">2,4 млн человек</div>
                <div className="text-muted-foreground">уже в орбите</div>
              </div>
            </div>
          </div>

          {/* Phone mock */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-[320px] animate-float">
              <div className="absolute -inset-8 bg-gradient-to-br from-brand-orange to-brand-violet rounded-[3rem] blur-2xl opacity-30" />
              <div className="relative rounded-[2.5rem] bg-brand-ink p-3 shadow-2xl">
                <div className="rounded-[2rem] bg-background overflow-hidden">
                  <div className="h-7 bg-brand-ink flex items-center justify-center">
                    <div className="w-20 h-5 bg-brand-ink rounded-b-2xl" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div className="font-display font-extrabold text-xl">Чаты</div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><Icon name="Search" size={14} /></div>
                        <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center"><Icon name="Plus" size={14} className="text-white" /></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {chats.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-muted/50 transition-colors">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color}`} />
                            {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-background" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <div className="font-semibold text-sm truncate">{c.name}</div>
                              <div className="text-[10px] text-muted-foreground">{c.time}</div>
                            </div>
                            <div className="flex justify-between items-center mt-0.5">
                              <div className="text-xs text-muted-foreground truncate pr-2">{c.msg}</div>
                              {c.unread > 0 && <div className="bg-brand-orange text-white text-[10px] font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">{c.unread}</div>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-around pt-4 border-t border-border">
                      {sections.slice(0, 5).map(s => (
                        <Icon key={s.id} name={s.icon} size={18} className={s.id === 'chats' ? 'text-brand-orange' : 'text-muted-foreground'} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -left-10 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 rotate-[-8deg]">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Icon name="Phone" size={14} className="text-green-600" /></div>
                <div className="text-xs"><div className="font-bold">Звонок</div><div className="text-muted-foreground">02:14</div></div>
              </div>
              <div className="absolute -bottom-4 -right-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 rotate-[6deg]">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center"><Icon name="CreditCard" size={14} className="text-brand-orange" /></div>
                <div className="text-xs"><div className="font-bold">+ ₽5 000</div><div className="text-muted-foreground">от Папы</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS PILL ROW */}
      <section id="app" className="border-y border-border bg-brand-ink text-white overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-6">
          {[...sections, ...sections, ...sections].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-8 font-display font-extrabold text-2xl">
              <Icon name={s.icon} size={22} className="text-brand-orange" />
              {s.label}
              <span className="text-brand-violet text-3xl">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-sm font-bold tracking-widest uppercase text-brand-orange mb-4">Что внутри</div>
            <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight max-w-3xl text-balance">
              Пять причин <span className="gradient-text italic">остаться</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-lg">Никаких компромиссов: каждая функция доведена до уровня, в котором её хочется показывать друзьям.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5">
          {features.map((f, i) => {
            const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];
            const bgs = [
              'bg-brand-orange text-white',
              'bg-brand-ink text-white',
              'bg-white border border-border',
              'bg-brand-violet text-white',
              'bg-white border border-border',
            ];
            return (
              <div key={i} className={`${spans[i]} ${bgs[i]} rounded-3xl p-8 lg:p-10 group hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden`}>
                <div className="flex items-start justify-between mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-black/10 flex items-center justify-center backdrop-blur-sm">
                    <Icon name={f.icon} size={26} />
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase opacity-60">{f.tag}</span>
                </div>
                <h3 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight mb-4 text-balance">{f.title}</h3>
                <p className="opacity-80 text-base lg:text-lg leading-relaxed max-w-md">{f.desc}</p>
                <Icon name="ArrowUpRight" size={48} className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </section>

      {/* PREMIUM */}
      <section id="premium" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="relative rounded-[2.5rem] bg-brand-ink text-white p-10 lg:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-orange/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-violet/50 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
                <Icon name="Sparkles" size={14} className="text-brand-orange" />
                <span className="text-xs font-bold tracking-wider uppercase">Orbit Premium</span>
              </div>
              <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight text-balance mb-6">
                Больше орбиты — <span className="gradient-text italic">меньше границ</span>
              </h2>
              <p className="text-white/70 text-lg max-w-md mb-10">4К-видеозвонки, безлимитное облако, эксклюзивные аватарки и кэшбек 5% по всем переводам.</p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display font-black text-6xl">₽299</span>
                <span className="text-white/60">/ месяц</span>
              </div>
              <Button className="rounded-full h-14 px-8 bg-brand-orange hover:bg-brand-orange/90 text-white text-base font-semibold">
                Попробовать 7 дней бесплатно
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { icon: 'Video', t: '4К видеозвонки' },
                { icon: 'Cloud', t: 'Безлимитное облако' },
                { icon: 'Wand2', t: '3D-аватарки про-уровня' },
                { icon: 'PiggyBank', t: 'Кэшбек 5% на переводы' },
                { icon: 'Shield', t: 'Приватные исчезающие чаты' },
              ].map((x, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center"><Icon name={x.icon} size={22} className="text-white" /></div>
                  <span className="font-display font-bold text-xl">{x.t}</span>
                  <Icon name="Check" size={20} className="ml-auto text-brand-orange" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA + FOOTER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="text-center py-16">
          <h2 className="font-display font-black text-5xl lg:text-8xl tracking-tighter text-balance">
            Поехали в <span className="gradient-text italic">orbit</span>?
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button className="rounded-full h-14 px-10 bg-brand-ink text-white hover:bg-brand-violet text-base font-semibold">Создать аккаунт</Button>
            <Button variant="ghost" className="rounded-full h-14 px-10 text-base font-semibold">Узнать больше →</Button>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-muted-foreground">
          <div>© 2026 orbit. Сделано на Земле, работает в любой галактике.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-orange">Конфиденциальность</a>
            <a href="#" className="hover:text-brand-orange">Поддержка</a>
            <a href="#" className="hover:text-brand-orange">Telegram</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
