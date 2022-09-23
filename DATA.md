<h3>Data Tutorial</h3>

<br>
Geodata requires string values within GeoJSON, no numbers. For this reason test data is packaged with the application.

<br>

Data included with application:

* One Week [NZ](./1W_GeoNet.json) | [Worldwide](./1W_USGS.json)
* One Month [NZ](./1M_GeoNet.json) | [Worldwide](./1M_USGS.json)
* One Year [NZ](./1Y_GeoNet.json) | [Worldwide](./1Y_USGS.json)
* [kaikora.json](./kaikora.json) | [original](https://quakesearch.geonet.org.nz/geojson?bbox=163.5205,-49.1817,-176.9238,-32.2871&startdate=2016-11-7T0:00:00&enddate=2016-11-14T1:00:00)
* [swarm.json](./swarm.json)
* [USGS_7+.json](./USGS_7%2B.json)
* [USGS2000.json](./USGS2000.json)

<br>

<h3>Modify GeoJSON to support Geodata</h3>
<br>
<img src="./media/736475783154506D43425A5568773D3D.png" alt="FeatureDisabled" width="600px"/>

This earthquake data was downloaded via the GeoNet Quake Search. Although Geodata supports GeoJSON format, the application does not currently support intager and floating values - only string values.

<br>

Requiring the end user to modify the GeoJSON data, altering numbers to string within the `properties` section.

<br>

<img src="./media/634A2B4438655733473168784A673D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/754751414544746871366F7151513D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/342B4B47473743776E43325136413D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/313650537A576C6474652B6F37413D3D.png" alt="FeatureDisabled" width="600px"/>

<br>

<h2>How seismic data is visualised today</h2>
Identify areas of high siesmic activity, or anomolies through two dimentional map with limited funtionality.

There was a website named world-earthqukes.com that presented earthquake statistics, assisting with the forcast of siesmic activity over a period of time ranging from hours, weeks or months.


<br>

[<h3>SWARM</h3>](https://www.usgs.gov/software/swarm)
<img src="./media/79756A43416E77442F38626162413D3D.png" alt="FeatureDisabled" width="600px"/>

[<h3>GeoNet</h3>](https://geonet.org.nz)
<img src="./media/574A346C51384C66366659634B513D3D.png" alt="FeatureDisabled" width="600px"/>

[<h3>EMSC</h3>](https://emsc-csem.org)
<img src="./media/614864785A344D6C4C6B76544A413D3D.png" alt="FeatureDisabled" width="600px"/>
<img src="./media/624A71454E6453794465553545773D3D.png" alt="FeatureDisabled" width="600px"/>

[<h3>USGS</h3>](https://earthquake.usgs.gov/earthquakes/map)
<img src="./media/5A4355696F702F364855595674773D3D.png" alt="FeatureDisabled" width="600px"/>