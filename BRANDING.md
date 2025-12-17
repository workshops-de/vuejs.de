# Branding & Color Configuration

This document explains how colors are managed in the project to make it easy to adapt for different portals (Angular.DE, ReactJS.DE, VueJS.DE).

## Color Configuration Location

Colors are defined in two places:

1. **`src/styles/global.css`** - Full Tailwind color scales (the source of truth)
2. **`src/config/site.ts`** - Reference values for JS/TS usage (gradients, etc.)

### CSS Variables (global.css)

```css
@theme {
  /* Primary color scale (Vue.js green) */
  --color-primary-50: #f0fdf7;
  --color-primary-100: #dcfce9;
  --color-primary-200: #bbf7d4;
  --color-primary-300: #86efb4;
  --color-primary-400: #4ade8b;
  --color-primary-500: #42b883; /* Base */
  --color-primary-600: #16a35a;
  --color-primary-700: #158049;
  --color-primary-800: #16653c;
  --color-primary-900: #145333;
  --color-primary-950: #052e19;
  --color-primary: #42b883; /* Alias */

  /* Accent color scale (Blue) */
  --color-accent-50: #eff6ff;
  --color-accent-100: #dbeafe;
  --color-accent-200: #bfdbfe;
  --color-accent-300: #93c5fd;
  --color-accent-400: #60a5fa;
  --color-accent-500: #3b82f6; /* Base */
  --color-accent-600: #2563eb;
  --color-accent-700: #1d4ed8;
  --color-accent-800: #1e40af;
  --color-accent-900: #1e3a8a;
  --color-accent-950: #172554;
  --color-accent: #3b82f6; /* Alias */
}
```

## Usage Guidelines

### ✅ Correct Usage (Brand-agnostic)

Use these utility classes that automatically adapt to the brand:

**Primary (brand color):**

- `text-primary` or `text-primary-500` - Primary text color
- `text-primary-600` - Darker primary (hover states)
- `text-primary-400` - Lighter primary
- `bg-primary` - Primary background
- `bg-primary-100` - Light primary background
- `bg-primary/10` - Primary with 10% opacity
- `border-primary-200` - Light primary border
- `hover:text-primary-600` - Primary hover state

**Accent (links, interactive elements):**

- `text-accent` or `text-accent-500` - Accent text color
- `text-accent-600` - Darker accent (hover states)
- `bg-accent-100` - Light accent background
- `border-accent-200` - Light accent border

### ❌ Avoid (Brand-specific hardcoded colors)

Don't use hardcoded color classes for brand colors:

| ❌ Avoid           | ✅ Use Instead       |
| ------------------ | -------------------- |
| `text-green-500`   | `text-primary`       |
| `text-green-600`   | `text-primary-600`   |
| `bg-green-100`     | `bg-primary-100`     |
| `border-green-200` | `border-primary-200` |
| `text-blue-500`    | `text-accent`        |
| `text-blue-600`    | `text-accent-600`    |
| `bg-blue-100`      | `bg-accent-100`      |

### ⚠️ Exceptions (Keep hardcoded)

Some colors are semantic and should remain hardcoded:

- `text-gray-*` - Neutral colors
- `bg-white` / `bg-black` - Absolute colors
- `text-red-500` - Error states
- `text-yellow-500` - Warning states
- `text-orange-500` - Caution states

## Adapting for a New Portal

To create a new portal (e.g., Angular.DE):

1. **Update `src/styles/global.css`** - Change the color values in the `@theme` block:

   ```css
   @theme {
     /* Primary color scale (Angular red) */
     --color-primary-50: #fef2f2;
     --color-primary-100: #fee2e2;
     --color-primary-200: #fecaca;
     --color-primary-300: #fca5a5;
     --color-primary-400: #f87171;
     --color-primary-500: #dd0031; /* Angular red */
     --color-primary-600: #c3002f;
     --color-primary-700: #b91c1c;
     --color-primary-800: #991b1b;
     --color-primary-900: #7f1d1d;
     --color-primary-950: #450a0a;
     --color-primary: #dd0031;
     /* ... accent colors ... */
   }
   ```

2. **Update `src/config/site.ts`** - Update the reference values:

   ```typescript
   branding: {
     primary: "#dd0031",
     primaryRgb: "221, 0, 49",
     // ... update color scales and gradients
   }
   ```

3. **Update logos and images** in `public/assets/img/`

4. **That's it!** All `text-primary-*`, `bg-primary-*`, `text-accent-*` classes will automatically use the new colors.

## Current Hardcoded Colors to Migrate

The following files still contain hardcoded brand colors that should be migrated to `text-primary` / `bg-primary`:

- [ ] `src/pages/schulungen/vuejs-typescript.astro` - Green badges and icons
- [ ] `src/layouts/PostLayout.astro` - Purple category badges
- [ ] `src/components/Navigation.astro` - Purple active states
- [ ] `src/components/NavigationBanner.astro` - Green-to-blue gradient
- [ ] `src/pages/tutorials/index.astro` - Purple gradient background
- [ ] `src/pages/kategorie/[category].astro` - Purple gradient background
- [ ] `src/styles/global.css` - Code blocks, alerts, button gradients

## Testing

After changing brand colors, test these areas:

1. Hero section (light & dark mode)
2. Navigation (active states)
3. Buttons and CTAs
4. Category badges
5. Code blocks
6. Alert boxes
7. Form elements
8. Hover states
