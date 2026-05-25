# Cargoffer eCMR - Skybridge MCP App

<p align="center">
  <strong>Electronic Consignment Note (eCMR) MCP App for Cargoffer B2B logistics platform</strong>
</p>

<p align="center">
  <a href="https://docs.cargoffer.com/ecmr">Documentation</a> ·
  <a href="https://cargoffer.com/">Website</a> ·
  <a href="https://github.com/cargoffer/ecmr-mcp-skybridge">GitHub</a>
</p>

---

## About

**Cargoffer eCMR** is a [Skybridge](https://skybridge.tech) application for creating, signing, and managing **electronic Consignment Notes (eCMR)** for freight transportation. It enables AI assistants (Claude, ChatGPT, Cursor, Copilot) to handle digital CMR documents through natural language.

### Keywords

`ecmr` `cmr` `consignment note` `electronic cMR` `digital waybill` `mcp` `logistics` `transportation` `freight` `cargo` `signatures` `qr` `pdf` `spain` `portugal` `latam`

### Release

![Version](https://img.shields.io/github/v/release/cargoffer/ecmr-mcp-skybridge?style=flat&label=release)
![Last commit](https://img.shields.io/github/last-commit/cargoffer/ecmr-mcp-skybridge/main)
![License](https://img.shields.io/github/license/cargoffer/ecmr-mcp-skybridge)

---

## What is this?

**eCMR** (Electronic Consignment Note) is the digital equivalent of the traditional CMR paper document. This MCP enables AI assistants to:

- **Create** digital consignment notes
- **Sign** electronically (sender, pickup, delivery)
- **Lock** documents legally
- **Generate QR codes** for scanning
- **Export to PDF**
- **Manage** drivers, vehicles, and addresses

### Features

- Complete eCMR lifecycle management
- Multi-party digital signatures
- QR code generation and validation
- PDF export
- File attachments
- Address book management
- Driver and vehicle Registry

---

## Installation

### Prerequisites

- Node.js >= 22.0.0
- pnpm (recommended) or npm

### Quick Install

```bash
# Clone the repository
git clone https://github.com/cargoffer/ecmr-mcp-skybridge.git
cd ecmr-mcp-skybridge

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Connect to Claude Desktop

This is a Skybridge app frontend. For the actual MCP server that connects to Cargoffer eCMR API, use:

**For eCMR:**
```json
{
  "mcpServers": {
    "cargoffer-ecmr": {
      "command": "npx",
      "args": ["-y", "@cargoffer/ecmr-mcp"]
    }
  }
}
```

Or run from source:
```bash
git clone https://github.com/cargoffer/ecmr-mcp.git
cd ecmr-mcp && npm install && npm start
```

---

## Tools Available

### Authentication

| Tool | Description |
|------|-------------|
| `ecmr_auth_login` | Login to ECMR API |
| `ecmr_auth_register` | Register new company |

### Addresses

| Tool | Description |
|------|-------------|
| `ecmr_addresses_list` | List saved addresses |
| `ecmr_addresses_create` | Create new address |
| `ecmr_addresses_update` | Update address |
| `ecmr_addresses_delete` | Delete address |

### Drivers

| Tool | Description |
|------|-------------|
| `ecmr_drivers_list` | List drivers |
| `ecmr_drivers_create` | Register driver |
| `ecmr_drivers_update` | Update driver |
| `ecmr_drivers_delete` | Remove driver |

### Vehicles

| Tool | Description |
|------|-------------|
| `ecmr_vehicles_list` | List vehicles |
| `ecmr_vehicles_create` | Register vehicle |
| `ecmr_vehicles_update` | Update vehicle |
| `ecmr_vehicles_delete` | Remove vehicle |

### eCMR Core

| Tool | Description |
|------|-------------|
| `ecmr_create` | Create new eCMR |
| `ecmr_get` | Get eCMR by code |
| `ecmr_list` | List all eCMRs |
| `ecmr_update` | Update eCMR |
| `ecmr_delete` | Delete draft eCMR |
| `ecmr_lock` | Lock/seal eCMR legally |

### Signatures

| Tool | Description |
|------|-------------|
| `ecmr_sign_sender` | Sign as sender |
| `ecmr_sign_pickup` | Sign at pickup |
| `ecmr_sign_delivery` | Sign at delivery |
| `ecmr_signatures_list` | List pending signatures |

### QR / PDF

| Tool | Description |
|------|-------------|
| `ecmr_qr_generate` | Generate QR code |
| `ecmr_qr_validate` | Validate QR code |
| `ecmr_pdf` | Generate PDF |

### Files

| Tool | Description |
|------|-------------|
| `ecmr_file_upload` | Upload attachment |
| `ecmr_file_download` | Download attachment |

### Send

| Tool | Description |
|------|-------------|
| `ecmr_send` | Send eCMR to receiver |

---

## Use Cases

### For AI Assistants

This MCP enables AI assistants to:

1. **Create shipments** - Generate eCMR from shipment details
2. **Handle signatures** - Process multi-party digital signatures
3. **Validate documents** - Scan QR codes, verify document status
4. **Export documents** - Generate PDFs for printing
5. **Manage logistics** - Track drivers, vehicles, addresses

### For Developers

- **Integrate with platforms** - Connect to any AI assistant
- **Automate workflows** - Create eCMRs from templates
- **Verify compliance** - Ensure legal locks beforetransport

---

## Tech Stack

- [Skybridge](https://skybridge.tech) - MCP Apps framework
- [React](https://react.dev) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev) - Build tool

---

## Documentation

- [eCMR API Docs](https://docs.cargoffer.com/ecmr) - Full API reference
- [Skybridge Framework](https://docs.skybridge.tech) - Framework docs
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specification
- [CMR Convention](https://unece.org/cmr-convention) - UN CMR legal framework

---

## License

MIT - Cargoffer Team

## Support

- Issues: [GitHub Issues](https://github.com/cargoffer/ecmr-mcp-skybridge/issues)
- Email: developers@cargoffer.com
- Website: https://cargoffer.com/