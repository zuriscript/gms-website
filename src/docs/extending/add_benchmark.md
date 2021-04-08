---
title: Adding a Benchmark
description: Learn how to add new Benchmarks
---

GMS currently provides two ways to add a benchmark in the code.

## General structure

Before invoking the actual benchmark code, GMS benchmarks parse the command line arguments.

```cpp
int main(int argc, char *argv[]) {
    GMS::CLI::Parser parser;
    // Parser::add_param can be used to define additional benchmark-specific parameters like this:
    auto clique_size = parser.add_param("clique-size", "cs", "4", "the clique size");
    auto [args, g] = parser.parse_and_load(argc, argv, true, true);
    // The value can be retrieved after parsing, from the returned handle of add_param, or accessed from the args
    // struct, depending on what is more convenient.
    size_t k = clique_size.to_int();

    // [actual benchmark code goes here]

    return 0;
}
```

## Functional interface

This interface originates from GAPBS, with multiple extensions to support different preprocessing functions, and is simpler to use if your code fits neatly into one of the following sequences:

- Algorithm → Output
- Preprocessing → Algorithm → Output

with no intermediary steps.

In these cases you can invoke one of the following functions in your benchmark runner's main method:

- `void BenchmarkKernel(args, g, kernel, verifier, print...)`
- `template<class SGraph> void BenchmarkKernelBk(args, csr_graph, kernel, verify, print...)`
- `template<class SGraph> void BenchmarkKernelBkPP(args, csr_graph, preprocess, kernel, print...)`
- `void BenchmarkKernelPP(args, g, preprocess, verifier, print..)'`
- `void BenchmarkKernelPPP(args, g, kernel_setup, kernel, verify_setup, verify_verify, verify_teardown, print...)`

### Verifier function

The purpose of the verifier function is to verify if the output of the algorithm makes sense.
If you don't have time to write one you can use `VerifyUnimplemented` which will always fail.

This function receives the input graph and the output of your kernel, and verifies whether the output is plausible.

By passing `-v` on the command line, these verifiers will be run after each benchmark computation and the outcome will be printed.
While this can identify several problems with your code, for most algorithms it will not be a comprehensive check and cannot be understood as a correctness proof.

## Pipeline interface

In some cases the more flexible GMS' pipeline interface may prove useful, especially when testing different variants of several steps of your code.
The benefit of this class is that it will benchmark each step of the execution separately for arbitrary sequences of steps.

### Defining your pipeline class

To get started you should define a subclass of `GMS::Pipeline`.
Then add a function for each individual step, you can specify the order of execution later at instantiation time.
This class should be stateful, i.e. provide all required data as members.

```cpp
#include <gms/common/cli/cli.h>
#include <gms/common/pipeline.h>

class MyPipeline : public GMS::Pipeline}
{
public:
    // If you will need benchmark-specific arguments, pass them to the constructor,
    // otherwise at least the input graph should be specified here.
    MyBench(const GMS::CLI::Args &args, const CSRGraph &csr_graph) : args(args), csr_graph(csr_graph);

    // Define functions for the individual steps.

    void convert() {
        graph = std::move(do_something(csr_graph));
    }

    void preprocess() {
        // Do something.
    }

    void kernel() {
        // Do something.
    }

private:
    const GMS::CLI::Args args;

    // Put state variables that are shared between steps here, e.g.:
    RoaringGraph graph;
    const CSRGraph &csr_graph;
}
```

### Printing output

You can use the `Pipeline::LocalPrinter` method to add information to the output line, which provides output in the format described in [Analyzing Output](../general/analyze_output.md).

For example, from any method inside of your pipeline class you could call:

```cpp
LocalPrinter << (pass ? "pass" : "failed");
```

to indicate whether a test passed or failed.

### Instantiating the benchmark

To actually instantiate the benchmark you need to add the following code to your main function:

```cpp
MyPipeline pipeline(args, graph);

// You can add arbitrary numbers of labels to the next run with `SetPrintInfo` to differentiate multiple runs:
pipeline.SetPrintInfo("algorithm-name", "no-preproc");
pipeline.template Run<MyPipeline>(args, &MyPipeline::convert, &MyPipeline::kernel);

pipeline.SetPrintInfo("algorithm-name", "preproc");
pipeline.template Run<MyPipeline>(args, &MyPipeline::convert, &MyPipeline::preprocess, &MyPipeline::kernel);
```

This way you can also implement multiple functions for the same task and specify different variants in the benchmark run.

Note that at this time if there are different numbers of steps involved this will also print outputs with different numbers of columns which should be considered when analyzing the output.
