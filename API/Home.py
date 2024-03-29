import Room
import Kitchen
import Stair
import Garage
import random

class Home:
    # outsideT
    # rain
    # lock
    # alert
    # watering
    # hallLight

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
    def __init__(self):
        self.msg = 'pas de message'
        self.msgMobile = 'pas de message'
        self.msgSuper = 'pas de message'
        self.msgMember = 'pas de message'
        self.msgMemberMob = 'pas de message'
        self.DelMember = 'pas de message'
        self.login = "login"
        self.psw = "psw"
        self.islogged =False
        self.SAsession =False

        self.r=-1
        self.type_r='outdoor'
        self.alert='on'
        self.watering='on'
        self.hallLight=True
        
        self.user='User'
        self.userType='none'
        self.usermob = 'User'
        self.simulate(0,0,0,0,0)
        self.setStates()

    def simulate(self,nl,nb,nk,ns,ng):
        self.livingrooms=[]
        for i in range(nl):
            self.livingrooms.append(Room.Room())
        self.bedrooms=[]
        for i in range(nb):
            self.bedrooms.append(Room.Room())
        self.kitchens=[]
        for i in range(nk):
            self.kitchens.append(Kitchen.Kitchen())
        self.stairs=[]
        for i in range(ns):
            self.stairs.append(Stair.Stair())
        self.garages=[]
        for i in range(ng):
            self.garages.append(Garage.Garage())
        self.nl=nl
        self.nb=nb
        self.nk=nk
        self.ns=ns
        self.ng=ng
    
    def setRoom(self,type_r,rooom):
        self.type_r=type_r
        self.r=rooom
        return self.r


    def __str__(self):
        return 'this Home has '+str(self.n_livingroom)+' livingrooms, '+str(self.n_bedroom)+' bedrooms, '+str(self.n_kitchen)+' kitchen '+str(self.n_stairs)+' stairs or hall and '+str(self.n_garage)+' garage.'
