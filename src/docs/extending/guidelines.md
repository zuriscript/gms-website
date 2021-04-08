---
title: Guidelines
description: Our Coding Guidelines
---

This document describes some general guidelines for GMS code, they aren't enforced strictly but should be understood as suggestions.

### Naming of template parameters

- `CGraph`: CSRGraph-like API, default to `CSRGraph`.
- `SGraph`: SetGraph API, default to `RoaringGraph`.
- `AnyGraph`: Code which is generic over both `CGraph` and `SGraph`.

### Return values

In general: Return only numeric/simple values, assign complex objects to output arguments.

- Why: If the output type becomes generic (e.g. to allow for `std::vector` and `pvector`), then this can save you one more explicit type parameter when invoking the function. In the non-templated case it can also make overloading easier.
- Exception: Where it would be a lot more inconvenient to return the object, i.e. mainly helper functions.

### Include paths

When including files use relative includes for files in the same directory, descendant directories, or ancestor directories if they correspond to the same algorithm.

Otherwise, start your include with the `gms` directory, e.g.

```cpp
#include <gms/algorithms/preprocessing/preprocessing.h>
```

### Namespacing

Place your implementation in a subnamespace of `GMS`.
If you separate several versions, then create further subnamespaces of your namespace, e.g

```cpp
namespace GMS::MyAlgo {
    namespace Seq {}
    namespace Par {}
    namespace Verify {}
}
```
