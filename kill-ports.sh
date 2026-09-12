#!/bin/bash

# --- COLOR PROFILES ---
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}          VEKAI PORT MAINTENANCE MANAGEMENT     ${NC}"
echo -e "${BLUE}===============================================${NC}\n"

TARGET_PORTS=(3000 3001)

for PORT in "${TARGET_PORTS[@]}"; do
    echo -e "${YELLOW}Inspecting network channels for Port: ${PORT}...${NC}"
    
    # Locate process IDs (PIDs) running on the specific port hook
    PIDS=$(lsof -t -i:${PORT} 2>/dev/null)
    
    if [ -z "$PIDS" ]; then
        echo -e "${GREEN}✔ CLEAN: Port ${PORT} is open and clear of zombie tasks.${NC}\n"
    else
        echo -e "${RED}⚠ ALERT: Discovered zombie processes occupying Port ${PORT}! (PIDs: ${PIDS//\n/, })${NC}"
        echo -e "${BLUE}Executing hard termination signal (kill -9)...${NC}"
        
        # Enforce administrative clearance to drop the background threads
        kill -9 $PIDS 2>/dev/null
        
        # Verify if the channel cleared successfully
        RECHECK=$(lsof -t -i:${PORT} 2>/dev/null)
        if [ -z "$RECHECK" ]; then
            echo -e "${GREEN}✔ SUCCESS: Port ${PORT} has been forcefully cleared and reset.${NC}\n"
        else
            echo -e "${RED}✘ ERROR: Failed to release Port ${PORT}. System permission override required.${NC}\n"
        fi
    fi
done

echo -e "${BLUE}===============================================${NC}"
echo -e "${GREEN}🏁 ALL DEPLOYMENT PORTS PROOFED FOR LAUNCH PIPELINES${NC}"
echo -e "${BLUE}===============================================${NC}"
