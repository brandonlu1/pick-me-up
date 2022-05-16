from mailbox import linesep
import praw
from praw.models import MoreComments
import pandas as pd
import secret
from pymongo import MongoClient

#Handles scraping Reddit
def scrape_reddit():
    map = make_hashMap()
    client = MongoClient(secret.MONGODB_URI)
    db = client.pickMeUp
    database = db["pickMeUp"]
    collection = database["pickupLines"]


    app_secret = secret.SECRET
    app_client_id = secret.CLIENT_ID

    reddit_read_only = praw.Reddit(client_id=app_client_id,
                                client_secret=app_secret,
                                user_agent="Pick-up line generator. https://github.com/brandonlu1/pick-me-up")
    subreddit = reddit_read_only.subreddit("pickuplines")

    print("Scraping r/", subreddit.display_name)

    for post in subreddit.search("pickup lines for"):
        title = post.title
        # print(split)
        for word in title.split():
            if word.lower() in map:
                for comment in post.comments:
                    if isinstance(comment, MoreComments):
                        continue
                    if (word.lower() in comment.body.lower()):
                        collection.insert_one({"rating":1, "line": comment.body, "name": word})
    print("Finished")

def make_hashMap():
    map = {}
    with open('scraper/boys.txt') as file:
        lines = file.readlines()
        for line in lines:
            if line.strip() not in map:
                map[line.strip().lower()] = line.strip().lower()
    file.close()

    with open('scraper/girls.txt') as file:
        lines = file.readlines()
        for line in lines:
            if line.strip() not in map:
                map[line.strip().lower()] = line.strip().lower()
    file.close()
    return map

def main():
    scrape_reddit()

if __name__ == "__main__":
    main()