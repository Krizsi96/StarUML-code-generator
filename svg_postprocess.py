import os
import sys

if len(sys.argv) > 1:
    argument_file_path = sys.argv[1]
else:
    print('No argument given. Exiting.')
    sys.exit()

directory = argument_file_path
for filename in os.listdir(directory):
    if filename.endswith('.svg'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r+') as file:
            svg = file.read()
            search_term = '><defs/'
            replace_term = ' style="background-color: white"><defs/'
            svg = svg.replace(search_term, replace_term)
            file.seek(0)
            file.write(svg)
            file.truncate()
