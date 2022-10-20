#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
#echo $SCRIPT_DIR

$SCRIPT_DIR\jdk8u345-b01-jre\bin\java -version:1.6 -jar $SCRIPT_DIR\DUKIntegrator.jar
