# Nutritionix Querying Language (NXQL)

NXQL allows developers to write more advanced queries against our data pool.  Examples of what you can do with an advanced query:
- Filter items by their type (show ONLY USDA items or ONLY CPG items)
- Filter nutrient ranges (>100 calories AND <500 calories)

All requests are `POST` and require a valid `JSON` object be sent to https://api.nutritionix.com/v1_1/search
You can paste any of the below `JSON` examples into this curl request and they will retrieve results assuming you have added your appKey, and appId.

### Request Requirements
- Must provide valid `appId` and `appKey`
- Must provide `filters`, `queries`, or `query` properties in your `JSON` object
- Must set `Content-Type` to `application/json`

```shell
curl -XPOST https://api.nutritionix.com/v1_1/search -H 'Content-Type: application/json' -d'
{
 "appId":"YOUR_API_ID",
 "appKey":"YOUR_API_KEY",
 "query":"Cookies `n Cream"
}
'
```

### Filtering Item Type and sorting by score
This example will yield only CPG items
Item Types(`item_type`)
- 1 = Restaurant
- 2 = CPG (packaged foods with barcodes)
- 3 = USDA

```javascript
/**
  *
  * Ensure you pass your API credentials
  * Select the fields you want to return
  * Set the sorting mechanism
  * Apply some filters to the data
  *
  **/
```

```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOU_APP_KEY",  
  "fields":["item_name","brand_name","upc"],
  "sort":{
    "field":"_score",
    "order":"desc"
  },
  "filters":{
    "item_type":2
  }
}
```

or you want all the `item_type`s except restaurant items

```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOU_APP_KEY",
  "filters":{
    "not":{
     "item_type":2
    }
  }
}
```

### Range Filters
You can filter numeric_fields using several operators

- gt
- gte
- lt
- lte

Or

- from
- to

```json
{
 "appId":"YOUR_APP_ID",
 "appKey":"YOU_APP_KEY",
 "filters"{
  "nf_calories":{
   "from":100,
   "to":50
  },
  "nf_sodium":{
   "lte":200
  }
 }
}
```

### Nutritionix Search
You can use the default search where we apply boosting, and multi search factors
to yield the most relevant results to your users.
```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOU_APP_KEY",
  "query":"Starbucks Frappuccino"
}

```

### Wild Card Searches
This query will yield starbucks frappuccino results
```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOU_APP_KEY",
  "query":"Star* Frap*"
}

```

### Different Boolean Search Operators
This query will yield results that have starbucks or frappuccino
Available Operators
- OR
- AND (Default)

```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOU_APP_KEY",
  "query":"Starbucks OR Frappuccino*"
}

```

### Custom Multi Field Search
If you want to search specific words across multiple fields
```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOU_APP_KEY",
  "queries":{
    "item_name":"Kids Fries",
    "brand_name":"McDonalds"
  }
}

```

### Filter to a specific brand, and paginate the results
On the API /:version/search GET endpoint we have the results default sorting by `_score`.
Document scores can very sometimes, so to keep your search results consistent you can sort on a field that doesn't change.

```json
{
  "appId":"YOUR_APP_ID",
  "appKey":"YOUR_APP_KEY",
  "fields":["item_name","brand_name","nf_calories","nf_sodium","item_type"],
  "offset":250,
  "limit":50,
  "sort":{
    "field":"item_name.sortable_na",
    "order":"asc"
  },
  "filters":{
   "brand_id":"513fbc1283aa2dc80c00001a"
  }
}
```

### Sorting by item_name or brand_name

```json
{
  "appId": "YOUR_APP_ID",
  "appKey": "YOUR_APP_KEY",
  "query": "kraft",
  "fields": [
    "item_name",
    "brand_name"
  ],
  "sort": {
    "field": "item_name.sortable_na",
    "order": "asc"
  }
}
```


**NOTE** `.sortable_na`
This field is the original name, untouched by our texted analyzers. Thus `sortable_na (not analyzed)`

- `item_name.sortable_na`
- `brand_name.sortable_na`

### Advanced Query Full Example
Lets get really fancy with it
Here is the breakdown for this search

- appId
- appKey
- fields (an array of item attributes you want to return)
- offset (The starting point in the result set for paging)
- limit (The max number of results to be returned in the page)
- sort (the field who's numerical value you want to sort by in descending order)
- min_score (the minimum score that you want any returned document to have)
- query (A phrase with special operators `OR ~ *`)
- filters.not.item_type:2 (ensuring that we don't pay any attention to CPG data)
- filters.nf_calories (a range filter to and from a certain numerical range)
- filters.nf_sodium (a boolean filter for less than)

```json
{
  "appId": "YOUR_APP_ID",
  "appKey": "YOUR_APP_KEY",
  "fields": [
    "item_name",
    "brand_name",
    "nf_calories",
    "nf_sodium",
    "item_type"
  ],
  "offset": 0,
  "limit": 50,
  "sort": {
    "field": "nf_calories",
    "order": "desc"
  },
  "min_score": 0.5,
  "query": "starbucks AND frap*",
  "filters": {
    "not": {
      "item_type": 2
    },
    "nf_calories": {
      "from": 0,
      "to": 400
    }
  }
}
```

This search yield these results.

```json
{
    "total": 3,
    "max_score": null,
    "hits": [
        {
            "_index": "4qnk4vry5gujjxptu5rg",
            "_type": "item",
            "_id": "513fc9c6673c4fbc26001dca",
            "_score": null,
            "fields": {
                "nf_sodium": 100,
                "item_name": "Starbucks Coffee Frappuccino (Yield: 1 bottle)",
                "brand_name": "Gandolfo's New York Delicatessen",
                "nf_calories": 200,
                "item_type": 1
            },
            "sort": [
                200
            ]
        },
        {
            "_index": "4qnk4vry5gujjxptu5rg",
            "_type": "item",
            "_id": "513fc9c6673c4fbc26001dcd",
            "_score": null,
            "fields": {
                "nf_sodium": 100,
                "item_name": "Starbucks Vanilla Frappuccino (Yield: 1 bottle)",
                "brand_name": "Gandolfo's New York Delicatessen",
                "nf_calories": 200,
                "item_type": 1
            },
            "sort": [
                200
            ]
        },
        {
            "_index": "4qnk4vry5gujjxptu5rg",
            "_type": "item",
            "_id": "513fc9c6673c4fbc26001dcc",
            "_score": null,
            "fields": {
                "nf_sodium": 95,
                "item_name": "Starbucks Mocha Frappuccino (Yield: 1 bottle)",
                "brand_name": "Gandolfo's New York Delicatessen",
                "nf_calories": 180,
                "item_type": 1
            },
            "sort": [
                180
            ]
        }
    ]
}
```

### Multi-Field Sorting
Uses the same syntax for sort, but puts them in an array.
This will not work properly if each object does not contain `field` and `order` properties.

```json
{
  "fields":["_score","item_name","brand_name","item_type"],
  "sort":[
    {
      "field":"item_type",
      "order":"desc"
    },
    {
      "field" : "_score",
      "order" : "asc"
    }
  ],
  "query":"turkey"
}
```