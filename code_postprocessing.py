class file:
    def __init__(self, path):
        self.path = path
        self.contents = None

    def replacePart(self, part, replacement):
        with open(self.path, "r") as file:
            contents = file.read()

        contents = contents.replace(part, replacement)

        with open(self.path, "w", newline="\r\n") as file:
            file.write(contents)

    def insertAfter(self, part, insertion):
        with open(self.path, "r") as file:
            contents = file.read()

        contents = contents.replace(part, part + insertion)

        with open(self.path, "w", newline="\r\n") as file:
            file.write(contents)