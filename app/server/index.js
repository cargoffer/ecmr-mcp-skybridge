/**
 * ECMR Skybridge MCP Server
 * Electronic Consignment Note API for Cargoffer B2B logistics platform
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { z } = require('zod');

/**
 * Tool definitions for ECMR API
 */
const toolDefinitions = [
  // === AUTH ===
  {
    name: 'ecmr_auth_login',
    description: 'Login to ECMR API with email and password. Returns authentication token.',
    inputSchema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'User email address' },
        password: { type: 'string', description: 'User password' }
      },
      required: ['email', 'password']
    }
  },
  {
    name: 'ecmr_auth_register',
    description: 'Register a new user company in the ECMR system.',
    inputSchema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'User email address' },
        password: { type: 'string', description: 'User password' },
        companyName: { type: 'string', description: 'Company name' }
      },
      required: ['email', 'password', 'companyName']
    }
  },

  // === ADDRESSES ===
  {
    name: 'ecmr_addresses_list',
    description: 'List all saved addresses for the authenticated company.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max results to return (default: 50)' }
      }
    }
  },
  {
    name: 'ecmr_addresses_create',
    description: 'Create a new address in the address book.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Address name/label' },
        street: { type: 'string', description: 'Street address' },
        city: { type: 'string', description: 'City' },
        state: { type: 'string', description: 'State/province' },
        postal_code: { type: 'string', description: 'Postal code' },
        country: { type: 'string', description: 'Country code (ES, PT, FR, etc.)' },
        company_name: { type: 'string', description: 'Company name at this address' }
      },
      required: ['name', 'street', 'city', 'company_name']
    }
  },
  {
    name: 'ecmr_addresses_update',
    description: 'Update an existing address.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Address ID' },
        name: { type: 'string', description: 'New address name' },
        street: { type: 'string', description: 'New street address' },
        city: { type: 'string', description: 'New city' },
        postalCode: { type: 'string', description: 'New postal code' }
      },
      required: ['id']
    }
  },
  {
    name: 'ecmr_addresses_delete',
    description: 'Delete an address from the address book.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Address ID to delete' }
      },
      required: ['id']
    }
  },

  // === DRIVERS ===
  {
    name: 'ecmr_drivers_list',
    description: 'List all drivers registered to the company.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max results to return' }
      }
    }
  },
  {
    name: 'ecmr_drivers_create',
    description: 'Register a new driver.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Driver full name' },
        email: { type: 'string', description: 'Driver email' },
        phone: { type: 'string', description: 'Driver phone number' },
        license: { type: 'string', description: 'Driver license number' },
        licenseType: { type: 'string', description: 'License type (B, C, C+E, etc.)' }
      },
      required: ['name', 'phone']
    }
  },
  {
    name: 'ecmr_drivers_update',
    description: 'Update driver information.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Driver ID' },
        name: { type: 'string', description: 'Updated name' },
        phone: { type: 'string', description: 'Updated phone' }
      },
      required: ['id']
    }
  },
  {
    name: 'ecmr_drivers_delete',
    description: 'Remove a driver from the company.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Driver ID to delete' }
      },
      required: ['id']
    }
  },

  // === VEHICLES ===
  {
    name: 'ecmr_vehicles_list',
    description: 'List all company vehicles.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max results' }
      }
    }
  },
  {
    name: 'ecmr_vehicles_create',
    description: 'Register a new vehicle.',
    inputSchema: {
      type: 'object',
      properties: {
        plate: { type: 'string', description: 'Vehicle license plate' },
        type: { type: 'string', description: 'Vehicle type (truck, van, trailer)' },
        brand: { type: 'string', description: 'Vehicle brand' },
        model: { type: 'string', description: 'Vehicle model' },
        capacity: { type: 'number', description: 'Cargo capacity in kg' }
      },
      required: ['plate']
    }
  },
  {
    name: 'ecmr_vehicles_update',
    description: 'Update vehicle information.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Vehicle ID' },
        plate: { type: 'string', description: 'Updated plate' },
        type: { type: 'string', description: 'Updated type' }
      },
      required: ['id']
    }
  },
  {
    name: 'ecmr_vehicles_delete',
    description: 'Remove a vehicle from the fleet.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Vehicle ID to delete' }
      },
      required: ['id']
    }
  },

  // === ECMR CORE ===
  {
    name: 'ecmr_create',
    description: 'Create a new electronic consignment note (eCMR).',
    inputSchema: {
      type: 'object',
      properties: {
        senderCompanyName: { type: 'string', description: 'Sender company name' },
        senderCif: { type: 'string', description: 'Sender CIF/NIF tax ID' },
        receiverCompanyName: { type: 'string', description: 'Receiver company name' },
        receiverCif: { type: 'string', description: 'Receiver CIF/NIF tax ID' },
        fromAddress: { type: 'string', description: 'Pickup address' },
        fromPostalCode: { type: 'string', description: 'Pickup postal code' },
        fromCountry: { type: 'string', description: 'Pickup country (ES, PT, etc.)' },
        toAddress: { type: 'string', description: 'Delivery address' },
        toPostalCode: { type: 'string', description: 'Delivery postal code' },
        toCountry: { type: 'string', description: 'Delivery country' },
        goodsDescription: { type: 'string', description: 'Description of goods' },
        packages: { type: 'number', description: 'Number of packages' },
        pallets: { type: 'number', description: 'Number of pallets' },
        weight: { type: 'number', description: 'Weight in kg' }
      },
      required: ['senderCompanyName', 'receiverCompanyName', 'fromAddress', 'toAddress']
    }
  },
  {
    name: 'ecmr_get',
    description: 'Get eCMR details by service code.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'The eCMR service code' }
      },
      required: ['serviceCode']
    }
  },
  {
    name: 'ecmr_list',
    description: 'List all eCMR documents for the company.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max results (default: 50)' }
      }
    }
  },
  {
    name: 'ecmr_update',
    description: 'Update an existing eCMR (before locking).',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code to update' },
        goodsDescription: { type: 'string', description: 'New goods description' },
        packages: { type: 'number', description: 'New packages count' },
        weight: { type: 'number', description: 'New weight' }
      },
      required: ['serviceCode']
    }
  },
  {
    name: 'ecmr_delete',
    description: 'Delete a draft eCMR (only before signing).',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code to delete' }
      },
      required: ['serviceCode']
    }
  },
  {
    name: 'ecmr_lock',
    description: 'Lock/seal an eCMR legally (finalizes the document).',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code to lock' }
      },
      required: ['serviceCode']
    }
  },

  // === SIGNATURES ===
  {
    name: 'ecmr_sign_sender',
    description: 'Sign eCMR as the sender (confirms shipment details).',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' },
        signature: { type: 'string', description: 'Digital signature content' }
      },
      required: ['serviceCode', 'signature']
    }
  },
  {
    name: 'ecmr_sign_pickup',
    description: 'Sign eCMR at pickup (carrier confirms receipt).',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' },
        signature: { type: 'string', description: 'Digital signature content' }
      },
      required: ['serviceCode', 'signature']
    }
  },
  {
    name: 'ecmr_sign_delivery',
    description: 'Sign eCMR at delivery (receiver confirms receipt).',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' },
        signature: { type: 'string', description: 'Digital signature content' }
      },
      required: ['serviceCode', 'signature']
    }
  },
  {
    name: 'ecmr_signatures_list',
    description: 'List all pending signatures required for eCMRs.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },

  // === QR / PDF ===
  {
    name: 'ecmr_qr_generate',
    description: 'Generate QR code for an eCMR for easy scanning.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' }
      },
      required: ['serviceCode']
    }
  },
  {
    name: 'ecmr_qr_validate',
    description: 'Validate a QR code scanned from an eCMR.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code to validate' }
      },
      required: ['serviceCode']
    }
  },
  {
    name: 'ecmr_pdf',
    description: 'Generate and download PDF of an eCMR.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' }
      },
      required: ['serviceCode']
    }
  },

  // === FILES ===
  {
    name: 'ecmr_file_upload',
    description: 'Upload an attachment to an eCMR.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' },
        fileData: { type: 'string', description: 'Base64 encoded file data' },
        fileName: { type: 'string', description: 'Original filename' }
      },
      required: ['serviceCode', 'fileData']
    }
  },
  {
    name: 'ecmr_file_download',
    description: 'Download an attachment from an eCMR.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code' }
      },
      required: ['serviceCode']
    }
  },

  // === SEND ===
  {
    name: 'ecmr_send',
    description: 'Send eCMR to the receiver company.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceCode: { type: 'string', description: 'Service code to send' }
      },
      required: ['serviceCode']
    }
  }
];

/**
 * Server implementation
 */
class ECMRServer {
  constructor() {
    this.server = new Server(
      {
        name: 'ecmr-mcp-skybridge',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    for (const tool of toolDefinitions) {
      this.server.setRequestHandler(
        { method: 'tools/list' },
        async () => ({
          tools: toolDefinitions
        })
      );
    }

    this.server.setRequestHandler(
      { method: 'tools/call' },
      async (request) => {
        const { name, arguments: args } = request.params;
        
        // Stub implementations - replace with actual API calls
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ 
                tool: name, 
                args,
                status: 'stub',
                message: 'This is a stub. Replace with actual ECMR API calls.'
              }, null, 2)
            }
          ]
        };
      }
    );
  }

  start() {
    const port = process.env.PORT || 3000;
    this.server.connect(stdio());
    console.log(`ECMR MCP Server running on port ${port}`);
  }
}

// Export for use
module.exports = { ECMRServer, toolDefinitions };