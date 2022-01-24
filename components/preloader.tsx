import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

const Preloader = () => {
  const preloaderRef = useRef<HTMLElement>(null);

  return (
    <section className="hidden border" ref={preloaderRef}>
      <p>Fireboy DML</p>
    </section>
  );
};

export default Preloader;
