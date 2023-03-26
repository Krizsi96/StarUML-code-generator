# Create alias for staruml
Set-Alias -Name staruml -Value 'C:\Program Files\StarUML\StarUML.exe'

# Call EJS for code generation
staruml image models/bank.mdj -f jpeg -o "out/<%=filenamify(element.name)%>_diagram.jpeg"