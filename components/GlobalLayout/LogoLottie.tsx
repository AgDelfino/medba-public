'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import lottie from 'lottie-web';

export default function LogoLottie() {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/images/lottieLogo.json',
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <Link href='/'>
      <div ref={animationContainer} />
    </Link>
  );
}
