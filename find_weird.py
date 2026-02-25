import os
import re

weird_pattern = re.compile(rb'bg-\[var\(--[^\x20-\x7E]+-primary\)\]')

def scan_dir(d):
    for root, _, files in os.walk(d):
        for f in files:
            path = os.path.join(root, f)
            try:
                with open(path, 'rb') as file:
                    content = file.read()
                    if b'-primary' in content:
                        print(f"Checking {path}")
                        matches = weird_pattern.findall(content)
                        for m in matches:
                            print(f"FOUND: {m} in {path}")
            except Exception:
                pass

scan_dir('src')
