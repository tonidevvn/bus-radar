import pickle

# Load the saved model
with open("./sur_model.pkl", "rb") as model_file:
    loaded_sur_model = pickle.load(model_file)

print(loaded_sur_model.printSummary())
