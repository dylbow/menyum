#!/usr/bin/env python3
"""Generate Menyum icons with M burger logo on dusty pink background"""
from PIL import Image, ImageDraw
import os

# Dusty/light pink color (soft, muted pink)
DUSTY_PINK = '#f5d5d8'  # Light dusty pink

# Icon sizes to generate
SIZES = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512]

def create_svg_icon():
    """Create the main SVG icon with M burger logo on pink background"""
    svg_content = '''<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="110" fill="#f5d5d8"/>
  
  <!-- M Burger Logo - Simplified burger M (BIGGER - 75% of icon space) -->
  <g transform="translate(256, 256)">
    <!-- Top bun -->
    <ellipse cx="0" cy="-115" rx="170" ry="42" fill="#D4A574"/>
    
    <!-- M arches (like McDonald's golden arches forming an M) -->
    <path d="M -130,-85 Q -130,-28 -130,28 L -100,28 L -100,-56 Q -100,-78 -72,-85 Q -43,-92 0,-72 Q 43,-92 72,-85 Q 100,-78 100,-56 L 100,28 L 130,28 L 130,-85 Q 130,-28 130,28 L 130,28 Q 100,-14 72,-28 Q 43,-42 0,-50 Q -43,-42 -72,-28 Q -100,-14 -130,28 Z" fill="#FFC72C"/>
    
    <!-- Lettuce -->
    <rect x="-145" y="35" width="290" height="22" fill="#7CB342" rx="4"/>
    
    <!-- Patty -->
    <rect x="-160" y="63" width="320" height="36" fill="#6D4C41" rx="7"/>
    
    <!-- Cheese -->
    <path d="M -167,102 L -152,118 L 152,118 L 167,102 Z" fill="#FFA000"/>
    
    <!-- Bottom bun -->
    <rect x="-175" y="122" width="350" height="28" fill="#D4A574" rx="4"/>
  </g>
</svg>'''
    
    with open('icons/icon.svg', 'w') as f:
        f.write(svg_content)
    print("✅ Created icons/icon.svg")

def create_png_icons():
    """Generate PNG icons from SVG using simple M burger drawing"""
    for size in SIZES:
        # Create image with dusty pink background
        img = Image.new('RGBA', (size, size), DUSTY_PINK)
        draw = ImageDraw.Draw(img)
        
        # Calculate scaling factor
        scale = size / 512.0
        center = size / 2
        
        # Draw simplified M burger (BIGGER - 75% of icon space)
        # Top bun (ellipse)
        bun_width = int(170 * scale * 2)
        bun_height = int(42 * scale * 2)
        bun_top = int(center - 115 * scale)
        draw.ellipse([
            center - bun_width/2, bun_top - bun_height/2,
            center + bun_width/2, bun_top + bun_height/2
        ], fill='#D4A574')
        
        # M arches (golden arches)
        arch_color = '#FFC72C'
        arch_y = int(center - 58 * scale)
        arch_height = int(86 * scale)
        arch_width = int(58 * scale)
        
        # Left arch
        draw.ellipse([
            center - 130*scale - arch_width/2, arch_y,
            center - 130*scale + arch_width/2, arch_y + arch_height
        ], fill=arch_color)
        
        # Right arch  
        draw.ellipse([
            center + 130*scale - arch_width/2, arch_y,
            center + 130*scale + arch_width/2, arch_y + arch_height
        ], fill=arch_color)
        
        # Lettuce
        lettuce_top = int(center + 35 * scale)
        draw.rectangle([
            center - 145*scale, lettuce_top,
            center + 145*scale, lettuce_top + 22*scale
        ], fill='#7CB342')
        
        # Patty
        patty_top = int(center + 63 * scale)
        draw.rounded_rectangle([
            center - 160*scale, patty_top,
            center + 160*scale, patty_top + 36*scale
        ], radius=int(7*scale), fill='#6D4C41')
        
        # Cheese
        cheese_top = int(center + 102 * scale)
        draw.polygon([
            (center - 167*scale, cheese_top),
            (center - 152*scale, cheese_top + 16*scale),
            (center + 152*scale, cheese_top + 16*scale),
            (center + 167*scale, cheese_top)
        ], fill='#FFA000')
        
        # Bottom bun
        bottom_top = int(center + 122 * scale)
        draw.rounded_rectangle([
            center - 175*scale, bottom_top,
            center + 175*scale, bottom_top + 28*scale
        ], radius=int(4*scale), fill='#D4A574')
        
        # Add rounded corners to the icon
        mask = Image.new('L', (size, size), 0)
        mask_draw = ImageDraw.Draw(mask)
        corner_radius = int(110 * scale) if size == 512 else int(size * 0.2)
        mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=corner_radius, fill=255)
        
        # Apply mask
        output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        output.paste(img, (0, 0))
        output.putalpha(mask)
        
        # Save
        filename = f'icons/icon-{size}x{size}.png'
        output.save(filename, 'PNG')
        print(f"✅ Created {filename}")

if __name__ == '__main__':
    print("🎨 Generating Menyum icons with M burger on dusty pink background...")
    create_svg_icon()
    create_png_icons()
    print("\n✅ All icons generated successfully!")
