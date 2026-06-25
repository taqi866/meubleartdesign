import base64
import os
import sys

def compress_and_encode():
    workspace_logo = 'logo.png'
    if not os.path.exists(workspace_logo):
        print("Error: logo.png not found")
        sys.exit(1)
        
    # Read raw logo bytes
    with open(workspace_logo, 'rb') as f:
        img_bytes = f.read()
        
    # Convert to Base64
    base64_encoded = base64.b64encode(img_bytes).decode('utf-8')
    data_url = f"data:image/png;base64,{base64_encoded}"
    
    # Save to file
    output_path = 'logo_base64.txt'
    with open(output_path, 'w') as f:
        f.write(data_url)
    print("Success! Base64 logo size:", len(data_url), "bytes")

if __name__ == '__main__':
    compress_and_encode()
