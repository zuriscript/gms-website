---
category: 'features'
title: 'To Set or not to Set'
text: 'Although GMS emphesis and strength lies on set algebra, we enable a non setbased design approach, too.Our provided representations offer multiple compression schemes and can be combined with neighbourhood permuters.'
display: 'RIGHT'
order: '1'
---

```cpp
//Default
CSRGraph graph;
//Set-based
SortedSetGraph::FromCGraph(graph)
RoaringGraph::FromCGraph(graph)
RobinHoodGraph::FromCGraph(graph)
//Non-set-based
builder.csrToKbit(graph)
builder.csrToVarintByteBased(graph)
builder.csrToVarintWordBased(graph)
```
