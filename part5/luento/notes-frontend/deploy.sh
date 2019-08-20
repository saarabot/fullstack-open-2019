#!/bin/sh
npm run build
rm -rf ../../part3/luento/build
cp -r build ../../part3/luento/build