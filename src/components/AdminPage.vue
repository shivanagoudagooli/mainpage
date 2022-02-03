<template>
  <div class="hello">
    <div class="data-count">{{msg}}</div>
    <div class="delete-btn"><Button primary :plus="false" class="btn-style" :mButtonProperty="mButtonProperty" @on-btn-click="deleteContent()">Delete Selected</Button></div>
    <Tabel class="table-stripped" 
    :mTableProperty="mTableProperty" 
    :headerArray="jobHeader" 
    :data="jobData" 
    :offset="offset" 
    :prechecked="setPrechecked"
    @filters="getFilterData($event)"/>
    <Pagination class="tw__pagination"
      :totalPages="perPage"
      :maxVisibleButtons="maxVisibleButtons"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
      :hidePrevious="true"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AdminPage',
  data () {
    return {
      mButtonProperty: {},
      mTableProperty: {},
      perPage:0,
      maxVisibleButtons:3,
      currentPage:1,
      jobHeader: [],
      jobData: [],
      offset: 0
    }
  },
  props: {
    msg: String
  },
  computed: {
    // ...mapGetters(["getListFilteredJobTranscode"]),
    setPrechecked() {
      let getList = [];
      getList = this.jobData.map((val) => {
        return val;
      });
      console.log("getaList", getList);
      return getList;
    },
  },
  created () {
    this.mTableProperty = {
      width: "90vw"
    };
    this.mButtonproperty = {
      defaultProperty: {
        height: "35px",
        width: "100%"
      }
    };
  this.jobHeader = [
        {
          type: "smallColumn",
          textHeader: "INDEX",
          filterType: false,
          valueType: "index",
          value: 1
        },
        {
          type: "lg5",
          textHeader: "NAME",
          valueType: "column",
          value: "name",
          filterType: "search",
          filterData: {
            label: "Name",
            showfilter: false,
            filterName: "nameQuery",
            default: ""
          }
        },
        {
          type: "lg5",
          textHeader: "EMAIL",
          valueType: "column",
          value: "email",
          filterType: "search",
          filterData: {
            label: "Email",
            showfilter: false,
            filterName: "emailQuery",
            default: ""
          }
        },
        {
          type: "lg5",
          textHeader: "ROLE",
          valueType: "column",
          value: "role",
          filterType: "search",
          filterData: {
            label: "Role",
            showfilter: false,
            filterName: "roleQuery",
            default: ""
          },
        },
        {
          type: "sm3",
          valueType: "checkbox",
          textHeader: "SELECT",
          value: "id",
          checkArr: {
            checked: (checkedArr, index) => {
              console.log("checkedArr",index,[...checkedArr])
            },
          },
        },
        {
          type: "text",
          textHeader: "ACTIONS",
          filterType: false,
          valueType: "action",
          value: {
            edit: row => {
              console.log(row);
            },
            delete: row => {
              console.log(row);
            }
          }
        }
  ]
  this.getData()
  },
  watch: {
    perPage () {
      if (this.perPage > 3) {
        this.maxVisibleButtons = 3
      } else {
        this.maxVisibleButtons = this.perPage
      }
    }
  },
  methods: {
    ...mapActions(['actGetData']),
    onPageChange (page = "") {
      if (page) {
        this.offset = (page - 1) * 10
        this.getData(page)
      } else {
        let page = this.currentPage
        this.getData(page)
      }
    },
    getData(page = 1){
      this.currentPage = page
      this.actGetData().then((res) => {
      console.log(this.currentPage, 'this.currentPage')
        if (res.errorcode) {
          this.perPage = 0
          this.jobData = []
        } else if (res.length) {
          if (res.length <= 10) {
            this.currentPage = 1
          }
          if(this.currentPage === 1) {
            this.jobData = res.slice(0,10)
          } else if(this.currentPage === 2) {
            this.jobData = res.slice(10,20)
          } else if(this.currentPage === 3) {
            this.jobData = res.slice(20,30)
          } else if(this.currentPage === 4) {
            this.jobData = res.slice(30,40)
          } else if(this.currentPage === 5) {
            this.jobData = res.slice(40,50)
          }
          console.log(this.jobData, 'this.jobData')
          this.offset = (page - 1) * 10
        }
        this.perPage = []
        this.perPage = Math.ceil(res.length / 10)
        // this.$eventHub.$emit('Loader', false)
      }).catch((error) => {
        if (error.status === 400) {
          // this.perPage = 0
          // this.promotionData = []
          // this.promotionCount = 0
        }
        // this.$eventHub.$emit('Loader', false)
        if (error.status === 401) {
          console.log(error)
        }
      })
    },
    getFilterData(data) {
      console.log(data, 'data')
    },
    deleteContent() {
      console.log("clicked")
    }
  },
  components : {
    Tabel: () => import("@/components/accordions/TableHeader.vue"),
    Pagination: () => import("@/components/accordions/Pagination.vue"),
    Button: () => import("@/components/accordions/Button.vue")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello {
    padding: 0 4% 4%;
  }
  .delete-btn {
    margin-top: 15px;
    padding-top: 12px;
    position: relative;
    margin-left: 87.5%;
  }
  .btn-style {
    border-radius: 14px !important;
  }
  .data-count {
    float: left;
    margin-top: 12px;
    color: #1f2631;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 19px;    
  }
  .table-wrapper {
    margin-bottom: 12%;
  }
</style>
