from __future__ import print_function
import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from schemas.task import Task

SCOPES = ['https://www.googleapis.com/auth/calendar']

def createCalendar(token):
    service = checkAuth(token)
    
    calendar = {
        'summary': 'flextask'
    }

    created_calendar = service.calendars().insert(body=calendar).execute()
    return created_calendar['id']
    

def getEvent(title="",desc="",start_date="",end_date="",timeZone="Australia/Melbourne"):
    return {
    'summary': title, # title
    'summary': title, # title
    'location': loc, 
        'summary': title, # title
    'location': loc, 
        'description': desc, 
        'start': {
            'date': start_date,
        },
        'end': {
            'date': end_date,
        }
    }

def getEvents(token,calID="primary",maxResults=10, date=datetime.datetime.utcnow().isoformat() + 'Z'):
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    # Call the Calendar API
    service = checkAuth(token)
    
    print('Getting the upcoming {maxResults} events')
    events_result = service.events().list(calendarId=calID, timeMin=date,
                                            maxResults=maxResults, singleEvents=True,
                                            orderBy='startTime').execute()
    print(events_result)
    events = events_result.get('items', [])

    if not events:
        print('No upcoming events found.')
        return

    # Prints the start and name of the next 10 events
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(start, event['summary'])


def checkAuth(token):    
    creds = Credentials(token=token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    try:
        service = build('calendar', 'v3', credentials=creds)
        return service
    
    except HttpError as error:
        print('An error occurred: %s' % error)

def createEvent(token,task:Task, calId):
    service = checkAuth(token)
    eventJson = getEvent(title=task.title,desc=task.description,start_date=task.start_date,end_date=task.end_date,timeZone="Australia/Melbourne")
    event = service.events().insert(calendarId=calId, body=eventJson).execute()
    return event


def deleteEvent(token,eventId):
    """Delete existing event for user.

    Args:
        calendarId (string): calendar id of event
    """
    service = checkAuth(token)
    
    res = service.events().delete(calendarId='primary', eventId=eventId).execute()
    return res


def modifyEvent(token,event):
    """Delete existing event for user.

    Args:
        calendarId (string): calendar id of event
    """
    service = checkAuth(token)

    updated_event = service.events().update(calendarId='primary', eventId=event['id'], body=event).execute()

    # Print the updated date.
    print (updated_event['updated'])
    
    
getEvents(token="ya29.a0AVvZVsqt1RnGvmtKAwbZ5dYAtbuoHaOgx-kmxM0ap_Q4brBOj1X8jYJOD4YPAEwJ0TLnd-hWdMtXBrKo-Tf-g653uMub-QtWYN48qcAUPo-rz0BUX-6Pqg8TA-Ajim1tdP-nm4eBJRseG4VmGs-ARs6eWIcQaCgYKATYSARMSFQGbdwaI4ZS043XA_NlMLimhmLwo3A0163",maxResults=10, date=datetime.datetime.utcnow().isoformat() + 'Z')