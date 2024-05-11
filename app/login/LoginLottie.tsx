'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function LoginLottie() {
  const animationHospital = useRef(null);

  useEffect(() => {
    if (!animationHospital.current) return;

    const animation = lottie.loadAnimation({
      container: animationHospital.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/hospital.json',
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return <div ref={animationHospital} className='w-full absolute top-0' />;
}

export default LoginLottie;
