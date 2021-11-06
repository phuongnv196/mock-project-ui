import {HttpClient} from './httpClient';
import { serialize } from "object-to-formdata";

const client = new HttpClient();
const shopApi =  {
    getOrderById: async (orderId: string): Promise<any> => {
        var url = `Order/${orderId}`;
        return await client.get<any>(url);
    },
    getById: async (cartId: string, deliveryInformation: string): Promise<any> => {
        var url = `Order`;
        return await client.post<any>(url, {
            cartId: cartId,
            deliveryInformation: deliveryInformation
          });
    },
    cancelOrder: async (orderId: string, customerId: string): Promise<any> => {
        var url = `Order/cancel`;
        return await client.put<any>(url, {
            orderId: orderId,
            customerId: customerId
          });
    },
    changeStatus: async (orderId: string, customerId: string, orderStatus: string, shopId: string): Promise<any> => {
        var url = `Order/cancel`;
        return await client.put<any>(url, {
            orderId: orderId,
            orderStatus: orderStatus,
            customerId: customerId,
            shopId: shopId
          });
    },
    getAllOrderCustomer: async(customerId: string): Promise<any> => {
        var url = `Order/${customerId}/customer/all`;
        return await client.get<any>(url);
    },
    getAllOrderShop: async(shopId: string): Promise<any> => {
        var url = `Order/${shopId}/shop/all`;
        return await client.get<any>(url);
    }
}

export default shopApi;