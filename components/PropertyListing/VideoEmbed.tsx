import React from 'react';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  url,
  title = 'Property Video',
}) => {
  // Function to extract video ID and determine platform
  const getEmbedUrl = (videoUrl: string) => {
    // YouTube patterns
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?v%3D|youtube\.com\/watch\?feature=player_embedded&v=|youtube\.com\/watch\?.*&v=)([\w-]{11})/;
    const youtubeMatch = videoUrl.match(youtubeRegex);

    if (youtubeMatch) {
      return {
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
        platform: 'youtube',
      };
    }

    // Vimeo patterns
    const vimeoRegex =
      /(?:vimeo\.com\/|vimeo\.com\/video\/|player\.vimeo\.com\/video\/)(\d+)/;
    const vimeoMatch = videoUrl.match(vimeoRegex);

    if (vimeoMatch) {
      return {
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
        platform: 'vimeo',
      };
    }

    // For other video URLs, try to use them directly
    // This might work for some platforms but not all
    return {
      embedUrl: videoUrl,
      platform: 'other',
    };
  };

  const { embedUrl, platform } = getEmbedUrl(url);

  return (
    <div className="relative w-full h-0 pb-[56.25%] bg-gray-200 rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default VideoEmbed;
