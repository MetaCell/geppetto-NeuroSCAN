#!/bin/bash

AvitoMp4 () {
  echo Converting $1 to mp4
  infile=$1
  outfile=`dirname $1`/`basename -s .avi $1`.mp4
  #ffmpeg -i $infile -c:v libx265 -x265-params lossless=1 -c:a libfdk_aac -b:a 128k -y $outfile
  #ffmpeg -i $infile -c:v libx264 -preset slow -crf 19 -c:a libvo_aacenc -b:a 128k -y $outfile
  ffmpeg -i $infile -strict -2 -y $outfile || ffmpeg -i $infile  -c:v copy -c:a copy  -y $outfile
}

export -f AvitoMp4

find . -name \*.avi -exec bash -c 'AvitoMp4 "$0"' {} \;
