declare interface HighlightSlide {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
}

declare interface Model {
  id?: number;
  title: string;
  color: string[];
  img: string;
}

declare type SizeValue = 'small' | 'large';

declare interface Size {
  label: string;
  value: SizeValue;
}

declare interface CarouselVideo {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}

// Props

declare interface ModelViewProps {
  index: number;
  groupRef: RefObject<Group>;
  gsapType: string;
  controlRef: RefObject<OrbitControls>;
  setRotationState: Dispatch<SetStateAction<boolean>>;
  item: Model;
  size: SizeValue;
}

declare interface animateWithGsapTimelineProps {
  timeline: gsap.core.Timeline;
  model: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  rotation: number;
  firstTarget: string;
  secondTarget: string;
  animation: gsap.TweenVars;
}
