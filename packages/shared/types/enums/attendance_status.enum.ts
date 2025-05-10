export enum AttendanceStatus {
  /// User has not responded to the event
  NOT_RESPONDED = -1,

  /// User is attending the event
  ATTENDING = 0,

  /// User is not attending the event
  NOT_ATTENDING = 1,

  /// User is maybe attending the event
  MAYBE_ATTENDING = 2,
}
