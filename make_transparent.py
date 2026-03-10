#!/usr/bin/env python3
"""
Remove white backgrounds from food images and make them transparent.
"""
from PIL import Image
import os
import glob

def remove_white_background(input_path, output_path, threshold=240):
    """
    Remove white background from an image and save with transparency.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output PNG
        threshold: RGB value threshold for "white" (default 240)
    """
    # Open image and convert to RGBA
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    # Get pixel data
    data = img.getdata()
    
    # Create new pixel data with transparent whites
    new_data = []
    for item in data:
        # If pixel is close to white (all RGB values > threshold), make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))  # Transparent
        else:
            new_data.append(item)
    
    # Update image data
    img.putdata(new_data)
    
    # Save as PNG (supports transparency)
    img.save(output_path, "PNG")
    print(f"✓ Processed: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")

def main():
    # Get all JPG images in the images folder (excluding screenshots)
    image_dir = "images"
    food_images = glob.glob(os.path.join(image_dir, "*.jpg"))
    
    # Filter out screenshots
    food_images = [img for img in food_images if not os.path.basename(img).startswith("Screenshot")]
    
    print(f"Found {len(food_images)} food images to process\n")
    
    for img_path in sorted(food_images):
        # Generate output path (replace .jpg with .png)
        output_path = img_path.rsplit('.', 1)[0] + '.png'
        
        try:
            remove_white_background(img_path, output_path)
        except Exception as e:
            print(f"✗ Error processing {img_path}: {e}")
    
    print(f"\n✓ Processed {len(food_images)} images")
    print("\nNext steps:")
    print("1. Remove old .jpg files: rm images/*.jpg (keep screenshots if needed)")
    print("2. Test the site locally")
    print("3. Git commit and push")

if __name__ == "__main__":
    main()
