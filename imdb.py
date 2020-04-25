import multiprocessing
import re
import requests
import proxyscrape
from bs4 import BeautifulSoup
import sqlite3


base_imdb_url = "http://www.imdb.com"
url = base_imdb_url + "/user/ur26735780/ratings"

#proxy stuff
collector = proxyscrape.create_collector('default', 'http')  # Create a collector for http resources
proxies = collector.get_proxies({'country': 'united states'})  # Retrieve a united states proxy

proxies_dict = dict()
proxies_dict[proxy.type] = f"{proxy.type}://{proxy.host}:{proxy.port}"

#get imdb movie id from parsed html
def get_imdb_id(content_array):
    if len(content_array) > 0:
        for item in content_array:
            if hasattr(item, 'attrs'):
                if 'href' in item.attrs :
                    imdb_link = item.attrs['href']
                    if(imdb_link != None):
                        if(len(imdb_link) > 0):
                            imdb_id = re.search("tt.*/",imdb_link).group(0)
                            if imdb_id != None:
                                return imdb_id[0:len(imdb_id)-2]
                                
#process url, add movie id and my user rating to db. rest of the info will be updated on node js side.
def process_page(url):
    source_code = requests.get(url)
    plain_text = source_code.text
    soup = BeautifulSoup(plain_text, 'html.parser')

    for r in soup.findAll('div', {'class': 'lister-item-content'}):
        for rating in r.findAll('div', {'class': 'ipl-rating-star ipl-rating-star--other-user small'}):
            rating = str(rating.text)
            if rating == '':
                rating = 'NaN'

        for title in r.findAll('h3', {'class': 'lister-item-header'}):
            movie_id = get_imdb_id(title.contents)
            
        if movie_id != '':
            # TODO : Add to sqlite db
            # mydict[movie_id] = rating.replace('\n', '')
        #update db safely

while(url != ''):
    pages += 1
    source_code = requests.get(url, proxies=proxies_dict)
    plain_text = source_code.text
    soup = BeautifulSoup(plain_text, 'html.parser')
    for r in soup.findAll('a', {'class': 'flat-button lister-page-next next-page'}, href=True):
        if(r.text):
            process_page(url)
            print("Processed URL\n")
            url = base_imdb_url + r['href'] 
            print("new url - {url}\n")
        else:
            url = ''
