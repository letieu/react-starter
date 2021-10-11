#!/bin/bash

if [ $STAGE == 'master' ]
then
    cp .env.prod .env
else
    cp .env.dev .env
fi
