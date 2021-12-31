import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class ApiRouting {
    private AUTH_SERVER_ADDRESS = environment;
    constructor() { }
    paths = {
        root: () => '/',
        // storeGetAll: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/GetListing`,
        // pinCodeLookup: (pincode) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/PinCodeLookup/GetByCode/${pincode}`,
        // categoryGetAll: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Category/GetAll`,
        // categoryGetById: (id) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Category/Get/${id}`,
        // categoryServiceAvailableGetAll: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/ServiceCategory/GetAll`,
        // categoryServiceAvailableGetById: (id) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/ServiceCategory/Get/${id}`,
        // serviceAvailableGetAll: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Service/GetAll`,
        // serviceAvailableGetById: (id) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Service/${id}`,
        // storeCategoryById: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Category/GetStoreCategoryListing`,
        // getStoreItemListing: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Item/GetStoreItemListing`,
        // createCustomerAddress: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/Create`,
        // getCustomerAddress: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/User/GetAll`,
        // shopingCart: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/ShopingCart`,
        // setDefaultAddress: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/SetDefaultAddress`,
        // SetDeliveryAddress: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/Order/SetDeliveryAddress`,
        // createUser: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Account/User/Create`,
        // loginUser: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Account/Login`,
        // customerLoginUser: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Customer/LoginUsingPhoneNumber`,
        merchantLogin: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Merchant/LoginUsingPhoneNumber`,
        loginUsingOtp: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Merchant/LoginUsingOtp`,
        // refreshToken: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/GenerateToken`,
        refreshTokenMerchant: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Merchant/GenerateToken`,
        // resndOtp: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Customer/ResendOtp`,
        resndOtpMerchant: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Merchant/ResendOtp`,
        // OrderTransaction: (orderAmout) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/OrderHelper/Initiate?transAmount=${orderAmout}`,
        // OrderPaymentAddNew: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Order/Payment/Customer/AddNew`,
        // OrderAddNew: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Order/Customer/AddNew`,
        // OrderGetAll: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Order/Customer/GetAll`,
        // OrderGetById: (orderid) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Order/GetById?orderId=${orderid}`
        getlisting: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/GetListing`,
        create: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/Create`,
        getdropdown: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/GetValuesForDropdow`,
        basic: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/Create/Basic`,
        address: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/Create/Address`,
        financial: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/Create/Financial`,
        documents: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/Create/Documents`,
        detailtiming: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/Create/DetailTiming`,
        getcitypincode: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/GetCityPincode`,
    };

    goTo() {
        return this.paths;
    }
}