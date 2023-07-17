#!/bin/sh -f

# check for pnpm
if type "pnpm" 2> /dev/null; then
    pnpm i
else
    npm install
fi