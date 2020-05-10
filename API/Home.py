import Room
import Kitchen
import Stair
import Garage
import random

class Home:
    # outsideT
    # rain
    # lock

    # n_room
    # n_kitchen
    # n_stairs
    # n_garage

# Global services
    def outsideTemperature(self):
        Temperatures=range(15,51)
        self.outsideT=random.choice(Temperatures)
        return self.outsideT

    def isRain(self):
        states=[True,False]
        proba=[1,7]
        self.rain=random.choices(states,weights=proba)
        return self.rain
        
    def doorLocked(self):
        states=[True,False]
        self.lock=random.choice(states)
        return self.lock
    
    def setStates(self):
        self.outsideT=self.outsideTemperature()
        self.rain=self.isRain()
        self.lock=self.doorLocked()
        
# Home Plan
    def __init__(self,n_room,n_kitchen,n_stairs,n_garage):
        self.n_room=n_room
        self.n_kitchen=n_kitchen
        self.n_stairs=n_stairs
        self.n_garage=n_garage
        self.simulate()
        self.setStates()

    def simulate(self):
        # self.rooms=[Room.Room()]*self.n_room
        self.rooms=[]
        for i in range(self.n_room):
            self.rooms.append(Room.Room())
        self.kitchens=[Kitchen.Kitchen()]*self.n_kitchen
        self.stairs=[Stair.Stair()]*self.n_stairs
        self.garages=[Garage.Garage()]*self.n_garage
    
    def __str__(self):
        return 'this Home has '+str(self.n_room)+' rooms, '+str(self.n_kitchen)+' kitchen '+str(self.n_stairs)+' stairs or hall and '+str(self.n_garage)+' garage.'
