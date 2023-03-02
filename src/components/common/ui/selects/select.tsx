import { FC, useEffect, useRef, useState } from 'react'

type ClassesType = {
  activeItemClassName?: string
  dropClassName?: string
  itemClassName?: string
}

type PropsType<T> = {
  items: T[]
  activeItem: T | undefined
  setActiveItem: (newActiveItem: T) => void
  classes?: ClassesType
  className?: string
  placeholder?: string
  elementToLabel: FC<T>
}

export const Select: FC<PropsType<any>> = ({
  items = [],
  activeItem,
  setActiveItem,
  classes = {
    activeItemClassName: '',
    dropClassName: '',
    itemClassName: '',
  },
  className = '',
  placeholder = '',
  elementToLabel,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const onClickItem = (item: any): void => {
    setActiveItem(item)
    setIsOpen(false)
  }

  useEffect(() => {
    const onClick = (e: any): void => {
      if (!dropdownRef.current!.contains(e.target)) setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('click', onClick)
    } else document.removeEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [isOpen])

  return (
    <div
      className={`${className || ''} relative cursor-pointer border border-anthracite-gray`}
      ref={dropdownRef}
    >
      <div
        role="menu"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setIsOpen(prevState => !prevState)}
        className={`${classes.activeItemClassName} `}
        onClick={() => {
          setIsOpen(e => !e)
        }}
      >
        {activeItem ? elementToLabel(activeItem) : placeholder}
      </div>
      <div
        className={`${classes.dropClassName} ${
          isOpen ? 'block' : 'hidden'
        } absolute box-content w-full border border-anthracite-gray`}
      >
        {items.map(item => {
          return (
            <div
              key={item.id}
              role="menuitem"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onClickItem(item)}
              className={`${classes.itemClassName} ${
                activeItem === item ? 'bg-gray-300 hover:bg-gray-300' : ''
              } hover:bg-gray-100`}
              onClick={() => onClickItem(item)}
            >
              <div className="">{elementToLabel(item)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
