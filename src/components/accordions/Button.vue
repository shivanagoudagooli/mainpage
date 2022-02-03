<template>
  <button 
  :class="[
    'm-button',
      {
        'm-button--rounded': rounded
      },
      {
        'm-button--primary': primary
      },
      {
        'm-button--hovering': hovering
      }
    ]"
   :style="cssVars" @mouseover="mouseOver()" @mouseleave="mouseLeave" @click="triggerClick">
    <span class="prim-plus" v-show="primary && plus">+</span><slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MButton',
  data () {
    return {
      buttonProperty: {},
      hovering: false
    }
  },
  props: {
    mButtonProperty: {
      type: [Object, Array, String]
    },
    rounded: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plus: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cssVars () {
      let val = ''
      if (this.primary) {
        if (this.disabled) {
          let defaultProp = {
            background: ' #CBCED1',
            cursor: 'default',
            border: '1.5px solid #CBCED1'
          }
          val = {...this.buttonProperty.defaultProperty, ...defaultProp }
        } else {
          let defaultProp = {
            background: '#FF3366',
            border: '1.5px solid #FF3366'
          }
          let hoverProp = {
            background: '#FF5982',
            border: '1.5px solid #FF5982'
          }
          if (this.hovering) {
            val = {...this.buttonProperty.defaultProperty, ...this.buttonProperty.hoverProperty, ...hoverProp}
          } else {
            val = {...this.buttonProperty.defaultProperty, ...defaultProp }
          }
        }
      } else if (this.secondary) {
        let size = parseInt(this.buttonProperty.defaultProperty.fontSize, 10) - 2
        let height = parseInt(this.buttonProperty.defaultProperty.lineHeight, 10) - 3
        let cssProp = {
          background: 'transparent',
          fontSize: size + 'px',
          lineHeight: height + 'px',
        }
        if (this.disabled) {
          let defaultProp = {
            border: '1.5px solid #A3ACB9',
            color: '#A3ACB9',
            cursor: 'default'
          }
          val = {...this.buttonProperty.defaultProperty, ...defaultProp, ...cssProp}
        } else {
          let defaultProp = {
            color: '#818181',
            border: '1.5px solid #818181'
          }
          let hoverProp = {
            border: '1.5px solid #FF3366',
            color: '#FF3366'
          }
          if (this.hovering) {
            val = {...this.buttonProperty.defaultProperty, ...this.buttonProperty.hoverProperty, ...hoverProp, ...cssProp}
          } else {
            val = {...this.buttonProperty.defaultProperty, ...defaultProp, ...cssProp}
          }
        }
      } else {
        if (this.hovering) {
          val = {...this.buttonProperty.defaultProperty, ...this.buttonProperty.hoverProperty}
        } else {
          val = this.buttonProperty.defaultProperty
        }
      }
      return val
    }
  },
  created () {
    this.buttonProperty = {
      defaultProperty: {
        color: '#fff',
        background: '#0978fc',
        width: 140 + 'px',
        height: 30 + 'px',
        fontSize: 12 + 'px',
        lineHeight: 15 + 'px',
        fontWeight: 'bold',
        borderWidth: 0
      },
      hoverProperty: {
        color: '#fff',
        background: ' #ADD8E6'
      }
    }
  },
  mounted () {
    if (this.mButtonProperty && this.mButtonProperty.defaultProperty && this.mButtonProperty.defaultProperty.constructor === Object) {
      let defaultProp = {...this.buttonProperty.defaultProperty, ...this.mButtonProperty.defaultProperty}
      this.buttonProperty.defaultProperty = defaultProp
    }
    if (this.mButtonProperty && this.mButtonProperty.hoverProperty && this.mButtonProperty.hoverProperty.constructor === Object) {
      let hoverProp = {...this.buttonProperty.hoverProperty, ...this.mButtonProperty.hoverProperty}
      this.buttonProperty.hoverProperty = hoverProp
    }
  },
  methods: {
    mouseOver () {
     this.hovering = !this.hovering
    },
    mouseLeave () {
      this.hovering = !this.hovering
    },
    triggerClick () {
      if (!this.disabled) {
        this.$emit('on-btn-click')
      }
    }
  }
}
</script>

<style scoped lang="scss">
 .m-button {
   border-radius: 2px;
   text-align: center;
   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;
   font-family: inherit;
   &.m-button--primary {
     .prim-plus {
       font-size: 16px;
       max-height: 17px;
        height: 100%;
       padding-right: 3px;
       padding-bottom: 2px;
     }
   }
 }
 .m-button:focus {
   outline: none;
 }
 .m-button--rounded {
   border-radius: 60px;
 }
</style>
