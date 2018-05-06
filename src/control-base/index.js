import Control from './control.vue'
import ControlGroup from './control-group.vue'
// import ControlOption from './control-option.vue'

const Notify = {
  install(Component, params = {}) {
    Component.component('control', Control);
    Component.component('control-group', ControlGroup);
    // Component.component('control-option', ControlOption);
  }
}

export default Notify