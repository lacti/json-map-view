#!/bin/bash

docker build -t json-map-view --build-arg PREFIX=${PREFIX:="/json-map-view"} .

