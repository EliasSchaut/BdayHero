"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceStatus = void 0;
var AttendanceStatus;
(function (AttendanceStatus) {
    /// User has not responded to the event
    AttendanceStatus[AttendanceStatus["NOT_RESPONDED"] = -1] = "NOT_RESPONDED";
    /// User is attending the event
    AttendanceStatus[AttendanceStatus["ATTENDING"] = 0] = "ATTENDING";
    /// User is not attending the event
    AttendanceStatus[AttendanceStatus["NOT_ATTENDING"] = 1] = "NOT_ATTENDING";
    /// User is maybe attending the event
    AttendanceStatus[AttendanceStatus["MAYBE_ATTENDING"] = 2] = "MAYBE_ATTENDING";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
