import Control from './control.vue'
// import ControlOption from './control-option.vue'

const Notify = {
  install(Component, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = params

    Component.component('control', Control);
    // Component.component('control-option', ControlOption);
  }
}

export default Notify