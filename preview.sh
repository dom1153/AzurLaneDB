#!/bin/bash -f

function yes_or_no {
    while true; do
        read -p "$* [y/n]: " yn
        case $yn in
            [Yy]*) return 0  ;;  
            [Nn]*) echo "Exiting..." ; return  1 ;;
        esac
    done
}

if [ ! -d "node_modules" ]; then
  # echo "$0: 'node_modules' directory not found, please run install command"
  # exit
  if yes_or_no "node_modules not found, would you like to install?"; then
    ./install.sh
  else
    exit
  fi
fi

# check for pnpm
cmd="run preview"
if type "pnpm" 2> /dev/null; then
  pnpm $cmd 
else
  npm $cmd
fi