# Bracco Cashback Estimator (Expo + React Native)

A single-screen **cashback estimator** built in **React Native (Expo)** using **Expo Router**. The UI is data-driven from the provided JSON (tiers + monthly cap) and calculates estimated cashback **per wager**, **monthly**, and **yearly**, including **cap handling**.

## Features



## Tech Stack

- Expo SDK `~54`
- React Native `0.81.x` (New Architecture enabled)
- Expo Router `~6`
- TypeScript
- Jest + `@testing-library/jest-native` for unit tests

## Quick Start

### 1) Install

```bash
npm install
```

### 2) Run

```bash
npm run start
# or
npm run ios
npm run android
```

## Project Structure

The project intentionally has **two “components” areas**:

- `src/components/` → **Shared, reusable UI primitives**
  - Example: `Chip`, `Stepper`, `Segmented`, `ProgressBar`, `StatRow`, etc.

- `src/screens/home/components/` → **Screen-specific sections** (composition)
  - Example: `BetTypeCard`, `StakeCard`, `EstimateCard`, `CompareCard`, etc.

This keeps shared components clean and makes the Home screen read like a composition of sections.

Routes:

- `app/_layout.tsx` → Navigation shell + **Lottie splash overlay**
- `app/index.tsx` → Exports the Home screen
- `src/screens/home/HomeScreen.tsx` → Main screen composition

## Cashback Calculation

All calculations are front-end only and derived from JSON.

Source: `src/domain/cashback.ts`

- **Inputs**
  - `stake`: wager size (clamped to `>= 0`)
  - `wagersPerMonth`: monthly wager count (floored + clamped to `>= 0`)
  - `rate`: tier cashback rate (clamped between `0` and `1`)
  - `cap`: monthly cashback cap (clamped to `>= 0`)

- **Formula**
  1. Cashback per wager = `stake × rate`
  2. Uncapped monthly = `perWager × wagersPerMonth`
  3. Monthly cashback = `min(uncappedMonthly, cap)`
  4. Yearly cashback = `monthly × 12`
  5. Wager needed to hit cap = `cap ÷ rate` (Infinity when `rate = 0`)

- **Rounding**
  - Values are rounded to **2 decimals** using a `roundMoney()` helper function.

## Theming

- Theme helper: `src/theme/colors.ts`
- Bracco brand color is applied through `colors.brand` and supporting tokens.
- App icon + adaptive icon are configured in `app.json`.

The theme reference was taken from [Bracco Website](https://game.playbracco.com/)

## Splash Screen

- Lottie JSON: `assets/lottie/splash.json`
- Background: `#F15622`


## Project Scripts

- `npm run start` — start Expo dev server
- `npm run ios` — open iOS simulator
- `npm run android` — run on Android emulator/device
- `npm test` — run Jest
- `npm run test:watch` — watch mode


