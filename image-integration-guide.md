# Custom Carbon Fiber Image Integration

## Image Specifications
- **Recommended size:** 200x200px
- **Format:** WebP (best), PNG (good), JPG (okay)
- **File name:** `carbon-fiber-custom.webp`

## CSS Implementation

### Step 1: Replace background in styles.css
Find the `.navbar` section and replace:

```css
background: 
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url('carbon-fiber.svg');
background-size: cover, 80px 80px;
```

With:

```css
background: 
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url('carbon-fiber-custom.webp');
background-size: cover, 200px 200px;
```

### Step 2: Update JavaScript scroll behavior
In script.js, find the scroll event and update both instances:

```javascript
// When scrolled
navbar.style.background = `
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
    url('carbon-fiber-custom.webp')`;
navbar.style.backgroundSize = 'cover, 200px 200px';

// When at top
navbar.style.background = `
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url('carbon-fiber-custom.webp')`;
navbar.style.backgroundSize = 'cover, 200px 200px';
```

## Pattern Size Adjustment
If 200px shows too much/little detail, adjust the size:
- **Larger pattern (less detail):** `300px 300px`
- **Smaller pattern (more detail):** `150px 150px`
- **Micro detail:** `100px 100px`

## Image Creation Tips
1. **Make it tileable** - edges should match perfectly
2. **High contrast** - dark background, lighter fiber details
3. **Realistic proportions** - fibers should be 1-2px wide
4. **Subtle lighting** - avoid harsh highlights 