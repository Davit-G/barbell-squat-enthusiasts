from __future__ import print_function

import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ['https://www.googleapis.com/auth/calendar']

def getEvent(title="",loc="",desc="",start_date="",end_date=""):
    return {
    'summary': 'Google I/O 2015', # title
    'location': '800 Howard St., San Francisco, CA 94103', 
    'description': 'A chance to hear more about Google\'s developer products.', 
    'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
    },
    'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'},
    ],
    'reminders': {
        'useDefault': False, # set to True if no reminder
        'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
        ],
    },
    }

def getEvents(maxResults=10):
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    # Call the Calendar API
    service = checkAuth()
    
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                            maxResults=maxResults, singleEvents=True,
                                            orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        print('No upcoming events found.')
        return

    # Prints the start and name of the next 10 events
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(start, event['summary'])


def checkAuth():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
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

def createEvent(eventJson):
    """Insert new google event for user.

    Args:
        eventJson (string): json string of event

    Returns:
        dictionary: dictionary for created event
    """
    service = checkAuth()
    
    event = service.events().insert(calendarId='primary', body=eventJson).execute()
    return event


def deleteEvent(eventId):
    """Delete existing event for user.

    Args:
        calendarId (string): calendar id of event
    """
    service = checkAuth()
    
    res = service.events().delete(calendarId='primary', eventId=eventId).execute()
    return res


def modifyEvent(event):
    """Delete existing event for user.

    Args:
        calendarId (string): calendar id of event
    """
    service = checkAuth()

    updated_event = service.events().update(calendarId='primary', eventId=event['id'], body=event).execute()

    # Print the updated date.
    print (updated_event['updated'])


if __name__ == '__main__':
    getEvent()
    createEvent(getEvent())