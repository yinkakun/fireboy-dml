import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gsap.utils.selector(containerRef);
    const sections = container('section');

    sections.forEach((section) => {
      gsap.to(section, {
        backgroundColor: '#1c1ff1',
        ease: 'none',
        scrollTrigger: {
          scroller: '[data-scroll-container]',
          trigger: section,
          markers: true,
          start: 'top top',
          scrub: 0.2,
        },
      });
    });
  }, []);

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
