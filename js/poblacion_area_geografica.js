jQuery(document).ready(function() {
  var root = [];
  var format = d3.format(",d");

  var color = d3.scaleOrdinal().range(
    d3.schemeCategory10.map(function(c) {
      c = d3.rgb(c);
      c.opacity = 0.6;
      return c;
    })
  );

  var stratify = d3
    .stratify()
    .id(function(d) {
      return d.area_geografica;
    })
    .parentId(function(d) {
      return d.area_geografica.substring(0, d.area_geografica.lastIndexOf("/"));
    });

  function type(d) {
    d.value = +d.value;
    return d;
  }
  function normalize(str) {
    var from =
      "1234567890ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç '/&().!",
      to = "izeasgtogoAAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc_____",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++) {
      mapping[from.charAt(i)] = to.charAt(i);
    }

    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) {
        ret.push(mapping[c]);
      } else {
        ret.push(c);
      }
    }
    return ret.join("").toLowerCase();
  }

  function setUpGraph(el, root) {
    var container = d3.select("#" + el),
      svg = d3.select("#" + el + " > svg"),
      width = +container.attr("width"),
      height = +container.attr("height");

    var main = document.getElementById(el);
    width = isNaN(width)
      ? Math.min(main.clientWidth, window.innerWidth) || 500
      : width;

    var tile = d3.treemapResquarify;
    var data = root.leaves();
    if (width < 720) {
      data = root.children;
      tile = d3.treemapSliceDice;
    }
    if (width < 420) {
      tile = d3.treemapSlice;
      height = 250;
    }

    svg.attr("width", width).attr("height", height);
    svg.selectAll("a").remove();
    var treemap = d3.treemap().size([width, height]).padding(1).tile(tile);
    //.round(true);
    treemap(root);

    var cell = svg
      .selectAll("a")
      .data(data)
      .enter()
      .append("a")
      .attr("transform", function(d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    cell
      .append("rect")
      .attr("id", function(d) {
        return normalize(d.id);
      })
      .attr("width", function(d) {
        return d.x1 - d.x0;
      })
      .attr("height", function(d) {
        return d.y1 - d.y0;
      })
      .attr("fill", function(d) {
        var a = d.ancestors();
        return color(a[a.length - 2].id);
      });

    var label = cell.append("text").attr("clip-path", function(d) {
      return "url(#clip-" + d.id + ")";
    });

    label.append("tspan").attr("x", 4).attr("y", 13).text(function(d) {
      var r = d3.select("#" + normalize(d.id)).attr("width");
      if (r > 25) {
        return d.data.area_geografica.substring(
          d.data.area_geografica.lastIndexOf("/") + 1,
          d.data.area_geografica.length
        );
      }
      return "";
    });

    label.append("tspan").attr("x", 4).attr("y", 25).text(function(d) {
      var r = d3.select("#" + normalize(d.id)).attr("width");
      if (r > 25) {
        return format(d.value);
      }
    });

    cell.append("title").text(function(d) {
      return (
        d.data.area_geografica.substring(
          d.data.area_geografica.lastIndexOf("/") + 1,
          d.data.area_geografica.length
        ) +
        "\n" +
        format(d.value) +
        " personas"
      );
    });
  }

  d3.csv(
    "data/2016_poblacion_area_geografica.csv",
    function(d) {
      d.numero_personas = +d.numero_personas;
      return d;
    },
    function(error, data) {
      if (error) throw error;

      root = stratify(data)
        .sum(function(d) {
          return d.numero_personas;
        })
        .sort(function(a, b) {
          return b.height - a.height || b.value - a.value;
        });
      setUpGraph("pob-geo-desktop", root);
      setUpGraph("pob-geo-mobile", root);
    }
  );
  $(window).resize(function() {
    setUpGraph("pob-geo-desktop", root);
    setUpGraph("pob-geo-mobile", root);
  });
});
