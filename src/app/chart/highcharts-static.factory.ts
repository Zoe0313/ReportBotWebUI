import * as Highcharts from "highcharts";
import factory from "highcharts/modules/drilldown";

export function createDrilldownModule(): any {
   factory(Highcharts);
   enableRoundedBarChartExtention(Highcharts);
   return Highcharts;
}

/**
 * This code is copied from https://github.com/highcharts/rounded-corners/blob/master/rounded-corners.js
 * The npm install of the rounded-corners component fails due to missing "Highcharts" dependency
 * The issue is known and tracked here: https://github.com/highcharts/rounded-corners/issues/21
 * Once this gets fixed we can remove this and install the component as a regular npm package.
 */
function enableRoundedBarChartExtention(Highcharts) {
   var rel = Highcharts.relativeLength;

   Highcharts.wrap(Highcharts.seriesTypes.column.prototype, 'translate', function (proceed) {
      var options = this.options,
            topMargin = options.topMargin || 0,
            bottomMargin = options.bottomMargin || 0;

      proceed.call(this);

      Highcharts.each(this.points, function (point) {
         var shapeArgs = point.shapeArgs,
               w = shapeArgs.width,
               h = shapeArgs.height,
               x = shapeArgs.x,
               y = shapeArgs.y;

         // Get the radius
         var rTopLeft = rel(options.borderRadiusTopLeft || 0, w),
               rTopRight = rel(options.borderRadiusTopRight || 0, w),
               rBottomRight = rel(options.borderRadiusBottomRight || 0, w),
               rBottomLeft = rel(options.borderRadiusBottomLeft || 0, w);

         if (rTopLeft || rTopRight || rBottomRight || rBottomLeft) {
            var maxR = Math.min(w, h) / 2

            if (rTopLeft > maxR) {
               rTopLeft = maxR;
            }

            if (rTopRight > maxR) {
               rTopRight = maxR;
            }

            if (rBottomRight > maxR) {
               rBottomRight = maxR;
            }

            if (rBottomLeft > maxR) {
               rBottomLeft = maxR;
            }

            // Preserve the box for data labels
            point.dlBox = point.shapeArgs;

            point.shapeType = 'path';
            point.shapeArgs = {
               d: [
                  'M', x + rTopLeft, y + topMargin,
                  // top side
                  'L', x + w - rTopRight, y + topMargin,
                  // top right corner
                  'C', x + w - rTopRight / 2, y, x + w, y + rTopRight / 2, x + w, y + rTopRight,
                  // right side
                  'L', x + w, y + h - rBottomRight,
                  // bottom right corner
                  'C', x + w, y + h - rBottomRight / 2, x + w - rBottomRight / 2, y + h, x + w - rBottomRight, y + h + bottomMargin,
                  // bottom side
                  'L', x + rBottomLeft, y + h + bottomMargin,
                  // bottom left corner
                  'C', x + rBottomLeft / 2, y + h, x, y + h - rBottomLeft / 2, x, y + h - rBottomLeft,
                  // left side
                  'L', x, y + rTopLeft,
                  // top left corner
                  'C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y,
                  'Z'
               ]
            };
         }

      });
   });
}