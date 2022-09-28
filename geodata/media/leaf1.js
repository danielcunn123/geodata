var map;

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function sanitizeHtml(text) {
    text = text
        .replace(/<div[^>]*>/g, '')
        .replace(/<\/div>|<br\/>/g, '\n')
        .replace(/&#39;/g, "'");
    return escapeHtml(text).replace(/\n/g, '<br>');
}

var RangeControl = L.Control.extend({
    options: {
        // @option label: String = 'Speed:'
        // The HTML text to be displayed next to the slider.
        label: '',
        title: '',

        min: 0,
        max: 100,
        value: 0,

        // @option onChange: Function = *
        // A `Function` that is called on slider value changes.
        // Called with two arguments, the new and previous range value.
    },
    onAdd: function(map) {
        var className = 'range-control';
        var container = L.DomUtil.create('div', className + ' leaflet-bar');
        L.DomEvent.disableClickPropagation(container);
        var label = L.DomUtil.create('label', className + '-label', container);
        var labelText = L.DomUtil.create('span', className + '-label', label);
        labelText.title = this.options.title;
        labelText.innerHTML = this.options.label;
        var input = L.DomUtil.create('input', className + '-input', label);
        this._input = input;
        input.type = 'range';
        input.min = this.options.min;
        input.max = this.options.max;
        this._lastValue = input.valueAsNumber = this.options.value;
        L.DomEvent.on(input, 'change', this._onInputChange, this);
        return container;
    },
    _onInputChange: function(ev) {
        var value = this._input.valueAsNumber;
        if (value !== this._lastValue) {
            if (this.options.onChange) {
                this.options.onChange(value, this._lastValue);
            }
            this._lastValue = value;
        }
    }
});

var rangeControl = function(options) {
    return new RangeControl(options);
};

function loadGeoJSON(obj) {
    'use strict';
    if (map) map.remove();
    map = L.map('map');
    var tileServer = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    L.tileLayer(tileServer, {
        minZoom: 2,
        maxZoom: 16,
        subdomains: 'abcd',
        attribution: ''
    }).addTo(map);
    L.control.scale().addTo(map);

    // Measurement tool, useful for investigating accuracy-related issues.
    if (L.control.measure) {
        L.control.measure({
            primaryLengthUnit: 'kilometers',
            secondaryLengthUnit: 'miles'
        }).addTo(map);
    }

    var geoJson = L.geoJSON(obj, {
        pointToLayer: function(feature, latlng) {
             return L.circle(latlng, {radius: 1e3});
        },
        onEachFeature: function(feature, layer) {
            var props = feature.properties;
            var title, lines = [];
            if (props.title && props.description) {
                title = escapeHtml(props.title);
                lines.push(sanitizeHtml(props.description));
            } else {
                title = escapeHtml(props.time || props.origintime);
                if ('public' in props) {
                    lines.push("");
                    lines.push(escapeHtml(props.public));
                }
                if ('modificationtime' in props) {
                    lines.push(escapeHtml("Modified: " + props.modificationtime));
                }
                if ('updated' in props) {
                    lines.push("");
                    lines.push(escapeHtml("Modified: " + props.updated));
                }
                if ('depth' in props) {
                    lines.push(escapeHtml("Depth (km): " + props.depth));
                }
                if ('sig' in props) {
                    lines.push(escapeHtml("Depth (km): " + props.sig));
                }
                if ('magnitude' in props) {
                    lines.push(escapeHtml("Magnitude: " + props.magnitude));
                }
                if ('mag' in props) {
                    lines.push(escapeHtml("Magnitude: " + props.mag));
                }
                if ('mmi' in props) {
                    lines.push(escapeHtml("MMI: " + props.mmi));
                }
                if ('quality' in props) {
                    lines.push("");
                    lines.push(escapeHtml("Quality: " + props.quality));
                }
                if ('locality' in props) {
                    lines.push(escapeHtml(props.locality));
                }
                if ('place' in props) {
                    lines.push("");
                    lines.push(escapeHtml(props.place));
                }
                if ('magnitudetype' in props) {
                    lines.push("");
                    lines.push(escapeHtml("Magnitude Type: " + props.magnitudetype));
                }
                if ('evaluationmethod' in props) {
                    lines.push(escapeHtml("Method: " + props.evaluationmethod));
                }
                if ('evaluationstatus' in props) {
                    lines.push(escapeHtml("Status: " + props.evaluationstatus));
                }
                if ('evaluationmode' in props) {
                    lines.push(escapeHtml("Mode: " + props.evaluationmode));
                }
                if ('status' in props) {
                    lines.push(escapeHtml(props.status));
                }
                if ('usedphasecount' in props) {
                    lines.push("");
                    lines.push(escapeHtml("Phase Count: " + props.usedphasecount));
                }
                if ('usedstationcount' in props) {
                    lines.push(escapeHtml("Station Count: " + props.usedstationcount));
                }
                if ('magnitudestationcount' in props) {
                    lines.push(escapeHtml("Mag Station Count: " + props.magnitudestationcount));
                }
                if ('type' in props) {
                    lines.push(escapeHtml("Type: " + props.type));
                }
                if ('dmin' in props) {
                    lines.push(escapeHtml("Duration (min): " + props.dmin));
                }
                if ('tsunami' in props) {
                    lines.push("");
                    lines.push(escapeHtml("Tsunami: " + props.tsunami));
                }
                if ('felt' in props) {
                    lines.push(escapeHtml("Felt: " + props.felt));
                }
                if ('alert' in props) {
                    lines.push(escapeHtml("Alert: " + props.alert));
                }
            }
            if (title) {
                layer.bindTooltip(title, {
                    offset: [10, 0],
                    direction: 'right',
                    sticky: true
                });
            }
            if (title && lines.length) {
                layer.bindPopup('<b>' + title + '</b><br>' + lines.join('<br>'));
            }
        }
    });

    map.on('zoomend', function() {
        // Ensure that the circles are clearly visible even when zoomed out.
        // Larger values will increase the size of the circle.
        var visibleZoomLevel = 9;
        var radius = 1;
        if (map.getZoom() < visibleZoomLevel) {
            // Enlarge radius to ensure it is easy to select.
            radius *= map.getZoomScale(visibleZoomLevel, map.getZoom());
        }
        geoJson.eachLayer(function(layer) {
            layer.setRadius(radius);
        });
    });

    // Cluster nearby/overlapping nodes by default.
    var clusterGroup = L.markerClusterGroup({
        zoomToBoundsOnClick: false,
        spiderfyOnMaxZoom: false,
        maxClusterRadius: 10
    });
    clusterGroup.addTo(map).addLayer(geoJson);
    map.fitWorld().fitBounds(clusterGroup.getBounds());

    // Summarize nodes within the cluster.
    clusterGroup.on('clustermouseover', function(ev) {
        var cutoff = 30;
        var cluster = ev.propagatedFrom;
        var addresses = cluster.getAllChildMarkers().map(function(marker) {
            return marker.getTooltip().getContent();
        });
        addresses.sort(function(a, b) {
            a = sortIpKey(a);
            b = sortIpKey(b);
            return a === b ? 0 : (a < b ? -1 : 1);
        });
        var deleted = addresses.splice(cutoff).length;
        var title = addresses.join('<br>');
        if (deleted) {
            title += '<br>(and ' + deleted + ' more)';
        }
        cluster.bindTooltip(title, {
            offset: [10, 0],
            direction: 'right',
            sticky: true,
            opacity: 0.8
        }).openTooltip();
    }).on('clustermouseout', function(ev) {
        ev.propagatedFrom.unbindTooltip();
    }).on('clusterclick', function(ev) {
        ev.propagatedFrom.spiderfy();
    });

    // Provide an option to disable clustering
    rangeControl({
        label: 'Cluster radius:',
        title: 'Control merging of nearby nodes. Set to the minimum to disable merges.',
        min: 0,
        max: 100,
        value: clusterGroup.options.maxClusterRadius,
        onChange: function(value, oldValue) {
            // Apply new radius: remove map, clear markers and finally add new.
            clusterGroup.options.maxClusterRadius = value;
            clusterGroup.remove().clearLayers().addTo(map);
            // Value 0: clustering is disabled, the map is directly used.
            geoJson.remove().addTo(value === 0 ? map : clusterGroup);
        }
    }).addTo(map);
}

function showError(msg) {
    document.getElementById('error-message').textContent = msg;
    document.body.classList.add('file-picker-enabled');
}

function loadData(data) {
    'use strict';
    var html_match, what, error;
    var reOldHtml = /^ *var endpoints = (\{[\s\S]+? *\});$/m;
    // Complicated regex to support html-minifier.
    var reNewHtml = /<script[^>]+id="?ipmap-data"?(?: [^>]*)?>\s*(\{[\S\s]+?\})\s*<\/script>/;
    if ((html_match = reNewHtml.exec(data))) {
        // Match new ipmap.html file.
        what = 'new ipmap.html';
        data = html_match[1];
    } else if ((html_match = reOldHtml.exec(data))) {
        // Match old ipmap.html file
        what = 'old ipmap.html';
        var text = html_match[1].replace(/'/g, '"');
        text = text.replace(/ class="geoip_property"/g, '');
        data = text.replace(/\/\/ Start endpoint list.*/, '');
    } else if (/^\s*\{[\s\S]+\}\s*$/.test(data)) {
        // Assume GeoJSON (.json) file.
        what = 'GeoJSON file';
    } else {
        what = 'unknown file';
        error = 'Unrecognized file contents';
    }
    if (!error) {
        try {
            loadGeoJSON(JSON.parse(data));
            return true;
        } catch (e) {
            error = e;
        }
    }
    var msg = 'Failed to load map data from ' + what + ': ' + error;
    msg += '; data was: ' + data.substring(0, 120);
    if (data.length > 100) msg += '... (' + data.length + ' bytes)';
    showError(msg);
}

(function() {
    'use strict';
    function loadFromUrl(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status !== 200) {
                showError('Failed to retrieve ' + url + ': ' + xhr.status + ' ' + xhr.statusText);
                return;
            }
            loadData(xhr.responseText);
        };
        xhr.onerror = function() {
            showError('Failed to retrieve ' + url + ': ' + xhr.status + ' ' + xhr.statusText);
        };
        xhr.send(null);
    }

    addEventListener('load', function() {
        // Note: FileReader and classList do not work with IE9 or older.
        var fileSelector = document.getElementById('file-picker');
        fileSelector.addEventListener('change', function() {
            if (!fileSelector.files.length) {
                return;
            }
            document.body.classList.remove('file-picker-enabled');
            var reader = new FileReader();
            reader.onload = function() {
                if (!loadData(reader.result)) {
                    document.body.classList.add('file-picker-enabled');
                }
            };
            reader.onerror = function() {
                showError('Failed to read file.');
            };
            reader.readAsText(fileSelector.files[0]);
        });

        // Force file picker when the "file" URL is given.
        var url = location.search.match(/[?&]url=([^&]*)/);
        if (url) {
            url = decodeURIComponent(url[1]);
            if (url) {
                loadFromUrl(url);
            } else {
                showError('');
            }
            return;
        }

        var data = document.getElementById('ipmap-data');
        if (data) {
            loadData(data.textContent);
        } else {
            showError('');
        }
    });
}());