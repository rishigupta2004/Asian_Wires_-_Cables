import os
def scan_dir(d):
    for root, _, files in os.walk(d):
        for f in files:
            if not f.endswith(('.ts', '.tsx', '.css')): continue
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    for i, line in enumerate(content.split('\n')):
                        if '\x1e' in line or '\u001e' in line or '\x01' in line or '\u0001' in line:
                            print(f'Found in {path}:{i+1}')
                            print(repr(line))
            except Exception as e:
                pass

scan_dir('src')
