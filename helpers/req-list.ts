const date = new Date()

export default {
  "aggs": {
    "avg_volume": {
      "terms": {
        "field": "symbol.keyword",
        "order": {
          "1": "desc"
        },
        "size": 20
      },
      "aggs": {
        "1": {
          "avg": {
            "field": "volume"
          }
        }
      }
    },
    "sum_volume": {
      "terms": {
        "field": "symbol.keyword",
        "order": {
          "_key": "asc"
        },
        "size": 20
      },
      "aggs": {
        "1": {
          "terms": {
            "field": "symbol.keyword",
            "order": {
              "_key": "asc"
            },
            "size": 10
          },
          "aggs": {
            "2": {
              "sum": {
                "field": "volume"
              }
            }
          }
        }
      }
    },
    "avg_closing_price": {
      "date_histogram": {
        "field": "date",
        "calendar_interval": "1M",
        "time_zone": "Europe/Stockholm"
      },
      "aggs": {
        "1": {
          "terms": {
            "field": "symbol.keyword",
            "order": {
              "2": "desc"
            },
            "size": 20
          },
          "aggs": {
            "2": {
              "avg": {
                "field": "close"
              }
            }
          }
        }
      }
    }
  },
  "query": {
  "bool": {
    "must": [],
    "filter": [
      {
        "range": {
          "date": {
            "format": "strict_date_optional_time",
            "gte": "2000-01-01T00:00:00.000Z",
            "lte": date.toJSON()
          }
        }
      }
    ],
    "should": [],
    "must_not": []
  }
},
"size": 0,
    "fields": [
      {
        "field": "date",
        "format": "date_time"
      }
    ],
    "script_fields": {},
    "stored_fields": [
      "*"
    ],
    "runtime_mappings": {},
    "_source": {
      "excludes": []
    }
}
