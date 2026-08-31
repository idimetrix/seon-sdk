import { Seon, FraudApiRequest, FraudApiResponse } from "../index";
import { hmacSha256 } from "../utils/hmacSha256";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Seon SDK", () => {
  const apiKey = "test-api-key";
  const apiUrl = "https://api.test.seon.io/SeonRestService/fraud-api/v2";

  let seon: Seon;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create Seon instance with error logging disabled for tests
    seon = new Seon(apiKey, apiUrl, false);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    // Clean up console spy
    consoleErrorSpy.mockRestore();
    // Give time for any pending async operations to complete
    return new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterAll(async () => {
    // Final cleanup to ensure all async operations complete
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  describe("Constructor", () => {
    it("should initialize with API key and custom URL", () => {
      const customSeon = new Seon(apiKey, apiUrl);
      expect(customSeon).toBeInstanceOf(Seon);
    });

    it("should use default URL when not provided", () => {
      const defaultSeon = new Seon(apiKey);
      expect(defaultSeon).toBeInstanceOf(Seon);
    });
  });

  describe("fraud method", () => {
    const mockRequest: FraudApiRequest = {
      email: "test@example.com",
      ip: "192.168.1.1",
      transaction_id: "test-123",
      user_fullname: "John Doe",
      transaction_amount: 100.5,
      transaction_currency: "USD",
      config: {
        email_api: true,
        ip_api: true,
        device_fingerprinting: true,
        email: {
          version: "v2",
          timeout: 2000,
          include: "flags,history,id",
        },
        ip: {
          version: "v1",
          include: "flags,history",
        },
      },
    };

    it("should make successful API request and return response", async () => {
      const mockResponse: FraudApiResponse = {
        success: true,
        error: {},
        data: {
          id: "test-id",
          state: "APPROVE",
          fraud_score: 25.5,
          version: "v2",
          applied_rules: [],
          bin_details: {
            card_bin: "414141",
            bin_bank: "Test Bank",
            bin_card: "VISA",
            bin_type: "CREDIT",
            bin_level: "CLASSIC",
            bin_country: "US",
            bin_country_code: "US",
            bin_website: "www.testbank.com",
            bin_phone: "+1234567890",
            bin_valid: true,
            card_issuer: "VISA",
          },
          device_details: {
            os: "MacOS",
            type: "web",
            browser: "Chrome",
            session_id: "test-session-id",
            user_agent: "Mozilla/5.0...",
            device_hash: "test-hash",
            device_type: "desktop",
            screen_resolution: "1920x1080",
            dns_ip: null,
            source: "js-6.0.0",
            adblock: false,
            private: false,
            platform: "MacIntel",
            font_hash: "font-hash",
            font_list: ["Arial", "Helvetica"],
            audio_hash: "audio-hash",
            dns_ip_isp: null,
            font_count: 10,
            webgl_hash: null,
            webrtc_ips: ["192.168.1.1"],
            canvas_hash: "canvas-hash",
            cookie_hash: "cookie-hash",
            plugin_hash: "plugin-hash",
            plugin_list: ["PDF Viewer"],
            window_size: "1920x1080",
            browser_hash: "browser-hash",
            do_not_track: null,
            java_enabled: false,
            plugin_count: 1,
            webgl_vendor: null,
            webrtc_count: 1,
            battery_level: 100,
            device_ip_isp: null,
            device_memory: null,
            flash_enabled: false,
            social_logins: [],
            touch_support: false,
            cookie_enabled: true,
            dns_ip_country: "US",
            accept_language: ["en-US"],
            browser_version: "91.0.4472.124",
            device_location: {
              zip: "10001",
              city: "New York",
              region: "NY",
              status: "SUCCESS",
              accuracy: 10,
              latitude: 40.7128,
              longitude: -74.006,
              country_code: "US",
            },
            region_language: "en-US",
            region_timezone: "America/New_York",
            battery_charging: null,
            webrtc_activated: true,
            device_ip_address: "192.168.1.1",
            device_ip_country: "US",
            screen_color_depth: 24,
            screen_pixel_ratio: 1,
            hardware_concurrency: 4,
            screen_available_resolution: "1920x1080",
          },
          calculation_time: 150,
          seon_id: 12345,
          ip_details: {
            ip: "192.168.1.1",
            score: 10.0,
            country: "US",
            state_prov: "New York",
            city: "New York",
            timezone_offset: "-05:00",
            isp_name: "Test ISP",
            latitude: 40.7128,
            longitude: -74.006,
            type: "residential",
            open_ports: [],
            tor: false,
            vpn: false,
            web_proxy: false,
            public_proxy: false,
            spam_number: 0,
            spam_urls: [],
          },
          email_details: {
            email: "test@example.com",
            score: 15.0,
            deliverable: true,
            domain_details: {
              domain: "example.com",
              tld: "com",
              registered: true,
              created: "1995-08-14",
              updated: "2023-01-01",
              expires: "2025-08-14",
              registrar_name: "Test Registrar",
              registered_to: "Example Inc.",
              disposable: false,
              free: false,
              custom: true,
              dmarc_enforced: true,
              spf_strict: true,
              valid_mx: true,
              accept_all: false,
              suspicious_tld: false,
              website_exists: true,
            },
            account_details: {},
            breach_details: {
              haveibeenpwned_listed: false,
              number_of_breaches: 0,
              first_breach: null,
              breaches: [],
            },
          },
          phone_details: {
            number: 1234567890,
            valid: true,
            type: "mobile",
            country: "US",
            carrier: "Test Carrier",
            score: 5.0,
            account_details: {},
          },
          geolocation_details: {
            user_billing_distance: 0,
            user_shipping_distance: 0,
            billing_shipping_distance: 0,
            ip_user_distance: 0,
            ip_billing_distance: 0,
            ip_shipping_distance: 0,
          },
          aml_details: null,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.fraud(mockRequest);

      expect(mockFetch).toHaveBeenCalledWith(apiUrl, {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(mockRequest),
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle HTTP error responses", async () => {
      const errorText =
        '{"success": false,"error":{"code":"2002","message":"invalid license key"},"data": {}}';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        text: async () => errorText,
      } as Response);

      const result = await seon.fraud(mockRequest);

      expect(result).toEqual({
        success: false,
        error: {
          "401 - Unauthorized": errorText,
        },
        data: undefined,
      });

      // Verify no console logging occurred (since logging is disabled for tests)
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should log errors when error logging is enabled", async () => {
      // Create a separate instance with logging enabled for this test
      const seonWithLogging = new Seon(apiKey, apiUrl, true);
      const errorText = "API Error";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => errorText,
      } as Response);

      await seonWithLogging.fraud(mockRequest);

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(errorText, {
        status: 500,
        statusText: "Internal Server Error",
      });
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(seon.fraud(mockRequest)).rejects.toThrow("Network error");
    });

    it("should handle minimal request payload", async () => {
      const minimalRequest: FraudApiRequest = {
        email: "simple@test.com",
      };

      const mockResponse: FraudApiResponse = {
        success: true,
        error: {},
        data: {
          id: "simple-test",
          state: "APPROVE",
          fraud_score: 0,
          version: "v2",
          applied_rules: [],
          bin_details: {
            card_bin: "",
            bin_bank: "",
            bin_card: "",
            bin_type: "",
            bin_level: "",
            bin_country: "",
            bin_country_code: "",
            bin_website: "",
            bin_phone: "",
            bin_valid: false,
            card_issuer: "",
          },
          device_details: {
            os: "",
            type: "web",
            browser: "",
            session_id: "",
            user_agent: "",
            device_hash: "",
            device_type: "",
            screen_resolution: "",
            dns_ip: null,
            source: "",
            adblock: false,
            private: false,
            platform: "",
            font_hash: "",
            font_list: [],
            audio_hash: "",
            dns_ip_isp: null,
            font_count: 0,
            webgl_hash: null,
            webrtc_ips: [],
            canvas_hash: "",
            cookie_hash: "",
            plugin_hash: "",
            plugin_list: [],
            window_size: "",
            browser_hash: "",
            do_not_track: null,
            java_enabled: false,
            plugin_count: 0,
            webgl_vendor: null,
            webrtc_count: 0,
            battery_level: 0,
            device_ip_isp: null,
            device_memory: null,
            flash_enabled: false,
            social_logins: [],
            touch_support: false,
            cookie_enabled: false,
            dns_ip_country: "",
            accept_language: [],
            browser_version: "",
            device_location: {
              zip: "",
              city: "",
              region: "",
              status: "",
              accuracy: 0,
              latitude: 0,
              longitude: 0,
              country_code: "",
            },
            region_language: "",
            region_timezone: "",
            battery_charging: null,
            webrtc_activated: false,
            device_ip_address: "",
            device_ip_country: "",
            screen_color_depth: 0,
            screen_pixel_ratio: 0,
            hardware_concurrency: 0,
            screen_available_resolution: "",
          },
          calculation_time: 50,
          seon_id: 1,
          ip_details: {
            ip: "",
            score: 0,
            country: "",
            state_prov: "",
            city: "",
            timezone_offset: "",
            isp_name: "",
            latitude: 0,
            longitude: 0,
            type: "",
            open_ports: [],
            tor: false,
            vpn: false,
            web_proxy: false,
            public_proxy: false,
            spam_number: 0,
            spam_urls: [],
          },
          email_details: {
            email: "simple@test.com",
            score: 0,
            deliverable: true,
            domain_details: {
              domain: "test.com",
              tld: "com",
              registered: true,
              created: "",
              updated: "",
              expires: "",
              registrar_name: "",
              registered_to: "",
              disposable: false,
              free: true,
              custom: false,
              dmarc_enforced: false,
              spf_strict: false,
              valid_mx: true,
              accept_all: false,
              suspicious_tld: false,
              website_exists: false,
            },
            account_details: {},
            breach_details: {
              haveibeenpwned_listed: false,
              number_of_breaches: 0,
              first_breach: null,
              breaches: [],
            },
          },
          phone_details: {
            number: 0,
            valid: false,
            type: "",
            country: "",
            carrier: "",
            score: 0,
            account_details: {},
          },
          geolocation_details: {
            user_billing_distance: 0,
            user_shipping_distance: 0,
            billing_shipping_distance: 0,
            ip_user_distance: 0,
            ip_billing_distance: 0,
            ip_shipping_distance: 0,
          },
          aml_details: null,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.fraud(minimalRequest);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        apiUrl,
        expect.objectContaining({
          body: JSON.stringify(minimalRequest),
        }),
      );
    });

    it("should handle complex request with all optional fields", async () => {
      const complexRequest: FraudApiRequest = {
        config: {
          ip: {
            version: "v1",
            include: "flags,history,id",
            flags_timeframe_days: 30,
          },
          email: {
            version: "v2",
            timeout: 5000,
            include: "flags,history,id,breach_details",
          },
          phone: {
            version: "v1",
            timeout: 3000,
            include: "hlr_details,cnam_lookup",
          },
          aml: {
            version: "v1",
            monitoring_required: true,
            fuzzy_enabled: true,
          },
          email_api: true,
          phone_api: true,
          ip_api: true,
          aml_api: true,
          device_fingerprinting: true,
          device: { include: "device_location,extended_device_location" },
        },
        action_type: "payment",
        ip: "203.0.113.1",
        transaction_id: "txn-987654321",
        affiliate_id: "aff-123",
        affiliate_name: "Test Affiliate",
        order_memo: "Test order memo",
        email: "john.doe@example.com",
        email_domain: "example.com",
        payment_id: "pay-456789",
        password_hash: "hashed_password_123",
        user_fullname: "John Michael Doe",
        user_name: "johndoe",
        user_firstname: "John",
        user_middlename: "Michael",
        user_lastname: "Doe",
        user_pob: "New York, NY",
        user_photoid_number: "ID123456789",
        user_id: "user-789",
        user_created: 1640995200,
        user_category: "premium",
        user_account_status: "verified",
        user_bank_account: "1234567890",
        user_bank_name: "Test Bank",
        user_balance: 1500.75,
        user_verification_level: "level_3",
        user_dob: "1990-05-15",
        user_country: "US",
        user_city: "New York",
        user_region: "NY",
        user_zip: "10001",
        user_street: "123 Main St",
        user_street2: "Apt 4B",
        session_id: "sess-abc123def456",
        session: "encrypted_session_data",
        device_id: "dev-xyz789",
        payment_mode: "credit_card",
        payment_provider: "stripe",
        card_fullname: "John M Doe",
        card_bin: "414141",
        card_hash: "card_hash_abc123",
        card_expire: "2025-12",
        card_last: "1234",
        avs_result: "Y",
        cvv_result: true,
        status_3d: "authenticated",
        sca_method: "biometric",
        phone_number: "+12345678901",
        transaction_type: "purchase",
        transaction_amount: 299.99,
        transaction_currency: "USD",
        items: [
          {
            item_id: "item-001",
            item_quantity: 2,
            item_name: "Premium Widget",
            item_price: 149.99,
            item_store: "Online Store",
            item_store_country: "US",
            item_category: "electronics",
            item_url: "https://store.example.com/item-001",
            item_custom_fields: {
              color: "blue",
              warranty: true,
              rating: 4.5,
            },
          },
        ],
        shipping_country: "US",
        shipping_city: "Boston",
        shipping_region: "MA",
        shipping_zip: "02101",
        shipping_street: "456 Elm St",
        shipping_street2: "Suite 200",
        shipping_phone: "+19876543210",
        shipping_fullname: "John Doe",
        shipping_method: "express",
        billing_country: "US",
        billing_city: "New York",
        billing_region: "NY",
        billing_zip: "10001",
        billing_street: "123 Main St",
        billing_street2: "Apt 4B",
        billing_phone: "+12345678901",
        discount_code: "SAVE20",
        gift: false,
        gift_message: false,
        merchant_category: "retail",
        merchant_id: "merchant-456",
        merchant_created_at: 1609459200,
        merchant_country: "US",
        receiver_fullname: "Jane Smith",
        receiver_bank_account: "9876543210",
        details_url: "https://example.com/transaction/987654321",
        regulation: "GDPR",
        bonus_campaign_id: "bonus-123",
        brand_id: "brand-789",
        custom_fields: {
          loyalty_tier: "gold",
          referral_code: "REF123",
          marketing_consent: true,
          newsletter_subscriber: true,
          previous_purchases: 15,
        },
      };

      const mockComplexResponse: FraudApiResponse = {
        success: true,
        error: {},
        data: {
          id: "complex-test-id",
          state: "REVIEW",
          fraud_score: 65.8,
          version: "v2",
          applied_rules: [
            {
              id: "rule-001",
              name: "High transaction amount",
              operation: "+",
              score: 25.0,
            },
            {
              id: "rule-002",
              name: "New device detected",
              operation: "+",
              score: 15.0,
            },
          ],
          bin_details: {
            card_bin: "414141",
            bin_bank: "Test Bank",
            bin_card: "VISA",
            bin_type: "CREDIT",
            bin_level: "PREMIUM",
            bin_country: "US",
            bin_country_code: "US",
            bin_website: "www.testbank.com",
            bin_phone: "+1-800-TEST",
            bin_valid: true,
            card_issuer: "VISA",
          },
          device_details: {
            os: "Windows 10",
            type: "web",
            browser: "Chrome",
            session_id: "sess-abc123def456",
            user_agent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            device_hash: "complex_device_hash",
            device_type: "desktop",
            screen_resolution: "2560x1440",
            dns_ip: "8.8.8.8",
            source: "js-6.0.0",
            adblock: false,
            private: false,
            platform: "Win32",
            font_hash: "windows_font_hash",
            font_list: ["Arial", "Times New Roman", "Calibri"],
            audio_hash: "audio_hash_complex",
            dns_ip_isp: "Google",
            font_count: 35,
            webgl_hash: "webgl_hash_abc",
            webrtc_ips: ["203.0.113.1", "192.168.1.100"],
            canvas_hash: "canvas_complex_hash",
            cookie_hash: "cookie_complex_hash",
            plugin_hash: "plugin_complex_hash",
            plugin_list: ["PDF Viewer", "Flash Player"],
            window_size: "2560x1440",
            browser_hash: "browser_complex_hash",
            do_not_track: "1",
            java_enabled: false,
            plugin_count: 8,
            webgl_vendor: "NVIDIA Corporation",
            webrtc_count: 2,
            battery_level: 85,
            device_ip_isp: "Test ISP",
            device_memory: 16,
            flash_enabled: false,
            social_logins: ["google", "facebook"],
            touch_support: false,
            cookie_enabled: true,
            dns_ip_country: "US",
            accept_language: ["en-US", "en"],
            browser_version: "91.0.4472.124",
            device_location: {
              zip: "10001",
              city: "New York",
              region: "NY",
              status: "SUCCESS",
              accuracy: 5,
              latitude: 40.7589,
              longitude: -73.9851,
              country_code: "US",
            },
            region_language: "en-US",
            region_timezone: "America/New_York",
            battery_charging: true,
            webrtc_activated: true,
            device_ip_address: "203.0.113.1",
            device_ip_country: "US",
            screen_color_depth: 24,
            screen_pixel_ratio: 1.5,
            hardware_concurrency: 8,
            screen_available_resolution: "2560x1400",
          },
          calculation_time: 485,
          seon_id: 54321,
          ip_details: {
            ip: "203.0.113.1",
            score: 35.0,
            country: "US",
            state_prov: "New York",
            city: "New York",
            timezone_offset: "-05:00",
            isp_name: "Test ISP Corp",
            latitude: 40.7589,
            longitude: -73.9851,
            type: "residential",
            open_ports: [],
            tor: false,
            vpn: false,
            web_proxy: false,
            public_proxy: false,
            spam_number: 1,
            spam_urls: ["spamhaus.org"],
          },
          email_details: {
            email: "john.doe@example.com",
            score: 20.0,
            deliverable: true,
            domain_details: {
              domain: "example.com",
              tld: "com",
              registered: true,
              created: "1995-08-14",
              updated: "2023-12-01",
              expires: "2025-08-14",
              registrar_name: "Example Registrar Inc",
              registered_to: "Example Corporation",
              disposable: false,
              free: false,
              custom: true,
              dmarc_enforced: true,
              spf_strict: true,
              valid_mx: true,
              accept_all: false,
              suspicious_tld: false,
              website_exists: true,
            },
            account_details: {
              facebook: {
                registered: true,
                url: "https://facebook.com/johndoe",
                name: "John Doe",
                photo: "https://photo.url",
                username: "johndoe",
                followers: 250,
                location: "New York, NY",
                occupation: null,
                description: null,
                account_id: "fb123456",
                full_name: "John Michael Doe",
                company: null,
                website: null,
                bio: null,
                following: 180,
                twitter: null,
                last_updated: 1640995200,
                reviews: null,
                ratings: null,
                photos: null,
                videos: null,
                answers: null,
                edits: null,
                places_added: null,
                roads_added: null,
                facts_checked: null,
                published_lists: null,
                q_and_a: null,
              },
            },
            breach_details: {
              haveibeenpwned_listed: true,
              number_of_breaches: 2,
              first_breach: "2019-03-15",
              breaches: [
                {
                  name: "Example Breach",
                  date: "2019-03-15",
                },
                {
                  name: "Another Breach",
                  date: "2021-07-22",
                },
              ],
            },
          },
          phone_details: {
            number: 12345678901,
            valid: true,
            type: "mobile",
            country: "US",
            carrier: "Verizon",
            score: 10.0,
            account_details: {
              whatsapp: {
                registered: true,
                account_id: "wa789012",
                full_name: "John Doe",
                photo: null,
                last_seen: 1640995200,
                about: "Available",
                last_active: null,
                age: null,
                city: null,
                bio: null,
                country: "US",
                gender: null,
                language: null,
                name: "John",
                handle: null,
                id: null,
                state: "NY",
              },
            },
          },
          geolocation_details: {
            user_billing_distance: 5.2,
            user_shipping_distance: 320.8,
            billing_shipping_distance: 315.6,
            ip_user_distance: 2.1,
            ip_billing_distance: 3.3,
            ip_shipping_distance: 318.9,
          },
          aml_details: {
            hits: [],
            monitoring_required: true,
            risk_level: "low",
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockComplexResponse,
      } as Response);

      const result = await seon.fraud(complexRequest);

      expect(result).toEqual(mockComplexResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        apiUrl,
        expect.objectContaining({
          body: JSON.stringify(complexRequest),
        }),
      );
    });
  });
});

describe("hmacSha256 utility", () => {
  it("should generate correct HMAC-SHA256 hash", () => {
    const message = "test message";
    const key = "secret key";
    const hash = hmacSha256(message, key);

    // Should return a valid hex string of 64 characters (SHA256)
    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);

    // Test consistency - same input should produce same output
    const hash2 = hmacSha256(message, key);
    expect(hash).toBe(hash2);
  });

  it("should handle empty key", () => {
    const message = "test message";
    const hash = hmacSha256(message);

    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64); // SHA256 hex length
  });

  it("should handle empty message", () => {
    const message = "";
    const key = "secret key";
    const hash = hmacSha256(message, key);

    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64);
  });
});
