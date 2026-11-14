import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { KineticText, RollLabel } from './KineticText'
import type { PointerEvent } from 'react'

export function Action({ href, children, primary = false, outbound = false }: {
  href: string
  children: string
  primary?: boolean
  outbound?: boolean
}) {
  const Icon = outbound ? ArrowUpRight : ArrowDownRight
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== 'mouse' || !matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.translate = `${(event.clientX - rect.left - rect.width / 2) * .07}px ${(event.clientY - rect.top - rect.height / 2) * .13}px`
  }
  return (
    <a className={`action ${primary ? 'action-primary' : ''}`} href={href}
      onPointerMove={move} onPointerLeave={event => { event.currentTarget.style.translate = '' }}>
      <RollLabel text={children} /><Icon size={18} aria-hidden="true" />
    </a>
  )
}

export function Availability() {
  return <span className="availability">
    <i aria-hidden="true" />
    <span className="sr-only">Aberto a novos projetos</span>
    <KineticText lines={['Aberto a novos projetos']} />
  </span>
}
