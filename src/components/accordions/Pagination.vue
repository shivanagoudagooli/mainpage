<template>
<div>
  <ul class="pagination">
    <li 
      class="pagination-item"
    >
      <button 
        type="button" 
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        aria-label="Go to first page"
        class="button-paginate"
      >
        First
      </button>
    </li>

    <li
      class="pagination-item"
    >
      <button 
        v-if="!hidePrevious"
        type="button" 
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
        class="button-paginate"
      >
        Previous
      </button>
    </li>

    <li v-for="(page,index) in pages" class="pagination-item" :key="index">
      <button
        class="pageno"
        type="button" 
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"
        
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button 
        type="button"
        v-if="!pageIsNotFond && !isInLastPage" 
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
        class="button-paginate"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button 
        type="button" 
        @click="onClickLastPage"
        :disabled="isInLastPage"
        aria-label="Go to last page"
        class="button-paginate"
      >
        Last
      </button>
    </li>
    <li class="pagination-item">
      <span class="jump-text"> Jump to Page</span>
      <input type="type" onkeypress="return (event.charCode !=8 && event.charCode ==0 || ( event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)))" v-model="bInput" class="number-box m-textbox" />
      <button 
        type="button" 
        @click="onClickGoPage"
        aria-label="Go to selected page"
        class="button-paginatetopage"
      >
        GO
      </button>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name:'paginate',
  data () {
    return {
      bInput: ''
    }
  },
  props: {
      maxVisibleButtons: {
          type: Number,
          required: false,
          default: 3
      },
      totalPages: {
          type: Number,
          required: true
      },
      total: {
          type: Number,
          required: false
        },
      currentPage: {
          type: Number,
          required: true
      },
      hidePrevious: {
          type: Boolean,
      }
  },
  computed: {
      startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons+1;
      }
      // When in between
      return this.currentPage - 1;
    },
     endPage() {
      
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      
    },
    pages() {
      const range = [];

      for (let i = this.startPage;i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },
    pageIsNotFond () {
      // console.log(this.currentPage > this.totalPages, 'this.currentPage > this.totalPages')
      return this.currentPage > this.totalPages
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);    
    },
    onClickGoPage() {
      this.$emit('pagechanged', parseInt(this.bInput));    
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
}

</script>

<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  // display:flex;
  float: right;
  margin-bottom: 30px;
  height:22px;
  width:393px;
  cursor: pointer;
}

.pagination-item {
  display: inline-block;
  font-size: 22px;
}

.active {
  background-color: #0978FC;
  color: white;
  border:none;
}

button,li,ul{
  margin: 0;
}
button{
  height:22px;
  width:41px;
  color: #576175;
  background-color: white;
  // font-family: 'Roboto',sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  box-shadow: none;
  border:1px solid rgba(155,160,173,0.49);
}
.jump-text {
  height:22px;
  padding: 2px 12px;
  width:120px;
  color: #576175;
  // background-color: #e7e7e7;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  box-shadow: none;
}
.number-box {
  height:19px;
  width:45px;
  color: #576175;
  background-color: white;
  // font-family: 'Roboto',sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  box-shadow: none;
  border:1px solid rgba(155,160,173,0.49);
}
.m-textbox {
    border-radius: 2px;
    // padding: 5px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      opacity: 0.5;
    }
  }
.pagination-item button:active {
  outline: 0;
  
//   border: 0;
 }
.pagination-item button:focus {
 outline: 0;
 
  // border: 0;
}

.pagination-item button:hover{
  cursor: pointer;
  color:black;
}
.button-paginate[disabled] {
  cursor: not-allowed !important;
  color: grey;
}
.button-paginatetopage {
  height:23px !important;
  width:31px !important;
  cursor:pointer;
  background-color: #0978FC;
  color: white;
  border:none;
}
.pagination-item button:active{
  color: black;
}

.pageno{
  height:22px;
  width:auto;   
  padding: 0 10px 0 10px;
  // font-family: 'Roboto',sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
}
</style>