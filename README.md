# SEON Fraud Prevention SDK

[![npm version](https://badge.fury.io/js/seon-sdk.svg)](https://badge.fury.io/js/seon-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful TypeScript/JavaScript SDK for integrating with SEON's comprehensive fraud prevention and anti-money laundering (AML) platform. Detect fraud in real-time with advanced device fingerprinting, digital footprint analysis, and behavioral analytics.

## 🌟 Features

- **🛡️ Real-time Fraud Detection** - Stop fraud before it impacts your business
- **🔍 Digital Footprint Analysis** - Deep email, phone, and IP intelligence
- **📱 Device Intelligence** - Advanced device fingerprinting for web and mobile
- **🧠 AI-Powered Risk Scoring** - Machine learning models with transparent explanations
- **🌍 Global Coverage** - Comprehensive data sources and regional compliance
- **⚡ Lightning Fast** - Sub-second response times
- **🔧 Easy Integration** - Simple API with full TypeScript support
- **📊 Rich Data Insights** - 900+ data signals in a single API call

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install seon-sdk

# Using yarn
yarn add seon-sdk

# Using pnpm
pnpm add seon-sdk
```

### Basic Usage

```typescript
import { Seon, FraudApiRequest, FraudApiResponse } from "seon-sdk";

// Initialize the SEON client
const seon = new Seon(process.env.SEON_API_KEY);

// Basic fraud check
const request: FraudApiRequest = {
  email: "user@example.com",
  ip: "192.168.1.1",
  transaction_id: "txn_123456",
  transaction_amount: 99.99,
  transaction_currency: "USD",
  user_fullname: "John Doe",
};

try {
  const response: FraudApiResponse = await seon.fraud(request);

  if (response.success && response.data) {
    console.log(`Fraud Score: ${response.data.fraud_score}`);
    console.log(`Risk State: ${response.data.state}`);
    console.log(`Transaction ID: ${response.data.id}`);
  } else {
    console.error("Fraud check failed:", response.error);
  }
} catch (error) {
  console.error("Network error:", error);
}
```

## 📖 Advanced Usage

### Comprehensive Configuration

```typescript
import { Seon, FraudApiRequest } from "seon-sdk";

const seon = new Seon(
  process.env.SEON_API_KEY,
  "https://api.seon.io/SeonRestService/fraud-api/v2/", // Optional: Custom endpoint
);

const comprehensiveRequest: FraudApiRequest = {
  // Transaction details
  transaction_id: "txn_987654321",
  transaction_type: "purchase",
  transaction_amount: 299.99,
  transaction_currency: "USD",

  // User information
  email: "customer@company.com",
  phone_number: "+1234567890",
  user_fullname: "Jane Smith",
  user_firstname: "Jane",
  user_lastname: "Smith",
  user_dob: "1990-05-15",
  user_country: "US",
  user_city: "New York",
  user_region: "NY",
  user_zip: "10001",

  // Device and network
  ip: "203.0.113.1",
  session_id: "sess_abc123def456",
  device_id: "dev_xyz789",

  // Payment information
  payment_mode: "credit_card",
  payment_provider: "stripe",
  card_bin: "414141",
  card_last: "1234",
  card_expire: "2025-12",

  // Advanced configuration
  config: {
    // Enable specific APIs
    email_api: true,
    phone_api: true,
    ip_api: true,
    aml_api: true,
    device_fingerprinting: true,

    // Email analysis configuration
    email: {
      version: "v2",
      timeout: 2000,
      include: "flags,history,breach_details",
      data_enrichment_mode: "detailed",
    },

    // Phone analysis configuration
    phone: {
      version: "v1",
      timeout: 3000,
      include: "hlr_details,cnam_lookup",
      data_enrichment_mode: "detailed",
    },

    // IP analysis configuration
    ip: {
      version: "v1",
      include: "flags,history",
      flags_timeframe_days: 30,
    },

    // AML screening configuration
    aml: {
      version: "v1",
      monitoring_required: true,
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
      },
    },

    // Device fingerprinting options
    device: {
      include: "device_location,extended_device_location",
      response_fields: "id,state,fraud_score",
    },
  },

  // Custom business logic fields
  custom_fields: {
    loyalty_tier: "platinum",
    referral_source: "google_ads",
    marketing_consent: true,
    account_age_days: 365,
    previous_orders: 12,
  },
};

const response = await seon.fraud(comprehensiveRequest);
```

### E-commerce Integration Example

```typescript
import { Seon, FraudApiRequest } from "seon-sdk";

class EcommerceFraudCheck {
  private seon: Seon;

  constructor(apiKey: string) {
    this.seon = new Seon(apiKey);
  }

  async checkoutFraudAnalysis(orderData: any) {
    const request: FraudApiRequest = {
      action_type: "payment",
      transaction_id: orderData.orderId,
      transaction_amount: orderData.total,
      transaction_currency: orderData.currency,

      // Customer data
      email: orderData.customer.email,
      phone_number: orderData.customer.phone,
      user_fullname: orderData.customer.name,
      ip: orderData.customer.ipAddress,

      // Billing information
      billing_country: orderData.billing.country,
      billing_city: orderData.billing.city,
      billing_zip: orderData.billing.zipCode,
      billing_street: orderData.billing.address,

      // Shipping information
      shipping_country: orderData.shipping.country,
      shipping_city: orderData.shipping.city,
      shipping_zip: orderData.shipping.zipCode,
      shipping_method: orderData.shipping.method,

      // Payment details
      payment_provider: orderData.payment.provider,
      card_bin: orderData.payment.cardBin,
      card_last: orderData.payment.cardLast4,

      // Order items
      items: orderData.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_quantity: item.quantity,
        item_price: item.price,
        item_category: item.category,
        item_store: "Online Store",
        item_store_country: "US",
        item_url: `https://shop.example.com/products/${item.id}`,
        item_custom_fields: {
          brand: item.brand,
          size: item.size,
          color: item.color,
        },
      })),

      config: {
        email_api: true,
        ip_api: true,
        device_fingerprinting: true,
        email: { version: "v2", include: "breach_details" },
        ip: { version: "v1", include: "flags" },
      },
    };

    const result = await this.seon.fraud(request);

    return {
      fraudScore: result.data?.fraud_score || 0,
      riskLevel: this.getRiskLevel(result.data?.fraud_score || 0),
      recommendation: this.getRecommendation(result.data?.state || ""),
      transactionId: result.data?.id,
      appliedRules: result.data?.applied_rules || [],
      deviceInsights: result.data?.device_details,
      emailInsights: result.data?.email_details,
      ipInsights: result.data?.ip_details,
    };
  }

  private getRiskLevel(score: number): string {
    if (score >= 80) return "high";
    if (score >= 50) return "medium";
    if (score >= 20) return "low";
    return "minimal";
  }

  private getRecommendation(state: string): string {
    switch (state) {
      case "APPROVE":
        return "approve";
      case "DECLINE":
        return "decline";
      case "REVIEW":
        return "manual_review";
      default:
        return "unknown";
    }
  }
}

// Usage
const fraudChecker = new EcommerceFraudCheck(process.env.SEON_API_KEY!);
const fraudAnalysis = await fraudChecker.checkoutFraudAnalysis(orderData);

if (fraudAnalysis.riskLevel === "high") {
  // Block transaction
  console.log("Transaction blocked due to high fraud risk");
} else if (fraudAnalysis.recommendation === "manual_review") {
  // Queue for manual review
  console.log("Transaction queued for manual review");
} else {
  // Approve transaction
  console.log("Transaction approved");
}
```

### Gaming/iGaming Integration Example

```typescript
import { Seon, FraudApiRequest } from "seon-sdk";

class GamingFraudPrevention {
  private seon: Seon;

  constructor(apiKey: string) {
    this.seon = new Seon(apiKey);
  }

  async playerRegistrationCheck(playerData: any) {
    const request: FraudApiRequest = {
      action_type: "register",
      email: playerData.email,
      phone_number: playerData.phone,
      user_fullname: playerData.fullName,
      user_dob: playerData.dateOfBirth,
      user_country: playerData.country,
      ip: playerData.ipAddress,
      session_id: playerData.sessionId,

      config: {
        email_api: true,
        phone_api: true,
        ip_api: true,
        aml_api: true,
        device_fingerprinting: true,

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
        affiliate_code: playerData.affiliateCode,
        bonus_claimed: playerData.claimedBonus,
        marketing_source: playerData.marketingSource,
      },
    };

    return await this.seon.fraud(request);
  }

  async depositTransactionCheck(depositData: any) {
    const request: FraudApiRequest = {
      action_type: "deposit",
      transaction_id: depositData.transactionId,
      transaction_amount: depositData.amount,
      transaction_currency: depositData.currency,
      user_id: depositData.playerId,
      payment_provider: depositData.paymentMethod,
      ip: depositData.ipAddress,

      config: {
        ip_api: true,
        device_fingerprinting: true,
        ip: {
          version: "v1",
          include: "flags,history",
        },
      },

      custom_fields: {
        deposit_count: depositData.previousDeposits,
        account_age_hours: depositData.accountAgeHours,
        last_login: depositData.lastLoginTimestamp,
      },
    };

    return await this.seon.fraud(request);
  }
}
```

## 🔧 Configuration Options

### Environment Endpoints

The SDK supports different SEON environments:

```typescript
// US Environment (default for US customers)
const seonUS = new Seon(
  apiKey,
  "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/",
);

// EU Environment (default)
const seonEU = new Seon(
  apiKey,
  "https://api.seon.io/SeonRestService/fraud-api/v2/",
);

// Or use default (auto-detects based on your account)
const seon = new Seon(apiKey);
```

### API Configuration

The `config` object allows fine-tuning of SEON's modules:

| Module                  | Description                          | Key Options                                             |
| ----------------------- | ------------------------------------ | ------------------------------------------------------- |
| `email_api`             | Email reputation and intelligence    | `version`, `timeout`, `include`, `data_enrichment_mode` |
| `phone_api`             | Phone number validation and insights | `version`, `timeout`, `include`, `hlr_details`          |
| `ip_api`                | IP geolocation and risk analysis     | `version`, `include`, `flags_timeframe_days`            |
| `aml_api`               | Anti-money laundering screening      | `monitoring_required`, `fuzzy_enabled`, `sources`       |
| `device_fingerprinting` | Device and behavioral analysis       | `include`, `response_fields`                            |

## 📊 Response Data Structure

The SEON API returns comprehensive fraud intelligence with full TypeScript support:

```typescript
interface FraudApiResponse {
  success: boolean;
  error: ErrorDetails;
  data?: {
    id: string; // Unique transaction identifier
    state: string; // APPROVE, DECLINE, or REVIEW
    fraud_score: number; // Risk score (0-100)
    version: string; // API version used

    // Risk analysis
    applied_rules: Array<AppliedRule>;

    // Device intelligence
    device_details: DeviceDetails;

    // Digital footprint
    email_details: EmailDetails;
    phone_details: PhoneDetails;
    ip_details: IpDetails;

    // Additional insights
    bin_details: BinDetails;
    geolocation_details: GeolocationDetails;
    aml_details: AmlDetails | null;
    calculation_time: number;
    seon_id: number;
  };
}
```

All response interfaces are fully typed for optimal TypeScript development experience.

## 🛡️ Error Handling

The SDK provides comprehensive error handling:

```typescript
try {
  const response = await seon.fraud(request);

  if (!response.success) {
    // API returned an error
    console.error("SEON API Error:", response.error);

    // Handle specific error cases
    if (response.error["401 - Unauthorized"]) {
      console.log("Invalid API key");
    } else if (response.error["429 - Too Many Requests"]) {
      console.log("Rate limit exceeded");
    }
  }
} catch (error) {
  // Network or other errors
  console.error("Network error:", error);
}
```

## 🧪 Testing

The SDK includes comprehensive test coverage with 185+ tests:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Lint and format code
npm run format

# Type checking
npm run type
```

### Mock Testing

```typescript
import { Seon } from "seon-sdk";

// Mock fetch for testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        success: true,
        data: { fraud_score: 25, state: "APPROVE" },
      }),
  }),
) as jest.Mock;

const seon = new Seon("test-api-key");
const result = await seon.fraud({ email: "test@example.com" });
```

## 🌍 Use Cases

### Financial Services

- **Account opening** - KYC and identity verification
- **Transaction monitoring** - Real-time payment fraud detection
- **AML compliance** - Sanctions and PEP screening
- **Loan applications** - Risk assessment and fraud prevention

### E-commerce

- **Checkout protection** - Payment fraud prevention
- **Account takeover** - Suspicious login detection
- **Chargeback reduction** - Preemptive fraud identification
- **Return fraud** - Abuse pattern detection

### iGaming & Online Gaming

- **Player verification** - Identity and age verification
- **Bonus abuse prevention** - Multi-account detection
- **Deposit monitoring** - Payment fraud detection
- **Regulatory compliance** - Geolocation and sanctions screening

### Digital Platforms

- **User registration** - Fake account prevention
- **Content moderation** - Spam and abuse detection
- **Marketplace safety** - Seller and buyer verification
- **Subscription fraud** - Payment method validation

## 🔗 Integration Examples

### Express.js Middleware

```typescript
import express from "express";
import { Seon } from "seon-sdk";

const app = express();
const seon = new Seon(process.env.SEON_API_KEY!);

const fraudCheckMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const fraudCheck = await seon.fraud({
      email: req.body.email,
      ip: req.ip,
      transaction_amount: req.body.amount,
      config: { email_api: true, ip_api: true },
    });

    if (fraudCheck.data?.fraud_score && fraudCheck.data.fraud_score > 80) {
      return res
        .status(403)
        .json({ error: "Transaction declined due to high fraud risk" });
    }

    req.fraudData = fraudCheck.data;
    next();
  } catch (error) {
    console.error("Fraud check failed:", error);
    next(); // Continue on error (fail open)
  }
};

app.post("/api/payments", fraudCheckMiddleware, (req, res) => {
  // Process payment with fraud insights
  res.json({ success: true, fraudScore: req.fraudData?.fraud_score });
});
```

### Next.js API Route

```typescript
// pages/api/fraud-check.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Seon } from "seon-sdk";

const seon = new Seon(process.env.SEON_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, amount, ip } = req.body;

    const fraudCheck = await seon.fraud({
      email,
      transaction_amount: amount,
      ip: ip || req.socket.remoteAddress,
      config: {
        email_api: true,
        ip_api: true,
        device_fingerprinting: true,
      },
    });

    res.status(200).json({
      fraudScore: fraudCheck.data?.fraud_score,
      recommendation: fraudCheck.data?.state,
      insights: {
        email: fraudCheck.data?.email_details,
        device: fraudCheck.data?.device_details,
        ip: fraudCheck.data?.ip_details,
      },
    });
  } catch (error) {
    console.error("Fraud check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
```

## 📚 API Reference

### Class: Seon

#### Constructor

```typescript
new Seon(apiKey: string, apiUrl?: string, enableErrorLogging?: boolean)
```

**Parameters:**

- `apiKey` - Your SEON API key for authentication
- `apiUrl` - Optional custom API endpoint URL (defaults to production)
- `enableErrorLogging` - Whether to log errors to console (defaults to true in non-test environments)

#### Methods

##### `fraud(request: FraudApiRequest): Promise<FraudApiResponse>`

Performs a fraud analysis on the provided request data.

**Parameters:**

- `request: FraudApiRequest` - The fraud check request object

**Returns:**

- `Promise<FraudApiResponse>` - The fraud analysis response

### Utility Functions

#### `hmacSha256(message: string, key?: string): string`

Generates HMAC-SHA256 hash for message signing and verification.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/idimetrix/seon-sdk.git
cd seon-sdk

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the project
pnpm build

# Lint and format
pnpm format

# Type checking
pnpm type
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

- **📖 Official API Documentation**: [SEON Fraud API Docs](https://docs.seon.io/api-reference/fraud-api)
- **💬 Contact Support**: [SEON Support Portal](https://seon.io/contact/)
- **🌐 SEON Website**: [https://seon.io](https://seon.io)
- **📊 API Status**: [SEON System Status](https://status.seon.io)
- **🔧 GitHub Issues**: [Report Issues](https://github.com/idimetrix/seon-sdk/issues)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

<div align="center">

**🛡️ Protect your business with SEON's industry-leading fraud prevention platform**

[![SEON Website](https://img.shields.io/badge/Learn_More-SEON.io-blue?style=for-the-badge)](https://seon.io)
[![Documentation](https://img.shields.io/badge/Documentation-docs.seon.io-green?style=for-the-badge)](https://docs.seon.io)
[![Request Demo](https://img.shields.io/badge/Request-Demo-orange?style=for-the-badge)](https://seon.io/demo)

</div>

---

Built by the team behind [Planoda](https://planoda.com/?utm_source=npm&utm_medium=referral&utm_campaign=seon-sdk) — an AI-native work platform, currently pre-launch and building in public.
