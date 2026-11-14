import { createRoot } from 'react-dom/client'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpRight, Clapperboard, Gamepad2, Github, Instagram, Youtube, Menu, Plus, Shapes, Sparkles, X } from 'lucide-react'
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/inter/wght.css'
import { Action, Availability } from './components/Controls'
import { DecodeText, KineticText, RollLabel } from './components/KineticText'
import { VideoPlayer } from './components/Video'
import { contactLinks, profile } from './data/profile'
import { useMotion } from './hooks/useMotion'
import { Gallery } from './sections/Gallery'
import { asset } from './utils/media'
import './styles/site.css'

const nav = [
  ['Projetos', '#projetos'], ['Sobre', '#sobre'], ['Criação', '#criacao'], ['Contato', '#contato']
]
const services = [
  {
    title: 'Edição de gameplays', tag: 'Prática atual', icon: Gamepad2,
    copy: 'Edito gravações de gameplay para dar ritmo à partida e destacar os momentos que fazem a história do vídeo.',
    detail: 'Uma jogada ganha outro peso quando o corte segura a tensão e deixa a reação respirar.'
  },
  {
    title: 'Conteúdo para criadores', tag: 'Interesse', icon: Clapperboard,
    copy: 'Quero colaborar com criadores e experimentar edições que tenham a cara de cada canal.',
    detail: 'A abertura, o ritmo e a duração podem mudar conforme o jeito de falar e o público do canal.'
  },
  {
    title: 'Design visual', tag: 'Interesse', icon: Shapes,
    copy: 'Exploro composição, tipografia e cor para comunicar ideias com mais clareza.',
    detail: 'Um título bem colocado ou uma mudança de cor pode guiar o olhar para o ponto certo do quadro.'
  },
  {
    title: 'Novas ideias', tag: 'Colaboração', icon: Sparkles,
    copy: 'Tenho abertura para testar formatos, aprender técnicas e desenvolver projetos em conjunto.',
    detail: 'Podemos começar com um trecho curto, testar duas abordagens e escolher juntos a que combina mais com a ideia.'
  }
]

function ServicePanel({ id, open, children }: {
  id: string
  open: boolean
  children: React.ReactNode
}) {
  const content = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const element = content.current
    if (!element) return
    const measure = () => setHeight(element.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="service-panel" id={id} aria-hidden={!open} style={{ height: open ? height : 0 }}>
      <div ref={content}>{children}</div>
    </div>
  )
}

function ServiceCards() {
  const [openCard, setOpenCard] = useState<string | null>(null)
  const groupId = useId()

  return (
    <div className="service-list">
      {services.map(({ title, tag, copy, detail, icon: Icon }, index) => {
        const open = openCard === title
        const panelId = `${groupId}-${index}`
        return (
        <article className="service" key={title} data-open={open}>
          <button type="button" className="service-trigger" aria-expanded={open} aria-controls={panelId}
            onClick={() => setOpenCard(open ? null : title)}>
            <span className="mono"><DecodeText text={tag} /></span>
            <span className="service-title"><DecodeText text={title} /></span>
            <Plus className="service-toggle" size={22} aria-hidden="true" />
            <span className="service-copy">{copy}</span>
          </button>
          <ServicePanel id={panelId} open={open}>
            <div className="service-detail">
              <div className="service-art" aria-hidden="true"><Icon strokeWidth={1.2} /></div>
              <p>{detail}</p>
            </div>
          </ServicePanel>
        </article>
        )
      })}
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    function updateHeader() {
      header.current?.classList.toggle('header-scrolled', window.scrollY > 12)
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])
  useEffect(() => {
    if (!open) return
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [open])
  return (
    <header ref={header} className="header">
      <div className="shell header-inner">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)} aria-label="Arthur de Freitas, início">
          <span>ARTHUR<br />DE FREITAS</span>
        </a>
        <button className="menu-toggle icon-button" ref={toggle} aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'nav nav-open' : 'nav'} id="navigation" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => {
            if (open) document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true })
            setOpen(false)
          }}><RollLabel text={label} />{href === '#contato' && <ArrowUpRight size={15} />}</a>)}
        </nav>
      </div>
    </header>
  )
}

function App() {
  useMotion()
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <div className="progress" aria-hidden="true" />
      <span className="custom-cursor mono" aria-hidden="true" hidden />
      <div id="inicio" />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <section className="shell hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <DecodeText text={profile.role} />
            </div>
            <h1 id="hero-title" aria-label={profile.name}><KineticText lines={['ARTHUR', 'DE FREITAS.']} /></h1>
            <p className="tagline">Cortes que prendem.<br />Imagens que ficam.</p>
            <p className="hero-description">Transformo momentos de gameplay em vídeos com ritmo, personalidade e identidade visual.</p>
            <div className="actions">
              <Action href="#projetos" primary>Ver meus trabalhos</Action>
              <Action href="#contato" outbound>Vamos conversar</Action>
            </div>
          </div>
          {profile.showreel ? <figure className="hero-media reel">
            <VideoPlayer title="Showreel de Arthur" video={profile.showreel} />
            <figcaption className="mono">Showreel</figcaption>
          </figure> : <figure className="hero-media hero-portrait">
            <div className="hero-portrait-ambient" aria-hidden="true" />
            <img src={asset('images/arthur-retrato.jpg')} alt="Arthur de Freitas de perfil ao pôr do sol"
              fetchPriority="high" width="160" height="160" />
            <figcaption className="mono"><DecodeText text={profile.name} /></figcaption>
          </figure>}
          <div className="hero-bottom">
            <a className="mono scroll-link" href="#projetos"><ArrowDown className="scroll-arrow" size={17} aria-hidden="true" /> <DecodeText text="Role para explorar" /></a>
            <Availability />
          </div>
        </section>
        <Gallery />
        <section className="section shell about" id="sobre" tabIndex={-1} aria-labelledby="about-title">
          <div>
            <div className="eyebrow" data-reveal><span>02</span> <DecodeText text="Sobre Arthur" /></div>
            <h2 id="about-title" data-reveal aria-label="Por trás dos frames."><KineticText lines={["Por trás","dos frames."]} /></h2>
            {profile.photo && <img className="portrait" src={asset(profile.photo)} loading="lazy" alt={profile.name} width="540" height="680" />}
          </div>
          <div className="about-copy" data-reveal>
            <h3>Oi, eu sou o Arthur.</h3>
            <p>Sou estudante do Ensino Médio no Brasil e encontrei na edição de vídeo uma forma de explorar minha criatividade. Comecei com gameplays, experimentando cortes, ritmo e maneiras de contar o que acontece numa partida.</p>
            <p>Também gosto de design visual, arte e de trocar ideias com outras pessoas. Estou construindo meu portfólio e quero aprender com novos desafios e criar em conjunto.</p>
            <Availability />
          </div>
        </section>
        <section className="section shell" id="criacao" tabIndex={-1} aria-labelledby="services-title">
          <div className="eyebrow" data-reveal><span>03</span> <DecodeText text="Criação" /></div>
          <h2 id="services-title" data-reveal aria-label="O que eu posso criar."><KineticText lines={["O que eu posso criar."]} /></h2>
          <ServiceCards />
        </section>
        <section className="contact" id="contato" tabIndex={-1} aria-labelledby="contact-title">
          <div className="shell section">
            <div className="eyebrow" data-reveal><span>04</span> <DecodeText text="Contato" /></div>
            <h2 id="contact-title" data-reveal aria-label="Tem uma ideia? Vamos criar algo."><KineticText lines={["Tem uma ideia?","Vamos criar algo."]} /></h2>
            <p>Estou aberto a novos projetos, colaborações e oportunidades de edição.</p>
            {contactLinks.length === 0 && <p className="contact-note">Meus canais de contato serão adicionados em breve.</p>}
            <div className="actions">
              {contactLinks.filter(({ kind }) => kind !== 'instagram' && kind !== 'youtube').map(({ href, label }, index) => (
                <Action href={href} key={label} primary={index === 0} outbound>{label === 'E-mail' ? 'Entrar em contato' : label}</Action>
              ))}
              <Action href="#projetos">Ver projetos</Action>
            </div>
            <div className="social-links">
              {contactLinks.filter(({ kind }) => kind === 'instagram' || kind === 'youtube').map(({ kind, href, label }) => {
                const Icon = kind === 'instagram' ? Instagram : Youtube
                return <a className={`social-link ${kind}`} href={href} key={kind}>
                  <Icon size={22} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={16} aria-hidden="true" />
                </a>
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <div><strong>{profile.name}</strong><p>{profile.role}</p></div>
        <nav aria-label="Navegação do rodapé">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          {contactLinks.map(({ label, href }) => <a href={href} key={label}>{label}</a>)}
        </nav>
        <div className="footer-end"><span className="mono">© {new Date().getFullYear()}</span><a className="top-link" href="#inicio" aria-label="Voltar ao topo"><ArrowUp className="top-arrow" size={18} aria-hidden="true" /></a></div>
        <div className="footer-credit">
          <a href="https://github.com/liposor"><Github size={17} aria-hidden="true" /> Concepção e criação por Liposor</a>
        </div>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
