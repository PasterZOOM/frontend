import { FC, ReactNode, useState } from 'react'

import Accordion from 'shared/ui/accordion/accordion'

interface AccordionWrapperProps {
  children: ReactNode
  classes?: { children?: string; title?: string; wrapper?: string }
  title: string
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({
  children,
  title,
  classes = { title: '', wrapper: '' },
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border-b border-light-gray dark:border-gray-500 ${classes.wrapper}`}>
      <div
        className={`${classes.title} flex cursor-pointer items-center justify-between px-4 py-5 md:px-6 xl:px-0`}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
      >
        <h2 className="uppercase">{title}</h2>
        <div>{open ? '-' : '+'}</div>
      </div>
      <Accordion open={open}>{children}</Accordion>
    </div>
  )
}

export default AccordionWrapper
