Set-Alias -Name staruml -Value 'C:\Program Files\StarUML\StarUML.exe'

# Call EJS for code generation
staruml ejs models/system_design.mdj -t .ejs/cpp-class.ejs -s "@UMLClass" -o "out/<%=filenamify(element.name)%>.hpp"
staruml ejs models/system_design.mdj -t .ejs/cpp-class.ejs -s "@UMLInterface" -o "out/<%=filenamify(element.name)%>.hpp"