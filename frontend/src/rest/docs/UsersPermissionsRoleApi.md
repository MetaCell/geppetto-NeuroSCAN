# NeuroScan.UsersPermissionsRoleApi

All URIs are relative to *http://localhost:1337*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersPermissionsRolesGet**](UsersPermissionsRoleApi.md#usersPermissionsRolesGet) | **GET** /users-permissions/roles | 
[**usersPermissionsRolesIdGet**](UsersPermissionsRoleApi.md#usersPermissionsRolesIdGet) | **GET** /users-permissions/roles/{id} | 
[**usersPermissionsRolesPost**](UsersPermissionsRoleApi.md#usersPermissionsRolesPost) | **POST** /users-permissions/roles | 
[**usersPermissionsRolesRoleDelete**](UsersPermissionsRoleApi.md#usersPermissionsRolesRoleDelete) | **DELETE** /users-permissions/roles/{role} | 
[**usersPermissionsRolesRolePut**](UsersPermissionsRoleApi.md#usersPermissionsRolesRolePut) | **PUT** /users-permissions/roles/{role} | 



## usersPermissionsRolesGet

> [UsersPermissionsRole] usersPermissionsRolesGet(opts)



Retrieve all role documents

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsRoleApi();
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
apiInstance.usersPermissionsRolesGet(opts).then((data) => {
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

[**[UsersPermissionsRole]**](UsersPermissionsRole.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersPermissionsRolesIdGet

> UsersPermissionsRole usersPermissionsRolesIdGet(id)



Retrieve a role depending on its id

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsRoleApi();
let id = "id_example"; // String | 
apiInstance.usersPermissionsRolesIdGet(id).then((data) => {
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

[**UsersPermissionsRole**](UsersPermissionsRole.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersPermissionsRolesPost

> UsersPermissionsRole usersPermissionsRolesPost(newUsersPermissionsRole)



Create a new role

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsRoleApi();
let newUsersPermissionsRole = new NeuroScan.NewUsersPermissionsRole(); // NewUsersPermissionsRole | 
apiInstance.usersPermissionsRolesPost(newUsersPermissionsRole).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newUsersPermissionsRole** | [**NewUsersPermissionsRole**](NewUsersPermissionsRole.md)|  | 

### Return type

[**UsersPermissionsRole**](UsersPermissionsRole.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## usersPermissionsRolesRoleDelete

> Object usersPermissionsRolesRoleDelete(role)



Delete a role

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsRoleApi();
let role = "role_example"; // String | 
apiInstance.usersPermissionsRolesRoleDelete(role).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **String**|  | 

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersPermissionsRolesRolePut

> UsersPermissionsRole usersPermissionsRolesRolePut(role, newUsersPermissionsRole)



Update a role

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsRoleApi();
let role = "role_example"; // String | 
let newUsersPermissionsRole = new NeuroScan.NewUsersPermissionsRole(); // NewUsersPermissionsRole | 
apiInstance.usersPermissionsRolesRolePut(role, newUsersPermissionsRole).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **String**|  | 
 **newUsersPermissionsRole** | [**NewUsersPermissionsRole**](NewUsersPermissionsRole.md)|  | 

### Return type

[**UsersPermissionsRole**](UsersPermissionsRole.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

