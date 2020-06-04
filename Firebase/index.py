
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./Firebase/db-fb-1609e-firebase-adminsdk-f948g-0bcbc6ee26.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


data = {
    u'email': u'test@admin.test',
    u'pass': u'admin'
    
}

# Add a new doc in collection 'users' with ID 'admin'
db.collection(u'users').document(u'admin').set(data)