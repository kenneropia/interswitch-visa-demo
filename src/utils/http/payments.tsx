import "server-only";
import axios, { AxiosResponse } from "axios";
import { v4 } from "uuid";
import authManager from "./authManager";
import { GetTransactionResponse, PurchaseOtpAuthResponse } from "../types";

export const makePurchaseRequest = async () => {
  const token = await authManager.getToken();

  const url = "https://qa.interswitchng.com/api/v3/purchases";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const data = {
    customerId: "ibro007@gmail.com",
    amount: "30.50",
    transactionRef: v4(),
    currency: "NGN",
    authData:
      "CHAd30bRaSTJwKsY+v+KCgqKI1VcH2g73ZpafCRan4VbLmc8VtywAtUeljk29Uyru7adZHt6mxddHKBxXCYkYnkINml2Nv4t46IkvaoFPZ0DwzI66h3X9TWn5a4Ang7sDrWXZ/vuNbRXqlD8/RAdsFN9fOkz4BJMdJJrBYXkoLe+cMVkscnSeNETVolc7pdwY4vUmXPUZFKjnKPVH6OTc9YacVbULu1LhTIloZT92BofN9bOpT0ldDowUW7Ejddyl49mS1wvkyma4yOpYVY1nOzmPKHrUH/YBFUAx3y4umCBHbjRyQAVTskXUec7Nc5eV+Ob5d+tXFThRjI2HhSaCw==",
    callbackUrl: "http://localhost:3000/api/authorize-transaction",
    deviceInformation: {
      httpBrowserLanguage: "en-GB",
      httpBrowserJavaEnabled: true,
      httpBrowserJavaScriptEnabled: true,
      httpBrowserColorDepth: 24,
      httpBrowserScreenHeight: 1203,
      httpBrowserScreenWidth: 2138,
      httpBrowserTimeDifference: -60,
      userAgentBrowserValue:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      deviceChannel: "Browser",
    },
  };
  try {
    const response = await axios.post(url, data, { headers });

    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
  }
};

interface PurchaseOtpAuth {
  paymentId: string;
  transactionId: string;
}

export const makePurchaseOtpAuthRequest = async (
  purchaseOtpAuthData: PurchaseOtpAuth
) => {
  const token = await authManager.getToken();
  const url = "https://qa.interswitchng.com/api/v3/purchases/otps/auths";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const data = {
    ...purchaseOtpAuthData,
    eciFlag: "07",
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data as PurchaseOtpAuthResponse;
  } catch (error: any) {
    console.error(error.response.data);
  }
};

interface GetTransactionArgs {
  merchantCode: string;
  transactionReference: string;
  amount: number;
}

export async function getTransaction(
  params: GetTransactionArgs
): Promise<GetTransactionResponse> {
  const url =
    "https://qa.interswitchng.com/collections/api/v1/gettransaction.json";

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params, amount: +params.amount * 100 },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
