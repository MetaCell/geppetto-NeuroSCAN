const ffmpeg = require('ffmpeg.js/ffmpeg-mp4');

module.exports = (webmData) => {
  let stderr = '';

  return ffmpeg({
    MEMFS: [{
      name: 'input.webm',
      data: Uint8Array.from(webmData),
    }],
    arguments: ['-i', 'input.webm', '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '22', '-c:a', 'aac', '-r', '25', '-strict', '2', 'output.mp4'],
    print: () => {},
    printErr: (data) => {
      stderr += data;
    },
    onExit: (code) => {
      if (code !== 0) {
        throw new Error(`Conversion error: ${stderr}`);
      }
    },
  }).MEMFS[0].data.buffer;
};
