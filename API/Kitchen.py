import random

class Kitchen:
    # window
    # smoke

# Services
    def windowState(self):
        states=['closed','opened']
        self.window=random.choice(states)
        return self.window

    def Smoke(self):
        states=[True,False]
        proba=[1,9]
        self.smoke=random.choices(states,weights=proba)
        return self.smoke

# kitchen creation
    def __init__(self):
        self.window=self.windowState()
        self.smoke=False
