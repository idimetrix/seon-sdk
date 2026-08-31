/**
 * @fileoverview Error Handling and Edge Cases Tests
 * @description Comprehensive test suite for error handling, network failures,
 * API errors, and edge case scenarios in the SEON SDK.
 */

import { Seon } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Error Handling and Edge Cases", () => {
  let seon: Seon;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create Seon instance with error logging disabled for tests
    seon = new Seon("test-api-key", undefined, false);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    // Give time for any pending async operations to complete
    return new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterAll(async () => {
    // Final cleanup to ensure all async operations complete
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  describe("Network Error Handling", () => {
    it("should handle network failure", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(seon.fraud({ email: "test@example.com" })).rejects.toThrow(
        "Network error",
      );
    });

    it("should handle timeout errors", async () => {
      mockFetch.mockRejectedValue(new Error("Request timeout"));

      await expect(seon.fraud({ email: "test@example.com" })).rejects.toThrow(
        "Request timeout",
      );
    });

    it("should handle DNS resolution errors", async () => {
      mockFetch.mockRejectedValue(new Error("ENOTFOUND"));

      await expect(seon.fraud({ email: "test@example.com" })).rejects.toThrow(
        "ENOTFOUND",
      );
    });
  });

  describe("HTTP Error Status Codes", () => {
    it("should handle 401 Unauthorized", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        text: async () => "Invalid API key",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["401 - Unauthorized"]).toBe("Invalid API key");
    });

    it("should handle 403 Forbidden", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 403,
        statusText: "Forbidden",
        text: async () => "Access denied",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["403 - Forbidden"]).toBe("Access denied");
    });

    it("should handle 404 Not Found", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: async () => "Endpoint not found",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["404 - Not Found"]).toBe("Endpoint not found");
    });

    it("should handle 429 Rate Limit Exceeded", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
        text: async () => "Rate limit exceeded",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["429 - Too Many Requests"]).toBe(
        "Rate limit exceeded",
      );
    });

    it("should handle 500 Internal Server Error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => "Server error occurred",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["500 - Internal Server Error"]).toBe(
        "Server error occurred",
      );
    });

    it("should handle 502 Bad Gateway", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 502,
        statusText: "Bad Gateway",
        text: async () => "Gateway error",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["502 - Bad Gateway"]).toBe("Gateway error");
    });

    it("should handle 503 Service Unavailable", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 503,
        statusText: "Service Unavailable",
        text: async () => "Service temporarily unavailable",
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["503 - Service Unavailable"]).toBe(
        "Service temporarily unavailable",
      );
    });
  });

  describe("Malformed Response Handling", () => {
    it("should handle invalid JSON response", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic",
        url: "",
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        bytes: jest.fn(),
      } as Response);

      await expect(seon.fraud({ email: "test@example.com" })).rejects.toThrow(
        "Invalid JSON",
      );
    });

    it("should handle empty response", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => null,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      expect(response).toBeNull();
    });

    it("should handle unexpected response structure", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ unexpected: "structure" }),
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      expect(response).toEqual({ unexpected: "structure" });
    });
  });

  describe("Input Validation Edge Cases", () => {
    it("should handle extremely long email addresses", async () => {
      const longEmail = "a".repeat(100) + "@" + "b".repeat(100) + ".com";

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 50 },
        }),
      } as Response);

      const response = await seon.fraud({ email: longEmail });
      expect(response.success).toBe(true);
    });

    it("should handle special characters in request data", async () => {
      const specialCharsRequest = {
        email: "test+special@example.com",
        user_fullname: "José María O'Connor-Smith",
        user_street: "123 Main St. Apt #4B",
        custom_fields: {
          description: "Special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?",
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 30 },
        }),
      } as Response);

      const response = await seon.fraud(specialCharsRequest);
      expect(response.success).toBe(true);
    });

    it("should handle Unicode characters", async () => {
      const unicodeRequest = {
        email: "тест@例え.中国",
        user_fullname: "测试用户",
        user_city: "北京市",
        custom_fields: {
          note: "Тест с unicode 字符 🚀",
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 20 },
        }),
      } as Response);

      const response = await seon.fraud(unicodeRequest);
      expect(response.success).toBe(true);
    });

    it("should handle null and undefined values", async () => {
      const nullValueRequest = {
        email: "test@example.com",
        user_fullname: undefined,
        user_city: undefined,
        transaction_amount: 0,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 25 },
        }),
      } as Response);

      const response = await seon.fraud(nullValueRequest);
      expect(response.success).toBe(true);
    });
  });

  describe("Large Payload Handling", () => {
    it("should handle large custom fields object", async () => {
      const largeCustomFields: Record<string, any> = {};
      for (let i = 0; i < 100; i++) {
        largeCustomFields[`field_${i}`] = `value_${i}`;
      }

      const largeRequest = {
        email: "test@example.com",
        custom_fields: largeCustomFields,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 35 },
        }),
      } as Response);

      const response = await seon.fraud(largeRequest);
      expect(response.success).toBe(true);
    });

    it("should handle many items in transaction", async () => {
      const manyItems = Array.from({ length: 50 }, (_, i) => ({
        item_id: `ITEM_${i}`,
        item_name: `Product ${i}`,
        item_quantity: 1,
        item_price: 10.99,
        item_store: "Test Store",
        item_store_country: "US",
        item_category: "test",
        item_url: `https://example.com/item${i}`,
        item_custom_fields: {
          sku: `SKU_${i}`,
        },
      }));

      const largeItemsRequest = {
        email: "test@example.com",
        items: manyItems,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 40 },
        }),
      } as Response);

      const response = await seon.fraud(largeItemsRequest);
      expect(response.success).toBe(true);
    });
  });

  describe("Console Logging Verification", () => {
    it("should not log errors when logging is disabled", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => "Invalid request format",
      } as Response);

      await seon.fraud({ email: "test@example.com" });

      // Should not log since error logging is disabled for tests
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should log error details when logging is enabled", async () => {
      // Create instance with logging enabled
      const seonWithLogging = new Seon("test-api-key", undefined, true);

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => "Invalid request format",
      } as Response);

      await seonWithLogging.fraud({ email: "test@example.com" });

      expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid request format", {
        status: 400,
        statusText: "Bad Request",
      });
    });
  });
});
