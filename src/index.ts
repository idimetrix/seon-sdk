import { FraudApiRequest, FraudApiResponse } from "./types";

export class Seon {
  constructor(
    private readonly key: string,
    private readonly url: string = "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2",
    // private readonly url: string = "https://api.seon.io/SeonRestService/fraud-api/v2",
  ) {}

  async fraud(request: FraudApiRequest): Promise<FraudApiResponse> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "X-API-KEY": this.key,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      const json: FraudApiResponse =
        (await response.json()) as FraudApiResponse;

      return json;
    } else {
      const text = await response.text();

      console.log(response.status, response.statusText, text);

      return {
        success: false,
        error: {
          [`${response.status} - ${response.statusText}`]: text,
        },
        data: undefined,
      };
    }
  }
}

export * from "./types";
export * from "./utils";
