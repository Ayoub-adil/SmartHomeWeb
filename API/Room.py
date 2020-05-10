import random

class Room:
    # lamp
    # window
    # temperature
    # airConditioner

# Services
    def lampState(self):
        states=['on','off']
        self.lamp=random.choice(states)
        return self.lamp

    def windowState(self):
        states=['closed','opened']
        self.window=random.choice(states)
        return self.window
    def airConditionerState(self):
        states=['on','off']
        self.airConditioner=random.choice(states)
        return self.airConditioner

    def Temperature(self):
        Temperatures=range(15,51)
        self.temperature=random.choice(Temperatures)
        return self.temperature

# room creation
    def __init__(self):
        self.lamp=self.lampState()
        self.window=self.windowState()
        self.temperature=self.Temperature()
        self.airConditioner=self.airConditionerState()

