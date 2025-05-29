import os, shutil

current_dir = os.getcwd()
for i in os.listdir(current_dir):
    path = current_dir + '/' + i
    if(os.path.isdir(path)): shutil.rmtree(path)
    if(os.path.basename(path)[-4:]=="json" or os.path.basename(path)[-4:]=="rcom"): os.remove(path)