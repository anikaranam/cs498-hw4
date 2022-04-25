import sys
import json

from pyhive import hive
import pandas as pd
conn = hive.Connection(host="localhost", port=10000)

term = sys.argv[1]

query = "select webmap from search3 where searchterm = '" + term + "'"

df = pd.read_sql(query, conn)
m = json.loads(df.to_json(orient = 'records'))

toReturn = m[0]['webmap']
print(toReturn, flush=True)
