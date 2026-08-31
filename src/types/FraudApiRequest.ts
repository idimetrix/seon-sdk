/**
 * @fileoverview SEON Fraud API Request Type Definitions
 * Comprehensive TypeScript definitions for SEON's Fraud API request structure.
 * These types ensure type safety and provide detailed documentation for all available
 * configuration options and request parameters.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/fraud-api} SEON Fraud API Documentation
 */

/**
 * Configuration interface for SEON's IP analysis module
 * @interface APIRequestConfigIP
 * Configures the IP intelligence and geolocation analysis features
 */
export interface APIRequestConfigIP {
  /**
   * API version to use for IP analysis
   * @example "v1"
   * @type {string}
   */
  version: string;

  /**
   * Optional additional information to include in IP analysis
   * Comma-separated list of additional data points
   * @example "flags,history,id"
   * @type {string}
   *
   */
  include?: string;

  /**
   * Optional timeframe in days for historical flags analysis
   * Limits the historical data timeframe for flag analysis
   * @example 30
   * @type {number}
   *
   */
  flags_timeframe_days?: number;
}

/**
 * Configuration interface for SEON's Email analysis module
 * @interface APIRequestConfigEmail
 * Configures email reputation, deliverability, and digital footprint analysis
 */
export interface APIRequestConfigEmail {
  /**
   * API version to use for email analysis
   * @example "v2"
   * @type {string}
   */
  version: string;

  /**
   * Optional timeout in milliseconds for email analysis
   * Maximum time to wait for email analysis completion
   * @example 2000
   * @type {number}
   *
   */
  timeout?: number;

  /**
   * Optional priority timeout in milliseconds for high-priority email checks
   * Reduced timeout for priority email validation requests
   * @type {number}
   *
   */
  priority_timeout?: number;

  /**
   * Optional priority sites configuration for enhanced email analysis
   * Comma-separated list of priority email providers for enhanced checking
   * @type {string}
   *
   */
  priority_sites?: string;

  /**
   * Optional accuracy settings for email validation
   * Numerical accuracy threshold for email validation confidence
   * @type {number}
   *
   */
  priority_accuracy?: number;

  /**
   * Optional additional information to include in email analysis
   * Comma-separated list of additional data points
   * @example "flags,history,id,breach_details"
   * @type {string}
   *
   */
  include?: string;

  /**
   * Optional timeframe in days for email flags analysis
   * Limits the historical data timeframe for email flag analysis
   * @example 30
   * @type {number}
   *
   */
  flags_timeframe_days?: number;

  /**
   * Optional data enrichment mode for email analysis
   * Controls the depth and detail of email data enrichment
   * @example "high-volume" | "detailed"
   * @type {string}
   *
   */
  data_enrichment_mode?: string;
}

/**
 * Configuration interface for SEON's Phone analysis module
 * @interface APIRequestConfigPhone
 * Configures phone number validation, carrier detection, and social media analysis
 */
export interface APIRequestConfigPhone {
  /**
   * API version to use for phone analysis
   * @example "v1"
   * @type {string}
   */
  version: string;

  /**
   * Optional timeout in milliseconds for phone analysis
   * Maximum time to wait for phone analysis completion
   * @example 2000
   * @type {number}
   *
   */
  timeout?: number;

  /**
   * Optional priority timeout in milliseconds for high-priority phone checks
   * Reduced timeout for priority phone validation requests
   * @type {number}
   *
   */
  priority_timeout?: number;

  /**
   * Optional priority sites configuration for enhanced phone analysis
   * Comma-separated list of priority phone validation providers
   * @type {string}
   *
   */
  priority_sites?: string;

  /**
   * Optional accuracy settings for phone validation
   * Numerical accuracy threshold for phone validation confidence
   * @type {number}
   *
   */
  priority_accuracy?: number;

  /**
   * Optional additional information to include in phone analysis
   * Comma-separated list of additional data points
   * @example "flags,history,id,hlr_details,cnam_lookup"
   * @type {string}
   *
   */
  include?: string;

  /**
   * Optional timeframe in days for phone flags analysis
   * Limits the historical data timeframe for phone flag analysis
   * @example 30
   * @type {number}
   *
   */
  flags_timeframe_days?: number;

  /**
   * Optional fields to exclude from phone analysis
   * Comma-separated list of fields to exclude from response
   * @example "photo,last_seen"
   * @type {string}
   *
   */
  exclude?: string;

  /**
   * Optional data enrichment mode for phone analysis
   * Controls the depth and detail of phone data enrichment
   * @example "high-volume" | "detailed"
   * @type {string}
   *
   */
  data_enrichment_mode?: string;
}

/**
 * Configuration interface for SEON's AML (Anti-Money Laundering) module
 * @interface APIRequestConfigAML
 * Configures sanctions screening, PEP checks, and compliance monitoring
 */
export interface APIRequestConfigAML {
  /**
   * API version to use for AML analysis
   * @example "v1"
   * @type {string}
   */
  version: string;

  /**
   * Optional flag to enable or disable ongoing monitoring
   * Enables continuous monitoring for AML compliance
   * @type {boolean}
   *
   */
  monitoring_required?: boolean;

  /**
   * Optional monitoring schedule for ongoing AML checks
   * Defines the frequency of ongoing monitoring checks
   * @type {"ON_CHANGE" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "TWICE_A_YEAR" | "EVERY_YEAR"}
   *
   */
  monitoring_schedule?:
    | "ON_CHANGE"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "TWICE_A_YEAR"
    | "EVERY_YEAR";

  /**
   * Optional flag to enable or disable fuzzy search matching
   * Enables fuzzy string matching for name variations
   * @type {boolean}
   *
   */
  fuzzy_enabled?: boolean;

  /**
   * Optional fuzzy search configuration object
   * Advanced configuration options for fuzzy matching algorithms
   * @type {object}
   *
   */
  fuzzy_config?: object;

  /**
   * Optional flag to enable or disable phonetic search
   * Enables phonetic matching for names that sound similar
   * @type {boolean}
   *
   */
  phonetic_search_enabled?: boolean;

  /**
   * Optional flag to enable or disable edit distance module
   * Enables Levenshtein distance-based name matching
   * @type {boolean}
   *
   */
  edit_distance_enabled?: boolean;

  /**
   * Optional scoring configuration for AML results
   * Controls result scoring and filtering parameters
   * @type {object}
   *
   */
  scoring?: {
    /**
     * Maximum number of AML hits to return
     * Limits the number of results returned per check
     * @default 10
     * @type {number}
     *
     */
    result_limit?: number;

    /**
     * Relevancy score threshold for AML matches
     * Minimum confidence score required for a match to be included
     * @default 0.585
     * @type {number}
     *
     */
    score_threshold?: number;
  };

  /**
   * Optional timeout in milliseconds for AML analysis
   * Maximum time to wait for AML analysis completion
   * @example 2000
   * @type {number}
   *
   */
  timeout?: number;

  /**
   * Optional configuration for AML data sources
   * Controls which AML databases and lists to check against
   * @type {object}
   *
   */
  sources?: {
    /**
     * Optional flag to enable or disable sanctions list checks
     * Checks against international sanctions lists (OFAC, UN, EU, etc.)
     * @type {boolean}
     *
     */
    sanction_enabled?: boolean;

    /**
     * Optional flag to enable or disable PEP (Politically Exposed Person) checks
     * Checks against politically exposed persons databases
     * @type {boolean}
     *
     */
    pep_enabled?: boolean;

    /**
     * Optional flag to enable or disable watchlist checks
     * Checks against custom and third-party watchlists
     * @type {boolean}
     *
     */
    watchlist_enabled?: boolean;

    /**
     * Optional flag to enable or disable crime list checks
     * Checks against criminal databases and wanted lists
     * @type {boolean}
     *
     */
    crimelist_enabled?: boolean;

    /**
     * Optional flag to enable or disable adverse media checks
     * Checks for negative news and media mentions
     * @type {boolean}
     *
     */
    adversemedia_enabled?: boolean;
  };
}

/**
 * Configuration interface for SEON's Device Intelligence module
 * @interface APIRequestConfigDevice
 * Configures device fingerprinting and behavioral analysis options
 */
export interface APIRequestConfigDevice {
  /**
   * Optional geolocation fields to include in device analysis
   * Comma-separated list of additional location-based fields
   * @example "device_location,extended_device_location"
   * @type {string}
   *
   */
  include?: string;

  /**
   * Optional response fields to include in the analysis result
   * Comma-separated list of specific fields to return in response
   * @example "id,state,fraud_score"
   * @type {string}
   *
   */
  response_fields?: string;
}

/**
 * Main configuration interface for SEON Fraud API request
 * @interface APIRequestConfig
 * Controls which SEON modules are enabled and their individual configurations
 */
export interface APIRequestConfig {
  /**
   * Optional IP analysis module configuration
   * Configuration for IP intelligence and geolocation analysis
   * @type {APIRequestConfigIP}
   *
   */
  ip?: APIRequestConfigIP;

  /**
   * Optional email analysis module configuration
   * Configuration for email reputation and digital footprint analysis
   * @type {APIRequestConfigEmail}
   *
   */
  email?: APIRequestConfigEmail;

  /**
   * Optional phone analysis module configuration
   * Configuration for phone validation and social media analysis
   * @type {APIRequestConfigPhone}
   *
   */
  phone?: APIRequestConfigPhone;

  /**
   * Optional AML analysis module configuration
   * Configuration for anti-money laundering and compliance screening
   * @type {APIRequestConfigAML}
   *
   */
  aml?: APIRequestConfigAML;

  /**
   * Optional flag to enable or disable Email API module
   * Global switch for email-based fraud detection
   * @type {boolean}
   *
   */
  email_api?: boolean;

  /**
   * Optional flag to enable or disable Phone API module
   * Global switch for phone-based fraud detection
   * @type {boolean}
   *
   */
  phone_api?: boolean;

  /**
   * Optional flag to enable or disable IP API module
   * Global switch for IP-based fraud detection
   * @type {boolean}
   *
   */
  ip_api?: boolean;

  /**
   * Optional flag to enable or disable AML API module
   * Global switch for AML compliance screening
   * @type {boolean}
   *
   */
  aml_api?: boolean;

  /**
   * Optional flag to enable or disable device fingerprinting
   * Global switch for device intelligence and behavioral analysis
   * @type {boolean}
   *
   */
  device_fingerprinting?: boolean;

  /**
   * Optional device intelligence configuration
   * Advanced configuration for device fingerprinting module
   * @type {APIRequestConfigDevice}
   *
   */
  device?: APIRequestConfigDevice;
}

/**
 * Interface for individual items in e-commerce transactions
 * @interface APIRequestItem
 * Represents a single item in a transaction for detailed fraud analysis
 */
export interface APIRequestItem {
  /**
   * Optional unique product identifier in the merchant's system
   * Internal SKU or product ID used by the merchant
   * @example "PROD-12345"
   * @type {string}
   */
  item_id?: string;

  /**
   * Optional quantity of the item being purchased
   * Number of units of this specific item
   * @example 2
   * @type {number}
   */
  item_quantity?: number;

  /**
   * Optional human-readable name of the product
   * Display name for the product as shown to customers
   * @example "Apple iPhone 14 Pro 256GB Space Black"
   * @type {string}
   */
  item_name?: string;

  /**
   * Optional price per unit of the item
   * Individual item price before quantity multiplication
   * @example 999.99
   * @type {number}
   */
  item_price?: number;

  /**
   * Optional store or warehouse fulfilling the order
   * Physical or virtual store handling this item
   * @example "Downtown Electronics Store"
   * @type {string}
   */
  item_store?: string;

  /**
   * Optional ISO 3166-1 alpha-2 country code for the fulfilling store
   * Two-character country code where the item ships from
   * @example "US"
   * @type {string}
   */
  item_store_country?: string;

  /**
   * Optional product category classification
   * Categorical classification for fraud pattern analysis
   * @example "electronics"
   * @type {string}
   */
  item_category?: string;

  /**
   * Optional URL to the product description or details page
   * Direct link to the product on the merchant's website
   * @example "https://store.example.com/products/iphone-14-pro"
   * @type {string}
   */
  item_url?: string;

  /**
   * Optional custom fields for additional item-specific information
   * Flexible object for merchant-specific item metadata
   * @example { "warranty_months": 24, "color": "space_black", "storage": "256gb" }
   * @type {Record<string, string | boolean | number>}
   */
  item_custom_fields?: {
    /**
     * Dynamic custom field key-value pairs
     * Allows any string key with string, boolean, or number values
     */
    [key: string]: string | boolean | number;
  };
}

/**
 * Main interface for SEON Fraud API request payload
 * @interface FraudApiRequest
 * Complete request structure for SEON's fraud detection and prevention API
 * @see {@link https://docs.seon.io/api-reference/fraud-api#request} API Request Documentation
 */
export interface FraudApiRequest {
  /**
   * Optional SEON modules configuration
   * Controls which fraud detection modules are enabled and their settings
   * @type {APIRequestConfig}
   *
   */
  config?: APIRequestConfig;

  /**
   * Optional action type being performed
   * Describes the type of user action being analyzed
   * @example "login" | "register" | "payment" | "deposit" | "withdrawal"
   * @type {string}
   *
   */
  action_type?: string;

  /**
   * Optional IP address of the user
   * IPv4 or IPv6 address for geolocation and risk analysis
   * @example "192.168.1.1"
   * @type {string}
   *
   */
  ip?: string;

  /**
   * Optional unique transaction identifier
   * Merchant's internal transaction ID for tracking and correlation
   * @example "txn_1234567890"
   *
   * @type {string}
   *
   */
  transaction_id?: string;

  /**
   * Optional affiliate identifier
   * ID of the affiliate or partner referring this transaction
   * @example "affiliate_001"
   * @type {string}
   *
   */
  affiliate_id?: string;

  /**
   * Optional affiliate name
   * Human-readable name of the referring affiliate
   * @example "Marketing Partner Co."
   * @type {string}
   *
   */
  affiliate_name?: string;

  /**
   * Optional order memo or notes
   * Additional information or notes about the transaction
   * @example "Gift order for anniversary"
   * @type {string}
   *
   */
  order_memo?: string;

  /**
   * Optional user email address
   * Primary email address for digital footprint analysis
   * @example "user@example.com"
   * @type {string}
   *
   */
  email?: string;

  /**
   * Optional email domain
   * Domain portion of the email address for domain-specific analysis
   * @example "example.com"
   * @type {string}
   *
   */
  email_domain?: string;

  /**
   * Optional payment method identifier
   * Unique identifier for the payment method used
   * @example "pm_1234567890"
   * @type {string}
   *
   */
  payment_id?: string;

  /**
   * Optional hashed password
   * One-way hash of user password for pattern analysis (never send plaintext)
   * @example "sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
   * @type {string}
   *
   */
  password_hash?: string;

  /**
   * Optional complete user name
   * Full name of the user for identity verification
   * @example "John Michael Smith"
   * @type {string}
   *
   */
  user_fullname?: string;

  /**
   * Optional username or login identifier
   * Unique username or login handle
   * @example "jsmith123"
   * @type {string}
   *
   */
  user_name?: string;

  /**
   * Optional user first name
   * Given name for identity verification
   * @example "John"
   * @type {string}
   *
   */
  user_firstname?: string;

  /**
   * Optional user middle name
   * Middle name or initial for enhanced identity verification
   * @example "Michael"
   * @type {string}
   *
   */
  user_middlename?: string;

  /**
   * Optional user last name
   * Family name or surname for identity verification
   * @example "Smith"
   * @type {string}
   *
   */
  user_lastname?: string;

  /**
   * Optional user place of birth
   * Birth location for enhanced identity verification
   * @example "New York, NY, USA"
   * @type {string}
   *
   */
  user_pob?: string;

  /**
   * Optional photo ID number
   * Government-issued photo ID number (masked/hashed recommended)
   * @example "DL123456789"
   * @type {string}
   *
   */
  user_photoid_number?: string;

  /**
   * Optional internal user identifier
   * Merchant's internal user ID for account linking
   * @example "user_1234567890"
   * @type {string}
   *
   */
  user_id?: string;

  /**
   * Optional user account creation timestamp
   * Unix timestamp when the user account was created
   * @example 1640995200
   * @type {number}
   *
   */
  user_created?: number;

  /**
   * Optional user category or tier
   * User classification for risk assessment
   * @example "premium" | "standard" | "vip"
   * @type {string}
   *
   */
  user_category?: string;

  /**
   * Optional user account status
   * Current verification or standing status
   * @example "verified" | "pending" | "suspended"
   * @type {string}
   *
   */
  user_account_status?: string;

  /**
   * Optional user bank account number
   * Bank account number (masked/tokenized recommended)
   * @example "****5678"
   * @type {string}
   *
   */
  user_bank_account?: string;

  /**
   * Optional user bank name
   * Name of the user's primary banking institution
   * @example "Chase Bank"
   * @type {string}
   *
   */
  user_bank_name?: string;

  /**
   * Optional user account balance
   * Current account balance for risk assessment
   * @example 1250.75
   * @type {number}
   *
   */
  user_balance?: number;

  /**
   * Optional user verification level
   * KYC/verification tier achieved by the user
   * @example "level_1" | "level_2" | "level_3"
   * @type {string}
   *
   */
  user_verification_level?: string;

  /**
   * Optional user date of birth
   * Birth date in YYYY-MM-DD format for age verification
   * @example "1990-05-15"
   * @type {string}
   *
   */
  user_dob?: string;

  /**
   * Optional user country
   * User's country of residence (ISO 3166-1 alpha-2 recommended)
   * @example "US"
   * @type {string}
   *
   */
  user_country?: string;

  /**
   * Optional user city
   * User's city of residence
   * @example "New York"
   * @type {string}
   *
   */
  user_city?: string;

  /**
   * Optional user region/state
   * User's state, province, or region
   * @example "NY"
   * @type {string}
   *
   */
  user_region?: string;

  /**
   * Optional user postal code
   * ZIP code or postal code for location verification
   * @example "10001"
   * @type {string}
   *
   */
  user_zip?: string;

  /**
   * Optional user street address
   * Primary street address for location verification
   * @example "123 Main Street"
   * @type {string}
   *
   */
  user_street?: string;

  /**
   * Optional user secondary address
   * Apartment, suite, or secondary address line
   * @example "Apt 4B"
   * @type {string}
   *
   */
  user_street2?: string;

  /**
   * Optional session identifier
   * Unique session ID for tracking user activity
   * @example "sess_1234567890abcdef"
   *
   * @type {string}
   *
   */
  session_id?: string;

  /**
   * Optional encrypted session data
   * Encrypted session payload from SEON's JavaScript SDK
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   * @type {string}
   *
   */
  session?: string;

  /**
   * Optional device identifier
   * Unique device ID for device tracking and analysis
   * @example "dev_1234567890abcdef"
   * @type {string}
   *
   */
  device_id?: string;

  /**
   * Optional payment mode or method type
   * Type of payment method being used
   * @example "credit_card" | "debit_card" | "bank_transfer" | "digital_wallet"
   * @type {string}
   *
   */
  payment_mode?: string;

  /**
   * Optional payment processor or provider
   * Name of the payment processing service
   * @example "stripe" | "paypal" | "square"
   * @type {string}
   *
   */
  payment_provider?: string;

  /**
   * Optional cardholder name
   * Name as it appears on the payment card
   * @example "John M Smith"
   * @type {string}
   *
   */
  card_fullname?: string;

  /**
   * Optional card BIN (Bank Identification Number)
   * First 6-8 digits of the payment card for issuer identification
   * @example "414141"
   *
   * @type {string}
   *
   */
  card_bin?: string;

  /**
   * Optional card hash or token
   * Hashed or tokenized card number for tracking without PCI exposure
   * @example "card_1234567890abcdef"
   *
   * @type {string}
   *
   */
  card_hash?: string;

  /**
   * Optional card expiration date
   * Card expiry in YYYY-MM format
   * @example "2025-12"
   * @type {string}
   *
   */
  card_expire?: string;

  /**
   * Optional last 4 digits of card number
   * Last 4 digits for card identification (PCI compliant)
   * @example "1234"
   * @type {string}
   *
   */
  card_last?: string;

  /**
   * Optional Address Verification System result
   * AVS check result code from payment processor
   * @example "Y" | "N" | "P"
   * @type {string}
   *
   */
  avs_result?: string;

  /**
   * Optional CVV verification result
   * Whether CVV/CVC check passed or failed
   * @type {boolean}
   *
   */
  cvv_result?: boolean;

  /**
   * Optional 3D Secure authentication status
   * Result of 3D Secure authentication process
   * @example "authenticated" | "failed" | "not_enrolled"
   * @type {string}
   *
   */
  status_3d?: string;

  /**
   * Optional Strong Customer Authentication method used
   * Type of SCA method employed for the transaction
   * @example "biometric" | "sms" | "app_notification"
   * @type {string}
   *
   */
  sca_method?: string;

  /**
   * Optional user phone number
   * Phone number for validation and social media analysis
   * @example "+1234567890"
   *
   * @type {string}
   *
   */
  phone_number?: string;

  /**
   * Optional transaction type classification
   * Categorical description of the transaction
   * @example "purchase" | "refund" | "subscription" | "donation"
   * @type {string}
   *
   */
  transaction_type?: string;

  /**
   * Optional transaction amount
   * Monetary value of the transaction
   * @example 99.99
   * @type {number}
   *
   */
  transaction_amount?: number;

  /**
   * Optional transaction currency
   * ISO 4217 currency code for the transaction
   * @example "USD"
   *
   * @type {string}
   *
   */
  transaction_currency?: string;

  /**
   * Optional detailed transaction description
   * Extended description or memo for the transaction
   * @example "Monthly subscription renewal for Premium Plan"
   * @type {string}
   *
   */
  transaction_long_text?: string;

  /**
   * Optional array of items in the transaction
   * Detailed breakdown of products/services in the transaction
   * @type {APIRequestItem[]}
   *
   */
  items?: APIRequestItem[];

  /**
   * Optional shipping destination country
   * ISO 3166-1 alpha-2 country code for shipping
   * @example "US"
   * @type {string}
   *
   */
  shipping_country?: string;

  /**
   * Optional shipping destination city
   * City where the order will be shipped
   * @example "Boston"
   * @type {string}
   *
   */
  shipping_city?: string;

  /**
   * Optional shipping destination region/state
   * State, province, or region for shipping
   * @example "MA"
   * @type {string}
   *
   */
  shipping_region?: string;

  /**
   * Optional shipping destination postal code
   * ZIP code or postal code for shipping address
   * @example "02101"
   * @type {string}
   *
   */
  shipping_zip?: string;

  /**
   * Optional shipping street address
   * Primary street address for shipping
   * @example "456 Oak Avenue"
   * @type {string}
   *
   */
  shipping_street?: string;

  /**
   * Optional shipping secondary address
   * Apartment, suite, or secondary shipping address line
   * @example "Suite 200"
   * @type {string}
   *
   */
  shipping_street2?: string;

  /**
   * Optional shipping contact phone number
   * Phone number for shipping contact
   * @example "+1987654321"
   * @type {string}
   *
   */
  shipping_phone?: string;

  /**
   * Optional shipping recipient name
   * Full name of the shipping recipient
   * @example "Jane Doe"
   * @type {string}
   *
   */
  shipping_fullname?: string;

  /**
   * Optional shipping method selected
   * Type or speed of shipping service
   * @example "express" | "standard" | "overnight"
   *
   * @type {string}
   *
   */
  shipping_method?: string;

  /**
   * Optional billing address country
   * ISO 3166-1 alpha-2 country code for billing
   * @example "US"
   * @type {string}
   *
   */
  billing_country?: string;

  /**
   * Optional billing address city
   * City for billing address
   * @example "New York"
   * @type {string}
   *
   */
  billing_city?: string;

  /**
   * Optional billing address region/state
   * State, province, or region for billing
   * @example "NY"
   * @type {string}
   *
   */
  billing_region?: string;

  /**
   * Optional billing address postal code
   * ZIP code or postal code for billing address
   * @example "10001"
   * @type {string}
   *
   */
  billing_zip?: string;

  /**
   * Optional billing street address
   * Primary street address for billing
   * @example "123 Main Street"
   * @type {string}
   *
   */
  billing_street?: string;

  /**
   * Optional billing secondary address
   * Apartment, suite, or secondary billing address line
   * @example "Apt 4B"
   * @type {string}
   *
   */
  billing_street2?: string;

  /**
   * Optional billing contact phone number
   * Phone number associated with billing address
   * @example "+1234567890"
   * @type {string}
   *
   */
  billing_phone?: string;

  /**
   * Optional discount code applied
   * Promotional or discount code used in transaction
   * @example "SAVE20"
   *
   * @type {string}
   *
   */
  discount_code?: string;

  /**
   * Optional flag indicating if this is a gift purchase
   * Whether the transaction is a gift for someone else
   * @type {boolean}
   *
   */
  gift?: boolean;

  /**
   * Optional flag indicating if a gift message was included
   * Whether a gift message was added to the transaction
   * @type {boolean}
   *
   */
  gift_message?: boolean;

  /**
   * Optional merchant category classification
   * Business category of the merchant
   * @example "retail" | "travel" | "digital_goods"
   * @type {string}
   *
   */
  merchant_category?: string;

  /**
   * Optional merchant identifier
   * Unique identifier for the merchant or sub-merchant
   * @example "merchant_1234567890"
   * @type {string}
   *
   */
  merchant_id?: string;

  /**
   * Optional merchant name
   * Name of the merchant or sub-merchant
   * @example "Apple Inc."
   * @type {string}
   *
   */
  merchant_name?: string;

  /**
   * Optional merchant account creation timestamp
   * Unix timestamp when the merchant account was created
   * @example 1609459200
   * @type {number}
   *
   */
  merchant_created_at?: number;

  /**
   * Optional merchant country
   * Country where the merchant is located
   * @example "US"
   * @type {string}
   *
   */
  merchant_country?: string;

  /**
   * Optional receiver full name for transfers
   * Name of the recipient for money transfer transactions
   * @example "Alice Johnson"
   * @type {string}
   *
   */
  receiver_fullname?: string;

  /**
   * Optional receiver bank account for transfers
   * Bank account number of the transfer recipient
   * @example "****9876"
   * @type {string}
   *
   */
  receiver_bank_account?: string;

  /**
   * Optional URL for transaction details
   * Link to detailed transaction information
   * @example "https://merchant.example.com/transaction/123456"
   * @type {string}
   *
   */
  details_url?: string;

  /**
   * Optional regulatory compliance framework
   * Applicable regulatory framework for the transaction
   * @example "GDPR" | "CCPA" | "PCI_DSS"
   * @type {string}
   *
   */
  regulation?: string;

  /**
   * Optional bonus campaign identifier
   * ID of the promotional campaign or bonus offer
   * @example "bonus_summer2024"
   * @type {string}
   *
   */
  bonus_campaign_id?: string;

  /**
   * Optional brand identifier
   * Brand or sub-brand associated with the transaction
   * @example "brand_premium"
   * @type {string}
   *
   */
  brand_id?: string;

  /**
   * Optional custom fields for additional business-specific data
   * Flexible object for merchant-specific metadata and business logic
   * @example { "loyalty_tier": "gold", "referral_code": "REF123", "is_employee": false }
   *
   * @type {Record<string, string | boolean | number>}
   *
   */
  custom_fields?: {
    /**
     * Dynamic custom field key-value pairs
     * Allows any string key with string, boolean, or number values for business-specific data
     */
    [key: string]: string | boolean | number;
  };
}
