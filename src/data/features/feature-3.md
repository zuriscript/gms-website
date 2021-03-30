---
category: 'features'
title: 'Profile your code'
text: 'Profiling is directly embedded in the build pipeline and can be enabled/disabled using flags in the cmake files. GMS offers an simple API to include PAPI (hardware performance counters), which supports OpenMP.'
display: 'LEFT'
order: '2'
---

```cpp
PAPIW::INIT_PARALLEL(PAPI_L2_TCA, PAPI_L3_TCA);
#pragma omp parallel
{
    PAPIW::START();
    //your code
    PAPIW::STOP();
}
PAPIW::PRINT();
```
