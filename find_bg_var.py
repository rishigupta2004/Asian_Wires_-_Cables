import os
import re

pattern = re.compile(rb'bg-\[var\(--.*?-primary\)\]')

def scan_dir(d):
    for root, _, files in os.walk(d):
        for f in files:
            path = os.path.join(root, f)
            try:
                with open(path, 'rb') as file:
                    content = file.read()
                    matches = pattern.findall(content)
                    for m in matches:
                        if b'accent' not in m and b'background' not in m and b'foreground' not in m and b'border' not in m:
                            print(f"FOUND: {m} in {path}")
            except Exception:
                pass

scan_dir('src')
