---
title: Graph representations
description: Learn about our graph representations
---

## Overview

The default graph representation is `CSRGraph`.
As mentioned in [Set representations and operations](/docs/general/sets), we refer to a first category of graphs as `SGraph` in generic code.
`CSRGraph` has a different interface, since it doesn't pre-construct set instances and also provides separate access for in- and out-neighborhoods, making it more suitable for directed graph algorithms than `SetGraph`.
We also provide a number of alternative graph representations for CSRGraph where each offers a different compression scheme:

- `VarintByteBasedGraph`
- `VarintWordBasedGraph`
- `KbitGraph`

These classes have the same interface as `CSRGraph`.
Template parameters throughout the code base where these kinds of graphs can be used are named `CGraph`.

## Compression compatible algorithms

In general the non-set-based algorithms should be compatible with compressed graphs.
The set-based ones create their own representation of the graph, which can also involve compression as is the case of Roaring bitmaps but lossless compression of the input `CSRGraph` wouldn't affect this representation.

At this time the compatible algorithms are:

- `coloring`
- `preprocessing`

The other non-set-based ones should follow in the future, namely:

- `k_clique_list`
- `subgraphiso`

## Instantiating compressible graphs

To create an instance of a compressible graph, you have to use GABPS' BuilderBase class which we have extended with several methods for our compressible graphs.
To convert a `csr_graph` into a different representation you would use:

```cpp
Builder builder(GMS::CLI::GapbsCompat(args));
VarintByteBasedGraph g_byte_based = builder.csrToVarintByteBased(csr_graph);
VarintWordBasedGraph g_word_based = builder.csrToVarintWordBased(csr_graph);

```

You can create a new instance of `GMS::CLI::Args args;` and define `args.symmetrize = true` or `false`.
The `GapbsCompat` type inherits from `BenchCLApp` and can thus be used together with the GAPBS infrastructure.
Benchmarks which are compatible with these graphs, are templated over `CGraph` and can simply be invoked with one of the converted graphs instead of the default `CSRGraph`.

## Default ordering of CSRGraph neighborhoods

CSRGraph neighborhoods are sorted in ascending order of node ID by default, self loops and duplicate edges are removed.
A notable exception is if you use `BuilderBase::MakeGraphFromEL` which is something which you should be aware of if using it in unit tests and similar, there you are responsible for doing these things yourself.

## Neighborhood permuters

In some cases you might be interested in permuting the neighborhoods of a graph before performing computation with them.
Besides the preprocessing module, GMS provides several implementations of permuters for this task which can be applied directly to a `CGraph`.
Note that these permutations might be lost at conversion to a `SetGraph`.

You can find the implementations of the permuters in `representations/graphs/permuters`.

### CPLEX dependency

Except for the simple degree permuter, the IBM CPLEX optimizer is required for permuters.
If you installed it in a non-standard path, you can set the CMake cache variable `CPLEX_ROOT_DIR` to the root directory of your installation and it should compile.

### Using permuters

To use permuters, just as for converting to compressed graphs, you again need an instance of the `Builder` class.

At the time of writing the available permuter variants are:

```cpp
enum struct PermuterVariant {
    OutDegreeAscending,
    OutDegreeDescending,
    InDegreeAscending,
    InDegreeDescending,
#ifdef CPLEX_ENABLED
    OptimalDiffNnIlpUnconstr,
    OptimalDiffNnLpUnconstr,
    OptimalDiffNnIlpConstr,
    OptimalDiffNnLpConstr,
    OptimalDiffVnIlpUnconstr,
    OptimalDiffVnLpUnconstr,
    OptimalDiffVnIlpConstr,
    OptimalDiffVnLpConstr,
    OIlpNnUnN,
    OIlpNnConN,
    OIlpVnUnN,
    OIlpVnConN,
#endif
};
```

Permuting is implemented for `CSRGraph`, so if you want a permuted compressed graph, first permute, then compress it.
The `Builder` method used for permutation is

```cpp
template <PermuterVariant TVariant>
const CSRGraph permute(CSRGraph graph)

```

where the template parameter `TVariant` can be set to any of the available permuter variants to specify the desired permutation.
