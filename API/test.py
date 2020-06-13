import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("./API/db-fb-1609e-firebase-adminsdk-f948g-0bcbc6ee26.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

login=[]
psw=[]
livingroom=[]
bednum=[]
kitchen=[]
stairs=[]
garage=[]
 
docs = db.collection(u'users').where(u'propriete', u'==', u'admin').stream()
for doc in docs:
    if doc.exists:
        doc =doc.to_dict()
        login.append(doc["Login"])
        # psw.append(doc["psw"])
        # livingroom.append(doc["livingroom"])
        # bednum.append(doc["bednum"])
        # kitchen.append(doc["kitchen"])
        # stairs.append(doc["stairs"])
        # garage.append(doc["garage"])


        print(login)