import { FC, ReactElement, useEffect, useRef, useState } from 'react'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'

type ClassesType = {
  activeItemClassName?: string
  dropClassName?: string
  itemClassName?: string
}

type PropsType<T> = {
  activeItem: T
  className?: string
  classes?: ClassesType
  elementToLabel: FC<T>
  items: T[]
  setActiveItem: (newActiveItem: T) => void
}

export const Select = <T,>({
  items = [],
  activeItem,
  setActiveItem,
  classes = {
    activeItemClassName: '',
    dropClassName: '',
    itemClassName: '',
  },
  className = '',
  elementToLabel,
}: PropsType<SelectItemType<T>>): ReactElement => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const onClickItem = (item: typeof activeItem): void => {
    setActiveItem(item)
    setIsOpen(false)
  }

  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', onClick)
    } else {
      document.removeEventListener('click', onClick)
    }

    return () => document.removeEventListener('click', onClick)
  }, [isOpen])

  return (
    <div
      ref={dropdownRef}
      className={`${className || ''} relative cursor-pointer border border-anthracite-gray`}
    >
      <div
        className={`${classes.activeItemClassName} `}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setIsOpen(prevState => !prevState)}
        onClick={() => {
          setIsOpen(e => !e)
        }}
      >
        {elementToLabel(activeItem)}
      </div>
      <div
        className={`${classes.dropClassName} ${
          isOpen ? 'block' : 'hidden'
        } absolute z-20 box-content w-full border border-anthracite-gray bg-white dark:border-white dark:bg-anthracite-gray`}
      >
        {items.map(item => {
          return (
            <div
              key={item._id}
              aria-label={item.title}
              role="button"
              tabIndex={0}
              className={`${classes.itemClassName} ${
                activeItem === item ? 'bg-gray-300 hover:bg-gray-300' : ''
              } hover:bg-gray-100`}
              onClick={() => onClickItem(item)}
              onKeyDown={e => e.key === 'Enter' && onClickItem(item)}
            >
              <div className="">{elementToLabel(item)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
