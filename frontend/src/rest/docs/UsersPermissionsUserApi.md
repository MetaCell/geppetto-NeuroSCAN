# NeuroScan.UsersPermissionsUserApi

All URIs are relative to *http://localhost:1337*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authEmailConfirmationGet**](UsersPermissionsUserApi.md#authEmailConfirmationGet) | **GET** /auth/email-confirmation | 
[**authForgotPasswordPost**](UsersPermissionsUserApi.md#authForgotPasswordPost) | **POST** /auth/forgot-password | 
[**authLocalPost**](UsersPermissionsUserApi.md#authLocalPost) | **POST** /auth/local | 
[**authLocalRegisterPost**](UsersPermissionsUserApi.md#authLocalRegisterPost) | **POST** /auth/local/register | 
[**authProviderCallbackGet**](UsersPermissionsUserApi.md#authProviderCallbackGet) | **GET** /auth/{provider}/callback | 
[**authResetPasswordPost**](UsersPermissionsUserApi.md#authResetPasswordPost) | **POST** /auth/reset-password | 
[**authSendEmailConfirmationPost**](UsersPermissionsUserApi.md#authSendEmailConfirmationPost) | **POST** /auth/send-email-confirmation | 
[**connectGet**](UsersPermissionsUserApi.md#connectGet) | **GET** /connect/* | 
[**usersGet**](UsersPermissionsUserApi.md#usersGet) | **GET** /users | 
[**usersIdDelete**](UsersPermissionsUserApi.md#usersIdDelete) | **DELETE** /users/{id} | 
[**usersIdGet**](UsersPermissionsUserApi.md#usersIdGet) | **GET** /users/{id} | 
[**usersIdPut**](UsersPermissionsUserApi.md#usersIdPut) | **PUT** /users/{id} | 
[**usersMeGet**](UsersPermissionsUserApi.md#usersMeGet) | **GET** /users/me | 
[**usersPermissionsSearchIdGet**](UsersPermissionsUserApi.md#usersPermissionsSearchIdGet) | **GET** /users-permissions/search/{id} | 



## authEmailConfirmationGet

> Object authEmailConfirmationGet()



Validate a user account

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
apiInstance.authEmailConfirmationGet().then((data) => {
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


## authForgotPasswordPost

> Object authForgotPasswordPost(forgotPasswordForm)



Send the reset password email link

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let forgotPasswordForm = new NeuroScan.ForgotPasswordForm(); // ForgotPasswordForm | 
apiInstance.authForgotPasswordPost(forgotPasswordForm).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **forgotPasswordForm** | [**ForgotPasswordForm**](ForgotPasswordForm.md)|  | 

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authLocalPost

> Object authLocalPost(localAuthForm)



Login a user using the identifiers email and password

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let localAuthForm = new NeuroScan.LocalAuthForm(); // LocalAuthForm | 
apiInstance.authLocalPost(localAuthForm).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **localAuthForm** | [**LocalAuthForm**](LocalAuthForm.md)|  | 

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authLocalRegisterPost

> UsersPermissionsUser authLocalRegisterPost(newUsersPermissionsUser)



Register a new user with the default role

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let newUsersPermissionsUser = new NeuroScan.NewUsersPermissionsUser(); // NewUsersPermissionsUser | 
apiInstance.authLocalRegisterPost(newUsersPermissionsUser).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newUsersPermissionsUser** | [**NewUsersPermissionsUser**](NewUsersPermissionsUser.md)|  | 

### Return type

[**UsersPermissionsUser**](UsersPermissionsUser.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authProviderCallbackGet

> Object authProviderCallbackGet(provider)



Successfull redirection after approving a provider

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let provider = "provider_example"; // String | 
apiInstance.authProviderCallbackGet(provider).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | **String**|  | 

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## authResetPasswordPost

> Object authResetPasswordPost(resetPasswordForm)



Reset user password with a code (resetToken)

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let resetPasswordForm = new NeuroScan.ResetPasswordForm(); // ResetPasswordForm | 
apiInstance.authResetPasswordPost(resetPasswordForm).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resetPasswordForm** | [**ResetPasswordForm**](ResetPasswordForm.md)|  | 

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authSendEmailConfirmationPost

> Object authSendEmailConfirmationPost(emailConfirmationForm)



Send a confirmation email to user

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let emailConfirmationForm = new NeuroScan.EmailConfirmationForm(); // EmailConfirmationForm | 
apiInstance.authSendEmailConfirmationPost(emailConfirmationForm).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailConfirmationForm** | [**EmailConfirmationForm**](EmailConfirmationForm.md)|  | 

### Return type

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## connectGet

> Object connectGet()



Connect a provider

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
apiInstance.connectGet().then((data) => {
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


## usersGet

> [UsersPermissionsUser] usersGet(opts)



Retrieve all user documents

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
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
apiInstance.usersGet(opts).then((data) => {
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

[**[UsersPermissionsUser]**](UsersPermissionsUser.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersIdDelete

> Object usersIdDelete(id)



Delete an existing user

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let id = "id_example"; // String | 
apiInstance.usersIdDelete(id).then((data) => {
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

**Object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersIdGet

> UsersPermissionsUser usersIdGet(id)



Retrieve a single user depending on his id

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let id = "id_example"; // String | 
apiInstance.usersIdGet(id).then((data) => {
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

[**UsersPermissionsUser**](UsersPermissionsUser.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersIdPut

> UsersPermissionsUser usersIdPut(id, newUsersPermissionsUser)



Update an existing user

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let id = "id_example"; // String | 
let newUsersPermissionsUser = new NeuroScan.NewUsersPermissionsUser(); // NewUsersPermissionsUser | 
apiInstance.usersIdPut(id, newUsersPermissionsUser).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **newUsersPermissionsUser** | [**NewUsersPermissionsUser**](NewUsersPermissionsUser.md)|  | 

### Return type

[**UsersPermissionsUser**](UsersPermissionsUser.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## usersMeGet

> UsersPermissionsUser usersMeGet()



Retrieve the logged in user information

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
apiInstance.usersMeGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UsersPermissionsUser**](UsersPermissionsUser.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersPermissionsSearchIdGet

> [UsersPermissionsUser] usersPermissionsSearchIdGet(id, opts)



Search for users

### Example

```javascript
import NeuroScan from 'neuro_scan';
let defaultClient = NeuroScan.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new NeuroScan.UsersPermissionsUserApi();
let id = "id_example"; // String | 
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
apiInstance.usersPermissionsSearchIdGet(id, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
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

[**[UsersPermissionsUser]**](UsersPermissionsUser.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

