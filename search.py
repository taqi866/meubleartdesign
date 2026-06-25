import re

files = ['script.js', 'index.html']
keywords = ['print', 'sketch', 'croquis', 'كروكي', 'طابعة', 'طباعة', 'window.open', 'iframe', 'canvas']

for file in files:
    print(f"=== Searching in {file} ===")
    try:
        with open(file, 'r', encoding='utf-8') as f:
            for idx, line in enumerate(f, 1):
                for kw in keywords:
                    if kw.lower() in line.lower():
                        content = line.strip()
                        if len(content) > 120:
                            content = content[:120] + "..."
                        print(f"Line {idx} ({kw}): {content}")
                        break
    except Exception as e:
        print(f"Error reading {file}: {e}")
