import { FC, ReactNode, useCallback, useEffect, useRef } from 'react'

import useResizeObserver, { ObservedSize } from 'use-resize-observer'

interface AccordionProps {
  children: ReactNode
  className?: string
  open: boolean
}

const Accordion: FC<AccordionProps> = ({ open, children, className = '' }) => {
  const accordionRef = useRef<HTMLDivElement | null>(null)
  const onResize = useCallback((size: ObservedSize) => {
    if (accordionRef.current) {
      accordionRef.current.style.setProperty('--h', size.height ? `${size.height}px` : '')
    }
  }, [])

  const { ref } = useResizeObserver({ onResize })

  useEffect(() => {
    const removeOverflow = (e: AnimationEvent): void => {
      if (e.animationName === 'open') accordionRef.current?.style.setProperty('overflow', 'visible')
    }
    const addOverflow = (e: AnimationEvent): void => {
      if (e.animationName === 'closing') accordionRef.current?.style.removeProperty('overflow')
    }

    accordionRef.current?.addEventListener('animationend', removeOverflow)
    accordionRef.current?.addEventListener('animationstart', addOverflow)
  }, [])

  useEffect(() => {
    if (open) {
      accordionRef.current?.setAttribute('open', '')
      accordionRef.current?.removeAttribute('closing')
    } else {
      accordionRef.current?.setAttribute('closing', '')
      accordionRef.current?.removeAttribute('open')
    }
  }, [open])

  return (
    <div className={className}>
      <div
        ref={accordionRef}
        {...{ open }}
        className="pointer-events-none animate-opening overflow-hidden will-change-[height] open:pointer-events-auto [&[closing]]:animate-closing"
      >
        <div ref={ref}>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
