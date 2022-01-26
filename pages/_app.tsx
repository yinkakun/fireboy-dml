/* eslint-disable new-cap */
import { AppProps } from 'next/app';
import { Fragment, useEffect, useState } from 'react';
import { DefaultSeo } from 'next-seo';
import '@styles/tailwind.css';
import '@styles/global.css';
import '@/styles/locomotive-scroll.css';
import { ScrollTrigger } from '@/lib/gsap';

const App = ({ Component, pageProps }: AppProps) => {
  const [forceReRender, setForceReRender] = useState(0);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '[data-scroll-container]',
    ) as HTMLDivElement;

    import('locomotive-scroll').then((LocomotiveScroll) => {
      const locomotiveScroll = new LocomotiveScroll.default({
        el: scrollContainer,
        smooth: true,
        lerp: 0.08,
      });

      locomotiveScroll.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          return arguments.length
            ? locomotiveScroll.scrollTo(value, 0, 0)
            : locomotiveScroll.scroll.instance.scroll.y;
        },
        scrollLeft(value) {
          return arguments.length
            ? locomotiveScroll.scrollTo(value, 0, 0)
            : locomotiveScroll.scroll.instance.scroll.x;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollContainer.style.transform ? 'transform' : 'fixed',
      });

      const updateLocomotiveScroll = () => locomotiveScroll.update();

      ScrollTrigger.addEventListener('refresh', updateLocomotiveScroll);

      ScrollTrigger.refresh();

      setForceReRender((f) => f + 1);

      return () => {
        locomotiveScroll.destroy();
        ScrollTrigger.removeEventListener('refresh', updateLocomotiveScroll);
      };
    });
  }, []);

  return (
    <Fragment>
      <DefaultSeo title="Fireboy DML" />
      <div className="bg-orange-yellow" data-scroll-container>
        <Component {...pageProps} key={forceReRender} />
      </div>
    </Fragment>
  );
};

export default App;
