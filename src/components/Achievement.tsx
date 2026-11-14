import { useEffect, useRef, useState } from 'react'
import { asset } from '../utils/media'

export function useAchievement() {
  const unlocked = useRef(new Set<string>())
  const [title, setTitle] = useState<string | null>(null)

  useEffect(() => {
    if (!title) return
    const timer = window.setTimeout(() => setTitle(null), 5500)
    return () => window.clearTimeout(timer)
  }, [title])

  function unlock(id: string, projectTitle: string) {
    if (unlocked.current.has(id)) return
    unlocked.current.add(id)
    setTitle(projectTitle)
    const sound = new Audio(asset('audio/conquista.wav'))
    sound.volume = .4
    void sound.play().catch(() => {
      // O aviso visual continua disponível se o navegador bloquear o som.
    })
  }

  return { title, unlock, dismiss: () => setTitle(null) }
}

export function AchievementToast({ title }: { title: string | null }) {
  return (
    <div className={title ? 'achievement achievement-visible' : 'achievement'} role="status" aria-atomic="true">
      {title && <>
        <svg viewBox="0 0 16 16" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true">
          <path fill="#f5c63d" d="M4 2h8v1h3v5h-2V5h-1v4h-2v2H9v2h3v2H4v-2h3v-2H6V9H4V5H3v3H1V3h3z" />
          <path fill="#fff09a" d="M5 3h2v5H5z" />
        </svg>
        <div><strong>Conquista desbloqueada!</strong><span>Até o último frame · {title}</span></div>
      </>}
    </div>
  )
}
