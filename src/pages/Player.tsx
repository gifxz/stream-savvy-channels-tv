
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Channel, Program } from "@/types";
import { channels } from "@/data/mockData";

const Player: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const [relatedChannels, setRelatedChannels] = useState<Channel[]>([]);
  
  // Get channelId from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const channelId = params.get("channelId");
    
    if (channelId) {
      const foundChannel = channels.find(c => c.id === channelId);
      if (foundChannel) {
        setChannel(foundChannel);
        
        // Find related channels based on category
        const related = channels
          .filter(c => 
            c.id !== channelId && 
            c.category.some(cat => foundChannel.category.includes(cat))
          )
          .slice(0, 4);
        
        setRelatedChannels(related);
      }
    }
  }, [location.search]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!channel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading channel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={handleBackClick}
        className="mb-4 pl-0 text-tv-text-secondary hover:text-tv-text flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Channels
      </Button>
      
      {/* Video Player */}
      <VideoPlayer channel={channel} program={channel.currentProgram} autoPlay={true} />
      
      {/* Video Info and Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{channel.name}</h1>
          {channel.currentProgram && (
            <p className="text-lg">{channel.currentProgram.name}</p>
          )}
          <p className="text-tv-text-secondary">{channel.description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex gap-2">
            <ThumbsUp size={16} />
            Like
          </Button>
          <Button variant="outline" size="sm" className="flex gap-2">
            <ThumbsDown size={16} />
            Dislike
          </Button>
          <Button variant="outline" size="sm" className="flex gap-2">
            <Share2 size={16} />
            Share
          </Button>
        </div>
      </div>
      
      {/* Related Channels */}
      {relatedChannels.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Related Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedChannels.map(relatedChannel => (
              <div 
                key={relatedChannel.id}
                className="bg-tv-card p-4 rounded-lg cursor-pointer hover:bg-tv-bg transition-colors"
                onClick={() => navigate(`/player?channelId=${relatedChannel.id}`)}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={relatedChannel.logo} 
                    alt={relatedChannel.name} 
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <h3 className="font-medium">{relatedChannel.name}</h3>
                    {relatedChannel.currentProgram && (
                      <p className="text-sm text-tv-text-secondary">
                        {relatedChannel.currentProgram.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
