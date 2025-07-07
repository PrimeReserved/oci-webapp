// components/Blog/ShareButtons.tsx
'use client';
import React from 'react';
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  description,
}) => {
  const fullUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-blue-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
      color: 'hover:bg-gray-600',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      // You could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="flex items-center space-x-2">
      {shareLinks.map((link) => (
        <button
          key={link.name}
          onClick={() => handleShare(link.url)}
          className={`p-2 rounded-full bg-gray-100 text-gray-600 transition-colors duration-200 ${link.color} hover:text-white`}
          title={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </button>
      ))}

      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-200"
        title="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ShareButtons;
