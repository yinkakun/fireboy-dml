import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(id);
  }, [delay]);
};

const Home = () => {
  const [value, setValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gsap.utils.selector(containerRef);
    const sections = container('section');

    sections.forEach((section) => {
      gsap.to(section, {
        backgroundColor: '#1c1ff1',
        ease: 'none',
        scrollTrigger: {
          scroller: '.scroll-container',
          trigger: section,
          markers: true,
          start: 'top top',
          scrub: 0.2,
        },
      });
    });
  }, [value]);

  useTimeout(() => setValue(value + 1), 1000);

  return (
    <main ref={containerRef}>
      <section className="flex h-[100vh] border-2" />
      <section className="flex h-[100vh] border-2" />
      <section className="flex h-[100vh] border-2" />
      <section className="flex h-[100vh] border-2" />
    </main>
  );
};

export default Home;
