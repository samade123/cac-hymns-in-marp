#!/bin/bash

FFMPEG=$(which ffmpeg)
SOURCE_DIR=$1

if [ ! -d "$SOURCE_DIR" ]
then
  echo "specify the video directory"

  exit
fi

for file in $SOURCE_DIR/*.mov; do
    $FFMPEG -i $file -aspect 64:27 -c copy $file.desqueezed.mov
done;

# for an 1.55x anamorphic lens use 64:42 aspect 

