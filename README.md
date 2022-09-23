<h3>Geodata is an application used to visualize local and worldwide siesmic events.</h3>

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

[<h2>Data</h2>](./DATA.md)

[GeoJSON](./1W_GeoNet.json)

<img src="./media/56514C566F3034354568554269513D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/2B566F316D52476A6377325A74673D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/4457746452757A693536716C71513D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/79756A43416E77442F38626162413D3D.png" alt="FeatureDisabled" width="600px"/>

22-Sep 2022 - M5.8 South Island of New Zealand

<br>

<h3>Clustering</h3>

<img src="./media/6D4830334468344D38516C3271773D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/68554E64526C4B5565366B5356773D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/36464967744C544179436E2F31673D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/38516E2B5968712B794E5A7378513D3D.png" alt="FeatureDisabled" width="600px"/>

<br>

<h2>Docker NGINX Server</h2>
Within this directory run:

* `chmod -R ugo+rwx geodata`
* `docker pull nginx`
* `sudo docker run -it --rm -d -p 80:80 -v $(pwd)geodata:/usr/share/nginx/html nginx`

<img src="./media/3979453966736A667257656F36513D3D.png" alt="FeatureDisabled" width="1000px"/>

Read more about [securing]() Docker containers.