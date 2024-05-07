export const animateWithGsapTimeline = ({
  timeline,
  model,
  rotation,
  firstTarget,
  secondTarget,
  animation,
}: animateWithGsapTimelineProps) => {
  timeline.to(model.current.rotation, {
    y: rotation,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeline.to(firstTarget, { ...animation, ease: 'power2.inOut' }, '<');
  timeline.to(secondTarget, { ...animation, ease: 'power2.inOut' }, '<');
};
