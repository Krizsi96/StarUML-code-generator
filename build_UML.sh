#!/bin/bash
CYAN='\033[36m'
NC='\033[m'
SOURCE_MODEL='wiki/src/system_design.mdj'

echo -e "${CYAN}generate diagrams form UML model${NC}"
staruml image ${SOURCE_MODEL} -f jpeg -o "wiki/src/diagrams/<%=filenamify(element.name)%>_diagram.jpeg"

echo ""

echo -e "${CYAN}generate header files from UML model${NC}"
staruml ejs ${SOURCE_MODEL} -t .ejs/cpp-class.ejs -s "@UMLClass" -o "Arduino_Pedalbox/src/<%=filenamify(element.name)%>.h"