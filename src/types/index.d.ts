declare interface HighlightSlide {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
}

declare interface Model {
  id: number;
  title: string;
  color: string[];
  img: string;
}

declare interface Size {
  label: string;
  value: string;
}

declare interface CarouselVideo {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}
