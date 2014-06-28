#!/usr/bin/python
import requests
import re
import json
import operator
from lxml import etree
import sys
import time
import datetime

# ---------------------------------------------

online = True

if (len(sys.argv) != 3):
    print sys.argv[0] + " <keyID> <vCode>"
    sys.exit(1)

api_keyid = sys.argv[1]
api_vcode = sys.argv[2]

# ---------------------------------------------

now = int(time.time())

if (online):
	req = requests.get('https://api.eveonline.com/corp/Contracts.xml.aspx?keyID=' + api_keyid + "&vCode=" + api_vcode)
	root = etree.fromstring(req.text.encode("utf-8"))
else:
	root = etree.parse(open('Contracts.xml.aspx','r'))

pendingCount = 0
progressCount = 0
completedCount = 0
completedWindowCount = 0
completedWindowLength = 0

hLength = 29
hIssued = [0] * hLength
hCompleted = [0] * hLength

hLegend = [""] * hLength
hLegend[28] = "Now"
hLegend[21] = "7d"
hLegend[14] = "14d"
hLegend[7] = "21d"
hLegend[0] = "28d"

rows = root.xpath("/eveapi/result/rowset/row")
for row in rows:
	if (row.xpath("@type")[0] != "Courier"):
	    continue

	c_status = row.xpath("@status")[0]

	if (c_status == "Outstanding"):
	    pendingCount += 1

	if (c_status == "InProgress"):
	    progressCount += 1

	if (c_status == "Completed"):
	    completedCount += 1

	    issued_dt = datetime.datetime.strptime(row.xpath("@dateIssued")[0], "%Y-%m-%d %H:%M:%S")
	    issued_ut = int(time.mktime(issued_dt.timetuple()))
	    daysIssued =  int((now - issued_ut) / 60 / 60 / 24)

	    completed_dt = datetime.datetime.strptime(row.xpath("@dateCompleted")[0], "%Y-%m-%d %H:%M:%S")
	    completed_ut = int(time.mktime(completed_dt.timetuple()))
	    daysCompleted = int((now - completed_ut) / 60 / 60 / 24)

	    if (daysCompleted < 7):
		completedWindowCount += 1
		completedWindowLength += (completed_ut - issued_ut)

	    if (daysIssued < hLength):
		hIssued[hLength - 1 - daysIssued] = hIssued[hLength - 1 - daysIssued] + 1

	    if (daysCompleted < hLength):
		hCompleted[hLength - 1 - daysCompleted] = hCompleted[hLength - 1 - daysCompleted] + 1

def formatTime(unix):
    days = int(unix / 60 / 60 / 24)
    unix -= days * 60 * 60 * 24

    hours = int(unix / 60 / 60)
    unix -= hours * 60 * 60

    mins = int(unix / 60)
    unix -= mins * 60

    return str(days) + "d " + str(hours) + "h " + str(mins) + "m";

#--------------------------------------------------

json_stats = {
	"pendingCount": str(pendingCount),
	"progressCount": str(progressCount),
	"completedWindowAverage": formatTime(int(completedWindowLength / completedWindowCount)),
	"lastUpdated": datetime.datetime.utcnow().strftime("%H:%M:%S %d-%m-%Y")
}

f = open("../webroot/stats_current.json",'w')
json.dump(json_stats, f)
f.close()

#--------------------------------------------------

json_history = {
    "labels" : hLegend,
    "datasets" : [{
	"fillColor" : "rgba(243,210,79,0.3)",
	"strokeColor" : "rgba(243,210,79,1)",
	"pointColor" : "rgba(243,210,79,1)",
	"pointStrokeColor" : "#fff",
	"data" : hIssued
    },
    {

	"fillColor" : "rgba(145,243,79,0.3)",
	"strokeColor" : "rgba(145,243,79,1)",
	"pointColor" : "rgba(145,243,79,1)",
	"pointStrokeColor" : "#fff",
	"data" : hCompleted
    }]
}

f = open("../webroot/stats_history.json",'w')
json.dump(json_history, f)
f.close()
