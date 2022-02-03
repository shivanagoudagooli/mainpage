<template>
  <div @click="closePopup" class="table-chip-wrapper">
    <div class="chip-wrapper">
      <div class="chip-row" v-for="(item,index) in this.getHeaderArray" :key="index">
        <div class="chip-col" v-if="item.filterType !== 'false'">
          <Chip class="chip-col-div" v-if="(item.filterType === 'search' && getQueryData(index)!== '')" :value="getQueryData(index)" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="(item.filterType === 'searchnumber' && getQueryData(index)!== '')" :value="getQueryData(index)" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="(item.filterType === 'searchinteger' && getQueryData(index)!== '')" :value="getQueryData(index)" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="item.filterType === 'dateYear' && getTempFilter(index) && getQueryData(index)!== ''" :value="getDateFormat(getQueryData(index))" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="item.filterType === 'noMaxDate' && getTempFilter(index) && getQueryData(index)!== ''" :value="getDateFormat(getQueryData(index))" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="item.filterType === 'minDate' && getTempFilter(index) && getQueryData(index)!== ''" :value="getDateFormat(getQueryData(index))" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="item.filterType === 'dropDown' && getQueryData(index) && getQueryData(index)!== 'all'" :value="getQueryData(index)" :property="item.filterType" :title="getFilterLabel(index)" @remove="changeDefaultChipValue($event, index)"/>
          <Chip class="chip-col-div" v-if="item.filterType === 'dateRange' && getTempFilter(index)" :value="getRange(tempFilterValue.toDate, tempFilterValue.fromDate)" :property="item.filterType" :title="'Range'" @remove="changeSpecValue($event, index)"/>
        </div>
      </div>
      <div v-if="showClearAll" class="clear-filter" @click="clearFilterData()">CLEAR FILTERS</div>
    </div>
    <div :class="['table-wrapper', {'data-table': getDataLength()}, {'scrolltable': isPopupOpen}]">
      <div :class="'flex-table header ' + getCustomHeaderClass()" :style="{...tableSecondary? {'background':'#F0F0F0'}: {'background':'#FFF'}, ...tableStyles}">
        <div v-for="(head, index) in getHeaderArray" :key="index" :class="getColumnHeaderClass(head)">
          <span v-if="head.filterType === 'dateRange' || head.filterType === 'dateYear' || head.filterType === 'noMaxDate' || head.filterType === 'minDate'" class="sort-img" @click="getSort(index)">
            <svg class="up-triangle" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="8px" height="7px" viewBox="0 0 96.154 96.154" style="enable-background:new 0 0 96.154 96.154;"
            xml:space="preserve">
              <g>
              <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
              c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
              c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z" id="analytics" :fill="getUpFill(head.value)" fill-rule="nonzero"></path>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g><g></g><g></g><g></g><g></g>
            </svg>
            <svg class="down-triangle" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="8px" height="7px" viewBox="0 0 96.154 96.154" style="enable-background:new 0 0 96.154 96.154;"
            xml:space="preserve">
              <g>
              <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
              c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
              c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z" id="analytics" :fill="getDownFill(head.value)" fill-rule="nonzero"></path>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g><g></g><g></g><g></g><g></g>
            </svg>
          </span>
          <span v-else-if="head.filterType === 'sort'" class="sort-img" @click="getSortVal(index)">
            <svg class="up-triangle" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="8px" height="7px" viewBox="0 0 96.154 96.154" style="enable-background:new 0 0 96.154 96.154;"
            xml:space="preserve">
              <g>
              <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
              c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
              c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z" id="analytics" :fill="getUpFillValue(head.value)" fill-rule="nonzero"></path>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g><g></g><g></g><g></g><g></g>
            </svg>
            <svg class="down-triangle" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="8px" height="7px" viewBox="0 0 96.154 96.154" style="enable-background:new 0 0 96.154 96.154;"
            xml:space="preserve">
              <g>
              <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
              c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
              c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z" id="analytics" :fill="getDownFillValue(head.value)" fill-rule="nonzero"></path>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g><g></g><g></g><g></g><g></g>
            </svg>
          </span>
          {{head.textHeader}}
          <span v-if="head.valueType === 'checkbox'" class="checkbox-wrap">
            <Checkbox :checked="allSelected" @checkClick="selectAll($event, head.value)" :valueCheck="allSelected" />
          </span>
          <span v-if="head.filterType === 'search'" class="filter" @click="openPopup(index)">
            <svg class="popup-image" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
              <title>Search</title>
              <desc>Created with sketchtool.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Skin_css" transform="translate(-485.000000, -541.000000)" :fill="getFillColor(index, head.filterType)" fill-rule="nonzero">
                  <g id="Search" transform="translate(154.000000, 519.000000)">
                    <g transform="translate(325.656250, 16.514719)" id="Combined-Shape">
                      <path d="M14.5,6 C19.1944204,6 23,9.80557963 23,14.5 C23,16.4700046 22.3298202,18.2834802 21.2050133,19.7248744 C21.245345,19.7529545 21.2839865,19.786059 21.3205061,19.8225786 L25,23.5020725 C25.3905243,23.8925968 25.3905243,24.5257618 25,24.9162861 C24.6094757,25.3068104 23.9763107,25.3068104 23.5857864,24.9162861 L19.9062926,21.2367922 C19.8729805,21.2034801 19.84251,21.1684026 19.814881,21.1318607 C18.3611348,22.3007882 16.5122222,23 14.5,23 C9.80557963,23 6,19.1944204 6,14.5 C6,9.80557963 9.80557963,6 14.5,6 Z M14.5,8 C10.9101491,8 8,10.9101491 8,14.5 C8,18.0898509 10.9101491,21 14.5,21 C18.0898509,21 21,18.0898509 21,14.5 C21,10.9101491 18.0898509,8 14.5,8 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <SearchPopup class="popup" :show="isShowFilter(index)" @searchEvent="changeDefaultValue($event,index)" :query="getQueryData(index)" :searchLabel="getFilterLabel(index)" @close="closeSpecPopup($event, index)"/>
          </span>
          <span v-if="head.filterType === 'searchnumber'" class="filter" @click="openPopup(index)">
            <svg class="popup-image" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
              <title>Search</title>
              <desc>Created with sketchtool.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Skin_css" transform="translate(-485.000000, -541.000000)" :fill="getFillColor(index, head.filterType)" fill-rule="nonzero">
                  <g id="Search" transform="translate(154.000000, 519.000000)">
                    <g transform="translate(325.656250, 16.514719)" id="Combined-Shape">
                      <path d="M14.5,6 C19.1944204,6 23,9.80557963 23,14.5 C23,16.4700046 22.3298202,18.2834802 21.2050133,19.7248744 C21.245345,19.7529545 21.2839865,19.786059 21.3205061,19.8225786 L25,23.5020725 C25.3905243,23.8925968 25.3905243,24.5257618 25,24.9162861 C24.6094757,25.3068104 23.9763107,25.3068104 23.5857864,24.9162861 L19.9062926,21.2367922 C19.8729805,21.2034801 19.84251,21.1684026 19.814881,21.1318607 C18.3611348,22.3007882 16.5122222,23 14.5,23 C9.80557963,23 6,19.1944204 6,14.5 C6,9.80557963 9.80557963,6 14.5,6 Z M14.5,8 C10.9101491,8 8,10.9101491 8,14.5 C8,18.0898509 10.9101491,21 14.5,21 C18.0898509,21 21,18.0898509 21,14.5 C21,10.9101491 18.0898509,8 14.5,8 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <SearchPopup :type="'number'" class="popup" :show="isShowFilter(index)" @searchEvent="changeDefaultValue($event,index)" :query="getQueryData(index)" :searchLabel="getFilterLabel(index)" @close="closeSpecPopup($event, index)"/>
          </span>
          <span v-if="head.filterType === 'searchinteger'" class="filter" @click="openPopup(index)">
            <svg class="popup-image" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
              <title>Search</title>
              <desc>Created with sketchtool.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Skin_css" transform="translate(-485.000000, -541.000000)" :fill="getFillColor(index, head.filterType)" fill-rule="nonzero">
                  <g id="Search" transform="translate(154.000000, 519.000000)">
                    <g transform="translate(325.656250, 16.514719)" id="Combined-Shape">
                      <path d="M14.5,6 C19.1944204,6 23,9.80557963 23,14.5 C23,16.4700046 22.3298202,18.2834802 21.2050133,19.7248744 C21.245345,19.7529545 21.2839865,19.786059 21.3205061,19.8225786 L25,23.5020725 C25.3905243,23.8925968 25.3905243,24.5257618 25,24.9162861 C24.6094757,25.3068104 23.9763107,25.3068104 23.5857864,24.9162861 L19.9062926,21.2367922 C19.8729805,21.2034801 19.84251,21.1684026 19.814881,21.1318607 C18.3611348,22.3007882 16.5122222,23 14.5,23 C9.80557963,23 6,19.1944204 6,14.5 C6,9.80557963 9.80557963,6 14.5,6 Z M14.5,8 C10.9101491,8 8,10.9101491 8,14.5 C8,18.0898509 10.9101491,21 14.5,21 C18.0898509,21 21,18.0898509 21,14.5 C21,10.9101491 18.0898509,8 14.5,8 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <SearchPopup :subtype="'integer'" :type="'number'" class="popup" :show="isShowFilter(index)" @searchEvent="changeDefaultValue($event,index)" :query="getQueryData(index)" :searchLabel="getFilterLabel(index)" @close="closeSpecPopup($event, index)"/>
          </span>
          <span v-else-if="head.filterType === 'dropDown'" class="filter" @click="openPopup(index)">
            <svg class="popup-image" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
              <title>Filter</title>
              <desc>Created with sketchtool.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Skin_css" transform="translate(-901.000000, -126.000000)" :fill="getFillColor(index, head.filterType)" fill-rule="nonzero">
                  <g id="Filter" transform="translate(569.000000, 103.500000)">
                    <g id="Search" transform="translate(331.656250, 22.514719)">
                      <path d="M0.685877173,2.28093461 C0.190895047,1.51265266 0.742471925,0.501146053 1.65639997,0.501146053 L18.3437188,0.501146053 C19.2396131,0.501146053 19.7941227,1.47720289 19.3354246,2.24676299 L13.2661737,12.4291771 L13.2661737,18.3429733 C13.2661737,19.1869408 12.390173,19.7456865 11.6248902,19.3898448 L7.90583654,17.6605566 C7.49857671,17.4711886 7.23810312,17.0628185 7.23810312,16.6136851 L7.23810312,12.4509118 L0.685877173,2.28093461 Z M8.86313435,11.4859232 C8.98324559,11.6723528 9.04711999,11.8894316 9.04711999,12.1112033 L9.04711999,15.8772968 L11.4571568,17.1727005 L11.4571568,12.1112033 C11.4571568,11.9030953 11.513408,11.6988566 11.6199594,11.5200948 L17.0190597,2.155427 L2.91446547,2.155427 L8.86313435,11.4859232 Z" id="Filter"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <FilterResult class="popup filter-popup" :showCategory="isShowFilter(index)" :labelName="getFilterLabel(index)"
            @categoryEvent="changeDefaultValue($event,index)" :optionsArray="getOptionData(index)" :query="getQueryData(index)" @cancelCategory="closeSpecPopup($event, index)" />
          </span>
          <span v-else-if="head.filterType === 'dateYear' || head.filterType === 'dateRange' || head.filterType === 'noMaxDate' || head.filterType === 'minDate'"  @click="openPopup(index)" class="date-filter filter">
            <svg class="popup-image calendar-popup" width="22px" height="24px" viewBox="0 0 26 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
              <title></title>
              <desc>Created with sketchtool.</desc>
              <g id="Components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Place-holders" transform="translate(-330.000000, -413.000000)">
                      <g id="Ic_edit1-Copy-14" transform="translate(327.000000, 410.500000)">
                          <g id="menu_option"></g>
                          <g id="interface-(2)" transform="translate(3.000000, 3.000000)" :fill="getFillColor(index, head.filterType)" fill-rule="nonzero">
                              <path d="M19.55,13.5 C22.886,13.5 25.6,16.214 25.6,19.55 C25.6,22.886 22.886,25.6 19.55,25.6 C16.214,25.6 13.5,22.886 13.5,19.55 C13.5,16.214 16.214,13.5 19.55,13.5 Z M19.3,-4.97379915e-14 C19.8523,-4.97379915e-14 20.3,0.4477 20.3,1 L20.3,1 L20.3,2 L21.6,2 C23.8056,2 25.6,3.7944 25.6,6 L25.6,6 L25.6,11.7 C25.6,12.2523 25.1523,12.7 24.6,12.7 C24.0477,12.7 23.6,12.2523 23.6,11.7 L23.6,11.7 L23.6,6 C23.6,4.8972 22.7028,4 21.6,4 L21.6,4 L20.3,4 L20.3,5 C20.3,5.5523 19.8523,6 19.3,6 C18.7477,6 18.3,5.5523 18.3,5 L18.3,5 L18.3,4 L13.75,4 L13.75,5 C13.75,5.5523 13.3023,6 12.75,6 C12.1977,6 11.75,5.5523 11.75,5 L11.75,5 L11.75,4 L7.25,4 L7.25,5 C7.25,5.5523 6.8023,6 6.25,6 C5.6977,6 5.25,5.5523 5.25,5 L5.25,5 L5.25,4 L4,4 C2.8972,4 2,4.8972 2,6 L2,6 L2,21.6 C2,22.7028 2.8972,23.6 4,23.6 L4,23.6 L11.65,23.6 C12.2023,23.6 12.65,24.0477 12.65,24.6 C12.65,25.1523 12.2023,25.6 11.65,25.6 L11.65,25.6 L4,25.6 C1.7944,25.6 2.53663757e-12,23.8056 2.53663757e-12,21.6 L2.53663757e-12,21.6 L2.53663757e-12,6 C2.53663757e-12,3.7944 1.7944,2 4,2 L4,2 L5.25,2 L5.25,1 C5.25,0.4477 5.6977,-4.97379915e-14 6.25,-4.97379915e-14 C6.8023,-4.97379915e-14 7.25,0.4477 7.25,1 L7.25,1 L7.25,2 L11.75,2 L11.75,1 C11.75,0.4477 12.1977,-4.97379915e-14 12.75,-4.97379915e-14 C13.3023,-4.97379915e-14 13.75,0.4477 13.75,1 L13.75,1 L13.75,2 L18.3,2 L18.3,1 C18.3,0.4477 18.7477,-4.97379915e-14 19.3,-4.97379915e-14 Z M19.55,15.5 C17.31685,15.5 15.5,17.3168 15.5,19.55 C15.5,21.7832 17.31685,23.6 19.55,23.6 C21.78315,23.6 23.6,21.7832 23.6,19.55 C23.6,17.3168 21.78315,15.5 19.55,15.5 Z M19.55,16.5 C20.1023,16.5 20.55,16.9477 20.55,17.5 L20.55,17.5 L20.55,18.55 L21,18.55 C21.5523,18.55 22,18.9977 22,19.55 C22,20.1023 21.5523,20.55 21,20.55 L21,20.55 L19.55,20.55 C18.9977,20.55 18.55,20.1023 18.55,19.55 L18.55,19.55 L18.55,17.5 C18.55,16.9477 18.9977,16.5 19.55,16.5 Z M6.25,18.2 C6.80228475,18.2 7.25,18.6477153 7.25,19.2 C7.25,19.7522847 6.80228475,20.2 6.25,20.2 C5.69771525,20.2 5.25,19.7522847 5.25,19.2 C5.25,18.6477153 5.69771525,18.2 6.25,18.2 Z M10.6,18.2 C11.1522847,18.2 11.6,18.6477153 11.6,19.2 C11.6,19.7522847 11.1522847,20.2 10.6,20.2 C10.0477153,20.2 9.6,19.7522847 9.6,19.2 C9.6,18.6477153 10.0477153,18.2 10.6,18.2 Z M10.6,13.85 C11.1522847,13.85 11.6,14.2977153 11.6,14.85 C11.6,15.4022847 11.1522847,15.85 10.6,15.85 C10.0477153,15.85 9.6,15.4022847 9.6,14.85 C9.6,14.2977153 10.0477153,13.85 10.6,13.85 Z M6.25,13.85 C6.80228475,13.85 7.25,14.2977153 7.25,14.85 C7.25,15.4022847 6.80228475,15.85 6.25,15.85 C5.69771525,15.85 5.25,15.4022847 5.25,14.85 C5.25,14.2977153 5.69771525,13.85 6.25,13.85 Z M19.3,9.5 C19.8522847,9.5 20.3,9.94771525 20.3,10.5 C20.3,11.0522847 19.8522847,11.5 19.3,11.5 C18.7477153,11.5 18.3,11.0522847 18.3,10.5 C18.3,9.94771525 18.7477153,9.5 19.3,9.5 Z M14.95,9.5 C15.5022847,9.5 15.95,9.94771525 15.95,10.5 C15.95,11.0522847 15.5022847,11.5 14.95,11.5 C14.3977153,11.5 13.95,11.0522847 13.95,10.5 C13.95,9.94771525 14.3977153,9.5 14.95,9.5 Z M6.25,9.5 C6.80228475,9.5 7.25,9.94771525 7.25,10.5 C7.25,11.0522847 6.80228475,11.5 6.25,11.5 C5.69771525,11.5 5.25,11.0522847 5.25,10.5 C5.25,9.94771525 5.69771525,9.5 6.25,9.5 Z M10.6,9.5 C11.1522847,9.5 11.6,9.94771525 11.6,10.5 C11.6,11.0522847 11.1522847,11.5 10.6,11.5 C10.0477153,11.5 9.6,11.0522847 9.6,10.5 C9.6,9.94771525 10.0477153,9.5 10.6,9.5 Z" id="Combined-Shape"></path>
                          </g>
                      </g>
                  </g>
              </g>
            </svg>
            <!-- <DateRangeFilter v-if="head.filterType === 'dateRange'" class="popup" :showDate="isShowFilter(index)" :labelName="'SUBMIT'"
            @changeDate="tempChangeValue($event,index)" @changeFilter="commitTempFilter($event, index)" @cancelDate="closeSpecPopup($event, index)"
            :rangeDate="{'to': tempFilterValue.toDate, 'from': tempFilterValue.fromDate}"/>
            <DateFilter v-else-if="head.filterType === 'dateYear'" class="popup" :showDatePick="isShowFilter(index)" :labelName="'SUBMIT'" @changeDate="changeDefaultValue($event,index)" -->
            <!-- @changeFilter="commitTempFilter($event, index)" :maxDate="true" @cancelDate="closeSpecPopup($event, index)" :mDate="getQueryData(index)"/>
            <DateFilter v-else-if="head.filterType === 'noMaxDate'" class="popup" :showDatePick="isShowFilter(index)" :labelName="'SUBMIT'" @changeDate="changeDefaultValue($event,index)"
            @changeFilter="commitTempFilter($event, index)" :maxDate="false" @cancelDate="closeSpecPopup($event, index)" :mDate="getQueryData(index)"/>
            <DateFilter v-else-if="head.filterType === 'minDate'" class="popup" :showDatePick="isShowFilter(index)" :labelName="'SUBMIT'" @changeDate="changeDefaultValue($event,index)"
            @changeFilter="commitTempFilter($event, index)" :minDate="true" @cancelDate="closeSpecPopup($event, index)" :mDate="getQueryData(index)"/> -->
          </span>
        </div>
      </div>
      <TableBody class="tablebody"
        :data="sortedDataArray"
        :headerArray="headerArray"
        :fromComponent="fromComponent"
        :offset="offset"
        :allSelected="allSelected"
        :checkboxValue="checkboxValue"
        :counterArray ="counterArray"
        :selectChecked ="selectChecked"
        @changeCounterArr="counterArray=$event"
        @changeCheckedArr="selectChecked=$event"
        :tableStyles="tableStyles"
        :isCounter="isCounter"
        :prechecked="prechecked"
        @changeSelectAll="getSelectedAll($event)"
        :preRadioChecked="preRadioChecked"
      />
    </div>
  </div>
</template>

<script>
import { mVMixin } from '@/mixins.js'

export default {
  props: {
    data: {
      type: Array
    },
    headerArray: {
      type: [Array, Object],
      default: function () {
        return []
      }
    },
    fromComponent: {},
    offset: {
      type: Number
    },
    mTableProperty: {
      type: [Object, Array, String],
    },
    tableSecondary: {
      type: Boolean,
      default: false
    },
    prechecked: {
      type: [Boolean, Array],
      default: false
    },
    preRadioChecked: {
      type: [Boolean, Array, String, Number]
    }
  },
  data () {
    return {
      popupHeaders: [],
      tempFilterValue: [],
      filterData: [],
      allSelected: false,
      selectChecked: [],
      checkboxValue: '',
      counterArray: [],
      sortedDataArray: [],
      sortArray: {},
      sortArrayValue: {},
      showClearAll: false,
      tableStyles: {},
      isPopupOpen: false,
      isCounter: false
    }
  },
  mixins: [mVMixin],
  components: {
    SearchPopup: () => import('@/components/accordions/SearchPopup.vue'),
    FilterResult: () => import('@/components/accordions/DrodownFilter.vue'),
    // DateRangeFilter: () => import('@/components/DateRangeFilter.vue'),
    // DateFilter: () => import('@/components/DateFilter.vue'),
    TableBody: () => import('@/components/accordions/TableBody.vue'),
    Checkbox: () => import('@/components/accordions/Checkbox.vue'),
    Chip: () => import('@/components/accordions/FilterChip.vue')
  },
  mounted () {
    this.counterArray = new Array(this.data.length).fill(0)
    this.tempFilterValue.toDate = '',
    this.tempFilterValue.fromDate = ''
    this.sortedDataArray = this.data
    if (this.mTableProperty && this.mTableProperty.constructor === Object) {
      this.tableStyles = {...this.tableStyles, ...this.mTableProperty}
    }
    document.addEventListener('click', this.closePopup)
  },
  created () {
    if (this.headerArray.length > 9) {
      let val = this.headerArray.length
      let temp = (val - 9) * 10
      let widthVal = 100 + temp
      this.tableStyles = {
        width: widthVal + 'vw'
      } 
    }
  },
  watch: {
    data () {
      this.sortedDataArray = this.data
      this.getDataLength()
      this.isCounter = true
    },
    prechecked () {
      if (Array.isArray(this.prechecked)) {
        if (this.prechecked.length === 0) {
          this.allSelected = false
        }
      }
    },
    offset () {
      let checkIds = []
      for (let i in this.data) {
        checkIds.push(this.data[i].checkid)
      }
      if (this.allSelected) {
        this.allSelected = false
      }
      if (Array.isArray(this.prechecked)) {
        if (this.prechecked.length) {
          let counter = 0
          for (let j in checkIds) {
            for (let k in this.prechecked) {
              if (checkIds[j] == this.prechecked[k]) {
                counter++
              }
            }
          }
          if (counter === this.data.length) {
            this.allSelected = true
          }
        }
      }
    }
  },
  methods: {
    debounceSearch () {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.$emit('filters', this.filterData)
      }, 1000)
    },
    selectAll (event, val) {
      this.selectChecked = []
      this.allSelected = event
      this.checkboxValue = val
    },
    getSelectedAll (data) {
      if (this.allSelected) {
        this.allSelected = data
      }
    },
    getDataLength () {
      if (this.data.length) {
        return false
      } else {
        return true
      }
    },
    clearFilterData () {
      for (let i in this.getHeaderArray) {
        let filterType = this.getHeaderArray[i].filterType
        if (filterType === 'search' || filterType === 'searchnumber' || filterType === 'searchinteger' || filterType === 'dropDown' || filterType === 'dateYear' || filterType === 'noMaxDate' || filterType === 'minDate') {
          this.changeDefaultChipValue(filterType, i)
        } else if (filterType === 'dateRange') {
          this.changeSpecValue(filterType, i)
        }
      }
      this.showClearAll = false
    },
    getFilterData () {
      let values = Object.values(this.filterData)
      let i = 0
      for (let j in values) {
        if (values[j] !== '') {
          i+=1
        }
      }
      if (i > 2) {
        this.showClearAll = true
      } else {
        this.showClearAll = false
      }
    },
    getSort (index) {
      let val = this.getHeaderArray[index].value
      if (!(val in this.sortArray)) {
        this.sortedDataArray = this.data.slice().sort((a, b) => {
        let x = isNaN(b[val]) ? b[val] : "0000-09-05T06:03:14.000Z"
        let y = isNaN(a[val]) ? a[val] : "0000-09-05T06:03:14.000Z"
      
        return new Date(x) - new Date(y)
        })
        this.sortArray[val] = 0
      
      } else {
        if (this.sortArray[val] === 1) {
          this.sortedDataArray = this.data
          delete this.sortArray[val]
        } else {
          
         
        this.sortedDataArray = this.data.slice().sort((a, b) => {
        let i = isNaN(a[val]) ? a[val] : "0000-09-05T06:03:14.000Z"
        let j = isNaN(b[val]) ? b[val] : "0000-09-05T06:03:14.000Z"
        
        return new Date(i) - new Date(j)
        })
         
          this.sortArray[val] += 1
         
        }
      }
    },
    getSortVal(index) {
      let val = this.getHeaderArray[index].value;
      if (typeof val !== "string") {
        val = this.getHeaderArray[index].keyName;
      }
      if (!(val in this.sortArrayValue)) {
        this.sortedDataArray = this.data.slice().sort((a, b) => {
          let x = isNaN(parseFloat(b[val])) ? b[val] : parseFloat(b[val]);
          let y = isNaN(parseFloat(a[val])) ? a[val] : parseFloat(a[val]);
          return x - y;
        });
        this.sortArrayValue[val] = 0;
      } else {
        if (this.sortArrayValue[val] === 1) {
          this.sortedDataArray = this.data;
          delete this.sortArrayValue[val];
        } else {
          this.sortedDataArray = this.data.slice().sort((a, b) => {
            let i = isNaN(parseFloat(a[val])) ? a[val] : parseFloat(a[val]);
            let j = isNaN(parseFloat(b[val])) ? b[val] : parseFloat(b[val]);
            return i - j;
          });
          this.sortArrayValue[val] += 1;
        }
      }
    },
    getUpFill (val) {
      let color = ''
      if (!(val in this.sortArray)) {
        color = '#C3C3C3'
      } else {
        if (this.sortArray[val] === 1) {
          color = '#0978FC'
        } else {
          color = '#C3C3C3'
        }
      }
      return color
    },
    getDownFillValue (val) {
      let color = ''
      if (!(val in this.sortArrayValue)) {
        color = '#C3C3C3'
      } else {
        if (this.sortArrayValue[val] === 1) {
          color = '#C3C3C3'
        } else {
          color = '#0978FC'
        }
      }
      return color
    },
    getUpFillValue (val) {
      let color = ''
      if (!(val in this.sortArrayValue)) {
        color = '#C3C3C3'
      } else {
        if (this.sortArrayValue[val] === 1) {
          color = '#0978FC'
        } else {
          color = '#C3C3C3'
        }
      }
      return color
    },
    getDownFill (val) {
      let color = ''
      if (!(val in this.sortArray)) {
        color = '#C3C3C3'
      } else {
        if (this.sortArray[val] === 1) {
          color = '#C3C3C3'
        } else {
          color = '#0978FC'
        }
      }
      return color
    },
    isShowFilter (indexHead) {
      let showfilter = false
      if (this.getHeaderArray[indexHead]['filterData'] && typeof this.getHeaderArray[indexHead]['filterData']['showfilter'] === 'boolean') {
        showfilter = this.getHeaderArray[indexHead]['filterData']['showfilter']
        if (!this.popupHeaders.includes(indexHead)) {
          this.popupHeaders.push(indexHead)
        }
        if (this.getHeaderArray[indexHead]['filterData']['filterName'] || this.getHeaderArray[indexHead]['filterData']['filterName'] === '') {
          if (this.getHeaderArray[indexHead]['filterType'] === 'search' || this.getHeaderArray[indexHead]['filterType'] === 'searchnumber' || this.getHeaderArray[indexHead]['filterType'] === 'searchinteger' || (this.getHeaderArray[indexHead]['filterType'] === 'dateYear' && this.getHeaderArray[indexHead]['filterData']['dofilter']) || (this.getHeaderArray[indexHead]['filterType'] === 'noMaxDate' && this.getHeaderArray[indexHead]['filterData']['dofilter']) || (this.getHeaderArray[indexHead]['filterType'] === 'minDate' && this.getHeaderArray[indexHead]['filterData']['dofilter'])) {
            if (typeof this.getHeaderArray[indexHead]['value'] === 'string') {
              this.filterData[this.getHeaderArray[indexHead]['value']] = this.getHeaderArray[indexHead]['filterData']['default'] ? this.getHeaderArray[indexHead]['filterData']['default'] : ''
            } else {
              this.filterData[this.getHeaderArray[indexHead]['filterData']['filterName']] = this.getHeaderArray[indexHead]['filterData']['default'] ? this.getHeaderArray[indexHead]['filterData']['default'] : ''
            }
          } else if (this.getHeaderArray[indexHead]['filterType'] === 'dropDown') {
            if (typeof this.getHeaderArray[indexHead]['value'] === 'string') {
              this.filterData[this.getHeaderArray[indexHead]['value']] = this.getHeaderArray[indexHead]['filterData']['default'] !== 'all' ? this.getHeaderArray[indexHead]['filterData']['default'] : ''
            } else {
              this.filterData[this.getHeaderArray[indexHead]['filterData']['filterName']] = this.getHeaderArray[indexHead]['filterData']['default'] !== 'all' ? this.getHeaderArray[indexHead]['filterData']['default'] : ''
            }
          } else if (this.getHeaderArray[indexHead]['filterType'] === 'dateRange' && this.getHeaderArray[indexHead]['filterData']['dofilter']) {
            this.filterData.fromDate = this.tempFilterValue.fromDate
            this.filterData.toDate = this.tempFilterValue.toDate
          }
          this.getFilterData()
        } 
      }
      return showfilter
    },
    changeSpecValue (event, index) {
      if (event === 'dateRange') {
        this.tempFilterValue.toDate = ''
        this.tempFilterValue.fromDate = ''
        this.isShowFilter(index)
        this.commitTempFilter(false, index)
        this.$emit('filters', this.filterData)
      }
    },
    getFilterLabel (indexHead) {
      let label = false
      if (this.getHeaderArray[indexHead]['filterData'] && this.getHeaderArray[indexHead]['filterData']['label']) {
        label = this.getHeaderArray[indexHead]['filterData']['label']
      } else {
        label = this.getHeaderArray[indexHead]['textHeader']
      }
      return label
    },
    getShowData (indexHead) {
      let value
      if (this.getHeaderArray[indexHead]['filterData'] && this.getHeaderArray[indexHead]['filterData']['filterName']) {
        value = this.getHeaderArray[indexHead]['filterData']['filterName']
      }
      return value
    },
    getDateFormat (val) {
      return '' + this.getRangeFormat(val)
    },
    openPopup (indexHead) {
      event.stopPropagation()
      if (this.getHeaderArray[indexHead]['filterData'] && typeof this.getHeaderArray[indexHead]['filterData']['showfilter'] !== 'undefined') {
        let temp = !this.getHeaderArray[indexHead]['filterData']['showfilter']
        this.closePopup()
        this.getHeaderArray[indexHead]['filterData']['showfilter'] = temp
        this.isPopupOpen = temp
      }
    },
    changeDefaultValue (event, indexHead) {
      if (this.getHeaderArray[indexHead]['filterData']) {
        this.getHeaderArray[indexHead]['filterData']['default'] = event
      }
      this.isShowFilter(indexHead)
      this.debounceSearch()
      // this.$emit('filters', this.filterData)
    },
    changeDefaultChipValue (event, indexHead) {
      if (this.getHeaderArray[indexHead]['filterData'] && (event === 'search' || event === 'searchnumber' || event === 'searchinteger' || event === 'dateYear' || event === 'noMaxDate' || event === 'minDate')) {
        this.getHeaderArray[indexHead]['filterData']['default'] = ''
        if (event === 'dateYear' || event === 'noMaxDate' || event === 'minDate') {
          this.isShowFilter(indexHead)
          this.commitTempFilter(false, indexHead)
          this.$emit('filters', this.filterData)
        }
      } else if (this.getHeaderArray[indexHead]['filterData'] && event === 'dropDown') {
        this.getHeaderArray[indexHead]['filterData']['default'] = 'all'
      }
    },
    closePopup () {
      for (let i in this.getHeaderArray) {
        if (this.getHeaderArray[i]['filterType'] && this.getHeaderArray[i]['filterData']) {
          this.getHeaderArray[i]['filterData']['showfilter'] = false
        }
      }
      this.isPopupOpen = false
    },
    getRange (to, from) {
      return this.getRangeFormat(from) + '-' + this.getRangeFormat(to)
    },
    tempChangeValue (event, indexHead) {
      this.tempFilterValue.fromDate = event.from
      this.tempFilterValue.toDate = event.to
      this.isShowFilter(indexHead)
      this.$emit('filters', this.filterData)
    },
    commitTempFilter (event, indexHead) {
      if (this.getHeaderArray[indexHead]['filterData'] && typeof this.getHeaderArray[indexHead]['filterData']['dofilter'] === 'boolean') {
        this.getHeaderArray[indexHead]['filterData']['dofilter'] = event
      }
    },
    getTempFilter (indexHead) {
      if (this.getHeaderArray[indexHead]['filterData'] && typeof this.getHeaderArray[indexHead]['filterData']['dofilter'] === 'boolean') {
        return this.getHeaderArray[indexHead]['filterData']['dofilter']
      }
    },
    closeSpecPopup (event, indexHead) { 
      if (this.getHeaderArray[indexHead]['filterData'] && typeof this.getHeaderArray[indexHead]['filterData']['showfilter'] !== 'undefined') {
        this.getHeaderArray[indexHead]['filterData']['showfilter'] = false
      }
      return 0
    },
    changeValue (event, value) {
      if (typeof this.filterData[value] !== 'undefined') {
        if (typeof this.filterData[value] !== 'function') {
          this.$emit('changeFilter', {value: value, data: event})
        } else {
          this.$emit('changeFilter', {value: value, data: event})
        }
      }
    },
    getOptionData (indexHead) {
      let temp = ''
      if (this.getHeaderArray[indexHead]['filterData'] && this.getHeaderArray[indexHead].filterData['valueOption']) {
        temp = this.getHeaderArray[indexHead].filterData.valueOption
      }
      return temp
    },
    getQueryData (indexHead) {
      let temp = ''
      if (this.getHeaderArray[indexHead]['filterData']) {
        temp = this.getHeaderArray[indexHead].filterData.default
      }
      return temp
    },
    getColumnHeaderClass (head) {
      let headerDetails = {
        smallColumn: {
          className: 'small-column'
        },
        largeColumn: {
          className: 'large-column'
        },
        lastColumn: {
          className: 'last-column'
        },
        image: {
          className: 'imgdiv'
        },
        action: {
          className: 'action'
        },
        sm1: {
          className: 'm-sm-1'
        },
        sm2: {
          className: 'm-sm-2'
        },
        sm3: {
          className: 'm-sm-3'
        },
        md1: {
          className: 'm-md-1'
        },
        md2: {
          className: 'm-md-2'
        },
        md3: {
          className: 'm-md-3'
        },
        md4: {
          className: 'm-md-4'
        },
        md5: {
          className: 'm-md-5'
        },
        lg1: {
          className: 'm-lg-1'
        },
        lg2: {
          className: 'm-lg-2'
        },
        lg3: {
          className: 'm-lg-3'
        },
        lg4: {
          className: 'm-lg-4'
        },
        lg5: {
          className: 'm-lg-5'
        }
      }
      headerDetails = headerDetails[head.type] ? headerDetails[head.type].className : ''
      if (typeof head.headerClass === 'string') {
        headerDetails += ' ' + head.headerClass
      }
      return headerDetails
    },
    getCustomHeaderClass () {
      if (this.headerArray.headerData && typeof this.headerArray.headerData.cssClass === 'string') {
        return this.headerArray.headerData.cssClass
      }
      return ''
    },
    getFillColor (index, filterType) {
      let fill = ''
      if (filterType === 'search' || filterType === 'searchnumber' || filterType === 'searchinteger') {
        if (this.getQueryData(index)) {
          fill = '#0978FC'
        } else {
          fill = '#C3C3C3'
        }
      } else if (filterType === 'dropDown') {
        if (this.getQueryData(index) !== 'all') {
          fill = '#0978FC'
        } else {
          fill = '#C3C3C3'
        }
      } else if (filterType === 'dateRange' || filterType === 'dateYear' || filterType === 'noMaxDate' || filterType === 'minDate') {
        if (this.getTempFilter(index)) {
          fill = '#0978FC'
        } else {
          fill = '#C3C3C3'
        }
      }
      return fill
    }
  },
  computed: {
    getHeaderArray () {
      if (this.headerArray.columns) {
        return this.headerArray.columns
      }
      return this.headerArray
    }
  }
}
</script>

<style lang="scss">
  .flex-table {
    display: flex;
    justify-content: space-between;
    color: #1F2631;
    height: 70px;
    align-items: center;
    font-size: 1vw;
    line-height: 1.2vw;
  }
  .table-chip-wrapper {
    margin-bottom: 30px;
    transition: right ease-in 0.2s;
  }
  .flex-table > div {
    width: 110px;
    text-align: left;
    font-weight: inherit;
    white-space: nowrap;
    &.small-column {
      width: 40px;
      padding: 0 10px 0 0;
    }
    &:first-child {
      padding-left: 25px!important;
    }
    &:last-child {
      padding-right: 10px!important;
    }
    &.large-column {
      width: 170px;
    }
    &.m-sm-1 {
      width: 60px;
    }
    &.m-sm-2 {
      width: 80px;
    }
    &.m-sm-3 {
      width: 100px;
    }
    &.m-md-1 {
      width: 120px;
    }
    &.m-md-2 {
      width: 130px;
    }
    &.m-md-3 {
      width: 140px;
    }
    &.m-md-4 {
      width: 150px;
    }
    &.m-md-5 {
      width: 160px;
    }
    &.m-lg-1 {
      width: 180px;
    }
    &.m-lg-2 {
      width: 190px;
    }
    &.m-lg-3 {
      width: 200px;
    }
    &.m-lg-4 {
      width: 210px;
    }
    &.m-lg-5 {
      width: 220px;
    }
    span {
      &.sort-img {
        position: relative;
        cursor: pointer;
        top: 1.5px;
        svg {
          &.up-triangle {
            transform: rotate(180deg);
            position: absolute;
            top: -1px;
          }
        }
      }
    }
  }
  .header {
    border-bottom: 1px solid rgb(230, 230, 230);
    background: #fff;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1);
    > div {
      font-family: "Open Sans Medium";
      font-weight: 800;
    }
  }
  .tablebody {
    background: #fff;
  }
  .title-wrapper,
  .category-wrapper,
  .genre-wrapper,
  .status-wrapper {
    position: relative;
    img {
      margin-top: -3px;
    }
  }
  .checkbox-wrap {
    display: inline-flex;
    align-items: center;
    position: relative;
    bottom: 12px;
    left: 5px;
  }
  .popup-image {
    margin-top: -3px;
    margin-left: 3px;
    margin-right: 3px;
    position: relative;
    width: 11px;
    height: 11px;
    cursor: pointer;
    border-style: none;
    &.calendar-popup {
      height: 13px;
      position: relative;
      top: 2px;
    }
  }
  .popup{
    position: absolute;
    top: 40px;
  }
  .filter {
    position: relative;
    img {
      cursor: pointer;
    }
    svg {
      &:hover {
        &.popup-image {
          path {
            fill: #0978FC;
          }
        }
      }
    }
  }
  .chip-wrapper {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    right: 2px;
    .chip-row {
      margin: 10px 0 10px;
      .chip-col-div {
        margin: 0 5px;
      }
    }
    .clear-filter {
      color: #0978FC;
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 15px;
    }
  }
  .table-wrapper {
    overflow-x: auto;
    scrollbar-width: thin;
    &.scrolltable {
      min-height: 500px;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        height: 0;
      }
    }
    &.data-table {
      overflow: hidden;
      overflow-x: auto;
    }
    &::-webkit-scrollbar {
      width: 3px;
      height: 6.5px;
    }
    &::-webkit-scrollbar-track {
      background : #fff;
      border-radius: 2.5px;
      width: 3px;
      height: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background : #b3b3b3;
      border-radius: 2.5px;
      width: 3px;
      height: 3px;
    }
  }
</style>
