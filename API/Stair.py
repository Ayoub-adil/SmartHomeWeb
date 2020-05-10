import random

class Stair:
    # mvt
    # smoke

# Services
    def isMvt(self):
        states=[True,False]
        proba=[3,7]
        self.mvt=random.choices(states,weights=proba)
        return self.mvt

    def Smoke(self):
        states=[True,False]
        proba=[1,9]
        self.smoke=random.choices(states,weights=proba)
        return self.smoke

# creation
    def __init__(self):
        self.mvt=self.isMvt()
        self.smoke=False