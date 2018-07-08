var initobj = (function() {
  return {
    
   init: function(name) {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;

    myDiagram =
      $(go.Diagram, "myDiagramDiv", // the ID of the DIV HTML element
        {
          initialContentAlignment: go.Spot.Center,
          "Changed": invalidateLinkRoutes,
          "undoManager.isEnabled": true
        });

    myDiagram.nodeTemplate =
      $(go.Node, go.Panel.Auto,
        { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc", go.Point.parse),
        $(go.Shape,
          { figure: "Circle", fill: "white" },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { font: "bold 11pt sans-serif" },
          new go.Binding("text"))
      );
	  
    myDiagram.linkTemplate =
      $(MultiNodePathLink,  // subclass of Link, defined below
        go.Link.Bezier,
        { layerName: "Background", toShortLength: 4 },
        $(go.Shape, { strokeWidth: 4 },
          new go.Binding("stroke", "color")),
        $(go.Shape, { toArrow: "Standard", scale: 3, strokeWidth: 0 },
          new go.Binding("fill", "color"))
      );

    function invalidateLinkRoutes(e) {
      // when a Node is moved, invalidate the route for all MultiNodePathLinks that go through it
      if (e.change === go.ChangedEvent.Property && e.propertyName === "location" && e.object instanceof go.Node) {
        var diagram = e.diagram;
        var node = e.object;
        if (node._PathLinks) {
          node._PathLinks.each(function(l) { l.invalidateRoute(); });
        }
      } else if (e.change === go.ChangedEvent.Remove && e.object instanceof go.Layer) {
        // when a Node is deleted that has MultiNodePathLinks going through it, invalidate those link routes
        if (e.oldValue instanceof go.Node) {
          var node = e.oldValue;
          if (node._PathLinks) {
            node._PathLinks.each(function(l) { l.invalidateRoute(); });
          }
        } else if (e.oldValue instanceof MultiNodePathLink) {
          // when deleting a MultiNodePathLink, remove all references to it in Node._PathLinks
          var link = e.oldValue;
          var diagram = e.diagram;
          var midkeys = link.data.path;
          if (Array.isArray(midkeys)) {
            for (var i = 0; i < midkeys.length; i++) {
              var node = diagram.findNodeForKey(midkeys[i]);
              if (node !== null && node._PathLinks) node._PathLinks.remove(link);
            }
          }
        }
      }
    }
	
	/*var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.64.109.247:8882/api/v1/devices", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText); */

/*var name= [ 
			{"ID" : "00016bc904f59755" , "NAME" : "tibit_olt" , "Parent" : "" },
{"ID" : "000122d3e7271e23" , "NAME" : "simulated_olt" , "Parent" : "0001000000000001" },
{"ID" : "0001c8cf8098b381" , "NAME" : "simulated_onu" , "Parent" : "000122d3e7271e23" },
{"ID" : "0001351007f50bd1" , "NAME" : "simulated_onu1" , "Parent" : "000122d3e7271e23" },
{"ID" : "0001c93f51181663" , "NAME" : "simulated_onu2" , "Parent" : "000122d3e7271e23" },
{"ID" : "000197734c372207" , "NAME" : "simulated_onu3" , "Parent" : "000122d3e7271e23" }
];
*/
var nodes=[];
/* var spans=[
        { from: 1, to: 3, path: [2, 3, 4], color: "blue" },
        { from: 4, to: 5, path: [2,3,1], color: "red" }
    ]; */
var spans=[];
var souce=[];
var destination=[];
var Parent ;
var locations = ["0 0","-200 0","-400 0","0 200","-200 200","-200 400"];
var k=0;
nodes.push( {key : "200" , text : "EAN Cloud" , color : "blue" , "loc" : "-500 -500"} ) ;

for(i=0;i<name.length;i++){
var too=-1;
var fro = -1;

if(k<(i)){
	k=k + 1;

console.log("value of k in if" , k);
}

else{
	k=0;
console.log("value of k in else" , k);
}
if( (name[i].Name).indexOf("olt") !== -1 ){
	//colors = "orange" ;
	spans.push({ from: i, to: "200", path: [], color: "blue" });
}
//else {
	//colors="green";
//}
var colors = "grey" ;
if( (name[i].Admin_state =="UNKNOWN") || (name[i].Admin_state =="PREPROVISIONED") || (name[i].Admin_state =="DISABLED")   ){
	console.log("inside Admin not enabled") ;
	colors = "grey" ;
}

else if ( (name[i].Admin_state =="ENABLED")    ){
	console.log("inside admin enabled");
	
	if ( (name[i].Oper_State =="UNKNOWN") || (name[i].Oper_State =="DISCOVERED") || (name[i].Oper_State =="TESTING") ){
	colors = "orange" ;
	}
	else if ( (name[i].Oper_State =="ACTIVE") ){
	colors = "green" ;
	}
	else if ( (name[i].Oper_State =="FAILED") ){
	colors = "red" ;
	}
	else if ( (name[i].Oper_State =="ACTIVATING") ){
		if ( (name[i].Status =="REACHABLE") ){
	colors = "orange" ;
		}
		else {
			colors = "red" ;
		}
	}
}

var node_name = name[i].Name + "\n" + name[i].Identifier ;
nodes.push( {key : i , text : node_name , color : colors , "loc" : locations[k]} ) ;
if(name[i].Parent!== "")
{
fro=i;
Parent=name[i].Parent;

for(j=0;j<name.length;j++){
if( Parent==name[j].ID )
{
too =j;
break;
}
}
if(too !== -1 && fro !== -1)
{
spans.push({ from: fro, to: too, path: [], color: "blue" });
}
}
}



/* var nodes= [
        { key: 1, text: "Alpha", color: "lightyellow", loc: "0 0" },
        { key: 2, text: "Beta", color: "brown", loc: "200 0" },
        { key: 3, text: "Gamma", color: "green", loc: "300 100" },
        { key: 4, text: "Delta", color: "slateblue", loc: "100 200" },
        { key: 5, text: "Epsilon", color: "aquamarine", loc: "300 350" },
        { key: 6, text: "Zeta", color: "tomato", loc: "0 100" },
        { key: 7, text: "Eta", color: "goldenrod", loc: "0 300" },
        { key: 8, text: "Theta", color: "orange", loc: "300 200" },
    ] ; */

    // create a few nodes and links
    myDiagram.model = new go.GraphLinksModel(nodes , spans);
	//setTimeout("window.open(self.location, '_self');", 50000);
  }
}

})(initobj||{})


  function MultiNodePathLink() {
    go.Link.call(this);
  }
  go.Diagram.inherit(MultiNodePathLink, go.Link);

  // ignores this.routing, this.adjusting, this.corner, this.smoothness, this.curviness
  /** @override */
  MultiNodePathLink.prototype.computePoints = function() {
    // get the list of Nodes that should be along the path
    var nodes = [];
    if (this.fromNode !== null && this.fromNode.location.isReal()) {
      nodes.push(this.fromNode);
    }
    var midkeys = this.data.path;
    if (Array.isArray(midkeys)) {
      var diagram = this.diagram;
      for (var i = 0; i < midkeys.length; i++) {
        var node = diagram.findNodeForKey(midkeys[i]);
        if (node instanceof go.Node && node.location.isReal()) {
          nodes.push(node);
          // Optimization?: remember on each path Node all of
          // the MultiNodePathLinks that go through it;
          // but this optimization requires maintaining this cache
          // in a Diagram Changed event listener.
          var set = node._PathLinks;
          if (!set) set = node._PathLinks = new go.Set(go.Link);
          set.add(this);
        }
      }
    }
    if (this.toNode !== null && this.toNode.location.isReal()) {
      nodes.push(this.toNode);
    }

    // now do the routing
    this.clearPoints();
    var prevloc = null;
    var thisloc = null;
    var nextloc = null;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      thisloc = node.location;
      nextloc = (i < nodes.length - 1) ? nodes[i + 1].location : null;

      var prevpt = null;
      var nextpt = null;
      if (this.curve === go.Link.Bezier) {
        if (prevloc !== null && nextloc !== null) {
          var prevang = thisloc.directionPoint(prevloc);
          var nextang = thisloc.directionPoint(nextloc);
          var avg = (prevang + nextang) / 2;
          var clockwise = prevang > nextang;
          if (Math.abs(prevang - nextang) > 180) {
            avg += 180;
            clockwise = !clockwise;
          }
          if (avg >= 360) avg -= 360;
          prevpt = new go.Point(Math.sqrt(thisloc.distanceSquaredPoint(prevloc)) / 4, 0);
          prevpt.rotate(avg + (clockwise ? 90 : -90));
          prevpt.add(thisloc);
          nextpt = new go.Point(Math.sqrt(thisloc.distanceSquaredPoint(nextloc)) / 4, 0);
          nextpt.rotate(avg - (clockwise ? 90 : -90));
          nextpt.add(thisloc);
        } else if (nextloc !== null) {
          prevpt = null;
          nextpt = thisloc;  // fix this point after the loop
        } else if (prevloc !== null) {
          var lastpt = this.getPoint(this.pointsCount - 1);
          prevpt = thisloc;  // fix this point after the loop
          nextpt = null;
        }
      }

      if (prevpt !== null) this.addPoint(prevpt);
      this.addPoint(thisloc);
      if (nextpt !== null) this.addPoint(nextpt);
      prevloc = thisloc;
    }

    // fix up the end points when it's Bezier
    if (this.curve === go.Link.Bezier) {
      // fix up the first point and the first control point
      var start = this.getLinkPointFromPoint(this.fromNode, this.fromPort, this.fromPort.getDocumentPoint(go.Spot.Center), this.getPoint(3), true);
      var ctrl2 = this.getPoint(2);
      this.setPoint(0, start);
      this.setPoint(1, new go.Point((start.x * 3 + ctrl2.x) / 4, (start.y * 3 + ctrl2.y) / 4));
      // fix up the last point and the last control point
      var end = this.getLinkPointFromPoint(this.toNode, this.toPort, this.toPort.getDocumentPoint(go.Spot.Center), this.getPoint(this.pointsCount - 4), false);
      var ctrl1 = this.getPoint(this.pointsCount - 3);
      this.setPoint(this.pointsCount - 2, new go.Point((end.x * 3 + ctrl1.x) / 4, (end.y * 3 + ctrl1.y) / 4));
      this.setPoint(this.pointsCount - 1, end);
    }

    return true;
  };
  // end MultiNodePathLink class
