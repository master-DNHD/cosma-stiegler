#!/bin/sh
set -- *.docx
while [ $# -gt 0 ]
do
        echo ${1}
        pandoc -s "${1}" -t markdown -o "${1%.docx}.md"
        shift
    if [ $# -gt 0 ]
    then
        pandoc -s "${1}" -t markdown -o "${1%.docx}.md"
        shift
    fi
  wait
done
