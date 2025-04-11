
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Channel, Program } from "@/types";

interface VideoPlayerProps {
  channel?: Channel;
  program?: Program;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  channel,
  program,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Sample video URL (using a placeholder for demo purposes)
  const videoUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle progress update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = 
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  // Handle seeking
  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = 
        (newProgress / 100) * videoRef.current.duration;
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div 
      ref={playerRef}
      className="relative bg-black w-full aspect-video rounded-lg overflow-hidden"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
      />

      {/* Channel/Program Info Overlay (top) */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center">
        {channel && (
          <div className="flex items-center gap-2">
            <img 
              src={channel.logo} 
              alt={channel.name} 
              className="w-8 h-8 object-contain"
            />
            <div>
              <h3 className="font-bold text-white">{channel.name}</h3>
              {program && (
                <p className="text-sm text-gray-200">{program.name}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls Overlay (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress bar */}
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleProgressChange}
          className="mb-4"
        />
        
        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlay}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <SkipBack />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <SkipForward />
            </Button>
            
            <div className="flex items-center gap-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute}
                className="text-white hover:bg-white/10"
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/10"
          >
            <Maximize />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
