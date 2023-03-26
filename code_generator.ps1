# Create alias for staruml
Set-Alias -Name staruml -Value 'C:\Program Files\StarUML\StarUML.exe'

# Call EJS for code generation
staruml ejs models/bank.mdj -t ejs/cpp-class.ejs -s "@UMLClass" -o "out/<%=filenamify(element.name)%>.h"