import random

class Garage:
    # lamp
    # door
    # smoke

# Services
    def lampState(self):
        states=['on','off']
        self.lamp=random.choice(states)
        return self.lamp

    def DoorState(self):
        states=['closed','opened']
        self.door=random.choice(states)
        return self.door

    def Smoke(self):
        states=[True,False]
        proba=[1,9]
        self.smoke=random.choices(states,weights=proba)
        return self.smoke

# garage creation
    def __init__(self):
        self.lamp=self.lampState()
        self.door=self.DoorState()
        self.smoke=False
