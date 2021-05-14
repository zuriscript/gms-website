---
title: Getting Started
description: Learn How to setup GMS
---

> **Requirements:**  
> \* &nbsp; Git >= 3.8  
> \* &nbsp; Cmake >= 3.8  
> \* &nbsp; GCC >= 8.3

Installation:

```bash
cd gms
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make -j4
```

To run a benchmark with a graph read from a file input:

```bash
bin/maximal_clique_enum_bron_kerbosch -f mygraph.el
```

To run a benchmark with a generated graph:

```bash
bin/maximal_clique_enum_bron_kerbosch -g uniform 10
```

## Project structure

The repository is structured as follows:

- `gms`
  - `algorithms`: Algorithm implementations and benchmarks
    - `preprocessing`: Vertex ordering implementations, which can be used as preprocessing for other algorithms
    - `non_set_based`: Algorithms implemented with a non set-based approach, i.e. `CGraph` generic code
      - `coloring`: Implementations of various graph coloring algorithms
      - `k_clique_list`: Implementation of k-clique listing algorithm of Danisch et al.
      - `subgraphiso`: Implementation of Glasgow and VF2 subgraph isomorphism algorithms
    - `set_based`: Algorithms implemented with a set-based approach, i.e. `SGraph` generic code
      - `k_clique_count`: Simple unoptimized version of clique counting, that is implemented with sets
      - `k_clique_star_list`: Implementation of k-clique-star listing
      - `link_prediction`: Vertex similarity based link prediction, and robust methods to assess its performance
      - `maximal_clique_enum`: Implementation of Bron-Kerbosch algorithm and extensions
      - `triangle_count`: Set-based triangle counting
      - `vertex_similarity`: Implementations of vertex similarity functions
  - `common`: Functionality intended to be reused across GMS providing essential benchmark infrastructure
  - `representations`
    - `graphs`: Graph representations
      - `coders`: Graph neighborhood encoders and decoders for composable compression
      - `permuters`: Graph neighborhood permuters that can be applied to neighborhoods prior to computation
    - `sets`: Set representations and operations
  - `third_party`: Several third-party libraries, see top-level README for more information
- `docs`: Documentation
- `examples`: Examples accompanying the documentation
- `testing`: Unit tests
- `scripts`: Some simple postprocessing scripts, written in Bash and Python

## Compilation

Here and in the rest of the documentation we refer to the path of the Git repository as `$REPO`.

- Create a build directory:  
  `$ mkdir $REPO/build && cd $REPO/build`
- Generate the Makefile:  
  `$ cmake -DCMAKE_BUILD_TYPE=Release ..`
- for the debugging build, which is recommended during development since it enables compiler sanitizers and bounds checking (in some places), change `Release` to `Debug`
- Build the code:
  `$ make -j4` (where 4 is the number of threads to build the code)
- You will now find the benchmark binaries in a subdirectory `bin` of the current build directory. Unittests are compiled to `tests`.

Individual make targets for the modules are created to facilitate faster development.

For debugging builds it's recommended to also install `libasan` and `libusan` if they aren't already part of your installation. (Installed by default on Debian-based distributions.)
Set the debug flag `DEBUG_WITH_SANITIZERS=ON` to enable compilation with sanitizers in debug builds.

### GAPBS benchmarks with graph compression

To build the original GAPBS benchmarks with compressed graphs, enable the CMake option `BUILD_GAPBS_BENCHMARKS` and build the project.
The binaries corresponding to various combinations will be placed in a subdirectory called `gapbs`.
Note that at this time they use the GAPBS CLI, use `-h` for more information on usage.

## Running a benchmark

After building you can find the various benchmark binaries in the directory `$REPO/build/bin`, and the tests in `$REPO/build/tests` respectively.
Some benchmarks come with additional benchmark-specific parameters, to see the full usage information invoke the relevant binary with the `-h` (or `--help`) argument.

### Arguments and parameters

In general you can control the

- number of trials per instance `-n, --num-trials`,
- number of threads `-t, --threads`,
- and whether to run a verifier `-v, --verify`.

To specify the input graph you can either load one from a file using `--file`, or invoke a generator with `--generator`.

In addition some benchmarks allow for additional benchmark-specific parameters, these can be specified with the `-p, --param` flag, for example

```bash
./bin/k_clique_list_danisch_edge_parallel -p clique-size=5 -g uniform 10
```

would run with a clique-size of 5 and a uniform generated graph of size 2<sup>10</sup>.

### Generators and file formats

GMS uses graph I/O functionality from the GAPBS project.
This means the following input formats are currently supported, identified by the file extension:

- `.el`: Edge list, each line contains two space-separated vertex IDs.
- `.wel`
- `.gr`:
- `.graph`: Metis
- `.mtx`: MTX

For `.el` and `.wel` vertex IDs are kept as-is, and it's expected that they are {0, …, N-1}.
For `.gr`, `.graph`, `.mtx` the numeration is changed from {1, …, N} to {0, …, N-1}.

Currently the following generators are available:

- uniform: Generates 2<sup>scale</sup> uniform graph
- kronecker: Generates 2<sup>scale</sup> Kronecker/R-MAT graph
