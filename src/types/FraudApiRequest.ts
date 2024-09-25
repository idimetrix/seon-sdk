export interface APIRequestConfig {
  ip?: {
    version: string; // Current version of the API. Example: v1
    include?: string; // Optional. Additional information. Examples: flags, history, id
    flags_timeframe_days?: number; // Optional. Timeframe in days for flags.
  };
  email?: {
    version: string; // Current version of the API. Example: v2
    timeout?: number; // Optional. Timeout in milliseconds. Example: 2000
    priority_timeout?: number; // Optional. Priority timeout in milliseconds.
    priority_sites?: string; // Optional. Priority sites.
    priority_accuracy?: number; // Optional. Accuracy settings.
    include?: string; // Optional. Additional information. Examples: flags, history, id
    flags_timeframe_days?: number; // Optional. Timeframe in days for flags.
    data_enrichment_mode?: string; // Optional. Data Enrichment mode. Examples: high-volume, detailed
  };
  phone?: {
    version: string; // Current version of the API. Example: v1
    timeout?: number; // Optional. Timeout in milliseconds. Example: 2000
    priority_timeout?: number; // Optional. Priority timeout in milliseconds.
    priority_sites?: string; // Optional. Priority sites.
    priority_accuracy?: number; // Optional. Accuracy settings.
    include?: string; // Optional. Additional information. Examples: flags, history, id, hlr_details, cnam_lookup
    flags_timeframe_days?: number; // Optional. Timeframe in days for flags.
    exclude?: string; // Optional. Less information. Examples: photo, last_seen
    data_enrichment_mode?: string; // Optional. Data Enrichment mode. Examples: high-volume, detailed
  };
  aml?: {
    version: string; // Current version of the API. Example: v1
    monitoring_required?: boolean; // Optional. Enable or disable monitoring.
    monitoring_schedule?:
      | "ON_CHANGE"
      | "DAILY"
      | "WEEKLY"
      | "MONTHLY"
      | "QUARTERLY"
      | "TWICE_A_YEAR"
      | "EVERY_YEAR"; // Monitoring interval
    fuzzy_enabled?: boolean; // Optional. Enable or disable fuzzy search.
    fuzzy_config?: object; // Optional. Fuzzy search configuration.
    phonetic_search_enabled?: boolean; // Optional. Enable or disable phonetic search.
    edit_distance_enabled?: boolean; // Optional. Enable or disable edit distance module.
    scoring?: {
      result_limit?: number; // Optional. Maximum number of hits. Default: 10
      score_threshold?: number; // Optional. Relevancy score threshold. Default: 0.585
    };
    timeout?: number; // Optional. Timeout in milliseconds. Example: 2000
    sources?: {
      sanction_enabled?: boolean; // Optional. Enable or disable sanction list checks.
      pep_enabled?: boolean; // Optional. Enable or disable PEP checks.
      watchlist_enabled?: boolean; // Optional. Enable or disable watchlist checks.
      crimelist_enabled?: boolean; // Optional. Enable or disable crime list checks.
      adversemedia_enabled?: boolean; // Optional. Enable or disable adverse media check.
    };
  };
  email_api?: boolean; // Optional. Enable or disable Email API.
  phone_api?: boolean; // Optional. Enable or disable Phone API.
  ip_api?: boolean; // Optional. Enable or disable IP API.
  aml_api?: boolean; // Optional. Enable or disable AML API.
  device_fingerprinting?: boolean; // Optional. Enable or disable device fingerprinting.
  device?: {
    include?: string; // Optional. Include geolocation fields. Examples: device_location, extended_device_location
    response_fields?: string; // Optional. Fields to receive in the response. Examples: id,state, fraud_score
  };
}

export interface APIRequestItem {
  item_id: string; // Unique product identifier in your system.
  item_quantity: number; // Quantity of the purchased items.
  item_name: string; // Name of the purchased item. Example: Apple iPhone 6S 128Gb Silver
  item_price: number; // Price of the purchased item, Example: 539.99, decimal point should be .
  item_store: string; // Store fulfilling the order. Example: Brooklyn Electronics
  item_store_country: string; // A two-character ISO 3166-1 country code for the country associated with the items_store. Examples: US, DE
  item_category: string; // Category where the item belongs to.
  item_url: string; // URL of the product’s description. Example: https://electronics.example.com/pd_1234.php
  item_custom_fields: {
    // Custom fields for additional information.
    [key: string]: string | boolean | number;
  };
}

export interface FraudApiRequest {
  config?: APIRequestConfig;
  action_type?: string;
  ip?: string;
  transaction_id?: string;
  affiliate_id?: string;
  affiliate_name?: string;
  order_memo?: string;
  email?: string;
  email_domain?: string;
  payment_id?: string;
  password_hash?: string;
  user_fullname?: string;
  user_name?: string;
  user_firstname?: string;
  user_middlename?: string;
  user_lastname?: string;
  user_pob?: string;
  user_photoid_number?: string;
  user_id?: string;
  user_created?: number;
  user_category?: string;
  user_account_status?: string;
  user_bank_account?: string;
  user_bank_name?: string;
  user_balance?: number;
  user_verification_level?: string;
  user_dob?: string; // Should be in the format YYYY-MM-DD
  user_country?: string;
  user_city?: string;
  user_region?: string;
  user_zip?: string;
  user_street?: string;
  user_street2?: string;
  session_id?: string;
  session?: string;
  device_id?: string;
  payment_mode?: string;
  payment_provider?: string;
  card_fullname?: string;
  card_bin?: string;
  card_hash?: string;
  card_expire?: string; // Should be in the format YYYY-MM
  card_last?: string;
  avs_result?: string;
  cvv_result?: boolean;
  status_3d?: string;
  sca_method?: string;
  phone_number?: string;
  transaction_type?: string;
  transaction_amount?: number;
  transaction_currency?: string;
  items?: APIRequestItem[];
  shipping_country?: string;
  shipping_city?: string;
  shipping_region?: string;
  shipping_zip?: string;
  shipping_street?: string;
  shipping_street2?: string;
  shipping_phone?: string;
  shipping_fullname?: string;
  shipping_method?: string;
  billing_country?: string;
  billing_city?: string;
  billing_region?: string;
  billing_zip?: string;
  billing_street?: string;
  billing_street2?: string;
  billing_phone?: string;
  discount_code?: string;
  gift?: boolean;
  gift_message?: boolean;
  merchant_category?: string;
  merchant_id?: string;
  merchant_created_at?: number;
  merchant_country?: string;
  receiver_fullname?: string;
  receiver_bank_account?: string;
  details_url?: string;
  regulation?: string;
  bonus_campaign_id?: string;
  brand_id?: string;
  custom_fields?: {
    // Custom fields for additional information.
    [key: string]: string | boolean | number;
  };
}
