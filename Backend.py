import json
import pandas as pd
from method_results import MethodAcuracy
import os


data = MethodAcuracy.giveData()  
with open("public/data.json", "w") as f:
    json.dump(data, f) # indent for pretty-printing
    print(f)


