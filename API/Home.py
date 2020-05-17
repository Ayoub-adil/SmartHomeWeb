import Room
import Kitchen
import Stair
import Garage
import random

class Home:
    # outsideT
    # rain
    # lock

    # r   
    # type_r

    # n_livingroom
    # n_bedroom
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
    def __init__(self,n_livingroom,n_bedroom,n_kitchen,n_stairs,n_garage):
        self.r=-1
        self.type_r='outdoor'
        self.n_livingroom=n_livingroom
        self.n_bedroom=n_bedroom
        self.n_kitchen=n_kitchen
        self.n_stairs=n_stairs
        self.n_garage=n_garage
        self.simulate()
        self.setStates()

    def simulate(self):
        self.livingrooms=[]
        for i in range(self.n_livingroom):
            self.livingrooms.append(Room.Room())
        self.bedrooms=[]
        for i in range(self.n_bedroom):
            self.bedrooms.append(Room.Room())
        self.kitchens=[]
        for i in range(self.n_kitchen):
            self.kitchens.append(Kitchen.Kitchen())
        self.stairs=[]
        for i in range(self.n_stairs):
            self.stairs.append(Stair.Stair())
        self.garages=[]
        for i in range(self.n_garage):
            self.garages.append(Garage.Garage())
    
    def setRoom(self,type_r,rooom):
        self.type_r=type_r
        self.r=rooom
        return self.r


    def __str__(self):
        return 'this Home has '+str(self.n_livingroom)+' livingrooms, '+str(self.n_bedroom)+' bedrooms, '+str(self.n_kitchen)+' kitchen '+str(self.n_stairs)+' stairs or hall and '+str(self.n_garage)+' garage.'
