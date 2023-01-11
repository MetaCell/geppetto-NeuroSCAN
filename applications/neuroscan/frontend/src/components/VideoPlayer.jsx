import React from 'react';

const VideoPlayer = (props) => {
  const {
    src,
    options = {
      autoplay: false, controls: true, loop: false, muted: true, playsinline: true,
    },
  } = props;

  const {
    autoplay, controls, loop, muted, playsinline, ...others
  } = options;

  return (
  // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={src}
      autoPlay={autoplay}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsinline}
      {...others}
      className="video-preview"
    />
  );
};

export default VideoPlayer;
