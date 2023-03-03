import { FC, ReactNode, useState } from 'react'

import Accordion from '@/components/common/ui/accordion/accordion'

interface AccordionWrapperProps {
  children: ReactNode
  title: string
  classes?: { wrapper?: string; title?: string }
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({
  children,
  title,
  classes = { title: '', wrapper: '' },
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${classes.wrapper} border-b border-light-gray py-5`}>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
        onClick={() => setOpen(!open)}
        className={`${classes.title} flex cursor-pointer items-center justify-between`}
      >
        <h2 className="uppercase">{title}</h2>
        <div>{open ? '-' : '+'}</div>
      </div>
      <Accordion open={open}>{children}</Accordion>
    </div>
  )
}

export default AccordionWrapper
