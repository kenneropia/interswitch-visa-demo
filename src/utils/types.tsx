export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  merchant_code: string;
  client_name: string;
  payable_id: string;
  jti: string;
}

export interface DeviceInformation {
  httpBrowserLanguage: string;
  httpBrowserJavaEnabled: boolean;
  httpBrowserJavaScriptEnabled: boolean;
  httpBrowserColorDepth: number;
  httpBrowserScreenHeight: number;
  httpBrowserScreenWidth: number;
  httpBrowserTimeDifference: number;
  userAgentBrowserValue: string;
  deviceChannel: string;
}

export interface PaymentInitiateResponse {
  transactionRef: string;
  paymentId: string;
  amount: string;
  responseCode: string;
  transactionId: string;
  jwt: string;
  MD: string;
  ACSUrl: string;
  TermUrl: string;
  eciFlag: string;
}

export interface PurchaseOtpAuthResponse {
  transactionRef: string;
  message: string;
  transactionIdentifier: string;
  amount: string;
  responseCode: string;
  retrievalReferenceNumber: string;
  stan: string;
  terminalId: string;
  bankCode: string;
}

export interface ThreeDSResponse {
  TransactionId: string;
  Response: string;
  MD: string;
}
export enum PaymentStatus {
  PENDING = "PENDING",
  FAILURE = "FAILURE",
  COMPLETE = "COMPLETE",
}

export interface GetTransactionResponse {
  Amount: number;
  CardNumber: string;
  MerchantReference: string;
  PaymentReference: string;
  RetrievalReferenceNumber: string;
  Stan: string;
  Channel: string;
  TerminalId: string;
  SplitAccounts: any[]; // You might want to replace 'any' with a specific type if needed
  TransactionDate: string;
  ResponseCode: string;
  ResponseDescription: string;
  BankCode: string;
  PaymentId: number;
  RemittanceAmount: number;
}
