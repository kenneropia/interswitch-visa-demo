import "server-only";

import axios, { AxiosResponse } from "axios";
import { AccessTokenResponse } from "../types";

let instance: AuthManager;

class AuthManager {
  private token: string | null;
  private tokenExpiration: number;

  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    this.token = null;
    this.tokenExpiration = 0;
    instance = this;
  }

  private getAuthorizationHeader = () =>
    "Basic " +
    Buffer.from(
      `${process.env.INTERSWITCH_CLIENT}:${process.env.INTERSWITCH_SERVER}`
    ).toString("base64");

  private callTokenGenerationAPI = async () => {
    try {
      const { data }: AxiosResponse<AccessTokenResponse> = await axios.post(
        "https://apps.qa.interswitchng.com/passport/oauth/token",
        { grant_type: "client_credentials" },

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: this.getAuthorizationHeader(),
          },
        }
      );
      console.log(`0_TOKEN_GENERATION: ${data}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  async getToken() {
    if (!this.token || Date.now() >= this.tokenExpiration) {
      await this.refreshToken();
    }
    return this.token;
  }

  private async refreshToken() {
    // Call the token generation API
    const { access_token, expires_in } = await this.callTokenGenerationAPI();

    // Update the stored token and its expiration time
    this.token = access_token;
    this.tokenExpiration = Date.now() + expires_in * 1000; // expiresIn is in seconds
  }
}

const authManager = new AuthManager();

export default authManager;
