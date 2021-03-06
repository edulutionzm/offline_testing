#!/bin/bash

DIRECTORIES=( ~/reports ~/backups ~/reports/baseline)
for DIRECTORY in ${DIRECTORIES[@]}; do
	if [ ! -d "$DIRECTORY" ]; then
		mkdir "$DIRECTORY"
	else
		echo "$DIRECTORY already exists. Skipping this step"
	fi
done


test -f ~/.testing_server/public/test_responses.sqlite
#if db file exists then extraction and submission begin. If not, will output error message to contact support
if [ "$?" = "0" ]; then
	if (echo $1 |\
    egrep '^(1[0-2]|0[0-9])[-/][0-9]{2}' > /dev/null
	); then
	   echo Stopping ka lite server 
	   sudo service ka-lite stop > /dev/null
	   sudo service nginx stop > /dev/null
       echo "Extracting baseline tests for month $1"
       echo Extracting tests.....
       # fetch the first argument given on the command line and use it as an argument to the Rscript
       Rscript ~/.testing_server/baseline.R "$1"
       # After Rscript executes, execute send report script
       ~/.testing_server/send_baseline.sh
   else 
       echo Please enter a valid year and month e.g 02-17
       exit 1 
   fi
else
	echo Error. Baselines NOT extracted. Please contact tech support 1>&2
	exit 1
fi