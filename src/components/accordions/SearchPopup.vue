<template>
  <div id="modal" class="modal-class" v-show="show" ref="popup" @click="stopClose">
    <div class="modal-content" @click="stopClose">
      <input :type="type" class="placeholder" :maxlength="maxInput" :placeholder="placeValue" v-model="searchQuery" :val="searchQuery" @click="stopClose" :style="searchImg" />
      <div class="search-img" @click="cancelPopup">
        <svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
          <title>Close</title>
          <desc>Created with sketchtool.</desc>
          <g id="components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Table-Search-Style" transform="translate(-691.000000, -279.000000)" fill="#D7E1F0" fill-rule="nonzero">
                  <g id="Search" transform="translate(360.000000, 255.000000)">
                      <g transform="translate(325.656250, 18.500000)" id="ic_close">
                          <g transform="translate(5.445163, 5.445163)">
                              <path d="M12.0619686,0.928448996 L12.1008161,0.9687893 C12.5137832,1.39746825 12.5137832,2.09262161 12.1008918,2.52137918 L8.16562763,6.60688082 L12.1008918,10.6923825 C12.4862571,11.0925562 12.5119481,11.7247903 12.1779033,12.1558415 L12.1008161,12.2449723 L12.0619686,12.2853127 C11.6766034,12.6854864 11.0677652,12.7121646 10.6526036,12.3653474 L10.5667568,12.2853127 L6.60458526,8.17088625 L2.64813207,12.2793745 C2.26276683,12.6795483 1.65392866,12.7062265 1.23876702,12.3594093 L1.15292027,12.2793745 L1.11287927,12.2377949 C0.727949313,11.8380732 0.701822111,11.2067024 1.03482989,10.7755383 L1.11168578,10.6863677 L5.06007614,6.60688082 L1.11168578,2.52739393 C0.69992028,2.09843697 0.700454316,1.40424004 1.11287927,0.975966777 L1.15292027,0.934387118 C1.56581161,0.505629555 2.23524074,0.505629555 2.64813207,0.934387118 L6.60458526,5.0428754 L10.5667568,0.928448996 C10.9796482,0.499691433 11.6490773,0.499691433 12.0619686,0.928448996 Z" id="Path"></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPopup',
  data () {
    return {
      searchQuery: '',
      placeValue: '',
      searchImg: '',
      maxInput: 64
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    searchLabel: {
      type: String
    },
    query: {
      type: String,
      default: null
    },
    isSpecial: {
      type: Boolean,
      default: false
    },
    mSearchProperty: {
      type: Object,
      default () {
        return {
          textColor: '#4E617B',
          bgPopup: '#fff',
          borderPopup: '#D0D6DD',
          borderInput: '#0978FC',
          fillSearch: '#1573E1',
          fillClose: '#D4DAE4'
        }
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    subtype: {
      type: String
    }
  },
  components: {
  },
  watch: {
    searchQuery () {
      if (this.type === 'number') {
        if (this.searchQuery.length > 25) {
          let value = this.searchQuery.split('')
          value.splice(25, 1)
          value = value.join('')
          this.searchQuery = value
        } else {
          if (this.subtype === 'integer') {
            let intregesx = /^[0-9]*$/
            if (!intregesx.test(this.searchQuery)) {
              let valInt = this.searchQuery.split('')
              valInt.splice(this.searchQuery.length-1, 1)
              valInt = valInt.join('')
              this.searchQuery = valInt
            }
          }
          if (this.searchQuery.length > 2) {
            this.$emit('searchEvent', this.searchQuery)
          } else if (this.searchQuery.length === 0) {
            this.$emit('searchEvent', this.searchQuery)
          }
        }
      } else {
        let regesx = /(^$|^[0-9a-zA-Z_ @./-]+$)/
        if (!regesx.test(this.searchQuery) && this.isSpecial) {
          let val = this.searchQuery.split('')
          val.splice(this.searchQuery.length-1, 1)
          val = val.join('')
          this.searchQuery = val
        } else {
          if (this.searchQuery.length > 2) {
            this.$emit('searchEvent', this.searchQuery)
          } else if (this.searchQuery.length === 0) {
            this.$emit('searchEvent', this.searchQuery)
          }
        }
      }
      this.getStyle()
    },
    query () {
      this.searchQuery = this.query
    }
  },
  created () {
    this.placeValue = `Search ${this.searchLabel}`
    this.searchQuery = this.query
  },
  methods: {
    closePopup () {
      if (event.target === this.$refs.popup) {
        this.$emit('close', false)
      }
    },
    getStyle () {
      if (this.searchQuery.length) {
        this.searchImg = {
          backgroundImage: 'none',
          textIndent: 0
        }
      } else {
        this.searchImg = {
          backgroundImage: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='14px' height='14px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 57.1 (101010) - https://sketch.com --%3E%3Ctitle%3EF9560F91-9B7A-49CA-8D88-32883613B718@2x%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='01vlive_suport_tickets' transform='translate(-373.000000, -128.000000)' fill='%23C3C3C3' fill-rule='nonzero'%3E%3Cg id='Group-4' transform='translate(88.000000, 72.000000)'%3E%3Cg id='Table_constants' transform='translate(0.000000, 4.166654)'%3E%3Cg id='Group' transform='translate(80.250000, 46.329408)'%3E%3Cg id='Tablehead' transform='translate(162.000000, 2.000000)'%3E%3Cg id='Stacked-Group'%3E%3Cg%3E%3Cg id='Filter-Copy-menu_option' transform='translate(39.000000, 0.000000)'%3E%3Cg id='menu_option'%3E%3Cg id='Filter-Search' transform='translate(-0.000000, 0.000000)'%3E%3Cpath d='M9.96875,14.4375 C12.4367725,14.4375 14.4375,12.4367725 14.4375,9.96875 C14.4375,7.50072752 12.4367725,5.5 9.96875,5.5 C7.50072752,5.5 5.5,7.50072752 5.5,9.96875 C5.5,12.4367725 7.50072752,14.4375 9.96875,14.4375 Z M9.96875,15.8125 C6.74133599,15.8125 4.125,13.196164 4.125,9.96875 C4.125,6.74133599 6.74133599,4.125 9.96875,4.125 C13.196164,4.125 15.8125,6.74133599 15.8125,9.96875 C15.8125,13.196164 13.196164,15.8125 9.96875,15.8125 Z M13.2202912,13.9821747 C13.0099029,13.7717864 13.0099029,13.4306796 13.2202912,13.2202912 C13.4306796,13.0099029 13.7717864,13.0099029 13.9821747,13.2202912 L17.0297088,16.2678253 C17.2400971,16.4782136 17.2400971,16.8193204 17.0297088,17.0297088 C16.8193204,17.2400971 16.4782136,17.2400971 16.2678253,17.0297088 L13.2202912,13.9821747 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          textIndent: '15px'
        }
      }
    },
    cancelPopup () {
      event.preventDefault()
      this.$emit('close', false)
    },
    stopClose () {
      event.stopPropagation()
      this.$emit('searchClick')
    },
    searchValue () {
      this.$emit('close', false)
    },
  }
}
</script>

<style scoped lang="scss">
  .modal-class {
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    width: 271px;
    .modal-content {
      background-color: #fff;
      width: 100%;
      padding: 0 9px;
      height: 53px;
      float:none;
      border: 1px solid #D0D6DD;
      border-radius: 2px;
      box-shadow: 2px 10px 22px 0 rgba(0,0,0,0.11);
      position: relative;
      display: flex;
      flex-direction: row;
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }
      .search-img {
        display: flex;
        align-items: center;
        margin-left: 25px;
        svg {
          cursor: pointer;
          width: 16px;
          position: relative;
          right: 7px;
          &:hover {
            path {
              fill: #0978FC;
            }
          }
        }
      }
      input {
        background-color: #fff;
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='14px' height='14px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 57.1 (101010) - https://sketch.com --%3E%3Ctitle%3EF9560F91-9B7A-49CA-8D88-32883613B718@2x%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='01vlive_suport_tickets' transform='translate(-373.000000, -128.000000)' fill='%23C3C3C3' fill-rule='nonzero'%3E%3Cg id='Group-4' transform='translate(88.000000, 72.000000)'%3E%3Cg id='Table_constants' transform='translate(0.000000, 4.166654)'%3E%3Cg id='Group' transform='translate(80.250000, 46.329408)'%3E%3Cg id='Tablehead' transform='translate(162.000000, 2.000000)'%3E%3Cg id='Stacked-Group'%3E%3Cg%3E%3Cg id='Filter-Copy-menu_option' transform='translate(39.000000, 0.000000)'%3E%3Cg id='menu_option'%3E%3Cg id='Filter-Search' transform='translate(-0.000000, 0.000000)'%3E%3Cpath d='M9.96875,14.4375 C12.4367725,14.4375 14.4375,12.4367725 14.4375,9.96875 C14.4375,7.50072752 12.4367725,5.5 9.96875,5.5 C7.50072752,5.5 5.5,7.50072752 5.5,9.96875 C5.5,12.4367725 7.50072752,14.4375 9.96875,14.4375 Z M9.96875,15.8125 C6.74133599,15.8125 4.125,13.196164 4.125,9.96875 C4.125,6.74133599 6.74133599,4.125 9.96875,4.125 C13.196164,4.125 15.8125,6.74133599 15.8125,9.96875 C15.8125,13.196164 13.196164,15.8125 9.96875,15.8125 Z M13.2202912,13.9821747 C13.0099029,13.7717864 13.0099029,13.4306796 13.2202912,13.2202912 C13.4306796,13.0099029 13.7717864,13.0099029 13.9821747,13.2202912 L17.0297088,16.2678253 C17.2400971,16.4782136 17.2400971,16.8193204 17.0297088,17.0297088 C16.8193204,17.2400971 16.4782136,17.2400971 16.2678253,17.0297088 L13.2202912,13.9821747 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 10px 9px;
        text-indent: 15px;
        width: 210px;
        height: 34px;
        border: 1px solid #D0D6DD;
        border-radius: 2px;
        padding-left: 15px;
        padding-right: 15px;
        margin: 9px 0;
        color: #4E617B;
        &::placeholder &::-moz-placeholder {
          opacity: 0.5;
          color: #4E617B;
          font-size: 12px;
          line-height: 15px;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
  .tableheader-cms-media {
    .modal-class {
      left : 40%;
      transform: translateX(-40%);
    }
  }
  .popup-dropdown {
    &.modal-class {
      position: relative;
      left: unset;
      transform: unset;
      width: inherit;
      height: inherit;
    }
    .modal-content {
      height: inherit;
      padding: 5px 0;
      display: flex;
      align-items: center;
      border: 0;
      box-shadow: unset;
      input {
        width: inherit;
        margin: 0;
        border: 0;
        border-radius: 3px;
        height: inherit;
        background: none !important;
        text-indent: 0 !important;
        padding-left: 5px;
        padding-right: 5px;
      }
      .search-img {
        display: none;
      }
    }
  }
</style>
