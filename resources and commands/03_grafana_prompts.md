probe_success

probe_duration_seconds

100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[1m])) \* 100)

sum by (name) (container_memory_working_set_bytes{image!=""})
