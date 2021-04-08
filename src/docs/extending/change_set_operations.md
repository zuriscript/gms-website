---
title: Changing Set Operations
description: Learn how to modify default set operations
---

In this example we show how the set abstraction allows to change details of the set representation and operations, without changing the actual algorithm implementation.

## Introduction

A set-based implementation of total triangle counting is given by the following code:

```cpp
template<class SGraph>
size_t count_total(const SGraph &graph) {
    size_t n = graph.num_nodes();
    size_t total = 0;

    for (NodeId u = 0; u < n; ++u) {
        const auto &neigh_u = graph.neigh(u);
        for (NodeId v : neigh_u) {
            if (u < v) {
                total += neigh_u.intersect_count(graph.neigh(v));
            }
        }
    }

    return total / 3;
}
```

Here, SGraph refers to a class implementing a SetGraph interface, in general this is `SetGraph` instantiated with a particular set class.
For example one can use `RoaringGraph` for this code.

As we can see the only set operation which is used by this algorithm is `intersect_count` and iterator access methods `begin()`/`end()` are used implicitly by the inner for loop.

## Simple set class

The full interface of set classes can be found in the definitions of `RoaringSet`, `SortedSet`, etc.

Here, we're concerned with a minimal example and provide the following set class which is implemented in terms of unsorted vectors:

```cpp
class SimpleSet {
    using SetElement = NodeId;
    std::vector<SetElement> data;
public:
    SimpleSet(const SetElement *data, size_t count) : data(data, data + count) {}

    auto begin() const { return data.begin(); }
    auto end() const { return data.end(); }

    bool contains(SetElement element) const {
        for (NodeId u : *this) {
            if (u == element) {
                return true;
            }
        }
        return false;
    }

    size_t intersect_count(const SimpleSet &set) const {
        size_t count = 0;
        for (NodeId u : *this) {
            count += set.contains(u);
        }
        return count;
    }
};
```

As we can see, this implements a relatively inefficient linear search over the other set.
The graph class we use now would be `SetGraph<SimpleSet>`.

## A note on parallelization

A parallelized version of the above algorithm also exists and can be found in `gms/algorithms/set_based/triangle_count/parallel/total.h`.
Parallelization is done by adding a `#pragma omp parallel for` to the outermost loop of the algorithm.
At this time, we don't usually parallelize individual set operations, but rather the algorithm invoking individual set operations, however in future versions of GMS this might change and you are free to experiment with different parallelization schemes.

## Optimizing the intersect_count operation

As mentioned before, this is a rather simplistic and inefficient implementation of `intersect_count`.
Another version, in-line with our `SortedSet` implementation first sorts the neighborhood information to allow for a faster `intersect_count` implementation.

```cpp
class BetterSet : public SimpleSet {
public:
    BetterSet(const SetElement *data, size_t count) : SimpleSet(data, count) {
        std::sort(this->data.begin(), this->data.end());
    }

    size_t intersect_count(const SimpleSet &set) const {
        size_t count = 0;
        auto it0 = begin();
        auto it1 = set.begin();
        while (it0 != end() && it1 != set.end()) {
            if (*it0 == *it1) {
                ++count;
                ++it0;
                ++it1;
            } else if (*it0 > *it1) {
                ++it1;
            } else {
                ++it0;
            }
        }
        return count;
    }
};
```

## Checking for correctness

While we could now directly run the benchmark with these two different set implementations, we can first run a unittest to check whether our implementation is indeed correct.
For this open `gms/testing/sets.cpp`, include your new files and add it to the `Implementations` definition:

```cpp
using Implementations =
    testing::Types<
        RoaringSet,
        SortedSetBase<std::int32_t>,
        ...,
        SimpleSet,
        BetterSet
    >;
```

For the sake of this example we provide this together in the examples folder.

## Setting up the benchmark

To compare the performance of these two different implementation, we add the following main function which instantiates the benchmark code:

```cpp
using namespace GMS;

using SimpleGraph = SetNeighborhoodGraph<SimpleSet>;
using BetterGraph = SetNeighborhoodGraph<BetterSet>;

int main(int argc, char *argv[]) {
    auto [args, g] = CLI::Parser().parse_and_load(argc, argv);

    BenchmarkKernelBk<SimpleGraph>(args, g, TriangleCount::Seq::count_total<SimpleGraph>, TriangleCount::Verify::total_count, "SimpleGraph");

    BenchmarkKernelBk<BetterGraph>(args, g, TriangleCount::Seq::count_total<BetterGraph>, TriangleCount::Verify::total_count, "BetterGraph");
}
```

To compile a benchmark, you need add the directory containing the benchmark with an `add_subdirectory(dir)` call in the right `CMakeLists.txt` above in the hierarchy.
In the directory where the benchmark code is, you can add a `CMakeLists.txt` file with the content:

```cmake
gms_benchmark(mybench.cpp)
```

which will define a target `mybench`.

## Run the benchmarks

TODO: Name of $BINARY

Now we can run the benchmarks.
To see the full usage information run

`$BINARY --help`

To run it five times each for a graph of size `2^10` with uniformly distributed degree, invoke

`$BINARY -g uniform 10 -n 5`

`$BINARY -f mygraph.el -n 5`

TODO: Output
