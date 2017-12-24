export default {
  methods: {
    ToD3Network: function(graph)
    {
      var GraphData = {"links":[], "nodes":[]};
      var x = 0, y = 0, counter = 0, counter_aux = 0;

      for(var i = 0; i < graph["input"] + 1; i++)
      {
        GraphData.nodes.push(
        {
          "x": x,
          "y": y,
          "id": "I" + counter_aux++,
          "name": counter++,
          "label": "I"
        });
        y += 90;
      }

      for(var i = 0; i < graph["layers"]; i++)
      {
        counter_aux = 0;
        y = 0;
        x += 90;
        for(var j = 0; j < graph["hidden"] + 1; j++)
        {
          GraphData.nodes.push(
          {
            "x": x,
            "y": y,
            "id": ("H" + i) + counter_aux++,
            "name": counter++,
            "label": "H"+i
          });
          y += 90;
        }
      }

      x += 90;
      y = 0;
      counter_aux = 0;

      for(var i = 0; i < graph["output"]; i++)
      {
        GraphData.nodes.push(
        {
          "x": x,
          "y": y,
          "id": "O" + counter_aux++,
          "name": counter++,
          "label": "O"
        });
        y += 90;
      }

      for (var layer in graph)
      {
        if(layer == "input" | layer == "output" | layer == "hidden" | layer == "layers")
          continue;
        var index = (layer.slice(-1) == "n" ? 0 : layer.slice(-1) != "t" ? layer.slice(-1) : graph["layers"]);
        var source = index == 0 ? "I" : "H" + (index - 1);
        var target = index == 0 ? "H0" : index == graph["layers"] ? "O" : "H" + index;
        y = 0;
        for(var node in graph[layer])
        {
          x = 0;
          for(var weight in graph[layer][node])
          {
            GraphData.links.push(
            {
              "source": source + x++,
              "target": target + y,
              "weight": graph[layer][node][weight]
            });
          }
          y++;
        }
      }

      return GraphData;
    },
    DrawNeuralNetwork: function()
    {
      var colors = d3.scaleOrdinal(d3.schemeCategory10);
      var svg = d3.select("svg"), width = +svg.attr("width"), height = +svg.attr("height"), node, link;
      var g = svg.append("g");
      var edgepaths = '';
      var edgelabels = '';

      g.append('defs')
       .append('marker')
       .attrs(
       {
         'id'           : 'arrowhead',
         'viewBox'      : '-0 -5 10 10',
         'refX'         : 13,
         'refY'         : 0,
         'orient'       : 'auto',
         'markerWidth'  : 1.3,
         'markerHeight' : 1.3,
         'xoverflow'    :'visible' })
       .append('svg:path')
       .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
       .attr('fill', '#999')
       .style('stroke','none');

      var simulation = d3.forceSimulation()
                         .velocityDecay(.8)
                         .force("charge", d3.forceManyBody().distanceMin(100))
                         .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(100))
                         .force("center", d3.forceCenter(width / 2, height / 2));
      var networks_data = this.ToD3Network(this.json_obj);

      console.log(networks_data.links);
      console.log(networks_data.nodes);

      update(networks_data.links, networks_data.nodes);

      function update(links, nodes)
      {
        link = g.selectAll(".link")
                .data(links)
                .enter()
                .append("line")
                .attr("class", "link")
                .attr('marker-end','url(#arrowhead)');

        link.append("title")
            .text(function (d) {return d.weight;});

        edgepaths = g.selectAll(".edgepath")
                     .data(links)
                     .enter()
                     .append('path')
                     .attrs(
                     {
                       'class'         : 'edgepath',
                       'fill-opacity'  : 0,
                       'stroke-opacity': 0,
                       'id': function (d, i) {return 'edgepath' + i}
                     })
                     .style("pointer-events", "none");

        edgelabels = g.selectAll(".edgelabel")
                      .data(links)
                      .enter()
                      .append('text')
                      .style("pointer-events", "none")
                      .attrs(
                      {
                        'class'     : 'edgelabel',
                        'font-size' : 7,
                        'fill'      : '#aaa',
                        'id': function (d, i) {return 'edgelabel' + i}
                      });

        edgelabels.append('textPath')
                  .attr('xlink:href', function (d, i) {return '#edgepath' + i})
                  .style("text-anchor", "middle")
                  .style("pointer-events", "none")
                  .attr("startOffset", "50%")
                  .text(function (d) {return d.weight});

        node = g.selectAll(".node")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));

        node.append("circle").attr("r", 5.5).style("fill", function (d, i) {return colors(1);})
        node.append("title").text(function (d) {return d.id;});
        node.append("text").attr("dy", -3);

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links);
      }

      function ticked()
      {
        link.attr("x1", function (d) {return d.source.x;})
            .attr("y1", function (d) {return d.source.y;})
            .attr("x2", function (d) {return d.target.x;})
            .attr("y2", function (d) {return d.target.y;});

        node.attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});
        edgepaths.attr('d', function (d) { return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y; });
        edgelabels.attr('transform', function (d)
        {
          if (d.target.x < d.source.x)
          {
            var bbox = this.getBBox();
            rx = bbox.x + bbox.width / 2;
            ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
          }
          else { return 'rotate(0)'; }
        });
      }

      function dragstarted(d)
      {
        d.fx = null;
        d.fy = null;
      }

      function dragged(d)
      {
        d.x = d3.event.x;
        d.y = d3.event.y;
      }

      function dragended(d)
      {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      setTimeout(simulation.stop, 1000);

      var zoom_handler = d3.zoom().on("zoom", zoom_actions);

      zoom_handler(svg);

      function zoom_actions() { g.attr("transform", d3.event.transform); }
    }
  }
}
