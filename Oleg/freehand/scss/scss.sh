#!/bin/env bash

# Script for transpiling scss code
# Note: all scss code imported in one main.scss

INPUT="./main.scss"
OUTPUT="../css/style.css"

sass $INPUT $OUTPUT