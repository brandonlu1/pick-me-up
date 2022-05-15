import praw
from praw.models import MoreComments
import pandas as pd
import secret
from pymongo import MongoClient

#Handles scraping Reddit
def scrape_reddit():
    app_secret = secret.SECRET
    app_client_id = secret.CLIENT_ID

    reddit_read_only = praw.Reddit(client_id=app_client_id,
                                client_secret=app_secret,
                                user_agent="Pick-up line generator. https://github.com/brandonlu1/pick-me-up")
    subreddit = reddit_read_only.subreddit("Tinder")

    print("Display Name:", subreddit.display_name)
    print("Title:", subreddit.title)

    for post in subreddit.new(limit=1):
        for comment in post.comments:
            if isinstance(comment, MoreComments):
                continue
            print(comment.body)

#Connects to MongoDB
def get_database():
    try:
        client = MongoClient(secret.MONGODB_URI)
        db = client.test
        print("Connected successfully!")
    except:  
        print("Could not connect to MongoDB")


def main():
    #get_database()
    scrape_reddit()

if __name__ == "__main__":
    main()