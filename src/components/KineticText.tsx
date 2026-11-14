import { Fragment, useEffect, useRef, useState } from 'react'

export function KineticText({ lines }: { lines: string[] }) {
  return (
    <span className="kinetic-text" aria-hidden="true">
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line.split(' ').map((word, wordIndex) => (
            <Fragment key={wordIndex}>
              {wordIndex > 0 && ' '}
              <span className="kinetic-word">
                {Array.from(word).map((letter, letterIndex) => (
                  <span className={letter === '.' ? 'kinetic-letter period' : 'kinetic-letter'} key={letterIndex}>
                    <span>{letter}</span>
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </span>
  )
}

export function RollLabel({ text }: { text: string }) {
  return (
    <span className="roll-label">
      <span className="roll-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </span>
    </span>
  )
}

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/&+'

export function DecodeText({ text }: { text: string }) {
  const [decoded, setDecoded] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearInterval(timer.current), [])

  function animate() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    window.clearInterval(timer.current)
    const letters = Array.from(text)
    const steps = 9
    let step = 0

    function tick() {
      if (step === steps) {
        setDecoded(null)
        window.clearInterval(timer.current)
        return
      }
      const revealed = Math.floor(letters.length * step / steps)
      setDecoded(letters.map((letter, index) =>
        index < revealed || /\s/.test(letter)
          ? letter
          : glyphs[Math.floor(Math.random() * glyphs.length)]
      ).join(''))
      step += 1
    }

    tick()
    timer.current = window.setInterval(tick, 30)
  }

  return (
    <span className="decode-text" onPointerEnter={event => {
      if (event.pointerType === 'mouse') animate()
    }} data-decoding={decoded !== null ? '' : undefined}>
      <span>{text}</span>
      <span className="decode-noise" aria-hidden="true">{decoded ?? text}</span>
    </span>
  )
}
