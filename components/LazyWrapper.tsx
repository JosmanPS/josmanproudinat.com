import React, { useState, useEffect, createRef } from 'react'

type Props = {
  children: any
}

const LazyWrapper = ({ children }: Props) => {
  const [showContent, setShowContent] = useState(false)

  const container = createRef<HTMLDivElement>()


  useEffect(() => {
    if (window && 'IntersectionObserver' in window) {
      if (container && container.current) {
        const onIntersection = (entries: any) => {
          if (!entries || entries.length <= 0) {
            return
          }

          if (entries[0].isIntersecting) {
            setShowContent(true)
            contentObserver.disconnect()
          }
        }

        const contentObserver = new IntersectionObserver(onIntersection, {
          rootMargin: '100px 0px',
          threshold: 0.25,
        })


        contentObserver.observe(container.current)
      }
    } else {
      setShowContent(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container])

  return <div ref={container}>{showContent && children}</div>
}

export default LazyWrapper
