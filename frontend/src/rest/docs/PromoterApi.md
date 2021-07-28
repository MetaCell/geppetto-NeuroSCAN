# NeuroScan.PromoterApi

All URIs are relative to *http://localhost:1337*

Method | HTTP request | Description
------------- | ------------- | -------------
[**promotersCountGet**](PromoterApi.md#promotersCountGet) | **GET** /promoters/count | 
[**promotersGet**](PromoterApi.md#promotersGet) | **GET** /promoters | 
[**promotersIdDelete**](PromoterApi.md#promotersIdDelete) | **DELETE** /promoters/{id} | 
[**promotersIdGet**](PromoterApi.md#promotersIdGet) | **GET** /promoters/{id} | 
[**promotersIdPut**](PromoterApi.md#promotersIdPut) | **PUT** /promoters/{id} | 
[**promotersPost**](PromoterApi.md#promotersPost) | **POST** /promoters | 



## promotersCountGet

> Object promotersCountGet()



### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.PromoterApi();
apiInstance.promotersCountGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## promotersGet

> [Promoter] promotersGet(opts)



### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.PromoterApi();
let opts = {
  'limit': 56, // Number | Maximum number of results possible
  'sort': "sort_example", // String | Sort according to a specific field.
  'start': 56, // Number | Skip a specific number of entries (especially useful for pagination)
  'eq': "eq_example", // String | Get entries that matches exactly your input
  'ne': "ne_example", // String | Get records that are not equals to something
  'lt': "lt_example", // String | Get record that are lower than a value
  'lte': "lte_example", // String | Get records that are lower than or equal to a value
  'gt': "gt_example", // String | Get records that are greater than a value
  'gte': "gte_example", // String | Get records that are greater than  or equal a value
  'contains': "contains_example", // String | Get records that contains a value
  'containss': "containss_example", // String | Get records that contains (case sensitive) a value
  '_in': ["null"], // [String] | Get records that matches any value in the array of values
  'nin': ["null"] // [String] | Get records that doesn't match any value in the array of values
};
apiInstance.promotersGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Maximum number of results possible | [optional] 
 **sort** | **String**| Sort according to a specific field. | [optional] 
 **start** | **Number**| Skip a specific number of entries (especially useful for pagination) | [optional] 
 **eq** | **String**| Get entries that matches exactly your input | [optional] 
 **ne** | **String**| Get records that are not equals to something | [optional] 
 **lt** | **String**| Get record that are lower than a value | [optional] 
 **lte** | **String**| Get records that are lower than or equal to a value | [optional] 
 **gt** | **String**| Get records that are greater than a value | [optional] 
 **gte** | **String**| Get records that are greater than  or equal a value | [optional] 
 **contains** | **String**| Get records that contains a value | [optional] 
 **containss** | **String**| Get records that contains (case sensitive) a value | [optional] 
 **_in** | [**[String]**](String.md)| Get records that matches any value in the array of values | [optional] 
 **nin** | [**[String]**](String.md)| Get records that doesn&#39;t match any value in the array of values | [optional] 

### Return type

[**[Promoter]**](Promoter.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## promotersIdDelete

> Number promotersIdDelete(id)



Delete a record

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.PromoterApi();
let id = "id_example"; // String | 
apiInstance.promotersIdDelete(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

**Number**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## promotersIdGet

> Promoter promotersIdGet(id)



### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.PromoterApi();
let id = "id_example"; // String | 
apiInstance.promotersIdGet(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**Promoter**](Promoter.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## promotersIdPut

> Promoter promotersIdPut(id, newPromoter)



Update a record

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.PromoterApi();
let id = "id_example"; // String | 
let newPromoter = new NeuroScan.NewPromoter(); // NewPromoter | 
apiInstance.promotersIdPut(id, newPromoter).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **newPromoter** | [**NewPromoter**](NewPromoter.md)|  | 

### Return type

[**Promoter**](Promoter.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## promotersPost

> Promoter promotersPost(newPromoter)



Create a new record

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.PromoterApi();
let newPromoter = new NeuroScan.NewPromoter(); // NewPromoter | 
apiInstance.promotersPost(newPromoter).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newPromoter** | [**NewPromoter**](NewPromoter.md)|  | 

### Return type

[**Promoter**](Promoter.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

