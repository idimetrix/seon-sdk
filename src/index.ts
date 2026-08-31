/**
 * SEON Fraud Prevention SDK
 *
 * Main entry point for the SEON Fraud Detection and Prevention SDK.
 * This module provides a comprehensive TypeScript/JavaScript client for integrating
 * with SEON's fraud prevention platform, including real-time fraud detection,
 * device intelligence, email/phone validation, and AML compliance screening.
 *
 * @author SEON SDK Team
 * @see {@link https://docs.seon.io/api-reference/fraud-api} SEON Fraud API Documentation
 * @see {@link https://seon.io} SEON Official Website
 *
 * @example
 * ```typescript
 * import { Seon, FraudApiRequest, FraudApiResponse } from "seon-sdk";
 *
 * // Initialize SEON client
 * const seon = new Seon(process.env.SEON_API_KEY);
 *
 * // Perform fraud analysis
 * const response = await seon.fraud({
 *   email: "user@example.com",
 *   ip: "192.168.1.1",
 *   transaction_amount: 99.99
 * });
 *
 * console.log(`Fraud Score: ${response.data?.fraud_score}`);
 * ```
 */

// Import type definitions for request and response structures
import { FraudApiRequest, FraudApiResponse } from "./types";

/**
 * Error logging function type
 *
 * Allows SDK users to provide their own logging function
 * instead of using the default console logging.
 *
 * @example
 * ```typescript
 * // Custom logger function
 * const customLogger = (message: string, meta: Record<string, unknown>) => {
 *   myLoggingService.error(message, meta);
 * };
 *
 * const seon = new Seon(apiKey, undefined, true, customLogger);
 * ```
 */
export type ErrorLogger = (
  // eslint-disable-next-line no-unused-vars
  message: string,
  // eslint-disable-next-line no-unused-vars
  meta: Record<string, unknown>,
) => void;

/**
 * Main SEON SDK client class for fraud detection and prevention
 *
 * The primary class for interacting with SEON's Fraud Detection API.
 * Provides methods for real-time fraud analysis, device fingerprinting, email/phone
 * validation, IP intelligence, and AML compliance screening. This class handles
 * API authentication, request/response management, and error handling.
 *
 * @example
 * ```typescript
 * // Basic initialization
 * const seon = new Seon("your-api-key");
 *
 * // With custom endpoint (US region)
 * const seonUS = new Seon(
 *   "your-api-key",
 *   "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/"
 * );
 *
 * // E-commerce fraud check
 * const ecommerceCheck = await seon.fraud({
 *   action_type: "payment",
 *   email: "customer@example.com",
 *   transaction_amount: 299.99,
 *   transaction_currency: "USD",
 *   card_bin: "414141",
 *   config: {
 *     email_api: true,
 *     ip_api: true,
 *     device_fingerprinting: true
 *   }
 * });
 *
 * // Gaming/iGaming registration check
 * const gamingCheck = await seon.fraud({
 *   action_type: "register",
 *   email: "player@example.com",
 *   phone_number: "+1234567890",
 *   user_dob: "1990-05-15",
 *   config: {
 *     aml_api: true,
 *     aml: {
 *       version: "v1",
 *       sources: {
 *         sanction_enabled: true,
 *         pep_enabled: true
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @since 1.0.0
 * @public
 */
export class Seon {
  // Public readonly property to store the SEON API key for authentication
  public readonly key: string;

  // Public readonly property to store the SEON API endpoint URL
  public readonly url: string;

  // Private property to control error logging behavior
  private readonly enableErrorLogging: boolean;

  // Private property to store the logger function
  private readonly logger: ErrorLogger;

  /**
   * Creates a new SEON fraud detection client instance
   *
   * @param key - Your SEON API key for authentication
   * @param url - Optional custom API endpoint URL (defaults to production)
   * @param enableErrorLogging - Whether to log errors (defaults to true in non-test environments)
   * @param logger - Optional custom logging function (defaults to console.error)
   *
   * @example
   * ```typescript
   * // Create client with default production endpoint
   * const seon = new Seon('your-api-key');
   *
   * // Create client with custom endpoint
   * const seon = new Seon('your-api-key', 'https://custom.api.endpoint');
   *
   * // Create client with error logging disabled
   * const seon = new Seon('your-api-key', undefined, false);
   *
   * // Create client with custom logger
   * const customLogger = (message, meta) => myLoggingService.error(message, meta);
   * const seon = new Seon('your-api-key', undefined, true, customLogger);
   * ```
   */
  constructor(
    key: string,
    url?: string,
    enableErrorLogging: boolean = process.env.NODE_ENV !== "test",
    logger?: ErrorLogger,
  ) {
    // Store the provided API key for use in all fraud detection requests
    this.key = key;

    // Use provided URL or default to SEON's production fraud API endpoint
    this.url = url || "https://api.seon.io/SeonRestService/fraud-api/v2";

    // Configure error logging based on environment or explicit setting
    this.enableErrorLogging = enableErrorLogging;

    // Use provided logger or default to console.error
    this.logger =
      logger ||
      ((message: string, meta: Record<string, unknown>) => {
        console.error(message, meta);
      });
  }

  /**
   * Performs comprehensive fraud analysis on the provided transaction data
   *
   * Executes a complete fraud detection analysis using SEON's machine learning
   * models, device intelligence, digital footprint analysis, and rule engine. This method
   * combines multiple fraud detection signals including email reputation, phone validation,
   * IP intelligence, device fingerprinting, and AML screening to generate a comprehensive
   * risk assessment.
   *
   * @param request - Complete fraud analysis request payload
   * @returns Promise that resolves to fraud analysis results
   *
   * @throws {TypeError} Throws if request parameter is invalid
   * @throws {Error} Throws if network request fails
   * @throws {Error} Throws if API authentication fails
   *
   * @example
   * ```typescript
   * // Basic fraud check
   * const basicCheck = await seon.fraud({
   *   email: "user@example.com",
   *   ip: "192.168.1.1",
   *   transaction_amount: 99.99
   * });
   *
   * // Comprehensive e-commerce fraud analysis
   * const ecommerceAnalysis = await seon.fraud({
   *   action_type: "payment",
   *   transaction_id: "txn_987654321",
   *   transaction_amount: 299.99,
   *   transaction_currency: "USD",
   *   transaction_type: "purchase",
   *
   *   // Customer information
   *   email: "customer@example.com",
   *   phone_number: "+1234567890",
   *   user_fullname: "John Smith",
   *   user_country: "US",
   *
   *   // Payment details
   *   card_bin: "414141",
   *   card_last: "1234",
   *   payment_provider: "stripe",
   *
   *   // Address information
   *   billing_country: "US",
   *   billing_city: "New York",
   *   shipping_country: "US",
   *   shipping_city: "Boston",
   *
   *   // Device and network
   *   ip: "203.0.113.1",
   *   session_id: "sess_abc123def456",
   *
   *   // Module configuration
   *   config: {
   *     email_api: true,
   *     phone_api: true,
   *     ip_api: true,
   *     device_fingerprinting: true,
   *     email: {
   *       version: "v2",
   *       include: "breach_details,account_details"
   *     },
   *     phone: {
   *       version: "v1",
   *       include: "hlr_details,cnam_lookup"
   *     }
   *   }
   * });
   *
   * // Gaming/iGaming compliance check
   * const gamingCompliance = await seon.fraud({
   *   action_type: "register",
   *   email: "player@example.com",
   *   phone_number: "+1234567890",
   *   user_fullname: "Jane Doe",
   *   user_dob: "1990-05-15",
   *   user_country: "US",
   *   ip: "203.0.113.1",
   *
   *   config: {
   *     aml_api: true,
   *     email_api: true,
   *     phone_api: true,
   *     aml: {
   *       version: "v1",
   *       monitoring_required: true,
   *       sources: {
   *         sanction_enabled: true,
   *         pep_enabled: true,
   *         watchlist_enabled: true
   *       }
   *     }
   *   },
   *
   *   custom_fields: {
   *     bonus_claimed: true,
   *     marketing_source: "google_ads",
   *     affiliate_code: "PARTNER123"
   *   }
   * });
   *
   * // Handle response
   * if (basicCheck.success && basicCheck.data) {
   *   const { fraud_score, state, applied_rules } = basicCheck.data;
   *
   *   switch (state) {
   *     case "APPROVE":
   *       console.log("Transaction approved");
   *       break;
   *     case "DECLINE":
   *       console.log("Transaction declined - high fraud risk");
   *       break;
   *     case "REVIEW":
   *       console.log("Transaction requires manual review");
   *       break;
   *   }
   *
   *   console.log(`Fraud Score: ${fraud_score}/100`);
   *   console.log(`Rules Applied: ${applied_rules.length}`);
   * }
   * ```
   *
   * @see {@link https://docs.seon.io/api-reference/fraud-api#request} Request Documentation
   * @see {@link https://docs.seon.io/api-reference/fraud-api#response} Response Documentation
   * @see {@link https://docs.seon.io/integration/quick-start} Integration Guide
   *
   * @since 1.0.0
   * @public
   */
  async fraud(request: FraudApiRequest): Promise<FraudApiResponse> {
    // Make HTTP POST request to SEON's Fraud API endpoint with the fraud analysis payload
    const response = await fetch(this.url, {
      // Use POST method as required by SEON's API specification
      method: "POST",

      // Set required headers for API authentication and content negotiation
      headers: {
        // SEON API key authentication header (required)
        "X-API-KEY": this.key,

        // Content type specification for JSON payload (required)
        "Content-Type": "application/json",

        // Prevent response caching to ensure fresh fraud analysis results
        "Cache-Control": "no-cache",
      },

      // Convert the TypeScript request object to JSON string for transmission
      body: JSON.stringify(request),
    });

    // Check if the HTTP response indicates success (status codes 200-299)
    if (response.ok) {
      // Parse the successful JSON response into our typed response structure
      const json: FraudApiResponse =
        (await response.json()) as FraudApiResponse;

      // Return the parsed and typed fraud analysis results
      return json;
    }

    // Handle API error responses by extracting error details
    const text = await response.text();

    // Log error details for debugging and monitoring purposes
    // Note: In production, consider using a proper logging service
    if (this.enableErrorLogging) {
      this.logger(text, {
        status: response.status,
        statusText: response.statusText,
      });
    }

    // Return standardized error response structure for consistent error handling
    return {
      // Indicate that the API call failed
      success: false,

      // Provide structured error information with HTTP status and details
      error: {
        [`${response.status} - ${response.statusText}`]: text,
      },

      // No data payload available due to error
      data: undefined,
    };
  }
}

/**
 * Re-export all type definitions for external use
 * @description Makes all SEON SDK types available for import, ensuring
 * developers have access to complete type safety and IntelliSense support.
 *
 * @see {@link ./types} Type definitions module
 *
 * @example
 * ```typescript
 * import {
 *   Seon,
 *   FraudApiRequest,
 *   FraudApiResponse,
 *   APIRequestConfig
 * } from "seon-sdk";
 * ```
 */
export * from "./types";

/**
 * Re-export all utility functions for external use
 * @description Makes cryptographic and helper utilities available for
 * advanced use cases, API request signing, and webhook verification.
 *
 * @see {@link ./utils} Utility functions module
 *
 * @example
 * ```typescript
 * import { hmacSha256 } from "seon-sdk";
 *
 * const signature = hmacSha256(payload, secretKey);
 * ```
 */
export * from "./utils";
// Test comment for Husky validation
