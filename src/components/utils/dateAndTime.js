import moment from "moment";

export default {
  getUTCTimestamp() {
    let timestamp = moment.utc().valueOf();
    return timestamp;
  },
  LocalToUTC(local) {
    let UTC = moment(local).valueOf();
    return UTC;
  },
  UTCToLocalTimeAndDate(UTC) {
    let local = moment
      .utc(UTC)
      .local()
      .format("YYYY-MM-DD HH:mm:ss");
    return local;
  },
  UTCToLocalDate(UTC) {
    let local = moment
      .utc(UTC)
      .local()
      .format("YYYY-MM-DD");
    return local;
  },
};
