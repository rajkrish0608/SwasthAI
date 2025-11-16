# SwasthAI Design System

This document defines the design system for SwasthAI MVP to ensure consistency across all pages and components.

## Color Palette

### Primary Colors
```css
--primary-green: #10B981  /* Main brand color, CTAs */
--primary-blue: #3B82F6   /* Secondary actions, links */
--primary-teal: #14B8A6   /* Accents */
```

### Risk Level Colors
```css
--risk-low: #10B981       /* Green - Low risk */
--risk-medium: #F59E0B    /* Amber - Medium risk */
--risk-high: #EF4444      /* Red - High risk */
```

### Neutral Colors (Tailwind defaults)
```css
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-200: #E5E7EB
--gray-300: #D1D5DB
--gray-600: #4B5563
--gray-700: #374151
--gray-900: #111827
```

### Usage Guidelines
- **Primary Green**: Main CTAs, success states, active states
- **Primary Blue**: Secondary actions, links, focus states
- **Gray**: Text, borders, backgrounds
- **Risk Colors**: Only for risk level indicators

## Typography

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Font Sizes
```css
text-xs: 0.75rem (12px)    /* Helper text, captions */
text-sm: 0.875rem (14px)   /* Secondary text, labels */
text-base: 1rem (16px)     /* Body text, inputs */
text-lg: 1.125rem (18px)   /* Subheadings */
text-xl: 1.25rem (20px)    /* Section titles */
text-2xl: 1.5rem (24px)    /* Page subtitles */
text-3xl: 1.875rem (30px)  /* Page titles */
text-4xl: 2.25rem (36px)   /* Hero titles */
```

### Font Weights
```css
font-normal: 400    /* Body text */
font-medium: 500    /* Labels, buttons */
font-semibold: 600  /* Subheadings */
font-bold: 700      /* Headings, emphasis */
```

### Line Heights
```css
leading-tight: 1.25    /* Headings */
leading-normal: 1.5    /* Body text */
leading-relaxed: 1.625 /* Long-form content */
```

## Spacing

Use Tailwind's spacing scale (4px base unit):

```css
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
5: 1.25rem (20px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
```

### Common Patterns
- **Component padding**: `p-4` (16px) or `p-6` (24px)
- **Section spacing**: `space-y-6` (24px) or `space-y-8` (32px)
- **Container padding**: `px-4 md:px-6 lg:px-8`
- **Vertical rhythm**: `mb-4` for paragraphs, `mb-6` for sections

## Components

### Buttons

#### Primary Button
```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```
- Background: `bg-primary-green`
- Text: `text-white`
- Hover: `hover:bg-green-600`
- Focus: `focus:ring-2 focus:ring-primary-green`
- Min height: 44px (touch-friendly)

#### Secondary Button
```tsx
<Button variant="secondary" size="md">
  Cancel
</Button>
```
- Background: `bg-gray-200`
- Text: `text-gray-900`
- Hover: `hover:bg-gray-300`

#### Danger Button
```tsx
<Button variant="danger" size="sm">
  Delete
</Button>
```
- Background: `bg-red-600`
- Text: `text-white`
- Hover: `hover:bg-red-700`

### Cards

```tsx
<Card>
  <h2>Card Title</h2>
  <p>Card content...</p>
</Card>
```
- Background: `bg-white`
- Border: `border border-gray-200`
- Radius: `rounded-lg` (8px)
- Shadow: `shadow-sm`
- Padding: `p-6`

### Inputs

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>
```
- Border: `border border-gray-300`
- Radius: `rounded-lg`
- Padding: `px-4 py-3`
- Focus: `focus:ring-2 focus:ring-primary-blue`
- Min height: 44px (touch-friendly)

### Badges

```tsx
<Badge variant="low">LOW RISK</Badge>
<Badge variant="medium">MEDIUM RISK</Badge>
<Badge variant="high">HIGH RISK</Badge>
```
- Low: `bg-green-100 text-green-800`
- Medium: `bg-amber-100 text-amber-800`
- High: `bg-red-100 text-red-800`
- Padding: `px-3 py-1`
- Radius: `rounded-full`

## Layout

### Container
```tsx
<Container>
  {/* Content */}
</Container>
```
- Max width: `max-w-7xl`
- Padding: `px-4 md:px-6 lg:px-8`
- Margin: `mx-auto`

### Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

### Responsive Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

## Shadows

```css
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)      /* Cards */
shadow: 0 1px 3px rgba(0, 0, 0, 0.1)          /* Elevated cards */
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)       /* Modals */
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)     /* Dropdowns */
```

## Border Radius

```css
rounded: 0.25rem (4px)      /* Small elements */
rounded-md: 0.375rem (6px)  /* Buttons, inputs */
rounded-lg: 0.5rem (8px)    /* Cards, containers */
rounded-xl: 0.75rem (12px)  /* Large cards */
rounded-full: 9999px        /* Pills, badges */
```

## Transitions

```css
transition-colors: color, background-color, border-color
transition-all: all properties
duration-150: 150ms  /* Fast interactions */
duration-300: 300ms  /* Standard transitions */
```

### Usage
```tsx
<button className="transition-colors duration-150 hover:bg-green-600">
  Hover Me
</button>
```

## Icons

### Emoji Icons (Current)
- 📋 Prescription
- 🩺 Health/Medical
- 💊 Medicine
- 📊 Analytics
- 🏥 Hospital
- 🌡️ Temperature
- 💉 Injection
- 🧪 Lab Test

### Future: Icon Library
Consider adding:
- Heroicons (recommended for Tailwind)
- Lucide Icons
- React Icons

## Accessibility

### Focus States
All interactive elements must have visible focus indicators:
```css
focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2
```

### Color Contrast
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### Touch Targets
- Minimum size: 44x44px
- Spacing between targets: 8px minimum

## Responsive Design

### Mobile First Approach
Start with mobile styles, then add larger breakpoints:

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Common Patterns

#### Stack on Mobile, Grid on Desktop
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

#### Hide on Mobile
```tsx
<div className="hidden md:block">
  Desktop only content
</div>
```

#### Show on Mobile Only
```tsx
<div className="block md:hidden">
  Mobile only content
</div>
```

## Animation Guidelines

### Subtle Animations
- Use sparingly for feedback
- Keep duration short (150-300ms)
- Prefer `transition-colors` over `transition-all`

### Loading States
```tsx
<LoadingSpinner size="sm" />
```
- Use consistent spinner across app
- Show during async operations
- Disable buttons during loading

### Hover States
- Darken background by one shade
- Add subtle scale: `hover:scale-105`
- Change cursor: `cursor-pointer`

## Error States

### Form Errors
```tsx
<Input
  label="Email"
  error="Please enter a valid email"
/>
```
- Border: `border-red-500`
- Text: `text-red-600`
- Icon: Red warning icon

### Error Messages
```tsx
<ErrorMessage message="Something went wrong" />
```
- Background: `bg-red-50`
- Border: `border-red-200`
- Text: `text-red-800`

## Success States

### Success Messages
```tsx
<div className="bg-green-50 border border-green-200 rounded-lg p-4">
  <p className="text-green-800">Success!</p>
</div>
```

## Consistency Checklist

### Before Committing
- [ ] Colors match design system
- [ ] Spacing uses Tailwind scale
- [ ] Typography is consistent
- [ ] Buttons have correct variants
- [ ] Cards have consistent styling
- [ ] Forms have proper validation
- [ ] Focus states are visible
- [ ] Touch targets are 44x44px minimum
- [ ] Responsive breakpoints are used
- [ ] Transitions are smooth

### Code Review
- [ ] No hardcoded colors (use Tailwind classes)
- [ ] No hardcoded spacing (use Tailwind scale)
- [ ] No inline styles (use Tailwind classes)
- [ ] Consistent component usage
- [ ] Proper semantic HTML
- [ ] Accessibility attributes present

## Future Enhancements

### Dark Mode
```tsx
<div className="bg-white dark:bg-gray-900">
  {/* Content */}
</div>
```

### Animations
```tsx
<div className="animate-fade-in">
  {/* Content */}
</div>
```

### Custom Components
- Toast notifications
- Modal dialogs
- Dropdown menus
- Tooltips
- Progress bars

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Heroicons](https://heroicons.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
