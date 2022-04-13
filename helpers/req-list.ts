export default {
  sumVolume: {
    "aggs": {
      "0": {
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
    },
    "query": {
      "bool": {
        "must": [],
        "filter": [
          {
            "range": {
              "date": {
                "format": "strict_date_optional_time",
                "gte": "1999-12-31T23:00:00.000Z",
                "lte": "2022-04-13T12:48:57.595Z"
              }
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
  }
}