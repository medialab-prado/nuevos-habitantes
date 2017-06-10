jQuery(document).ready(function() {
  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

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

  var treemap = d3
    .treemap()
    .size([width, height])
    .padding(1)
    .tile(d3.treemapBinary)
    .round(true);

  d3.csv(
    "data/2016_poblacion_area_geografica.csv",
    function(d) {
      d.numero_personas = +d.numero_personas;
      return d;
    },
    function(error, data) {
      if (error) throw error;

      var root = stratify(data)
        .sum(function(d) {
          return d.numero_personas;
        })
        .sort(function(a, b) {
          return b.height - a.height || b.value - a.value;
        });
      treemap(root);

      var cell = svg
        .selectAll("a")
        .data(root.leaves())
        .enter()
        .append("a")
        .attr("transform", function(d) {
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });

      cell
        .append("rect")
        .attr("id", function(d) {
          return d.id;
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

      /*
cell.append("clipPath")
  .attr("id", function(d) { return "clip-" + d.id; })
.append("use")
  .attr("xlink:href", function(d) { return "#" + d.id; });
*/

      var label = cell.append("text").attr("clip-path", function(d) {
        return "url(#clip-" + d.id + ")";
      });

      label.append("tspan").attr("x", 4).attr("y", 13).text(function(d) {
        return d.data.area_geografica.substring(
          d.data.area_geografica.lastIndexOf("/") + 1,
          d.data.area_geografica.length
        );
      });

      label.append("tspan").attr("x", 4).attr("y", 25).text(function(d) {
        return format(d.value);
      });

      cell.append("title").text(function(d) {
        return (
          d.data.area_geografica.substring(
            d.data.area_geografica.lastIndexOf("/") + 1,
            d.data.area_geografica.length
          ) +
          "\n" +
          format(d.value)
        );
      });
    }
  );

  function type(d) {
    d.value = +d.value;
    return d;
  }
});
