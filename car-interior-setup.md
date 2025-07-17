# Car Interior Background Setup

## Image Implementation Steps

### Step 1: Save the Image
1. **Right-click** the car interior image you want to use
2. **Save As:** `car-interior-background.jpg` (or `.webp` for smaller file size)
3. **Location:** Save it in your project folder (same folder as `index.html`)

### Step 2: Image Specifications
- **Recommended size:** 1920x1080px or higher
- **Format:** JPG (good) or WebP (best compression)
- **Quality:** High resolution for crisp detail
- **Orientation:** Landscape (horizontal)

### Step 3: Test and Adjust
After saving the image, refresh your browser to see the result.

## Fine-Tuning Options

### If the image appears too bright:
Update the overlay in `styles.css`:
```css
background: 
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url('car-interior-background.jpg');
```

### If the image appears too dark:
```css
background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url('car-interior-background.jpg');
```

### To change image position:
- `background-position: top;` - Show upper part of image
- `background-position: bottom;` - Show lower part of image
- `background-position: left;` - Show left side of image
- `background-position: right;` - Show right side of image

### To disable parallax effect:
Change `background-attachment: fixed;` to `background-attachment: scroll;`

## Expected Result
- **Stunning car interior backdrop** for your service panels
- **Professional automotive atmosphere**
- **Enhanced luxury feel** matching your boutique brand
- **Text remains readable** with the dark overlay 