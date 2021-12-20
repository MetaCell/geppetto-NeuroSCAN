const { createFFmpeg } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({
  corePath: 'http://localhost:3000/ffmpeg-core.js',
  log: true,
});

module.exports = async (webmData) => {
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'i.webm', webmData);
  await ffmpeg.run('-i', 'i.webm', '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '22', '-c:a', 'aac', '-r', '25', '-strict', '2', '-speed', '10', 'o.mp4');
  return ffmpeg.FS('readFile', 'o.mp4');
};
