---
category: 'features'
title: 'Strong Benchmark suite'
text: 'GMS is build on top of GAPBS and therefore supports various graph formats and synthetic graph generators. Evaluate your code using an intuitive CLI.'
---

```shell{promptUser: user}{promptHost: machine}
./bin/maximal_clique_enum_bron_kerbosch -t 12 -f ../graphs/graph.el
./bin/maximal_clique_enum_bron_kerbosch -t 12 -g kronecker 10 --deg 64
./bin/maximal_clique_enum_bron_kerbosch -t 12 -g uniform 10 --deg 64
```
