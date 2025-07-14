import method_results.TorchaniCalc.DockedCalc.DockedTester as Docked
import numpy
import os
import pandas as pd
import json


def shorten(x):
    return x[45:-4]

def difShorten(x):
    return x[46:-4]


def getEnergy(directed):
    directory = directed
    

    counter2 =-1
    df = pd.DataFrame({'FileNames': [], 'EnergyCalculated':[]})

    for file in os.scandir(directory):
        filename = os.fsdecode(file)
        counter2+=1
        if filename.endswith(".xyz"): 
            #print(os.path.join(directory, file))

            #This goes through the file and takes out the charge number
            h = open(filename)
            # Reading from the file
            content = h.readlines(150)
            # Variable for storing the count to pass in as parameter
            charge = 0
            counter = 0
            # Iterating through the content of the file
            for line in content: 
                counter+=1
                if counter == 2: charge = line[7:]

            E = Docked.runCalc(filename, charge)
            df2 = pd.DataFrame({'FileNames': [filename], 'EnergyCalculated':[E]})
            df = df._append(df2, ignore_index=True)
            #print(E)
            
        else:
            continue
    

    #print(df)
    return(df)


def sortIt(df):
    LabelColumn = df["FileNames"]
    if (len(df["FileNames"].iloc[0]) == 53):NewColumn = LabelColumn.apply(shorten)
    else:NewColumn = LabelColumn.apply(difShorten)
    df["FileNames"] = NewColumn
    #print(df)
    sorter = ["10GS", "2CET", "2FVD", "2OBF", "2P4Y", "2VOT", "2VW5", "2XB8", "2YKI", "2ZX6", "3G0W", "3GNW", "3NOX", "3PE2", "4GID"]
    df.sort_values(by="FileNames", key=lambda x: x.map(sorter.index), inplace=True)
    return df

PLE = sortIt(getEnergy('method_results/TorchaniCalc/datasets/PLA15/PL'))
LE = sortIt(getEnergy('method_results/TorchaniCalc/datasets/PLA15/L'))
PE = sortIt(getEnergy('method_results/TorchaniCalc/datasets/PLA15/P'))

#print(PLE)


EnergyList = []
for i in range (0,15): EnergyList.append(PLE['EnergyCalculated'].iloc[i]-LE['EnergyCalculated'].iloc[i]-PE['EnergyCalculated'].iloc[i])

def giveEnergy():
    return (EnergyList)




    



