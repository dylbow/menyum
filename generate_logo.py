import requests
import json
import base64
import time
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import io

# Generate logo using fal.ai
def generate_logo():
    api_key = "73ed3212-4e7e-4520-8a79-7e6cbd047050:5e30f01cbec0f9c13c3bd93f4eb4bbad"
    
    prompt = """Modern minimalist logo for 'Menyum' food app. A clean, elegant design combining a stylized fork and spoon forming an 'M' shape. Gradient colors purple to pink (#667eea to #f093fb). Glass morphism aesthetic. Centered on transparent or white background. Professional, simple, iconic. High quality vector-style illustration."""
    
    headers = {
        "Authorization": f"Key {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "prompt": prompt,
        "image_size": "square",
        "num_inference_steps": 50,
        "guidance_scale": 7.5,
        "num_images": 1,
        "enable_safety_checker": False,
        "output_format": "png"
    }
    
    print("Generating logo with Flux Pro...")
    response = requests.post(
        "https://fal.run/fal-ai/flux-pro/v1.1",
        headers=headers,
        json=payload
    )
    
    if response.status_code == 200:
        result = response.json()
        image_url = result['images'][0]['url']
        
        print(f"Logo generated! Downloading from {image_url}")
        img_response = requests.get(image_url)
        
        if img_response.status_code == 200:
            return Image.open(io.BytesIO(img_response.content))
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

# Create a simple fallback logo if generation fails
def create_fallback_logo():
    print("Creating fallback logo...")
    size = 1024
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Create gradient background circle
    center = size // 2
    radius = size // 2 - 50
    
    # Draw glassmorphic circle with gradient effect
    for i in range(radius, 0, -2):
        # Gradient from purple to pink
        ratio = i / radius
        r = int(102 + (240 - 102) * (1 - ratio))
        g = int(126 + (147 - 126) * (1 - ratio))
        b = int(234 + (251 - 234) * (1 - ratio))
        alpha = int(200 + 55 * ratio)
        
        color = (r, g, b, alpha)
        draw.ellipse(
            [center - i, center - i, center + i, center + i],
            fill=color
        )
    
    # Add white border
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        outline=(255, 255, 255, 200),
        width=8
    )
    
    # Try to load a nice font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 320)
    except:
        font = ImageFont.load_default()
    
    # Draw 'M' in the center
    text = "M"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) // 2 - bbox[0]
    text_y = (size - text_height) // 2 - bbox[1]
    
    # Draw text shadow
    for offset in [(4, 4), (2, 2)]:
        draw.text(
            (text_x + offset[0], text_y + offset[1]),
            text,
            font=font,
            fill=(0, 0, 0, 100)
        )
    
    # Draw main text
    draw.text((text_x, text_y), text, font=font, fill=(255, 255, 255, 255))
    
    return img

# Save logo at different sizes
def save_icon_sizes(logo_img):
    sizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512]
    
    print("Creating icon files...")
    for size in sizes:
        resized = logo_img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(f'icons/icon-{size}x{size}.png', 'PNG', optimize=True)
        print(f"  ✓ icon-{size}x{size}.png")
    
    # Also save a larger version for the header
    header_logo = logo_img.resize((200, 200), Image.Resampling.LANCZOS)
    header_logo.save('logo.png', 'PNG', optimize=True)
    print("  ✓ logo.png (for header)")

if __name__ == "__main__":
    # Try to generate with AI first
    logo = generate_logo()
    
    # Fallback to programmatic logo if AI fails
    if logo is None:
        logo = create_fallback_logo()
    
    # Ensure it's square and has transparency
    if logo.mode != 'RGBA':
        logo = logo.convert('RGBA')
    
    # Make it square if it isn't
    width, height = logo.size
    if width != height:
        max_size = max(width, height)
        new_img = Image.new('RGBA', (max_size, max_size), (0, 0, 0, 0))
        paste_x = (max_size - width) // 2
        paste_y = (max_size - height) // 2
        new_img.paste(logo, (paste_x, paste_y), logo if logo.mode == 'RGBA' else None)
        logo = new_img
    
    save_icon_sizes(logo)
    print("\n✅ Logo generation complete!")
