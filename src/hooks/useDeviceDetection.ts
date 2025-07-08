import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920
  });

  useEffect(() => {
    const checkDevice = () => {
      const screenWidth = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Check for mobile devices
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Screen size based detection
      const isMobileScreen = screenWidth < 768;
      const isTabletScreen = screenWidth >= 768 && screenWidth < 1024;
      const isDesktopScreen = screenWidth >= 1024;
      
      // Combine user agent and screen size detection
      const isMobile = isMobileDevice || isMobileScreen;
      const isTablet = !isMobileDevice && isTabletScreen;
      const isDesktop = !isMobileDevice && isDesktopScreen;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth
      });
    };

    // Check on mount
    checkDevice();

    // Check on resize
    window.addEventListener('resize', checkDevice);
    
    // Check on orientation change (mobile devices)
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 100); // Small delay to ensure screen dimensions are updated
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return deviceInfo;
};