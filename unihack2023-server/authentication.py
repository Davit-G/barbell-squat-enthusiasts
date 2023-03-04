import firebase_admin
from firebase_admin import auth

def getUserById(uid):
    user = auth.get_user(uid)
    print('Successfully fetched user data: {0}'.format(user.uid))

def getUserByEmail(email):
    user = auth.get_user_by_email(email)
    print('Successfully fetched user data: {0}'.format(user.uid))   
    
def createUser(email,password,name):
    user = auth.create_user(
        email=email,
        email_verified=True,
        password=password,
        display_name=name,
        disabled=False)
    print('Sucessfully created new user: {0}'.format(user.uid))
    

default_app = firebase_admin.initialize_app()