<h3>Geodata is an application used to visualize siesmic events.</h3>

<br>
Features:

* GeoNet & USGS data support.
* Minimal internet required.
* NGINX docker support.
* Lightweight & very fast.
* Highly secure.
* Event clustering.
* Scaleable.
* Client-side processing.

<br>
Planned:

* Statistics.
* USGS time & date.
* Map interaction features.
* Cluster colour.
* Cluster-land colour.
* Time-based colour.
* Mag-based colour.
* Swarm detection.
* Magnitude - event size.
* Offline support

<br>

<h2>Test Data</h2>

* GeoJSON format - *String values only*

<br>

<h3>Kai.json</h3>
<img src="./media/5742746E566D745A756D706162413D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/626E777173564F7734342F596B673D3D.png" alt="FeatureDisabled" width="1000px"/>

<br>

<h3>map.json</h3>
<img src="./media/74587576673135587337693643773D3D.png" alt="FeatureDisabled" width="600px"/>

<br>

<h3>USGS_1Y.json</h3>
<img src="./media/59497641597465467764595A4D773D3D.png" alt="FeatureDisabled" width="600px"/>

<br>

<h3>USGS_7+.json</h3>
<img src="./media/69535A7237616E33415376425A673D3D.png" alt="FeatureDisabled" width="600px"/>
 
 <br>

<h2>Docker</h2>

`docker pull nginx`

`docker run -it --rm -d -p 80:80 -v geodata:/usr/share/nginx/html nginx`

<img src="./media/3979453966736A667257656F36513D3D.png" alt="FeatureDisabled" width="1000px"/>
