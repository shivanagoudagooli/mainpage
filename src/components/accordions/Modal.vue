<template>
  <transition name="m-fade">
      <div class="m-backdrop" @click="close($event)">
        <div class="m-modal" :style="styles">
          <button type="button" class="bn-close" @click="close($event, true)">
            <svg class="x" width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Close</title>
              <desc>Created with sketchtool.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="01vCRM/Provider/Tickets/Update/addcomment" transform="translate(-1324.000000, -243.000000)" fill="#A7B1C6">
                      <g id="popup-copy-3" transform="translate(944.000000, 224.000000)">
                          <g id="Ic_close_m" transform="translate(374.003580, 13.496062)">
                              <g id="ic_close" transform="translate(5.218281, 5.218281)">
                                  <path d="M11.5593866,0.889763621 L11.5966155,0.928423079 C11.9923755,1.33924041 11.9923755,2.00542904 11.596688,2.41632171 L7.82539314,6.33159412 L11.596688,10.2468665 C11.9659964,10.6303664 11.9906169,11.2362573 11.6704907,11.6493481 L11.5966155,11.7347652 L11.5593866,11.7734246 C11.1900782,12.1569244 10.6066083,12.1824911 10.2087451,11.8501246 L10.1264753,11.7734246 L6.32939421,7.83043265 L2.53779324,11.7677339 C2.16848487,12.1512337 1.58501496,12.1768004 1.18715173,11.8444339 L1.10488193,11.7677339 L1.0665093,11.7278868 C0.697618092,11.3448201 0.672579523,10.7397565 0.991711975,10.3265575 L1.06536554,10.2411024 L4.84923963,6.33159412 L1.06536554,2.42208585 C0.670756935,2.01100209 0.67126872,1.34573003 1.0665093,0.935301495 L1.10488193,0.895454322 C1.50056946,0.484561657 2.14210571,0.484561657 2.53779324,0.895454322 L6.32939421,4.83275559 L10.1264753,0.889763621 C10.5221628,0.478870956 11.1636991,0.478870956 11.5593866,0.889763621 Z" id="Path"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
            </svg>
          </button>
          <header class="md-header" id="modalTitle">
            <div><slot name="header">              
            </slot></div>           
          </header>
          <slot name="body"></slot>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
    }
  },
  props:['styles'],
  methods: {
    close(e, status) {
      document.body.style.position = "relative"
      if (status) {
        this.$emit('close');
      }
      // if ((e.target.className).includes('m-backdrop'))
      //    this.$emit('close');
    }
  }, 
}

</script>

<style lang="scss" scoped>
  .m-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }
   .m-modal {
    background: #FFFFFF;
    // box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    width: 328px;
    height: 177px;
    border-radius: 2px;
    overflow: auto;
    max-height: 400px;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      background : rgba(235, 235, 235, .3);
      border-radius: 2.5px;
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background : #EBEBEB;
      border-radius: 2.5px;
      width: 5px;
      height: 5px;
    }
  }
  .closex{
    margin-right: 3px;
  }
  .md-header {
    padding: 15px;
    display: flex;
    justify-content:space-evenly;
  }
  .bn-close {
    display: flex;
    flex-direction:row-reverse;
    border:none;
    color: #A7B1C6;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    margin-top: 10px;
    margin-right: 5px;
    &:focus{outline:0;}
  }
  
 .m-fade-enter,
  .m-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
 
</style>