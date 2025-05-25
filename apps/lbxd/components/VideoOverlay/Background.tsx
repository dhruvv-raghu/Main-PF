'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { VideoItem, VideoConfig } from '@/types/video';

interface VideoBackgroundProps {
  videos: VideoItem[];
  Config?: Partial<VideoConfig>;
  className?: string;
  children?: React.ReactNode;
}

const Background = ({
  videos,
  Config = {},
  className,
  children,
}: VideoBackgroundProps) => {
  const config: VideoConfig = {
    defaultBlur: 5,
    autoPlay: true,
    loop: true,
    muted: true,
    showControls: false,
    allowBlurAdjustment: false,
    ...Config
  };

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(config.autoPlay);
  const [isMuted, setIsMuted] = useState(config.muted);
  const [currentBlur, setCurrentBlur] = useState(config.defaultBlur);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.play().catch(error => {
        console.error("Video playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      videoElement.pause();
    }
  }, [isPlaying, currentVideo]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = isMuted;
  }, [isMuted]);

  // Add event listener for video ended to cycle to next video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleVideoEnded = () => {
      // Only automatically advance if not in loop mode
      if (!config.loop) {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }
    };

    videoElement.addEventListener('ended', handleVideoEnded);
    
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnded);
    };
  }, [config.loop, videos.length]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={currentVideo.src}
        autoPlay={config.autoPlay}
        loop={config.loop}
        muted={config.muted}
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full object-cover w-full h-full"
        style={{ filter: `blur(${currentBlur}px)` }}
      />
      
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="absolute inset-0 z-20">
        {children}
      </div>
    </div>
  );
};

export default Background;
