<template>
<div>
    <div class="md-chip">
        <span v-if="property" class="title">{{title.toUpperCase()}}: </span><span class="value">{{value.toUpperCase()}}</span>
        <button v-if="property" type="button" class="md-chip-remove" @click="removeChip()"></button>
    </div>    
</div>
</template>

<script>
    export default {
        name:'filterchip',
        props: {
            title: {
                type:  String,
                default:'key'                
            },
            value: {
                type:  String,
                default:'value'                
            },
            property: {
                type: String,
                required: true
            }
        },
        methods: {
            removeChip () {
                this.$emit('remove', this.property)
            }
        }
        
    }
</script>

<style lang="scss" scoped>
$md-chip-height: 28px;
$md-chip-color: white;
.title{
  height: 15px;
  width: 98px;
  color: #A3ACB9;
  // font-family: "Open Sans", open-sans, sans-serif;
  font-size: 12px;  
  letter-spacing: 0;
  line-height: 15px;
}
.value{ 
  color: #1F2631;
  
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 15px;
}
.logo-status {
  width: 20px;
  height: 18px;
}

.md-chip {
  display: inline-block;
  background: $md-chip-color;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 13px;
  &.md-chip-hover:hover {
    background: #ccc;
  }
}

.md-chip-clickable {
 cursor: pointer;
}

.md-chip, .md-chip-icon {
  height: $md-chip-height;
  line-height: $md-chip-height;
}

.md-chip-icon {
  display: block;
  float: left;
  background: #009587;
  width: $md-chip-height;
  border-radius: 4px;
  text-align: center;
  color: white;
  margin: 0 8px 0 -12px;
}

.md-chip-remove {
  display: inline-block;
  background: #fff;
  border: 0;
  height: 20px;
  width: 20px;
  border-radius: 10%;
  padding: 0;
  margin: 0 -4px 0 10px;
  cursor: pointer;
  font: inherit;
  line-height: 20px;
  &:after {
    color: #aaa;
    content: 'x';
    font-weight: bold;
    font-family: inherit;
  }
  &:hover {
    background: #dee5ed;
  }
  &:active {
    background: #777;
  }
  &:focus {
    outline: none;
  }
}

.md-chips {
  padding: 12px 0;
  .md-chip {
    margin: 0 0px 3px 0;
  }
}

.md-chip {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>