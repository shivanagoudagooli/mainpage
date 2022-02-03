<template>
  <div id="modal" class="modal-class" v-show="showCategory" ref="categoryPopup" @click="closeCategoryPopup">
    <div class="modal-content radio-content category" @click="stopClose">
      <div class="input-content">
        <div class="search-img" @click="filterValue">
          <svg width="10px" height="11px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
            <title>Close</title>
            <desc>Created with sketchtool.</desc>
            <g id="components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Table-dropdown-Style" transform="translate(-1036.000000, -327.000000)" fill="#A7B1C6">
                    <g id="Filter_value_selected" transform="translate(696.000000, 255.000000)">
                        <g id="Group-5" transform="translate(0.000000, 53.500000)">
                            <g id="Search" transform="translate(334.000000, 13.000000)">
                                <g id="ic_close" transform="translate(5.445163, 5.445163)">
                                    <path d="M12.0619686,0.928448996 L12.1008161,0.9687893 C12.5137832,1.39746825 12.5137832,2.09262161 12.1008918,2.52137918 L8.16562763,6.60688082 L12.1008918,10.6923825 C12.4862571,11.0925562 12.5119481,11.7247903 12.1779033,12.1558415 L12.1008161,12.2449723 L12.0619686,12.2853127 C11.6766034,12.6854864 11.0677652,12.7121646 10.6526036,12.3653474 L10.5667568,12.2853127 L6.60458526,8.17088625 L2.64813207,12.2793745 C2.26276683,12.6795483 1.65392866,12.7062265 1.23876702,12.3594093 L1.15292027,12.2793745 L1.11287927,12.2377949 C0.727949313,11.8380732 0.701822111,11.2067024 1.03482989,10.7755383 L1.11168578,10.6863677 L5.06007614,6.60688082 L1.11168578,2.52739393 C0.69992028,2.09843697 0.700454316,1.40424004 1.11287927,0.975966777 L1.15292027,0.934387118 C1.56581161,0.505629555 2.23524074,0.505629555 2.64813207,0.934387118 L6.60458526,5.0428754 L10.5667568,0.928448996 C10.9796482,0.499691433 11.6490773,0.499691433 12.0619686,0.928448996 Z" id="Path"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
          </svg>
        </div>
        <input type="text" class="placeholder" v-model="filterVal" @click="stopClose" :placeholder="placeValue" :style="getStyle()" />
      </div>
      <div class="list-label">
        <div v-for="(r, index) in categoryOptions" :key="index">
          <li @click="changeValue(r.value)" :class="{'active':(categoryFilter===r.value)}" v-show="itemVisible(r.text)"><span class="item-text" v-if="r.text"><span v-for="(i, index) in getTextValue(r.text)" :key="index" :title="getTextValue(r.text).join('  ')">{{ i }}</span></span>
            <div class="check" @click="changeValue(r.value)"></div>
          </li>
        </div>
        <li class="item-text" v-show="!getVisibleItem">Sorry, no matching options</li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterResult',
  data () {
    return {
      categoryOptions: [],
      categoryFilter: 'all',
      placeValue: '',
      filterVal: '',
      showFilterImg: true
    }
  },
  props: {
    showCategory: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: ''
    },
    optionsArray: {
      type: Array,
      default: () => [
        {text: 'All', value: 'all'},
        {text: 'Content1', value: 'Content1'},
        {text: 'Content2', value: 'Content2'},
      ]
    },
    query: {
      type: String,
      default: 'all'
    },
    mFilterProperty: {
      type: Object,
      default () {
        return {
          textColor: '#4E617B',
          bgPopup: '#fff',
          borderPopup: '#D0D6DD',
          borderInput: '#0978FC',
          fillFilter: '#0978FC',
          fillClose: '#D4DAE4'
        }
      }
    }
  },
  computed: {
    getVisibleItem () {
      let val = false
      if (this.filterVal !== '') {
        for (let item in this.categoryOptions) {
          let currentName = this.categoryOptions[item].text.toLowerCase()
          let currentInput = this.filterVal.toLowerCase()
          let myPattern = new RegExp('(\\w*'+currentInput+'\\w*)','gi')
          let matches = currentName.match(myPattern)
          if (matches) {
            val = true
          }
        }
      } else {
        val = true
      }
      return val
    }
  },
  components: {
  },
  watch: {
    categoryFilter () {
      this.$emit('categoryEvent', this.categoryFilter)
      this.$emit('cancelCategory', false)
    },
    showCategory () {
      this.filterVal = ''
    },
    query () {
      this.categoryFilter = this.query
    },
    filterVal () {
      let regesx = /(^$|^[0-9a-zA-Z_ @./-]+$)/
      if (!regesx.test(this.filterVal)) {
          let val = this.filterVal.split('')
          val.splice(this.filterVal.length-1, 1)
          val = val.join('')
          this.filterVal = val
        }
      this.getStyle()
    }
  },
  created () {
    this.categoryOptions = this.optionsArray
    this.placeValue = `Search ${this.labelName}`
    this.categoryFilter = this.query
  },
  methods: {
    closeCategoryPopup () {
      if (event.target !== this.$refs.categoryPopup) {
        this.$emit('closeCategory', false)
      }
    },
    getTextValue (text) {
      let value = []
      let isHash = text.includes('#')
      if (isHash) {
        value = text.split('#')
      } else {
        value.push(text)
      }
      return value
    },
    getStyle () {
      let val = ''
      if (this.filterVal.length) {
        val = {
          backgroundImage: 'none',
          textIndent: 0
        }
      }
      return val
    },
    cancelCategoryPopup () {
      event.preventDefault()
      this.$emit('cancelCategory', false)
    },
    changeValue (value) {
      this.categoryFilter = value
    },
    stopClose () {
      event.stopPropagation()
    },
    filterValue () {
      this.$emit('cancelCategory', false)
    },
    itemVisible (item) {
      let val = ''
      if (this.filterVal === '') {
        val = true
      } else {
        let current = item.toLowerCase()
        let currentInput = this.filterVal.toLowerCase()
        return current.includes(currentInput)
      }
      return val
    }
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
    background-color: #fff;
    .modal-content {
      width: 100%;
      height: auto;
      margin: 0;
      padding: 0;
      float:none;
      border-radius: 2px;
      border: 1px solid #D0D6DD;
      background-color: #fff;
      box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.15);
      .input-content {
        background: #fff;
        height: 65px;
        position: relative;
        display: flex;
        flex-direction: column;
        input {
          width: 190px;
          padding: 5px 5px;
          margin: 6px 25px 15px 20px;
          border: 0;
          height: 38px;
          background: #fff;
          background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='12px' height='12px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 57.1 (101010) - https://sketch.com --%3E%3Ctitle%3EF9560F91-9B7A-49CA-8D88-32883613B718@2x%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='01vlive_suport_tickets' transform='translate(-373.000000, -128.000000)' fill='%23C3C3C3' fill-rule='nonzero'%3E%3Cg id='Group-4' transform='translate(88.000000, 72.000000)'%3E%3Cg id='Table_constants' transform='translate(0.000000, 4.166654)'%3E%3Cg id='Group' transform='translate(80.250000, 46.329408)'%3E%3Cg id='Tablehead' transform='translate(162.000000, 2.000000)'%3E%3Cg id='Stacked-Group'%3E%3Cg%3E%3Cg id='Filter-Copy-menu_option' transform='translate(39.000000, 0.000000)'%3E%3Cg id='menu_option'%3E%3Cg id='Filter-Search' transform='translate(-0.000000, 0.000000)'%3E%3Cpath d='M9.96875,14.4375 C12.4367725,14.4375 14.4375,12.4367725 14.4375,9.96875 C14.4375,7.50072752 12.4367725,5.5 9.96875,5.5 C7.50072752,5.5 5.5,7.50072752 5.5,9.96875 C5.5,12.4367725 7.50072752,14.4375 9.96875,14.4375 Z M9.96875,15.8125 C6.74133599,15.8125 4.125,13.196164 4.125,9.96875 C4.125,6.74133599 6.74133599,4.125 9.96875,4.125 C13.196164,4.125 15.8125,6.74133599 15.8125,9.96875 C15.8125,13.196164 13.196164,15.8125 9.96875,15.8125 Z M13.2202912,13.9821747 C13.0099029,13.7717864 13.0099029,13.4306796 13.2202912,13.2202912 C13.4306796,13.0099029 13.7717864,13.0099029 13.9821747,13.2202912 L17.0297088,16.2678253 C17.2400971,16.4782136 17.2400971,16.8193204 17.0297088,17.0297088 C16.8193204,17.2400971 16.4782136,17.2400971 16.2678253,17.0297088 L13.2202912,13.9821747 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: 4px 7px;
          text-indent: 21px;
          color: #4E617B;
          border-bottom: 1px solid #D8D8D8;
          &:focus {
            outline: none;
          }
          &::placeholder {
            opacity: .5;
            color: #4E617B;
          }
        }
        .search-img {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-left: 23px;
          margin-top: 15px;
          svg {
            cursor: pointer;
            width: 15px;
            position: relative;
            right: 14px;
            &:hover {
              path {
                fill: #0978FC;
              }
            }
          }
        }
      }
      .list-label {
        text-align: left;
        padding-left: 25px;
        font-size: 15px;
        padding-right: 15px;
        line-height: 35px;
        color: #7d7e80;
        background: #fff;
        max-height: 170px;
        padding-top: 10px;
        overflow: auto;
        margin-right: 4px;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track {
          background : rgba(235, 235, 235, .3);
          border-radius: 2.5px;
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background : #EBEBEB;
          border-radius: 2.5px;
          width: 5px;
        }
      }
      li {
        color: #576175;
        list-style: none;
        text-align: left;
        font-size: 15px;
        font-weight: 500;
        line-height: 35px;
        padding-left: 55px;
        margin-left: -25px;
        font-family: "Open Sans Medium";
        cursor: pointer;
        position: relative;
        &:hover {
          background: #F9F9F9;
          .check {
            border: 2px solid #0978FC;
          }
        }
        &.active {
          color: #0978FC;
          span {
            &.item-text {
              span {
                &:nth-child(2) {
                  color: #1F2631;
                  opacity: 1;
                }
              }
            }
          }
        }
        &.active {
          .check {
            border: 2px solid #0978FC;
            &:before {
              background: #0978FC;
            }
          }
        }
        .check {
          display: block;
          position: absolute;
          border: 2px solid #D0D3D7;
          border-radius: 100%;
          height: 16px;
          width: 16px;
          top: 50%;
          transform: translateY(-50%);
          left: 20px;
          z-index: 5;
          transition: border .25s linear;
          -webkit-transition: border .25s linear;
          &:before {
            display: block;
            position: absolute;
            content: '';
            border-radius: 100%;
            height: 8px;
            width: 8px;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;
            margin: auto;
            transition: background 0.25s linear;
            -webkit-transition: background 0.25s linear;
          }
        }
        span {
        &.item-text {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          justify-content: space-between;
          span {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            font-size: 1vw;
            font-family: "Open Sans Medium";
            flex: 1;
            &:nth-child(2) {
              opacity: 0.3;
              display: flex;
              justify-content: flex-end;
            }
          }
          &:hover {
            span {
              &:nth-child(2) {
              opacity: 1;
              }
            }
          }
        }
      }
      }
    }
  }
</style>
