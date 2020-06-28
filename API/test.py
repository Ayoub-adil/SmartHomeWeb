import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("./API/db-fb-1609e-firebase-adminsdk-f948g-0bcbc6ee26.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


# docs = db.collection(u'users').document(u'hey').delete()

