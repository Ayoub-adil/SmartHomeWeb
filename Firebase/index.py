
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./Firebase/db-fb-1609e-firebase-adminsdk-f948g-0bcbc6ee26.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


# d= {
#     u'email': u'yes',
#     u'pass': u'yes'
    
# }

# # Add a new doc in collection 'users' with ID 'admin'
# db.collection(u'users').document(u'user').set(d)
# doc_ref = db.collection(u'users').document(u'user')
# doc = doc_ref.get().to_dict()
# print(doc)