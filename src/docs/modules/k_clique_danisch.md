---
title: k-Clique Counting
description: Learn How k-Clique Counting was implemented in GMS
---

In this guide we discuss how to use the implementations of Danisch et al.'s k-clique counting algorithm.

The algorithm builds for each node in the current graph a subgraph induced by its neighbours. Then it recurses on the subgraphs and, at the last level, counts the k-cliques.

The k-clique benchmarks are built with the pipeline benching-variant. For more information see [Pipeline Interface](../extend/add_benchmark.md)

## Building

Note that the verifier is the original plain C code by Danisch et al., whereas the actual kernels are optimized and slightly adapted C++ reimplementations. The verifiers work in Debug and Release mode.

## Running

The k-clique kernels require as input an undirected, unweighted graph and the size of the cliques that should be counted. Below is an excerpt of the available options. Call any of the kernels with `-h` to see the full list of available options.

```
OPTIONS
        -t, --threads
                    specify the number of threads used

        -n, --num-trials
                    number of iterations for the benchmark

        -p, --param set kernel specific parameters
        clique-size=, cs=
                    the clique size (default: 8)

        -f, --file  read graph from the specified file

        -g, --gen   generate graph with the specified generator
        <scale>     size of the generated graph = 2^scale

```

As you can see, there is one benchmark-specific parameter for k-clique counting.
The syntax to specify it is `-p cs=5`.

## Graph representation

The default graph representation is `CSRGraph`, which can be specified by the `CGraph` template parameter.
Be aware, that changing the graph representation also requires changing the subgraph builders (see below) and kernel code.
As the kernel currently relies on reordering the neighborhoods with swaps, currently the only supported graph for k-clique counting is `CSRGraph`.
Compressible graphs don't support this operation at this time, and would thus require a strategy with an additional index vector for the ordering information.

To use a new representation, change in `k_clique_list/clique_counting.h` a function pointer to use your desired graph representation:

```cpp
// old
template <class CGraph = CSRGraph>
    constexpr auto NP_kclisting
        = Parallelize::node<Builders::SubGraphBuilder<CGraph>, KcListing<CGraph>, CGraph>;
// new
template <class CGraph = CUSTOM_GRAPH<NodeId>>
    constexpr auto NP_kclisting
        = Parallelize::node<CUSTOM_BUILDER<CGraph>,KcListing<CGraph>, CGraph>;
```

## Using different preprocessing functions

Danisch's algorithm relies on a directed acyclic graph (DAG) to correctly count all k-cliques. The properties of the DAG (such as maximal out-degree and degree distribution) influence the performance of the algorithm. The default is a degeneracy order.

You can replace it by any scheme that ranks the vertices according to a total order. Take a look at the preprocessing functions of the `CliqueCountPipeline` class in `k_clique_list/bench_helper.h` for reference.

## Using different parallelization schemes

Danisch's recursive counting kernel is parallelized in two ways:

1. over the nodes
2. over the edges
3. mixed over the nodes and edges (Note: this is untested)
   To add your own parallelization scheme, implement it with the following interface:

```cpp
template<typename Builder_T, typename Counter_T, typename CGraph = CSRGraph>
    unsigned long long CustomParallel(CGraph& g, const CLApp& cli);
```

For your own convenience, you can define a new function pointer for it in `k_clique_list/clique_counting.h` or directly call the function.

## Using different subgraph builders

Danisch's algorithm relies on induced subgraphs, the construction of which potentially heavily influences the runtime. There are two subgraph builder classes available in `k_clique_list/parallelizationStrategy/`:

- `SubGraphBuilder`: Builds the direct induced subgraph. Only includes the out-edges
- `SubGraphBuilderWInverse`: Builds the direct induced subgraph. Also includes the in-edges.
  Both classes are able to build the subgraphs induced by the neighborhood (out-edges) of a vertex or the common neighborhood of two vertices (ideally belonging to the same edge, though this is not strictly required). To add your own subgraph builder, its best to adhere to the interface defined by the existing classes.
