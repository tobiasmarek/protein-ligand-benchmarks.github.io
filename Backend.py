import json
from method_results import MethodAcuracy


data = MethodAcuracy.giveData()  
with open("public/data.json", "w") as f:
    json.dump(data, f) # indent for pretty-printing
    print(data)

