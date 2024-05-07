import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = ({
  target,
  animations,
  scroll,
}: animateWithGsapProps) => {
  gsap.to(target, {
    ...animations,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scroll,
    },
  });
};

export const animateWithGsapTimeline = ({
  timeline,
  model,
  rotation,
  firstTarget,
  secondTarget,
  animations,
}: animateWithGsapTimelineProps) => {
  timeline.to(model.current.rotation, {
    y: rotation,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeline.to(firstTarget, { ...animations, ease: 'power2.inOut' }, '<');
  timeline.to(secondTarget, { ...animations, ease: 'power2.inOut' }, '<');
};
