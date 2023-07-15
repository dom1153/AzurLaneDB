#!/bin/bash -f

if [ ! -d "node_modules" ]; then
  echo "$0: 'node_modules' directory not found, please run install command"
  exit
fi
npm run dev
