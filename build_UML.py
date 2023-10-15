#!/usr/bin/python3
import os
import subprocess
from code_postprocessing import file
import click

DEAFULT_CODE_DIR = 'include/'
DEFAULT_DIAGRAM_DIR = 'diagrams/'
EJS_REQUIRE = 'REQUIRE_PATH'

@click.group()
def cli():
    pass

@click.command(help="build source code from UML models")
@click.argument('source_model', type=click.Path(exists=True), required=True)
@click.argument('output_dir', type=click.Path(exists=False), default=DEAFULT_CODE_DIR, required=False)
@click.option('--package', '-p', required=True, help="package name")
def build_uml(source_model, output_dir, package):
    click.echo(click.style("input arguments", fg="cyan"))
    click.echo("source model: " + source_model)
    click.echo("output directory: " + output_dir)
    click.echo("package: " + package)
    init_ejs()
    generateHeaderFiles(source_model, output_dir, package)
    generateInterfaceDefinitions(source_model, output_dir, package)
    formatHeaderFiles(output_dir)
    postProcessCode(output_dir)
    reset_ejs()

@click.command(help="export diagrams from UML models")
@click.argument('source_model', type=click.Path(exists=True), required=True)
@click.argument('output_dir', type=click.Path(exists=False), default=DEFAULT_DIAGRAM_DIR, required=False)
def export_diagrams(source_model, output_dir):
    click.echo(click.style("input arguments", fg="cyan"))
    click.echo("source model: " + source_model)
    click.echo("output directory: " + output_dir)
    generateDiagrams(source_model, output_dir)

def generateDiagrams(source_model, output_dir):
    click.echo(click.style("generate diagrams from UML model", fg='cyan'))
    subprocess.run(['staruml', 'image', source_model, '-f', 'svg', '-o', f'{output_dir}<%=filenamify(element.name)%>_diagram.svg'])
    current_directory = os.getcwd()
    subprocess.run(['python3', 'svg_postprocess.py', f'{current_directory}/{output_dir}'])
    click.echo()

def generateHeaderFiles(source_model, output_dir, package):
    click.echo(click.style("generate header files from UML classes", fg='cyan'))
    subprocess.run(['staruml', 'ejs', source_model, '-t', 'ejs/cpp-class.ejs', '-s', f'{package}::@UMLClass', '-o', f'{output_dir}<%=filenamify(element.name)%>.hpp'])
    click.echo()

def generateInterfaceDefinitions(source_model, output_dir, package):
    click.echo(click.style("generate header files from UML interfaces", fg='cyan'))
    subprocess.run(['staruml', 'ejs', source_model, '-t', 'ejs/cpp-class.ejs', '-s', f'{package}::@UMLInterface', '-o', f'{output_dir}<%=filenamify(element.name)%>.hpp'])

def formatHeaderFiles(directory):
    click.echo(click.style("format header files with clang (google style)", fg='cyan'))
    click.echo("clang-format -i -style=Google *.hpp")
    os.system(f'clang-format -i -style=Google {directory}*.hpp')
    click.echo("clang-format -i -style=Google *.h")
    os.system(f'clang-format -i -style=Google {directory}*.h')

def postProcessCode(directory):
    click.echo(click.style("postprocess code", fg='cyan'))
    click.echo()
    
def init_ejs():
    ejs = file('ejs/cpp-class.ejs')
    current_directory = os.getcwd()
    ejs.replacePart(f'{EJS_REQUIRE}', f'{current_directory}/src/code-generator.js')
    
def reset_ejs():
    ejs = file('ejs/cpp-class.ejs')
    current_directory = os.getcwd()
    ejs.replacePart(f'{current_directory}/src/code-generator.js', f'{EJS_REQUIRE}')

cli.add_command(build_uml)
cli.add_command(export_diagrams)

if __name__ == '__main__':
    cli()