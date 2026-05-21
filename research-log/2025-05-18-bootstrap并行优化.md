# Bootstrap并行优化

**日期：** 2025-05-18

## 结论
CPU + joblib(n_jobs=4) 比串行快23倍。GPU对小数据集(<100K)反而慢3倍。

## 原因
GPU kernel launch overhead 在小数据集上占比太高。
