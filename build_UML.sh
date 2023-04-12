#!/bin/bash
CYAN='\033[36m'
NC='\033[m'
echo -e "${CYAN}generate diagrams form UML model${NC}"
staruml image models/bank.mdj -f jpeg -o "out/<%=filenamify(element.name)%>_diagram.jpeg"