import os
for root, _, files in os.walk('src'):
    for f in files:
        if not f.endswith(('.ts', '.tsx', '.css')): continue
        path = os.path.join(root, f)
        try:
            with open(path, 'r', encoding='utf-8', errors='replace') as file:
                content = file.read()
                if r'\1e' in content or r'\1' in content:
                    print(f"Found literal in {path}")
        except Exception as e:
            pass
