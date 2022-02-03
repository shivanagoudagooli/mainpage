<template>
  <div class="m-table-body-wrapper" :style="tableStyles">
    <div class="table-bd" v-if="data.length">
      <div v-for="(row,indexRow) in data" :key="indexRow" :class="'flex-table table-row ' + getRowClass()">
        <div v-for="(head, indexHead) in getHeaderArray()" :key="indexHead" :class="['table-column ', getCoumnClass(head, indexRow), (getHeadValueType(head, indexRow) == 'column' || getHeadValueType(head, indexRow) == 'column-other') && getValueColumn(head, indexRow).length > 15 ? 'table-overflow': '']" @mouseover="getTitlePop(indexRow, indexHead)" @mouseleave="removeTitlePop(indexRow, indexHead)">
     
          <span class="body-font" @click="getClickCb(head, indexRow)" v-if="getHeadValueType(head, indexRow) == 'column' && getValueColumn(head, indexRow)" v-tooltip.bottom-start="{ content: getNewValueData(getValueColumn(head, indexRow)) , classes: getValueColumn(head, indexRow).length > 15 ? 'tooltipClasses_active' : 'tooltipClasses_inactive' }" :class="getValueColumn(head, indexRow).length > 15 ? 'tooltipClasses_active_text' : 'tooltipClasses_inactive_text'">
            {{ getValueColumn(head, indexRow)   }}
          </span>
          <span class="body-font column-uppercase" @click="getClickCb(head, indexRow)" v-else-if="getHeadValueType(head, indexRow) == 'column-other' && getValueColumn(head, indexRow)" v-tooltip.bottom-start="{ content: getNewValueData(getValueColumn(head, indexRow)) , classes: getValueColumn(head, indexRow).length > 15 ? 'tooltipClasses_active' : 'tooltipClasses_inactive' }" :class="getValueColumn(head, indexRow).length > 15 ? 'tooltipClasses_active_text' : 'tooltipClasses_inactive_text'">
            {{ getValueColumn(head, indexRow)   }}
          </span>
          <span class="body-font" @click="getClickCb(head, indexRow)" v-else-if="getHeadValueType(head, indexRow) == 'no-tooltip' && getValueColumn(head, indexRow)">
            {{ getValueColumn(head, indexRow)   }}
          </span>
          <span class="body-font" @click="getClickCb(head, indexRow)" v-else-if="getHeadValueType(head, indexRow) == 'column-tooltip' && getValueColumn(head, indexRow)">
            {{ getValueColumn(head, indexRow)   }}<MToolTip class="m-body-table-tooltip" :tooltipstyle="tooltipstyle" title="Please add atleast one value" value="8" v-tooltip="{content: getContentTitle(head, indexRow), placement: 'bottom-center', classes: ['info'], delay: { show: 500, hide: 300,},}"></MToolTip>
          </span>
          <span class="body-font" v-else-if="getHeadValueType(head, indexRow) == 'radio-column' && getValueColumn(head, indexRow)">
            {{ getEnableDisableColumn(head, indexRow) }}
          </span>
          <span class="body-font email-wrap" v-else-if="getHeadValueType(head, indexRow) == 'email' && getValueColumn(head, indexRow)">
            <span class="email-body"> {{ getValueColumn(head, indexRow) }}</span>
            <span v-if="getEmailExists(head,'email', indexRow)" @click="clickEmailAction(indexRow, head, 'email')" class="action-btn">
              <svg class="email" width="21px" height="15px" viewBox="0 0 21 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                <title>Resend</title>
                <desc>Created with Sketch.</desc>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="00sso_provider_subuser_details" transform="translate(-664.000000, -305.000000)" fill="#A7B1C6" fill-rule="nonzero">
                        <g id="Group-2" transform="translate(95.000000, 146.000000)">
                            <g id="Table-raw-Copy" transform="translate(0.000000, 130.000000)">
                                <g id="Table-raw">
                                    <g id="Group" transform="translate(26.272175, 27.500000)">
                                        <g id="Resend" transform="translate(543.376471, 1.500000)">
                                            <path d="M17.9553874,6.45286277 L18.1721363,6.61234369 C18.6244306,6.9672213 19.0207056,7.41235859 19.3266101,7.94220073 C19.5367598,8.30619061 19.4120476,8.77162266 19.0480577,8.98177232 C18.6840679,9.19192197 18.2186358,9.06720983 18.0084862,8.70321995 C17.1709116,7.25249833 15.3158811,6.7554444 13.8651595,7.59301891 C12.4144379,8.43059343 11.9173839,10.285624 12.7549584,11.7363456 C13.592533,13.1870672 15.4475635,13.6841211 16.8982851,12.8465466 L16.9752073,12.8109431 C17.114026,12.7240863 17.2469264,12.6252888 17.3723168,12.514746 C17.0052699,12.5144241 16.6945481,12.2452133 16.6301111,11.890199 L16.6178501,11.7534049 C16.6178501,11.3798055 16.8870609,11.0690836 17.2420751,11.0046467 L17.3788693,10.9923856 L18.9189634,10.9923856 C19.2374003,10.9923856 19.5168412,11.189657 19.6285665,11.4782361 L19.6658052,11.6071943 L19.9735372,13.179085 C20.054287,13.5915544 19.7853753,13.9913876 19.3729059,14.0721375 C19.0062665,14.1439151 18.6496112,13.9394169 18.5181677,13.6033964 L18.5016903,13.5443965 C16.8847543,15.0792573 14.3450339,15.2411755 12.5352557,13.8272218 C10.5429222,12.2706403 10.1896754,9.39367606 11.746257,7.40134247 C13.2472464,5.48016365 15.9759895,5.08308468 17.9553874,6.45286277 Z M17.667072,-4.72510919e-13 L17.6672848,3.41875581 C17.6672848,3.83064913 17.3333792,4.16455464 16.9214859,4.16455464 C16.5553585,4.16455464 16.2508511,3.90072807 16.1877029,3.55281409 L16.1756871,3.41875581 L16.1747026,2.81729316 L8.83353599,7.29087064 L1.49062867,2.81579755 L1.49062867,11.2572277 L7.96002483,11.2557246 C8.37191815,11.2557246 8.70582367,11.5896301 8.70582367,12.0015235 C8.70582367,12.3676509 8.44199709,12.6721583 8.09408311,12.7353065 L7.96002483,12.7473223 L-1.50102153e-12,12.7479602 L-1.50102153e-12,-4.72510919e-13 L17.667072,-4.72510919e-13 Z M15.4867412,1.49007564 L2.17803701,1.49007564 L8.83346547,5.54364801 L15.4867412,1.49007564 Z"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
          </span>
          <span class="body-font" v-else-if="getHeadValueType(head, indexRow) == 'date' && getValueDate(head, indexRow)">
            {{ getValueDate(head, indexRow) }}
          </span>
          <span class="body-font" v-else-if="getHeadValueType(head, indexRow) == 'dateTime' && getValueTimeDate(head, indexRow)">
            {{ getValueTimeDate(head, indexRow)[0] }},<span class="light-span"> {{ getValueTimeDate(head, indexRow)[1] }}</span>
          </span>
          <span class="body-font" v-else-if="getHeadValueType(head, indexRow) == 'currency' && getValueColumn(head, indexRow)">
            {{ getValueCurrency(head, indexRow) }}
          </span>
          <span v-else-if="getHeadValueType(head, indexRow) == 'checkbox'" class="checkbox-wrap"><Checkbox :valueCheck="data[indexRow]" :checked="detailIds" @checkClick="select('checked', indexRow)" /></span>
          <span v-else-if="getHeadValueType(head, indexRow) == 'radio'" class="radio-wrap"><MRadio @on-radio-checked="clickRadio(indexRow, head, $event)" :radioChecked="getRadioValue(head, indexRow)" :radioValue="getRadioValue(head, indexRow)" :class="getRadioValue(head, indexRow) ? 'selected-radio': 'not-selected'"/></span>
          <!-- <span v-else-if="getHeadValueType(head, indexRow) == 'counter'" class="counter-wrap"><MCounterAction :count="getCount(indexRow)" @changeCount="updateCount(indexRow, head, $event)" /></span> -->
          <span v-else-if="getHeadValueType(head, indexRow) == 'index'"> {{ indexRow + offset + head.value }} </span>
          <img @click="getClickCb(head, indexRow)" v-else-if="getHeadValueType(head, indexRow) == 'image' && getValueColumn(head, indexRow)" :src="getValueColumn(head, indexRow)" alt="" class="img">
          <img @click="getClickCb(head, indexRow)" v-else-if="getHeadValueType(head, indexRow) == 'profile-image'" :src="getImageColumn(head, indexRow)" alt="" class="img">
          <span @click="getClickCb(head, indexRow)" v-else-if="getHeadValueType(head, indexRow) == 'video' && getValueColumn(head, indexRow)" class="video-wrap">
            <video class="drop_vid" width="68" height="31" :src="`${getValueColumn(head, indexRow)}#t=2`" preload>
            </video>
            <div v-if="getValueColumn(head, indexRow)" id="overlay"></div>
            <!-- <img  :src="getValueColumn(head, indexRow)" class="img"> -->
            <!-- <img v-if="getValueColumn(head, indexRow)" :title="'Play'" :src="require('@/assets/video/playbutton.png')" class="vid"> -->
          </span>
          <!-- <ToggleButton v-else-if="getHeadValueType(head, indexRow) == 'toggleButton'" @changetoggle="openModal(head, indexRow, 'toggle')" :toggleCheckBox="getStatusChecked(head,row)" :leftLabel="getStatusLabel(head,row)" class="toggle-status"></ToggleButton>
          <ToggleButton v-else-if="getHeadValueType(head, indexRow) == 'toggleButtonCustom'" @changetoggle="sendModal(head, indexRow)" :toggleCheckBox="getCustomStatusChecked(head,row)" :leftLabel="getCustomStatusLabel(head,row)" class="toggle-status"></ToggleButton> -->
          <CustomButton v-else-if="getHeadValueType(head, indexRow) == 'button'" @on-btn-click="buttonClick(head, indexRow)" class="custom-button" :primary="getButtonClass(head, indexRow).primary" :secondary="getButtonClass(head, indexRow).secondary" :mButtonProperty="{...{defaultProperty:{'width': '85px'}}, ...getButtonClass(head, indexRow).mButtonProperty}">{{getButtonContent(head, indexRow)}}</CustomButton>
          <span v-else-if="getHeadValueType(head, indexRow) == 'action'" class="action-column">
            <span v-if="getButtonExists(head,'featured', indexRow)" @click="clickAction(indexRow, head, 'featured')" class="action-btn">
              <svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>FEATURE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Developer" transform="translate(-78.000000, -77.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Featured" transform="translate(77.000000, 75.500000)">
                            <path d="M15.3917171,6.8926062 C15.3177088,6.66479157 15.1207729,6.49873441 14.8837282,6.46428951 L10.862611,5.87998482 L9.06434379,2.23625122 C8.95832398,2.02144257 8.73952963,1.88546702 8.5000096,1.88546702 C8.26048957,1.88546702 8.04169521,2.02148453 7.9356754,2.23625122 L6.13740818,5.87998482 L2.11629102,6.46428951 C1.87924633,6.49873441 1.68231043,6.66479157 1.60830214,6.8926062 C1.53425189,7.12042084 1.59600938,7.37051349 1.76752066,7.53770342 L4.67721285,10.3739747 L3.99032864,14.3788134 C3.94984224,14.6148931 4.04688373,14.8535321 4.24067301,14.9943324 C4.43450425,15.1351328 4.69139357,15.1537188 4.9034332,15.0422448 L8.49996764,13.1514253 L12.096544,15.0422448 C12.1885929,15.0906607 12.2891586,15.114533 12.3893467,15.114533 C12.5198262,15.114533 12.6496763,15.0740046 12.7593042,14.9943324 C12.9530935,14.8535321 13.050177,14.6149351 13.0096486,14.3788134 L12.3227644,10.3739747 L15.2324566,7.53770342 C15.4040098,7.37055544 15.4657253,7.1204628 15.3917171,6.8926062 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'list-track', indexRow)" @click="clickAction(indexRow, head, 'list-track')" class="action-btn">
              <svg width="17px" height="17px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>LIST</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Developer" transform="translate(-76.000000, -205.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Listtrack" transform="translate(76.500000, 205.500000)">
                            <path d="M8,1.24344979e-14 C12.418278,1.24344979e-14 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 1.24344979e-14,12.418278 1.24344979e-14,8 C1.24344979e-14,3.581722 3.581722,1.24344979e-14 8,1.24344979e-14 Z M8,1.56590873 C4.44654952,1.56590873 1.56590873,4.44654952 1.56590873,8 C1.56590873,11.5534505 4.44654952,14.4340913 8,14.4340913 C11.5534505,14.4340913 14.4340913,11.5534505 14.4340913,8 C14.4340913,4.44654952 11.5534505,1.56590873 8,1.56590873 Z" id="Oval"></path>
                            <path d="M11.2651675,9.81358797 C11.6813141,9.81358797 12.0186676,10.1509415 12.0186676,10.5670882 C12.0186676,10.9832348 11.6813141,11.3205883 11.2651675,11.3205883 L6.94756615,11.3205883 C6.53141949,11.3205883 6.19406597,10.9832348 6.19406597,10.5670882 C6.19406597,10.1509415 6.53141949,9.81358797 6.94756615,9.81358797 L11.2651675,9.81358797 Z M4.73483255,9.81358797 C5.15097921,9.81358797 5.48833273,10.1509415 5.48833273,10.5670882 C5.48833273,10.9832348 5.15097921,11.3205883 4.73483255,11.3205883 C4.31868589,11.3205883 3.98133236,10.9832348 3.98133236,10.5670882 C3.98133236,10.1509415 4.31868589,9.81358797 4.73483255,9.81358797 Z M11.2651675,7.45057409 C11.6813141,7.45057409 12.0186676,7.78792762 12.0186676,8.20407427 C12.0186676,8.62022093 11.6813141,8.95757446 11.2651675,8.95757446 L6.94756615,8.95757446 C6.53141949,8.95757446 6.19406597,8.62022093 6.19406597,8.20407427 C6.19406597,7.78792762 6.53141949,7.45057409 6.94756615,7.45057409 L11.2651675,7.45057409 Z M4.73483255,7.45057409 C5.15097921,7.45057409 5.48833273,7.78792762 5.48833273,8.20407427 C5.48833273,8.62022093 5.15097921,8.95757446 4.73483255,8.95757446 C4.31868589,8.95757446 3.98133236,8.62022093 3.98133236,8.20407427 C3.98133236,7.78792762 4.31868589,7.45057409 4.73483255,7.45057409 Z M11.2651675,5.08756021 C11.6813141,5.08756021 12.0186676,5.42491373 12.0186676,5.84106039 C12.0186676,6.25720705 11.6813141,6.59456058 11.2651675,6.59456058 L6.94756615,6.59456058 C6.53141949,6.59456058 6.19406597,6.25720705 6.19406597,5.84106039 C6.19406597,5.42491373 6.53141949,5.08756021 6.94756615,5.08756021 L11.2651675,5.08756021 Z M4.73483255,5.08756021 C5.15097921,5.08756021 5.48833273,5.42491373 5.48833273,5.84106039 C5.48833273,6.25720705 5.15097921,6.59456058 4.73483255,6.59456058 C4.31868589,6.59456058 3.98133236,6.25720705 3.98133236,5.84106039 C3.98133236,5.42491373 4.31868589,5.08756021 4.73483255,5.08756021 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'promote', indexRow)" @click="clickAction(indexRow, head, 'promote')" class="action-btn">
              <svg width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>PROMOTE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Developer" transform="translate(-76.000000, -174.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Promote" transform="translate(76.500000, 174.000000)">
                            <path d="M8,0 C10.136875,0 12.1458437,0.83215625 13.656875,2.343125 C15.1678437,3.85415625 16,5.863125 16,8 C16,10.136875 15.1678437,12.1458437 13.656875,13.656875 C12.1458437,15.1678437 10.136875,16 8,16 C5.863125,16 3.85415625,15.1678437 2.343125,13.656875 C0.83215625,12.1458438 -1.67186526e-15,10.136875 -1.67186526e-15,8 C-1.67186526e-15,5.863125 0.83215625,3.85415625 2.343125,2.343125 C3.85415625,0.83215625 5.863125,0 8,0 Z M8,1.5558978 C4.44670494,1.5558978 1.5558978,4.44670494 1.5558978,8 C1.5558978,11.5532951 4.44670494,14.4441022 8,14.4441022 C11.5532951,14.4441022 14.4441022,11.5532951 14.4441022,8 C14.4441022,4.44670494 11.5532951,1.5558978 8,1.5558978 Z M8.00002938,3.83339291 C8.13178933,3.83339291 8.25214808,3.90819305 8.31046957,4.02635926 L8.31046957,4.02635926 L9.2996962,6.03077677 L11.5117124,6.35220273 C11.6421106,6.37115087 11.750445,6.46249889 11.791157,6.5878197 C11.831869,6.71316359 11.7979192,6.85073953 11.7035478,6.94268762 L11.7035478,6.94268762 L10.1029264,8.50292017 L10.4807814,10.7059816 C10.503076,10.8358721 10.4496704,10.9671243 10.343067,11.0445785 C10.2827606,11.0884062 10.2113301,11.1107008 10.1395533,11.1107008 C10.0844399,11.1107008 10.0291187,11.0975687 9.97848264,11.0709351 L9.97848264,11.0709351 L8.0000063,10.0307955 L6.02155305,11.0709351 C5.90491007,11.1322569 5.76359528,11.1220328 5.65696873,11.0445785 C5.55036526,10.9671243 5.49698275,10.835849 5.51925431,10.7059816 L5.51925431,10.7059816 L5.89710925,8.50292017 L4.29648786,6.94268762 C4.20213952,6.85071645 4.16816673,6.71314051 4.20890176,6.5878197 C4.24961372,6.46249889 4.35794813,6.37115087 4.4883464,6.35220273 L4.4883464,6.35220273 L6.70036257,6.03077677 L7.68958919,4.02635926 C7.74791068,3.90821613 7.86826943,3.83339291 8.00002938,3.83339291 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'list-package', indexRow)" @click="clickAction(indexRow, head, 'list-package')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>LIST PACKAGE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Developer" transform="translate(-78.000000, -44.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Listpackage" transform="translate(78.000000, 44.000000)">
                            <path d="M8,1.00275344e-12 C12.418278,1.00275344e-12 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 5.90638649e-13,12.418278 5.90638649e-13,8 C5.90638649e-13,3.581722 3.581722,1.00275344e-12 8,1.00275344e-12 Z M8,1.84634846 C4.6014321,1.84634846 1.84634846,4.6014321 1.84634846,8 C1.84634846,11.3985679 4.6014321,14.1536515 8,14.1536515 C11.3985679,14.1536515 14.1536515,11.3985679 14.1536515,8 C14.1536515,4.6014321 11.3985679,1.84634846 8,1.84634846 Z M8.02249157,10.3505832 C8.33843017,10.3505832 8.60204144,10.4443775 8.81332538,10.631966 C9.02460933,10.8195546 9.1302513,11.0594705 9.1302513,11.3517137 C9.1302513,11.6439569 9.02460933,11.8838728 8.81332538,12.0714613 C8.60204144,12.2590498 8.33843017,12.3528441 8.02249157,12.3528441 C7.70655296,12.3528441 7.44294169,12.2590498 7.23165775,12.0714613 C7.02037381,11.8838728 6.91473183,11.6439569 6.91473183,11.3517137 C6.91473183,11.0594705 7.02037381,10.8195546 7.23165775,10.631966 C7.44294169,10.4443775 7.70655296,10.3505832 8.02249157,10.3505832 Z M8.05929078,3.62132838 L8.08127012,3.62204059 C8.64317607,3.64632396 9.07900528,4.1215243 9.05472191,4.68343025 L9.05472191,4.68343025 L8.88081872,8.7074692 C8.86129812,9.15916673 8.48942033,9.51532053 8.03730119,9.51532053 C7.58518205,9.51532053 7.21330425,9.15916673 7.19378365,8.7074692 L7.19378365,8.7074692 L7.01988046,4.68343025 C7.01924744,4.66878248 7.01893082,4.65412275 7.01893082,4.63946131 C7.01893082,4.07703089 7.47487077,3.62109095 8.03730119,3.62109095 C8.05196263,3.62109095 8.06662236,3.62140757 8.08127012,3.62204059 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'edit', indexRow)" @click="clickAction(indexRow, head, 'edit')" class="action-btn" :style="getViewClass(row, 'edit')">
              <svg width="13px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 57.1 (101010) - https://sketch.com -->
                <title>EDIT</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="01vlive_suport_tickets" transform="translate(-786.000000, -175.000000)">
                    <g id="Group-4" transform="translate(88.000000, 72.000000)">
                      <g id="Stacked-Group" transform="translate(0.000000, 84.500000)">
                        <g id="Group-2-Copy-36">
                          <g id="tr">
                            <g id="Actions" transform="translate(697.000000, 17.000000)">
                              <g d="Ic_edit1-Copy-3-Ic_edit1">
                                <g>
                                  <g id="Ic_edit1">
                                    <path d="M1.90636655,10.9616077 L1.90636655,13.3445658 L4.28932473,13.3445658 L11.3174627,6.31642783 L8.93450456,3.93346964 L1.90636655,10.9616077 Z M13.1602837,4.47360683 C13.4081114,4.22577918 13.4081114,3.82544221 13.1602837,3.57761456 L11.6733178,2.09064865 C11.4254902,1.842821 11.0251532,1.842821 10.7773256,2.09064865 L9.61444196,3.25353224 L11.9974001,5.63649043 L13.1602837,4.47360683 Z" id="Shape" fill="#C3C3C3" fill-rule="nonzero"></path>
                                    <polygon id="Shape" points="0 0 15.2509324 0 15.2509324 15.2509324 0 15.2509324"></polygon>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'edit-update', indexRow)" @click="clickAction(indexRow, head, 'edit-update')" class="action-btn">
              <svg width="13px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 57.1 (101010) - https://sketch.com -->
                <title>UPDATE-STATUS</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="01vlive_suport_tickets" transform="translate(-786.000000, -175.000000)">
                    <g id="Group-4" transform="translate(88.000000, 72.000000)">
                      <g id="Stacked-Group" transform="translate(0.000000, 84.500000)">
                        <g id="Group-2-Copy-36">
                          <g id="tr">
                            <g id="Actions" transform="translate(697.000000, 17.000000)">
                              <g d="Ic_edit1-Copy-3-Ic_edit1">
                                <g>
                                  <g id="Ic_edit1">
                                    <path d="M1.90636655,10.9616077 L1.90636655,13.3445658 L4.28932473,13.3445658 L11.3174627,6.31642783 L8.93450456,3.93346964 L1.90636655,10.9616077 Z M13.1602837,4.47360683 C13.4081114,4.22577918 13.4081114,3.82544221 13.1602837,3.57761456 L11.6733178,2.09064865 C11.4254902,1.842821 11.0251532,1.842821 10.7773256,2.09064865 L9.61444196,3.25353224 L11.9974001,5.63649043 L13.1602837,4.47360683 Z" id="Shape" fill="#C3C3C3" fill-rule="nonzero"></path>
                                    <polygon id="Shape" points="0 0 15.2509324 0 15.2509324 15.2509324 0 15.2509324"></polygon>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'edit-error', indexRow)" @click="clickAction(indexRow, head, 'edit-error')" class="action-btn edit-error" :style="getViewClass(row, 'edit-error')">
              <svg width="17px" height="15px" viewBox="0 0 17 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>EDIT ERROR</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="7.1.Settings_provider" transform="translate(-1886.000000, -358.000000)">
                        <g id="Group-25" transform="translate(357.941108, 109.000000)">
                            <g id="Group-21" transform="translate(35.058892, 54.000000)">
                                <g id="Group-20" transform="translate(0.000000, 79.616782)">
                                    <g id="Group-18-Copy" transform="translate(13.500000, 15.868577)">
                                        <g id="Group-5" transform="translate(0.000000, 47.000000)">
                                            <g id="Group-17-Copy-60" transform="translate(0.000000, 52.000000)">
                                                <g id="Group-2" transform="translate(8.687524, 0.487500)">
                                                    <g id="editwith-error" transform="translate(1470.812476, 0.000000)">
                                                        <g id="Actions" transform="translate(2.658428, 0.000000)">
                                                            <g id="ic_mode_edit" transform="translate(0.140939, 0.000000)">
                                                                <path d="M2.01062097,11.6063844 L2.01062097,14.1295114 L4.52389718,14.1295114 L11.9363865,6.68796873 L9.42311027,4.16484169 L2.01062097,11.6063844 Z M13.8799868,4.73675049 C14.1413675,4.47434528 14.1413675,4.05045994 13.8799868,3.78805472 L12.3117024,2.21362345 C12.0503217,1.95121824 11.6280913,1.95121824 11.3667105,2.21362345 L10.1402318,3.44490945 L12.653508,5.96803648 L13.8799868,4.73675049 Z" id="Shape" fill="#C3C3C3" fill-rule="nonzero"></path>
                                                                <polygon id="Shape" points="0 0 16.0849678 0 16.0849678 16.148013 0 16.148013"></polygon>
                                                            </g>
                                                        </g>
                                                        <g id="Ic_error" transform="translate(0.000000, -0.000000)" fill="#FF3366" fill-rule="nonzero">
                                                            <g transform="translate(0.000000, 0.000000)" id="Shape">
                                                                <path d="M8.04108736,5.94098411 L5.13849286,0.597379873 C4.91941884,0.228580159 4.53250457,0.00831987533 4.10352602,0.00831987533 C3.67454748,0.00831987533 3.2876332,0.228580159 3.06855918,0.597379873 C3.06690803,0.600201256 3.06551337,0.60302264 3.06386222,0.605844023 L0.170918132,5.93253599 C-0.0528528496,6.30911054 -0.0570849249,6.76134947 0.159392139,7.1421561 C0.376366152,7.52318715 0.767256017,7.75048486 1.20564452,7.75048486 L6.98537694,7.75048486 C7.42376544,7.75048486 7.83071795,7.52318715 8.04767594,7.1421561 C8.264153,6.7613655 8.25993696,6.30909451 8.04108736,5.94098411 Z M3.62212746,2.45505254 C3.62212746,2.1891692 3.83765872,1.97365397 4.10352602,1.97365397 C4.36940936,1.97365397 4.58492459,2.18918523 4.58492459,2.45505254 L4.58492459,4.38066283 C4.58492459,4.64651411 4.36939333,4.8620614 4.10352602,4.8620614 C3.83765872,4.8620614 3.62212746,4.64649808 3.62212746,4.38066283 L3.62212746,2.45505254 L3.62212746,2.45505254 Z M4.10352602,6.78768773 C3.70534224,6.78768773 3.38141214,6.46377366 3.38141214,6.06557385 C3.38141214,5.66739006 3.70532621,5.343476 4.10352602,5.343476 C4.50170981,5.343476 4.82562387,5.66739006 4.82562387,6.06557385 C4.8256399,6.46375763 4.50172584,6.78768773 4.10352602,6.78768773 Z"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'view', indexRow)" @click="clickAction(indexRow, head, 'view')" class="action-btn" :style="getViewClass(row, 'view')">
              <svg width="18px" height="10px" viewBox="0 0 18 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 60.1 (101010) - https://sketch.com -->
                <title>VIEW</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="02_vlive_sys_createproviders" transform="translate(-806.000000, -807.000000)" fill="#C3C3C3" fill-rule="nonzero">
                    <g id="Group-4" transform="translate(88.000000, 72.000000)">
                      <g id="Stacked-Group" transform="translate(0.000000, 84.500000)">
                        <g id="Group-2-Copy-22" transform="translate(0.000000, 630.000000)">
                          <g id="tr">
                            <g id="Actions" transform="translate(675.000000, 17.000000)">
                              <g id="Ic_edit1-Copy-Ic_view">
                                <g transform="translate(44.000000, 0.000000)">
                                  <g id="eye" transform="translate(7.928963, 8.575921) scale(1, -1) translate(-7.928963, -8.575921) translate(-1.071037, 3.075921)">
                                    <path d="M9.02264597,10.0894708 C7.1584815,10.0894708 5.16291829,9.3643098 3.24936599,7.99780519 C2.17342896,7.22948633 1.36358564,6.45596466 0.904549721,5.92527653 C0.674735803,5.65992845 0.674735803,5.26606518 0.904588049,5.00061637 C1.36811149,4.4656739 2.17349903,3.69638082 3.24937217,2.92812753 C5.16305149,1.56167021 7.15860623,0.836502751 9.02264597,0.836502751 C10.8867732,0.836502751 12.8823698,1.56167236 14.795926,2.92813195 C15.8718152,3.69641667 16.6794979,4.46788395 17.1407422,5.00066061 C17.3705561,5.26600869 17.3705561,5.65987196 17.1407039,5.92532077 C16.6771805,6.46026324 15.8717929,7.22955632 14.7959288,7.99780316 C12.8823712,9.36430093 10.88681,10.0894708 9.02264597,10.0894708 Z M4.08772517,6.8610526 C5.65627003,7.97718957 7.34344871,8.67715288 9.02264597,8.67715288 C10.7018549,8.67715288 12.3891078,7.97716244 13.9575665,6.86105282 C14.5915667,6.40991282 15.1542638,5.9278114 15.6279605,5.46301081 C15.1546419,4.99854584 14.5916883,4.51624289 13.9575597,4.06498861 C12.3891992,2.94890108 10.7018833,2.24889338 9.02264597,2.24889338 C7.34342027,2.24889338 5.65617863,2.94887395 4.08772547,4.06499344 C3.45365265,4.51618508 2.89072468,4.99846666 2.41732501,5.46301661 C2.89080698,5.92762337 3.45362449,6.40981822 4.08772517,6.8610526 Z" id="Shape"></path>
                                    <path d="M9.140122,7.85633447 C10.4908447,7.85633447 11.5858219,6.76135734 11.5858219,5.41063461 C11.5858219,4.05991187 10.4908447,2.96493475 9.140122,2.96493475 C7.78939926,2.96493475 6.69442214,4.05991187 6.69442214,5.41063461 C6.69442214,6.76135734 7.78939926,7.85633447 9.140122,7.85633447 Z M9.140122,6.5987929 C8.48392029,6.5987929 7.9519637,6.06683631 7.9519637,5.41063461 C7.9519637,4.7544329 8.48392029,4.22247631 9.140122,4.22247631 C9.7963237,4.22247631 10.3282803,4.7544329 10.3282803,5.41063461 C10.3282803,6.06683631 9.7963237,6.5987929 9.140122,6.5987929 Z" id="Oval"></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'restart', indexRow)" @click="clickAction(indexRow, head, 'restart')" class="action-btn">
              <svg width="16px" height="17px" viewBox="0 0 16 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>RESTART</title>
                <desc>Created with sketchtool.</desc>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Developer" transform="translate(-73.000000, -276.000000)" fill="#C3C3C3" fill-rule="nonzero">
                          <path d="M81.5,276.5 C83.4716411,276.5 85.3200285,277.223637 86.7128177,278.423676 L86.9406738,278.628052 L87.4000244,278.178101 C87.5218506,278.056274 87.7000733,278.009399 87.859375,278.056274 C87.9999593,278.095337 88.1080763,278.199504 88.1618974,278.330769 L88.1855158,278.403627 L88.8531494,281.753174 C88.9223633,282.12207 88.5510254,282.389893 88.2999268,282.306274 C88.4973144,282.345947 85.3974609,281.347046 85.3031006,281.328125 C85.1343994,281.290649 85.0031738,281.168701 84.9468994,281.009399 C84.9078369,280.868713 84.9338786,280.721585 85.0141455,280.605949 L85.0687256,280.540649 L85.609375,279.990601 C85.2401308,279.653465 84.5763908,279.310074 83.618155,278.960427 C80.4909414,277.822215 77.0331302,279.434619 75.8949175,282.561832 C74.7567048,285.689046 76.3691087,289.146857 79.4963223,290.28507 C82.5524628,291.397414 85.9243446,289.882749 87.138391,286.894522 L87.2195597,286.683665 L89.0049757,287.333503 C87.5078673,291.446775 82.9597556,293.567594 78.846484,292.070486 C75.919733,291.005235 74.0017347,288.395302 73.6780547,285.496435 L73.6738986,285.444618 C73.591194,285.367803 73.5367955,285.261736 73.5261231,285.143433 L73.5108633,284.932132 C73.5065215,284.853507 73.5031406,284.766433 73.5013691,284.670136 L73.5,284.5 C73.5,280.103149 77.1031494,276.5 81.5,276.5 Z" id="Restart"></path>
                      </g>
                  </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'lock', indexRow)" @click="clickAction(indexRow, head, 'lock')" class="action-btn">
              <svg width="11px" height="12px" viewBox="0 0 11 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>LOCK</title>
                <desc>Created with sketchtool.</desc>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="02.1sso_provider_subuser_details" transform="translate(-1439.000000, -304.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Group-2" transform="translate(95.000000, 146.000000)">
                            <g id="Table-raw-Copy" transform="translate(0.000000, 130.000000)">
                                <g id="Table-raw">
                                    <g id="tr/actions-copy" transform="translate(1318.773946, 27.000000)">
                                        <g id="Actions">
                                            <g id="lock" transform="translate(25.000000, 1.000000)">
                                                <path d="M5.6275757,0.413264693 C7.35673817,0.413264693 8.75850132,1.81502784 8.75850132,3.54419031 L8.7580599,4.25101381 L9.14709761,4.25137154 C9.85253276,4.25137154 10.4244009,4.82323972 10.4244009,5.52867488 L10.4244009,10.1359614 C10.4244009,10.8413965 9.85253276,11.4132647 9.14709761,11.4132647 L2.10805379,11.4132647 C1.40261863,11.4132647 0.830750448,10.8413965 0.830750448,10.1359614 L0.830750448,5.52867488 C0.830750448,4.82323972 1.40261863,4.25137154 2.10805379,4.25137154 L2.496354,4.25101381 L2.49665008,3.54419031 C2.49665008,1.81502784 3.89841322,0.413264693 5.6275757,0.413264693 Z M5.6275757,1.50809613 C4.50307193,1.50809613 3.59148151,2.41968654 3.59148151,3.54419031 L3.59148151,4.25137154 L7.66366988,4.25137154 L7.66366988,3.54419031 C7.66366988,2.41968654 6.75207947,1.50809613 5.6275757,1.50809613 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'reset-pin', indexRow)" @click="clickAction(indexRow, head, 'reset-pin')" class="action-btn">
              <svg width="12px" height="17px" viewBox="0 0 12 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>RESET PIN</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="01.3vsms_subcrbs_edit_profiles" transform="translate(-1498.000000, -341.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Group-5" transform="translate(393.000000, 223.424644)">
                            <g id="Group">
                                <g id="Group-2" transform="translate(4.000000, 117.125000)">
                                    <path d="M1111.5,6.97285871 L1111,6.97285871 L1111,4.97285871 C1111,2.76685871 1109.206,0.972858712 1107,0.972858712 C1104.794,0.972858712 1103,2.76685871 1103,4.97285871 L1103,6.97285871 L1102.5,6.97285871 C1101.67333,6.97285871 1101,7.64552538 1101,8.47285871 L1101,15.4728587 C1101,16.300192 1101.67333,16.9728587 1102.5,16.9728587 L1111.5,16.9728587 C1112.32667,16.9728587 1113,16.300192 1113,15.4728587 L1113,8.47285871 C1113,7.64552538 1112.32667,6.97285871 1111.5,6.97285871 Z M1104.33333,4.97285871 C1104.33333,3.50219204 1105.52933,2.30619204 1107,2.30619204 C1108.47067,2.30619204 1109.66667,3.50219204 1109.66667,4.97285871 L1109.66667,6.97285871 L1104.33333,6.97285871 L1104.33333,4.97285871 Z M1107.66667,12.1208587 L1107.66667,13.6395254 C1107.66667,14.0075254 1107.36867,14.306192 1107,14.306192 C1106.63133,14.306192 1106.33333,14.0075254 1106.33333,13.6395254 L1106.33333,12.1208587 C1105.93667,11.8895254 1105.66667,11.464192 1105.66667,10.9728587 C1105.66667,10.2375254 1106.26467,9.63952538 1107,9.63952538 C1107.73533,9.63952538 1108.33333,10.2375254 1108.33333,10.9728587 C1108.33333,11.464192 1108.06333,11.8895254 1107.66667,12.1208587 Z" id="Shape"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'reset', indexRow)" @click="clickAction(indexRow, head, 'reset')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>RESET TYPE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="14.billing_provider" transform="translate(-1949.000000, -376.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Group-12" transform="translate(95.000000, 128.000000)">
                            <g id="Group-6" transform="translate(288.000000, 80.500000)">
                                <g id="Group-3" transform="translate(5.223350, 165.222859)">
                                    <g id="Actions-Copy-3" transform="translate(1560.064827, 1.875000)">
                                        <path d="M6.1400968,0.807062448 C5.13324378,1.10305663 4.20986405,1.6019404 3.42012755,2.26948897 L3.26,2.41 L3.25526679,2.37993639 C3.16972692,1.83985827 2.66285898,1.47159715 2.12309577,1.55708724 C1.58333257,1.64257734 1.21507145,2.14944528 1.30056154,2.68920848 L1.67968609,5.08290666 C1.76274164,5.60729877 2.25517527,5.96507274 2.77956738,5.88201719 L5.17326555,5.50289265 C5.71302876,5.41740255 6.08128988,4.91053461 5.99579978,4.37077141 L5.97117239,4.25783575 C5.89931995,4.00092433 5.72906024,3.79192858 5.50895358,3.66612966 L5.43,3.627 L5.56752598,3.54082993 C6.00780355,3.27554373 6.48906377,3.07518705 6.99902597,2.94803919 C9.78914688,2.25238392 12.6149268,3.95028379 13.3105821,6.7404047 C14.0062373,9.53052561 12.3083375,12.3563055 9.51821656,13.0519608 C6.72809565,13.7476161 3.90231573,12.0497162 3.20666046,9.2595953 C3.05356181,8.64555018 2.43166892,8.27187923 1.8176238,8.42497787 C1.20357868,8.57807652 0.829907728,9.19996941 0.983006372,9.81401453 C1.98485893,13.8322257 6.05442464,16.2774675 10.0726358,15.2756149 C14.0908469,14.2737623 16.5360887,10.2041966 15.5342362,6.18598547 C14.5323836,2.16777432 10.4628179,-0.277467454 6.44460673,0.724385108 L6.1400968,0.807062448 Z" id="Shape"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'password', indexRow)" @click="clickAction(indexRow, head, 'password')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                <title>CHANGE PASSWORD</title>
                <desc>Created with Sketch.</desc>
                <g id="Ic_change-password" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M15.5709875,6.1650358 C16.5844103,10.2296524 14.1109289,14.3462167 10.0463123,15.3596394 C5.9816957,16.3730622 1.86513144,13.8995808 0.851708692,9.8349642 C0.75818185,9.45984853 0.986454701,9.07993871 1.36157037,8.98641186 C1.73668605,8.89288502 2.11659587,9.12115787 2.21012271,9.49627355 C3.03649177,12.8106588 6.39323639,14.8275945 9.70762166,14.0012254 C13.0220069,13.1748563 15.0389426,9.81811173 14.2125735,6.50372645 C13.3862045,3.18934118 10.0294598,1.17240553 6.71507457,1.99877459 C5.49313018,2.30343955 4.42054581,2.95959917 3.60579508,3.87049666 L4.61661692,3.71033126 C4.90601901,3.66449447 5.17778381,3.86194316 5.2236206,4.15134525 C5.26945738,4.44074733 5.0720087,4.71251214 4.78260661,4.75834893 L2.18827026,5.16925144 C1.91552766,5.21244962 1.65940705,5.0263671 1.61620886,4.7536245 L1.20530635,2.15928815 C1.15946956,1.86988607 1.35691825,1.59812126 1.64632034,1.55228447 C1.93572243,1.50644769 2.20748723,1.70389637 2.25332402,1.99329846 L2.42676513,3.0929001 C3.44133107,1.89458971 4.80995669,1.03091475 6.37638392,0.640360577 C10.4410005,-0.373062166 14.5575648,2.10041918 15.5709875,6.1650358 Z M8,5.01895415 C8.93722048,5.01895415 9.69698779,5.77872146 9.69698779,6.71594193 L9.69674854,7.09904616 L9.90761022,7.09924006 C10.289962,7.09924006 10.5999193,7.40919738 10.5999193,7.79154911 L10.5999193,10.2887368 C10.5999193,10.6710885 10.289962,10.9810459 9.90761022,10.9810459 L6.09238978,10.9810459 C5.71003805,10.9810459 5.40008072,10.6710885 5.40008072,10.2887368 L5.40008072,7.79154911 C5.40008072,7.40919738 5.71003805,7.09924006 6.09238978,7.09924006 L6.30285174,7.09904616 L6.30301221,6.71594193 C6.30301221,5.77872146 7.06277952,5.01895415 8,5.01895415 Z M8,5.61236191 C7.39050958,5.61236191 6.89641998,6.10645152 6.89641998,6.71594193 L6.89641998,7.09924006 L9.10358002,7.09924006 L9.10358002,6.71594193 C9.10358002,6.10645152 8.60949042,5.61236191 8,5.61236191 Z" id="Shape" fill="#C3C3C3" fill-rule="nonzero"></path>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'retranscode', indexRow)" @click="clickAction(indexRow, head, 'retranscode')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>RETRANSCODE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Place-holders" transform="translate(-377.000000, -199.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Ic_edit1-Copy-28" transform="translate(377.000000, 199.000000)">
                            <g id="interface">
                                <path d="M3.84350588,17.4755859 C3.78173825,16.9609375 3.75,16.449707 3.75,16 C3.75,9.2873535 9.2873535,3.75 16,3.75 C19.1311035,3.75 22.0625,5.01245119 24.21875,6.98120119 L23.1374512,8.08129881 C22.8937988,8.32495119 22.8000488,8.68115237 22.8937988,9.01879881 C23.0063476,9.33740237 23.2687988,9.58129881 23.6062012,9.65625 C23.7949219,9.69409181 29.9946289,11.6918945 29.5998535,11.6125488 C30.1020508,11.7797851 30.8447266,11.2441406 30.7062988,10.5063476 C30.6682129,10.3173828 29.2956543,3.43041994 29.375,3.82495119 C29.3000488,3.48754881 29.0561524,3.20629881 28.71875,3.11254881 C28.4001465,3.01879881 28.0437012,3.11254881 27.8000488,3.35620119 L26.8813476,4.2561035 C24.0500488,1.61254881 20.1623535,0 16,0 C7.20629881,0 3.55271368e-15,7.20629881 3.55271368e-15,16 L3.55271368e-15,16.0373535 C3.55271368e-15,16.565918 0.0241699375,16.9743652 0.052246125,17.2868652 C0.089599625,17.7009277 0.394775375,18.0400391 0.80249025,18.1218262 L2.72851563,18.5068359 C3.35546875,18.6323242 3.91918944,18.1066894 3.84350588,17.4755859 L3.84350588,17.4755859 Z" id="Path"></path>
                                <path d="M31.203125,13.876709 L29.2714844,13.4831543 C28.6437988,13.3552246 28.0761719,13.8813476 28.1533203,14.5153809 C28.2202149,15.0625 28.25,15.5944824 28.25,16 C28.25,22.7124024 22.7126465,28.25 16,28.25 C12.8688965,28.25 9.9375,26.9875488 7.78125,25 L8.86254881,23.9187012 C9.10620119,23.6750488 9.19995119,23.3188476 9.10620119,22.9812012 C8.99365237,22.6623535 8.73120119,22.4187012 8.39379881,22.34375 C8.20507812,22.3056641 2.00537112,20.3081055 2.4001465,20.3874512 C2.08129881,20.3312988 1.76245119,20.4250488 1.5563965,20.6499024 C1.33129881,20.8562012 1.23754881,21.1936035 1.29370119,21.4936524 C1.33178712,21.6823731 2.70458987,28.5068359 2.62524412,28.1123047 C2.69995119,28.4499512 2.94384762,28.7312012 3.28125,28.824707 C3.67260744,28.9228516 3.99926756,28.8041992 4.19995119,28.5810547 L5.10009762,27.6811524 C7.93115237,30.3249512 11.8188476,32 16,32 C24.7937012,32 32,24.7937012 32,16 L32,15.9436035 C32,15.5280762 31.9848632,15.1201172 31.9501953,14.7145996 C31.9145507,14.300293 31.6105957,13.9599609 31.203125,13.876709 Z" id="Path"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'activate', indexRow)" @click="clickAction(indexRow, head, 'activate')" class="action-btn">
              <svg width="10px" height="15px" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>ACTIVATE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Assets" transform="translate(-149.000000, -243.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <path d="M158.512026,248.906172 L155.05883,248.906172 L158.039807,243.661238 C158.113584,243.532046 158.11315,243.373517 158.038612,243.24476 C157.963639,243.116111 157.826298,243.03701 157.677548,243.03701 L152.670679,243.03701 C152.491071,243.03701 152.331673,243.151968 152.275063,243.322232 L149.771629,250.86035 C149.728818,250.987477 149.750441,251.127644 149.828673,251.236408 C149.90734,251.345282 150.033273,251.409606 150.167245,251.409606 L153.706932,251.409606 L151.452863,256.69735 C151.372132,256.885216 151.439824,257.104049 151.612587,257.213575 C151.782525,257.322231 152.010812,257.293654 152.147935,257.138711 L158.82376,249.600592 C158.932959,249.47792 158.959906,249.302223 158.892648,249.152712 C158.82539,249.002767 158.676314,248.906172 158.512026,248.906172 Z" id="Activate"></path>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'update-status', indexRow)" @click="clickAction(indexRow, head, 'update-status')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>UPDATE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Place-holders" transform="translate(-377.000000, -199.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Ic_edit1-Copy-28" transform="translate(377.000000, 199.000000)">
                            <g id="interface">
                                <path d="M3.84350588,17.4755859 C3.78173825,16.9609375 3.75,16.449707 3.75,16 C3.75,9.2873535 9.2873535,3.75 16,3.75 C19.1311035,3.75 22.0625,5.01245119 24.21875,6.98120119 L23.1374512,8.08129881 C22.8937988,8.32495119 22.8000488,8.68115237 22.8937988,9.01879881 C23.0063476,9.33740237 23.2687988,9.58129881 23.6062012,9.65625 C23.7949219,9.69409181 29.9946289,11.6918945 29.5998535,11.6125488 C30.1020508,11.7797851 30.8447266,11.2441406 30.7062988,10.5063476 C30.6682129,10.3173828 29.2956543,3.43041994 29.375,3.82495119 C29.3000488,3.48754881 29.0561524,3.20629881 28.71875,3.11254881 C28.4001465,3.01879881 28.0437012,3.11254881 27.8000488,3.35620119 L26.8813476,4.2561035 C24.0500488,1.61254881 20.1623535,0 16,0 C7.20629881,0 3.55271368e-15,7.20629881 3.55271368e-15,16 L3.55271368e-15,16.0373535 C3.55271368e-15,16.565918 0.0241699375,16.9743652 0.052246125,17.2868652 C0.089599625,17.7009277 0.394775375,18.0400391 0.80249025,18.1218262 L2.72851563,18.5068359 C3.35546875,18.6323242 3.91918944,18.1066894 3.84350588,17.4755859 L3.84350588,17.4755859 Z" id="Path"></path>
                                <path d="M31.203125,13.876709 L29.2714844,13.4831543 C28.6437988,13.3552246 28.0761719,13.8813476 28.1533203,14.5153809 C28.2202149,15.0625 28.25,15.5944824 28.25,16 C28.25,22.7124024 22.7126465,28.25 16,28.25 C12.8688965,28.25 9.9375,26.9875488 7.78125,25 L8.86254881,23.9187012 C9.10620119,23.6750488 9.19995119,23.3188476 9.10620119,22.9812012 C8.99365237,22.6623535 8.73120119,22.4187012 8.39379881,22.34375 C8.20507812,22.3056641 2.00537112,20.3081055 2.4001465,20.3874512 C2.08129881,20.3312988 1.76245119,20.4250488 1.5563965,20.6499024 C1.33129881,20.8562012 1.23754881,21.1936035 1.29370119,21.4936524 C1.33178712,21.6823731 2.70458987,28.5068359 2.62524412,28.1123047 C2.69995119,28.4499512 2.94384762,28.7312012 3.28125,28.824707 C3.67260744,28.9228516 3.99926756,28.8041992 4.19995119,28.5810547 L5.10009762,27.6811524 C7.93115237,30.3249512 11.8188476,32 16,32 C24.7937012,32 32,24.7937012 32,16 L32,15.9436035 C32,15.5280762 31.9848632,15.1201172 31.9501953,14.7145996 C31.9145507,14.300293 31.6105957,13.9599609 31.203125,13.876709 Z" id="Path"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'renew', indexRow)" @click="clickAction(indexRow, head, 'renew')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>RENEW</title>
                <desc>Created with sketchtool.</desc>
                <g id="Components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Place-holders" transform="translate(-377.000000, -199.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Ic_edit1-Copy-28" transform="translate(377.000000, 199.000000)">
                            <g id="interface">
                                <path d="M3.84350588,17.4755859 C3.78173825,16.9609375 3.75,16.449707 3.75,16 C3.75,9.2873535 9.2873535,3.75 16,3.75 C19.1311035,3.75 22.0625,5.01245119 24.21875,6.98120119 L23.1374512,8.08129881 C22.8937988,8.32495119 22.8000488,8.68115237 22.8937988,9.01879881 C23.0063476,9.33740237 23.2687988,9.58129881 23.6062012,9.65625 C23.7949219,9.69409181 29.9946289,11.6918945 29.5998535,11.6125488 C30.1020508,11.7797851 30.8447266,11.2441406 30.7062988,10.5063476 C30.6682129,10.3173828 29.2956543,3.43041994 29.375,3.82495119 C29.3000488,3.48754881 29.0561524,3.20629881 28.71875,3.11254881 C28.4001465,3.01879881 28.0437012,3.11254881 27.8000488,3.35620119 L26.8813476,4.2561035 C24.0500488,1.61254881 20.1623535,0 16,0 C7.20629881,0 3.55271368e-15,7.20629881 3.55271368e-15,16 L3.55271368e-15,16.0373535 C3.55271368e-15,16.565918 0.0241699375,16.9743652 0.052246125,17.2868652 C0.089599625,17.7009277 0.394775375,18.0400391 0.80249025,18.1218262 L2.72851563,18.5068359 C3.35546875,18.6323242 3.91918944,18.1066894 3.84350588,17.4755859 L3.84350588,17.4755859 Z" id="Path"></path>
                                <path d="M31.203125,13.876709 L29.2714844,13.4831543 C28.6437988,13.3552246 28.0761719,13.8813476 28.1533203,14.5153809 C28.2202149,15.0625 28.25,15.5944824 28.25,16 C28.25,22.7124024 22.7126465,28.25 16,28.25 C12.8688965,28.25 9.9375,26.9875488 7.78125,25 L8.86254881,23.9187012 C9.10620119,23.6750488 9.19995119,23.3188476 9.10620119,22.9812012 C8.99365237,22.6623535 8.73120119,22.4187012 8.39379881,22.34375 C8.20507812,22.3056641 2.00537112,20.3081055 2.4001465,20.3874512 C2.08129881,20.3312988 1.76245119,20.4250488 1.5563965,20.6499024 C1.33129881,20.8562012 1.23754881,21.1936035 1.29370119,21.4936524 C1.33178712,21.6823731 2.70458987,28.5068359 2.62524412,28.1123047 C2.69995119,28.4499512 2.94384762,28.7312012 3.28125,28.824707 C3.67260744,28.9228516 3.99926756,28.8041992 4.19995119,28.5810547 L5.10009762,27.6811524 C7.93115237,30.3249512 11.8188476,32 16,32 C24.7937012,32 32,24.7937012 32,16 L32,15.9436035 C32,15.5280762 31.9848632,15.1201172 31.9501953,14.7145996 C31.9145507,14.300293 31.6105957,13.9599609 31.203125,13.876709 Z" id="Path"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'sync', indexRow)" @click="clickAction(indexRow, head, 'sync')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>SYNC FROM DRM</title>
                <desc>Created with sketchtool.</desc>
                <g id="Components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Place-holders" transform="translate(-377.000000, -199.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Ic_edit1-Copy-28" transform="translate(377.000000, 199.000000)">
                            <g id="interface">
                                <path d="M3.84350588,17.4755859 C3.78173825,16.9609375 3.75,16.449707 3.75,16 C3.75,9.2873535 9.2873535,3.75 16,3.75 C19.1311035,3.75 22.0625,5.01245119 24.21875,6.98120119 L23.1374512,8.08129881 C22.8937988,8.32495119 22.8000488,8.68115237 22.8937988,9.01879881 C23.0063476,9.33740237 23.2687988,9.58129881 23.6062012,9.65625 C23.7949219,9.69409181 29.9946289,11.6918945 29.5998535,11.6125488 C30.1020508,11.7797851 30.8447266,11.2441406 30.7062988,10.5063476 C30.6682129,10.3173828 29.2956543,3.43041994 29.375,3.82495119 C29.3000488,3.48754881 29.0561524,3.20629881 28.71875,3.11254881 C28.4001465,3.01879881 28.0437012,3.11254881 27.8000488,3.35620119 L26.8813476,4.2561035 C24.0500488,1.61254881 20.1623535,0 16,0 C7.20629881,0 3.55271368e-15,7.20629881 3.55271368e-15,16 L3.55271368e-15,16.0373535 C3.55271368e-15,16.565918 0.0241699375,16.9743652 0.052246125,17.2868652 C0.089599625,17.7009277 0.394775375,18.0400391 0.80249025,18.1218262 L2.72851563,18.5068359 C3.35546875,18.6323242 3.91918944,18.1066894 3.84350588,17.4755859 L3.84350588,17.4755859 Z" id="Path"></path>
                                <path d="M31.203125,13.876709 L29.2714844,13.4831543 C28.6437988,13.3552246 28.0761719,13.8813476 28.1533203,14.5153809 C28.2202149,15.0625 28.25,15.5944824 28.25,16 C28.25,22.7124024 22.7126465,28.25 16,28.25 C12.8688965,28.25 9.9375,26.9875488 7.78125,25 L8.86254881,23.9187012 C9.10620119,23.6750488 9.19995119,23.3188476 9.10620119,22.9812012 C8.99365237,22.6623535 8.73120119,22.4187012 8.39379881,22.34375 C8.20507812,22.3056641 2.00537112,20.3081055 2.4001465,20.3874512 C2.08129881,20.3312988 1.76245119,20.4250488 1.5563965,20.6499024 C1.33129881,20.8562012 1.23754881,21.1936035 1.29370119,21.4936524 C1.33178712,21.6823731 2.70458987,28.5068359 2.62524412,28.1123047 C2.69995119,28.4499512 2.94384762,28.7312012 3.28125,28.824707 C3.67260744,28.9228516 3.99926756,28.8041992 4.19995119,28.5810547 L5.10009762,27.6811524 C7.93115237,30.3249512 11.8188476,32 16,32 C24.7937012,32 32,24.7937012 32,16 L32,15.9436035 C32,15.5280762 31.9848632,15.1201172 31.9501953,14.7145996 C31.9145507,14.300293 31.6105957,13.9599609 31.203125,13.876709 Z" id="Path"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'retranscode-error', indexRow)" @click="clickAction(indexRow, head, 'retranscode-error')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Defficient, Update</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Assets" transform="translate(-90.000000, -54.000000)">
                        <g id="update_error" transform="translate(90.000000, 54.000000)">
                            <g id="interface" transform="translate(2.000000, 2.000000)" fill="#C3C3C3" fill-rule="nonzero">
                                <path d="M14.5580763,6.73224097 L14.6357422,6.74157716 L15.6015625,6.9383545 C15.8052978,6.97998047 15.9572754,7.1501465 15.9750977,7.35729981 C15.9924316,7.56005859 16,7.76403809 16,7.97180175 L16,7.97180175 L16,8 C16,12.3968506 12.3968506,16 8,16 C5.90942381,16 3.96557619,15.1624756 2.55004881,13.8405762 L2.55004881,13.8405762 L2.09997559,14.2905273 C1.99963378,14.4020996 1.83630372,14.4614258 1.640625,14.4123535 C1.47192381,14.3656006 1.34997559,14.2249756 1.31262206,14.0561523 L1.31411299,14.0635688 L1.313,14.06 L1.31005277,14.0433891 C1.25649903,13.7771985 0.710811345,11.0645023 0.651642016,10.7706125 L0.646850594,10.7468262 C0.618774406,10.5968018 0.665649406,10.4281006 0.77819825,10.3249512 C0.881225594,10.2125244 1.04064941,10.1656494 1.20007325,10.1937256 C1.00268556,10.1540528 4.10253906,11.152832 4.19689941,11.171875 C4.36560059,11.2093506 4.49682619,11.3311768 4.55310059,11.4906006 C4.59997559,11.6594238 4.55310059,11.8375244 4.43127441,11.9593506 L4.43127441,11.9593506 L3.890625,12.5 C4.96875,13.4937744 6.43444825,14.125 8,14.125 C11.3563233,14.125 14.125,11.3562012 14.125,8 C14.125,7.79724122 14.1101074,7.53125 14.0766602,7.25769044 C14.0380859,6.94067381 14.3218994,6.67761231 14.6357422,6.74157716 Z M8,1.37667655e-12 C10.0811768,1.37667655e-12 12.0250244,0.806274406 13.4406738,2.12805175 L13.4406738,2.12805175 L13.9000244,1.67810059 C14.0218506,1.55627441 14.2000733,1.50939941 14.359375,1.55627441 C14.5280762,1.60314941 14.6500244,1.74377441 14.6875,1.91247559 L14.687,1.911 C14.6492965,1.7225161 15.2842668,4.90861287 15.3483585,5.22924899 L15.3531494,5.25317381 C15.4223633,5.62207031 15.0510254,5.88989256 14.7999268,5.80627441 C14.9973144,5.84594725 11.8974609,4.84704591 11.8031006,4.828125 C11.6343994,4.79064941 11.5031738,4.66870119 11.4468994,4.50939941 C11.4000244,4.34057619 11.4468994,4.16247559 11.5687256,4.04064941 L11.5687256,4.04064941 L12.109375,3.49060059 C11.03125,2.50622559 9.56555175,1.875 8,1.875 C4.64367675,1.875 1.875,4.64367675 1.875,8 C1.875,8.2248535 1.89086913,8.48046875 1.92175294,8.73779297 C1.95959472,9.05334472 1.67773438,9.31616213 1.36425781,9.25341797 L1.36425781,9.25341797 L0.401245125,9.06091309 C0.197387688,9.02001953 0.0447998125,8.85046388 0.0261230625,8.64343263 C0.0120849688,8.48718263 4.17443857e-14,8.282959 4.17443857e-14,8.01867675 L4.17443857e-14,8.01867675 L4.17443857e-14,8 C4.17443857e-14,3.60314941 3.60314941,1.37667655e-12 8,1.37667655e-12 Z" id="Combined-Shape"></path>
                            </g>
                            <g id="Ic/error" transform="translate(-0.001218, 0.287666)">
                                <rect id="Rectangle" fill="#FFFFFF" x="3.01327462" y="1.37738059" width="1.98446352" height="5.95339056"></rect>
                                <path d="M8.04108736,5.94098411 L5.13849286,0.597379873 C4.91941884,0.228580159 4.53250457,0.00831987533 4.10352602,0.00831987533 C3.67454748,0.00831987533 3.2876332,0.228580159 3.06855918,0.597379873 C3.06690803,0.600201256 3.06551337,0.60302264 3.06386222,0.605844023 L0.170918132,5.93253599 C-0.0528528496,6.30911054 -0.0570849249,6.76134947 0.159392139,7.1421561 C0.376366152,7.52318715 0.767256017,7.75048486 1.20564452,7.75048486 L6.98537694,7.75048486 C7.42376544,7.75048486 7.83071795,7.52318715 8.04767594,7.1421561 C8.264153,6.7613655 8.25993696,6.30909451 8.04108736,5.94098411 Z M3.62212746,2.45505254 C3.62212746,2.1891692 3.83765872,1.97365397 4.10352602,1.97365397 C4.36940936,1.97365397 4.58492459,2.18918523 4.58492459,2.45505254 L4.58492459,4.38066283 C4.58492459,4.64651411 4.36939333,4.8620614 4.10352602,4.8620614 C3.83765872,4.8620614 3.62212746,4.64649808 3.62212746,4.38066283 L3.62212746,2.45505254 L3.62212746,2.45505254 Z M4.10352602,6.78768773 C3.70534224,6.78768773 3.38141214,6.46377366 3.38141214,6.06557385 C3.38141214,5.66739006 3.70532621,5.343476 4.10352602,5.343476 C4.50170981,5.343476 4.82562387,5.66739006 4.82562387,6.06557385 C4.8256399,6.46375763 4.50172584,6.78768773 4.10352602,6.78768773 Z" id="Shape" fill="#FF3366" fill-rule="nonzero"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span  v-if="getButtonExists(head,'reprocess', indexRow)" @click="clickAction(indexRow, head, 'reprocess')" class="action-btn">
              <svg width="16px" height="7px" viewBox="0 0 16 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>REPROCESS</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Assets" transform="translate(-254.000000, -279.000000)">
                        <g id="Ic_repaage" transform="translate(253.000000, 275.000000)">
                            <g id="outline-message-24px" transform="translate(1.000000, 0.000000)">
                                <g id="Bounding_Boxes">
                                    <polygon id="Shape" points="0 0 16 0 16 16 0 16"></polygon>
                                </g>
                            </g>
                            <path d="M13.784672,6.84864782 C12.3811627,5.62721541 10.5603939,4.87614828 8.54996163,4.87614828 C5.02222207,4.87614828 2.04071314,7.1748689 0.993771078,10.3536278 L2.78419374,10.9453776 C3.58078009,8.52527243 5.8567411,6.77278245 8.54996163,6.77278245 C10.0293363,6.77278245 11.3797398,7.3190131 12.4342684,8.19905135 L9.68794214,10.9453776 L16.5158252,10.9453776 L16.5158252,4.11749461 L13.784672,6.84864782 Z" id="Shape" fill="#C3C3C3" fill-rule="nonzero"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'document', indexRow)" @click="clickAction(indexRow, head, 'document')" class="action-btn">
              <svg width="14px" height="18px" viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>DOWNLOAD INVOICE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="01.6vsms_subcrbs_edit_purchases" transform="translate(-2428.000000, -342.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Group-5" transform="translate(393.000000, 228.424644)">
                            <g id="Group">
                                <g id="Group-2" transform="translate(5.000000, 112.125000)">
                                    <g id="update-copy" transform="translate(1688.361823, 0.972859)">
                                        <path d="M347.886719,0.477497089 C348.566293,0.477497089 349.117187,1.02839162 349.117187,1.70796584 L349.117187,1.70796584 L349.117187,4.22359084 L352.042969,4.22359084 C352.722543,4.22359084 353.273437,4.77448537 353.273437,5.45405959 L353.273437,5.45405959 L353.273437,14.4774971 L342.5,14.4774971 L342.5,0.477497089 Z M349.376953,11.6064033 L344.550781,11.6064033 L344.550781,12.4267158 L349.376953,12.4267158 L349.376953,11.6064033 Z M351.222656,9.96577834 L344.550781,9.96577834 L344.550781,10.7860908 L351.222656,10.7860908 L351.222656,9.96577834 Z M351.222656,8.32515334 L344.550781,8.32515334 L344.550781,9.14546584 L351.222656,9.14546584 L351.222656,8.32515334 Z M351.222656,6.68452834 L344.550781,6.68452834 L344.550781,7.50484084 L351.222656,7.50484084 L351.222656,6.68452834 Z M349.9375,1.9028174 L351.602242,3.40327834 L349.9375,3.40327834 L349.9375,1.9028174 Z" id="Combined-Shape-Copy-4"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'pending', indexRow)" @click="clickAction(indexRow, head, 'pending')" class="action-btn">
              <svg width="17px" height="17px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>CHANGE TO PENDING</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Assets" transform="translate(-274.000000, -242.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <path d="M282.165825,242.282899 C286.514653,242.282899 290.040825,245.809071 290.040825,250.157899 C290.040825,254.506727 286.514653,258.032899 282.165825,258.032899 C277.816997,258.032899 274.290825,254.506727 274.290825,250.157899 C274.290825,245.809071 277.816997,242.282899 282.165825,242.282899 Z M282.165825,243.908226 C278.715064,243.908226 275.916152,246.707138 275.916152,250.157899 C275.916152,253.608659 278.715064,256.407572 282.165825,256.407572 C285.616585,256.407572 288.415498,253.608659 288.415498,250.157899 C288.415498,246.707138 285.616585,243.908226 282.165825,243.908226 Z M281.854002,247.500682 C282.240601,247.500682 282.554002,247.814083 282.554002,248.200682 L282.554002,250.420682 L284.837868,251.848385 C285.189141,252.067885 285.295965,252.530588 285.076465,252.881861 C284.856965,253.233134 284.394262,253.339957 284.042989,253.120457 L281.450696,251.500612 C281.32296,251.420794 281.227549,251.308817 281.168398,251.181733 L281.149573,251.153986 C281.088824,251.050282 281.054002,250.929549 281.054002,250.800682 L281.054002,248.200682 C281.054002,247.814083 281.367403,247.500682 281.754002,247.500682 L281.854002,247.500682 Z" id="Pending"></path>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'paid', indexRow)" @click="clickAction(indexRow, head, 'paid')" class="action-btn">
              <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>CHANGE TO PAID</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Assets" transform="translate(-82.000000, -241.000000)" fill="#C3C3C3">
                        <path d="M91.25,241.657899 C95.9444204,241.657899 99.75,245.463478 99.75,250.157899 C99.75,254.852319 95.9444204,258.657899 91.25,258.657899 C86.5555796,258.657899 82.75,254.852319 82.75,250.157899 C82.75,245.463478 86.5555796,241.657899 91.25,241.657899 Z M93.6632651,247.352405 L90.156876,250.863549 L88.8372182,249.544098 C88.4847709,249.19165 87.9315894,249.16228 87.5456864,249.455986 L87.4276969,249.561265 C87.0436432,249.945318 87.0431459,250.567839 87.4265855,250.952506 L89.4472368,252.96261 C89.4823192,252.99751 89.5199828,253.029714 89.5599074,253.05895 C89.7243674,253.179382 89.9193941,253.244524 90.1194304,253.248946 C90.3677095,253.277997 90.663168,253.176914 90.8766586,252.963472 L95.0725952,248.761094 C95.424799,248.40889 95.454131,247.855685 95.1603416,247.469806 L95.0556193,247.352405 C94.6711313,246.967917 94.0477531,246.967917 93.6632651,247.352405 Z" id="Pay"></path>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'import-pack', indexRow)" @click="clickAction(indexRow, head, 'import-pack')" class="action-btn">
              <svg width="19px" height="16px" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>IMPORT</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Developer" transform="translate(-75.000000, -109.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Inport" transform="translate(75.000000, 108.000000)">
                            <path d="M17.2727273,14.6818182 C17.7497005,14.6818182 18.1363636,15.0684814 18.1363636,15.5454545 C18.1363636,16.0224277 17.7497005,16.4090909 17.2727273,16.4090909 L1.72727273,16.4090909 C1.25029953,16.4090909 0.863636364,16.0224277 0.863636364,15.5454545 C0.863636364,15.0684814 1.25029953,14.6818182 1.72727273,14.6818182 L17.2727273,14.6818182 Z M9.5,1.76919378 C9.91396041,1.76919378 10.2495416,2.10477499 10.2495416,2.5187354 L10.2495416,2.5187354 L10.2491622,10.0929123 L12.6468169,7.69512904 C12.9395311,7.40241482 13.4141146,7.40241482 13.7068288,7.69512904 C13.999543,7.98784325 13.999543,8.46242675 13.7068288,8.75514096 L13.7068288,8.75514096 L9.99031716,12.4716526 C9.69760295,12.7643668 9.22301945,12.7643668 8.93030524,12.4716526 C8.86059701,12.4019444 8.8074894,12.3219218 8.77098241,12.2364976 L8.77098241,12.2364976 L5.29317119,8.75514096 C5.00045698,8.46242675 5.00045698,7.98784325 5.29317119,7.69512904 C5.5858854,7.40241482 6.06046891,7.40241482 6.35318312,7.69512904 L6.35318312,7.69512904 L8.74973122,10.0918057 L8.75045838,2.5187354 C8.75045838,2.10477499 9.08603959,1.76919378 9.5,1.76919378 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'new-pack', indexRow)" @click="clickAction(indexRow, head, 'new-pack')" class="action-btn">
              <svg width="16px" height="17px" viewBox="0 0 16 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>NEW PACKAGE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Developer" transform="translate(-75.000000, -142.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Newpackage" transform="translate(75.000000, 142.500000)">
                            <path d="M12.75,11.5 C13.1642187,11.5 13.5,11.8357812 13.5,12.25 L13.5,12.25 L13.5,13 L14.25,13 C14.6642188,13 15,13.3357812 15,13.75 C15,14.1642187 14.6642188,14.5 14.25,14.5 L14.25,14.5 L13.5,14.5 L13.5,15.25 C13.5,15.6642187 13.1642187,16 12.75,16 C12.3357813,16 12,15.6642187 12,15.25 L12,15.25 L12,14.5 L11.25,14.5 C10.8357813,14.5 10.5,14.1642187 10.5,13.75 C10.5,13.3357812 10.8357813,13 11.25,13 L11.25,13 L12,13 L12,12.25 C12,11.8357812 12.3357813,11.5 12.75,11.5 Z M15,-7.33024752e-14 C15.5,-7.33024752e-14 16,0.579434932 16,1 L16,1 L16,11.25 C16,11.6642187 15.6642188,12 15.25,12 C14.8357813,12 14.5,11.6642187 14.5,11.25 L14.5,11.25 L14.5,7.1875 C14.5,7.08409375 14.4159063,7 14.3125,7 L14.3125,7 L1.5,7 L1.5,12.8125 C1.5,12.9159062 1.58409375,13 1.6875,13 L1.6875,13 L9,13 C9.41421875,13 9.75,13.3357812 9.75,13.75 C9.75,14.1642187 9.41421875,14.5 9,14.5 L9,14.5 L1.6875,14.5 C0.75703125,14.5 0,13.743 0,12.8125 L0,12.8125 L0,1.6875 C0,0.757 0.75703125,-7.33024752e-14 1.6875,-7.33024752e-14 L1.6875,-7.33024752e-14 Z M14.3120669,1.5 L1.70336614,1.5 C1.59120971,1.5 1.5,1.58409375 1.5,1.6875 L1.5,1.6875 L1.5,5.5 L14.5154331,5.5 L14.5154331,1.6875 C14.5154331,1.58409375 14.4242233,1.5 14.3120669,1.5 L14.3120669,1.5 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'cancel', indexRow)" @click="clickAction(indexRow, head, 'cancel')" class="action-btn">
              <svg width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>CANCEL</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Assets" transform="translate(-208.000000, -242.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <path d="M216.610025,242.477099 C220.852013,242.477099 224.290825,245.91591 224.290825,250.157899 C224.290825,254.399887 220.852013,257.838698 216.610025,257.838698 C212.368036,257.838698 208.929225,254.399887 208.929225,250.157899 C208.929225,245.91591 212.368036,242.477099 216.610025,242.477099 Z M221.272264,246.911259 L213.363386,254.820138 C214.283629,255.462165 215.402855,255.838698 216.610025,255.838698 C219.747444,255.838698 222.290825,253.295318 222.290825,250.157899 C222.290825,248.950729 221.914291,247.831502 221.272264,246.911259 Z M216.610025,244.477099 C213.472606,244.477099 210.929225,247.02048 210.929225,250.157899 C210.929225,251.365506 211.306031,252.485105 211.948483,253.405537 L219.857663,245.496357 C218.937231,244.853905 217.817632,244.477099 216.610025,244.477099 Z" id="Cancel"></path>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'delete', indexRow)" @click="openModal(indexRow, head, 'delete')" class="action-btn">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 57.1 (101010) - https://sketch.com -->
                <title>DELETE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="03_Provider_devices" transform="translate(-734.000000, -310.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Group-14" transform="translate(79.000000, 82.433318)">
                            <g id="Group-3" transform="translate(0.000000, 97.566682)">
                                <g id="Tr-Copy-2" transform="translate(0.000000, 114.000000)">
                                    <g id="Tr_application">
                                        <g id="Group-2" transform="translate(0.677008, 0.000000)">
                                            <g id="Group">
                                                <g id="Actions" transform="translate(588.000000, 16.000000)">
                                                    <g id="Ic_edit1-Ic_close">
                                                        <g transform="translate(66.000000, 0.000000)">
                                                            <g id="Ic_close">
                                                                <path d="M8.07049451,0.422307929 C12.2431726,0.422307929 15.6257965,3.80493183 15.6257965,7.97760987 C15.6257965,12.1502879 12.2431726,15.5329118 8.07049451,15.5329118 C3.89781647,15.5329118 0.515192576,12.1502879 0.515192576,7.97760987 C0.515192576,3.80493183 3.89781647,0.422307929 8.07049451,0.422307929 Z M8.07049451,1.92230793 C4.7262436,1.92230793 2.01519258,4.63335895 2.01519258,7.97760987 C2.01519258,11.3218608 4.7262436,14.0329118 8.07049451,14.0329118 C11.4147454,14.0329118 14.1257965,11.3218608 14.1257965,7.97760987 C14.1257965,4.63335895 11.4147454,1.92230793 8.07049451,1.92230793 Z M10.6942137,5.35389069 C10.9400898,5.5997668 10.9400898,5.99841073 10.6942137,6.24428684 L8.96089067,7.97760987 L10.6942137,9.71093289 C10.9400898,9.956809 10.9400898,10.3554529 10.6942137,10.601329 C10.4483376,10.8472052 10.0496936,10.8472052 9.80381754,10.601329 L8.07049451,8.86800602 L6.33717149,10.601329 C6.09129538,10.8472052 5.69265144,10.8472052 5.44677533,10.601329 C5.20089923,10.3554529 5.20089923,9.956809 5.44677533,9.71093289 L7.18009836,7.97760987 L5.44677533,6.24428684 C5.20089923,5.99841073 5.20089923,5.5997668 5.44677533,5.35389069 C5.69265144,5.10801458 6.09129538,5.10801458 6.33717149,5.35389069 L8.07049451,7.08721371 L9.80381754,5.35389069 C10.0496936,5.10801458 10.4483376,5.10801458 10.6942137,5.35389069 Z" id="Combined-Shape"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'delete1', indexRow)" @click="clickAction(indexRow, head, 'delete1')" :class="'action-btn ' + getCoumnClass(head, indexRow)">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 57.1 (101010) - https://sketch.com -->
                <title>DELETE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="03_Provider_devices" transform="translate(-734.000000, -310.000000)" fill="#C3C3C3" fill-rule="nonzero">
                        <g id="Group-14" transform="translate(79.000000, 82.433318)">
                            <g id="Group-3" transform="translate(0.000000, 97.566682)">
                                <g id="Tr-Copy-2" transform="translate(0.000000, 114.000000)">
                                    <g id="Tr_application">
                                        <g id="Group-2" transform="translate(0.677008, 0.000000)">
                                            <g id="Group">
                                                <g id="Actions" transform="translate(588.000000, 16.000000)">
                                                    <g id="Ic_edit1-Ic_close">
                                                        <g transform="translate(66.000000, 0.000000)">
                                                            <g id="Ic_close">
                                                                <path d="M8.07049451,0.422307929 C12.2431726,0.422307929 15.6257965,3.80493183 15.6257965,7.97760987 C15.6257965,12.1502879 12.2431726,15.5329118 8.07049451,15.5329118 C3.89781647,15.5329118 0.515192576,12.1502879 0.515192576,7.97760987 C0.515192576,3.80493183 3.89781647,0.422307929 8.07049451,0.422307929 Z M8.07049451,1.92230793 C4.7262436,1.92230793 2.01519258,4.63335895 2.01519258,7.97760987 C2.01519258,11.3218608 4.7262436,14.0329118 8.07049451,14.0329118 C11.4147454,14.0329118 14.1257965,11.3218608 14.1257965,7.97760987 C14.1257965,4.63335895 11.4147454,1.92230793 8.07049451,1.92230793 Z M10.6942137,5.35389069 C10.9400898,5.5997668 10.9400898,5.99841073 10.6942137,6.24428684 L8.96089067,7.97760987 L10.6942137,9.71093289 C10.9400898,9.956809 10.9400898,10.3554529 10.6942137,10.601329 C10.4483376,10.8472052 10.0496936,10.8472052 9.80381754,10.601329 L8.07049451,8.86800602 L6.33717149,10.601329 C6.09129538,10.8472052 5.69265144,10.8472052 5.44677533,10.601329 C5.20089923,10.3554529 5.20089923,9.956809 5.44677533,9.71093289 L7.18009836,7.97760987 L5.44677533,6.24428684 C5.20089923,5.99841073 5.20089923,5.5997668 5.44677533,5.35389069 C5.69265144,5.10801458 6.09129538,5.10801458 6.33717149,5.35389069 L8.07049451,7.08721371 L9.80381754,5.35389069 C10.0496936,5.10801458 10.4483376,5.10801458 10.6942137,5.35389069 Z" id="Combined-Shape"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'download', indexRow)" @click="clickAction(indexRow, head, 'download')" class="action-btn">
              <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                <title>DOWNLOAD</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="02provider_sms_subcribers_view" transform="translate(-1281.000000, -915.000000)" fill="#C3C3C3">
                        <g id="Group-22" transform="translate(422.911823, 152.328355)">
                            <g id="Group-21-Copy-2" transform="translate(0.000000, 629.000000)">
                                <g id="Group-19" transform="translate(0.000000, 79.901449)">
                                    <g id="Group-18-Copy" transform="translate(0.000000, 0.000000)">
                                        <g id="Group-4-Copy-3" transform="translate(0.000000, 47.000000)">
                                            <g id="Group" transform="translate(21.500000, 0.000000)">
                                                <g id="Group-15-Copy-3" transform="translate(814.000000, 7.000000)">
                                                    <g id="Ic_close-Copy" transform="translate(22.000000, 0.000000)">
                                                        <g id="deletepicture" transform="translate(7.715260, 7.715260) scale(1, -1) translate(-7.715260, -7.715260) translate(0.215260, 0.215260)">
                                                            <path d="M7.44952226,14.56666 C3.57459181,14.56666 0.43334002,11.4254082 0.43334002,7.55047774 C0.43334002,3.67554728 3.57459181,0.534295497 7.44952226,0.534295497 C11.3244527,0.534295497 14.4657045,3.67554728 14.4657045,7.55047774 C14.4657045,11.4254082 11.3244527,14.56666 7.44952226,14.56666 Z M7.44952226,13.1136364 C10.5219699,13.1136364 13.0126809,10.6229254 13.0126809,7.55047774 C13.0126809,4.47803007 10.5219699,1.98731911 7.44952226,1.98731911 C4.37707459,1.98731911 1.88636364,4.47803007 1.88636364,7.55047774 C1.88636364,10.6229254 4.37707459,13.1136364 7.44952226,13.1136364 Z" id="Shape" transform="translate(7.449522, 7.550478) scale(1, -1) translate(-7.449522, -7.550478) "></path>
                                                            <path d="M6.79161242,4.18248465 C7.09075521,3.88334186 7.5757615,3.88334186 7.87490429,4.18248465 L10.4008039,6.70838425 C10.6999467,7.00752704 10.6999467,7.49253334 10.4008039,7.79167613 C10.1016611,8.09081892 9.61665481,8.09081892 9.31750715,7.79167126 L8.12601273,6.60011294 L8.12623559,10.5413783 C8.12623559,10.9644301 7.78328435,11.3073814 7.36023255,11.3073814 C6.93718076,11.3073814 6.59422952,10.9644301 6.59422952,10.5414061 L6.59380245,6.60076288 L5.40295309,7.79167613 C5.1038103,8.09081892 4.61880401,8.09081892 4.31966122,7.79167613 C4.02051843,7.49253334 4.02051843,7.00752704 4.31956881,6.70847671 L6.65194748,4.37372032 C6.68798753,4.30367084 6.73489933,4.23919774 6.79161242,4.18248465 Z M6.59373532,5.98138907 L7.03175412,6.1627877 L6.59380245,6.60076288 L6.59373532,5.98138907 Z M8.12601273,6.60011294 L7.6879589,6.16203562 L8.1259777,5.98059466 L8.12601273,6.60011294 Z" id="Path" fill-rule="nonzero"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'comment', indexRow)" @click="clickAction(indexRow, head, 'comment')" class="action-btn">
              <svg width="14px" height="15px" viewBox="0 0 14 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 60.1 (101010) - https://sketch.com -->
                <title>COMMENT</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="02_vlive_sys_createproviders" transform="translate(-786.000000, -804.000000)">
                        <g id="Group-4" transform="translate(88.000000, 72.000000)">
                            <g id="Stacked-Group" transform="translate(0.000000, 84.500000)">
                                <g id="Group-2-Copy-22" transform="translate(0.000000, 630.000000)">
                                    <g id="tr">
                                        <g id="Actions" transform="translate(675.000000, 17.000000)">
                                            <g id="Ic_edit1-Copy-2-Ic_message">
                                                <g transform="translate(22.000000, 0.000000)">
                                                    <g id="outline-message-24px">
                                                        <g id="Bounding_Boxes">
                                                            <polygon id="Shape" points="0 0 16 0 16 16 0 16"></polygon>
                                                        </g>
                                                        <g id="Outline" transform="translate(1.333333, 1.333333)" fill="#C3C3C3" fill-rule="nonzero">
                                                            <g id="Group">
                                                                <path d="M1.33333333,1.33333333 L12,1.33333333 L12,9.33333333 L2.11333333,9.33333333 L1.33333333,10.1133333 L1.33333333,1.33333333 L1.33333333,1.33333333 L1.33333333,1.33333333 Z M1.33333333,0 C0.6,0 0.00666666667,0.6 0.00666666667,1.33333333 L0,13.3333333 L2.66666667,10.6666667 L12,10.6666667 C12.7333333,10.6666667 13.3333333,10.0666667 13.3333333,9.33333333 L13.3333333,1.33333333 C13.3333333,0.6 12.7333333,0 12,0 L1.33333333,0 L1.33333333,0 Z" id="XMLID_641_"></path>
                                                                <path d="M10.6666667,6.8627451 C10.6666667,7.23093493 10.3681898,7.52941176 10,7.52941176 L3.33333333,7.52941176 C2.9651435,7.52941176 2.66666667,7.23093493 2.66666667,6.8627451 C2.66666667,6.49455526 2.9651435,6.19607843 3.33333333,6.19607843 L10,6.19607843 C10.3681898,6.19607843 10.6666667,6.49455526 10.6666667,6.8627451 Z" id="XMLID_644_"></path>
                                                                <path d="M10.6666667,3.80392157 C10.6666667,4.1721114 10.3681898,4.47058824 10,4.47058824 L3.33333333,4.47058824 C2.9651435,4.47058824 2.66666667,4.1721114 2.66666667,3.80392157 C2.66666667,3.43573174 2.9651435,3.1372549 3.33333333,3.1372549 L10,3.1372549 C10.3681898,3.1372549 10.6666667,3.43573174 10.6666667,3.80392157 Z" id="XMLID_642_"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'option', indexRow)" @click="clickAction(indexRow, head, 'option')" class="action-btn">
              <svg width="4px" height="15px" viewBox="0 0 4 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 57.1 (101010) - https://sketch.com -->
                <title>OPTIONS</title>
                <desc>Created with sketchtool.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="2cms_media_access-details" transform="translate(-813.000000, -604.000000)">
                        <g id="Group-4" transform="translate(88.000000, 97.000000)">
                            <g id="Stacked-Group" transform="translate(0.000000, 84.500000)">
                                <g id="Group-2-Copy-11" transform="translate(0.000000, 360.000000)">
                                    <g id="tr-copy" transform="translate(0.000000, 45.000000)">
                                        <g id="Actions" transform="translate(675.000000, 17.000000)">
                                            <g id="Ic_edit1-Copy-Ic_options">
                                                <g transform="translate(44.000000, 0.000000)">
                                                    <g id="options" transform="translate(4.500000, 0.000000)">
                                                        <rect id="Rectangle" x="0" y="0" width="7" height="16"></rect>
                                                        <path d="M3.5,11.8846154 C4.32842712,11.8846154 5,12.5561883 5,13.3846154 C5,14.2130425 4.32842712,14.8846154 3.5,14.8846154 C2.67157288,14.8846154 2,14.2130425 2,13.3846154 C2,12.5561883 2.67157288,11.8846154 3.5,11.8846154 Z M3.5,6.5 C4.32842712,6.5 5,7.17157288 5,8 C5,8.82842712 4.32842712,9.5 3.5,9.5 C2.67157288,9.5 2,8.82842712 2,8 C2,7.17157288 2.67157288,6.5 3.5,6.5 Z M3.5,1.11538462 C4.32842712,1.11538462 5,1.78695749 5,2.61538462 C5,3.44381174 4.32842712,4.11538462 3.5,4.11538462 C2.67157288,4.11538462 2,3.44381174 2,2.61538462 C2,1.78695749 2.67157288,1.11538462 3.5,1.11538462 Z" id="Ic_options" fill="#C3C3C3"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'invoice', indexRow)" @click="clickAction(indexRow, head, 'invoice')" class="action-btn">
              <svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>DOWNLOAD INVOICE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="00sso_provider_bills" transform="translate(-1555.000000, -303.000000)" fill="#C3C3C3">
                        <g id="Group-2" transform="translate(94.000000, 146.000000)">
                            <g id="Ic_report11-Copy" transform="translate(1459.000000, 157.000000)">
                                <path d="M8.71875,0.812837377 C8.90831122,0.804716681 9.10307975,0.869539349 9.25901806,1.02662904 L13.5399097,5.33912904 C13.6616336,5.46175167 13.7269648,5.60762055 13.7448691,5.75520241 L13.75,5.84408738 L13.75,13.7503374 C13.75,14.5442467 13.1064093,15.1878374 12.3125,15.1878374 L3.6875,15.1878374 C2.89359067,15.1878374 2.25,14.5442467 2.25,13.7503374 L2.25,2.25033738 C2.25,1.45642805 2.89359067,0.812837377 3.6875,0.812837377 L8.71875,0.812837377 Z M8.0247037,2.25008855 L3.6875,2.25033738 L3.6875,13.7503374 L12.3125,13.7503374 L12.3120741,6.56386633 L8.7173108,6.56423922 C8.3182973,6.56423922 7.99565563,6.23922409 7.99856038,5.84022131 L8.0247037,2.25008855 Z M9.45240741,3.57982929 L9.44134816,5.12673922 L10.9985185,5.1259404 L9.45240741,3.57982929 Z" id="Shape"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'purchaseinvoice', indexRow)" @click="clickAction(indexRow, head, 'purchaseinvoice')" class="action-btn">
              <svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: sketchtool 63.1 (101010) - https://sketch.com -->
                <title>PURCHASE INVOICE</title>
                <desc>Created with sketchtool.</desc>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="00sso_provider_bills" transform="translate(-1555.000000, -303.000000)" fill="#C3C3C3">
                        <g id="Group-2" transform="translate(94.000000, 146.000000)">
                            <g id="Ic_report11-Copy" transform="translate(1459.000000, 157.000000)">
                                <path d="M8.71875,0.812837377 C8.90831122,0.804716681 9.10307975,0.869539349 9.25901806,1.02662904 L13.5399097,5.33912904 C13.6616336,5.46175167 13.7269648,5.60762055 13.7448691,5.75520241 L13.75,5.84408738 L13.75,13.7503374 C13.75,14.5442467 13.1064093,15.1878374 12.3125,15.1878374 L3.6875,15.1878374 C2.89359067,15.1878374 2.25,14.5442467 2.25,13.7503374 L2.25,2.25033738 C2.25,1.45642805 2.89359067,0.812837377 3.6875,0.812837377 L8.71875,0.812837377 Z M8.0247037,2.25008855 L3.6875,2.25033738 L3.6875,13.7503374 L12.3125,13.7503374 L12.3120741,6.56386633 L8.7173108,6.56423922 C8.3182973,6.56423922 7.99565563,6.23922409 7.99856038,5.84022131 L8.0247037,2.25008855 Z M9.45240741,3.57982929 L9.44134816,5.12673922 L10.9985185,5.1259404 L9.45240741,3.57982929 Z" id="Shape"></path>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </span>
            <span v-if="getButtonExists(head,'no-action', indexRow)" class="action-btn"> _ _ _ </span>
          </span>
          <span class="body-font" v-else> _ _ _ </span>
          <!-- <TitlePopup v-if="titlePop[show02]" :showTitle="true" :tableData="getValueColumn(head, indexRow)"/> -->
        </div>
      </div>
      <Modal v-show="modalVisible" @close="modalVisible=false" class="modal-wrapper" :styles="modalStyle">
          <div slot="body" class="modal-body">
            <p>{{modalBody}}<span :class="modalClass"> {{modalState}} </span>?</p>
            <div class="modal-button-wrapper">
              <CustomButton primary :plus="false" @on-btn-click="getChangedVal()">YES</CustomButton>
              <CustomButton secondary @on-btn-click="modalVisible=false">CANCEL</CustomButton>
            </div>
          </div>
      </Modal>
    </div>
    <div v-else class="data-found-wrapper">
      <div class="data-found" v-if="flag === 2">
        <p class="data-para">Sorry, No Data Found</p>
      </div>
    </div>
  </div>
</template>
<script> 
import { mVMixin } from '@/mixins.js'
import Vue from 'vue'

import { VTooltip } from 'v-tooltip'
Vue.use(VTooltip)

Vue.directive('tooltip', VTooltip)

export default {
  props: {
    data: {
      type: Array
    },
    searchQuery: {
      type: Array
    },
    headerArray: {
      type: [Object, Array]
    },
    fromComponent: {
      type: String
    },
    offset: {
      type: Number
    },
    allSelected: {
      type: Boolean
    },
    checkboxValue: {
      type: String
    },
    counterArray: {
      type: Array
    },
    tableStyles: {
      type: [Object, Array, String]
    },
    isCounter: {
      type: Boolean
    },
    selectChecked: {
      type: Array
    },
    prechecked: {},
    preRadioChecked: {}
  },
  data () {
    return {
      checkSessionNo: false,
      records: [],
      detailIds: [],
      countArr: [],
      titleShow: {},
      modalContent: [],
      modalVisible: false,
      modalBody: '',
      modalState: '',
      modalClass: '',
      modalStyle: {},
      radioArray: [],
      flag: 1,
      tooltipstyle: {}
    }
  },
  computed: {
    titlePop () {
      return this.titleShow
    }
  },
  created () {
    this.preCheckedAction()
    this.preRadioAction()
    this.countArr = this.counterArray
    for (let indexRow in this.data) {
      for (let indexHead in this.getHeaderArray()) {
        this.titleShow[`show${indexRow}${indexHead}`] = false
      }
    }
    this.tooltipstyle = {
      width: '15px',
      height: '15px'
    }
    this.radioArray = new Array(this.data.length).fill(false)
  },
  watch: {
    prechecked () {
      this.preCheckedAction()
    },
    preRadioChecked () {
      this.preRadioAction()
    },
    allSelected () {
      this.selectAll(this.checkboxValue)
    },
    counterArray () {
      this.countArr = this.counterArray
    },
    modalVisible () {
      if (this.modalVisible) {
        document.documentElement.style.overflow = 'hidden'
        return
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    },
    isCounter () {
      this.flag = 2
    },
    data () {
      this.preCheckedAction()
      this.radioArray = new Array(this.data.length).fill(false)
      this.preRadioAction()
    },
    selectChecked () {
      if (!this.allSelected) {
        for (let value in this.data) {
          for (let i in this.detailIds) {
            if (this.data[value].checkid === this.detailIds[i].checkid) {
              this.detailIds.splice(i, 1)
            }
          }
        }
        this.checkedAction('checked')
        // this.select('checked')
        this.$emit('changeArr', this.detailIds)
      }
    }
  },
  mixins: [mVMixin],
  components: {
    // ToggleButton: () => import('@/components/Toggle.vue'),
    CustomButton: () => import('@/components/accordions/Button.vue'),
    Checkbox: () => import('@/components/accordions/Checkbox.vue'),
    // MCounterAction: () => import('@/components/CounterAction.vue'),
    Modal: () => import('@/components/accordions/Modal.vue'),
    // MRadio: () => import('@/components/Radio.vue'),
    // MToolTip: () => import('@/components/ToolTip.vue')
    // TitlePopup: () => import('@/components/TitlePopup.vue')
  },
  methods: {
    select (action, index) {
      this.checkedAction(action, index)
      this.$emit('changeSelectAll', false)
    },
    getTitlePop (indexRow, indexHead) {
      this.titleShow[`show${indexRow}${indexHead}`] = true
      // console.log(this.titleShow[`show${indexRow}${indexHead}`], this.titleShow)
      this.getTitleShow(indexRow, indexHead)
    },
    getClickCb (head, indexRow) {
      if (head.clickAction) {
        head.clickAction(this.data[indexRow])
      }
    },
    getContentTitle (head) {
      if (head.tooltipTitle) {
        return head.tooltipTitle
      }
    },
    sendModal (head, indexRow) {
      let action = 'toggle'
      if (head.toggleAction) {
        if (head.toggleAction[action]) {
          head.toggleAction[action](this.data[indexRow])
        }
      }
    },
    getChangedVal() {
      let action = this.modalContent[2]
      let index = this.modalContent[1]
      if (this.modalContent[2] === 'toggle') {
        this.changetoggle(this.modalContent[0], this.modalContent[1])
        for (let i in this.getHeaderArray()) {
          if (this.getHeaderArray()[i].toggleAction) {
            if (this.getHeaderArray()[i].toggleAction[action]) {
              this.getHeaderArray()[i].toggleAction[action](this.data[index])
            }
          }
        }
      } else if (this.modalContent[2] === 'delete') {
        this.clickAction(this.modalContent[0], this.modalContent[1], this.modalContent[2])
      }
      this.modalVisible = false
    },
    removeTitlePop (indexRow, indexHead) {
      this.titleShow[`show${indexRow}${indexHead}`] = false
      this.getTitleShow(indexRow, indexHead)
    },
    getTitleShow (indexRow, indexHead) {
      return this.titleShow[`show${indexRow}${indexHead}`]
    },
    getCount (index) {
      return this.countArr[index]
    },
    updateCount (index, head, event) {
      this.countArr[index] = event
      this.clickAction(index, head, 'count')
      this.$emit('changeCounterArr', this.countArr)
    },
    openModal(head, indexRow, val) {
      this.modalContent[0] = head
      this.modalContent[1] = indexRow
      this.modalContent[2] = val
      this.modalVisible = true
      if (val === 'toggle') {
        let value = head['value']
        let state = this.data[indexRow][value]
        state = state === head.activeValue ? head.inactiveValue : head.activeValue
        let color = state === head.activeValue ? 'secondary' : 'danger'
        this.modalBody = `Are you sure to change the Status to`
        this.modalState = state.toUpperCase()
        this.modalClass = color
        this.modalStyle = {
          width: '370px',
          height: '200px'
        }
      } else if (val === 'delete') {
        this.modalBody = `Are you sure you want to Delete`
        this.modalState = ''
        this.modalStyle = {
          width: '356px',
          height: '180px'
        }
      }
    },
    getCoumnClass (head, indexRow) {
      let columnDetails = {
        smallColumn: {
          className: 'small-column'
        },
        image: {
          className: 'imgdiv'
        },
        largeColumn: {
          className: 'large-column'
        },
        lastColumn: {
          className: 'last-column'
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
      let customClass = columnDetails[head.type] ? columnDetails[head.type].className : ''
      if (head.customClass) {
        if (typeof head.customClass === 'string') {
          customClass += ' ' + head.customClass
        } else if (head.customClass(this.data[indexRow])) {
          customClass += ' ' + head.customClass(this.data[indexRow])
        }
      }
      return customClass
    },
    getValueColumn (head, index) {
      let value = ''
      if (Array.isArray(head.value)) {
        let val = []
        if (Array.isArray(this.data[index][head.value[0]])) {
          if (this.data[index][head.value[0]]) {
            for (let i in this.data[index][head.value[0]]) {
              if (this.data[index][head.value[0]][i][head.value[1]]) {
                val.push(this.data[index][head.value[0]][i][head.value[1]])
              }
            }
          }
          value = val.join()
        } else {
          if (this.data[index][head.value[0]][head.value[1]]) {
            value = this.data[index][head.value[0]][head.value[1]]
          }
        }
      } else if (Array.isArray(this.data[index][head.value]) && typeof head.value === 'string') {
        if (this.data[index][head.value].length) {
          value = this.data[index][head.value].join()
        }
      } else if (typeof this.data[index][head.value] === 'object' && !this.data[index][head.value]) {
        value = ''
      } else if (typeof this.data[index][head.value] === 'object' && Object.keys(this.data[index][head.value]).length>0 && !Array.isArray(head.value)) {
        if (Object.keys(this.data[index][head.value]).join()) {
          value = Object.keys(this.data[index][head.value]).join()
        }
      } else if (typeof head.value === 'function') {
        value = head.value(head, index)
      } else if (typeof head.value === 'string') {
        if (this.data[index][head.value]) {
          value = this.data[index][head.value]
        }
      }
      if (value) {
        if (value === 'null' || value === 'undefined') {
          value = ''
        }
        return value
      } else {
        return ''
      }
    },
    getEnableDisableColumn (head, index) {
      let value = this.getValueColumn(head, index)
      if (value) {
        if (value.toLowerCase() === head.enable.toLowerCase()) {
          value = 'YES'
        } else if (value.toLowerCase() === head.disable.toLowerCase()) {
          value = 'NO'
        }
      } else {
        value = ''
      }
      return value
    },
    getNewValueData (value) {
      let val = ''
      if (value.length > 15) {
        // val = value.replace(/,/g,", ")
        val = value.trim()
      } else {
        val = value
      }
      return val
    },
    getHeadValueType (head, index) {
      let value = ''
      if (typeof head.valueType === 'string') {
        value = head.valueType
      } else if(typeof head.valueType === 'function') {
        value = head.valueType(this.data[index])
      }
      return value
    },
    getValueDate (head,index) {
      let value = ''
      if (typeof head.value === 'string') {
        if (this.data[index][head.value] && this.data[index][value] !== '0000-00-00') {
          value = this.formatDate(this.data[index][head.value])
        }
      } else if (typeof head.value === 'function') {
        value = this.formatDate(head.value(head, index))
      } else if (Array.isArray(head.value)) {
        let val = []
        for (let i in this.data[index][head[index].value[0]]) {
          let date = this.formatDate(this.data[index][head[index].value[0]][i][head[index].value[1]])
          val.push(date)
        }
        value = val.join()
      } else if (!this.data[index][head.value]) {
        value = ''
      }
      if (value === '0  0000') {
        value = ''
      }
      return value
    },
    getValueTimeDate (head,index) {
      let value = ''
      if (typeof head.value === 'string') {
        if (this.data[index][head.value] && this.data[index][value] !== '0000-00-00') {
          value = this.formatDateTime(this.data[index][head.value])
        }
      } else if (typeof head.value === 'function') {
        value = this.formatDateTime(head.value(head, index))
      } else if (Array.isArray(head.value)) {
        let val = []
        for (let i in this.data[index][head[index].value[0]]) {
          let date = this.formatDateTime(this.data[index][head[index].value[0]][i][head[index].value[1]])
          val.push(date)
        }
        value = val.join()
      } else if (!this.data[index][head.value]) {
        value = ''
      }
      if (value) {
        value = value.split(' ')
      }
      if (value[0] === '0--0000') {
        value = ''
      }
      return value
    },
    getValueCurrency (head,index) {
      let value = ''
      let currency = ''
      if (this.getCurrency(this.data[index].currency)) {
        currency = this.getCurrency(this.data[index].currency)
      }
      if (typeof head.value === 'string') {
        if (this.data[index][head.value]) {
          value = currency + this.data[index][head.value]
        }
      } else if (typeof head.value === 'function') {
        value = currency + head.value(head, index)
      } else if (Array.isArray(head.value)) {
        let val = []
        for (let i in this.data[index][head[index].value[0]]) {
          let curr = currency + this.data[index][head[index].value[0]][i][head[index].value[1]]
          val.push(curr)
        }
        value = val.join()
      }
      return value
    },
    getCustomStatusLabel (head, row) {
      let value = ''
      if (typeof head['activeValue'] === 'string' && typeof head['inactiveValue'] === 'string') {
        value = this.getCustomStatusChecked(head, row)
        return value ? head['activeValue'] : head['inactiveValue']
      } else {
        if (typeof head['activeValue'] === 'function' && typeof head['inactiveValue'] === 'function') {
          value = this.getCustomStatusChecked(head, row)
          return value ? head['activeValue'](row) : head['inactiveValue'](row)
        } else if (typeof head['activeValue'] === 'function') {
          value = this.getCustomStatusChecked(head, row)
          return value ? head['activeValue'](row) : head['inactiveValue']
        } else if (typeof head['inactiveValue'] === 'function') {
          value = this.getCustomStatusChecked(head, row)
          return value ? head['activeValue'] : head['inactiveValue'](row)
        }
      }
    },
    getCustomStatusChecked (head, row) {
      let checkedValue = ''
      if (typeof head['activeValue'] === 'string') {
        checkedValue = head['activeValue'] ? head['activeValue'] : 1
      } else {
        if (typeof head['activeValue'] === 'function') {
          checkedValue = head['activeValue'](row) ? head['activeValue'](row) : 1
        }
      }
      let value = row[head.value] ? row[head.value] : ''
      return checkedValue === value
    },
    getStatusLabel (head, row) {
      let value = this.getStatusChecked(head, row)
      return value ? head['activeValue'] : head['inactiveValue']
    },
    getStatusChecked (head, row) {
      let value = row[head.value] ? row[head.value] : ''
      let checkedValue = head['activeValue'] ? head['activeValue'] : 1
      return checkedValue === value
    },
    changetoggle (head, rowIndex) {
      let row = this.data[rowIndex]
      let value = this.getStatusChecked(head, row)
      let checkedValue = head['activeValue'] ? head['activeValue'] : 1
      let uncheckedValue = head['inactiveValue'] ? head['inactiveValue'] : 0
      this.data[rowIndex][head.value] = value ? uncheckedValue : checkedValue
      return 1
    },
    getButtonExists (head, btnName, indexRow) {
      if (typeof head.value === 'function') {
        if (head.value(this.data[indexRow])[btnName]) {
          return head.value(this.data[indexRow])[btnName]
        } else {
          return false
        }
      } else {
        return head.value[btnName]
      }
    },
    getImageColumn(head) {
      if (head.imageurl) {
        return head.imageurl
      }
    },
    getEmailExists (head, btnName, indexRow) {
      if (typeof head.action === 'function') {
        return head.action(this.data[indexRow])
      } else {
        return head.action[btnName]
      }
    },
    getRowClass () {
      if (this.headerArray.rowData && typeof this.headerArray.rowData.cssClass === 'string') {
        return this.headerArray.rowData.cssClass
      }
      return ''
    },
    clickAction (index, head, action) {
      if (typeof head.value === 'function') {
        if (action === 'count') {
          head.value(this.data[index])[action](this.data[index], this.countArr[index])
        } else if (head.value(this.data[index])[action]) {
          head.value(this.data[index])[action](this.data[index])
        }
      } else {
        if (action === 'count') {
          head.value[action](this.data[index], this.countArr[index])
        } else if (head.value[action]) {
          head.value[action](this.data[index])
        }
      }
    },
    clickEmailAction (index, head, action1) {
      if (typeof head.action === 'function') {
        if (head.action(this.data[index])[action1]) {
          head.action(this.data[index])[action1](this.data[index])
        }
      } else {
        if (head.action[action1]) {
          head.action[action1](this.data[index])
        }
      }
    },
    checkedAction (action, index) {
      for (let i in this.getHeaderArray()) {
        if (this.getHeaderArray()[i].checkArr) {
          if (this.getHeaderArray()[i].checkArr[action]) {
            if (index || index === 0) {
              this.getHeaderArray()[i].checkArr[action](this.detailIds, index + this.offset)
            } else {
              this.getHeaderArray()[i].checkArr[action](this.detailIds)
            }
          }
        }
      }
    },
    checkPrecheckedId (val1, val2) {
      return val1 === val2
    },
    preCheckedAction () {
      // for (let i in this.getHeaderArray()) {
      //   if (this.getHeaderArray()[i].checkArr) {
      //     if (this.getHeaderArray()[i].checkArr['prechecked']) {
      //       for (let j in this.getHeaderArray()[i].checkArr['prechecked']) {
      //         let detail = this.getHeaderArray()[i].checkArr['prechecked'][j]
      //         this.data[detail]? this.detailIds.push(this.data[detail]): ''
      //       }
      //     }
      //   }
      // }
      // console.log(this.prechecked)
      if (this.prechecked) {
        if (Array.isArray(this.prechecked)) {
          if (this.prechecked.length === 0) {
            this.detailIds = []
          }
          for (let i in this.prechecked) {
            for (let detail in this.data) {
              if (this.data[detail]['checkid'] === this.prechecked[i]) {
                let valueArr = []
                // this.detailIds.push(this.prechecked[i])
                for (let value in this.detailIds) {
                  valueArr.push(this.detailIds[value].checkid)
                }
                let username = this.data[detail].checkid
                // let found = valueArr.some((e1) => {
                //   return e1 === username
                // })
                // console.log('found block')
                valueArr.push(username)
                // let obj = []
                // obj = JSON.parse(JSON.stringify(this.detailIds))
                // this.detailIds = obj
                // console.log('obj', obj)
                this.data[detail]? this.detailIds.push(this.data[detail]): ''
                let obj = []
                obj = [...new Set(this.detailIds)]
                this.detailIds = obj
              }
            }
          }
        }
      }
    },
    preRadioAction() {
      let header = this.getHeaderArray()
      let head = {}
      if (this.preRadioChecked) {
        for (let i in header) {
          if (header[i].radioAction) {
            head = header[i]
          }
        }
        // console.log('typeof', typeof this.preRadioChecked)
        // console.log('value of', this.preRadioChecked)
        if (Array.isArray(this.preRadioChecked)) {
          for (let i in this.radioArray) {
            this.radioArray.splice(i, 1, false)
          }
          for (let j in this.preRadioChecked) {
            for (let detail in this.data) {
              if (this.data[detail]['checkid'] === this.preRadioChecked[j]) {
                this.clickRadio(detail, head, true)
              }
            }
          }
        } else {
          for (let index in this.data) {
            if (this.data[index]['checkid'] === this.preRadioChecked) {
              this.clickRadio(index, head, true)
            }
          }
        }
      } else {
        for (let i in this.radioArray) {
          this.radioArray.splice(i, 1, false)
        }
      }
    },
    clickRadio (index, head, radioVal) {
      for (let i in this.radioArray) {
        this.radioArray.splice(i, 1, false)
      }
      this.radioArray.splice(index, 1, true)
      return head.radioAction['radioRow'](this.data[index], radioVal) 
    },
    getRadioValue (head, index) {
      let val = this.radioArray[index]
      if (this.data[index][head.value]) {
        if (this.data[index][head.value].toLowerCase() === 'yes') {
          this.radioArray[index] = true
          val = this.radioArray[index]
        } else if (this.data[index][head.value].toLowerCase() === 'no') {
          this.radioArray[index] = false
          val = this.radioArray[index]
        }
      }
      return val
    },
    getHeaderArray () {
      if (this.headerArray.columns) {
        return this.headerArray.columns
      }
      return this.headerArray
    },
    getViewClass (row, rowType) {
      if (this.fromComponent === 'tickteListing') {
        if (rowType === 'edit' && row.status === 'CLOSED') {
          return {display: 'none'}
        }
        if (rowType === 'view' && row.status !== 'CLOSED') {
          return {display: 'none'}
        }
      }
    },
    buttonClick (head, indexRow) {
      if (typeof head.value === 'function' && typeof head.value(this.data[indexRow])['actionClick'] === 'function' && this.data[indexRow]) {
        head.value(this.data[indexRow])['actionClick'](this.data[indexRow])
      } else if (head.value && typeof head.value.actionClick === 'function' && this.data[indexRow]) {
        head.value.actionClick(this.data[indexRow])
      }
    },
    getButtonClass (head, indexRow) {
      let temp = ''
      if (typeof head.value === 'function') {
        switch (typeof head.value(this.data[indexRow])['cssProperty']) {
          case 'function':
            temp = head.value(this.data[indexRow])['cssProperty'](this.data[indexRow])
            break
          case 'object':
            temp = head.value(this.data[indexRow])['cssProperty']
            break
        }
      } else if (head.value) {
        switch (typeof head.value.cssProperty) {
          case 'function':
            temp = head.value.cssProperty(this.data[indexRow])
            break
          case 'object':
            temp = head.value.cssProperty
            break
        }
      }
      if (temp.secondary || temp.secondary === false) {
        let val = temp.secondary
        temp.secondary = val
      } else {
        temp.secondary = false
      }
      if (temp.primary || temp.primary === false) {
        let val = temp.primary
        temp.primary = val
      } else {
        temp.primary = false
      }
      return temp
    },
    getButtonContent (head, indexRow) {
      let temp = ''
      if (typeof head.value === 'function') {
        switch (typeof head.value(this.data[indexRow])['text']) {
          case 'function':
            temp += ' ' + head.value(this.data[indexRow])['text'](this.data[indexRow])
            break
          case 'string':
            temp += ' ' + head.value(this.data[indexRow])['text']
            break
        }
      } else if (head.value) {
        switch (typeof head.value.text) {
          case 'function':
            temp += ' ' + head.value.text(this.data[indexRow])
            break
          case 'string':
            temp += ' ' + head.value.text
            break
        }
      }
      return temp
    },
    selectAll () {
      if (this.allSelected) {
        for (let detail in this.data) {
          let valueArr = []
          for (let value in this.detailIds) {
            valueArr.push(this.detailIds[value].checkid)
          }
          let username = this.data[detail].checkid
          let found = valueArr.some((e1) => {
            return e1 === username
          })
          if (!found) {
            this.data[detail] && this.data[detail]
            ? this.detailIds.push(this.data[detail])
            : this.detailIds.push('')
          }
        }
      }
      this.checkedAction('checked')
      // this.select('checked')
      this.$emit('changeArr', this.detailIds)
    }
  },
}
</script>
<style scoped lang="scss">
  .flex-table {
    border-bottom: 1px solid #E7EBF0;
    span {
      &.light-span {
        color: #7F8797;
      }
    }
  }
  .toggle-status {
    display: flex;
    width: 95px;
    justify-content: space-between;
    align-items: center;
  }
  .action-column .action-btn {
    padding: 2px;
    cursor: pointer;
    &:hover {
      svg {
        path {
          fill: #0978FC;
        }
      }
    }
    &.edit-error {
      &:hover {
        svg {
          #ic_mode_edit {
            path {
              fill: #0978FC;
            }
          }
          #Ic_error {
            path {
              fill: #FF3366;
            }
          }
        }
      }
    }
  }
  .table-stripped .table-row {
    &:hover {
      background-color: #F8F8F8;
    }
  }
  .body-font {
    &.column-uppercase {
      text-transform: uppercase;
    }
  }
  .table-column {
    &.table-overflow {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .video-wrap {
      position: relative;
      display: flex;
      max-width: 68px;
      width: auto;
      #overlay {
        position: absolute;
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 49%;
        transform: translate(-50%, -49%);
        border-radius: 50%;
        background-color: rgba(0,0,0,0.3);
        z-index: 0;
        cursor: pointer;
        transition: opacity 0.3s;
        -webkit-transition: opacity 0.3s;
        opacity: 1;
      }
      &:hover {
        #overlay {
          opacity: 0.3;
        }
      }
    }
    img {
      &.img {
        max-width: 68px;
        max-height: 58px;
        height: auto;
        width: auto;
        cursor: pointer;
        transition: transform .3s; /* Animation */
        &:hover {
          transform: scale(2.5)
        }
      }
      &.vid {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
    span {
      position: relative;
      &:hover {
        .tooltip1 {
          .tooltiptext {
            visibility: visible;
          }
        }
      }
    }
  }
  .toggle-button .toggle-text{
    display: block;
    width: 50px;
  }
  .tooltip1 {
    position: absolute;
    display: block;
    top: 11px;
    left: 20px;
    opacity: 1;
    z-index: 100;
  }
  .tooltiptext:hover {
    z-index: 5000;
  }
  .email-wrap {
    display: flex;
    justify-content: space-between;
    width: calc(100% - 22px);
    .email-body {
      text-overflow: ellipsis;
      overflow: hidden;
      flex: 1;
    }
  }
  .tooltip1 .tooltiptext {
    box-sizing: border-box;
    height: 90px;
    width: 270px;
    padding:10px;
    visibility: hidden;
    border: 1px solid #D0D6DD;
    border-radius: 6px;
    background-color: #FFFFFF;
    box-shadow: 2px 10px 22px 0 rgba(0,0,0,0.11);
    text-align: left;
    // border-radius: 6px;
    // position: absolute;
    // left: -40%;
    // top: 105%;
    color: rgba(0,0,0,0.7);
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.11px;
    line-height: 30px;
    position: relative;
    z-index: 100;
  }
  svg.email {
    position: relative;
    top: 2px;
    left: 8px;
    cursor: pointer;
  }
  .tooltip1 .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 21%;
    margin-left: -10px;
    border-width: 9px;
    border-style: solid;
    border-color: transparent transparent #D0D6DD transparent;
  }
  .modal-button-wrapper {
    display: flex;
    margin: 0 auto;
    button {
      margin: 9px;
    }
  }
  .success {
    color: #2EBABF!important;
  }
  .danger {
    color: #FF9696!important;
  }
  .notify {
    color: #FFE882!important;
  }
  .pending {
    color: #F8CE42!important;
  }
  .trial {
    color: #FF9948!important;
  }
  .secondary {
    color: #0978FC!important;
  }
  .failed {
    color: #FF6073!important;
  }
  .failed,
  .secondary,
  .trial,
  .pending,
  .notify,
  .danger,
  .success {
    span {
      font-family: "Open Sans Medium";
    }
  }
  .modal-wrapper {
    .modal-body {
      padding: 0 40px;
    }
    p {
      margin: 0 30px 20px;
      text-align: center;
      font-size: 1.1vw;
      line-height: 1.7vw;
      span {
        font-weight: bold;
      }
    }
    .modal-button-wrapper {
      display: flex;
      margin: 0 auto;
      button {
        margin: 9px;
      }
    }
  }
  .disabled-icon {
    &.action-btn {
      cursor: default;
      svg {
        opacity: 0.5;
      }
      &:hover {
        svg {
          path {
            fill: #C3C3C3;
          }
        }
      }
    }
  }
  .data-found {
    display: flex;
    justify-content: center;
    .data-para {
      padding-top: 40px;
      color: #1F2631;
      font-weight: bold;
      padding-bottom: 20px;
    }
  }
  .data-found-wrapper {
    max-width: 100vw;
  }
  .m-table-body-wrapper,
  .data-found-wrapper {
    background: #fff;  
    .table-bd {
      background: #fff;
    }
  }
  .tooltipClasses_active_text {
    &:hover {
      color: #0978FC;
    }
  }
</style>


<style lang="scss"> 
  .tooltip {
  display: block !important;
  z-index: 10000;
}
  .tooltip {
    &.info {
      .tooltip-inner {
        width: auto;
        margin: 0 !important;
        padding: 12px 15px !important;
        height: auto;
        font-size: 1vw;
        border: none!important;
        box-shadow: 0 2px 7px 0 rgba(0,0,0,0.25) !important;
      }
    }
  }
 
.tooltip .tooltip-inner {
  border-radius: 16px;
  padding: 20px !important;
  width: 300px;
  border: 1px solid #D0D6DD !important;
  border-radius: 6px;
  color: black !important;;
  background-color: #FFFFFF !important;
  box-shadow: 2px 10px 22px 0 rgba(0,0,0,0.11) !important;
  word-break: break-all;
}
 
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  color: white !important; 
  z-index: 1;
  box-shadow: 2px 10px 22px 0 white;
  border: 1px solid white;
}
 
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
 
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
 
.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}
 
.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: 50px !important;
  margin-top: 0;
  margin-bottom: 0;
}
 
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}
 
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
 
.tooltip[x-placement^="left"] {
  margin-right: 5px;
}
 
.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
 
.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: white;
  padding: 24px;
  border-radius: 5px;
}
 
.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}
 
.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}
 
.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
.tooltipClasses_active {
  display: block;
  font-size: 1vw;
  color: rgb(0,0,0);
  line-height: 1.6vw;
  letter-spacing: 0.11px;
}
.tooltipClasses_inactive {
  display: none !important;
}
</style>
