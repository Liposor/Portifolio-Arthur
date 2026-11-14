import { useEffect } from 'react'

export function useMotion() {
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: no-preference)')
    const root = document.documentElement
    const cursor = document.querySelector<HTMLElement>('.custom-cursor')
    let frame = 0
    function updateProgress() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const range = root.scrollHeight - innerHeight
        root.style.setProperty('--progress', String(range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0))
      })
    }
    function moveCursor(event: PointerEvent) {
      if (!cursor) return
      const target = event.target instanceof Element && event.target.closest<HTMLElement>('[data-cursor]')
      if (!target || event.pointerType !== 'mouse' || !motion.matches) {
        cursor.hidden = true
        return
      }
      cursor.textContent = target.dataset.cursor ?? ''
      cursor.style.translate = `${event.clientX + 18}px ${event.clientY + 14}px`
      cursor.hidden = false
    }
    function hideCursor() { if (cursor) cursor.hidden = true }

    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue
        if (motion.matches) target.classList.add('reveal-in')
        observer?.unobserve(target)
      }
    }, { threshold: .13 }) : null
    document.querySelectorAll('[data-reveal]').forEach(element => observer?.observe(element))
    const resize = new ResizeObserver(updateProgress)
    resize.observe(document.body)
    updateProgress()
    addEventListener('scroll', updateProgress, { passive: true })
    addEventListener('resize', updateProgress)
    document.addEventListener('pointermove', moveCursor, { passive: true })
    root.addEventListener('pointerleave', hideCursor)
    motion.addEventListener('change', hideCursor)
    return () => {
      observer?.disconnect()
      resize.disconnect()
      cancelAnimationFrame(frame)
      removeEventListener('scroll', updateProgress)
      removeEventListener('resize', updateProgress)
      document.removeEventListener('pointermove', moveCursor)
      root.removeEventListener('pointerleave', hideCursor)
      motion.removeEventListener('change', hideCursor)
    }
  }, [])
}
