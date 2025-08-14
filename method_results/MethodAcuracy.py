import numpy as np
import pandas as pd
import os
import json
from method_results import EnergyCalc

def giveData():

    
    aniCalc = EnergyCalc.giveEnergy()

    #This dataframe contians the confirmed interaction energies for complexes
    #This is used to calculate the error in the calculators
    df2 = pd.DataFrame({"IntE": [-242.583, -247.699, -88.726, -199.162, -157.143, -238.717, -94.099, -178.476, -92.145, 
                                -231.047, -66.594, -77.382, -244.475, -127.532, -190.367  
    ]})

    Errors = []
    PercentErrors  = []
    wholeData = []
    

    #This Python Script uses os to iterate through all of the files in methods_with_description
    # in order to calculate the percentage accuracy and the amount the calculators were incorrect
    #in Kcal/Mol

    counter =0
    directory = "method_results/methods_with_description"
    for folder in os.listdir(directory):
        fullfolder = os.path.join(directory, folder)
        label = os.fsdecode(fullfolder)
        if((label.find(".DS_Store") != -1) or (label.find("_cuby_to_table") != -1)):
            continue
        json_path = os.path.join(fullfolder, "method.json") 
        currName = None
        with open(json_path, 'r') as J:
            obj = json.load(J)
            currName = obj.get("name")
        for file in os.scandir(fullfolder):
            filename = os.fsdecode(file)
            if filename.endswith(".txt"):                     
                name = os.path.join(directory, file)
                    
                df = pd.read_csv(filename, sep='\s+', header=None, index_col=[0], engine="python", skiprows=1)
                #from IPython import embed; embed()
                df.columns=['Calculations']
                print(f"table:\n{str(df)}")
                
                avg_error= 0
                for i in range(0,15): #calculates error in Kcal/Mol
                    avg_error += np.abs(df["Calculations"].iloc[i] - df2["IntE"].iloc[i])
                avg_error = avg_error/15
                temptup = (currName, avg_error)
                Errors.append(temptup)
                
                avg_InteractionE =0 
                for i in range(0,15): #calculates error in percent
                    avg_InteractionE += np.abs(df2["IntE"].iloc[i])
                avg_InteractionE /= 15
                avg_ErrorPer = (avg_InteractionE-avg_error)/avg_InteractionE
                temp = (currName, avg_ErrorPer*100)
                PercentErrors.append(temp) #For the future when making the accuracy the amoung its incorrect do 100-temp
                

            elif filename.endswith(".json"):
                with open(filename, 'r') as j:
                    obj = json.load(j)
                    dict ={}
                    for key, value in obj.items():
                        print(f"key: {key}, value: {value}")
                        
                        if key == "name":
                            mName = value
                        dict[key]= value
                    for T in PercentErrors:
                        if (T[0] == mName): #looks through the tuples in percent errors to find the matching name of the method and add that to accuracy for that model
                            dict["accuracy"]= T[1]
                            print("Accuracy: " + str(T[1]))
                    for T in Errors:
                        if (T[0] == mName):
                            dict["rawError"] = T[1]
                            print("Raw Error: " + str(T[1]))
                    wholeData.append(dict)
                    
    

    #Adding the TorchAni calculator:
    avg_InteractionE1 = 0
    avg_error1 = 0
    for value in aniCalc:
        avg_InteractionE1 += np.abs(df2["IntE"].iloc[i])
        avg_error1 += np.abs(aniCalc[i] - df2["IntE"].iloc[i])
    avg_InteractionE1 /= 15
    avg_Eunits = avg_error1/15
    avg_Epercent = ((avg_InteractionE1-avg_Eunits)/avg_InteractionE1)*100
    
    newdict = {"name": "ANI2x", "category":"SQM", "description":"Under progress", "references":"", "code":""}
    newdict["accuracy"] = avg_Epercent
    newdict["rawError"] = avg_Eunits


    wholeData.append(newdict)
    return(wholeData)

