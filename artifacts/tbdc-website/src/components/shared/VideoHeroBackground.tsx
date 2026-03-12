import { useRef, forwardRef } from 'react';

interface VideoHeroBackgroundProps {
  src: string;
  overlayClassName?: string;
}

const VideoHeroBackground = forwardRef<HTMLVideoElement, VideoHeroBackgroundProps>(
  ({ src, overlayClassName = 'bg-navy/60' }, ref) => {
    const localRef = useRef<HTMLVideoElement>(null);
    const videoRef = ref || localRef;

    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>
    );
  }
);

VideoHeroBackground.displayName = 'VideoHeroBackground';

export default VideoHeroBackground;
