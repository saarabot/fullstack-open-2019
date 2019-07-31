#!/bin/sh
npm run build
rm -rf ../../part3/puhelinluettelo-backend/build
cp -r build ../../part3/puhelinluettelo-backend/build