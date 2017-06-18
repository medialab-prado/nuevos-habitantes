"use strict";

// GRAFICOS TABLEAU

// para que aparezca por debajo del menú fixed
setTimeout(function() {
  var tableauIframeList = document.querySelectorAll("iframe");
  for (var i = 0; i < tableauIframeList.length; i++) {
    var tableauIframe = tableauIframeList[i];
    var src = tableauIframe.getAttribute("src");
    tableauIframe.setAttribute("src", src + "?wmode=transparent");
  }
}, 1000);

//Cambiar altura gráfico
$(document).ready(function() {
  $(".myHeight").css("height", "100px");
});

$(document).ready(function() {
  if ($("#municipio").length > 0) {
    var municipios = [];
    var dsv = d3.dsv(";", "text/plain");

    dsv("data/2016.csv", function(err, data) {
      data.forEach(function(mun) {
        municipios.push({ id: mun.Cod, text: mun.Municipio });
      });

      $("#municipio").select2({
        data: municipios,
        width: 300,
        placeholder: "Nombre municipio"
      });
      $("#municipio").on("change", function(e) {
        console.log(e);
        console.log($(e.target).val());
        $(".pie").show();
        $(".footer").show();
        $(".loader").hide();
        data.forEach(function(municipio) {
          if (municipio.Cod == e.val || $(e.target).val() == municipio.Cod) {
            var datum1 = [];
            var datum2 = [];
            var total_habitantes = parseInt(municipio.Total_Poblacion);
            var total_extranjeros = parseInt(municipio.Nacidos_NO_ES);
            $("#porcentaje_ext h3").html(
              "Total población <br><small>" +
                d3.format(",.0f")(total_habitantes) +
                " personas</small>"
            );
            $("#porcentaje_pob h3").html(
              "Distribución extranjeros <br><small>" +
                d3.format(",.0f")(total_extranjeros) +
                " personas</small>"
            );
            datum1.push({
              label: "Nacionales",
              value: parseInt(municipio.Nacidos_ES)
            });
            datum1.push({
              label: "Extranjeros",
              value: parseInt(municipio.Nacidos_NO_ES)
            });

            for (var key in municipio) {
              if (
                municipio.hasOwnProperty(key) &&
                key != "Cod" &&
                key != "Provincia" &&
                key != "Municipio" &&
                key != "Nacidos_ES" &&
                key != "Nacidos_NO_ES" &&
                key.indexOf("Total") < 0
              ) {
                if (parseInt(municipio[key]) > 0) {
                  datum2.push({
                    label: key,
                    value: parseInt(municipio[key])
                  });
                }
              }
            }
            nv.addGraph(function() {
              var chart = nv.models
                .pieChart()
                .x(function(d) {
                  return d.label;
                })
                .y(function(d) {
                  return d.value;
                })
                .title("Total población")
                .margin({
                  top: 10
                })
                .showLegend(false)
                .showTooltipPercent(true)
                .valueFormat(function(d) {
                  return d3.format(",.0f")(d) + " personas";
                });

              d3
                .select("#porcentaje_ext svg")
                .datum(datum1)
                .transition()
                .duration(350)
                .call(chart);

              return chart;
            });

            nv.addGraph(function() {
              var chart = nv.models
                .pieChart()
                .x(function(d) {
                  return d.label;
                })
                .y(function(d) {
                  return d.value;
                })
                .margin({
                  top: 10
                })
                .showLegend(false)
                .valueFormat(function(d) {
                  return d3.format(",.0f")(d) + " personas";
                })
                .showTooltipPercent(true);

              d3
                .select("#porcentaje_pob svg")
                .datum(datum2)
                .transition()
                .duration(350)
                .call(chart);

              return chart;
            });
          }
        });
      });
      $("#municipio").val("10180").trigger("change");
    });
  }
});
