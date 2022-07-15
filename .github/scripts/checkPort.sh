if lsof -Pi :8080 -sTCP:LISTEN -t ; then
    echo "running"
else
    echo "not running"
fi