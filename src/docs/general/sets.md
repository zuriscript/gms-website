---
title: Set representations and operations
description: Learn about our set representations
---

GMS follows a modular approach to graph representations and set operations, so that these can be experimented with easily without modifying the target algorithm implementation itself.

## Available implementations

We provide several set representations already:

- `RoaringSet`: Wrapper for the [Roaring bitmap](https://github.com/RoaringBitmap/CRoaring) library, which implements compressed bit sets.
- `SortedSet`: Implementation of a set as a sorted vector.
- `RobinHoodSet`: Wrapper for the [robin_hood](https://github.com/martinus/robin-hood-hashing) library, which implements a hash table.

`RoaringSet` is considered the default set type and best choice in many situations.
These classes encapsulate the set operations, while templates are used to make algorithm implementations generic over the actual set implementation.

## Set interface

The set interface consists of several constructors, basic set-algebra operations, and a couple of general functions.
This interface is one of the main building blocks for set-based GMS algorithms.

In the following sections we will describe the set interface for a class `Set` where `SetElement` is usually `GMS::NodeId`, where some set classes also support different types.

### Constructors

The main constructor which should always be present, since it's required during construction of `SetGraph` instances:

- `Set(const SetElement *start, size_t count)`

A number of constructors which may be used depending on the algorithms used:

- `Set()`: default constructor for an empty set
- `Set(Set &&)`: move constructor
- `Set(std::vector<SetElement> &vector)`: from vector constructor

Convenience constructors:

- `Set(SetElement)`: set with only a single element
- `Set(std::initializer_list<SetElement> &data)`: set initialization with initializer list of elements
- `static Set Range(int bound)`: create set {0, 1, …, bound - 1}.

### Set algebra methods

The following functions provide set algebra operations:

- `Set difference(const Set &) const`
- `Set difference(SetElement) const`
- `void difference_inplace(const Set &) const`
- `void difference_inplace(SetElement) const`
- `Set intersect(const Set &) const`
- `size_t intersect_count(const Set &) const`
- `void intersect_inplace(const Set &)`
- `Set union_with(const Set &) const`
- `Set union_with(SetElement) const`
- `Set union_count(const Set &) const`
- `void union_inplace(const Set &)`
- `void union_inplace(SetElement)`
- `bool contains(SetElement) const`
- `void add(SetElement)`
- `void remove(SetElement)`

These function names are fully descriptive of the set algebra operations, `_inplace` functions modify the target object, while those without return a new instance.
The methods `add` and `remove` are supposed to be the same functions as `difference_inplace` and `union_inplace` for single `SetElement`.

### General methods

- `begin() const`, `end() const`: return iterator to neighborhood indices
- `Set clone() const`: return a copy of the set, this method exists, since the copy constructor is disabled for sets to avoid accidental copying
- `void toArray(int32_t *array) const`: write the set indices to the array, useful for parallel iteration
- `operator==, operator!=`: set equality/inequality comparison
- `size_t cardinality() const`: returns the number of elements in the set

## Writing set-generic code

GMS uses templates extensively to make code generic over the actual set type.
Some functions are simply generic over a `Set` type.
However, the main way how it is used in practice is by code that is generic over an instance of the SetGraph class template, which represents a graph as a vector of sets where every set represents the neighborhood vertex IDs of a particular vertex:

```cpp
template <class TSet>
class SetGraph {
public:
using Set = TSet;
const Set &out_neigh(NodeId node) const;
int64_t out_degree(NodeId node) const;
int64_t num_nodes() const;
// Some functions omitted.
};

```

The following example from `algorithms/set_based/maximal_clique_enum/parallel/eppsteinPAR.h` shows how a function signature would look like in practice:

```cpp
template <class SGraph, class Set = typename SGraph::Set>
    std::vector<Set> mceBench(const SGraph &rgraph, const pvector<NodeId> &ordering)
{
    // implementation omitted
}
```

This function is generic over `SGraph` and could be used for example with `SetGraph<RoaringSet>`.
The second template parameter `Set` is set to default to the `Set` type associated with the `SGraph`.
Inside of the function, new temporary sets are created by using this `Set` type.
Also, in debug builds this function will return a vector of the found maximal cliques which also be represented by `Set` each.

For convenience we provide several default aliases for `SetGraph` with the default set implementations:

```cpp
using RoaringGraph = SetGraph<RoaringSet>;
using SortedSetGraph = SetGraph<SortedSet>;
using RobinHoodGraph = SetGraph<RobinHoodSet>;

```

### Creating a SetGraph instance

To create a SetGraph instance you first need a `CSRGraph` or a compatible graph, see [Graph representations](graph_representations.md) for more information.
Then you can simply call the factory function `FromCGraph` like this:

```cpp
auto graph = SetGraph<RoaringSet>::FromCGraph(csr_graph);
```

It also provides a second template parameter, `RemoveIsolated` which is set to false by default but can be enabled to detect empty neighborhoods and relabel the graph with these nodes removed.
