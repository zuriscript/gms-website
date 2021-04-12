---
title: Bron Kerbosch
description: Learn How Bron Kerbosch was implemented in GMS
---

In this guide we discuss how to use the implementations of the Bron-Kerbosch algorithm and extensions.

## Building

We strongly differentiate between release and debug builds.  
While the maximal cliques are only counted in the release build, we store the result sets in the debug build.
Therefore verification in the release build only verifies the number of the mined maximal cliques while the debug build makes a more thorough verification. But note that the runtime of a regular run drastically increases for the debug build.
In order to build for a debug environment you need to configure CMake with `-DCMAKE_BUILD_TYPE=Debug`.

## Set representation

By default the benchmarks use `RoaringSet` or `RoaringGraph` respectively, which wrap the Roaring bitset library.
However, the code is generic over `SGraph` and you can run it with `SortedSet` or any set of your liking.

## Variations

We offer following variations:

- Sequential:
  - `BkSimple`: Bron-Kerbosch without branch and bound
  - `BkTomita`: Bron-Kerbosch with Tomita's pivoting rule
  - `BkEppstein`: Bron-Kerbosch with Eppstein load balancing strategy
- Parallel:
  - `BkEppsteinPar`: Our variation of Bron-Kerbosch inspired by ranking-based Eppstein exploiting parallelism in the outer most loop.
  - `BkEppsteinSubGraph` and `BkEppsteinSubGraphAdaptive`: BkEppsteinPar using Subgraphs for caching intermediate neighbourhood intersections

## Using different preprocessing functions

The implementations, which use Eppstein's load balancing strategy, can be used with arbitrary preprocessing ordering functions. Those preprocessing functions are accessible over the `PpParallel` or the `PpSequential` namespace.

Ordering functions have the signature

```cpp
template <class SGraph, class Output = pvector<NodeId>>
void ordering(const SGraph &graph, Output &output)
```

where the output can also be a `std::vector<NodeId>` or a different container with similar interface, and will contain the computed ordering of each vertex.
As notable exceptions to this signature, `PpParallel::getDegeneracyOrderingApproxCGraph` and `PpParallel::getDegeneracyOrderingApproxSGraph` take an additional `epsilon` parameter which can be bound with `preprocessing_bind(Fn, double)` (or `std::bind` if you prefer):

```cpp
preprocessing_bind(
    PpParallel::getDegeneracyOrderingApproxSGraph<
            PpParallel::boundary_function::averageDegree,
            useRankFormat
            SGraph,
            pvector<NodeId>>,
    0.005)
```

which will return a function of the above signature which can be used in places where no epsilon parameter is expected.
Some ordering provide an additional boolean template argument `useRankFormat` which controls the output format of the ordering. E.g. `BkEppsteinPar`, `BkEppsteinSubGraph` and `BkEppsteinSubGraphAdaptive` are rank-based and need the ordering in `rankFormat` (thus `useRankFormat = true`).

### Ordering and ranking functions

Orderings can be stored in two ways:

- `orderFormat`: The ordering of the vertices is explicitly stored, i.e. the vertex `v` at the `ith` position in the ordering is stored at index `i` (thus `ordering[i]=v`).
- `rankFormat`: The ordering is stored as a map from vertex to rank. At index `v`, the position `i` of `v` in the ordering is stored (thus `ordering[v]=i`).

### Available ordering functions

- `Degree Ordering`: Ordering in increasing degree size
- `Degeneracy Ordering`: Degeneracy Ordering based on Matula et al.
- `Approx Degeneracy Ordering`: An approximation of the degeneracy ordering
  TODO: Specify the other

### Specifying an ordering for a Bron-Kerbosch kernel

To run Bron-Kerbosch kernel you can call:

```cpp
BenchmarkKernelBkPP<SGraph>(cli, g,
    OrderingFunction,
    BkVariant,
    BkVerifier::BronKerboschVerifier<SGraph>,
    "Label");
```

So to combine `BkEppsteinSubGraph` with a degree ordering:

```cpp
BenchmarkKernelBkPP<SGraph>(cli, g,
    PpParallel::getDegreeOrdering<SGraph, true, pvector<NodeId>>,
    BkEppsteinSubGraph::mceBench<SGraph>,
    BkVerifier::BronKerboschVerifier<SGraph>,
    "Label");
```

Or to combine `BkEppstein` with an approximate degeneracy ordering using the average degree boundary and an epsilon of 0.001:

```cpp
BenchmarkKernelBkPP<SGraph>(cli, g,
    std::bind(PpParallel::getDegeneracyOrderingApproxSGraph<PpParallel::boundary_function::averageDegree, true, SGraph, pvector<NodeId>>, _1, _2, 0.001),
    BkEppsteinPar::mceBench<SGraph>,
    BkVerifier::BronKerboschVerifier<SGraph>,
    "Label");
```

Note: The number of enumerated maximal cliques are not printed by default.  
You have to manually call

```cpp
BkHelper::printCountAndReset();
```

after the benchmark.
