import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { DecodeText, KineticText } from '../components/KineticText'
import { AchievementToast, useAchievement } from '../components/Achievement'
import { VideoPlayer } from '../components/Video'
import { asset } from '../utils/media'

const visible = projects.filter(project => project.status !== 'draft')
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
const pageSize = 2
const categories = [...new Set(visible.map(project => project.category))]

export function Gallery() {
  const [category, setCategory] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hover, setHover] = useState<string | null>(null)
  const [active, setActive] = useState<Project | null>(null)
  const achievement = useAchievement()
  const dialog = useRef<HTMLDialogElement>(null)

  const filtered = category ? visible.filter(project => project.category === category) : visible
  const lastPage = Math.max(0, Math.ceil(filtered.length / pageSize) - 1)
  const first = Math.min(page * pageSize, Math.max(0, filtered.length - pageSize))
  const shown = filtered.slice(first, first + pageSize)

  function changePage(next: number) {
    setHover(null)
    setPage(next)
  }

  useEffect(() => {
    if (active && !dialog.current?.open) dialog.current?.showModal()
  }, [active])

  return (
    <section className="section shell" id="projetos" tabIndex={-1} aria-labelledby="work-title">
      <div className="eyebrow" data-reveal><span>01</span> <DecodeText text="Portfólio" /></div>
      <div className="section-heading">
        <h2 id="work-title" data-reveal aria-label="Trabalhos."><KineticText lines={["Trabalhos."]} /></h2>
        <p>Edição de vídeo com foco em ritmo, narrativa e identidade visual.</p>
      </div>
      {categories.length > 0 && (
        <div className="filters" aria-label="Filtrar por categoria">
          {[null, ...categories].map(item => (
            <button key={item ?? '__all'} aria-pressed={category === item} onClick={() => {
              changePage(0)
              setCategory(item)
            }}>{item ?? 'Todos'}</button>
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <article className="work-empty" data-reveal>
          <img src={asset('images/gallery.svg')} alt="" loading="lazy" width="800" height="880" />
          <div className="work-empty-copy">
            <span className="status"><i /> <DecodeText text="Em preparação" /></span>
            <h3>Edições de<br />gameplay</h3>
            <p>Estou organizando minhas edições para compartilhar aqui.</p>
          </div>
        </article>
      ) : (
        <>
        <div className="work-grid" id="work-grid">
          {shown.map(project => {
            const published = project.status === 'published'
            const video = published ? project.video : undefined
            const external = published && /^https:\/\//i.test(project.externalUrl ?? '') ? project.externalUrl : undefined
            const poster = project.thumbnail ?? video?.poster
            const unavailable = !video && !external
            const thumbnail = (
              <>
                <img src={asset(poster ?? 'images/gallery.svg')} alt="" loading="lazy" width="960" height="540" />
                {video && hover === project.id && <VideoPlayer title={project.title} video={video} preview />}
                {!unavailable && <span className="media-icon">{video ? <Play /> : <ArrowUpRight />}</span>}
              </>
            )
            return (
              <article className="work-card" key={project.id} id={`projeto-${project.slug}`}>
                {video ? (
                  <button className="work-media" aria-label={`Reproduzir ${project.title}`} data-cursor="PLAY"
                    onPointerEnter={event => {
                      if (event.pointerType === 'mouse' && matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) setHover(project.id)
                    }} onPointerLeave={() => setHover(null)} onClick={() => { setHover(null); setActive(project) }}>
                    {thumbnail}
                  </button>
                ) : external ? (
                  <a className="work-media" href={external} data-cursor="VIEW" aria-label={`Ver ${project.title}`}>{thumbnail}</a>
                ) : <div className="work-media">{thumbnail}<span className="status"><i /> <DecodeText text="Em preparação" /></span></div>}
                <div className="work-info">
                  <span className="mono">{project.category}{project.year ? ` / ${project.year}` : ''}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {!!project.tools?.length && <p className="mono">{project.tools.join(' · ')}</p>}
                </div>
              </article>
            )
          })}
        </div>
        {lastPage > 0 && (
          <nav className="work-pagination" aria-label="Navegação dos trabalhos">
            <span className="mono" role="status">{first + 1}–{first + shown.length} de {filtered.length}</span>
            <button type="button" className="icon-button" aria-label="Ver trabalhos anteriores"
              aria-controls="work-grid" aria-disabled={page === 0}
              onClick={() => { if (page > 0) changePage(page - 1) }}><ChevronLeft aria-hidden="true" /></button>
            <button type="button" className="icon-button" aria-label="Ver próximos trabalhos"
              aria-controls="work-grid" aria-disabled={page === lastPage}
              onClick={() => { if (page < lastPage) changePage(page + 1) }}><ChevronRight aria-hidden="true" /></button>
          </nav>
        )}
        </>
      )}
      <dialog ref={dialog} className="video-dialog" aria-labelledby="project-dialog-title"
        onClose={() => { setActive(null); achievement.dismiss() }} onClick={event => { if (event.currentTarget === event.target) dialog.current?.close() }}>
        {active && (
          <div className="dialog-inner">
            <AchievementToast title={achievement.title} />
            <button className="icon-button" aria-label="Fechar vídeo" onClick={() => dialog.current?.close()}><X /></button>
            <h3 id="project-dialog-title">{active.title}</h3>
            {active.video && <VideoPlayer video={{ ...active.video, poster: active.video.poster ?? active.thumbnail }} title={active.title} onEnded={() => achievement.unlock(active.id, active.title)} />}
            <p>{active.description}</p>
            {active.externalUrl && /^https:\/\//i.test(active.externalUrl) && <a href={active.externalUrl}>Ver na plataforma <ArrowUpRight size={16} /></a>}
          </div>
        )}
      </dialog>
    </section>
  )
}
