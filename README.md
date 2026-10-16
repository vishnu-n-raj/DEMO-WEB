# LiquidCraft AI — Shopify Liquid Code Generator

A simple responsive web app where users describe a Shopify theme feature in plain language, receive AI-generated Liquid code, and copy it with one click.

## Requirements

- Node.js 18 or newer
- An OpenAI API key

## Run locally

1. Extract the ZIP and open the project folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env`.
4. Add your API key to `.env`:

   ```env
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4.1
   PORT=3000
   ```

5. Start the app:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000`.

## How it works

- The browser sends the user's prompt to `/api/generate`.
- The Node.js server calls the OpenAI Responses API.
- The API key stays on the server and is never included in frontend code.
- The generated code appears in a code panel with a copy button.

## Deploying

Deploy to a Node.js hosting provider that supports environment variables. Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in the host's environment settings. Do not commit your `.env` file or expose your API key in client-side JavaScript.

## Before publishing generated code

Generated code can contain mistakes or assumptions. Review it, test it on a duplicate/development Shopify theme, and verify the section schema and storefront behavior before publishing. Add rate limiting and authentication before exposing this app publicly to prevent API abuse.
