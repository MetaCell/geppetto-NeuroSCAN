#!/bin/bash

AvitoMp4 () {
  echo Converting $1 to mp4
  ffmpeg -i $1 -c:v libx265 -x265-params lossless=1 -c:a libfdk_aac -b:a 128k -y `dirname $1`/`basename -s .avi $1`.mp4
}

export -f AvitoMp4

find . -name \*.avi -exec bash -c 'AvitoMp4 "$0"' {} \;
