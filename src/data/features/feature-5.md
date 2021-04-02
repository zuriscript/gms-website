---
category: 'features'
title: 'Easy Benchmark code setup'
text: 'Express your benchmarks using our predefined benchmark kernels or write your own. Use verifiers to check the correctness of your code.'
display: 'RIGHT'
order: '1'
---

```cpp
BenchmarkKernel(args, graph,
    CliqueCount<SortedSet, SetGraph>,
    CliqueCountVerifier,
    k, "SortedSet", "SortedGraph");
```
