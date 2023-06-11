import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "modify-category-selector-desktop",
  before: "inject-discourse-objects",

  initializeWithApi(api){
    api.modifyClass("controller:topic", {
        pluginId: "RestrictCategoryChangeTopic",
        showCategoryChooser: false,
    });
  },

  initialize() {
    withPluginApi("1.6.0", this.initializeWithApi);
  },
};