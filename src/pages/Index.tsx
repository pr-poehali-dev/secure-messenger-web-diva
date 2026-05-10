import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const AUTH_URL = 'https://functions.poehali.dev/f4756c51-6da6-49bf-9844-8115847eeeef';

type User = { id: number; login: string; name: string; is_premium: boolean };

const sections = [
  { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
  { id: 'contacts', label: 'Контакты', icon: 'Users' },
  { id: 'calls', label: 'Звонки', icon: 'Phone' },
  { id: 'profile', label: 'Профиль', icon: 'UserCircle2' },
  { id: 'settings', label: 'Настройки', icon: 'Settings2' },
];

const demoChats = [
  { name: 'Аня · команда', msg: 'Закинула макет, гляньте 👀', time: '12:04', unread: 3, color: 'from-orange-400 to-pink-500', online: true },
  { name: 'Diva-чат ✨', msg: 'Марк: запуск через 5 минут', time: '11:48', unread: 12, color: 'from-violet-500 to-fuchsia-500', online: true },
  { name: 'Лиза', msg: 'Голосовое · 0:42', time: '10:30', unread: 0, color: 'from-amber-400 to-orange-500', online: false },
  { name: 'Папа', msg: 'Перевёл ₽5 000 за билеты', time: 'Вчера', unread: 0, color: 'from-purple-600 to-indigo-600', online: false },
];

const features = [
  { icon: 'CreditCard', title: 'Платежи внутри чата', desc: 'Отправляй деньги другу так же легко, как стикер.', tag: 'Платежи' },
  { icon: 'Phone', title: 'HD-звонки и видео', desc: 'Кристальный звук, шумодав на ИИ и группы до 100 человек.', tag: 'Звонки' },
  { icon: 'Image', title: 'Медиа без сжатия', desc: 'Фото и видео в оригинале — до 4 ГБ за файл.', tag: 'Медиа' },
  { icon: 'Smile', title: 'Живые аватарки', desc: '3D-аватары, повторяющие твою мимику в звонках.', tag: 'Аватарки' },
  { icon: 'Globe2', title: 'Социальное', desc: 'Истории, каналы и публичные ленты в одном месте.', tag: 'Соцсеть' },
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ login: '', password: '', name: '' });
  const [activeTab, setActiveTab] = useState('chats');

  useEffect(() => {
    const saved = localStorage.getItem('webdiva_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem('webdiva_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('webdiva_user');
    toast({ title: 'Вы вышли из аккаунта' });
  };

  const submitAuth = async () => {
    if (!form.login.trim() || !form.password.trim()) {
      toast({ title: 'Заполни логин и пароль', variant: 'destructive' });
      return;
    }
    if (authMode === 'register' && !form.name.trim()) {
      toast({ title: 'Введи имя', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authMode,
          login: form.login.trim(),
          password: form.password,
          name: form.name.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast({ title: data.error || 'Ошибка', variant: 'destructive' });
        return;
      }
      saveUser(data.user);
      setAuthOpen(false);
      setForm({ login: '', password: '', name: '' });
      toast({ title: authMode === 'register' ? `Привет, ${data.user.name}!` : 'С возвращением!' });
    } catch (e) {
      toast({ title: 'Сеть недоступна', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const buyPremium = async () => {
    if (!user) {
      setAuthMode('register');
      setAuthOpen(true);
      toast({ title: 'Сначала войди в аккаунт' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'premium', user_id: user.id, login: user.login, password: 'x' }),
      });
      const data = await res.json();
      if (data.success) {
        saveUser(data.user);
        toast({ title: 'Премиум активирован ✨' });
      } else {
        toast({ title: 'Не получилось', variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  const openAuth = (mode: 'register' | 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background grain">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-orange/20 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-brand-violet/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>

        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-violet" />
                <Icon name="Sparkles" size={20} className="relative text-white m-2.5" />
              </div>
              <span className="font-display text-2xl font-extrabold tracking-tight">web<span className="text-brand-orange">-</span>Diva</span>
            </div>
            <div className="flex items-center gap-3">
              {user.is_premium && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-violet text-white text-xs font-bold">
                  <Icon name="Sparkles" size={12} /> PREMIUM
                </span>
              )}
              <Button onClick={logout} variant="ghost" className="rounded-full">
                <Icon name="LogOut" size={18} className="mr-2" /> Выйти
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10 animate-fade-in">
            <div className="text-sm font-bold tracking-widest uppercase text-brand-orange mb-3">Личный кабинет</div>
            <h1 className="font-display font-black text-5xl lg:text-6xl tracking-tight">
              Привет, <span className="gradient-text italic">{user.name}</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">@{user.login}</p>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => { setActiveTab(s.id); }}
                className={`flex items-center gap-2 px-5 h-12 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === s.id ? 'bg-brand-ink text-white' : 'bg-white border border-border hover:border-brand-orange'
                }`}
              >
                <Icon name={s.icon} size={16} /> {s.label}
              </button>
            ))}
          </div>

          {activeTab === 'chats' && (
            <div className="bg-white rounded-3xl border border-border p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-extrabold text-2xl">Чаты</h2>
                <Button onClick={() => toast({ title: 'Новый чат — скоро' })} className="rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Icon name="Plus" size={16} className="mr-1" /> Новый
                </Button>
              </div>
              <div className="space-y-2">
                {demoChats.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => toast({ title: `Открываем чат: ${c.name}` })}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${c.color}`} />
                      {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div className="font-bold">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.time}</div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm text-muted-foreground truncate pr-3">{c.msg}</div>
                        {c.unread > 0 && <div className="bg-brand-orange text-white text-xs font-bold rounded-full h-6 min-w-6 px-2 flex items-center justify-center">{c.unread}</div>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bg-white rounded-3xl border border-border p-8 text-center">
              <Icon name="Users" size={48} className="mx-auto text-brand-violet mb-4" />
              <h2 className="font-display font-extrabold text-2xl mb-2">Контакты</h2>
              <p className="text-muted-foreground mb-6">Добавь друзей по логину</p>
              <Button onClick={() => toast({ title: 'Импорт контактов — скоро' })} className="rounded-full bg-brand-violet hover:bg-brand-violet/90 text-white">
                <Icon name="UserPlus" size={16} className="mr-2" /> Добавить контакт
              </Button>
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="bg-white rounded-3xl border border-border p-8 text-center">
              <Icon name="Phone" size={48} className="mx-auto text-brand-orange mb-4" />
              <h2 className="font-display font-extrabold text-2xl mb-2">Звонки</h2>
              <p className="text-muted-foreground mb-6">HD-звук и видео без задержек</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => toast({ title: 'Аудиозвонок — скоро' })} className="rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Icon name="Phone" size={16} className="mr-2" /> Позвонить
                </Button>
                <Button onClick={() => toast({ title: 'Видеозвонок — скоро' })} variant="outline" className="rounded-full">
                  <Icon name="Video" size={16} className="mr-2" /> Видео
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-border p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-orange to-brand-violet flex items-center justify-center text-white font-display font-black text-3xl">
                  {user.name[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl">{user.name}</div>
                  <div className="text-muted-foreground">@{user.login}</div>
                  {user.is_premium && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-orange to-brand-violet text-white text-xs font-bold">
                      <Icon name="Sparkles" size={10} /> PREMIUM
                    </span>
                  )}
                </div>
              </div>
              {!user.is_premium && (
                <Button onClick={buyPremium} disabled={loading} className="w-full rounded-2xl h-14 bg-gradient-to-r from-brand-orange to-brand-violet text-white font-bold text-base">
                  <Icon name="Sparkles" size={18} className="mr-2" /> Подключить Premium за ₽10
                </Button>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-border p-6 lg:p-8 space-y-2">
              {[
                { icon: 'Bell', t: 'Уведомления' },
                { icon: 'Lock', t: 'Конфиденциальность' },
                { icon: 'Palette', t: 'Внешний вид' },
                { icon: 'Globe', t: 'Язык' },
                { icon: 'HelpCircle', t: 'Помощь' },
              ].map((it, i) => (
                <button
                  key={i}
                  onClick={() => toast({ title: `${it.t} — скоро` })}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Icon name={it.icon} size={18} />
                  </div>
                  <span className="font-semibold flex-1">{it.t}</span>
                  <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden grain">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-orange/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-brand-violet/30 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-fuchsia-300/40 blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-violet" />
              <Icon name="Sparkles" size={20} className="relative text-white m-2.5" />
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight">web<span className="text-brand-orange">-</span>Diva</span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('features')} className="hover:text-brand-orange transition-colors">Возможности</button>
            <button onClick={() => scrollTo('premium')} className="hover:text-brand-orange transition-colors">Премиум</button>
            <button onClick={() => openAuth('login')} className="hover:text-brand-orange transition-colors">Войти</button>
          </nav>
          <Button onClick={() => openAuth('register')} className="rounded-full bg-brand-ink hover:bg-brand-violet text-white px-6 h-11 font-semibold">
            Регистрация <Icon name="ArrowUpRight" size={16} className="ml-1" />
          </Button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-orange" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase">Бета открыта</span>
            </div>

            <h1 className="font-display font-black text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-tight text-balance">
              Мессенджер,
              <br />
              где живёт <span className="gradient-text italic">всё</span>
              <br />
              что важно.
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Чаты, звонки, платежи, медиа и соцсеть — в одном месте.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button onClick={() => openAuth('register')} className="rounded-full h-14 px-8 bg-brand-orange hover:bg-brand-orange/90 text-white text-base font-semibold shadow-lg shadow-brand-orange/30">
                Создать аккаунт <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button onClick={() => openAuth('login')} variant="outline" className="rounded-full h-14 px-8 border-2 border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white text-base font-semibold">
                Уже есть аккаунт
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
                <div className="text-muted-foreground">уже в web-Diva</div>
              </div>
            </div>
          </div>

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
                      {demoChats.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-2xl">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-ink text-white overflow-hidden">
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

      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-sm font-bold tracking-widest uppercase text-brand-orange mb-4">Что внутри</div>
            <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight max-w-3xl text-balance">
              Пять причин <span className="gradient-text italic">остаться</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5">
          {features.map((f, i) => {
            const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];
            const bgs = ['bg-brand-orange text-white','bg-brand-ink text-white','bg-white border border-border','bg-brand-violet text-white','bg-white border border-border'];
            return (
              <button
                key={i}
                onClick={() => openAuth('register')}
                className={`${spans[i]} ${bgs[i]} rounded-3xl p-8 lg:p-10 group hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden text-left`}
              >
                <div className="flex items-start justify-between mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-black/10 flex items-center justify-center backdrop-blur-sm">
                    <Icon name={f.icon} size={26} />
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase opacity-60">{f.tag}</span>
                </div>
                <h3 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight mb-4 text-balance">{f.title}</h3>
                <p className="opacity-80 text-base lg:text-lg leading-relaxed max-w-md">{f.desc}</p>
                <Icon name="ArrowUpRight" size={48} className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
              </button>
            );
          })}
        </div>
      </section>

      <section id="premium" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="relative rounded-[2.5rem] bg-brand-ink text-white p-10 lg:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-orange/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-violet/50 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
                <Icon name="Sparkles" size={14} className="text-brand-orange" />
                <span className="text-xs font-bold tracking-wider uppercase">web-Diva Premium</span>
              </div>
              <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight text-balance mb-6">
                Премиум за <span className="gradient-text italic">десятку</span>
              </h2>
              <p className="text-white/70 text-lg max-w-md mb-10">4К-видеозвонки, безлимитное облако, эксклюзивные аватарки и кэшбек 5%.</p>
              <div className="flex items-baseline gap-3 mb-10">
                <span className="font-display font-black text-7xl lg:text-8xl">₽10</span>
                <span className="text-white/60 text-lg">/ месяц</span>
              </div>
              <Button onClick={buyPremium} className="rounded-full h-14 px-8 bg-brand-orange hover:bg-brand-orange/90 text-white text-base font-semibold">
                Подключить за ₽10 <Icon name="ArrowRight" size={18} className="ml-2" />
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
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center"><Icon name={x.icon} size={22} className="text-white" /></div>
                  <span className="font-display font-bold text-xl">{x.t}</span>
                  <Icon name="Check" size={20} className="ml-auto text-brand-orange" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="text-center py-16">
          <h2 className="font-display font-black text-5xl lg:text-8xl tracking-tighter text-balance">
            Готова стать <span className="gradient-text italic">Diva</span>?
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button onClick={() => openAuth('register')} className="rounded-full h-14 px-10 bg-brand-ink text-white hover:bg-brand-violet text-base font-semibold">Создать аккаунт</Button>
            <Button onClick={() => openAuth('login')} variant="ghost" className="rounded-full h-14 px-10 text-base font-semibold">Войти →</Button>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-muted-foreground">
          <div>© 2026 web-Diva.</div>
          <div className="flex gap-6">
            <button onClick={() => toast({ title: 'Скоро' })} className="hover:text-brand-orange">Конфиденциальность</button>
            <button onClick={() => toast({ title: 'Скоро' })} className="hover:text-brand-orange">Поддержка</button>
            <button onClick={() => toast({ title: 'Скоро' })} className="hover:text-brand-orange">Telegram</button>
          </div>
        </div>
      </section>

      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm" onClick={() => setAuthOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
            <button onClick={() => setAuthOpen(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-border">
              <Icon name="X" size={18} />
            </button>
            <div className="flex gap-2 mb-7 p-1 bg-muted rounded-full">
              <button onClick={() => setAuthMode('register')} className={`flex-1 h-10 rounded-full text-sm font-semibold transition-all ${authMode === 'register' ? 'bg-brand-ink text-white' : 'text-muted-foreground'}`}>
                Регистрация
              </button>
              <button onClick={() => setAuthMode('login')} className={`flex-1 h-10 rounded-full text-sm font-semibold transition-all ${authMode === 'login' ? 'bg-brand-ink text-white' : 'text-muted-foreground'}`}>
                Вход
              </button>
            </div>
            <h2 className="font-display font-black text-3xl tracking-tight mb-1">
              {authMode === 'register' ? 'Добро пожаловать' : 'С возвращением'}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              {authMode === 'register' ? 'Создай аккаунт за 10 секунд' : 'Введи логин и пароль'}
            </p>
            <div className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <Label className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Имя</Label>
                  <Input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="mt-2 h-12 rounded-2xl"
                    placeholder="Как тебя звать?"
                  />
                </div>
              )}
              <div>
                <Label className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Логин (email или телефон)</Label>
                <Input
                  value={form.login}
                  onChange={e => setForm({ ...form, login: e.target.value })}
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="you@web-diva.app или +7..."
                />
              </div>
              <div>
                <Label className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Пароль</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && submitAuth()}
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="Минимум 4 символа"
                />
              </div>
              <Button
                onClick={submitAuth}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-base shadow-lg shadow-brand-orange/30"
              >
                {loading ? 'Минутку...' : authMode === 'register' ? 'Создать аккаунт' : 'Войти'}
                {!loading && <Icon name="ArrowRight" size={18} className="ml-2" />}
              </Button>
              <button
                onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
                className="w-full text-center text-sm text-muted-foreground hover:text-brand-orange"
              >
                {authMode === 'register' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;