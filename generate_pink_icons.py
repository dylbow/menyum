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
  
  <!-- M Burger Logo - Simplified burger M -->
  <g transform="translate(256, 256)">
    <!-- Top bun -->
    <ellipse cx="0" cy="-80" rx="120" ry="30" fill="#D4A574"/>
    
    <!-- M arches (like McDonald's golden arches forming an M) -->
    <path d="M -90,-60 Q -90,-20 -90,20 L -70,20 L -70,-40 Q -70,-55 -50,-60 Q -30,-65 0,-50 Q 30,-65 50,-60 Q 70,-55 70,-40 L 70,20 L 90,20 L 90,-60 Q 90,-20 90,20 L 90,20 Q 70,-10 50,-20 Q 30,-30 0,-35 Q -30,-30 -50,-20 Q -70,-10 -90,20 Z" fill="#FFC72C"/>
    
    <!-- Lettuce -->
    <rect x="-100" y="25" width="200" height="15" fill="#7CB342" rx="3"/>
    
    <!-- Patty -->
    <rect x="-110" y="45" width="220" height="25" fill="#6D4C41" rx="5"/>
    
    <!-- Cheese -->
    <path d="M -115,72 L -105,82 L 105,82 L 115,72 Z" fill="#FFA000"/>
    
    <!-- Bottom bun -->
    <rect x="-120" y="85" width="240" height="20" fill="#D4A574" rx="3"/>
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
        
        # Draw simplified M burger
        # Top bun (ellipse)
        bun_width = int(120 * scale * 2)
        bun_height = int(30 * scale * 2)
        bun_top = int(center - 80 * scale)
        draw.ellipse([
            center - bun_width/2, bun_top - bun_height/2,
            center + bun_width/2, bun_top + bun_height/2
        ], fill='#D4A574')
        
        # M arches (golden arches)
        arch_color = '#FFC72C'
        arch_y = int(center - 40 * scale)
        arch_height = int(60 * scale)
        arch_width = int(40 * scale)
        
        # Left arch
        draw.ellipse([
            center - 90*scale - arch_width/2, arch_y,
            center - 90*scale + arch_width/2, arch_y + arch_height
        ], fill=arch_color)
        
        # Right arch  
        draw.ellipse([
            center + 90*scale - arch_width/2, arch_y,
            center + 90*scale + arch_width/2, arch_y + arch_height
        ], fill=arch_color)
        
        # Lettuce
        lettuce_top = int(center + 25 * scale)
        draw.rectangle([
            center - 100*scale, lettuce_top,
            center + 100*scale, lettuce_top + 15*scale
        ], fill='#7CB342')
        
        # Patty
        patty_top = int(center + 45 * scale)
        draw.rounded_rectangle([
            center - 110*scale, patty_top,
            center + 110*scale, patty_top + 25*scale
        ], radius=int(5*scale), fill='#6D4C41')
        
        # Cheese
        cheese_top = int(center + 72 * scale)
        draw.polygon([
            (center - 115*scale, cheese_top),
            (center - 105*scale, cheese_top + 10*scale),
            (center + 105*scale, cheese_top + 10*scale),
            (center + 115*scale, cheese_top)
        ], fill='#FFA000')
        
        # Bottom bun
        bottom_top = int(center + 85 * scale)
        draw.rounded_rectangle([
            center - 120*scale, bottom_top,
            center + 120*scale, bottom_top + 20*scale
        ], radius=int(3*scale), fill='#D4A574')
        
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
