(function( $ ){

   var Series = new (function () {
	var _barSeriesOptions = {
		color: "#000000",
		data: null,
		name: "",		
		type: "column"
	};
	
	var _lineSeriesOptions = {
		color: "#000000",
		data: null,
		name: "",		
		type: "line",
		dashStyle: ""
	};
	
	function createSerie (type, data, options, yAxisIndex, name){
		var endOptions = {};
		if (yAxisIndex){
			yOptions = $.extend(true, options, {yAxis: yAxisIndex});			
			endOptions = $.extend(true, {}, yOptions);			
		}
		else{
			endOptions = $.extend(true, {}, options);			
		}
		
		var seriesType = null;
		(type == "line") ? seriesType = _lineSeriesOptions : seriesType = _barSeriesOptions;
		var baseOptions = $.extend(true, {}, seriesType);
		
		var endOption = $.extend(true, baseOptions, endOptions);
		
		endOption.data = data;
		
		if (name != undefined){
			endOption.name = name;
		}
		
		return endOption;
	};
	
	function createAxisByType (type,name,max,color,options){
		if (type == 'column'){
			color = "#000000";			
			return createyAxis(name,max,color,options);
		}
		else if (type == 'line'){
			var lineOptions = jQuery.extend(true,options,{opposite: true});
			return createyAxis(name,max,color,lineOptions);		
		}		
	};

	function createxAxis (categories,axisWidth,axisColor,options){
			(axisWidth == undefined) ? axisWidth = 1 : null;
			(axisColor == undefined) ? axisColor = "#000000" : null;		

			var axis = {
				categories: [],
				lineColor: axisColor,
				lineWidth: axisWidth
			};

			if (options != null){
				axis = $.extend(true, axis, options);
			}

			axis.categories = categories;
			
			console.log("::p.xAxis::", axis);

		return axis;
	};
		
	function createyAxis (name,maxvalue,axisColor,options){
		(axisColor == undefined) ? axisColor = "#000000" : null;
		
		var axis = {
			labels: {
				style: {
					color: axisColor
				}
			},
			title: {
				text: name,
				style: {
					color: axisColor
				}
			},
			endOnTick: true,
			alignTicks: false,
			max: maxvalue,
			min: 0,		
			maxPadding: 0.05
		}
		
		if (options != null){
			axis = $.extend(true, axis, options);
		}

		return axis;		
	};
	
	return {
		createAxisByType: function (type, name, maxvalue, axisColor, options){
			return createAxisByType(type, name, maxvalue, axisColor, options);
		},		
		createxAxis: function (categories, axisWidth, axisColor, options){
			return createxAxis(categories, axisWidth, axisColor, options);
		},		
		createyAxis: function (name, maxvalue, axisColor, options){
			return createyAxis(name, maxvalue, axisColor, options);
		},
		createSerie: function (type, data, options, yAxisIndex, name){
			return createSerie(type, data, options, yAxisIndex, name);
		}
	}
   })();
   
   $.extend({
		createAxisByType: function (type, name, maxvalue, axisColor, options) {
			//console.log('jq.chartseries::createAxisByType', axisColor, options);	
          return Series.createAxisByType(type, name, maxvalue, axisColor, options);
		},
		createxAxis: function (categories, axisWidth, axisColor, options) {
           return Series.createxAxis(categories, axisWidth, axisColor, options);
		},		
		createyAxis: function (name, maxvalue, axisColor, options) {
			//console.log('jq.chartseries::createyAxis', axisColor, options);	
           return Series.createyAxis(name, maxvalue, axisColor, options);
		},
		createSerie: function (type, data, options, yAxisIndex, name) {
			//console.log('jq.chartseries::createSeries', Series);
           return Series.createSerie(type, data, options, yAxisIndex, name);
		}
   });

})( jQuery );