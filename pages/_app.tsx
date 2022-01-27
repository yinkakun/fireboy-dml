/* eslint-disable new-cap */
import { AppProps } from 'next/app';
import { Fragment, useEffect, useState, useRef } from 'react';
import { DefaultSeo } from 'next-seo';
import useResizeObserver from 'use-resize-observer';
import '@styles/tailwind.css';
import '@styles/global.css';
import '@/styles/locomotive-scroll.css';
import { ScrollTrigger } from '@/lib/gsap';

function App({ Component, pageProps }: AppProps) {
  const [forceReRender, setForceReRender] = useState(0);
  const locomotiveScrollPackageRef = useRef<any>();
  const locomotiveScrollRef = useRef<any>(null);
  const scrollContainerRef = useRef(null);
  const { height } = useResizeObserver({ ref: scrollContainerRef });

  useEffect(() => {
    (async () => {
      if (!locomotiveScrollPackageRef?.current) {
        locomotiveScrollPackageRef.current = (await import('locomotive-scroll')).default;
      }

      if (!locomotiveScrollRef?.current) {
        locomotiveScrollRef.current = new locomotiveScrollPackageRef.current({
          el: scrollContainerRef.current,
          smooth: true,
          lerp: 0.06,
        });
      }

      locomotiveScrollRef.current.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
        scrollTop(value) {
          return arguments.length
            ? locomotiveScrollRef.current.scrollTo(value, 0, 0)
            : locomotiveScrollRef.current.scroll.instance.scroll.y;
        },
        scrollLeft(value) {
          return arguments.length
            ? locomotiveScrollRef.current.scrollTo(value, 0, 0)
            : locomotiveScrollRef.current.scroll.instance.scroll.x;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.refresh();

      setForceReRender((f) => f + 1);
    })();

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  useEffect((): void => {
    locomotiveScrollRef.current?.update();
  }, [height]);

  return (
    <Fragment>
      <DefaultSeo title="Fireboy DML" />
      <div className="bg-orange-yellow" data-scroll-container ref={scrollContainerRef}>
        <Component {...pageProps} key={forceReRender} />
      </div>
    </Fragment>
  );
}

export default App;
