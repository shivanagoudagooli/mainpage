<template>
  <label class="form-checkbox">
    <input type="checkbox" v-model="valChecked" :value="valueCheck" @click="triggerClick($event)" :disabled="disabled">
    <i class="form-icon" id="icon-form" @mouseover="hovering=true" @mouseleave="hovering=false" :style="cssVars"></i>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  data () {
    return {
      checkProperty: {},
      valChecked: '',
      hovering: false,
      disabled: false
    }
  },
  props: {
    mCheckProperty: {
      type: [Object, Array, String]
    },
    valueCheck: {
      type: [String, Boolean, Array, Object],
      default: '',
    },
    checked: {
      type: [String, Boolean, Array, Object],
      default: false,
    },
    checkDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssVars () {
      let val = ''
      if (typeof this.valChecked === 'boolean') {
        if (this.valChecked) {
          if (this.disabled) {
            let disabledProp = {
              background: '#E1E5EA',
              color: '#A3ACB9',
              border: '1.5px solid #E1E5EA'
            }
            val = {...this.checkProperty.boxProperty, ...disabledProp}
          } else {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.checkedBoxProperty, ...this.checkProperty.tickProperty}
          }
        } else {
          if (this.hovering) {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.hoverProperty}
          } else {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.tickProperty}
          }
        }
      } else if (Array.isArray(this.valChecked)) {
        let value = (e) => {
          return e === this.valueCheck
        }
        if (this.valChecked.findIndex(value) === -1) {
          if (this.hovering) {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.hoverProperty}
          } else {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.tickProperty}
          }
        } else if (this.valChecked.findIndex(value) === 0 || this.valChecked.findIndex(value)) {
          val = {...this.checkProperty.boxProperty, ...this.checkProperty.checkedBoxProperty, ...this.checkProperty.tickProperty}
        }
      } else if (typeof this.valChecked === 'string') {
        if (this.valChecked) {
          val = {...this.checkProperty.boxProperty, ...this.checkProperty.checkedBoxProperty, ...this.checkProperty.tickProperty}
        } else {
          if (this.hovering) {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.hoverProperty}
          } else {
            val = {...this.checkProperty.boxProperty, ...this.checkProperty.tickProperty}
          }
        }
      }
      return val
    }
  },
  created () {
    this.checkProperty = {
      boxProperty: {
        height: '14px',
        width: '14px',
        background: '#fff',
        border: '1.5px solid #A3ACB9'
      },
      checkedBoxProperty: {
        background: '#0978FC',
        border: '1.5px solid #0978FC'
      },
      hoverProperty: {
        border: '1.5px solid #0978FC'
      },
      tickProperty: {
        color: '#fff'
      }
    }
  },
  watch: {
    checked () {
      this.valChecked = this.checked
    }
  },
  mounted () {
    if (this.mCheckProperty) {
      if (this.mCheckProperty.boxProperty && this.mCheckProperty.boxProperty.constructor === Object) {
        let boxProp = {...this.checkProperty.boxProperty, ...this.mCheckProperty.boxProperty}
        this.checkProperty.boxProperty = boxProp
      }
      if (this.mCheckProperty.checkedBoxProperty && this.mCheckProperty.checkedBoxProperty.constructor === Object) {
        let checkedProp = {...this.checkProperty.checkedBoxProperty, ...this.mCheckProperty.checkedBoxProperty}
        this.checkProperty.checkedBoxProperty = checkedProp
      }
      if (this.mCheckProperty.tickProperty && this.mCheckProperty.tickProperty.constructor === Object) {
        let tickProp = {...this.checkProperty.tickProperty, ...this.mCheckProperty.tickProperty}
        this.checkProperty.tickProperty = tickProp
      }
    }
    this.valChecked = this.checked
    if (this.checkDisabled) {
      this.valChecked = true
      this.disabled = true
    }
  },
  methods: {
    triggerClick (event) {
      if (!this.disabled) {
        if (typeof this.valChecked === 'boolean') {
          this.valChecked = !this.valChecked
          this.$emit('checkClick', this.valChecked)
        } else if (Array.isArray(this.valChecked)) {
          let val = (e) => {
            return e === this.valueCheck
          }
          if (this.valChecked.findIndex(val) === -1) {
            this.valChecked.push(this.valueCheck)
          } else if (this.valChecked.findIndex(val) === 0 || this.valChecked.findIndex(val)) {
            this.valChecked.splice(this.valChecked.findIndex(val), 1)
          }
          this.$emit('checkClick', this.valChecked)
        } else if (typeof this.valChecked === 'string') {
          if (event.target.checked) {
            this.valChecked = this.valueCheck
            this.$emit('checkClick', this.valChecked)
          } 
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .form-checkbox {
    display: block;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    position: relative;
    input {
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      position: absolute;
      width: 1px;
      visibility: hidden;
      &:checked {
        +.form-icon {
          &:after {
            background-clip: padding-box;
            border: .1rem solid currentColor;
            border-left-width: 0;
            border-top-width: 0;
            content: "";
            height: 7.5px;
            left: 50%;
            position: absolute;
            top: 40%;
            transform: translate(-50%, -40%) rotate(45deg);
            width: 4px;
          }
        }
      }
    }
    .form-icon {
      border-radius: 2px;
      cursor: pointer;
      display: inline-block;
      position: absolute;
      transition: background .2s, border .2s, box-shadow .2s, color .2s;
    }
  }
</style>