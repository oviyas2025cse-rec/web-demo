import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackSrc = '/assets/hero/elv-bg.jpg',
  className = '',
  onLoad,
  onError,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
        setLoaded(true);
        onError?.(e);
      }}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-85'} ${className}`}
    />
  );
};
