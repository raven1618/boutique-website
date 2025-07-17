# Carbon Fiber Texture Options

## Current Implementation
- File: `carbon-fiber.svg`
- Type: Vector-based detailed pattern
- Size: ~2KB
- Quality: Very high, scales infinitely

## Upgrade to Photographic Realism

### Option 1: High-Res Photo Texture
Replace the SVG with a real carbon fiber photograph:

1. **Find/create image**: 1024x1024px or higher
2. **Optimize**: Convert to WebP format (~50-100KB)
3. **Update CSS**: Replace `url('carbon-fiber.svg')` with `url('carbon-fiber-photo.webp')`

### Option 2: 3D Rendered Texture
Use a 3D software rendered carbon fiber:
- **Blender/3ds Max** for photorealistic rendering
- **Control lighting** exactly as needed
- **Perfect symmetry** and detail

### Recommended Photo Sources:
- Unsplash: Search "carbon fiber macro"
- Adobe Stock: High-res automotive textures
- Custom photography: Macro lens on real carbon fiber parts

### CSS Update for Photo:
```css
background: 
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url('carbon-fiber-photo.webp');
background-size: cover, 200px 200px; /* Adjust size for detail level */
``` 