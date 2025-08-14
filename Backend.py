import json
from method_results import MethodAcuracy

try: 
    data = MethodAcuracy.giveData()  
    with open("public/data.json", "w") as f:
        json.dump(data, f) # indent for pretty-printing
        print(data)
except Exception as e:
    import traceback
    traceback.print_exc()
    exit(1)

