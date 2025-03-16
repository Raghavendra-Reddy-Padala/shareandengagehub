
import * as React from "react"

// Define multiple breakpoints for better responsive design
const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    }
    
    // Add event listener
    mql.addEventListener("change", onChange)
    
    // Set initial value
    setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    
    // Clean up
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Additional hook to check if the device is a tablet
export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsTablet(width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.DESKTOP)
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Set initial value
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isTablet
}

// Hook that returns the current screen size category
export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.MOBILE) {
        setScreenSize('mobile')
      } else if (width < BREAKPOINTS.DESKTOP) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Set initial value
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

// Export breakpoints for direct use in components
export { BREAKPOINTS }
