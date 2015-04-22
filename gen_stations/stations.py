#!/usr/bin/python
import MySQLdb
import requests
import re
import json
import operator
from lxml import etree
import sys
import urllib2

# ---------------------------------------------

online = True

db = MySQLdb.connect(host="localhost", user="freighthandle", passwd="freighthandle", db="evedump")
cur = db.cursor()

# ---------------------------------------------

filter = []
filter.append({'rid':'10000014', 'inc_high':'0', 'inc_low':'0', 'inc_null_npc':'0', 'inc_null_hero':'1', 'inc_null_other':'0'})

add_station = []
add_station.append('60006511') # Mendori IX - Moon 9 - Imperial Armaments Factory
add_station.append('60008074') # Rahadalon VIII - Moon 2 - Ministry of Assessment Bureau Offices
add_station.append('60012301') # Sendaya V - CONCORD Bureau

add_station.append('60003478') # Zinkon VII - Moon 1 - Caldari Business Tribunal Accounting
add_station.append('60001135') # Defsunun IX - Moon 18 - Kaalakiota Corporation Factory

add_station.append('60012394') # Avada V - CONCORD Assembly Plant
add_station.append('60012913') # YZ-LQL VII - Moon 1 - Guardian Angels Assembly Plant

#add_station.append('60007252') # Leva IX - Moon 5 - Joint Harvesting Plantation
#add_station.append('60013159') # Sakht VI - Moon 7 - Genolution Biotech Production
#add_station.append('60013831') # Nahrneder VI - Moon 15 - Khanid Transport Storage FAKE STATION REQUIRED FOR CALC

remove_station = []
remove_station.append('61000682'); # EX6-AO VII - The Neocortex
remove_station.append('61000744'); # 4-07MU V - The Thalamus
#remove_station.append('61000193'); # RNF-YH XI

hero_aid = []
hero_aid.append('99003214') 	# Brave Collective
hero_aid.append('99000739') 	# Of Sound Mind
hero_aid.append('99003393') 	# Bloodline.
hero_aid.append('99003541')		# Nerfed Alliance Go Away

# ---------------------------------------------

result = [] 				# sname, rname, aname, sectype, x, y, z
all_stations = [] 	# sid, sname, ssid, rid, rname, aid, aname, secstatus, x, y, z

# ---------------------------------------------

regionlookup = []
cur.execute("SELECT regionID, regionName FROM mapRegions;")
for row in cur.fetchall() :
	regionlookup.append({'rid':str(row[0]), 'rname':str(row[1])})

def findRegion(rid):
	for r in regionlookup:
		if (r['rid'] == rid):
			return r
	return False

# ---------------------------------------------

alliancelookup = []
alliancelookup.append({'aid':'0', 'aname':'NPC'})
if (online):
	req = requests.get('https://api.eveonline.com/eve/AllianceList.xml.aspx')
	root = etree.fromstring(req.text.encode("utf-8"))
else:
	root = etree.parse(open('AllianceList.xml.aspx','r'))

rows = root.xpath("/eveapi/result/rowset/row")
for row in rows:
	aid = row.xpath("@allianceID")[0]
	aname = row.xpath("@shortName")[0]
	alliancelookup.append({'aid':aid, 'aname':aname})

def findAlliance(aid):
	for s in alliancelookup:
		if (s['aid'] == aid):
			return s
	return False

# ---------------------------------------------

sovlookup = []
if (online):
	req = requests.get('https://api.eveonline.com/map/Sovereignty.xml.aspx')
	root = etree.fromstring(req.text.encode("utf-8"))
else:
	root = etree.parse(open('Sovereignty.xml.aspx','r'))

rows = root.xpath("/eveapi/result/rowset/row")
for row in rows:
	ssid = row.xpath("@solarSystemID")[0]
	aid = row.xpath("@allianceID")[0]
	sovlookup.append({'ssid':ssid, 'aid':aid})

def findSov(ssid):
	for s in sovlookup:
		if (s['ssid'] == ssid):
			return s
	return False

# ---------------------------------------------

def shortenStationName(sname, null):
	parts = re.split(' - ', sname);
	l = len(parts)
	if (l == 1 or null == 1) :
		return parts[0]

	if (l == 2) :
		stna = parts[0]
		stnc = re.sub('[^A-Z]', '', parts[1])
		stnc = re.sub('ONCORD', '', stnc)
		return stna + " " + stnc

	if (l == 3) :
		stna = parts[0]
		stnb = re.sub('[^0-9]', '', parts[1])
		stnc = re.sub('[^A-Z]', '', parts[2])
		stnc = re.sub('ONCORD', '', stnc)
		return stna + "-" + stnb + " " + stnc

	return sname

# ---------------------------------------------

if (online):
	req = requests.get('https://api.eveonline.com/eve/ConquerableStationList.xml.aspx')
	root = etree.fromstring(req.text.encode("utf-8"))
else:
	root = etree.parse(open('ConquerableStationList.xml.aspx','r'))

rows = root.xpath("/eveapi/result/rowset/row")
for row in rows:
	sid = row.xpath("@stationID")[0]
	ssid = row.xpath("@solarSystemID")[0]
	sname = row.xpath("@stationName")[0]

	ssdict = findSov(ssid)

	aid = ssdict['aid'] if ssdict != False else ''
	adict = findAlliance(aid)
	aname = adict['aname'] if adict != False else ''

	sectype = 'unknown'
	if (aid == '0'):
		sectype = 'null_npc'
	if aid in hero_aid:
		sectype ='null_hero'
	else:
		sectype = 'null_other'

	cur.execute("SELECT regionID, x, y, z FROM mapSolarSystems WHERE solarSystemID = '" + ssid + "'")
	res = cur.fetchone()
	rid = str(res[0])
	cx = str(res[1])
	cy = str(res[2])
	cz = str(res[3])

	rname = findRegion(rid)['rname']
	sname_short = shortenStationName(sname, 1)

	all_stations.append({'sid':sid, 'sname':sname, 'snameshort':sname_short, 'ssid':ssid, 'rid':rid, 'rname':rname, 'aid':aid, 'aname':aname, 'sectype':sectype,'x':cx, 'y':cy, 'z':cz })

# ---------------------------------------------

cur.execute("SELECT stationID, stationName, staStations.solarSystemID, staStations.regionID, mapSolarSystems.security, mapSolarSystems.x + staStations.x, mapSolarSystems.y + staStations.y,  mapSolarSystems.z + staStations.z FROM staStations INNER JOIN mapSolarSystems ON staStations.solarSystemID=mapSolarSystems.solarSystemID order by stationName")

for res in cur.fetchall() :
	sid = str(res[0])
	sname = str(res[1])
	ssid = str(res[2])
	rid = str(res[3])
	security = res[4]
	cx = str(res[5])
	cy = str(res[6])
	cz = str(res[7])

	sectype = 'unknown'
	aid = ''
	aname = ''
	if (security >= 0.5):
		sectype = 'high'
	if (security > 0 and security < 0.5):
		sectype = 'low'
	if (security <= 0):
		sectype = 'null_npc'
		aid = '0'
		aname = findAlliance(aid)['aname']

	rname = findRegion(rid)['rname']
	sname_short = shortenStationName(sname, 0)

	all_stations.append({'sid':sid, 'sname':sname, 'snameshort':sname_short, 'ssid':ssid, 'rid':rid, 'rname':rname, 'aid':aid, 'aname':aname, 'sectype':sectype, 'x':cx, 'y':cy, 'z':cz })

# ---------------------------------------------

incursion_constellations = []

if (online):
	inc = urllib2.urlopen('https://public-crest.eveonline.com/incursions/')
else:
	inc = file(r'incursions.json', 'r')

jinc = json.load(inc)

for j in jinc['items']:
    incursion_constellations.append(str(j['constellation']['id_str']))


for s in all_stations:
    cur.execute("SELECT constellationID FROM mapSolarSystems WHERE solarSystemID = " + str(s['ssid']))
    res = cur.fetchone()
    cid = str(res[0])
    s['incursion'] = cid in incursion_constellations

# ---------------------------------------------

all_stations.sort(key=operator.itemgetter('snameshort'))

# ---------------------------------------------

def add(row):
	result.append({ 'sname':row['snameshort'], 'rname':row['rname'], 'aname':row['aname'], 'sectype':row['sectype'], 'x':row['x'], 'y':row['y'], 'z':row['z'], 'incursion':row['incursion']})

for s in all_stations:
	if s['sid'] in remove_station:
		continue

	if s['sid'] in add_station:
		add(s)
		continue

	for f in filter:
		if (f['rid'] != s['rid']):
			continue

		if (f['inc_high'] == '1' and s['sectype'] == 'high'):
			add(s)
			break
		if (f['inc_low'] == '1' and s['sectype'] == 'low'):
			add(s)
			break
		if (f['inc_null_npc'] == '1' and s['sectype'] == 'null_npc'):
			add(s)
			break
		if (f['inc_null_hero'] == '1' and s['sectype'] == 'null_hero'):
			add(s)
			break
		if (f['inc_null_other'] == '1' and s['sectype'] == 'null_other'):
			add(s)
			break

# ---------------------------------------------

f = open("../webroot/stations.json",'w')
json.dump(result, f)
f.close()
