#!/usr/bin/python3
import os
import subprocess
from code_postprocessing import file
import click

DEAFULT_CODE_DIR = "include/"
DEFAULT_DIAGRAM_DIR = "diagrams/"
EJS_REQUIRE = "REQUIRE_PATH"
os_type = None


@click.group()
def cli():
    pass


@click.command(help="build source code from UML models")
@click.argument("source_model", type=click.Path(exists=True), required=True)
@click.argument(
    "output_dir",
    type=click.Path(exists=False),
    default=DEAFULT_CODE_DIR,
    required=False,
)
@click.option("--package", "-p", required=False, help="package name")
def build_uml(source_model, output_dir, package):
    init_ejs()

    generateHeaderFiles(source_model, output_dir, package)
    generateInterfaceDefinitions(source_model, output_dir, package)
    formatHeaderFiles(output_dir)
    postProcessCode(output_dir)

    reset_ejs()


@click.command(help="export diagrams from UML models")
@click.argument("source_model", type=click.Path(exists=True), required=True)
@click.argument(
    "output_dir",
    type=click.Path(exists=False),
    default=DEFAULT_DIAGRAM_DIR,
    required=False,
)
def export_diagrams(source_model, output_dir):
    deleteSvgFiles(output_dir)
    generateDiagrams(source_model, output_dir)


def generateDiagrams(source_model, output_dir):
    click.echo(click.style("generate diagrams from UML model", fg="cyan"))

    star_uml_command = getStarUmlCommand()
    command = f'{star_uml_command} image {source_model} -f svg -o "{output_dir}/<%=filenamify(element.name)%>.svg"'
    click.echo(click.style(command, fg="yellow"))
    subprocess.run(command, shell=True)

    python_command = getPythonCommand()
    current_directory = os.getcwd()
    command = f"{python_command} svg_postprocess.py {current_directory}/{output_dir}"
    click.echo(click.style(command, fg="yellow"))
    subprocess.run(command, shell=True)

    click.echo()


def generateHeaderFiles(source_model, output_dir, package):
    click.echo(click.style("generate header files from UML classes", fg="cyan"))

    if package is not None:
        scope = f"{setPackage(package)}@UMLClass"
    else:
        scope = "@UMLClass"

    command = f'{getStarUmlCommand()} ejs {source_model} -t {ejsPath()} -s {scope} -o "{output_dir}<%=filenamify(element.name)%>.hpp"'
    click.echo(click.style(command, fg="yellow"))
    subprocess.run(command, shell=True)

    click.echo()


def generateInterfaceDefinitions(source_model, output_dir, package):
    click.echo(click.style("generate header files from UML interfaces", fg="cyan"))

    if package is not None:
        scope = f"{setPackage(package)}@UMLInterface"
    else:
        scope = "@UMLInterface"

    command = f'{getStarUmlCommand()} ejs {source_model} -t {ejsPath()} -s {scope} -o "{output_dir}<%=filenamify(element.name)%>.hpp"'
    click.echo(click.style(command, fg="yellow"))
    subprocess.run(command, shell=True)

    click.echo()


def formatHeaderFiles(directory):
    click.echo(click.style("format header files with clang (google style)", fg="cyan"))
    
    command = f"clang-format -i -style=Google {directory}*.hpp"
    click.echo(click.style(command, fg="yellow"))
    subprocess.run(command, shell=True)

    click.echo()


def postProcessCode(directory):
    click.echo(click.style("postprocess code", fg="cyan"))

    click.echo()


def init_ejs():
    ejs = file("ejs/cpp-class.ejs")
    current_directory = os.getcwd()

    if os_type == "windows":
        current_directory = current_directory.replace("\\", "\\\\")
        ejs.replacePart(
            f"{EJS_REQUIRE}", f"{current_directory}\\\\src\\\\code-generator.js"
        )
    else:
        ejs.replacePart(f"{EJS_REQUIRE}", f"{current_directory}/src/code-generator.js")


def reset_ejs():
    ejs = file("ejs/cpp-class.ejs")
    current_directory = os.getcwd()

    if os_type == "windows":
        current_directory = current_directory.replace("\\", "\\\\")
        ejs.replacePart(
            f"{current_directory}\\\\src\\\\code-generator.js", f"{EJS_REQUIRE}"
        )
    else:
        ejs.replacePart(f"{current_directory}/src/code-generator.js", f"{EJS_REQUIRE}")


def getStarUmlCommand():
    if os_type == "windows":
        return '"C:\Program Files\StarUML\StarUML.exe"'
    else:
        return "staruml"


def getPythonCommand():
    if os_type == "windows":
        return "python"
    else:
        return "python3"


def deleteSvgFiles(directory):
    if os.path.exists(directory):
        for filename in os.listdir(directory):
            if filename.endswith(".svg"):
                os.remove(os.path.join(directory, filename))


def ejsPath():
    if os_type == "windows":
        return ".\ejs\cpp-class.ejs"
    else:
        return "ejs/cpp-class.ejs"


def setPackage(package):
    if os_type == "windows":
        click.echo(click.style("package can't be selected on windows", fg="red"))
        return ""
    else:
        return f"{package}::"


cli.add_command(build_uml)
cli.add_command(export_diagrams)

if __name__ == "__main__":
    if os.name == "nt":
        os_type = "windows"
    else:
        os_type = "linux"
    cli()
