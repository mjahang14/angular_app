var initobj_svg = (function() {
  return {
    
   init: function(name) {
	   
	   
      if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make;  // for conciseness in defining templates

      myDiagram =
        $(go.Diagram, "myDiagramDiv",
          { "animationManager.isEnabled": false,
            initialContentAlignment: go.Spot.Center
          });

      // conversion functions for Bindings in the Node template:

      function nodeTypeImage(type) {
        switch (type) {
          case "S2": return "images/voice atm switch.jpg";
          case "S3": return "images/server switch.jpg";
          case "P1": return "images/general processor.jpg";
          case "P2": return "images/storage array.jpg";
          case "M4": return "images/iptv broadcast server.jpg";
          case "M5": return "images/content engine.jpg";
          case "I1": return "images/pc.jpg";
		  case "olt": return "../assets/olt.jpg" ;
		  case "onu": return "../assets/cisco_broadband_modem.jpg" ;
		  case "ean": return "../assets/ean_cloud.jpg" ;
          default: return "images/pc.jpg";
        }
       
      }

      function nodeProblemConverter(msg) {
        if (msg) return "red";
        return null;
      }

      function nodeOperationConverter(s) {
        if (s >= 2) return "TriangleDown";
        if (s >= 1) return "Rectangle";
        return "Circle";
      }
	  
	  function nodeStatusIndicator(s) {
        if (s == "orange") return "orange";
		 if (s == "green") return "green";
		  if (s == "red") return "red";
		   if (s == "grey") return "grey";
        //if (s >= 1) return "Rectangle";
        return "grey";
      }

      function nodeStatusConverter(s) {
       // if (s >= 2) return "red";
        //if (s >= 1) return "yellow";
		console.log("inside nodeStatusConverter" , s );
		switch(s){
			case 1: return "orange" ;
			case 2: return "green" ;
			case 3: return "red" ;
			case 4: return "grey" ;
         	}
        //return "grey";
      }

      myDiagram.nodeTemplate =
        $(go.Node, "Vertical",
          { locationObjectName: "ICON" },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Panel, "Spot",
            $(go.Panel, "Auto",
              { name: "ICON" },
              $(go.Shape,
                { fill: null, stroke: null },
                new go.Binding("background", "problem", nodeProblemConverter)),
              $(go.Picture,
                { margin: 5 },
                new go.Binding("source", "type", nodeTypeImage)),
				 $(go.Shape, "Circle",
              { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
                width: 12, height: 12, fill: "orange" },
              //new go.Binding("figure", "operation", nodeOperationConverter))
			   new go.Binding("fill", "status", nodeStatusConverter))
            )
          ),  // end Spot Panel
          $(go.TextBlock,
            new go.Binding("text"))
        );  // end Node 


      // conversion function for Bindings in the Link template:
function linkProblemConverter(msg) {
        if (msg) return "red";
        return "gray";
      }
      myDiagram.linkTemplate =
        $(go.Link, 
          { corner: 3 },
          $(go.Shape,
            { strokeWidth: 2, stroke: "gray" }
            )
        );

      load();


           /* function loop() {
        setTimeout(function() { randomProblems(); loop(); }, 2000);
      }
      loop();  // start the simulation */
    var nodes=[];

var spans=[];
var souce=[];
var destination=[];
var Parent ;
var type = " " ;
var color_list = [];
var locations = ["195 225","183.5 94","75 211.5","306 225","288.5 95","426 211"];
var k=0;
nodes.push( {"key" : "200" , "text" : "" , "type":"ean", "loc":"426 211"} ) ;
color_list.push("grey");

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
	type = "olt" ;
	spans.push({ from: i, to: "200", path: [], color: "blue" });
}
else {
type = "onu" ;
}


if( (name[i].Admin_state =="UNKNOWN") || (name[i].Admin_state =="PREPROVISIONED") || (name[i].Admin_state =="DISABLED")   ){
	console.log("inside Admin not enabled") ;
	colors = "grey" ;
	color_list.push(colors);
}

else if ( (name[i].Admin_state =="ENABLED")    ){
	console.log("inside admin enabled");
	
	if ( (name[i].Oper_State =="UNKNOWN") || (name[i].Oper_State =="DISCOVERED") || (name[i].Oper_State =="TESTING") ){
	colors = "orange" ;
	color_list.push(colors);
	}
	else if ( (name[i].Oper_State =="ACTIVE") ){
	colors = "green" ;
	color_list.push(colors);
	}
	else if ( (name[i].Oper_State =="FAILED") ){
	colors = "red" ;
	color_list.push(colors);
	}
	else if ( (name[i].Oper_State =="ACTIVATING") ){
		if ( (name[i].Status =="REACHABLE") ){
	colors = "orange" ;
	color_list.push(colors);
		}
		else {
			colors = "red" ;
			color_list.push(colors);
		}
	}
}

var node_name = name[i].Name + "\n" + name[i].Identifier ;
nodes.push( {key : i , text : node_name , "type" : type , "loc" : locations[k]} ) ;if(name[i].Parent!== "")
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
spans.push({ from: fro, to: too });
}
}
}

node_link = { "nodeDataArray":nodes , "linkDataArray":spans} ;

 myDiagram.model = myDiagram.model = go.Model.fromJson(node_link);
 
 
 function randomProblems() {
        var model = myDiagram.model;
        // update all nodes
		console.log("invoked randomProblems");
        var arr = model.nodeDataArray;
        for (var i = 0; i < arr.length; i++) {
          data = arr[i];
          //data.problem = (Math.random() < 0.8) ? "" : "Power loss due to ...";
		  if (color_list[i] =="orange" ){
		  data.status = 1; }
		  if (color_list[i] =="green" ){
		  data.status = 2; }
		  if (color_list[i] =="red" ){
		  data.status = 3; }
		  if (color_list[i] =="grey" ){
		  data.status = 4; }
		  
		  //data.status = Math.random() * 3;
          //data.operation = Math.random() * 3;
          model.updateTargetBindings(data);
        }
        // and update all links
        /*arr = model.linkDataArray;
        for (i = 0; i < arr.length; i++) {
          data = arr[i];
          data.problem = (Math.random() < 0.7) ? "" : "No Power";
          model.updateTargetBindings(data);
        } */
      }
	  
	  randomProblems();
	
    function load() {
		
	node_link = { "nodeDataArray":nodes , "linkDataArray":spans} ;
	
	//nodes = JSON.parse(nodes);
      //myDiagram.model = myDiagram.model = go.Model.fromJson(node_link);
	   //myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }

	   
   }
  }
})(initobj_svg||{})



  // end MultiNodePathLink class
