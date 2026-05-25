/**
 * ECMR Skybridge Client Configuration
 */

export const ecmrClientConfig = {
  id: 'ecmr_mcp_skybridge',
  name: 'Cargoffer eCMR',
  version: '1.0.0',
  server: {
    url: process.env.ECMR_SERVER_URL || 'http://localhost:3000/mcp'
  },
  capabilities: [
    'ecmr_auth_login',
    'ecmr_auth_register',
    'ecmr_addresses_*',
    'ecmr_drivers_*',
    'ecmr_vehicles_*',
    'ecmr_create',
    'ecmr_get',
    'ecmr_list',
    'ecmr_update',
    'ecmr_delete',
    'ecmr_lock',
    'ecmr_sign_*',
    'ecmr_signatures_list',
    'ecmr_qr_*',
    'ecmr_pdf',
    'ecmr_file_*',
    'ecmr_send'
  ]
};

export default ecmrClientConfig;