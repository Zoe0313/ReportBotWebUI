import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { Injectable } from "@angular/core";

@Injectable()
export class LocalizePickerLabels extends OwlDateTimeIntl {
   // Localize Set and Calcel button.
   setBtnLabel = "OK";
   cancelBtnLabel = "Cancel";
};

/**
 * TODO: using the string bundle to handle the locale based datetime format
 * for the time being(e.g. while Clarity provide their component)
 * the vIP service (from i10n team) does not help on this issue
 */
export const pickerFormats = {

   // TODO: Use this implementation when ng-pick-datetime-moment supports Angular8.
   // ng-pick-datetime-moment is used to localized the date and time that are displayed in input filed.
   // https://daniel-projects.firebaseapp.com/owlng/date-time-picker
   // fullPickerInput: VsanUiUtils.getString("vsan.common.custom.date.format"),
   // monthYearLabel: 'MM YYYY'

   fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
   monthYearLabel: {year: 'numeric', month: 'numeric'},

};