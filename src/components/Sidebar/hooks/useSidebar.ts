import { useEffect, useState } from 'react'
import { useSidebar } from '@/components/ui/sidebar'

export function useSidebarLogic() {
  const { open, setOpen } = useSidebar()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const itemAlign = open ? 'justify-start text-left' : 'justify-center text-center'
  const mobileOverlay = isMobile && open

  return {
    open,
    setOpen,
    isMobile,
    itemAlign,
    mobileOverlay,
  }
} 