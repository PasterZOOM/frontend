import { FC, ReactNode, useState } from 'react'

import Accordion from '@/components/common/ui/accordion/accordion'

interface AccordionWrapperProps {
  children: ReactNode
  title: string
  classes?: { wrapper?: string; title?: string; children?: string }
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({
  children,
  title,
  classes = { title: '', wrapper: '' },
}) => {
  const [open, setOpen] = useState(true)

  return (
    <div className={`border-b border-light-gray dark:border-gray-500 ${classes.wrapper}`}>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
        onClick={() => setOpen(!open)}
        className={`${classes.title} flex cursor-pointer items-center justify-between py-5 px-4 md:px-6 lg:px-0`}
      >
        <h2 className="uppercase">{title}</h2>
        <div>{open ? '-' : '+'}</div>
      </div>
      <Accordion open={open}>{children}</Accordion>
    </div>
  )
}

export default AccordionWrapper
