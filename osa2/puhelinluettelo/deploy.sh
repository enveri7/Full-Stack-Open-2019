#!/bin/sh
npm run build
rm -rf ../../../mooc_osa3/build
cp -r build ../../../mooc_osa3/
