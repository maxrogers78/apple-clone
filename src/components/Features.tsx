import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import { useRef } from 'react';
import gsap from 'gsap';

const Features = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.to('#exploreVide', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current!.play();
      },
    });

    animateWithGsap({
      target: '#features_title',
      animations: { opacity: 1, y: 0 },
    });

    animateWithGsap({
      target: '.g_grow',
      animations: { scale: 1, opacity: 1, ease: 'power1' },
      scroll: { scrub: 5.5 },
    });

    animateWithGsap({
      target: '.g_text',
      animations: { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 },
    });
  }, []);

  return (
    <section className='common-padding relative h-full overflow-hidden bg-zinc'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full'>
          <h1 id='features_title' className='section-heading'>
            Explore the full story.
          </h1>
        </div>

        <div className='flex flex-col items-center justify-center overflow-hidden'>
          <div className='mb-24 mt-32 pl-24'>
            <h2 className='text-5xl font-semibold lg:text-7xl'>iPhone.</h2>
            <h2 className='text-5xl font-semibold lg:text-7xl'>
              Forged in titanium.
            </h2>
          </div>

          <div className='flex-center flex-col sm:px-10'>
            <div className='relative flex h-[50vh] w-full items-center'>
              <video
                playsInline
                autoPlay
                muted
                id='exploreVideo'
                preload='none'
                className='h-full w-full object-cover object-center'
                ref={videoRef}
              >
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>

            <div className='relative flex w-full flex-col'>
              <div className='feature-video-container'>
                <div className='h-[50vh] flex-1 overflow-hidden'>
                  <img
                    src={explore1Img}
                    alt='Explore titanium'
                    className='feature-video g_grow'
                  />
                </div>

                <div className='h-[50vh] flex-1 overflow-hidden'>
                  <img
                    src={explore2Img}
                    alt='Explore titanium'
                    className='feature-video g_grow'
                  />
                </div>
              </div>

              <div className='feature-text-container'>
                <div className='flex-center flex-1'>
                  <p className='feature-text g_text'>
                    iPhone 15 Pro is{' '}
                    <span className='text-white'>
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className='flex-center flex-1'>
                  <p className='feature-text g_text'>
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{' '}
                    <span className='text-white'>
                      lightest Pro models ever.
                    </span>
                    , You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
