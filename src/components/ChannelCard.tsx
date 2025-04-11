
import React from "react";
import { Channel } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ChannelCardProps {
  channel: Channel;
  className?: string;
  onClick?: () => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ 
  channel, 
  className,
  onClick 
}) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-tv-primary hover:scale-105 bg-tv-card", 
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center">
        <div className="w-16 h-16 mb-3 relative">
          <img 
            src={channel.logo} 
            alt={channel.name} 
            className="w-full h-full object-contain" 
          />
        </div>
        
        <div className="text-center">
          <h3 className="font-bold text-lg">{channel.name}</h3>
          <p className="text-tv-text-secondary text-sm line-clamp-2 mt-1">
            {channel.description}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {channel.isLive && (
            <Badge variant="outline" className="bg-red-600 text-white border-none">
              LIVE
            </Badge>
          )}
          
          {channel.isPremium && (
            <Badge variant="outline" className="bg-yellow-600 text-white border-none">
              PREMIUM
            </Badge>
          )}
        </div>
        
        {channel.currentProgram && (
          <div className="mt-3 text-center">
            <p className="text-sm font-medium">Now: {channel.currentProgram.name}</p>
            <p className="text-xs text-tv-text-secondary">
              {channel.currentProgram.startTime} - {channel.currentProgram.endTime}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
