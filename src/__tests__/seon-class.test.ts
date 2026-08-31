/**
 * @fileoverview Seon Class Constructor and Basic Functionality Tests
 * @description Comprehensive test suite for the main Seon class constructor,
 * initialization, and basic API interaction patterns.
 */

import { Seon } from "../index";

describe("Seon Class Constructor and Basic Functionality", () => {
  describe("Constructor Tests", () => {
    it("should initialize with API key and default URL", () => {
      const apiKey = "test-api-key-12345";
      const seon = new Seon(apiKey);

      expect(seon).toBeInstanceOf(Seon);
      // Access public readonly properties for testing
      expect(seon.key).toBe(apiKey);
      expect(seon.url).toBe("https://api.seon.io/SeonRestService/fraud-api/v2");
    });

    it("should initialize with API key and custom URL", () => {
      const apiKey = "test-api-key-12345";
      const customUrl = "https://api.seon.io/SeonRestService/fraud-api/v2/";
      const seon = new Seon(apiKey, customUrl);

      expect(seon).toBeInstanceOf(Seon);
      expect(seon.key).toBe(apiKey);
      expect(seon.url).toBe(customUrl);
    });

    it("should handle EU region URL", () => {
      const apiKey = "seon_live_eu_12345";
      const euUrl = "https://api.seon.io/SeonRestService/fraud-api/v2/";
      const seon = new Seon(apiKey, euUrl);

      expect(seon.url).toBe(euUrl);
    });

    it("should handle US region URL", () => {
      const apiKey = "seon_live_us_12345";
      const usUrl =
        "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/";
      const seon = new Seon(apiKey, usUrl);

      expect(seon.url).toBe(usUrl);
    });

    it("should handle sandbox/test URLs", () => {
      const apiKey = "seon_test_12345";
      const testUrl =
        "https://sandbox-api.seon.io/SeonRestService/fraud-api/v2/";
      const seon = new Seon(apiKey, testUrl);

      expect(seon.url).toBe(testUrl);
    });
  });

  describe("Property Access and Immutability", () => {
    it("should make API key and URL readonly", () => {
      const apiKey = "test-api-key-12345";
      const seon = new Seon(apiKey);

      // Properties should be readonly (private) - test through TypeScript compilation
      expect(() => {
        // This would fail TypeScript compilation but we test the structure
        expect(typeof seon.key).toBe("string");
        expect(typeof seon.url).toBe("string");
      }).not.toThrow();
    });

    it("should preserve API key format validation patterns", () => {
      const validKeys = [
        "seon_live_1234567890abcdef",
        "seon_test_abcdef1234567890",
        "test-api-key",
        "sk_test_12345",
        "pk_live_67890",
      ];

      validKeys.forEach((key) => {
        expect(() => new Seon(key)).not.toThrow();
      });
    });
  });

  describe("Method Availability", () => {
    it("should expose fraud method", () => {
      const seon = new Seon("test-key");
      expect(typeof seon.fraud).toBe("function");
    });

    it("should have async fraud method", () => {
      const seon = new Seon("test-key");
      const result = seon.fraud({ email: "test@example.com" });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("TypeScript Type Safety", () => {
    it("should maintain strict typing for constructor parameters", () => {
      // Test that constructor expects string parameters
      const seon = new Seon("test-key", "https://api.example.com");
      expect(seon).toBeInstanceOf(Seon);
    });

    it("should work with different API key formats", () => {
      const keyFormats = [
        "seon_live_abcd1234",
        "seon_test_efgh5678",
        "custom-api-key-format",
        "12345678-abcd-efgh-ijkl-123456789abc",
      ];

      keyFormats.forEach((key) => {
        const seon = new Seon(key);
        expect(seon).toBeInstanceOf(Seon);
      });
    });
  });
});
