# Urban-Computing
1. Collects data from Open data sources, however needs to register to the website to get access.
2. Returns an APPID, which needs to 10-15 mins to activate.
3. For security reasons its preferred to keep the APPID in a separate file:
	For e.g. In a file "APPID_FILE":
	{
       "APPID": "app id as received",
       "City": "Dublin"
	}

4. To update the tables in dynamoDB, in this case Table: "Open-Data", was manually created earlier.
5. This function is trigerred manually in AWS Lambda.

