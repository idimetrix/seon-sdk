/**
 * @fileoverview Type Definitions and Interface Validation Tests
 * @description Test suite for validating TypeScript type definitions,
 * interface structures, and type safety in the SEON SDK.
 */

import {
  FraudApiRequest,
  FraudApiResponse,
  APIRequestConfig,
  APIRequestItem,
} from "../types";
import {
  createMockDeviceDetails,
  createMockIpDetails,
  createMockEmailDetails,
  createMockPhoneDetails,
  createMockGeolocationDetails,
} from "./test-utils";

describe("Type Definitions and Interface Validation", () => {
  describe("FraudApiRequest Interface", () => {
    it("should allow minimal valid request", () => {
      const minimalRequest: FraudApiRequest = {
        email: "test@example.com",
      };

      expect(minimalRequest.email).toBe("test@example.com");
    });

    it("should allow comprehensive request with all fields", () => {
      const comprehensiveRequest: FraudApiRequest = {
        config: {
          email_api: true,
          phone_api: true,
          ip_api: true,
          aml_api: true,
          device_fingerprinting: true,
          email: {
            version: "v2",
            timeout: 2000,
            include: "breach_details",
          },
          phone: {
            version: "v1",
            timeout: 3000,
            include: "hlr_details",
          },
          ip: {
            version: "v1",
            include: "flags,history",
          },
          aml: {
            version: "v1",
            monitoring_required: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
            },
          },
        },
        action_type: "payment",
        ip: "192.168.1.1",
        transaction_id: "txn_123",
        email: "user@example.com",
        phone_number: "+1234567890",
        user_fullname: "John Doe",
        transaction_amount: 99.99,
        transaction_currency: "USD",
        custom_fields: {
          loyalty_tier: "gold",
          is_returning: true,
          order_count: 5,
        },
      };

      expect(comprehensiveRequest.email).toBe("user@example.com");
      expect(comprehensiveRequest.transaction_amount).toBe(99.99);
      expect(comprehensiveRequest.config?.email_api).toBe(true);
    });

    it("should handle e-commerce specific fields", () => {
      const ecommerceRequest: FraudApiRequest = {
        email: "customer@store.com",
        items: [
          {
            item_id: "PROD001",
            item_quantity: 2,
            item_name: "Widget",
            item_price: 49.99,
            item_store: "Main Store",
            item_store_country: "US",
            item_category: "electronics",
            item_url: "https://store.com/widget",
            item_custom_fields: {
              warranty: true,
              color: "blue",
            },
          },
        ],
        billing_country: "US",
        shipping_country: "CA",
        card_bin: "414141",
        card_last: "1234",
      };

      expect(ecommerceRequest.items).toHaveLength(1);
      expect(ecommerceRequest.items![0].item_price).toBe(49.99);
    });

    it("should handle gaming/iGaming specific fields", () => {
      const gamingRequest: FraudApiRequest = {
        action_type: "register",
        email: "player@casino.com",
        user_dob: "1990-01-01",
        user_country: "US",
        config: {
          aml_api: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
              watchlist_enabled: true,
            },
          },
        },
        custom_fields: {
          bonus_claimed: false,
          affiliate_code: "PARTNER123",
        },
      };

      expect(gamingRequest.user_dob).toBe("1990-01-01");
      expect(gamingRequest.config?.aml?.monitoring_required).toBe(true);
    });
  });

  describe("FraudApiResponse Interface", () => {
    it("should define correct response structure", () => {
      const successResponse: FraudApiResponse = {
        success: true,
        error: {},
        data: {
          id: "test123",
          state: "APPROVE",
          fraud_score: 25.5,
          version: "v2",
          applied_rules: [],
          bin_details: {
            card_bin: "414141",
            bin_bank: "Test Bank",
            bin_card: "VISA",
            bin_type: "CREDIT",
            bin_level: "STANDARD",
            bin_country: "United States",
            bin_country_code: "US",
            bin_website: "https://bank.com",
            bin_phone: "+1-800-555-0123",
            bin_valid: true,
            card_issuer: "VISA",
          },
          device_details: createMockDeviceDetails(),
          calculation_time: 1500,
          seon_id: 12345,
          ip_details: createMockIpDetails(),
          email_details: createMockEmailDetails(),
          phone_details: createMockPhoneDetails(),
          geolocation_details: createMockGeolocationDetails(),
          aml_details: null,
        },
      };

      expect(successResponse.success).toBe(true);
      expect(successResponse.data?.fraud_score).toBe(25.5);
      expect(successResponse.data?.state).toBe("APPROVE");
    });

    it("should handle error response structure", () => {
      const errorResponse: FraudApiResponse = {
        success: false,
        error: {
          "401 - Unauthorized": "Invalid API key",
        },
        data: undefined,
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error["401 - Unauthorized"]).toBe("Invalid API key");
      expect(errorResponse.data).toBeUndefined();
    });
  });

  describe("APIRequestConfig Interface", () => {
    it("should allow basic module configuration", () => {
      const basicConfig: APIRequestConfig = {
        email_api: true,
        phone_api: true,
        ip_api: true,
      };

      expect(basicConfig.email_api).toBe(true);
      expect(basicConfig.phone_api).toBe(true);
      expect(basicConfig.ip_api).toBe(true);
    });

    it("should allow detailed module configuration", () => {
      const detailedConfig: APIRequestConfig = {
        email: {
          version: "v2",
          timeout: 5000,
          priority_timeout: 2000,
          include: "flags,history,breach_details",
          data_enrichment_mode: "detailed",
        },
        phone: {
          version: "v1",
          timeout: 3000,
          include: "hlr_details,cnam_lookup",
          exclude: "photo,last_seen",
        },
        ip: {
          version: "v1",
          include: "flags,history",
          flags_timeframe_days: 30,
        },
        aml: {
          version: "v1",
          monitoring_required: true,
          monitoring_schedule: "MONTHLY",
          fuzzy_enabled: true,
          phonetic_search_enabled: true,
          scoring: {
            result_limit: 10,
            score_threshold: 0.85,
          },
          sources: {
            sanction_enabled: true,
            pep_enabled: true,
            watchlist_enabled: true,
            crimelist_enabled: true,
            adversemedia_enabled: true,
          },
        },
        device: {
          include: "device_location,extended_device_location",
          response_fields: "id,state,fraud_score",
        },
      };

      expect(detailedConfig.email?.version).toBe("v2");
      expect(detailedConfig.aml?.monitoring_schedule).toBe("MONTHLY");
      expect(detailedConfig.aml?.sources?.sanction_enabled).toBe(true);
    });
  });

  describe("APIRequestItem Interface", () => {
    it("should validate item structure", () => {
      const testItem: APIRequestItem = {
        item_id: "SKU123",
        item_quantity: 3,
        item_name: "Test Product",
        item_price: 29.99,
        item_store: "Online Store",
        item_store_country: "US",
        item_category: "clothing",
        item_url: "https://store.com/product/sku123",
        item_custom_fields: {
          brand: "TestBrand",
          size: "M",
          color: "red",
          on_sale: true,
          discount_percent: 20,
        },
      };

      expect(testItem.item_id).toBe("SKU123");
      expect(testItem.item_quantity).toBe(3);
      expect(testItem.item_price).toBe(29.99);
      expect(testItem.item_custom_fields?.brand).toBe("TestBrand");
      expect(testItem.item_custom_fields?.on_sale).toBe(true);
    });

    it("should handle various custom field types", () => {
      const itemWithVariousFields: APIRequestItem = {
        item_id: "ITEM001",
        item_quantity: 1,
        item_name: "Complex Item",
        item_price: 99.99,
        item_store: "Test Store",
        item_store_country: "US",
        item_category: "test",
        item_url: "https://test.com",
        item_custom_fields: {
          string_field: "text value",
          boolean_field: false,
          number_field: 42,
          another_string: "another value",
          another_boolean: true,
          another_number: 3.14,
        },
      };

      expect(
        typeof itemWithVariousFields.item_custom_fields?.string_field,
      ).toBe("string");
      expect(
        typeof itemWithVariousFields.item_custom_fields?.boolean_field,
      ).toBe("boolean");
      expect(
        typeof itemWithVariousFields.item_custom_fields?.number_field,
      ).toBe("number");
    });
  });

  describe("Optional Field Handling", () => {
    it("should handle requests with only required fields", () => {
      const minimalRequest: FraudApiRequest = {};

      // Should not throw any TypeScript errors
      expect(typeof minimalRequest).toBe("object");
    });

    it("should handle partial configuration objects", () => {
      const partialConfig: APIRequestConfig = {
        email_api: true,
        email: {
          version: "v2",
          // Other fields are optional
        },
      };

      expect(partialConfig.email?.version).toBe("v2");
      expect(partialConfig.phone_api).toBeUndefined();
    });

    it("should handle undefined and null values", () => {
      const requestWithNulls: FraudApiRequest = {
        email: "test@example.com",
        user_fullname: undefined,
        transaction_amount: undefined,
        custom_fields: {
          optional_field: "present",
          numeric_field: 42,
        },
      };

      expect(requestWithNulls.email).toBe("test@example.com");
      expect(requestWithNulls.user_fullname).toBeUndefined();
    });
  });

  describe("Type Union Validation", () => {
    it("should handle union types in custom fields", () => {
      const requestWithUnions: FraudApiRequest = {
        email: "test@example.com",
        custom_fields: {
          mixed_string: "string value",
          mixed_boolean: true,
          mixed_number: 123,
        },
      };

      expect(requestWithUnions.custom_fields?.mixed_string).toBe(
        "string value",
      );
      expect(requestWithUnions.custom_fields?.mixed_boolean).toBe(true);
      expect(requestWithUnions.custom_fields?.mixed_number).toBe(123);
    });

    it("should validate monitoring schedule enum values", () => {
      const validSchedules = [
        "ON_CHANGE",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "TWICE_A_YEAR",
        "EVERY_YEAR",
      ];

      validSchedules.forEach((schedule) => {
        const configWithSchedule: APIRequestConfig = {
          aml: {
            version: "v1",
            monitoring_schedule: schedule as
              | "ON_CHANGE"
              | "DAILY"
              | "WEEKLY"
              | "MONTHLY"
              | "QUARTERLY"
              | "TWICE_A_YEAR"
              | "EVERY_YEAR",
          },
        };

        expect(configWithSchedule.aml?.monitoring_schedule).toBe(schedule);
      });
    });
  });

  describe("Nested Object Type Safety", () => {
    it("should maintain type safety in deeply nested structures", () => {
      const deeplyNestedRequest: FraudApiRequest = {
        email: "nested@test.com",
        config: {
          aml: {
            version: "v1",
            scoring: {
              result_limit: 15,
              score_threshold: 0.9,
            },
            sources: {
              sanction_enabled: true,
              pep_enabled: false,
              watchlist_enabled: true,
            },
          },
        },
      };

      expect(deeplyNestedRequest.config?.aml?.scoring?.result_limit).toBe(15);
      expect(deeplyNestedRequest.config?.aml?.sources?.sanction_enabled).toBe(
        true,
      );
    });

    it("should handle array types correctly", () => {
      const requestWithArrays: FraudApiRequest = {
        email: "arrays@test.com",
        items: [
          {
            item_id: "ITEM1",
            item_quantity: 1,
            item_name: "Item 1",
            item_price: 10.0,
            item_store: "Store",
            item_store_country: "US",
            item_category: "test",
            item_url: "https://test.com",
            item_custom_fields: {},
          },
          {
            item_id: "ITEM2",
            item_quantity: 2,
            item_name: "Item 2",
            item_price: 20.0,
            item_store: "Store",
            item_store_country: "US",
            item_category: "test",
            item_url: "https://test.com",
            item_custom_fields: {},
          },
        ],
      };

      expect(Array.isArray(requestWithArrays.items)).toBe(true);
      expect(requestWithArrays.items).toHaveLength(2);
      expect(requestWithArrays.items![0].item_id).toBe("ITEM1");
      expect(requestWithArrays.items![1].item_quantity).toBe(2);
    });
  });
});
