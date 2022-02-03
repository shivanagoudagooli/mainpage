import moment from 'moment'
export const mVMixin = {
  methods: {
    getRangeFormat (date) {
     
      return moment.utc(date).local().format('DD MMM YYYY')
    },
    formatDate (timeStr) {
      
      return moment.utc(timeStr).local().format('DD-MMM-YYYY')
    },
    formatDateTime (timeStr) {

      return moment.utc(timeStr).local().format('DD-MMM-YYYY HH:mm:ss')
    },
    getCurrency (currency) {
      if (currency === 'USD') {
        return '$'
      } else if (currency === 'INR') {
        return '₹'
      }
    }
  }
}