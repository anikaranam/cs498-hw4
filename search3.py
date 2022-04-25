import sys
import json
from pyhive import hive
import pandas as pd
conn = hive.Connection(host="localhost", port=10000)

website = sys.argv[1]

query = 'select c1.searchterm as searchterm from (select searchterm, sum(webmap["' + website + '"]) as sumClicks from search3 group by searchterm having sumClicks IS NOT NULL) c1 join (select searchterm, 0.05 * sum(clicks) as percentage from search3 lateral view explode(webmap) clickstable as website, clicks group by searchterm) c2 on (c1.searchterm = c2.searchterm and c1.sumClicks > c2.percentage)';
df = pd.read_sql(query, conn)

vals = df.to_dict()

# print(m)
new_vals = list(vals['searchterm'].values())
arr = []

#for i in new_vals:
#    print(i, flush = True)


#toReturn = m[0]['sumclicks']
print(new_vals,flush=True)
