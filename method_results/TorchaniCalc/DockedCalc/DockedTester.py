import torch
import torchani 
import ase
from ase.build import molecule
from ase import Atoms
from ase.io import read
from ase import atoms
from torchani.units import ev2kcalmol




#specifies the devide torchani should run off of
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')   


#creates the model used, specifyign periodic table indecies
model = torchani.models.ANI2x(periodic_table_index=True).to(device)

calculator = torchani.models.ANI2x().ase()
Atoms.set_calculator(calculator)



def runCalc(web, charge):

    data = read(web)

    data.charge = charge #sets the charge

    data.calc = calculator #applys the calculator 


    en = data.get_potential_energy()  # This call will start the calculation
    #print('Potential energy: {:.2f} eV'.format(en))

    en2 = ev2kcalmol(en)
    #print("Energy in kcal/mol ", en2)

    return en2

