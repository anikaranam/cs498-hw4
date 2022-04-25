import sys
import json
from pyhive import hive
import pandas as pd
conn = hive.Connection(host="localhost", port=10000)

term = sys.argv[1]

query = "select sum(clicks) as sumClicks from search lateral view explode(webmap) clickstable as website, clicks where searchterm = '" + term + "'"
df = pd.read_sql(query, conn)

m = json.loads(df.to_json(orient = 'records'))

toReturn = m[0]['sumclicks']

print(toReturn, flush=True)
