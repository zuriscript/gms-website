---
title: Debugging
description: Learn how to debug GMS
---

There are several utilities to facilitate debugging with GMS.

First of all make sure to use a debug build, by setting the CMake variable `CMAKE_BUILD_TYPE=Debug`.

If desired and installed on your machine, you can also enable address and UB sanitizers by setting the CMake option `DEBUG_WITH_SANITIZERS=ON`.

For print style debugging there are several helpful methods in `gms/common/format.h`.

Finally, you can also use `CSRGraph::PrintTopology()` to print the adjacency information of a `CGraph`.
