-- Create the call_events table in ClickHouse
CREATE TABLE IF NOT EXISTS call_events (
    call_id String,
    timestamp DateTime,
    status String,
    caller_id String,
    caller_name String,
    agent_id Nullable(String),
    agent_name Nullable(String),
    duration Nullable(UInt32),
    
    -- Additional fields for analytics
    date Date MATERIALIZED toDate(timestamp),
    hour UInt8 MATERIALIZED toHour(timestamp)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (date, call_id, timestamp);