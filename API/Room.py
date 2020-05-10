import random

class Room:
    # lamp
    # window
    # temperature

# Services
    def lampState(self):
        states=['on','off']
        self.lamp=random.choice(states)
        return self.lamp

    def windowState(self):
        states=['closed','opened']
        self.window=random.choice(states)
        return self.window

    def Temperature(self):
        Temperatures=range(15,51)
        self.temperature=random.choice(Temperatures)
        return self.temperature

# room creation
    def __init__(self):
        self.lamp=self.lampState()
        self.window=self.windowState()
        self.temperature=self.Temperature()

