import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { highlightSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VIDEO_INITIAL_STATE: CarouselVideo = {
  isEnd: false,
  startPlay: false,
  videoId: 0,
  isLastVideo: false,
  isPlaying: false,
};

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState<CarouselVideo>(VIDEO_INITIAL_STATE);
  const [loadedData, setLoadedData] = useState<
    SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement, Event>) =>
    setLoadedData((prev) => [...prev, e]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 1200 ? "10vw" : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#AFAFAF",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightSlides[videoId].videoDuration,
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, startPlay]);

  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i! + 1,
        }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo(VIDEO_INITIAL_STATE);
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {highlightSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center h-full w-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  muted
                  playsInline
                  preload="auto"
                  className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el as HTMLVideoElement)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetadata(e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current?.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el as HTMLSpanElement)}
              className="relative mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-200"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el as HTMLSpanElement)}
              ></span>
            </span>
          ))}
        </div>

        <button
          type="button"
          className="control-btn"
          onClick={() =>
            handleProcess(
              isLastVideo ? "video-reset" : !isPlaying ? "play" : "pause",
              videoId,
            )
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
