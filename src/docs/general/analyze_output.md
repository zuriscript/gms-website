---
title: Analyzing benchmark output
description: How to read the benchmarks
---

## Collect output

Machine-readable output of trials is printed on lines beginning with `@@@` to standard output.
You can either grep for these lines with `grep @@@ | cut -f2- -d" " --output-delimiter=,`.
Or, you can run `$ scripts/collectData.bash -d output/ -o data.csv` to extract output lines of all files in directory `output` to a single file `data.csv`
Note that this script **appends** to the CSV file! If you want to override it, specify `-x` instead.

## Plotting the output

At this point you should have a CSV file of the benchmark output.
You can either analyze and plot it with an interactive environment of your choice like Jupyter+Pandas or R, or use our provided plotting tool.

The scripts are in an experimental state and will be further refactored in the future.
