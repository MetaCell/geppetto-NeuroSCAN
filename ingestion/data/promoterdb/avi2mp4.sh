#!/bin/bash

AvitoMp4 () {
  echo Converting $1 to mp4
  infile=$1
  outfile=`dirname $1`/`basename -s .avi $1`.mp4
  ffmpeg -hide_banner -loglevel error -i $infile -strict -2 -y $outfile || ffmpeg -i $infile  -c:v copy -c:a copy  -y $outfile 
}

export -f AvitoMp4

find . -name \*.avi -exec bash -c 'AvitoMp4 "$0"' {} \;
